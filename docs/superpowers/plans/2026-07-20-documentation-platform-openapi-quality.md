# Documentation Platform, OpenAPI, and Developer Journey Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish only intended documentation, embed a reproducible read-only OpenAPI browser, finish the approved developer Start migration, and add link, roleplay, visual, and desktop-performance gates.

**Architecture:** Keep VitePress 1 as the site generator, keep the OpenAPI build offline and reproducible from a checked-in snapshot, load `vitepress-openapi` only on the API Reference page, and run PR quality checks independently from tagged deployment.

**Tech Stack:** Node 22.13+, pnpm 9.15.3, VitePress 1.6.4, Vue 3.5, `vitepress-openapi` 0.2.2, Redocly CLI 2.39.0, Lychee Action 2.9.0, Lighthouse CI 0.15.1, Playwright 1.61, Mermaid 11.16, and GitHub Actions.

## Global Constraints

- The correct VitePress option is `srcExclude`, not `secExclude`.
- The legacy OAuth credentials are revoked and do not represent an active security incident.
- Replace revoked credential-shaped examples as public-content hygiene, without adding a rotation or incident-response task.
- Do not fetch the live OpenAPI document during a normal `dev`, `build`, or deployment run.
- Keep a reviewed OpenAPI source snapshot and provenance record in Git.
- Render the first embedded API browser as read-only by omitting the playground slot.
- Keep the production Swagger UI as an explicitly labeled external live-console fallback.
- Do not enable production token persistence or authenticated requests inside the documentation site in this plan.
- Use `.invalid` domains, fictional people, and unmistakable placeholders in every developer example.
- Preserve the one-sentence-per-source-line convention required by the documentation tree.
- Keep the existing OAuth and API pages until their later migration slices are approved.
- Do not rewrite or split the admin guides in this plan.
- Record the admin authoring inventory in the appendix so it can be handled separately.
- Resolve every Critical and Important roleplay finding before the final verification task.

---

## Confirmed Baseline

- The only current worktree is `/Users/dolejska/Git/github/citizenid-space/docs` on `feat/full-rework` at `c69ed7d`.
- No detached or secondary documentation worktree contains the missing developer migration.
- Commit `c69ed7d` adds only `docs/superpowers/specs/2026-07-16-community-developers-3a-design.md`.
- The approved developer design therefore exists, but the pages and components described by it have not been implemented.
- The current developer sidebar still links `Request Integrator Access`, `Applications`, three legacy OAuth pages, and a mostly transitional API Reference page.
- The current visual audit covers player and admin routes, but not developer, reference, API, search, or 404 states.
- The current performance smoke checks only that Mermaid is not eagerly preloaded on selected non-diagram pages.
- The package registry reports `vitepress-openapi` 0.2.2, which supports VitePress 1+, Vue 3, and Node 22.13+.
- The package registry reports Redocly CLI 2.39.0 and Lighthouse CI 0.15.1.
- Lychee Action 2.9.0 was released on 2026-07-09.

## Relevant References

### Repository references

- `package.json` defines the current toolchain, scripts, and dependencies.
- `docs/.vitepress/config.mts` defines publishing, local search, navigation, and sidebars.
- `docs/.vitepress/theme/index.ts` registers global components and Mermaid-aware behavior.
- `docs/.vitepress/theme/styles.css` is the shared styling surface.
- `scripts/visual-audit.mjs` is the existing multi-viewport visual audit.
- `scripts/performance-smoke.mjs` is the existing static Mermaid performance check.
- `docs/community-developers/api-reference.md` is the page to replace with the embedded browser.
- [`2026-07-16-community-developers-3a-design.md`](../specs/2026-07-16-community-developers-3a-design.md) is the binding developer Start design.
- `.github/workflows/deploy.yml` is the existing tag-only deployment workflow.

### External references

- [VitePress `srcExclude`](https://vitepress.dev/reference/site-config#srcexclude) documents source glob exclusion.
- [`vitepress-openapi` getting started](https://vitepress-openapi.vercel.app/guide/getting-started.html) documents theme registration.
- [`vitepress-openapi` theme configuration](https://vitepress-openapi.vercel.app/composables/use-theme.html) documents operation slots and `hiddenSlots`.
- [`vitepress-openapi` page by specification](https://vitepress-openapi.vercel.app/pages/by-spec.html) documents the `OASpec` page shape.
- [Redocly CLI quickstart](https://redocly.com/docs/cli/quickstart) documents linting.
- [Redocly CLI bundle](https://redocly.com/docs/cli/commands/bundle) documents reproducible bundling.
- [Redocly built-in rules](https://redocly.com/docs/cli/rules/built-in-rules) documents operation and tag rules.
- [Lychee Action](https://github.com/lycheeverse/lychee-action) documents Markdown and HTML link checking.
- [Lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md) documents desktop collection, assertions, and resource budgets.
- [Current Citizen iD OpenAPI source](https://citizenid.space/openapi/current/openapi.json) is the upstream snapshot source.
- [Current Citizen iD Swagger UI](https://citizenid.space/openapi) remains the live-console fallback.

---

## Task 1: Pin the supported toolchain and install the selected packages

**Files:**

- Create: `.node-version`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Add the Node support declaration.**

```text
22.13.0
```

- [ ] **Step 2: Add an explicit package engine and exact dev dependencies.**

The intended `package.json` shape is:

```json
{
  "engines": {
    "node": ">=22.13.0 <23"
  },
  "devDependencies": {
    "@lhci/cli": "0.15.1",
    "@redocly/cli": "2.39.0",
    "vitepress-openapi": "0.2.2"
  }
}
```

- [ ] **Step 3: Install with the repository-pinned package manager.**

Run:

```bash
pnpm add --save-dev --save-exact vitepress-openapi@0.2.2 @redocly/cli@2.39.0 @lhci/cli@0.15.1
```

Expected result: `package.json` and `pnpm-lock.yaml` change without replacing the pnpm 9 store.

- [ ] **Step 4: Verify the resolved versions and peer constraints.**

Run:

```bash
pnpm list vitepress-openapi @redocly/cli @lhci/cli vitepress vue
node --version
pnpm --version
```

Expected result: Node is `v22.13.0` or a later v22 release, pnpm is `9.15.3`, and all three new packages resolve once.

- [ ] **Step 5: Run the unchanged baseline before feature work.**

Run:

```bash
pnpm lint
pnpm build
pnpm performance:smoke
```

Expected result: the existing site still builds and the current Mermaid preload smoke passes.

- [ ] **Step 6: Commit the toolchain change.**

```bash
git add .node-version package.json pnpm-lock.yaml
git commit -m "build: pin documentation quality toolchain"
```

---

## Task 2: Exclude internal authoring sources and normalize revoked samples

**Files:**

- Modify: `docs/.vitepress/config.mts`
- Modify: `docs/integrator-guide/oauth2/flows-grants.md`
- Create: `scripts/publishing-surface-smoke.mjs`
- Create: `scripts/public-content-safety-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write a failing publishing-surface smoke test.**

The test must inspect generated HTML, `sitemap.xml`, and local-search assets for forbidden source paths.

```js
const forbiddenFragments = [
  '/AGENTS',
  '/superpowers/',
  'AGENTS.md',
  'superpowers/specs',
  'superpowers/plans',
]

for (const [artifactName, source] of generatedArtifacts) {
  for (const fragment of forbiddenFragments) {
    assert.equal(
      source.includes(fragment),
      false,
      `${artifactName} publishes internal source fragment ${fragment}`,
    )
  }
}
```

- [ ] **Step 2: Confirm the new smoke fails against the current build.**

Run:

```bash
node scripts/publishing-surface-smoke.mjs
```

Expected result: the test reports current `AGENTS` or `superpowers` output before the exclusion is added.

- [ ] **Step 3: Add the exact VitePress exclusion.**

```ts
export default defineConfig({
  srcExclude: [
    '**/AGENTS.md',
    'superpowers/**',
  ],
  // Existing configuration remains unchanged.
})
```

- [ ] **Step 4: Replace revoked credential-shaped samples with unmistakable placeholders.**

Use values such as `<CLIENT_ID>`, `<CLIENT_SECRET>`, `<AUTHORIZATION_CODE>`, and `<ACCESS_TOKEN>`.

Do not preserve JWT-like segments, personal claims, realistic cookies, or realistic secret prefixes.

Do not add a credential-rotation instruction because revocation is already complete.

- [ ] **Step 5: Add a public-content hygiene scanner.**

The script must scan Markdown, Vue, TypeScript, JavaScript, JSON, generated HTML, and screenshots' adjacent metadata.

It must reject bearer-token syntax, JWT-shaped strings, authorization-code query examples, cookie assignments, and known legacy example values.

It must allow literal teaching placeholders enclosed in angle brackets.

- [ ] **Step 6: Add package scripts.**

```json
{
  "scripts": {
    "content:surface": "node scripts/publishing-surface-smoke.mjs",
    "content:safety": "node scripts/public-content-safety-smoke.mjs"
  }
}
```

- [ ] **Step 7: Build and verify the public surface.**

Run:

```bash
pnpm build
pnpm content:surface
pnpm content:safety
```

Expected result: internal authoring routes are absent from generated HTML, sitemap, and local search, while the revoked examples remain educational but obviously inert.

- [ ] **Step 8: Commit the publishing-boundary change.**

```bash
git add docs/.vitepress/config.mts docs/integrator-guide/oauth2/flows-grants.md scripts package.json
git commit -m "docs: exclude internal sources from publishing"
```

---

## Task 3: Add a reproducible OpenAPI snapshot, Redocly lint, and quality ratchet

**Files:**

- Create: `openapi/citizenid.source.json`
- Create: `openapi/source-lock.json`
- Create: `openapi/quality-baseline.json`
- Create: `.redocly.lint-ignore.yaml`
- Create: `docs/public/openapi/current/openapi.json`
- Create: `redocly.yaml`
- Create: `scripts/openapi/sync.mjs`
- Create: `scripts/openapi/quality-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add the Redocly API alias and immediate structural rules.**

```yaml
apis:
  citizenid@current:
    root: openapi/citizenid.source.json
    output: docs/public/openapi/current/openapi.json

extends:
  - recommended

rules:
  operation-operationId: error
  operation-operationId-unique: error
  operation-summary: error
  operation-description: error
  operation-4xx-response: error
  tag-description: error
  security-defined: error
  no-invalid-media-type-examples: error
```

- [ ] **Step 2: Add a network-explicit snapshot command.**

The sync script must fetch only `https://citizenid.space/openapi/current/openapi.json`.

It must reject redirects to another origin, non-JSON content, a non-3.x `openapi` value, an empty `paths` object, or a missing title/version.

It must write the source and lock files atomically.

```js
const lock = {
  source: sourceUrl,
  fetchedAt: new Date().toISOString(),
  sha256: createHash('sha256').update(sourceText).digest('hex'),
  openapi: source.openapi,
  version: source.info.version,
  pathCount: Object.keys(source.paths).length,
}
```

- [ ] **Step 3: Snapshot and review the current upstream document.**

Run:

```bash
node scripts/openapi/sync.mjs
git diff -- openapi/citizenid.source.json openapi/source-lock.json
```

Expected result: the snapshot records its source URL, fetch time, SHA-256, OpenAPI version, API version, and path count.

- [ ] **Step 4: Generate a reviewed Redocly ignore baseline for existing source-owned debt.**

Run:

```bash
pnpm redocly lint citizenid@current --generate-ignore-file
pnpm redocly lint citizenid@current
```

Expected result: current known source locations are explicitly baselined, while the same defect on a new or moved operation fails lint.

The baseline is a migration device, not permission to add more incomplete operations.

- [ ] **Step 5: Add a docs-owned quality ratchet for requirements not fully covered by built-in rules.**

For every HTTP operation, compute a stable key such as `GET /communities/{id}`.

Require an `operationId`, summary, description, operation-local `security`, at least one 4xx response, and at least one request or response example where the operation has a body.

Compare current failures with `openapi/quality-baseline.json` and fail when any rule gains an operation key.

Store policy metadata and rule entries in an explicit JSON shape.

```json
{
  "policy": "Existing operation keys may only be removed; new keys fail CI.",
  "rules": {
    "explicitSecurity": [],
    "example": [],
    "standardError": []
  }
}
```

```js
const qualityChecks = {
  operationId: operation => Boolean(operation.operationId?.trim()),
  summary: operation => Boolean(operation.summary?.trim()),
  description: operation => Boolean(operation.description?.trim()),
  explicitSecurity: operation => Object.hasOwn(operation, 'security'),
  standardError: operation => Object.keys(operation.responses ?? {}).some(code => /^4\d\d$/.test(code)),
  example: operation => operationHasDocumentedExample(operation),
}
```

- [ ] **Step 6: Add OpenAPI scripts without adding a build-time network dependency.**

```json
{
  "scripts": {
    "openapi:sync": "node scripts/openapi/sync.mjs",
    "openapi:lint": "redocly lint citizenid@current && node scripts/openapi/quality-smoke.mjs",
    "openapi:bundle": "redocly bundle citizenid@current --output docs/public/openapi/current/openapi.json",
    "openapi:prepare": "pnpm openapi:lint && pnpm openapi:bundle",
    "openapi:verify": "pnpm openapi:prepare && git diff --exit-code -- docs/public/openapi/current/openapi.json"
  }
}
```

- [ ] **Step 7: Bundle twice and prove determinism.**

Run:

```bash
pnpm openapi:prepare
shasum -a 256 docs/public/openapi/current/openapi.json
pnpm openapi:prepare
shasum -a 256 docs/public/openapi/current/openapi.json
```

Expected result: both bundle hashes match and no network call occurs.

- [ ] **Step 8: Document the upstream cleanup handoff in baseline metadata.**

Record each remaining rule count in `openapi/quality-baseline.json` and state that the source API owner removes operation keys only when the generated upstream contract supplies the field.

Do not hand-edit generated operation descriptions or security semantics in this documentation repository.

- [ ] **Step 9: Commit the OpenAPI pipeline.**

```bash
git add openapi docs/public/openapi redocly.yaml .redocly.lint-ignore.yaml scripts/openapi package.json
git commit -m "build: add reproducible OpenAPI quality pipeline"
```

---

## Task 4: Embed a read-only OpenAPI browser without site-wide JavaScript cost

**Files:**

- Create: `docs/.vitepress/theme/components/OpenApiReference.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Modify: `docs/.vitepress/theme/styles.css`
- Replace: `docs/community-developers/api-reference.md`
- Create: `scripts/openapi-reference-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write a failing API Reference browser smoke.**

The smoke must verify that the page renders API metadata, at least one method/path pair, operation groups, schema/response information, and no interactive send control.

```js
assert.match(await page.locator('main').textContent(), /API Reference/)
assert.match(await page.locator('main').textContent(), /GET|POST|PUT|PATCH|DELETE/)
assert.equal(await page.getByRole('button', { name: /send request|try it/i }).count(), 0)
assert.equal(await page.locator('input[type="password"]').count(), 0)
```

- [ ] **Step 2: Register the renderer through an async component loader.**

The loader prevents OpenAPI renderer code from becoming part of every documentation route.

```ts
import { defineAsyncComponent } from 'vue'

export default {
  enhanceApp(context) {
    const { app } = context

    app.component('OpenApiReference', defineAsyncComponent(async () => {
      const [{ default: spec }, openapi] = await Promise.all([
        import('../../public/openapi/current/openapi.json'),
        import('vitepress-openapi/client'),
      ])

      openapi.useOpenapi({
        spec,
        config: {
          operation: {
            hiddenSlots: ['playground'],
            cols: 2,
          },
          spec: {
            groupByTags: true,
            collapsePaths: true,
          },
        },
      })

      await openapi.theme.enhanceApp(context)

      return import('./components/OpenApiReference.vue')
    }))

    // Preserve existing component registrations.
  },
}
```

- [ ] **Step 3: Keep the wrapper small and page-specific.**

```vue
<script setup lang="ts">
import { OASpec } from 'vitepress-openapi/client'
import 'vitepress-openapi/dist/style.css'
</script>

<template>
  <div class="cid-openapi-reference">
    <OASpec hide-branding />
  </div>
</template>
```

- [ ] **Step 4: Replace the transitional API Reference page.**

```markdown
---
title: API Reference
description: Read-only Citizen iD OpenAPI operations, schemas, security requirements, and responses.
aside: false
outline: false
---

# API Reference

Use this reference to inspect the versioned Citizen iD contract used for this documentation build.

The embedded browser is read-only and does not store tokens or send requests.

For an explicitly interactive session, open the [Citizen iD Swagger UI](https://citizenid.space/openapi) and follow your environment's access policy.

<OpenApiReference />
```

- [ ] **Step 5: Add narrow, theme-aware layout fixes.**

Keep the renderer inside the viewport at 1440 by 1000 and at narrow widths.

Do not override the renderer's semantic colors globally.

Keep method/path rows scrollable inside their own container instead of creating page-level overflow.

- [ ] **Step 6: Assert route-local loading.**

Extend `scripts/performance-smoke.mjs` so the homepage, player index, and admin index do not preload an OpenAPI chunk or stylesheet.

Assert that the API Reference page does load the renderer.

- [ ] **Step 7: Build and exercise the renderer.**

Run:

```bash
pnpm openapi:prepare
pnpm build
node scripts/openapi-reference-smoke.mjs
pnpm performance:smoke
```

Expected result: the API Reference renders from the checked-in snapshot, has no send/playground UI, and adds no OpenAPI preload to non-API pages.

- [ ] **Step 8: Commit the OpenAPI browser.**

```bash
git add docs/.vitepress/theme docs/community-developers/api-reference.md scripts package.json
git commit -m "docs: embed read-only OpenAPI reference"
```

---

## Task 5: Build the approved synthetic scenario and abbreviation foundations

**Files:**

- Create: `docs/.vitepress/theme/data/scenarioFixtures.ts`
- Create: `docs/.vitepress/theme/data/abbreviations.ts`
- Create: `docs/.vitepress/theme/components/ScenarioContext.vue`
- Create: `docs/.vitepress/theme/components/Abbr.vue`
- Create: `docs/.vitepress/theme/components/AbbreviationGlossary.vue`
- Modify: `docs/.vitepress/theme/index.ts`
- Modify: `docs/.vitepress/theme/styles.css`
- Create: `scripts/developer-fixtures-smoke.ts`
- Modify: `package.json`

- [ ] **Step 1: Write fixture integrity tests first.**

The test must assert that `asteria` has exactly the approved four application records, one external API, one operator, four member states, and four Start focus keys.

The test must reject any domain that is not `.invalid` and any field matching the public-content safety scanner.

- [ ] **Step 2: Create typed scenario data.**

```ts
export type ScenarioFocus = 'overview' | 'access' | 'client-types' | 'applications'
export type ScenarioView = 'compact' | 'tree'

export interface ScenarioFixture {
  id: 'asteria'
  label: string
  community: ScenarioCommunity
  applications: Record<'dispatch' | 'console' | 'mobile' | 'sync', ScenarioApplication>
  protectedResources: Record<'api', ScenarioResource>
  operator: ScenarioPerson
  members: Record<'alex' | 'blake' | 'casey' | 'devon', ScenarioMember>
  focuses: Record<ScenarioFocus, ScenarioFocusDefinition>
}

export const scenarioFixtures = {
  asteria: {
    id: 'asteria',
    label: 'Asteria Rescue',
    // Populate only the approved synthetic values from the 3A design.
  },
} satisfies Record<string, ScenarioFixture>
```

- [ ] **Step 3: Implement semantic context before diagram enhancement.**

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<{
  fixture: keyof typeof scenarioFixtures
  focus: ScenarioFocus
  view?: ScenarioView
}>(), {
  view: 'compact',
})

const scenario = computed(() => resolveScenarioFocus(props.fixture, props.focus))
</script>

<template>
  <section class="cid-scenario-context" aria-label="Synthetic scenario context">
    <p class="cid-scenario-context__eyebrow">
      Synthetic scenario
    </p>
    <p>
      {{ scenario.goal }}
    </p>
    <dl><!-- Visible community, applications, actors, state, and responsibility boundaries. --></dl>
    <p>Replace every value before use because .invalid domains cannot receive production traffic.</p>
    <template v-if="view === 'tree'">
      <MermaidDiagram :id="scenario.diagram.id" :graph="scenario.diagram.graph" />
      <DiagramLegend />
    </template>
  </section>
</template>
```

- [ ] **Step 4: Fail clearly for unknown fixture or focus keys.**

Do not silently fall back to a different scenario.

Omit optional sections cleanly without rendering empty labels.

- [ ] **Step 5: Create one canonical abbreviation dictionary.**

```ts
export interface AbbreviationDefinition {
  term: string
  expansion: string
  category: 'protocol' | 'application' | 'security' | 'citizenid'
  description: string
}

export const abbreviations = {
  OIDC: {
    term: 'OIDC',
    expansion: 'OpenID Connect',
    category: 'protocol',
    description: 'The identity layer used with OAuth 2.0 for Citizen iD sign-in.',
  },
  // Add every initial term required by the approved 3A design.
} satisfies Record<string, AbbreviationDefinition>
```

- [ ] **Step 6: Render native abbreviation semantics and a generated glossary.**

```vue
<template>
  <abbr :title="definition.expansion">{{ definition.term }}</abbr>
</template>
```

Unknown terms must throw a development-visible error.

Do not add `tabindex` or a custom tooltip.

- [ ] **Step 7: Register the three components and add shared responsive styles.**

Use a two-column compact context at desktop content widths and one column when the content area narrows.

Add TreeView selectors for the existing semantic classes.

Keep the semantic briefing readable if Mermaid or JavaScript fails.

- [ ] **Step 8: Reserve diagram layout space.**

Add a readiness class in `MermaidDiagram.vue` and keep a minimum block size while lazy Mermaid code loads.

```css
.vp-doc .cid-mermaid {
  min-block-size: 12rem;
}

.vp-doc .cid-mermaid__loading {
  display: grid;
  min-block-size: 9rem;
  place-items: center;
}
```

- [ ] **Step 9: Run focused tests.**

Run:

```bash
pnpm tsx scripts/developer-fixtures-smoke.ts
pnpm lint
pnpm build
pnpm content:safety
```

Expected result: the fixture and dictionary have one source of truth, all synthetic URLs are reserved, and the rendered semantic context survives without a diagram.

- [ ] **Step 10: Commit the shared developer components.**

```bash
git add docs/.vitepress/theme scripts/developer-fixtures-smoke.ts package.json
git commit -m "docs: add developer scenario and terminology components"
```

---

## Task 6: Implement the missing developer Start migration

**Files:**

- Replace: `docs/community-developers/index.md`
- Create: `docs/community-developers/access.md`
- Create: `docs/community-developers/client-types.md`
- Replace: `docs/community-developers/applications.md`
- Create: `docs/community-developers/terms.md`
- Delete: `docs/community-developers/request-integrator-access.md`
- Modify: `docs/.vitepress/config.mts`
- Modify: any repository Markdown that still links `/community-developers/request-integrator-access`

- [ ] **Step 1: Update all inbound repository links before deleting the old route.**

Run:

```bash
rg -n '/community-developers/request-integrator-access|request-integrator-access' docs README.md
```

Replace every owned link with `/community-developers/access`.

The approved green-field design does not require a redirect.

- [ ] **Step 2: Implement the Developer Guide landing page.**

Use this content order:

```markdown
# Developer Guide

When complete, you will know which Citizen iD developer journey to follow and what each Asteria example produces.

## What You Will Build

## Scenario Map

<ScenarioContext fixture="asteria" focus="overview" view="tree" />

## Start The Journey
```

Add explicit prerequisites, ownership boundaries, completion checks, and links to Get Access, Choose Client, Register App, API Reference, and Terms.

- [ ] **Step 3: Implement Get Access as an eligibility and evidence task.**

Include `When complete`, prerequisites, scenario context, applicant eligibility, Developer Terms acceptance, the request steps, expected stored state, failure branches, verification, support evidence, and the next action.

Explain the Roberts Space Industries verification dependency without claiming that Citizen iD operates the RSI account system.

- [ ] **Step 4: Implement Choose Client as a decision worksheet.**

The page must let a newcomer derive these exact fixture outcomes without legacy pages:

| Application | Application Type | Client Type | Intended grant | Secret result |
| --- | --- | --- | --- | --- |
| Asteria Dispatch | `Web` | `Confidential` | Authorization code | Generated once |
| Asteria Console | `Web` | `Confidential` | Authorization code through a Backend for Frontend | Generated once |
| Asteria Mobile | `Native` | `Public` | Authorization code with S256 Proof Key for Code Exchange | No secret and capability pending |
| Asteria Sync | `Web` | `Confidential` | Client credentials | Generated once |

Add decision warnings for public clients, browser token custody, service identity, redirect needs, and pending environment capability.

- [ ] **Step 5: Implement Register App as four concrete registration packs.**

Use `Register Web App`, `Register Browser App`, `Register Native App`, and `Register Service` sections.

Each pack must contain the selected worksheet values, exact synthetic redirect records, expected secret behavior, staff-controlled settings, save result, verify-it checklist, failure branches, and support evidence.

- [ ] **Step 6: Implement Terms from the canonical dictionary.**

```markdown
# Terms

## Protocol Terms

<AbbreviationGlossary category="protocol" />

## Application Terms

<AbbreviationGlossary category="application" />

## Security Terms

<AbbreviationGlossary category="security" />

## Citizen iD Terms

<AbbreviationGlossary category="citizenid" />
```

Add ordinary definitions for application record, OAuth client, client identifier, client secret, redirect URI, issuer, discovery document, grant, flow, scope, permission, member context, staff-controlled setting, community ownership, protected resource, and token custodian.

- [ ] **Step 7: Update developer navigation.**

```ts
const developerSidebar = [
  {
    text: 'Start',
    collapsed: false,
    items: [
      { text: 'Developer Guide', link: '/community-developers/' },
      { text: 'Get Access', link: '/community-developers/access' },
      { text: 'Choose Client', link: '/community-developers/client-types' },
      { text: 'Register App', link: '/community-developers/applications' },
    ],
  },
  {
    text: 'OAuth And API',
    collapsed: false,
    items: [
      // Preserve the existing OAuth pages.
      { text: 'API Reference', link: '/community-developers/api-reference' },
    ],
  },
  {
    text: 'Reference',
    collapsed: false,
    items: [
      { text: 'Terms', link: '/community-developers/terms' },
    ],
  },
]
```

- [ ] **Step 8: Delete the superseded access page and verify references.**

Run:

```bash
rg -n '/community-developers/request-integrator-access|request-integrator-access' docs README.md
```

Expected result: no result.

- [ ] **Step 9: Run source and build checks.**

Run:

```bash
pnpm lint
pnpm build
pnpm content:surface
pnpm content:safety
```

Expected result: every Start route builds, every sidebar link resolves, and the new pages contain only synthetic values.

- [ ] **Step 10: Commit the developer migration.**

```bash
git add docs/community-developers docs/.vitepress/config.mts
git commit -m "docs: implement developer start journey"
```

---

## Task 7: Add automated journey checks and perform concrete roleplay verification

**Files:**

- Create: `scripts/developer-journey-smoke.mjs`
- Create: `docs/superpowers/reviews/developer-start-roleplay.md`
- Modify: `package.json`

- [ ] **Step 1: Add an automated route and semantics smoke.**

Use Playwright against the built site.

Verify all six developer routes return a document page rather than the 404 layout.

Verify Start navigation order, one `h1` per page, valid heading order, a visible `Synthetic scenario` label, `.invalid` example URLs, semantic `abbr[title]`, and no page-level horizontal overflow at 1440 by 1000.

- [ ] **Step 2: Add the journey script.**

```json
{
  "scripts": {
    "journey:developer": "node scripts/developer-journey-smoke.mjs"
  }
}
```

- [ ] **Step 3: Roleplay a developer newcomer.**

Start only at `/community-developers/`.

Record whether the reviewer can identify prerequisites, choose the exact type pair for all four applications, carry the worksheet into registration, predict stored results, and name the next action without opening a legacy page.

Record a Critical finding if any choice requires undocumented product knowledge.

- [ ] **Step 4: Roleplay an identity specialist.**

Verify that the docs do not overstate public-client availability, browser secrecy, redirect support, S256 Proof Key for Code Exchange, Pushed Authorization Requests, staff-controlled settings, issuer matching, token custody, secret reset, or service-member identity.

Record an Important finding when a correct security property is present but too easy to miss.

- [ ] **Step 5: Roleplay a community administrator.**

Verify that the operator can distinguish their tasks from staff-controlled actions and can identify what evidence to provide when an application remains pending or saves unexpected values.

Add responsibility labels where the current prose forces the administrator to infer ownership.

- [ ] **Step 6: Roleplay a member and privacy-conscious user.**

Verify that the member-visible effects of missing verified email, missing RSI verification, revoked authorization, and service-only access are explained without implying broader data availability.

Add explicit member-effect and recovery text where an outcome is otherwise described only from the application perspective.

- [ ] **Step 7: Roleplay support triage.**

Verify each Start task states expected result, safe evidence, failure branch, and escalation boundary.

Add a compact support-evidence checklist to any task that lacks one.

- [ ] **Step 8: Perform documentation consistency review.**

Verify that Asteria names, URLs, types, redirects, actor states, terminology, and responsibility boundaries match the fixture on every page.

Verify that the Terms page and inline abbreviations use the same dictionary.

- [ ] **Step 9: Resolve and re-run.**

Resolve every Critical and Important finding in the pages, components, or fixture.

Re-run the affected role from the landing page and record the result and date.

- [ ] **Step 10: Run the automated journey.**

Run:

```bash
pnpm build
pnpm journey:developer
pnpm content:safety
```

Expected result: all role-critical routes, decisions, semantics, and safety assertions pass.

- [ ] **Step 11: Commit roleplay-driven improvements.**

```bash
git add scripts/developer-journey-smoke.mjs docs/superpowers/reviews package.json docs/community-developers docs/.vitepress/theme
git commit -m "test: verify developer journey roles"
```

---

## Task 8: Add Lychee link checking and PR quality validation

**Files:**

- Create: `.lychee.toml`
- Create: `.github/workflows/quality.yml`
- Modify: `.github/workflows/deploy.yml`

- [ ] **Step 1: Configure deterministic link behavior.**

Check repository Markdown and generated HTML.

Exclude `docs/superpowers/**` and `**/AGENTS.md` because they are intentionally non-public.

Retry transient failures.

Document any bot-blocking domain exclusion with the exact URL family and reason instead of accepting every 403 or 429 response.

- [ ] **Step 2: Add a PR quality workflow.**

```yaml
name: Quality

on:
  pull_request:
  push:
    branches:
      - main
  schedule:
    - cron: '17 5 * * 1'

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: pnpm/action-setup@v6
        with:
          version: 9.15.3
      - uses: actions/setup-node@v7
        with:
          node-version-file: .node-version
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm openapi:verify
      - run: pnpm build
      - run: pnpm content:surface
      - run: pnpm content:safety
      - run: pnpm journey:developer

  links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: lycheeverse/lychee-action@e7477775783ea5526144ba13e8db5eec57747ce8 # v2.9.0
        with:
          args: >-
            --config .lychee.toml
            './README.md'
            './docs/**/*.md'
          fail: true
```

- [ ] **Step 3: Add generated-HTML link checking to the built docs job.**

Run Lychee over `docs/.vitepress/dist/**/*.html` after `pnpm build` so clean-URL and asset links are checked from deployable output.

- [ ] **Step 4: Modernize the deployment setup actions without changing release behavior.**

Use the same Node version file and pnpm version as the quality workflow.

Update `actions/checkout`, `actions/setup-node`, and `pnpm/action-setup` to their reviewed current majors.

Keep tag-only deployment, release drafting, CNAME, and GitHub Pages destination unchanged.

- [ ] **Step 5: Validate workflow syntax and execute local equivalents.**

Run:

```bash
pnpm lint
pnpm openapi:verify
pnpm build
pnpm content:surface
pnpm content:safety
pnpm journey:developer
```

Expected result: every local equivalent passes before pushing the workflow.

- [ ] **Step 6: Commit the link and PR gates.**

```bash
git add .lychee.toml .github/workflows
git commit -m "ci: add documentation quality and link checks"
```

---

## Task 9: Expand desktop visual coverage and add Lighthouse CI budgets

**Files:**

- Create: `scripts/audit-routes.mjs`
- Modify: `scripts/visual-audit.mjs`
- Modify: `scripts/performance-smoke.mjs`
- Create: `.lighthouserc.cjs`
- Create: `lighthouse-budget.json`
- Modify: `package.json`
- Modify: `.github/workflows/quality.yml`

- [ ] **Step 1: Create one route inventory for visual and journey audits.**

```js
export const auditRoutes = [
  { slug: 'home', path: '/', group: 'home' },
  { slug: 'players-index', path: '/players/', group: 'players' },
  { slug: 'admin-index', path: '/community-admins/', group: 'admins' },
  { slug: 'admin-long-page', path: '/community-admins/maintenance-and-support', group: 'admins' },
  { slug: 'developers-index', path: '/community-developers/', group: 'developers' },
  { slug: 'developer-access', path: '/community-developers/access', group: 'developers' },
  { slug: 'developer-client-types', path: '/community-developers/client-types', group: 'developers' },
  { slug: 'developer-applications', path: '/community-developers/applications', group: 'developers' },
  { slug: 'developer-api', path: '/community-developers/api-reference', group: 'developers' },
  { slug: 'developer-terms', path: '/community-developers/terms', group: 'developers' },
  { slug: 'reference-index', path: '/reference/', group: 'reference' },
  { slug: 'not-found', path: '/route-that-does-not-exist', group: 'system' },
]
```

- [ ] **Step 2: Add a search-modal visual scenario.**

Open the local-search dialog from the homepage, query `client type`, and capture its populated desktop state.

Assert focus moves into the dialog, results exclude `AGENTS` and `superpowers`, and Escape restores focus to the search button.

- [ ] **Step 3: Make desktop modes the CI focus without deleting mobile coverage.**

Support `VISUAL_AUDIT_VIEWPORTS=desktop,desktop-dark`.

Keep the existing mobile viewport available for local or scheduled full audits.

- [ ] **Step 4: Turn visual observations into failures.**

Fail on page-level horizontal overflow, unrendered Mermaid SVGs after the explicit wait, uncaught page errors, missing page titles, missing main content, inaccessible search focus, or a visible OpenAPI playground.

Continue writing full-page PNGs and a JSON report for diagnosis.

- [ ] **Step 5: Configure Lighthouse CI for the built static site.**

```js
module.exports = {
  ci: {
    collect: {
      staticDistDir: 'docs/.vitepress/dist',
      url: [
        'http://localhost/',
        'http://localhost/players/',
        'http://localhost/community-admins/maintenance-and-support',
        'http://localhost/community-developers/',
        'http://localhost/community-developers/api-reference',
        'http://localhost/reference/',
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        'categories:seo': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
      budgetsFile: 'lighthouse-budget.json',
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci/reports',
    },
  },
}
```

- [ ] **Step 6: Add path-specific desktop resource budgets.**

Use kilobytes in `lighthouse-budget.json`.

```json
[
  {
    "path": "/*",
    "resourceSizes": [
      { "resourceType": "script", "budget": 1400 },
      { "resourceType": "image", "budget": 1500 },
      { "resourceType": "total", "budget": 2600 }
    ]
  },
  {
    "path": "/community-developers/api-reference",
    "resourceSizes": [
      { "resourceType": "script", "budget": 2400 },
      { "resourceType": "image", "budget": 500 },
      { "resourceType": "total", "budget": 3400 }
    ]
  }
]
```

- [ ] **Step 7: Add performance scripts.**

```json
{
  "scripts": {
    "performance:lighthouse": "lhci autorun --config=.lighthouserc.cjs",
    "quality:desktop": "pnpm build && pnpm performance:smoke && pnpm performance:lighthouse"
  }
}
```

- [ ] **Step 8: Run the desktop audit and inspect every failure visually.**

Run the built site on a fixed port, then run:

```bash
VISUAL_AUDIT_VIEWPORTS=desktop,desktop-dark pnpm visual:audit
pnpm performance:lighthouse
```

Expected result: all routes have no page-level overflow, Mermaid has rendered, the API browser stays contained, search excludes internal sources, CLS is at most 0.1, and LCP is at most 2.5 seconds under Lighthouse desktop emulation.

- [ ] **Step 9: Fix measured desktop regressions before relaxing a budget.**

Prefer async renderer loading, collapsed OpenAPI groups, local-search source reduction, reserved diagram space, image dimensions, and image conversion.

Do not raise a threshold merely to make CI green.

- [ ] **Step 10: Add the desktop job to PR quality.**

Run Lighthouse on pull requests when site, theme, OpenAPI, images, or package dependencies change.

Upload `.lighthouseci/reports` and visual-audit PNG/JSON output as workflow artifacts on failure.

- [ ] **Step 11: Commit the desktop quality gate.**

```bash
git add scripts .lighthouserc.cjs lighthouse-budget.json package.json .github/workflows/quality.yml
git commit -m "test: add desktop visual and performance budgets"
```

---

## Task 10: Add image dimensions and reduce oversized desktop assets

**Files:**

- Modify: `docs/.vitepress/theme/components/image/imageTypes.ts`
- Modify: `docs/.vitepress/theme/components/image/ImageStage.vue`
- Modify: `docs/.vitepress/theme/components/ImageFigure.vue`
- Modify: Markdown files that instantiate `ImageFigure` or `ImageStepper`
- Create: `scripts/image-asset-audit.mjs`
- Modify: public image assets selected by the audit
- Modify: `package.json`

- [ ] **Step 1: Add an image asset audit before changing assets.**

Report every public raster image with byte size, intrinsic width, intrinsic height, format, and all Markdown references.

Fail when an image exceeds 750 KB without an explicit allowlist entry and rationale.

- [ ] **Step 2: Add intrinsic dimensions to the component data contract.**

```ts
export interface ImageItem {
  src: string
  alt: string
  width: number
  height: number
  title?: string
  caption?: string
  description?: string
}
```

- [ ] **Step 3: Emit width and height on every documentation image.**

```vue
<img
  class="cid-image-stepper__image"
  :src="item.imageSrc"
  :alt="item.alt"
  :width="item.width"
  :height="item.height"
  loading="lazy"
  decoding="async"
>
```

- [ ] **Step 4: Populate measured dimensions in current Markdown data.**

Do not estimate dimensions.

Read them from the source image and keep the displayed aspect ratio identical.

- [ ] **Step 5: Convert oversized screenshots to WebP.**

Use deterministic Sharp settings and retain enough quality for UI text to remain legible at 1440-pixel desktop review.

Update every reference and remove the replaced public copy only after an `rg` reference check reports no consumers.

- [ ] **Step 6: Re-run visual and performance gates.**

Run:

```bash
node scripts/image-asset-audit.mjs
pnpm build
VISUAL_AUDIT_VIEWPORTS=desktop,desktop-dark pnpm visual:audit
pnpm performance:lighthouse
```

Expected result: no selected screenshot exceeds 750 KB without rationale, all images reserve their aspect ratio, and text remains legible in full-page and lightbox views.

- [ ] **Step 7: Commit the asset optimization separately.**

```bash
git add docs scripts/image-asset-audit.mjs package.json
git commit -m "perf: optimize documentation image delivery"
```

---

## Task 11: Run the complete release-candidate verification

**Files:**

- Verify all modified files from Tasks 1 through 10.

- [ ] **Step 1: Confirm the branch and worktree boundary.**

Run:

```bash
git branch --show-current
git worktree list
git status --short
```

Expected result: execution is still on the intended documentation worktree and only planned changes are present.

- [ ] **Step 2: Run the complete static suite.**

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm openapi:verify
pnpm build
pnpm content:surface
pnpm content:safety
pnpm performance:smoke
pnpm journey:developer
node scripts/image-asset-audit.mjs
```

Expected result: every command exits zero.

- [ ] **Step 3: Run interactive component smokes.**

```bash
pnpm visual:image-stepper
pnpm visual:fragment-navigation
node scripts/openapi-reference-smoke.mjs
```

Expected result: image controls, fragment navigation, Mermaid links, and the read-only OpenAPI browser work in the built site.

- [ ] **Step 4: Run desktop light and dark validation.**

```bash
VISUAL_AUDIT_VIEWPORTS=desktop,desktop-dark pnpm visual:audit
pnpm performance:lighthouse
```

Inspect the JSON report and full-page PNG for every developer page, the long admin page, API Reference, search modal, reference index, and 404 state.

- [ ] **Step 5: Verify generated publishing artifacts directly.**

Confirm `sitemap.xml` and the local search index contain no `AGENTS`, `superpowers`, revoked sample values, or deleted request-access route.

Confirm the bundled OpenAPI file hash matches the second deterministic build.

- [ ] **Step 6: Review the final diff by concern.**

```bash
git diff --stat main...HEAD
git diff --check
git status --short
```

Review publishing boundaries, OpenAPI source provenance, developer semantics, workflow permissions, action pins, generated assets, and performance budgets separately.

- [ ] **Step 7: Record final evidence.**

Add the passing command output summary, roleplay result, OpenAPI source hash, Lighthouse route scores, and visual artifact location to the pull-request description.

Do not call the work complete if a Critical or Important roleplay finding, a failed desktop budget, or an unreviewed OpenAPI baseline increase remains.

- [ ] **Step 8: Commit any verification-only corrections.**

```bash
git add --patch
git commit -m "fix: resolve documentation verification findings"
```

---

## Deferred Admin Authoring Inventory

These items are intentionally compiled but not changed by this plan.

| File | Current authoring markers |
| --- | ---: |
| `docs/community-admins/index.md` | One requested journey-map description at line 22 |
| `docs/community-admins/community-setup.md` | Four `Screenshot placement` blocks at lines 89, 184, 227, and 330 |
| `docs/community-admins/discord-bot.md` | Four blocks at lines 80, 123, 211, and 263 |
| `docs/community-admins/role-assignments.md` | Three blocks at lines 87, 108, and 186 |
| `docs/community-admins/nickname-management.md` | Three blocks at lines 87, 131, and 382 |
| `docs/community-admins/branding-assets.md` | Four blocks at lines 73, 113, 146, and 184 |
| `docs/community-admins/maintenance-and-support.md` | Five blocks at lines 102, 134, 162, 235, and 310 |

The admin inventory contains 23 `Screenshot placement` blocks plus the index journey-map request.

The separate player inventory currently contains four explicit missing-image descriptions and several older-interface placeholder notes.

Do not remove these markers until replacement captures are approved and verified for personal data, tokens, callback parameters, cookies, and private identifiers.

---

## Completion Criteria

- [ ] Internal authoring sources are absent from output, sitemap, and local search.
- [ ] Revoked OAuth sample values are represented only by unmistakable placeholders.
- [ ] OpenAPI lint, quality ratchet, bundle, and hash verification pass offline.
- [ ] API Reference renders from the local snapshot and contains no playground or token input.
- [ ] Non-API pages do not preload the OpenAPI renderer.
- [ ] Developer Guide, Get Access, Choose Client, Register App, Terms, and API Reference are complete and linked.
- [ ] The superseded request-access route has no repository references.
- [ ] Newcomer, identity, admin, member, support, and consistency roleplay reviews have no unresolved Critical or Important findings.
- [ ] Lychee checks owned Markdown and generated HTML on pull requests and weekly.
- [ ] Desktop visual coverage includes developer, reference, API, search, 404, and long admin states in light and dark themes.
- [ ] Lighthouse desktop LCP, CLS, category, JavaScript, image, and total-byte budgets pass.
- [ ] Public raster images provide intrinsic dimensions and oversized selected assets are converted without reducing UI readability.
- [ ] Tag-only deployment behavior remains unchanged and uses the same pinned Node/pnpm toolchain as PR validation.
