import type { AddressInfo } from 'node:net'
import assert from 'node:assert/strict'
import { mkdir, mkdtemp, readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { runCaptures } from './runner.js'
import { targets, viewports } from './targets.js'

const pngSignature = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]
const fixturePath = fileURLToPath(new URL('./fixture.html', import.meta.url))
const fixtureHtml = await readFile(fixturePath)
const server = createServer((request, response) => {
  if (request.method !== 'GET') {
    response.writeHead(405, { allow: 'GET' })
    response.end()
    return
  }

  response.writeHead(200, {
    'content-length': fixtureHtml.length,
    'content-type': 'text/html; charset=utf-8',
  })
  response.end(fixtureHtml)
})

await listen(server)

try {
  const address = server.address()

  assertAddressInfo(address)

  const outputDir = await mkdtemp(path.join(tmpdir(), 'citizenid-app-screenshots-'))
  await mkdir(outputDir, { recursive: true })

  const results = await runCaptures(
    {
      baseUrl: new URL(`http://127.0.0.1:${address.port}/`),
      outputDir,
      selectedTargets: ['home', 'legal-cookies', 'analytics-banner', 'privacy-preferences-dialog'],
      selectedViewports: ['desktop'],
      forceFullPage: false,
    },
    targets,
    viewports,
  )

  assert.equal(results.length, 4)

  for (const result of results) {
    const outputStats = await stat(result.outputPath)
    const output = await readFile(result.outputPath)

    assert.equal(outputStats.size, result.size)
    assert.deepEqual([...output.subarray(0, pngSignature.length)], pngSignature)
    assert.ok(result.width > 0, `${result.outputPath} should report a width`)
    assert.ok(result.height > 0, `${result.outputPath} should report a height`)
  }

  console.log(JSON.stringify({ outputDir, results }, null, 2))
}
finally {
  await close(server)
}

function listen(serverToStart: typeof server) {
  return new Promise<void>((resolve, reject) => {
    serverToStart.once('error', reject)
    serverToStart.listen(0, '127.0.0.1', () => {
      serverToStart.off('error', reject)
      resolve()
    })
  })
}

function close(serverToClose: typeof server) {
  return new Promise<void>((resolve, reject) => {
    serverToClose.close((error) => {
      if (error) {
        reject(error)
        return
      }

      resolve()
    })
  })
}

function assertAddressInfo(address: string | AddressInfo | null): asserts address is AddressInfo {
  if (!address || typeof address === 'string') {
    throw new TypeError('Smoke server did not bind to a TCP address.')
  }
}
