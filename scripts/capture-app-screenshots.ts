#!/usr/bin/env node
import process from 'node:process'
import { parseCli, printResults } from './app-screenshots/cli.js'
import { runCaptures } from './app-screenshots/runner.js'
import { targets, viewports } from './app-screenshots/targets.js'

const command = parseCli(process.argv.slice(2), targets, viewports)

if (command.kind === 'list') {
  console.log(command.text)
}
else {
  const results = await runCaptures(command.options, targets, viewports)
  printResults(results)
}
