import type { Browserless } from 'browserless'
import type { CaptureOptions, CaptureResult, CaptureTarget, CaptureViewport } from './types.js'
import fs from 'node:fs/promises'
import path from 'node:path'
import createBrowserless from 'browserless'
import { captureRawScreenshot } from './browser.js'
import { frameScreenshot } from './frame.js'

export async function runCaptures(
  options: CaptureOptions,
  allTargets: CaptureTarget[],
  allViewports: CaptureViewport[],
): Promise<CaptureResult[]> {
  validateUniqueIds(allTargets, 'target')
  validateUniqueIds(allViewports, 'viewport')

  const targets = filterByIds(allTargets, options.selectedTargets, 'target')
  const viewports = filterByIds(allViewports, options.selectedViewports, 'viewport')

  await ensureBaseUrlReachable(options.baseUrl)
  await fs.mkdir(options.outputDir, { recursive: true })

  const browserOptions = {
    timeout: 30000,
    headless: 'shell',
    defaultViewport: null,
  } as unknown as Parameters<typeof createBrowserless>[0]

  const browser = createBrowserless(browserOptions) as unknown as Browserless

  try {
    const results: CaptureResult[] = []

    for (const target of targets) {
      for (const viewport of viewportsForTarget(target, viewports)) {
        const context = await browser.createContext({ retry: 0 })

        try {
          const raw = await captureRawScreenshot(context, target, viewport, options.baseUrl, options.forceFullPage)
          const framed = await frameScreenshot(raw.buffer, target.frame)
          const outputPath = path.join(options.outputDir, createOutputFileName(target, viewport, raw.scope))

          await fs.writeFile(outputPath, framed.data)

          results.push({
            targetId: target.id,
            viewportId: viewport.id,
            outputPath,
            width: framed.info.width,
            height: framed.info.height,
            size: framed.info.size,
          })
        }
        finally {
          await context.destroyContext({ force: true }).catch(() => undefined)
        }
      }
    }

    return results
  }
  finally {
    await browser.close().catch(() => undefined)
  }
}

async function ensureBaseUrlReachable(baseUrl: URL) {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error(`Base URL '${baseUrl.href}' returned HTTP ${response.status}.`)
  }
}

function validateUniqueIds(items: Array<{ id: string }>, itemName: string) {
  const seen = new Set<string>()

  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`Duplicate ${itemName} id '${item.id}'.`)
    }

    seen.add(item.id)
  }
}

function filterByIds<T extends { id: string }>(items: T[], selectedIds: string[], itemName: string) {
  if (selectedIds.length === 0) {
    return items
  }

  const itemMap = new Map(items.map(item => [item.id, item]))

  return selectedIds.map((id) => {
    const item = itemMap.get(id)

    if (!item) {
      throw new Error(`Unknown ${itemName} id '${id}'.`)
    }

    return item
  })
}

function viewportsForTarget(target: CaptureTarget, viewports: CaptureViewport[]) {
  if (!target.viewports?.length) {
    return viewports
  }

  return filterByIds(viewports, target.viewports, 'viewport')
}

function createOutputFileName(target: CaptureTarget, viewport: CaptureViewport, scope: string) {
  const stem = target.outputName ?? target.id

  return `${stem}-${viewport.id}-${scope}.png`
}
