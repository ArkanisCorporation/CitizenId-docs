# Branding Assets Operational Guide Implementation Plan

> **For agentic workers:** Use subagent-driven development task by task.

**Goal:** Replace the conceptual Branding Assets page with an executable icon workflow, matching guidance, manual review process, safe replacement, and troubleshooting.

**Architecture:** Keep community branding operations on `docs/community-admins/branding-assets.md`.
Represent future visuals with rendered VitePress information containers.

**Tech stack:** VitePress Markdown, custom containers, Markdown tables, PNPM, ESLint, Playwright visual audit.

## Global Constraints

Use `docs/superpowers/specs/2026-07-15-branding-assets-operational-guide-design.md` as binding specification.
Use sibling implementation pinned at `330f1477ad58f0afee38be62652acc94707a2a38` as product evidence.
Keep every Markdown sentence on own source line.
Keep outline headings to three or four words where practical.
Use exact current product labels.
Use a public, stable, versioned HTTPS URL without tokens or secrets.
Distinguish draft preview from approved public placement.
State that submission locks normal configuration and still requires a support ticket.
Treat rejected recovery as a new asset, not in-place editing.
Create `::: info Screenshot placement` blocks only.
Do not add screenshots, generated illustrations, Mermaid, `ImageStepper`, or dependencies.

## Task 1: Rewrite Page

**Files:**

- Modify `docs/community-admins/branding-assets.md`.
- Read `docs/community-admins/AGENTS.md`.

- [ ] Replace current outline with approved concise structure.
- [ ] Remove Mermaid, `ImageStepper`, and prose-only visual markers.
- [ ] Open with operational outcome and exact **Branding** entry path.
- [ ] Add Asteria Rescue icon values and expected results.
- [ ] Document rights, public HTTPS, image response, 2 MiB, SVG, stable hosting, and no-secret requirements.
- [ ] Describe **Add Branding Asset** > **Create Branding Asset** > **Icon from URL** > **Source URL** > **Finalize Options** > **Save changes**.
- [ ] Configure **Priority**, **Theme**, **Background**, and **Container**.
- [ ] Explain **Pending Submission**, read-only source URL, and immediate draft metadata saves.
- [ ] Explain asset preview and placement matrix without implying publication.
- [ ] Add **Submit for approval** > **Submit Asset for Approval** > **Request approval** flow.
- [ ] Explain normal configuration lock and mandatory official Discord support ticket.
- [ ] Add matching rules and highest-priority resolution.
- [ ] Add compact horizontal, vertical, light, and dark logo recipe.
- [ ] Add exact status table and rejected-new-asset recovery.
- [ ] Add safe approved replacement and permanent deletion guidance.
- [ ] Add current availability table for supported, disabled, and relationship-gated options.
- [ ] Add troubleshooting for source validation, rate limiting, preview mismatch, public visibility, and support evidence.
- [ ] Add four complete placement blocks: type, draft, preview, review.

Every placement block must use:

```markdown
::: info Screenshot placement
**Purpose:** ...

**Required contents:** ...

**Crop and focus:** ...

**Annotations:** ...

**Proposed caption:** ...

**Alt-text intent:** ...
:::
```

- [ ] Run source checks:

```powershell
rtk rg -n "^#{1,4} " docs/community-admins/branding-assets.md
rtk rg -n "Screenshot placement|Purpose:|Required contents:|Crop and focus:|Annotations:|Proposed caption:|Alt-text intent:" docs/community-admins/branding-assets.md
rtk rg -n "mermaid|ImageStepper|what should be on the screenshot|upload" docs/community-admins/branding-assets.md
rtk rg -n "Add Branding Asset|Create Branding Asset|Icon from URL|Source URL|Save changes|Pending Submission|Submit for approval|Request approval|Pending Approval|Approved|Rejected" docs/community-admins/branding-assets.md
```

Expected: concise approved outline, four complete placements, no stale visuals or upload workflow, and exact creation/review labels present.

- [ ] Run `rtk proxy corepack pnpm build`.
- [ ] Commit as `docs: add branding asset walkthrough`.

## Task 2: Consumer Reviews

- [ ] Dispatch first-time brand manager reviewer.
- [ ] Ask reviewer to create one icon, predict matching, distinguish preview from publication, and complete manual approval.
- [ ] Dispatch support moderator reviewer in parallel.
- [ ] Ask reviewer to verify rights, URL safety, availability, states, rejection recovery, deletion risk, and ticket evidence.
- [ ] Apply all correct Critical and Important findings.
- [ ] Record evidence for rejected findings.
- [ ] Rebuild.
- [ ] Commit review changes as `docs: refine branding asset guidance` when needed.

## Task 3: Final Review

- [ ] Dispatch requirements reviewer against design spec and pinned implementation.
- [ ] Dispatch documentation quality reviewer against final diff.
- [ ] Resolve all correct Critical and Important findings.
- [ ] Re-run source checks and build.
- [ ] Commit fixes as `docs: polish branding asset guide` when needed.

## Task 4: Visual Audit

- [ ] Run `rtk proxy corepack pnpm lint`.
- [ ] Run `rtk proxy corepack pnpm build`.
- [ ] Run `rtk git diff --check`.
- [ ] Start local VitePress server on `127.0.0.1:5174` using bounded 30-second readiness poll.
- [ ] Run `rtk proxy corepack pnpm visual:audit`.
- [ ] Inspect Branding Assets at desktop light, desktop dark, and mobile widths.
- [ ] Confirm no clipping, overlap, target-page overflow, unreadable table, excessive outline wrapping, or broken placement container.
- [ ] Apply documentation-only visual fixes if required.
- [ ] Re-run changed checks and stop local server.

## Task 5: Completion Audit

- [ ] Compare page line by line against design spec and Global Constraints.
- [ ] Confirm creation entry, exact labels, values, and save verification.
- [ ] Confirm public versioned URL and no-secret guidance.
- [ ] Confirm matching, preview, review lock, and manual ticket behavior.
- [ ] Confirm current availability and state ownership.
- [ ] Confirm rejected recovery and approved deletion safety.
- [ ] Confirm four placement blocks render.
- [ ] Confirm no screenshot assets, Mermaid, or `ImageStepper` remain.
- [ ] Confirm worktree clean and commits scoped.
