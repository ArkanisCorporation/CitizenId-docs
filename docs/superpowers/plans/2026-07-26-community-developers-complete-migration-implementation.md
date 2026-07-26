# Community Developers Complete Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the complete Community Developer narrative, documentation-platform and OpenAPI improvements, canonical cross-audience destinations, enforceable quality gates, and final removal of the obsolete `/integrator-guide` module without losing any legacy content or proof evidence.

**Architecture:** This file is the execution index for four self-contained companion plans.
An immutable heading and proof baseline precedes content changes, shared rendering foundations precede visual acceptance, developer and cross-audience content proceed in scoped lanes, and legacy deletion is a separately gated final phase.

**Tech Stack:** VitePress 1.6.4, Vue 3.5, TypeScript, Mermaid 11, Playwright, Redocly CLI, vitepress-openapi, Lighthouse CI, Lychee, Sharp, ASP.NET Core sample fixtures.

## Authoritative Inputs

- Approved design: `docs/superpowers/specs/2026-07-26-community-developers-complete-migration-design.md`
- Earlier platform design being integrated: `docs/superpowers/plans/2026-07-20-documentation-platform-openapi-quality.md`
- Platform, OpenAPI, and presentation plan: `docs/superpowers/plans/2026-07-26-documentation-platform-openapi-readability-implementation.md`
- Developer content plan: `docs/superpowers/plans/2026-07-26-community-developer-content-migration-implementation.md`
- Cross-audience content plan: `docs/superpowers/plans/2026-07-26-cross-audience-content-migration-implementation.md`
- Quality and removal plan: `docs/superpowers/plans/2026-07-26-documentation-quality-legacy-removal-implementation.md`

If a companion plan conflicts with the approved July 26 design, the July 26 design controls.
If the July 20 plan conflicts with the approved proof-preservation decision, the proof-preservation decision controls.

## Non-Negotiable Global Constraints

- Capture all 18 legacy files, 110 headings, 23 fenced proofs, 11 screenshot references, and 16 unique remote brand assets before editing or deleting legacy content.
- Retain actual credential-shaped samples as critical proof examples.
- Preserve every current proof byte-for-byte by default.
- Replace a proof only after positive sensitivity or operability evidence, explicit user approval, and a recorded full-fidelity replacement exception.
- Do not expose `AGENTS.md`, plans, or specifications as public VitePress routes or search entries.
- Do not preserve `/integrator-guide` through redirects, rewrites, stubs, canonical tags, or meta refreshes.
- Keep the legacy tree available for comparison until every migration row and asset disposition is reviewed and verified.
- Use VitePress built-ins when their semantics match: code groups for equivalent alternatives, titled fences, code imports, containers, and Badge.
- Keep required sequential proof stages visible together.
- Require desktop light and dark review for every changed route.
- Write every Markdown sentence on its own source line.
- Use semantic, narrowly scoped commits and do not stage unrelated worktree changes.

## July 20 Plan Reconciliation

The July 20 plan was not wholly implemented.
The following dispositions ensure that the earlier design is neither lost nor blindly repeated.

### July 20 Task 1: Pin Toolchain And Packages

`.node-version`, the Node engine, Redocly, vitepress-openapi, and Lighthouse CI pins are absent.
Platform Task 1 retains this work and updates Redocly to 2.40.0.

### July 20 Task 2: Exclude Sources And Normalize Samples

`srcExclude` and generated-route assertions are absent.
The placeholder-token rule conflicts with the approved proof contract.
Platform Task 2 implements source exclusion.
Developer Tasks 1 and 2 replace blanket credential rejection with provenance and SHA-256 validation.

### July 20 Task 3: Add A Reproducible OpenAPI Snapshot

No `openapi/`, Redocly config, snapshot, source lock, or quality script exists.
Platform Task 3 implements the complete network-explicit pipeline.

### July 20 Task 4: Add A Lazy Read-Only API Browser

No OpenAPI browser component or route-isolation smoke exists.
Platform Task 4 implements the browser, and Developer Tasks 7 and 11 supply narrative context.

### July 20 Task 5: Build Scenario And Abbreviation Foundations

Typed Asteria data, base components, and focused tests landed.
The wide table, dark diagram contrast, duplicate centering, and uncategorized glossary remain.
Platform Tasks 5 through 8 rework the implemented baseline without recreating it.

### July 20 Task 6: Implement The Developer Start Migration

Developer Guide, Get Access, Choose Client, Register App, Terms, the sidebar, and initial visual coverage landed.
They remain incomplete relative to the full legacy narrative.
Developer Tasks 3 and 4 extend the Start foundation, and later tasks complete Build, Operate, and Reference.

### July 20 Task 7: Add Journey Automation And Roleplay

Existing visual checks cover only the initial slice, and no complete role review record exists.
Developer contracts plus Quality Tasks 2, 3, and 5 implement automated and four-role review.

### July 20 Task 8: Add Lychee And Pull-Request Validation

No `.lychee.toml` or quality workflow exists.
Quality Task 4 implements source and generated link checking plus pull-request gates.

### July 20 Task 9: Add Visual And Lighthouse Gates

`visual-audit.mjs` collects observations, suppresses some readiness failures, and lacks search, not-found, full-route, and Lighthouse gates.
Quality Tasks 1 through 4 replace it with shared routes, failing evidence, manual review, and valid Lighthouse budgets.

### July 20 Task 10: Add Image Dimensions And Optimization

Image types and preview or lightbox output lack intrinsic dimensions, and no asset budget exists.
Platform Task 9 implements the reference graph, dimensions, and measured optimization after destinations stabilize.

### July 20 Task 11: Run Release-Candidate Verification

No single complete release gate exists.
Quality Task 7 defines and runs `quality:rc`.

The July 20 Tasks 5 and 6 are therefore treated as implemented foundations, not as proof that the wider program is complete.

## Planned Final Information Architecture

### Start

- `/community-developers/`
- `/community-developers/access`
- `/community-developers/client-types`
- `/community-developers/applications`

### Build

- `/community-developers/sign-in-members`
- `/community-developers/request-member-data`
- `/community-developers/protect-an-api`
- `/community-developers/call-apis`
- `/community-developers/delegate-access`

### Operate

- `/community-developers/manage-sessions`
- `/community-developers/revoke-access`
- `/community-developers/go-to-production`
- `/community-developers/troubleshoot`

### Reference

- `/community-developers/oauth-and-oidc`
- `/community-developers/scopes-and-claims`
- `/community-developers/tokens-and-revocation`
- `/community-developers/roles`
- `/community-developers/api-reference`
- `/community-developers/sdks-and-libraries`
- `/community-developers/terms`
- shared `/reference/brand-guidelines`

Community Admin pages own Discord installation and automation.
Player pages own member-visible Discord behavior.
The shared Reference module owns brand policy.

## Execution Dependency Map

```text
Immutable legacy baseline and proof corpus
  -> toolchain, source boundary, OpenAPI snapshot and read-only browser
  -> wide content, Mermaid, Scenario Context, glossary
  -> shared route inventory and failing visual/browser audit foundation
  -> developer Start/Build/Operate/Reference content
     || Community Admin, Player, and Brand content
  -> OpenAPI browser narrative integration and final image destinations
  -> image dimensions and retained-asset optimization
  -> generated-site, visual, link, Lighthouse, and review closure
  -> complete migration manifest
  -> remove links, Tabs, sidebar key, and all legacy files
  -> README, AGENTS, and full release candidate
```

The two content lanes may run in parallel after baseline capture and shared manifest interfaces land.
They must not edit the same manifest records in one worktree at the same time.
Use owner-scoped records or serialize manifest merges.

## Phase 0: Freeze The Evidence Baseline

- [ ] Complete Developer Content Task 1.
- [ ] Review and commit the exact 18, 110, 23, 11, and 16 counts.
- [ ] Complete Developer Content Task 2.
- [ ] Verify credential-shaped proofs and encoded-to-decoded relationships before content rewriting begins.
- [ ] Complete Cross-Audience Task 1 to assign the 48 cross-audience rows without marking them complete.

Exit criteria:

- immutable source hashes are committed;
- every proof has a stable ID and provenance decision;
- no legacy file has changed;
- all unresolved review states fail closure explicitly.

## Phase 1: Establish Shared Platform Foundations

- [ ] Complete Platform Tasks 1 through 3 for toolchain, source exclusion, and OpenAPI snapshot quality.
- [ ] Complete Platform Tasks 5 through 8 for wide content, Mermaid, Scenario Context, glossary, and native notation.
- [ ] Complete Platform Task 4 for the read-only browser after the shared wide-content primitive exists.
- [ ] Complete Quality Tasks 1 and 2 to establish the shared route inventory, final-versus-migration route semantics, bounded browser runner, and failing visual audit before content pages rely on them.
- [ ] Do not remove custom Tabs while the legacy OIDC page still consumes it.
- [ ] Do not finalize image call sites until content destinations and asset decisions stabilize.

Exit criteria:

- normal builds run offline;
- authoring sources are absent from generated routes and search;
- Mermaid text meets contrast in both themes;
- Scenario Context has no wide ten-column table;
- wide surfaces use the same tested outset;
- Terms uses four correctly spaced categories.

## Phase 2: Migrate Developer Content

- [ ] Complete Developer Content Tasks 3 through 10 in dependency order.
- [ ] Complete Developer Content Task 11 after the OpenAPI browser, operation metadata, and proof fixtures exist.
- [ ] Complete Developer Content Task 12 for navigation and pending handoff contracts.

Exit criteria:

- all 20 routes build;
- no Community Developer page links to `/integrator-guide`;
- every developer-owned heading and proof destination is verified;
- actual credential-shaped proofs remain complete and copyable;
- browser and native examples contain no client secret;
- legacy source remains present for comparison.

## Phase 3: Migrate Cross-Audience Content

- [ ] Complete Cross-Audience Tasks 2 through 4 for Admin and Player Discord guidance and current screenshots.
- [ ] Complete Cross-Audience Tasks 5 and 6 for the full brand policy, reviewed asset dispositions, and approved localization where authority permits it.
- [ ] Complete Cross-Audience Task 7 after Developer navigation exists so it alone owns the final handoff prose.

Exit criteria:

- all 48 cross-audience heading records have reviewed destinations;
- all 11 screenshot references have reviewed keep, reuse, replace, or retire dispositions;
- all 16 remote brand assets and 8 button examples have reviewed dispositions;
- corrections contain current evidence and rationale;
- no legacy file or potentially shared image has been deleted.

## Phase 4: Stabilize Assets And Enforce Quality

- [ ] Complete Platform Task 9 after the final image consumers exist.
- [ ] Capture the full visual matrix and complete Quality Task 3 human review.
- [ ] Complete Quality Task 4 for Lychee, Lighthouse, quality workflow, and deployment action pins.
- [ ] Complete Quality Task 5 and resolve every Critical and Important review finding.

Exit criteria:

- all changed routes have 1440 light and dark captures and approval;
- each distinct complex layout passes the 1280 and breakpoint matrix;
- static output, HTTP behavior, links, image budgets, and Lighthouse gates pass;
- every migration and review record is complete.

## Phase 5: Remove The Obsolete Module

- [ ] Run `rtk pnpm migration:verify -- --phase pre-removal --require-complete` before deleting anything.
- [ ] Complete Quality Task 6 in its specified order.
- [ ] Remove custom Tabs only after the built-in code group is verified.
- [ ] Remove all 18 legacy Markdown files and the `/integrator-guide/` sidebar mapping.
- [ ] Remove only image assets proven orphaned by the post-migration reference graph.
- [ ] Verify representative old URLs return the ordinary 404 without redirect.

Exit criteria:

- no source, link, configuration key, output route, search entry, sitemap entry, redirect, or compatibility stub remains for `/integrator-guide`;
- all canonical destinations still resolve;
- proof hashes still pass after deletion.

## Phase 6: Document And Release-Verify The Result

- [ ] Complete Quality Task 7.
- [ ] Update `docs/AGENTS.md`, `docs/community-developers/AGENTS.md`, and `README.md` to describe the resulting system.
- [ ] Run `rtk pnpm quality:rc` from a frozen install.
- [ ] Run `rtk git diff --check` and inspect `rtk git status --short`.
- [ ] Record hashes, scores, artifact paths, and approvals in the pull request.

Exit criteria:

- all automated and manual gates pass;
- documentation maintenance instructions match the final code and information architecture;
- no Critical or Important finding remains;
- the working tree contains only the intended reviewed change set.

## Implementation Commit Sequence

Use the narrower commit boundaries in each companion plan.
The expected logical sequence is:

1. Baseline and proof tests.
2. Toolchain and publishing boundary.
3. OpenAPI snapshot.
4. Shared presentation foundations.
5. Lazy API browser and operation metadata.
6. Shared route and failing audit foundations.
7. Developer task and reference pages.
8. Cross-audience destinations, assets, and final handoffs.
9. Image delivery contract.
10. Visual, link, Lighthouse, and review gates.
11. Legacy removal.
12. Final authoring and repository documentation.

Never combine first-pass content transfer and legacy deletion in one commit.

## Final Acceptance Checklist

- [ ] The July 20 plan's still-relevant tasks are implemented or explicitly superseded as recorded above.
- [ ] All 18 source files, 110 headings, 23 proofs, 11 screenshots, and 16 remote assets have closed records.
- [ ] Credential-shaped proof examples are retained and validated.
- [ ] Scenario Context, Mermaid, wide content, Terms, code groups, and API Reference meet light and dark readability requirements.
- [ ] Every changed desktop route is manually reviewed in both themes.
- [ ] The Community Developer journey is complete without legacy navigation.
- [ ] Community Admin, Player, and shared Brand ownership is canonical and non-duplicative.
- [ ] `/integrator-guide` is absent and intentionally returns 404.
- [ ] `quality:rc` passes from a clean install.
