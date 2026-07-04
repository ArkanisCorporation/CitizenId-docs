import type { Context } from 'browserless'
import type { Page, ScreenshotOptions } from 'puppeteer'
import type { CaptureStep, CaptureTarget, CaptureViewport, ScreenshotScope } from './types.js'
import { Buffer } from 'node:buffer'

interface RawCapture {
  buffer: Buffer
  scope: ScreenshotScope
}

export async function captureRawScreenshot(
  browserlessContext: Context,
  target: CaptureTarget,
  viewport: CaptureViewport,
  baseUrl: URL,
  forceFullPage: boolean,
  debugLog: (message: string) => void,
): Promise<RawCapture> {
  const page = await browserlessContext.page(`${target.id}:${viewport.id}`)

  try {
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
      isMobile: viewport.isMobile ?? false,
    })

    const url = new URL(target.path, baseUrl)
    if (target.localStorage) {
      debugLog(`localStorage ${Object.keys(target.localStorage).join(', ')}`)
      await page.evaluateOnNewDocument((entries) => {
        for (const [key, value] of Object.entries(entries)) {
          window.localStorage.setItem(key, value)
        }
      }, target.localStorage)
    }

    debugLog(`goto ${url.href}`)

    await browserlessContext.goto(page, {
      url: url.href,
      waitUntil: target.waitUntil ?? 'networkidle2',
      adblock: false,
      animations: false,
      styles: target.styles ?? [],
    })

    if (target.waitForSelector) {
      debugLog(`wait ${target.waitForSelector}`)
      await page.waitForSelector(target.waitForSelector, { visible: true, timeout: 10000 })
    }

    for (const step of target.steps ?? []) {
      debugLog(`step ${formatStep(step)}`)
      await runStep(page, step)
    }

    const scope = forceFullPage && target.scope !== 'element'
      ? 'fullPage'
      : target.scope

    if (scope === 'element') {
      if (!target.selector) {
        throw new Error(`Target '${target.id}' uses element scope but has no selector.`)
      }

      debugLog(`capture element ${target.selector}`)
      const element = await page.waitForSelector(target.selector, { visible: true, timeout: 10000 })

      if (!element) {
        throw new Error(`Target '${target.id}' selector '${target.selector}' did not resolve.`)
      }

      if (target.scrollIntoView ?? true) {
        await element.evaluate(node => node.scrollIntoView({ block: 'center', inline: 'center' }))
      }

      return {
        scope,
        buffer: Buffer.from(await element.screenshot({ type: 'png' })),
      }
    }

    const screenshotOptions: ScreenshotOptions = {
      type: 'png',
      fullPage: scope === 'fullPage',
    }

    debugLog(`capture ${scope}`)

    return {
      scope,
      buffer: Buffer.from(await page.screenshot(screenshotOptions)),
    }
  }
  finally {
    await page.close().catch(() => undefined)
  }
}

function formatStep(step: CaptureStep) {
  switch (step.type) {
    case 'clearLocalStorage':
      return 'clearLocalStorage'
    case 'setLocalStorage':
      return `setLocalStorage ${step.key}`
    case 'click':
      return `click ${step.selector}`
    case 'waitForSelector':
      return `wait ${step.selector}`
    case 'evaluate':
      return `evaluate ${step.script.length} chars`
  }
}

async function runStep(page: Page, step: CaptureStep) {
  switch (step.type) {
    case 'clearLocalStorage':
      await page.evaluate(() => window.localStorage.clear())
      break
    case 'setLocalStorage':
      await page.evaluate((key, value) => window.localStorage.setItem(key, value), step.key, step.value)
      break
    case 'click':
      await page.waitForSelector(step.selector, { visible: true, timeout: 10000 })
      await page.click(step.selector)
      break
    case 'waitForSelector':
      await page.waitForSelector(step.selector, {
        visible: step.visible ?? false,
        timeout: step.timeoutMs ?? 10000,
      })
      break
    case 'evaluate':
      await page.evaluate((script) => {
        const element = document.createElement('script')
        element.textContent = script
        document.documentElement.append(element)
        element.remove()
      }, step.script)
      break
  }
}
