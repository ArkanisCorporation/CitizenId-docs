# Documentation Platform, OpenAPI, And Readability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the unimplemented platform work from the July 20 design and establish the readable, testable presentation foundations required by the complete Community Developer migration.

**Architecture:** Keep the normal VitePress build fully offline by checking in a validated OpenAPI snapshot, load the API browser only on its route, and express layout behavior through small Vue components plus one shared wide-content CSS primitive.
Quality checks are executable contracts: unit tests cover data and rendering helpers, focused browser checks cover interaction and containment, and later suite plans promote those checks into repository-wide gates.

**Tech Stack:** VitePress 1.6.4, Vue 3.5, TypeScript, Mermaid 11, Playwright, Redocly CLI 2.40.0, vitepress-openapi 0.2.2, Lighthouse CI 0.15.1, Node.js 22.13.

## Global Constraints

- Implement against `docs/superpowers/specs/2026-07-26-community-developers-complete-migration-design.md` and the reconciliation in `2026-07-26-community-developers-complete-migration-implementation.md`.
- Preserve every current credential-shaped proof byte-for-byte unless the migration exception process records positive evidence that a value is sensitive or operational.
- Keep `pnpm build` and the normal VitePress dev server independent of network access.
- Treat the checked-in OpenAPI snapshot as generated input with a provenance lock, not as hand-authored documentation.
- Keep `ScenarioContext`'s public `fixture`, `focus`, and `view` props compatible with current Markdown.
- Give each wide or scrollable surface exactly one width expansion owner and one local overflow owner.
- Write every new or edited Markdown sentence on its own source line.
- Use test-first steps and commit only the files named by each task.

## Source Design Reconciliation

This plan carries forward Tasks 1 through 5 and Task 10 from `2026-07-20-documentation-platform-openapi-quality.md` with these changes:

- July 20 Task 1 is retained, with Redocly CLI updated from 2.39.0 to the currently verified 2.40.0 release.
- July 20 Task 2's source exclusion and generated-route assertion are retained.
Its instruction to replace credential-shaped samples with placeholders is superseded by the approved proof-integrity contract.
- July 20 Tasks 3 and 4 are retained as the reproducible OpenAPI snapshot and lazy read-only browser design.
- July 20 Task 5 is an implemented baseline, not completed work for this rework.
Its components now receive the Scenario Context, glossary, Mermaid, and wide-content changes below.
- July 20 Task 10 is retained and extended to cover every current and migrated image consumer.
- July 20 Tasks 6 through 9 and 11 are assigned to the companion content and closure plans.

## Task 1: Pin The Documentation Toolchain And Preview Lifecycle

**Files:**

- Create: `.node-version`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`
- Create: `scripts/toolchain-smoke.mjs`
- Modify: `scripts/image-stepper-smoke.mjs`
- Modify: `scripts/fragment-navigation-smoke.mjs`

- [ ] **Step 1: Write the failing toolchain smoke test**

Create `scripts/toolchain-smoke.mjs` to assert all of the following:

```js
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url)))
const nodeVersion = (await readFile(new URL('../.node-version', import.meta.url), 'utf8')).trim()

assert.equal(nodeVersion, '22.13.0')
assert.equal(packageJson.engines.node, '>=22.13.0 <23')
assert.match(packageJson.packageManager, /^pnpm@9\.15\.3\+/)
assert.equal(packageJson.devDependencies['vitepress-openapi'], '0.2.2')
assert.equal(packageJson.devDependencies['@redocly/cli'], '2.40.0')
assert.equal(packageJson.devDependencies['@lhci/cli'], '0.15.1')
assert.equal(packageJson.devDependencies['start-server-and-test'], '3.0.11')
assert.equal(
  packageJson.scripts['serve:audit'],
  'vitepress serve docs --host 127.0.0.1 --port 4173',
)
```

- [ ] **Step 2: Prove the test fails before the pinning change**

Run `rtk node scripts/toolchain-smoke.mjs`.

Expected: failure because `.node-version` and the exact package pins are absent.

- [ ] **Step 3: Add the runtime and exact dependency pins**

Add `.node-version` with `22.13.0`.
Add the `engines.node` contract and install the four exact development dependencies without a caret or tilde.
Add `serve:audit` as the single bounded-preview server command used by every later browser wrapper.
Make the existing ImageStepper and fragment-navigation smokes require an explicit `--base-url` and never assume port 5174.
Expose `audit:image-stepper` and `audit:fragment-navigation` as same-preview workers and keep `visual:image-stepper` and `visual:fragment-navigation` as build-plus-bounded-preview wrappers.

Run:

```powershell
rtk pnpm add --save-dev --save-exact vitepress-openapi@0.2.2 @redocly/cli@2.40.0 @lhci/cli@0.15.1 start-server-and-test@3.0.11
```

Use this initial preview surface:

```json
{
  "scripts": {
    "serve:audit": "vitepress serve docs --host 127.0.0.1 --port 4173",
    "audit:image-stepper": "node scripts/image-stepper-smoke.mjs --base-url http://127.0.0.1:4173",
    "audit:fragment-navigation": "node scripts/fragment-navigation-smoke.mjs --base-url http://127.0.0.1:4173",
    "visual:image-stepper": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:image-stepper\"",
    "visual:fragment-navigation": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:fragment-navigation\""
  }
}
```

- [ ] **Step 4: Verify the pinned toolchain**

Run:

```powershell
rtk node scripts/toolchain-smoke.mjs
rtk pnpm install --frozen-lockfile
```

Expected: both commands pass with no lockfile change on the second install.

- [ ] **Step 5: Commit the toolchain contract**

```powershell
rtk git add .node-version package.json pnpm-lock.yaml scripts/toolchain-smoke.mjs scripts/image-stepper-smoke.mjs scripts/fragment-navigation-smoke.mjs
rtk git commit -m "chore(docs): pin documentation quality toolchain"
```

## Task 2: Exclude Authoring Sources From The Public Site

**Files:**

- Modify: `docs/.vitepress/config.mts`
- Create: `scripts/audit-routes.mjs`
- Create: `scripts/audit-routes.test.mjs`
- Create: `scripts/publishing-surface-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing source and output assertions**

Create `scripts/audit-routes.mjs` as the single public route and viewport inventory consumed by publishing, content, visual, and closure checks.
Each route records `id`, `path`, `group`, `layouts`, `expectedTitle`, and `readySelector`.
Seed it with every current public route and let later content tasks append the planned routes.

Make `scripts/publishing-surface-smoke.mjs` accept an optional built-output path and assert that:

- configuration contains source-relative `**/AGENTS.md` and `superpowers/**` exclusions;
- no generated HTML route contains `/AGENTS`, `/superpowers/`, a plan title, or a specification title;
- sitemap and local-search payloads contain none of those values;
- every route in the shared public-route inventory has generated output.

Add `content:surface` to `package.json`:

```json
{
  "scripts": {
    "content:surface": "node scripts/publishing-surface-smoke.mjs docs/.vitepress/dist"
  }
}
```

- [ ] **Step 2: Prove the current build exposes authoring sources**

Run:

```powershell
rtk pnpm build
rtk pnpm content:surface
```

Expected: the new assertion fails before `srcExclude` is configured.

- [ ] **Step 3: Configure the public-source boundary**

Add the following top-level VitePress option in `docs/.vitepress/config.mts`:

```ts
export default defineConfig({
  srcExclude: ['**/AGENTS.md', 'superpowers/**'],
})
```

Do not exclude public snippets, OpenAPI artifacts, or reusable examples that a rendered page imports.

- [ ] **Step 4: Verify source, sitemap, and search exclusion**

Run:

```powershell
rtk pnpm build
rtk pnpm content:surface
rtk pnpm lint
```

Expected: no authoring or agent-control page is present in generated output.

- [ ] **Step 5: Commit the publishing boundary**

```powershell
rtk git add docs/.vitepress/config.mts scripts/audit-routes.mjs scripts/audit-routes.test.mjs scripts/publishing-surface-smoke.mjs package.json
rtk git commit -m "fix(docs): exclude authoring sources from publishing"
```

## Task 3: Add A Reproducible OpenAPI Snapshot And Quality Ratchet

**Files:**

- Create: `openapi/citizenid.source.json`
- Create: `openapi/source-lock.json`
- Create: `openapi/quality-baseline.json`
- Create: `openapi/operation-metadata.json`
- Create: `.redocly.lint-ignore.yaml`
- Create: `redocly.yaml`
- Create: `docs/public/openapi/current/openapi.json`
- Create: `docs/public/openapi/current/operation-metadata.json`
- Create: `scripts/openapi/sync.mjs`
- Create: `scripts/openapi/determinism.test.mjs`
- Create: `scripts/openapi/prepare-metadata.mjs`
- Create: `scripts/openapi/quality-smoke.mjs`
- Create: `scripts/openapi/quality-smoke.test.mjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Write fixture-driven failing tests for the synchronizer and ratchet**

Export pure helpers from `scripts/openapi/sync.mjs` and `scripts/openapi/quality-smoke.mjs`.
Test them with in-memory documents, without accessing the network.

Cover these failures:

- cross-origin redirect;
- non-JSON response;
- non-OpenAPI-3 document;
- empty `paths`;
- missing `info`;
- duplicate `operationId`;
- operation removed from the baseline;
- an existing operation loses summary, description, local security, a 4xx response, or example evidence;
- a new operation lacks any required quality field.

Recompute the source SHA-256, OpenAPI version, API version, path count, and operation count and reject any mismatch with `source-lock.json`.
Require exactly one reviewed `operation-metadata.json` record for every stable method-and-path key and reject missing or stale keys.
Each metadata record must contain environment, authentication context, minimum scopes, implementation status, evidence, reviewer, and review timestamp.
Do not infer missing scopes or authentication semantics merely to make the overlay complete.

The determinism test must prepare the same checked-in source and metadata twice in isolated temporary output directories and assert byte-identical public JSON and SHA-256 values.

Use the stable key `${method.toUpperCase()} ${path}` rather than array position.

- [ ] **Step 2: Prove the tests fail**

Run `rtk node --test scripts/openapi/quality-smoke.test.mjs`.

Expected: module-not-found or missing-export failure.

- [ ] **Step 3: Implement the network-explicit synchronizer**

`scripts/openapi/sync.mjs` must:

- fetch only `https://citizenid.space/openapi/current/openapi.json`;
- use a bounded request timeout;
- reject redirects whose final origin is not `https://citizenid.space`;
- validate content type and the document shape before writing;
- write `openapi/citizenid.source.json` atomically;
- write `openapi/source-lock.json` with source URL, final URL, fetched-at UTC value, SHA-256, `info.version`, and path and operation counts;
- never update the checked-in browser artifact until validation and bundling pass.

- [ ] **Step 4: Configure Redocly linting and the quality baseline**

Configure `redocly.yaml` with the `recommended` ruleset and an `apis.citizenid.root` alias.
Generate `.redocly.lint-ignore.yaml` only for verified pre-existing violations.
Record every ignored rule and JSON pointer in `openapi/quality-baseline.json`, together with the per-operation fields tracked by the ratchet.
Populate `openapi/operation-metadata.json` only from reviewed source or service-owner evidence.
The docs-owned overlay supplies explanatory context that the upstream schema does not yet express; it must not rewrite the checked-in OpenAPI document.
If any operation cannot be classified from current evidence, leave it pending and stop this task rather than assigning a permissive authentication context or empty scope set.

The ratchet may allow existing debt but must reject new debt and regression of an existing operation.

- [ ] **Step 5: Add deterministic preparation scripts**

Add these `package.json` scripts:

```json
{
  "scripts": {
    "openapi:sync": "node scripts/openapi/sync.mjs",
    "openapi:lint": "redocly lint citizenid",
    "openapi:bundle": "redocly bundle citizenid --output docs/public/openapi/current/openapi.json --ext json",
    "openapi:quality": "node scripts/openapi/quality-smoke.mjs",
    "openapi:metadata": "node scripts/openapi/prepare-metadata.mjs",
    "openapi:prepare": "pnpm openapi:lint && pnpm openapi:quality && pnpm openapi:metadata && pnpm openapi:bundle",
    "openapi:verify": "pnpm openapi:prepare && git diff --exit-code -- docs/public/openapi/current/openapi.json docs/public/openapi/current/operation-metadata.json"
  }
}
```

Do not add `openapi:sync` to `build`.

- [ ] **Step 6: Capture, review, and prove deterministic output**

Run:

```powershell
rtk pnpm openapi:sync
rtk pnpm openapi:prepare
rtk node --test scripts/openapi/quality-smoke.test.mjs
rtk node --test scripts/openapi/determinism.test.mjs
rtk pnpm openapi:verify
```

Inspect the source lock and baseline diff before accepting it.
Run `openapi:prepare` a second time and require both the bundle hash and Git diff to remain unchanged.
If the endpoint is unavailable, stop; do not fabricate or infer an API schema.

- [ ] **Step 7: Commit the reproducible API input**

```powershell
rtk git add openapi docs/public/openapi/current/openapi.json docs/public/openapi/current/operation-metadata.json scripts/openapi redocly.yaml .redocly.lint-ignore.yaml package.json .gitignore
rtk git commit -m "feat(docs): add reproducible OpenAPI snapshot"
```

## Task 4: Embed A Lazy Read-Only OpenAPI Browser

**Files:**

- Create: `docs/.vitepress/theme/components/OpenApiReference.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Modify: `docs/.vitepress/theme/styles.css`
- Modify: `docs/community-developers/api-reference.md`
- Create: `scripts/openapi-browser-smoke.mjs`
- Modify: `scripts/performance-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing browser contract**

The Playwright smoke test must assert:

- `/community-developers/api-reference` renders at least one operation from the checked-in snapshot;
- the component can filter or navigate operations by path or operation identifier;
- every rendered operation has a matching reviewed context record for environment, authentication, minimum scopes, and implementation status;
- no Try It, Send, password, authorization-secret, or editable request control exists;
- the snapshot and operation-metadata requests are same-origin and resolve;
- interaction creates no authentication entry in local storage or session storage;
- an ordinary page such as `/community-developers/access` does not preload the OpenAPI snapshot or the browser's route-only chunks.

Add this bounded public command with the failing test:

```json
{
  "scripts": {
    "audit:openapi-browser": "node scripts/openapi-browser-smoke.mjs --base-url http://127.0.0.1:4173",
    "openapi:browser:smoke": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:openapi-browser\""
  }
}
```

- [ ] **Step 2: Prove the browser contract fails**

Run `rtk pnpm openapi:browser:smoke`.

Expected: failure because the browser component does not exist.

- [ ] **Step 3: Implement the route-local wrapper**

First restore `await DefaultTheme.enhanceApp?.(context)` in the custom theme so built-in VitePress components such as Badge retain their supported registration path.
Register only `OpenApiReference.vue` as an async component on the outer VitePress application.
Do not call the OpenAPI package enhancer after the outer application has mounted.

Use this registration shape and preserve every existing component registration:

```ts
export default {
  async enhanceApp(context) {
    await DefaultTheme.enhanceApp?.(context)
    context.app.component(
      'OpenApiReference',
      defineAsyncComponent(() => import('./components/OpenApiReference.vue')),
    )
  },
}
```

Inside `OpenApiReference.vue`, fetch the public snapshot once, dynamically import the package client and CSS, and mount the renderer into a small nested Vue application.
Install the package theme on that nested application before mounting it.
Unmount it and abort an in-flight fetch when the wrapper unmounts.

Use this implementation shape:

```vue
<script setup lang="ts">
import type { App } from 'vue'
import { withBase } from 'vitepress'
import { createApp, h, onBeforeUnmount, onMounted, ref } from 'vue'

interface OperationMetadataRecord {
  key: string
  environment: string
  authenticationContext: string
  minimumScopes: string[]
  implementationStatus: string
}

const host = ref<HTMLElement | null>(null)
const state = ref<'loading' | 'ready' | 'error'>('loading')
const message = ref('')
const operationMetadata = ref<OperationMetadataRecord[]>([])
const controller = new AbortController()
let nestedApp: App<Element> | undefined

onMounted(async () => {
  const timeout = window.setTimeout(() => controller.abort(), 10_000)

  try {
    const [response, metadataResponse, openapi] = await Promise.all([
      fetch(withBase('/openapi/current/openapi.json'), { signal: controller.signal }),
      fetch(withBase('/openapi/current/operation-metadata.json'), { signal: controller.signal }),
      import('vitepress-openapi/client'),
      import('vitepress-openapi/dist/style.css'),
    ])

    if (!response.ok)
      throw new Error(`OpenAPI snapshot returned ${response.status}`)
    if (!metadataResponse.ok)
      throw new Error(`OpenAPI operation metadata returned ${metadataResponse.status}`)

    const spec = await response.json()
    operationMetadata.value = await metadataResponse.json()

    openapi.useTheme({
      operation: { hiddenSlots: ['playground'], cols: 2 },
      server: { allowCustomServer: false },
      storage: { persistAuth: false },
      spec: {
        groupByTags: true,
        collapsePaths: true,
        lazyRendering: true,
        disableDownload: true,
      },
    })

    nestedApp = createApp({
      render: () => h(openapi.OASpec, { spec, hideBranding: true }),
    })
    await openapi.theme.enhanceApp({ app: nestedApp } as never)
    nestedApp.mount(host.value!)
    state.value = 'ready'
  }
  catch (error) {
    message.value = error instanceof Error ? error.message : 'Unknown error'
    state.value = 'error'
  }
  finally {
    window.clearTimeout(timeout)
  }
})

onBeforeUnmount(() => {
  controller.abort()
  nestedApp?.unmount()
})
</script>
```

Render a labelled loading region, the `host` element, and an actionable error state in the template.
Render the operation metadata as an accessible context index adjacent to the generated browser, keyed by the same stable method-and-path identifiers.
The smoke test must reject hydration, late-registration, nested-application, and unhandled fetch warnings.
It must also prove that the OpenAPI client, CSS, snapshot, and metadata are absent from ordinary route requests and preload links.

The wrapper must:

- fetch `/openapi/current/openapi.json` from the built site;
- fetch `/openapi/current/operation-metadata.json` from the built site;
- render `<OASpec />` in a labelled region;
- configure `operation.hiddenSlots: ['playground']`, `server.allowCustomServer: false`, `storage.persistAuth: false`, grouped tags, collapsed paths, and lazy operation rendering;
- expose a useful loading state and a bounded, actionable error state;
- import package CSS only with the async component;
- retain an ordinary Markdown introduction and authentication-context explanation above it.

- [ ] **Step 4: Style the reference in both themes**

Add Citizen iD theme overrides only for proven package selectors.
Verify text, controls, borders, code, focus indicators, and operation badges rather than globally recoloring the package.
Apply `.cid-wide-content` to the top-level reference wrapper without adding document-level overflow.

- [ ] **Step 5: Verify behavior and route isolation**

Run:

```powershell
rtk pnpm openapi:verify
rtk pnpm openapi:browser:smoke
rtk node scripts/performance-smoke.mjs
rtk pnpm lint
```

Expected: the API route works, ordinary routes do not request API-browser assets, and no request-authoring UI is present.

- [ ] **Step 6: Commit the read-only browser**

```powershell
rtk git add docs/.vitepress/theme docs/community-developers/api-reference.md scripts/openapi-browser-smoke.mjs scripts/performance-smoke.mjs package.json
rtk git commit -m "feat(docs): add lazy read-only API reference"
```

## Task 5: Create The Shared Wide-Content Primitive

**Files:**

- Modify: `docs/.vitepress/theme/styles.css`
- Create: `docs/.vitepress/theme/components/ProofSurface.vue`
- Modify: `docs/.vitepress/theme/components/MermaidDiagram.vue`
- Modify: `docs/.vitepress/theme/components/DiagramLegend.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Create: `scripts/wide-content-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing geometry assertions**

At 1440, 960, 768, and 390 pixels, measure the document content box and representative top-level and nested wide surfaces.
Before a content page adopts the component, have the smoke inject one labelled `.cid-proof-surface.cid-wide-content` test section containing a real rendered `.vp-code-group` into an existing `.vp-doc`.
Remove that injected fixture after each assertion so it can never become public documentation.
Assert:

- `--cid-wide-content-outset` resolves to 48, 48, 24, and 0 pixels respectively;
- a top-level surface is content width plus twice the outset within two pixels;
- a contained surface adds no second outset;
- a `ProofSurface` containing a VitePress code group applies exactly one outset rather than expanding twice;
- `document.documentElement.scrollWidth <= document.documentElement.clientWidth`;
- local scroll owners are keyboard reachable when overflow exists.

Add a same-preview worker and bounded public wrapper with the failing test:

```json
{
  "scripts": {
    "audit:wide-content": "node scripts/wide-content-smoke.mjs --base-url http://127.0.0.1:4173",
    "wide-content:smoke": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:wide-content\""
  }
}
```

- [ ] **Step 2: Prove the current duplicated-margin behavior fails**

Run `rtk pnpm wide-content:smoke`.

Expected: failure because there is no shared token and nested surfaces can double-expand.

- [ ] **Step 3: Add the CSS primitive**

Implement this contract in `styles.css`:

```css
.vp-doc {
  --cid-wide-content-outset: 0px;
}

.cid-wide-content {
  margin-inline: calc(-1 * var(--cid-wide-content-outset));
}

.cid-wide-content--contained {
  margin-inline: 0;
}

.vp-doc > .vp-code-group,
.vp-doc > .cid-proof-surface {
  margin-inline: calc(-1 * var(--cid-wide-content-outset));
}

.cid-wide-content :where(.vp-code-group, .cid-proof-surface) {
  margin-inline: 0;
}

@media (min-width: 768px) {
  .vp-doc { --cid-wide-content-outset: 24px; }
}

@media (min-width: 960px) {
  .vp-doc { --cid-wide-content-outset: 48px; }
}
```

Remove the equivalent hard-coded Mermaid and legend breakpoint margins.
Make `MermaidDiagram` own `.cid-wide-content` and its local overflow.
Use the contained modifier when it is nested inside Scenario Context.

- [ ] **Step 4: Add the proof-sequence adopter**

Create and globally register `ProofSurface.vue` with this public contract:

```ts
interface ProofSurfaceProps {
  label: string
  contained?: boolean
}
```

Render a labelled, non-interactive `<section>` with `cid-proof-surface` and `cid-wide-content`.
Apply `cid-wide-content--contained` when requested so a code group or imported proof inside the section never receives a second outset.
Use `ProofSurface` only around a complete sequential or credential proof that benefits from the added width, not around every short code fence.
The first adopters are the Sign In Members, Protect An API, Manage Sessions, and Revoke Access tasks in the developer-content plan.

- [ ] **Step 5: Verify geometry and focus behavior**

Run:

```powershell
rtk pnpm wide-content:smoke
rtk pnpm visual:fragment-navigation
```

- [ ] **Step 6: Commit the layout primitive**

```powershell
rtk git add docs/.vitepress/theme scripts/wide-content-smoke.mjs package.json
rtk git commit -m "refactor(docs): share wide content layout"
```

## Task 6: Repair Mermaid Contrast And Scroll Ownership

**Files:**

- Modify: `docs/.vitepress/mermaidConfig.ts`
- Modify: `docs/.vitepress/theme/styles.css`
- Modify: `docs/.vitepress/theme/components/MermaidDiagram.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Create: `scripts/mermaid-contrast-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write a computed-contrast browser test**

For an ordinary flowchart and Scenario Context TreeView in light and dark modes, assert:

- every diagram produces an SVG before the bounded timeout;
- node text versus computed node fill is at least 4.5:1;
- edge-label text versus label background is at least 4.5:1;
- meaningful edges, borders, and focus indicators reach 3:1;
- no loading or error placeholder remains;
- a wide diagram scrolls only inside `MermaidDiagram`;
- its initial scroll position is centered when possible.

Add `audit:mermaid-contrast` as the same-preview worker and `mermaid:contrast` as its build-plus-bounded-preview wrapper.

```json
{
  "scripts": {
    "audit:mermaid-contrast": "node scripts/mermaid-contrast-smoke.mjs --base-url http://127.0.0.1:4173",
    "mermaid:contrast": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:mermaid-contrast\""
  }
}
```

- [ ] **Step 2: Prove dark-mode node contrast fails**

Run `rtk pnpm mermaid:contrast`.

Expected: failure for light text on the retained light semantic node fills.

- [ ] **Step 3: Separate canvas and node colors**

Replace the overloaded token with:

```css
--cid-mermaid-canvas-text: var(--vp-c-text-1);
--cid-mermaid-node-text: #17202a;
--cid-mermaid-edge-label-bg: #ffffff;
--cid-mermaid-edge-label-text: #17202a;
```

Keep `--cid-mermaid-node-text` dark in both themes while semantic node fills remain light.
Apply both `color` and SVG `fill` to Mermaid HTML labels, SVG text, linked nodes, and edge labels.
Give theme variables safe defaults, then let shared semantic class selectors win over generated presentation attributes.

- [ ] **Step 4: Remove duplicate global centering**

Delete the document-wide `centerWideMermaidBlocks()` logic from `theme/index.ts`.
Keep centering and resize observation inside `MermaidDiagram.vue`, which owns `scrollWidth` and `clientWidth`.

- [ ] **Step 5: Verify both themes and failure handling**

Run:

```powershell
rtk pnpm mermaid:contrast
rtk pnpm lint
```

- [ ] **Step 6: Commit the Mermaid repair**

```powershell
rtk git add docs/.vitepress/mermaidConfig.ts docs/.vitepress/theme scripts/mermaid-contrast-smoke.mjs package.json
rtk git commit -m "fix(docs): make diagrams readable in both themes"
```

## Task 7: Rework Scenario Context Without A Wide Table

**Files:**

- Modify: `docs/.vitepress/theme/components/ScenarioContext.vue`
- Create: `docs/.vitepress/theme/components/ScenarioApplicationSummary.vue`
- Create: `docs/.vitepress/theme/components/ScenarioApplicationWorksheet.vue`
- Create: `docs/.vitepress/theme/components/ScenarioSupportingContext.vue`
- Modify: `docs/.vitepress/theme/data/scenarioFixtures.ts`
- Modify: `docs/.vitepress/theme/data/scenarioFixtures.test.ts`
- Modify: `docs/.vitepress/theme/styles.css`
- Create: `scripts/scenario-context-smoke.mjs`
- Modify: `docs/community-developers/client-types.md`
- Modify: `docs/community-developers/applications.md`
- Modify: `package.json`

- [ ] **Step 1: Extend the fixture tests before changing rendering**

Add tests that prove every application exposes the grouped fields needed by:

- compact summary: application, runtime, member presence, token custodian, client type, intended grant;
- Runtime Context: runtime, member state, environment, owning community;
- Portal Record: application type, client type, redirects, post-logout redirects, secret outcome;
- Protocol Outcome: grants, response types, scopes, permissions, endpoints, capability, post-save expectation.

Add a typed selector for applications in the current focus and reject unknown fixture or focus values.

- [ ] **Step 2: Write the failing browser contract**

At 390, 768, 960, 1024, 1280, and 1440 pixels, assert:

- existing `<ScenarioContext fixture="asteria" focus="..." />` calls still render;
- default context has no ten-column worksheet and no horizontal scroll;
- summary fields remain visible without JavaScript-dependent Mermaid output;
- Choose Client and Register App render every worksheet field as labelled records;
- records use two columns only when their container has room;
- duplicate Scenario Context instances receive unique IDs;
- long URIs wrap visually but copy unchanged.

Add `audit:scenario-context` as the same-preview worker and `scenario-context:smoke` as its build-plus-bounded-preview wrapper.

```json
{
  "scripts": {
    "audit:scenario-context": "node scripts/scenario-context-smoke.mjs --base-url http://127.0.0.1:4173",
    "scenario-context:smoke": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:scenario-context\""
  }
}
```

- [ ] **Step 3: Split the facade into focused components**

Keep the current public props on `ScenarioContext.vue`.
Use Vue `useId()` for the accessible region ID.
Render in this order: synthetic-scenario heading and goal, environment and community, application summary, people and responsibilities, warning, optional contained diagram and legend.

`ScenarioApplicationWorksheet.vue` must render one application per card with three `<dl>` groups named Runtime Context, Portal Record, and Protocol Outcome.
It must not use a horizontally scrolling table.

- [ ] **Step 4: Place detailed worksheets only where they teach a task**

Add the worksheet after Scenario Context in `client-types.md` and `applications.md`.
Do not inject the complete worksheet into every developer page.
Apply `.cid-wide-content` to the Scenario Context and top-level worksheet, and the contained modifier to nested Mermaid and legend surfaces.

- [ ] **Step 5: Verify semantic completeness and containment**

Run:

```powershell
rtk node --import tsx --test docs/.vitepress/theme/data/scenarioFixtures.test.ts
rtk pnpm scenario-context:smoke
rtk pnpm lint
```

- [ ] **Step 6: Commit the Scenario Context rework**

```powershell
rtk git add docs/.vitepress/theme docs/community-developers/client-types.md docs/community-developers/applications.md scripts/scenario-context-smoke.mjs package.json
rtk git commit -m "refactor(docs): make scenario context scannable"
```

## Task 8: Correct Glossary Structure And Adopt Native VitePress Notation

**Files:**

- Modify: `docs/.vitepress/theme/components/AbbreviationGlossary.vue`
- Modify: `docs/.vitepress/theme/data/abbreviations.ts`
- Modify: `docs/.vitepress/theme/data/abbreviations.test.ts`
- Modify: `docs/.vitepress/theme/styles.css`
- Modify: `docs/community-developers/terms.md`
- Create: `scripts/vitepress-notation-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add failing category and rendering tests**

Add `getAbbreviationsByCategory(category)` with an exhaustive `AbbreviationCategory` input.
Test exact counts: Protocol 9, Application 5, Security 4, Citizen iD 1.
Assert entries are alphabetized and every entry appears once across the four categories.

The browser smoke test must assert that every `<dt>` is paired with exactly one `<dd>`, inherited definition margins are reset, and the pair stacks at narrow width.
Add `audit:notation` as the same-preview worker and `notation:smoke` as its build-plus-bounded-preview wrapper.

```json
{
  "scripts": {
    "notation:source": "node scripts/vitepress-notation-smoke.mjs --source-only",
    "audit:notation": "node scripts/vitepress-notation-smoke.mjs --browser-only --base-url http://127.0.0.1:4173",
    "notation:smoke": "pnpm notation:source && pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:notation\""
  }
}
```

- [ ] **Step 2: Implement the category-aware glossary**

Require a `category` prop on `AbbreviationGlossary`.
Wrap every `dt` and `dd` pair in a glossary-entry element.
Use a deliberate desktop term column, flexible description column, modest entry gap, larger group gap, and subtle dividers.
Do not make plain abbreviations focusable.

- [ ] **Step 3: Render the four groups under authored headings**

In `terms.md`, render one component below each Protocol, Application, Security, and Citizen iD heading.
Leave the four ordinary non-abbreviation definition sections as Markdown.

- [ ] **Step 4: Add a native-notation audit**

Make `scripts/vitepress-notation-smoke.mjs` classify owned code fences and report:

- equivalent alternatives that should use `::: code-group`;
- fences whose context is unclear and lack a VitePress title such as `[Program.cs]`;
- repeated executable examples that should be imported from a tested snippet;
- required sequential evidence that must not be grouped or hidden;
- optional background suited to `::: details`;
- status prose suited to a default-theme `Badge`.

Keep source classification available through `--source-only` without a server, and run computed glossary layout assertions through `--browser-only --base-url`.

During migration, scan canonical public source and treat the immutable `docs/integrator-guide/**` tree as baseline input rather than an edit target.
The script should fail only on explicit required rules: lingering `<Tabs` in canonical source, an unlabeled credential proof, a hidden required proof stage, or a code group with non-equivalent sequential artifacts.
Quality Task 6 separately requires the final repository-wide Tabs search to return no matches after legacy deletion.

- [ ] **Step 5: Verify the glossary and audit helper**

Run:

```powershell
rtk node --import tsx --test docs/.vitepress/theme/data/abbreviations.test.ts
rtk pnpm notation:smoke
rtk pnpm lint
```

- [ ] **Step 6: Commit the terms foundation**

```powershell
rtk git add docs/.vitepress/theme docs/community-developers/terms.md scripts/vitepress-notation-smoke.mjs package.json
rtk git commit -m "refactor(docs): improve terms and example notation"
```

## Task 9: Add Image Dimensions And An Asset Budget

**Files:**

- Modify: `docs/.vitepress/theme/components/image/imageTypes.ts`
- Modify: `docs/.vitepress/theme/components/image/ImageStage.vue`
- Modify: `docs/.vitepress/theme/components/image/ImageLightbox.vue`
- Modify: `docs/.vitepress/theme/components/ImageFigure.vue`
- Modify: `docs/.vitepress/theme/components/ImageStepper.vue`
- Create: `scripts/image-asset-audit.mjs`
- Create: `scripts/image-asset-audit.test.mjs`
- Create: `docs/public/images/asset-rationales.json`
- Modify: current public Markdown image consumers under `docs/players/**`, `docs/user-guide/**`, and later migrated destinations
- Modify: `scripts/audit-routes.mjs`
- Modify: `scripts/audit-routes.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing metadata and budget tests**

Extend `ImageItem` with required `width` and `height` numbers.
Test that the audit rejects:

- a raster consumer without measured dimensions;
- dimensions that differ from the file header;
- a raster over 750 KiB without a reviewed rationale;
- a rationale that names a missing or changed asset;
- a transformed asset whose deterministic output hash drifts.

- [ ] **Step 2: Prove current consumers lack the contract**

Run `rtk node --test scripts/image-asset-audit.test.mjs` and `rtk node scripts/image-asset-audit.mjs`.

Expected: failure for missing dimensions and oversized assets.

- [ ] **Step 3: Render stable intrinsic dimensions**

Pass measured `width` and `height` through `ImageFigure`, `ImageStepper`, `ImageStage`, and `ImageLightbox` to every underlying image.
Keep responsive CSS sizing, captions, lightbox behavior, and alt text intact.
Use the completed asset graph to mark every affected image-consumer route changed in `scripts/audit-routes.mjs`, including routes outside the 27 narrative-route minimum.
Fail the audit test if any affected consumer lacks a public route record and `changedByMigration: true`.

- [ ] **Step 4: Optimize only measured offenders**

Use the repository's pinned Sharp dependency with deterministic WebP settings.
Do not transcode an image merely because it exists.
For each offender, either:

- replace it with a visually reviewed deterministic derivative and update every consumer; or
- add a concise rationale covering why detail loss would harm the documented task.

Record exact source and output dimensions and SHA-256 values in the audit result.

Add this package command:

```json
{
  "scripts": {
    "assets:audit": "node scripts/image-asset-audit.mjs"
  }
}
```

- [ ] **Step 5: Update every image consumer and verify**

Run:

```powershell
rtk node --test scripts/image-asset-audit.test.mjs
rtk node scripts/image-asset-audit.mjs
rtk pnpm visual:image-stepper
rtk pnpm build
```

- [ ] **Step 6: Commit the image contract**

```powershell
rtk git add docs/.vitepress/theme docs/public/images/asset-rationales.json scripts/audit-routes.mjs scripts/audit-routes.test.mjs scripts/image-asset-audit.mjs scripts/image-asset-audit.test.mjs package.json
rtk git commit -m "perf(docs): stabilize documentation image layout"
```

Before committing, inspect `rtk git status --short` and add each exact changed consumer or transformed asset path reported by the reviewed asset audit.
Do not stage whole audience directories.

## Plan Completion Gate

- [ ] Run `rtk pnpm lint`.
- [ ] Run `rtk pnpm build`.
- [ ] Run all unit and focused browser scripts introduced in this plan.
- [ ] Run `rtk pnpm openapi:verify` without network access.
- [ ] Inspect the API Reference, Scenario Context, worksheet, Terms, ordinary Mermaid, and TreeView at 1440 by 1000 in both light and dark modes.
- [ ] Confirm no credential-shaped proof changed in this workstream.
- [ ] Record any discovered content issue in the migration manifest rather than editing legacy content opportunistically.

## Primary References

- [vitepress-openapi getting started](https://vitepress-openapi.vercel.app/guide/getting-started.html)
- [vitepress-openapi specification page](https://vitepress-openapi.vercel.app/pages/by-spec.html)
- [Redocly lint command](https://redocly.com/docs/cli/commands/lint)
- [Redocly bundle command](https://redocly.com/docs/cli/commands/bundle)
- [Lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [VitePress 1.6.4 Markdown extensions](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/markdown.md)
