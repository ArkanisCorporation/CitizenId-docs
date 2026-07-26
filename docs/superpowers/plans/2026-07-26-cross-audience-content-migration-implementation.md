# Cross-Audience Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transfer the legacy Discord and brand material to its canonical Community Admin, Player, and shared Reference homes, with complete heading traceability and reviewed screenshot and asset dispositions.

**Architecture:** Reuse the immutable Integrator Guide baseline and manifest from the developer-content plan, assign each cross-audience heading to a substantive canonical owner, and keep Community Developer pages as purposeful handoffs rather than duplicate manuals.
Screenshots and brand assets receive independent hash-backed records so content closure cannot hide unresolved visual evidence.

**Tech Stack:** VitePress Markdown, existing ImageFigure and ImageStepper components, TypeScript migration validators, Playwright visual audit, Sharp image metadata.

## Global Constraints

- Complete developer-content Task 1 before this plan so the immutable 18-file baseline exists.
- Keep `docs/integrator-guide/**` and its image references unchanged until the closure plan removes them.
- Account for exactly 48 cross-audience source headings, 11 legacy Discord screenshot references, 16 unique remote brand assets, and 8 rendered sign-in-button examples.
- Use `substantive` destinations for full task ownership and `canonical-handoff` destinations only for navigation with stated purpose and outcome.
- Record corrections with rationale, current evidence, reviewer, and approval.
- Do not download or redistribute a remote brand asset until ownership or licensing evidence is recorded.
- Do not delete a legacy image merely because a replacement exists.
The asset audit must first prove it has no surviving consumer.
- Write every Markdown sentence on its own source line.

## Shared Manifest Extensions

**Files:**

- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/migration/manifest.ts`
- Modify: `scripts/migration/manifest.test.ts`
- Create: `scripts/migration/cross-audience.test.ts`
- Modify: `package.json`

Consume `DestinationRef` and `MigrationOwner` from the shared manifest contract in the developer-content plan.
Add only the visual disposition types here:

```ts
export type ScreenshotDisposition = 'keep' | 'reuse' | 'replace' | 'retire'
export type BrandAssetDisposition = 'keep' | 'replace' | 'localize' | 'retire'
```

Screenshot records must include source path and hash, destination anchor, replacement path, capture environment, privacy review, visual review, and orphan-candidate state.
Brand records must include source URL and hash, MIME type, dimensions, ownership or licensing evidence, local and public paths, destination heading, consumers, and verification state.

Closure is derived only when destinations exist, corrections have evidence, and all required reviews and verification statuses are approved.

## Task 1: Capture The Cross-Audience Manifest Slice

**Files:**

- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/migration/manifest.ts`
- Modify: `scripts/migration/manifest.test.ts`
- Create: `scripts/migration/cross-audience.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Write failing cross-audience inventory tests**

Assert 48 unique heading records:

- 1 Integrator Guide index heading;
- 14 Discord headings;
- 33 brand headings.

Also assert 11 screenshot records, 16 remote-asset records, and 8 rendered-button records.

- [ ] **Step 2: Prove the slice is unresolved**

Run:

```powershell
rtk pnpm exec tsx --test scripts/migration/manifest.test.ts scripts/migration/cross-audience.test.ts
```

Expected: failure naming missing cross-audience records or destinations.

- [ ] **Step 3: Populate source records without claiming completion**

Assign stable IDs and preliminary owners.
Record source hashes and references from `baseline.json` rather than re-parsing mutable prose.
Leave destination verification and review pending.

- [ ] **Step 4: Verify and commit the inventory slice**

```powershell
rtk pnpm migration:verify -- --phase migration --scope cross-audience
rtk git add migration/integrator-guide scripts/migration package.json
rtk git commit -m "test(docs): capture cross-audience migration baseline"
```

## Task 2: Complete Canonical Community Admin Discord Guidance

**Files:**

- Modify: `docs/community-admins/discord-bot.md`
- Modify: `docs/community-admins/role-assignments.md`
- Modify: `docs/community-admins/nickname-management.md`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing destination-anchor checks**

Require these substantive mappings:

| Legacy outcome | Canonical destination |
| --- | --- |
| Invite the Citizen iD bot | `discord-bot.md#install-citizen-id` |
| Place the bot role | `discord-bot.md#check-role-hierarchy` |
| Configure linked roles | `discord-bot.md#configure-linked-roles` |
| Add the provider | `discord-bot.md#add-citizen-id` |
| Set linked-role conditions | `discord-bot.md#set-requirements` |
| Inform members | `discord-bot.md#publish-instructions` plus Player claim guidance |
| Role-management features | `role-assignments.md#common-policies` |
| Manual role refresh | `role-assignments.md#request-manual-update` |
| Role prerequisites | `role-assignments.md#required-setup` |
| Nickname features | `nickname-management.md#common-templates` and `#enforcement-behavior` |
| Nickname prerequisites | `nickname-management.md#required-setup` |

- [ ] **Step 2: Correct obsolete setup instructions with evidence**

Record the fixed invite link as corrected because installation now begins through the verified Community Settings portal control.
Record the generic `/roles update` example as corrected to the current scoped command, permission boundary, and visible acknowledgement.
Fix the existing Role Assignments link from `#linked-role-setup` to `#configure-linked-roles`.

- [ ] **Step 3: Preserve and expand operational outcomes**

Retain each page's scenario packs.
Ensure every setup step includes prerequisite, action, visible result, saved state, member effect, safe retry point, and support evidence where applicable.
Mark all three Community Admin routes changed and assign their final audit layouts and readiness selectors.

- [ ] **Step 4: Verify and commit Discord administration**

```powershell
rtk pnpm migration:verify -- --scope cross-audience --owner community-admins --phase content
rtk pnpm lint
rtk pnpm build
rtk pnpm visual:fragment-navigation
rtk git diff --check
rtk git add docs/community-admins migration/integrator-guide/manifest.json scripts/audit-routes.mjs
rtk git commit -m "docs: complete canonical Discord administration guidance"
```

## Task 3: Resolve The Eleven Legacy Discord Screenshot References

**Files:**

- Create when disposition is `replace`: `docs/public/images/discord/community-admins/bot-install-entry.png`
- Create when disposition is `replace`: `docs/public/images/discord/community-admins/bot-install-server.png`
- Create when disposition is `replace`: `docs/public/images/discord/community-admins/bot-role-hierarchy.png`
- Create when disposition is `replace`: `docs/public/images/discord/community-admins/linked-role-links-tab.png`
- Create when disposition is `replace`: `docs/public/images/discord/community-admins/linked-role-provider.png`
- Create when disposition is `replace`: `docs/public/images/discord/community-admins/linked-role-requirements.png`
- Create when disposition is `replace`: `docs/public/images/discord/players/linked-role-menu.png`
- Create when disposition is `replace`: `docs/public/images/discord/players/linked-role-selection.png`
- Create when disposition is `replace`: `docs/public/images/discord/players/linked-role-authorization.png`
- Create when disposition is `replace`: `docs/public/images/discord/players/linked-role-redirect.png`
- Create when disposition is `replace`: `docs/public/images/discord/players/linked-role-claim.png`
- Create: `scripts/validate-discord-screenshots.mjs`
- Modify: `docs/community-admins/discord-bot.md`
- Modify: `docs/players/discord-integrations.md`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `package.json`

- [ ] **Step 1: Review all eleven references and assign pending dispositions**

The planning review found likely obsolete Discord UI, real or non-Asteria identities, incorrect `CitizenID` naming, or mixed environments in the legacy set.
Inspect each source file and record concrete evidence before choosing keep, reuse, replace, or retire.
Do not promote the preliminary assessment to an approved `replace` decision without that record-level review.

- [ ] **Step 2: Capture a consistent Asteria Hub flow**

For every `replace` record, use an authenticated, user-authorized current Discord session and a safe demo server, one verified environment, `RSI Verified` as the linked-role example, and the exact `Citizen iD` name.
Redact account identities, server identifiers, unrelated servers, and unrelated roles.
Record capture date, product surface, environment, source hash, replacement hash, dimensions, privacy review, and visual review.
Never automate or log Discord credentials.
If an authorized current session or safe demo server is unavailable, mark the record blocked and stop this phase instead of fabricating or image-generating a product screenshot.
Use `scripts/validate-discord-screenshots.mjs` to enforce the expected path, dimensions, hashes, environment consistency, and privacy-review metadata after capture.
Add `"screenshots:discord:verify": "node scripts/validate-discord-screenshots.mjs"` to `package.json`.

- [ ] **Step 3: Wire every approved keep, reuse, replacement, or retirement decision**

Keep each screenshot adjacent to the action and visible result it proves.
Record measured intrinsic dimensions in the manifest so Platform Task 9 can make them required at every surviving call site after destinations stabilize.
Do not overwrite or delete old files in this task; mark them as orphan candidates.

- [ ] **Step 4: Verify image and content behavior**

```powershell
rtk pnpm migration:verify -- --phase content --scope cross-audience --asset-kind screenshots
rtk pnpm screenshots:discord:verify
rtk pnpm visual:image-stepper
rtk pnpm visual:audit
rtk git diff --check
```

- [ ] **Step 5: Commit reviewed screenshot evidence**

```powershell
rtk git add docs/community-admins/discord-bot.md docs/players/discord-integrations.md migration/integrator-guide/manifest.json scripts/validate-discord-screenshots.mjs package.json
rtk git commit -m "docs: resolve Discord walkthrough images"
```

If any disposition created a replacement, inspect `rtk git status --short` and add each exact reviewed image path individually before committing.

## Task 4: Complete The Player Linked-Role Journey

**Files:**

- Modify: `docs/players/discord-integrations.md`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing member-outcome checks**

Require Open Linked Roles, select the configured role, authorize Citizen iD, verify the destination before leaving Discord, return, claim or refresh, visible failure and recovery, and member-side removal.

- [ ] **Step 2: Replace the older-flow placeholder**

Use one current sequence and the approved image dispositions from Task 3.
Map legacy Inform Your Users to both the Admin publication outcome and the Player claim outcome.
Keep player-facing display-name commands under `#account-commands` as supplemental nickname coverage.
Mark the Player Discord route changed and assign its final ImageStepper and readiness state.

- [ ] **Step 3: Verify and commit**

```powershell
rtk pnpm migration:verify -- --scope cross-audience --owner players --phase content
rtk pnpm visual:image-stepper
rtk pnpm lint
rtk pnpm build
rtk git diff --check
rtk git add docs/players/discord-integrations.md migration/integrator-guide/manifest.json scripts/audit-routes.mjs
rtk git commit -m "docs: complete player linked-role journey"
```

## Task 5: Replace The Brand Stub With The Complete Policy

**Files:**

- Modify: `docs/reference/index.md`
- Modify: `docs/reference/brand-guidelines.md`
- Modify: `docs/community-admins/branding-assets.md`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing coverage for all 33 brand headings**

Require a destination anchor or evidence-backed correction for every source heading.
Require independent records for all eight button examples because their approval meaning is substantive even when assets repeat.

- [ ] **Step 2: Author the task-first policy**

Use this order:

1. Choose An Environment.
2. Choose A Placement.
3. Build Sign-In UI.
4. Describe Citizen iD.
5. Request Approval.
6. Canonical asset and rule tables.
7. Publication Checklist.

Retain naming, production and unstable variants, clear space, minimum size, contrast, prohibited changes, sign-in labels and colors, co-branding, status language, affiliation, press, legal terms, and implementation checks.
Replace the temporary migration note in the Reference index with a stable description of the now-canonical brand policy.

- [ ] **Step 3: Separate brand policy from portal operations**

Keep `community-admins/branding-assets.md` as the canonical operational workflow for creating, previewing, submitting, replacing, and removing community-owned branding assets.
Move or replace duplicated normative Citizen iD identity rules with a purposeful link to Brand Guidelines that states why the admin is leaving and what decision the reference page supports.
Add the reciprocal handoff from Brand Guidelines to the Admin workflow for readers who need to configure a community asset after choosing an approved treatment.
Retain Admin-only review states, metadata matching, privacy, support, and replacement-safety guidance in the Admin page.
Mark Reference index, Brand Guidelines, and Admin Branding Assets changed with their final audit layouts and readiness selectors.

- [ ] **Step 4: Preserve explicit semantic status for eight button examples**

Use stable IDs for approved dark and light icon and logo surfaces, cautionary orange background use, and the four not-approved transparent or colored treatments.
Render approval status with VitePress Badge and explanatory text, not color alone.

- [ ] **Step 5: Verify content completeness**

```powershell
rtk pnpm migration:verify -- --scope cross-audience --owner reference --phase content
rtk pnpm lint
rtk pnpm build
rtk pnpm visual:audit
rtk git diff --check
```

- [ ] **Step 6: Commit the complete policy before asset resolution**

```powershell
rtk git add docs/reference/index.md docs/reference/brand-guidelines.md docs/community-admins/branding-assets.md migration/integrator-guide/manifest.json scripts/audit-routes.mjs
rtk git commit -m "docs: complete Citizen iD brand reference"
```

## Task 6: Resolve And Prefer Local Copies For Sixteen Brand Assets

**Files:**

- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-logo-dark.png`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-logo-light.png`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-icon-dark.png`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-icon-light.png`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-bg-icon.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-discord-icon.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-social-card.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/production/citizenid-discord-banner.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-logo-dark.png`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-logo-light.png`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-icon-dark.png`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-icon-light.png`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-bg-icon.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-discord-icon.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-social-card.jpg`
- Create when disposition is `localize`: `docs/public/images/brand/unstable/citizenid-discord-banner.jpg`
- Modify: `docs/reference/brand-guidelines.md`
- Modify: `migration/integrator-guide/manifest.json`

- [ ] **Step 1: Record authority before retrieval**

For each URL, record ownership or license evidence, approved environment, expected MIME type, and destination.
Choose keep, replace, localize, or retire per record.
Prefer `localize` when authority permits, but if authority cannot be established, do not copy the bytes and record an evidence-backed keep, replace, or blocked decision.

- [ ] **Step 2: Retrieve without transforming source bytes**

Use a bounded HTTPS client that validates the expected host, content type, and non-empty dimensions.
Save the source bytes locally and record the remote and local SHA-256.
The two hashes must match for the initial localization.

- [ ] **Step 3: Keep remote downloads as reference, local files as rendered media**

The canonical asset table may retain official remote URLs for user download.
Every rendered `<img>` and sign-in-button example must use the reviewed local path.
Record its measured dimensions now; the shared image delivery task enforces the final component props after all destinations exist.

- [ ] **Step 4: Verify and commit asset resolution**

```powershell
rtk pnpm migration:verify -- --phase content --scope cross-audience --asset-kind brand-assets
rtk pnpm build
rtk pnpm visual:audit
rtk git diff --check
rtk git add docs/reference/brand-guidelines.md migration/integrator-guide/manifest.json
rtk git commit -m "docs: resolve Citizen iD brand assets"
```

If any disposition created a localized copy, inspect `rtk git status --short` and add each exact reviewed asset path individually before committing.

## Task 7: Add Developer Handoffs And Close Cross-Audience Review

**Files:**

- Modify: `docs/community-developers/index.md`
- Modify: `docs/community-developers/sign-in-members.md`
- Modify: `docs/community-developers/go-to-production.md`
- Modify: `docs/community-developers/troubleshoot.md`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add purposeful destination links**

Link Admin Duties to Community Setup, Discord Bot, Role Assignments, and Nickname Management.
Link member-visible behavior to Player Discord Integrations.
Link sign-in and production launch to Brand Guidelines.
State why each reader is leaving and the outcome at the destination.

- [ ] **Step 2: Verify Brand Guidelines navigation ownership**

Verify Developer Task 12 already links the shared route without creating a duplicate Community Developer page.
Represent the legacy root navigation row as `navigation-only` with multiple canonical handoffs.
Update the four changed Developer route records with `admin-handoff` where the final content renders a cross-audience handoff.

- [ ] **Step 3: Run four-owner review**

Require approved Community Developer, Community Admin, Player, and Reference review records.
Resolve all Critical and Important findings.

- [ ] **Step 4: Verify complete cross-audience closure**

Run:

```powershell
rtk pnpm exec tsx --test scripts/migration/manifest.test.ts scripts/migration/cross-audience.test.ts
rtk pnpm migration:verify -- --phase content --scope cross-audience --require-complete
rtk pnpm lint
rtk pnpm build
rtk pnpm visual:image-stepper
rtk pnpm visual:fragment-navigation
rtk pnpm visual:audit
rtk git diff --check
```

Expected: 48 heading rows, 11 reviewed screenshot dispositions, 16 reviewed brand-asset dispositions, 8 reviewed button examples, and all handoffs verified.
Every `replace` screenshot must have a reviewed current capture, and every `localize` asset must have a hash-matched local copy.
Legacy Markdown and legacy image files must still exist at this point.

- [ ] **Step 5: Commit reviewed closure evidence**

```powershell
rtk git add docs/community-developers migration/integrator-guide scripts/audit-routes.mjs
rtk git commit -m "docs: complete cross-audience migration handoffs"
```

## Plan Completion Gate

- [ ] Confirm the canonical Community Admin pages own setup, role, and nickname operations.
- [ ] Confirm the Player page owns member authorization, claim, refresh, failure, and removal behavior.
- [ ] Confirm the Reference brand page contains all 33 source-heading outcomes and correctly renders every asset whose approved disposition requires rendering.
- [ ] Confirm every screenshot, asset, and button example has a reviewed disposition.
- [ ] Confirm developer pages contain only purposeful cross-audience handoffs, not duplicate manuals.
- [ ] Confirm no legacy file or possibly shared image was deleted in this workstream.
