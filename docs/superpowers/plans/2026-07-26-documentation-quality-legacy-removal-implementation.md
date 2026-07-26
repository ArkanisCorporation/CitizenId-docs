# Documentation Quality And Legacy Removal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert documentation review into enforceable static, browser, link, performance, and human-review gates, then remove the obsolete `/integrator-guide` tree only after complete migration evidence passes.

**Architecture:** One public-route inventory feeds static output checks, served-route checks, visual cases, and CI.
Automated evidence is written even on failure, human light/dark review is hash-bound to the captures, and legacy removal has a hard manifest precondition with no redirects or compatibility stubs.

**Tech Stack:** Node.js 22, VitePress, Playwright, Lighthouse CI 0.15.1, Lychee Action 2.9.0, GitHub Actions, Sharp, TypeScript migration validators.

## Global Constraints

- Do not begin legacy removal until the developer and cross-audience plans both report complete reviewed manifest phases.
- Do not use a blanket secret scanner that rejects JWTs, Bearer headers, cookies, authorization codes, or other credential-shaped proof fixtures.
- Enforce proof provenance, stable markers, and SHA-256 instead.
- Keep visual review desktop-first and require every changed route at 1440 by 1000 in light and dark modes.
- Always write structured evidence before returning a non-zero audit result.
- Use bounded preview, font, diagram, navigation, and CI waits.
- Preserve existing tagged release triggers, draft-release behavior, CNAME, deployment target, and permissions unless a separate approved change requires otherwise.
- No redirect, rewrite, canonical stub, meta refresh, or compatibility page may preserve `/integrator-guide`.
- Write every Markdown sentence on its own source line.

## July 20 Reconciliation

This plan completes the still-unimplemented portions of July 20 Tasks 7 through 11:

- Task 7's journey automation is expanded to all 20 developer routes and the four approved comprehensibility reviews.
- Task 8's Lychee and pull-request workflow is retained with current action versions and generated-output validation.
- Task 9's visual and Lighthouse design is retained, corrected to use `collect.settings.budgetPath`, and expanded to search, not-found, all changed routes, and hash-bound human review.
- Task 10's image delivery gate is implemented by the platform plan and consumed here.
- Task 11 becomes the release-candidate gate in this plan.
- The July 20 six-route inventory is obsolete and replaced by the shared inventory below.
- The July 20 placeholder-token and blanket credential-rejection rules are superseded by the approved proof contract.

## Task 1: Complete The Shared Public Route Inventory

**Files:**

- Modify: `scripts/audit-routes.mjs`
- Modify: `scripts/audit-routes.test.mjs`
- Create: `scripts/verify-generated-site.mjs`
- Create: `scripts/verify-generated-site.test.mjs`
- Create: `scripts/http-route-smoke.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing route-policy tests**

Export:

```text
export function discoverPublicRoutes({ docsDir, excludedGlobs })
export function routeToDistFile(routePath)
export function buildAuditCases({ routes, profile })
export function verifyGeneratedSite({ distDir, routes, forbiddenTerms })
```

Use one shared `AuditLayout` vocabulary: `mermaid`, `scenario-context`, `scenario-worksheet`, `code-group`, `sequential-proof`, `token-proof`, `refresh-proof`, `glossary`, `openapi`, `brand-assets`, `admin-handoff`, and `image-stepper`.
Each route record must contain `id`, `path`, `sourcePath`, `expectedTitle`, `lifecycle`, `changedByMigration`, `layouts`, and `readySelector`.
Allowed lifecycle values are `public`, `planned`, and `legacy-pending-removal`.
Discovery, not a hard-coded total, is the long-term source of truth.
Generated-route and visual cases must ignore `planned` records, and the final gate must reject any remaining planned record.
While the legacy source still exists, mark it as `legacy-pending-removal` so migration-phase checks can compare it without treating it as a final public route.

Require these 27 narrative routes in the changed set:

```text
/community-developers/
/community-developers/access
/community-developers/client-types
/community-developers/applications
/community-developers/sign-in-members
/community-developers/request-member-data
/community-developers/protect-an-api
/community-developers/call-apis
/community-developers/delegate-access
/community-developers/manage-sessions
/community-developers/revoke-access
/community-developers/go-to-production
/community-developers/troubleshoot
/community-developers/oauth-and-oidc
/community-developers/scopes-and-claims
/community-developers/tokens-and-revocation
/community-developers/roles
/community-developers/api-reference
/community-developers/sdks-and-libraries
/community-developers/terms
/reference/
/reference/brand-guidelines
/community-admins/discord-bot
/community-admins/role-assignments
/community-admins/nickname-management
/community-admins/branding-assets
/players/discord-integrations
```

This is a minimum core, not the final count.
Platform Task 9 must also mark every route whose image component inputs, intrinsic dimensions, source asset, or rendering behavior changes.
Derive the final changed-route set from `public` audit records with `changedByMigration: true`, and make tests fail if a changed source file or image consumer lacks such a record.

- [ ] **Step 2: Add static generated-output checks**

After `pnpm build`, the final phase must assert:

- every public route has its expected HTML;
- sitemap contains every public route and no excluded or legacy route;
- HTML, sitemap, page-data chunks, and local-search assets contain no `AGENTS`, `/superpowers/`, `/integrator-guide`, legacy page title, or migration-stub prose;
- no generated legacy HTML or page-data chunk exists;
- `404.html` exists;
- config and owned public Markdown contain no legacy target, rewrite, or sidebar key after removal.

Provide `--phase migration` for work before deletion.
That phase enforces authoring-source exclusion and canonical routes while reporting the still-present legacy output as explicit pending debt.
It must not report the final no-legacy contract as passed.

- [ ] **Step 3: Add served HTTP behavior checks**

Reuse the exact `start-server-and-test@3.0.11` preview lifecycle pinned by Platform Task 1.
Run a bounded VitePress preview and make the final phase assert:

- all public routes return 200;
- representative AGENTS and superpowers paths return 404;
- `/integrator-guide/oauth2/oidc` returns 404 without redirect;
- the old route uses the same ordinary not-found state as an unrelated missing route.

Check response status explicitly; an HTTP 404 is not a Playwright `requestfailed` event.
The migration phase instead confirms that the representative legacy route is still present and records it as pending removal.

Add these owning package entries now:

```json
{
  "scripts": {
    "site:verify:migration": "node scripts/verify-generated-site.mjs --phase migration",
    "site:verify": "node scripts/verify-generated-site.mjs --phase final",
    "site:http:migration": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"node scripts/http-route-smoke.mjs --phase migration --base-url http://127.0.0.1:4173\"",
    "site:http": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"node scripts/http-route-smoke.mjs --phase final --base-url http://127.0.0.1:4173\""
  }
}
```

- [ ] **Step 4: Verify the route policy**

Run:

```powershell
rtk pnpm exec tsx --test scripts/audit-routes.test.mjs scripts/verify-generated-site.test.mjs
rtk pnpm build
rtk pnpm site:verify:migration
rtk pnpm site:http:migration
```

Before final removal, the migration commands must report the legacy state as pending.
The unqualified `site:verify` and `site:http` commands remain final-phase gates and must fail until removal.

- [ ] **Step 5: Commit the route gate**

```powershell
rtk git add scripts/audit-routes.mjs scripts/audit-routes.test.mjs scripts/verify-generated-site.mjs scripts/verify-generated-site.test.mjs scripts/http-route-smoke.mjs package.json
rtk git commit -m "test(docs): enforce public route policy"
```

## Task 2: Replace The Visual Collector With A Failing Audit

**Files:**

- Create: `scripts/visual-audit-helpers.mjs`
- Create: `scripts/visual-audit-helpers.test.mjs`
- Create: `scripts/run-browser-quality.mjs`
- Create: `scripts/run-browser-quality.test.mjs`
- Rewrite: `scripts/visual-audit.mjs`
- Modify: `scripts/performance-smoke.mjs`
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Write failing helper tests**

Export and test:

```text
export function expectedWideContentOutset(viewportWidth)
export function parseCssColor(value)
export function contrastRatio(foreground, background)
export function collectAuditFailures(result)
export function formatAuditFailureSummary(failures)
```

Cover transparent backgrounds, RGB and hexadecimal color parsing, 4.5:1 text and 3:1 graphical thresholds, exact breakpoint outsets, and aggregate failure formatting.

- [ ] **Step 2: Define primary and breakpoint matrices**

Primary matrix:

- 1440 by 1000 light and dark for every changed route;
- 1280 by 900 light and dark for every distinct complex layout.

Build cases only for `public` route records.
Report `planned` changed routes as explicit pending work without attempting navigation, and reject any planned route in the final profile.

Breakpoint matrix:

- representative layouts at 1024, 960, 768, and 390 pixels.

Required layout states are TreeView, Scenario Context, worksheet, code group, sequential proof, token proof, refresh proof, glossary, brand assets, Admin handoff, ordinary Mermaid, search, and not-found.

- [ ] **Step 3: Make every case deterministic and fail-capable**

Before navigation, seed `vitepress-theme-appearance` with `browserContext.addInitScript`.
For every case:

- assert the resulting theme class and Citizen iD style token;
- bound DOM, font, Mermaid, and route-state waits;
- disable animations and transitions;
- record console errors, `pageerror`, failed owned requests, and same-origin HTTP error responses;
- assert one visible `h1`, one `main`, a non-empty title, and valid landmarks;
- assert no document-level overflow;
- assert wide-surface geometry and local Mermaid overflow;
- assert Scenario Context has no scrolling worksheet;
- compute Mermaid node and edge-label contrast;
- exercise code-group arrow-key selection;
- grant clipboard permission and compare copied proof bytes to the manifest;
- assert glossary counts 9, 5, 4, and 1;
- verify owned links and fragments once per route.

Always write one full-page PNG and JSON result per case plus `.artifacts/visual-audit/report.json`.
Aggregate failures and exit non-zero only after evidence is written.

- [ ] **Step 4: Support focused and full profiles**

Add `--profile pr` and `--profile full`, plus optional comma-separated route and viewport filters.
Avoid POSIX-only environment assignment examples in documentation and package scripts.

Make `scripts/run-browser-quality.mjs` accept `--phase migration|final` and a preview base URL.
Run the direct HTTP route smoke, OpenAPI browser smoke, Scenario Context smoke, Mermaid contrast smoke, wide-content smoke, notation smoke, ImageStepper smoke, fragment-navigation smoke, and PR visual profile sequentially against that one preview.
Use bounded child-process timeouts, forward each command's output, stop after the first failed focused gate, and preserve any evidence already written.
Export the command builder and test exact order, phase propagation, base-URL propagation, timeout handling, and first-failure behavior without launching a browser.

Add the browser and visual entry points in this task:

```json
{
  "scripts": {
    "audit:browser:migration": "node scripts/run-browser-quality.mjs --phase migration --base-url http://127.0.0.1:4173",
    "audit:browser": "node scripts/run-browser-quality.mjs --phase final --base-url http://127.0.0.1:4173",
    "quality:browser:migration": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:browser:migration\"",
    "quality:browser": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:browser\"",
    "audit:visual:pr": "node scripts/visual-audit.mjs --profile pr --base-url http://127.0.0.1:4173",
    "audit:visual:full": "node scripts/visual-audit.mjs --profile full --base-url http://127.0.0.1:4173",
    "visual:audit": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:visual:pr\"",
    "visual:audit:full": "pnpm build && start-server-and-test \"pnpm serve:audit\" http://127.0.0.1:4173 \"pnpm audit:visual:full\""
  }
}
```

- [ ] **Step 5: Prove the old collector no longer masks failures**

Run:

```powershell
rtk node --test scripts/visual-audit-helpers.test.mjs
rtk node --test scripts/run-browser-quality.test.mjs
rtk pnpm quality:browser:migration
```

Expected before platform fixes: explicit failures for dark Mermaid contrast, worksheet overflow, or swallowed diagram readiness.
Expected after platform fixes: a report with zero unapproved failures.

- [ ] **Step 6: Commit the enforceable audit**

```powershell
rtk git add scripts/visual-audit.mjs scripts/visual-audit-helpers.mjs scripts/visual-audit-helpers.test.mjs scripts/run-browser-quality.mjs scripts/run-browser-quality.test.mjs scripts/performance-smoke.mjs package.json .gitignore
rtk git commit -m "test(docs): enforce visual quality"
```

## Task 3: Bind Manual Desktop Review To Captured Evidence

**Files:**

- Create: `quality/documentation/visual-review.json`
- Create: `quality/documentation/visual-evidence/index.json`
- Create: `quality/documentation/visual-evidence/**/*.webp`
- Create: `scripts/promote-visual-evidence.mjs`
- Create: `scripts/verify-visual-review.mjs`
- Create: `scripts/verify-visual-review.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write failing review-record tests**

Each required record must contain route ID, theme, viewport, source-tree hash, committed evidence path, evidence SHA-256, original audit-result SHA-256, reviewer, status, and notes.
Reject missing, stale, changed, or unapproved records.
Compute the source-tree hash from public documentation, theme, configuration, examples, OpenAPI snapshot and metadata, shared route inventory, visual harness, and relevant package lock inputs while excluding generated audit output and the review-evidence files themselves.

- [ ] **Step 2: Require two desktop reviews for every changed route**

Every route in the derived changed set requires approved 1440 by 1000 light and dark review.
Review reading order, density, line length, clipping, focus visibility, theme consistency, code labels, diagram balance, card scanning, and professional polish.

After a zero-failure full audit, `scripts/promote-visual-evidence.mjs` must create fixed-setting lossless WebP review copies under `quality/documentation/visual-evidence/` and a deterministic index.
Keep the full PNG and JSON matrix in the CI artifact, but commit the two primary review copies per changed route so approval remains verifiable after CI artifact expiry and from a clean checkout.
Do not resize below the captured viewport width or discard the full page height.

- [ ] **Step 3: Add representative breakpoint review**

Require reviewed 1280 light and dark cases for each distinct complex layout and review notes for 1024, 960, 768, and 390 containment cases.
Do not multiply identical simple reference-page captures.

Add these package entries in this task:

```json
{
  "scripts": {
    "visual:evidence:promote": "node scripts/promote-visual-evidence.mjs",
    "visual:review:verify": "node scripts/verify-visual-review.mjs"
  }
}
```

- [ ] **Step 4: Verify and commit review machinery**

Run:

```powershell
rtk node --test scripts/verify-visual-review.test.mjs
rtk pnpm visual:audit:full
rtk pnpm visual:evidence:promote
rtk pnpm visual:review:verify
```

Commit only reviewed evidence, not empty approval placeholders.

```powershell
rtk git add quality/documentation/visual-review.json quality/documentation/visual-evidence scripts/promote-visual-evidence.mjs scripts/verify-visual-review.mjs scripts/verify-visual-review.test.mjs package.json
rtk git commit -m "test(docs): bind visual review evidence"
```

## Task 4: Add Lighthouse, Lychee, And Pull-Request Quality Gates

**Files:**

- Create: `.lychee.toml`
- Create: `.lighthouserc.cjs`
- Create: `lighthouse-budget.json`
- Create: `.github/workflows/quality.yml`
- Modify: `.github/workflows/deploy.yml`
- Modify: `package.json`

- [ ] **Step 1: Write a valid Lighthouse configuration**

Use `staticDistDir: 'docs/.vitepress/dist'`, three desktop runs, and these routes: home, Developer Guide, Sign In Members, Protect An API, API Reference, Brand Guidelines, and the longest Admin page.

Use exact gates:

- performance at least 0.85;
- accessibility, best practices, and SEO at least 0.95;
- largest contentful paint at most 2500 milliseconds;
- cumulative layout shift at most 0.1.

Use global budgets of 1400 KiB script, 1500 KiB image, and 2600 KiB total.
Use API Reference budgets of 2400 KiB script, 500 KiB image, and 3400 KiB total.

Configure the budget file through `collect.settings.budgetPath` and assert `performance-budget: error`.
Do not use the mutually exclusive `assert.budgetsFile` form.

- [ ] **Step 2: Configure Lychee for owned and generated content**

Check `README.md`, owned public Markdown, and built HTML.
Exclude authoring sources, localhost, and `.invalid` fixture hosts with documented reasons.
Do not blanket-ignore 403 or 429.
Enable bounded retries and cache.

- [ ] **Step 3: Add a least-privilege quality workflow**

Trigger on pull request, push to `main`, weekly schedule, and manual dispatch with `contents: read` only.
Use static, browser, Lighthouse, and links jobs.
Upload visual and Lighthouse evidence on failure.
Until Task 6 deletes the legacy tree, invoke the explicit `quality:static:migration` and `quality:browser:migration` gates.
Task 6 must switch the workflow to the final gates in the same commit that removes the legacy tree.

Pin the versions verified on 2026-07-26 by immutable SHA:

```text
actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
pnpm/action-setup@008330803749db0355799c700092d9a85fd074e9 # v6.0.9
actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7.0.1
lycheeverse/lychee-action@e7477775783ea5526144ba13e8db5eec57747ce8 # v2.9.0
```

- [ ] **Step 4: Modernize deployment actions without changing behavior**

Preserve the manual and `v*.*.*` triggers, draft release, CNAME, build directory, and deployment permissions.
Use:

```text
peaceiris/actions-gh-pages@1ef5a1b1df4c63fe21a2242edbee6cac921ece01 # v4.1.0
ncipollo/release-action@339a81892b84b4eeb0f6e744e4574d79d0d9b8dd # v1.21.0
```

Run the same static release-candidate checks before publication.
Use the migration-phase static gate until Task 6 removes the legacy tree, then switch deployment to the final static gate in that deletion commit.

- [ ] **Step 5: Verify local equivalents and workflow syntax**

Define the static aggregates in their owning task:

```json
{
  "scripts": {
    "test:unit": "tsx --test \"docs/.vitepress/theme/data/*.test.ts\" \"scripts/**/*.test.ts\" \"scripts/**/*.test.mjs\"",
    "test:content": "pnpm test:developer-content -- --all && pnpm notation:source",
    "test:quality": "pnpm test:unit && pnpm test:content",
    "performance:lighthouse": "lhci autorun",
    "quality:static:migration": "pnpm test:quality && pnpm lint && pnpm migration:verify -- --phase migration && pnpm proofs:verify && pnpm proofs:compile && pnpm content:hygiene:source && pnpm openapi:verify && pnpm build && pnpm content:hygiene:generated && pnpm site:verify:migration && pnpm screenshots:discord:verify && pnpm assets:audit && pnpm performance:smoke",
    "quality:static": "pnpm test:quality && pnpm lint && pnpm migration:verify -- --phase final --require-complete && pnpm legacy:absence && pnpm proofs:verify && pnpm proofs:compile && pnpm content:hygiene:source && pnpm openapi:verify && pnpm build && pnpm content:hygiene:generated && pnpm site:verify && pnpm screenshots:discord:verify && pnpm assets:audit && pnpm performance:smoke"
  }
}
```

Run:

```powershell
rtk pnpm quality:static:migration
rtk pnpm quality:browser:migration
rtk pnpm performance:lighthouse
rtk git diff --check
```

- [ ] **Step 6: Commit CI quality gates**

```powershell
rtk git add .lychee.toml .lighthouserc.cjs lighthouse-budget.json .github/workflows package.json
rtk git commit -m "ci: add documentation release quality gates"
```

## Task 5: Run Four Comprehensibility Reviews

**Files:**

- Create: `quality/documentation/comprehensibility-review.json`
- Create: `scripts/verify-comprehensibility-review.mjs`
- Modify: `package.json`

- [ ] **Step 1: Define review records and severity**

Each finding records role, route, anchor, severity, observation, required change, resolution commit, reviewer, and status.
Allowed severities are Critical, Important, and Polish.
Closure rejects open Critical or Important findings.
Add `"review:verify": "node scripts/verify-comprehensibility-review.mjs"` to `package.json` in this task.

- [ ] **Step 2: Run the newcomer journey**

Complete access, client choice, registration, sign-in, API protection or calling, session operation, and production readiness without consulting a legacy route.

- [ ] **Step 3: Run the identity-specialist review**

Verify issuers, client boundaries, S256, token purpose, claims, delegation, rotation, revocation, and capability statements against primary evidence.

- [ ] **Step 4: Run documentation and cross-audience reviews**

Verify narrative consistency, terminology, proof preservation, asset provenance, source readability, canonical ownership, and Discord handoff outcomes.

- [ ] **Step 5: Resolve blocking findings and commit evidence**

Run:

```powershell
rtk pnpm review:verify
rtk pnpm migration:verify -- --phase pre-removal --require-complete
```

Expected: zero open Critical or Important findings and all required reviewers recorded.

```powershell
rtk git add quality/documentation/comprehensibility-review.json scripts/verify-comprehensibility-review.mjs package.json
rtk git commit -m "test(docs): approve developer comprehensibility review"
```

## Task 6: Close The Manifest And Remove All Legacy State

**Files:**

- Modify: `migration/integrator-guide/manifest.json`
- Modify: `docs/.vitepress/config.mts`
- Modify: public Markdown containing legacy links or migration notes
- Modify: `docs/.vitepress/theme/index.ts`
- Modify: `.github/workflows/quality.yml`
- Modify: `.github/workflows/deploy.yml`
- Modify: `package.json`
- Create: `scripts/assert-legacy-absence.mjs`
- Create: `scripts/assert-legacy-absence.test.mjs`
- Delete: `docs/.vitepress/theme/components/Tabs.vue`
- Delete: all 18 Markdown files under `docs/integrator-guide/**`
- Delete: only legacy assets proven orphaned by the asset graph

- [ ] **Step 1: Satisfy the hard precondition**

Run:

```powershell
rtk pnpm migration:verify -- --phase pre-removal --require-complete
rtk pnpm proofs:verify
rtk pnpm review:verify
rtk pnpm visual:review:verify
rtk pnpm quality:static:migration
rtk pnpm quality:browser:migration
```

Do not proceed unless every precondition passes.

- [ ] **Step 2: Remove current migration scaffolding from public prose**

Replace every legacy link and `Legacy Details` section with canonical content or a canonical local anchor.
Remove migration notes and the old brand stub.

- [ ] **Step 3: Remove custom Tabs after its final consumer is gone**

Assert no `<Tabs` use remains.
Delete the component, import, and global registration.
The equivalent sign-in alternatives must already render in a VitePress `::: code-group`.

- [ ] **Step 4: Remove sidebar mapping and all 18 source files**

Delete the `/integrator-guide/` sidebar key.
Delete the complete legacy Markdown tree.
Do not add redirects or placeholder pages.
Switch the quality and deployment workflows from migration-phase package gates to `quality:static` and `quality:browser` now that final no-legacy assertions can pass.

- [ ] **Step 5: Remove only proven orphan assets**

Run the image reference graph after all canonical destinations build.
Delete only assets reported as unreferenced and whose migration record permits retirement.

- [ ] **Step 6: Prove the obsolete module is gone**

Create `assert-legacy-absence.mjs` with fixture-driven tests.
It must exit zero only when the legacy directory, public links, config keys, migration prose, custom Tabs source, imports, registrations, and canonical or redirect substitutes are absent.
Scan owned public source and repository onboarding while explicitly excluding `docs/superpowers/**`, `**/AGENTS.md`, immutable migration evidence, and this assertion's own fixtures.
Add `"legacy:absence": "node scripts/assert-legacy-absence.mjs"` to `package.json`.

Run:

```powershell
rtk node --test scripts/assert-legacy-absence.test.mjs
rtk pnpm legacy:absence
rtk pnpm migration:verify -- --phase final --require-complete
rtk pnpm build
rtk pnpm site:verify
rtk pnpm site:http
rtk pnpm assets:audit
```

Expected: the negative assertion succeeds, canonical routes pass, and a representative old URL returns the ordinary 404 without redirect.

- [ ] **Step 7: Commit irreversible cleanup separately**

```powershell
rtk git add docs migration/integrator-guide/manifest.json .github/workflows/quality.yml .github/workflows/deploy.yml scripts/assert-legacy-absence.mjs scripts/assert-legacy-absence.test.mjs package.json
rtk git commit -m "docs: remove obsolete integrator guide"
```

## Task 7: Document The Final Workflow And Run The Release Candidate

**Files:**

- Modify: `docs/AGENTS.md`
- Modify: `docs/community-developers/AGENTS.md`
- Modify: `README.md`
- Create: `scripts/quality-rc.mjs`
- Create: `scripts/quality-rc.test.mjs`
- Modify: `package.json`
- Verify: all changed files and generated evidence

- [ ] **Step 1: Update authoring instructions**

Document scenario-pack order, exact proof markers and provenance, immutable-source versus derived executable fixtures, template-versus-proof distinction, code groups, wide-surface ownership, Mermaid contrast, reviewed OpenAPI operation metadata, changed-route inventory ownership, canonical cross-audience ownership, public-source exclusions, and required quality commands.

In Community Developer instructions, explicitly require complete proof retention, no browser or native client secret, the five evidence layers, purposeful handoff wording, and no legacy-route links.

- [ ] **Step 2: Update repository onboarding**

Document the final Start, Build, Operate, and Reference information architecture.
State that `/integrator-guide` has no compatibility path.
Document install, unit, lint, build, static, browser, visual, Lighthouse, asset, OpenAPI, migration, and release-candidate commands plus evidence locations.

- [ ] **Step 3: Expose a single release-candidate command**

Create a cross-platform Node orchestrator with a test that locks this order:

```text
pnpm quality:static
pnpm quality:browser
pnpm visual:audit:full
pnpm visual:review:verify
pnpm review:verify
pnpm performance:lighthouse
```

`quality:static` already expands to unit, content, lint, final migration, proof integrity, proof compilation, source hygiene, OpenAPI and lock integrity, build, generated hygiene, generated-site, Discord screenshot, image, and performance-smoke gates.
`quality:browser` owns the served HTTP check and every focused browser smoke, including ImageStepper and fragment navigation, before it runs the PR visual profile.
The orchestrator must spawn without shell interpolation, inherit output, enforce a bounded timeout for every child, and stop at the first non-zero exit.

Add the runner in this task:

```json
{
  "scripts": {
    "quality:rc": "node scripts/quality-rc.mjs"
  }
}
```

Verify that the cumulative package surface still exposes test, migration, proof, hygiene, OpenAPI, generated-site, HTTP, screenshot, image, focused-browser, visual, manual-review, Lighthouse, legacy-absence, static, and release-candidate entry points from their owning tasks.

- [ ] **Step 4: Run the release candidate from a clean dependency install**

Because legacy deletion changes configuration and built search output, regenerate the full visual artifacts after Task 6 and renew any review records whose source or capture hash changed.
Do not carry pre-removal approvals forward as if the evidence were unchanged.
Promote the final light and dark primary review copies for every derived changed route again and stage the refreshed `visual-evidence` index, WebP files, and `visual-review.json` with this task.

After the full audit and promotion, pause for the required human light-and-dark review.
Record approvals or findings in `visual-review.json`, resolve any blocking finding, rerun the affected captures, promote again, and require `visual:review:verify` to pass before running the release candidate.

Run:

```powershell
rtk pnpm install --frozen-lockfile
rtk pnpm visual:audit:full
rtk pnpm visual:evidence:promote
rtk pnpm visual:review:verify
rtk pnpm quality:rc
rtk git diff --check
rtk git status --short
```

Record command summaries, source-tree hash, proof-manifest hash, OpenAPI source-lock hash, Lighthouse scores, visual artifact location, and manual approvals in the pull request.
Require the matching GitHub quality workflow's Lychee job to pass for the same commit because Lychee is intentionally provided by the pinned CI action rather than an unpinned local binary.

- [ ] **Step 5: Commit maintenance documentation**

```powershell
rtk git add docs/AGENTS.md docs/community-developers/AGENTS.md README.md scripts/quality-rc.mjs scripts/quality-rc.test.mjs package.json quality/documentation/visual-review.json quality/documentation/visual-evidence
rtk git commit -m "docs: document final developer authoring workflow"
```

Use a narrow `fix(docs): resolve release candidate findings` commit only if the final run reveals real defects.

## Plan Completion Gate

- [ ] All unit, lint, migration, proof, OpenAPI, build, generated-site, HTTP, image, visual, link, Lighthouse, and review gates pass.
- [ ] Every changed route has current 1440 light and dark evidence and approval.
- [ ] No Critical or Important comprehensibility finding remains.
- [ ] No `/integrator-guide` source, link, config key, generated route, search entry, sitemap entry, redirect, or compatibility page remains.
- [ ] Actual credential-shaped samples still match the approved proof manifest.
- [ ] README and AGENTS describe the resulting repository, not the migration process.

## Primary References

- [VitePress site configuration](https://vuejs.github.io/vitepress/v1/reference/site-config)
- [Playwright browser context initialization](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script)
- [Playwright request failure behavior](https://playwright.dev/docs/api/class-page#page-on-requestfailed)
- [Lighthouse CI configuration](https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md)
- [Lychee Action](https://github.com/lycheeverse/lychee-action)
