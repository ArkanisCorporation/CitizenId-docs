# Citizen iD App Screenshot Capture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build TypeScript screenshot capture infrastructure for local Citizen iD app pages so generated PNG assets can be embedded in the documentation site.

**Architecture:** The implementation adds a small TypeScript runner in `CitizenId-docs` that accepts a local `--base-url`, runs Browserless/Puppeteer capture targets described in code, and writes PNGs to `docs/public/images/app-screenshots`. Browserless owns navigation, selector waits, injected page styles, animation reduction, and browser-side capture setup where possible; Sharp owns deterministic image post-processing such as padding, rounded corners, shadows, and output metadata.

**Tech Stack:** PNPM, TypeScript, `tsx`, `puppeteer`, `browserless`, `sharp`, Node.js HTTP fixture server.

---

## File Structure

- Modify `package.json` to add screenshot scripts and development dependencies.
- Modify `pnpm-lock.yaml` through `pnpm add -D browserless puppeteer sharp tsx`.
- Create `scripts/capture-app-screenshots.ts` as the CLI entry point.
- Create `scripts/app-screenshots/types.ts` for target, viewport, step, frame, and result contracts.
- Create `scripts/app-screenshots/targets.ts` for direct TypeScript target definitions.
- Create `scripts/app-screenshots/cli.ts` for argument parsing, target filtering, and result-table printing.
- Create `scripts/app-screenshots/browser.ts` for Browserless context creation, navigation, steps, and raw screenshot capture.
- Create `scripts/app-screenshots/frame.ts` for Sharp-based post-processing.
- Create `scripts/app-screenshots/runner.ts` for orchestration, validation, output naming, and file writes.
- Create `scripts/app-screenshots/fixture.html` for smoke verification without the Citizen iD app.
- Create `scripts/app-screenshots/smoke.ts` for a local fixture capture smoke test.

---

### Task 1: Dependencies And Scripts

**Files:**
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Add dependencies**

Run:

```powershell
rtk pnpm add -D browserless puppeteer sharp tsx
```

Expected: `package.json` contains `browserless`, `puppeteer`, `sharp`, and `tsx` in `devDependencies`, and `pnpm-lock.yaml` is updated.

- [ ] **Step 2: Add PNPM scripts**

Add these scripts to `package.json`:

```json
{
  "screenshots:app": "tsx scripts/capture-app-screenshots.ts",
  "screenshots:app:smoke": "tsx scripts/app-screenshots/smoke.ts"
}
```

Expected: `pnpm screenshots:app -- --list-targets` can run once the CLI exists.

- [ ] **Step 3: Commit dependency scaffold**

Run:

```powershell
rtk git add package.json pnpm-lock.yaml
rtk git commit -m "build: add app screenshot tooling deps"
```

Expected: commit succeeds with only dependency and script changes.

---

### Task 2: Types, Targets, And CLI

**Files:**
- Create: `scripts/capture-app-screenshots.ts`
- Create: `scripts/app-screenshots/types.ts`
- Create: `scripts/app-screenshots/targets.ts`
- Create: `scripts/app-screenshots/cli.ts`

- [ ] **Step 1: Create type contracts**

Create `scripts/app-screenshots/types.ts` with contracts equivalent to:

```ts
export type ScreenshotScope = 'viewport' | 'fullPage' | 'element'

export interface CaptureViewport {
  id: string
  width: number
  height: number
  deviceScaleFactor?: number
  isMobile?: boolean
}

export interface CaptureFrame {
  padding?: number
  background?: string
  borderRadius?: number
  shadow?: {
    blur: number
    offsetX?: number
    offsetY?: number
    color: string
  }
}

export type CaptureStep
  = | { type: 'clearLocalStorage' }
    | { type: 'click', selector: string }
    | { type: 'waitForSelector', selector: string, visible?: boolean, timeoutMs?: number }
    | { type: 'evaluate', script: string }

export interface CaptureTarget {
  id: string
  path: string
  scope: ScreenshotScope
  selector?: string
  outputName?: string
  viewports?: string[]
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
  waitForSelector?: string
  steps?: CaptureStep[]
  styles?: string[]
  frame?: CaptureFrame
  scrollIntoView?: boolean
}

export interface CaptureOptions {
  baseUrl: URL
  outputDir: string
  selectedTargets: string[]
  selectedViewports: string[]
  forceFullPage: boolean
}

export interface CaptureResult {
  targetId: string
  viewportId: string
  outputPath: string
  width: number
  height: number
  size: number
}
```

- [ ] **Step 2: Create direct TypeScript targets**

Create `scripts/app-screenshots/targets.ts` with:

```ts
import type { CaptureTarget, CaptureViewport } from './types.js'

export const viewports: CaptureViewport[] = [
  { id: 'desktop', width: 1440, height: 1000, deviceScaleFactor: 1 },
  { id: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
]

export const defaultFrame = {
  padding: 32,
  background: '#101114',
  borderRadius: 16,
  shadow: {
    blur: 42,
    offsetY: 18,
    color: 'rgba(0,0,0,0.35)',
  },
} satisfies CaptureTarget['frame']

export const deterministicStyles = [
  `*, *::before, *::after {
    caret-color: transparent !important;
    transition-duration: 0s !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }`,
  `.crisp-client, #quackback-widget, .posthog-capture-status {
    display: none !important;
  }`,
]

export const targets: CaptureTarget[] = [
  { id: 'home', path: '/', scope: 'viewport', styles: deterministicStyles },
  { id: 'sign-in', path: '/sign-in', scope: 'viewport', styles: deterministicStyles },
  { id: 'sign-up', path: '/sign-up', scope: 'viewport', styles: deterministicStyles },
  { id: 'legal-cookies', path: '/legal/cookies', scope: 'fullPage', styles: deterministicStyles },
  { id: 'legal-privacy-policy', path: '/legal/privacy-policy', scope: 'fullPage', styles: deterministicStyles },
  { id: 'legal-providers', path: '/legal/providers', scope: 'fullPage', styles: deterministicStyles },
  {
    id: 'analytics-banner',
    path: '/',
    scope: 'element',
    selector: '.privacy-preferences-banner__surface',
    steps: [
      { type: 'clearLocalStorage' },
      { type: 'waitForSelector', selector: '.privacy-preferences-banner__surface', visible: true },
    ],
    styles: deterministicStyles,
    frame: defaultFrame,
  },
  {
    id: 'privacy-preferences-dialog',
    path: '/',
    scope: 'element',
    selector: '.mud-dialog',
    steps: [
      { type: 'clearLocalStorage' },
      { type: 'waitForSelector', selector: '.privacy-preferences-banner__surface', visible: true },
      { type: 'click', selector: '.privacy-preferences-banner button:last-child' },
      { type: 'waitForSelector', selector: '.mud-dialog', visible: true },
    ],
    styles: deterministicStyles,
    frame: defaultFrame,
  },
]
```

- [ ] **Step 3: Create CLI parsing**

Create `scripts/app-screenshots/cli.ts` so it:

- Parses `--base-url`, `--output-dir`, `--target`, `--viewport`, `--full-page`, and `--list-targets`.
- Throws a clear error when `--base-url` is missing unless `--list-targets` is used.
- Defaults `outputDir` to `docs/public/images/app-screenshots`.
- Supports repeated `--target` and `--viewport`.
- Prints target ids and viewport ids for `--list-targets`.

- [ ] **Step 4: Create entry point**

Create `scripts/capture-app-screenshots.ts`:

```ts
#!/usr/bin/env node
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
```

- [ ] **Step 5: Run list-targets**

Run:

```powershell
rtk pnpm screenshots:app -- --list-targets
```

Expected: target ids and viewport ids print without requiring a base URL.

- [ ] **Step 6: Commit types and CLI**

Run:

```powershell
rtk git add scripts/capture-app-screenshots.ts scripts/app-screenshots/types.ts scripts/app-screenshots/targets.ts scripts/app-screenshots/cli.ts package.json pnpm-lock.yaml
rtk git commit -m "feat: add screenshot target cli"
```

Expected: commit succeeds with runnable list-targets behavior.

---

### Task 3: Browser Capture And Image Framing

**Files:**
- Create: `scripts/app-screenshots/browser.ts`
- Create: `scripts/app-screenshots/frame.ts`
- Create: `scripts/app-screenshots/runner.ts`

- [ ] **Step 1: Implement Sharp framing**

Create `scripts/app-screenshots/frame.ts` with `frameScreenshot(buffer, frame)` that:

- Reads input dimensions with `sharp(buffer).metadata()`.
- Creates a background canvas with padding and shadow-safe margins.
- Applies a rounded mask when `borderRadius` is configured.
- Adds a blurred shadow layer when `shadow` is configured.
- Composites the screenshot above the shadow.
- Returns `{ data, info }` from `sharp(...).png().toBuffer({ resolveWithObject: true })`.

- [ ] **Step 2: Implement Browserless capture**

Create `scripts/app-screenshots/browser.ts` with `captureRawScreenshot(browserless, target, viewport, baseUrl, forceFullPage)` that:

- Builds the absolute URL from `baseUrl` and target path.
- Uses Browserless/Puppeteer page navigation.
- Sets viewport from target viewport.
- Applies `target.styles` through Browserless-compatible style injection.
- Runs `target.steps`.
- Waits for `target.waitForSelector` and element selectors.
- Captures viewport, full page, or element screenshots.
- Closes pages and contexts reliably.

- [ ] **Step 3: Implement runner orchestration**

Create `scripts/app-screenshots/runner.ts` with `runCaptures(options, targets, viewports)` that:

- Validates duplicate ids.
- Filters selected targets and viewports.
- Fails on unknown target ids or viewport ids.
- Creates the output directory.
- Checks that `baseUrl` is reachable.
- Creates a Browserless browser factory once.
- Runs each selected target and viewport in isolated context.
- Applies `frameScreenshot` when configured.
- Writes PNGs to deterministic filenames.
- Closes Browserless browser in `finally`.

- [ ] **Step 4: Run list-targets and lint**

Run:

```powershell
rtk pnpm screenshots:app -- --list-targets
rtk pnpm lint
```

Expected: both commands pass.

- [ ] **Step 5: Commit capture engine**

Run:

```powershell
rtk git add scripts/app-screenshots/browser.ts scripts/app-screenshots/frame.ts scripts/app-screenshots/runner.ts scripts/capture-app-screenshots.ts
rtk git commit -m "feat: capture app screenshots"
```

Expected: commit succeeds with the browser capture engine.

---

### Task 4: Fixture Smoke Verification

**Files:**
- Create: `scripts/app-screenshots/fixture.html`
- Create: `scripts/app-screenshots/smoke.ts`
- Modify: `package.json` if the smoke script was not added in Task 1.

- [ ] **Step 1: Create fixture HTML**

Create `scripts/app-screenshots/fixture.html` containing:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Citizen iD screenshot fixture</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; background: #101114; color: #f7f7fb; }
    main { min-height: 100vh; display: grid; place-items: center; padding: 48px; }
    .fixture-card { width: 520px; max-width: 100%; padding: 28px; border-radius: 18px; background: #27272f; }
    .privacy-preferences-banner__surface { padding: 24px; border-radius: 16px; background: #ffffff; color: #15151a; }
    .mud-dialog { margin-top: 24px; padding: 24px; border-radius: 16px; background: #20232a; color: #ffffff; }
  </style>
</head>
<body>
  <main>
    <section class="fixture-card">
      <h1>Citizen iD</h1>
      <p>Screenshot fixture page.</p>
      <div class="privacy-preferences-banner__surface">
        Analytics banner fixture.
        <button>Manage preferences</button>
      </div>
      <dialog class="mud-dialog" open>
        Privacy Preferences fixture.
      </dialog>
    </section>
  </main>
</body>
</html>
```

- [ ] **Step 2: Create smoke script**

Create `scripts/app-screenshots/smoke.ts` so it:

- Starts a local Node HTTP server on an available port.
- Serves `fixture.html`.
- Runs `runCaptures` with two fixture-only targets.
- Writes output to a temporary directory under `node:os.tmpdir()`.
- Verifies at least two PNG files were produced.
- Logs output paths.
- Closes the server in `finally`.

- [ ] **Step 3: Run smoke**

Run:

```powershell
rtk pnpm screenshots:app:smoke
```

Expected: the script reports generated PNG paths and exits `0`.

- [ ] **Step 4: Commit smoke verification**

Run:

```powershell
rtk git add scripts/app-screenshots/fixture.html scripts/app-screenshots/smoke.ts package.json
rtk git commit -m "test: add screenshot smoke fixture"
```

Expected: commit succeeds with smoke verification files.

---

### Task 5: Final Verification And Documentation Stewardship

**Files:**
- Modify: `docs/superpowers/plans/2026-07-03-citizenid-app-screenshot-capture.md`
- Modify: `README.md` only if the implementation reveals a durable human workflow that should be documented.
- Modify: `docs/AGENTS.md` only if the implementation reveals a durable agent convention for screenshot assets.

- [ ] **Step 1: Run final verification**

Run:

```powershell
rtk pnpm screenshots:app -- --list-targets
rtk pnpm screenshots:app:smoke
rtk pnpm lint
```

Expected: all commands pass.

- [ ] **Step 2: Check generated and unintended files**

Run:

```powershell
rtk git status --short --untracked-files=all
```

Expected: only intended implementation files and plan updates remain.

- [ ] **Step 3: Review documentation stewardship**

If no durable repo convention was learned beyond the plan/spec, do not edit README or AGENTS.

If a durable convention was learned, add one short sentence to the nearest applicable docs file.

- [ ] **Step 4: Commit final plan updates or docs**

If only the plan changed, run:

```powershell
rtk git add docs/superpowers/plans/2026-07-03-citizenid-app-screenshot-capture.md
rtk git commit -m "docs: record screenshot capture execution"
```

If README or AGENTS changed too, include those files and use:

```powershell
rtk git add docs/superpowers/plans/2026-07-03-citizenid-app-screenshot-capture.md README.md docs/AGENTS.md
rtk git commit -m "docs: document screenshot capture workflow"
```

Expected: final commit succeeds or no commit is needed because prior commits already include all final changes.
