import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const distDir = path.join('docs', '.vitepress', 'dist')
const nonDiagramPages = [
  'index.html',
  path.join('players', 'website-basics.html'),
  path.join('players', 'linked-accounts.html'),
]

const eagerMermaidPatterns = [
  /modulepreload" href="[^"]*(?:katex|dagre|cytoscape|diagram|mermaid)/i,
  /virtual_mermaid-config/i,
]

for (const pagePath of nonDiagramPages) {
  const htmlPath = path.join(distDir, pagePath)
  const html = fs.readFileSync(htmlPath, 'utf8')

  for (const pattern of eagerMermaidPatterns) {
    assert.equal(
      pattern.test(html),
      false,
      `${pagePath} should not eagerly preload Mermaid runtime chunks`,
    )
  }
}
