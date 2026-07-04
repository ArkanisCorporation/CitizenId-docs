import type { CaptureResult, CaptureTarget, CaptureViewport, CliCommand } from './types.js'
import path from 'node:path'

interface ParsedArgs {
  baseUrl?: string
  displayOrigin?: string
  outputDir?: string
  selectedTargets: string[]
  selectedViewports: string[]
  forceFullPage: boolean
  debug: boolean
  listTargets: boolean
}

const defaultBaseUrl = 'http://localhost:5085'
const defaultDisplayOrigin = 'https://citizenid.space'

export function parseCli(
  args: string[],
  targets: CaptureTarget[],
  viewports: CaptureViewport[],
): CliCommand {
  const parsed = parseArgs(args)

  if (parsed.listTargets) {
    return { kind: 'list', text: formatTargetList(targets, viewports) }
  }

  return {
    kind: 'capture',
    options: {
      baseUrl: new URL(parsed.baseUrl ?? defaultBaseUrl),
      displayOrigin: new URL(parsed.displayOrigin ?? defaultDisplayOrigin),
      outputDir: parsed.outputDir ?? path.join('docs', 'public', 'images', 'app-screenshots'),
      selectedTargets: parsed.selectedTargets,
      selectedViewports: parsed.selectedViewports,
      forceFullPage: parsed.forceFullPage,
      debug: parsed.debug,
    },
  }
}

export function printResults(results: CaptureResult[]) {
  if (results.length === 0) {
    console.log('No screenshots captured.')
    return
  }

  console.table(results.map(result => ({
    target: result.targetId,
    viewport: result.viewportId,
    width: result.width,
    height: result.height,
    size: result.size,
    output: result.outputPath,
  })))
}

function parseArgs(args: string[]): ParsedArgs {
  const parsed: ParsedArgs = {
    selectedTargets: [],
    selectedViewports: [],
    forceFullPage: false,
    debug: false,
    listTargets: false,
  }

  const normalizedArgs = args[0] === '--'
    ? args.slice(1)
    : args

  for (let index = 0; index < normalizedArgs.length; index += 1) {
    const arg = normalizedArgs[index]

    switch (arg) {
      case '--base-url':
        parsed.baseUrl = readValue(normalizedArgs, ++index, arg)
        break
      case '--display-origin':
        parsed.displayOrigin = readValue(normalizedArgs, ++index, arg)
        break
      case '--output-dir':
        parsed.outputDir = readValue(normalizedArgs, ++index, arg)
        break
      case '--target':
        parsed.selectedTargets.push(readValue(normalizedArgs, ++index, arg))
        break
      case '--viewport':
        parsed.selectedViewports.push(readValue(normalizedArgs, ++index, arg))
        break
      case '--full-page':
        parsed.forceFullPage = true
        break
      case '--debug':
        parsed.debug = true
        break
      case '--list-targets':
        parsed.listTargets = true
        break
      default:
        throw new Error(`Unknown argument '${arg}'.`)
    }
  }

  return parsed
}

function readValue(args: string[], index: number, name: string) {
  const value = args[index]

  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${name}.`)
  }

  return value
}

function formatTargetList(targets: CaptureTarget[], viewports: CaptureViewport[]) {
  const targetLines = targets.map(target => `  - ${target.id} (${target.scope}) ${target.path}`)
  const viewportLines = viewports.map(viewport => `  - ${viewport.id} (${viewport.width}x${viewport.height})`)

  return [
    'Targets:',
    ...targetLines,
    '',
    'Viewports:',
    ...viewportLines,
  ].join('\n')
}
