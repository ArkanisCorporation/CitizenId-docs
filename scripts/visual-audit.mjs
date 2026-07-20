import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const baseUrl = process.env.VISUAL_AUDIT_BASE_URL ?? 'http://127.0.0.1:5174'
const outputDir = process.env.VISUAL_AUDIT_OUTPUT_DIR
  ?? path.join(os.tmpdir(), 'citizenid-docs-visual-audit')
const browserChannel = process.env.VISUAL_AUDIT_BROWSER_CHANNEL
const browserExecutablePath = process.env.VISUAL_AUDIT_BROWSER_EXECUTABLE_PATH

const pages = [
  { slug: 'home', path: '/' },
  { slug: 'players-index', path: '/players/' },
  { slug: 'website-basics', path: '/players/website-basics' },
  { slug: 'rsi-verification', path: '/players/rsi-verification' },
  { slug: 'linked-accounts', path: '/players/linked-accounts' },
  { slug: 'discord-integrations', path: '/players/discord-integrations' },
  { slug: 'third-party-apps', path: '/players/third-party-apps' },
  { slug: 'privacy-controls', path: '/players/privacy-controls' },
  { slug: 'data-rights', path: '/players/data-rights' },
  { slug: 'getting-help', path: '/players/getting-help' },
  { slug: 'community-admins-index', path: '/community-admins/' },
  { slug: 'community-setup', path: '/community-admins/community-setup' },
  { slug: 'discord-bot', path: '/community-admins/discord-bot' },
  { slug: 'role-assignments', path: '/community-admins/role-assignments' },
  { slug: 'nickname-management', path: '/community-admins/nickname-management' },
  { slug: 'branding-assets', path: '/community-admins/branding-assets' },
  { slug: 'maintenance-and-support', path: '/community-admins/maintenance-and-support' },
  { slug: 'community-developers', path: '/community-developers/' },
  { slug: 'developer-access', path: '/community-developers/access' },
  { slug: 'developer-client-types', path: '/community-developers/client-types' },
  { slug: 'developer-applications', path: '/community-developers/applications' },
  { slug: 'developer-terms', path: '/community-developers/terms' },
]

const viewports = [
  { name: 'desktop', width: 1440, height: 1000, isMobile: false, colorScheme: 'light' },
  { name: 'desktop-dark', width: 1440, height: 1000, isMobile: false, colorScheme: 'dark' },
  { name: 'mobile', width: 390, height: 844, isMobile: true, colorScheme: 'light' },
]

fs.mkdirSync(outputDir, { recursive: true })

const browser = await chromium.launch({
  headless: true,
  ...(browserChannel ? { channel: browserChannel } : {}),
  ...(browserExecutablePath ? { executablePath: browserExecutablePath } : {}),
})
const auditResults = []

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      colorScheme: viewport.colorScheme,
    })

    for (const pageInfo of pages) {
      const page = await context.newPage()
      const targetUrl = `${baseUrl}${pageInfo.path}`
      await page.goto(targetUrl, { waitUntil: 'networkidle' })
      await page.evaluate(() => document.fonts?.ready)
      await page.waitForFunction(() => {
        const diagrams = [...document.querySelectorAll('.cid-mermaid')]

        return diagrams.every(element => element.querySelector('svg'))
      }, { timeout: 10000 }).catch(() => {})

      const screenshotPath = path.join(outputDir, `${viewport.name}-${pageInfo.slug}.png`)
      await page.screenshot({ path: screenshotPath, fullPage: true })

      const metrics = await page.evaluate(() => {
        const doc = document.documentElement
        const viewportWidth = doc.clientWidth
        const offenders = [...document.body.querySelectorAll('*')]
          .map((element) => {
            const rect = element.getBoundingClientRect()
            const className = element.className?.toString?.() || ''
            return {
              tag: element.tagName.toLowerCase(),
              className,
              isExpectedOffCanvas: Boolean(element.closest('.VPSidebar, .VPNavScreen')),
              text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            }
          })
          .filter(item => !item.isExpectedOffCanvas && item.width > 0 && (item.left < -2 || item.right > viewportWidth + 2))
          .slice(0, 20)

        const figures = [...document.querySelectorAll('figure')].map((element) => {
          const rect = element.getBoundingClientRect()
          return {
            width: Math.round(rect.width),
            text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 140),
          }
        })

        const diagrams = [...document.querySelectorAll('.cid-mermaid')].map((element) => {
          const rect = element.getBoundingClientRect()
          return {
            width: Math.round(rect.width),
            hasSvg: Boolean(element.querySelector('svg')),
            text: (element.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 140),
          }
        })

        const paragraphs = [...document.querySelectorAll('main p')]
          .map(element => (element.textContent || '').trim().replace(/\s+/g, ' '))
          .filter(Boolean)

        return {
          title: document.title,
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth + 1,
          offenders,
          figureCount: figures.length,
          figures,
          diagramCount: diagrams.length,
          unrenderedDiagramCount: diagrams.filter(diagram => !diagram.hasSvg).length,
          diagrams,
          h2s: [...document.querySelectorAll('h2')].map(element => element.textContent.trim()),
          detailsCount: document.querySelectorAll('details').length,
          paragraphCount: paragraphs.length,
          shortParagraphCount: paragraphs.filter(text => text.length < 55).length,
          shortParagraphSamples: paragraphs.filter(text => text.length < 55).slice(0, 10),
        }
      })

      auditResults.push({
        viewport: viewport.name,
        page: pageInfo.slug,
        path: pageInfo.path,
        screenshotPath,
        metrics,
      })

      await page.close()
    }

    await context.close()
  }
}
finally {
  await browser.close()
}

console.log(JSON.stringify({ baseUrl, outputDir, auditResults }, null, 2))
