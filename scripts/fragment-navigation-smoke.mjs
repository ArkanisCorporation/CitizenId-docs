import assert from 'node:assert/strict'
import process from 'node:process'
import { chromium } from 'playwright'

const baseUrl = process.env.FRAGMENT_NAV_BASE_URL ?? 'http://127.0.0.1:5174'
const browserChannel = process.env.FRAGMENT_NAV_BROWSER_CHANNEL
const browserExecutablePath = process.env.FRAGMENT_NAV_BROWSER_EXECUTABLE_PATH
const headingTopLimit = 180

const browser = await chromium.launch({
  headless: true,
  ...(browserChannel ? { channel: browserChannel } : {}),
  ...(browserExecutablePath ? { executablePath: browserExecutablePath } : {}),
})

async function waitForDiagrams(page) {
  await page.waitForFunction(() => {
    const diagrams = [...document.querySelectorAll('.cid-mermaid')]

    return diagrams.length === 0 || diagrams.every(element => element.querySelector('svg'))
  }, { timeout: 15000 })
  await page.evaluate(() => document.fonts?.ready)
}

async function measureThirdPartyCopies(page, label) {
  await page.waitForSelector('#third-party-copies', { timeout: 15000 })
  await waitForDiagrams(page)
  await page.waitForTimeout(800)

  return page.evaluate((label) => {
    const target = document.querySelector('#third-party-copies')

    if (!(target instanceof HTMLElement))
      throw new Error('Missing #third-party-copies heading')

    const rect = target.getBoundingClientRect()

    return {
      label,
      href: location.href,
      scrollY: Math.round(scrollY),
      targetTop: Math.round(rect.top),
      targetText: target.textContent?.trim(),
    }
  }, label)
}

async function measureDiagramNavigation(page) {
  await page.goto(`${baseUrl}/players/`, { waitUntil: 'networkidle' })
  await waitForDiagrams(page)

  await page
    .locator('.cid-mermaid a[*|href="/players/data-rights#third-party-copies"]')
    .click()
  await page.waitForFunction(() => {
    return location.pathname === '/players/data-rights' && location.hash === '#third-party-copies'
  }, { timeout: 15000 })

  return measureThirdPartyCopies(page, 'diagram-click')
}

async function measureOutlineNavigation(page) {
  await page.goto(`${baseUrl}/players/data-rights`, { waitUntil: 'networkidle' })
  await waitForDiagrams(page)

  await page
    .locator('.VPDocAside a[href="#third-party-copies"], aside a[href="#third-party-copies"]')
    .first()
    .click()
  await page.waitForFunction(() => location.hash === '#third-party-copies', { timeout: 15000 })

  return measureThirdPartyCopies(page, 'outline-click')
}

try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
  const diagramClick = await measureDiagramNavigation(page)
  const outlineClick = await measureOutlineNavigation(page)

  console.log(JSON.stringify({ baseUrl, diagramClick, outlineClick }, null, 2))

  assert.ok(
    outlineClick.targetTop > 0 && outlineClick.targetTop <= headingTopLimit,
    `outline navigation should place target heading near the top; got ${outlineClick.targetTop}px`,
  )
  assert.ok(
    diagramClick.targetTop > 0 && diagramClick.targetTop <= headingTopLimit,
    `diagram navigation should place target heading near the top; got ${diagramClick.targetTop}px`,
  )
}
finally {
  await browser.close()
}
