# Community Setup Operational Guide Implementation Plan

> **For agentic workers:** Use subagent-driven development task by task.

**Goal:** Replace conceptual Community Setup page with executable root-community creation, hierarchy, staff, change, removal, and troubleshooting guidance.

**Architecture:** Keep community-record operations on `docs/community-admins/community-setup.md`.
Link to Discord Bot for detailed bot permissions and feature setup.
Represent future visuals with rendered VitePress information containers.

**Tech stack:** VitePress Markdown, custom containers, Markdown tables, PNPM, ESLint, Playwright visual audit.

## Global Constraints

Use `docs/superpowers/specs/2026-07-15-community-setup-operational-guide-design.md` as binding specification.
Use sibling implementation pinned at `330f1477ad58f0afee38be62652acc94707a2a38` as product evidence.
Keep every Markdown sentence on own source line.
Keep outline headings to three or four words where practical.
Use exact current product labels.
Install Citizen iD bot before requiring Asteria Hub in mutual-server selector.
Use **Identifier** in procedures, not slug.
Separate root, child, owner, staff, system-managed relationship, and Discord ownership.
State current staff receive full administrative access.
State permanent deletion and child-cascade impact accurately.
Create `::: info Screenshot placement` blocks only.
Do not add screenshots, generated illustrations, Mermaid, `ImageStepper`, or dependencies.

## Task 1: Rewrite Page

**Files:**

- Modify `docs/community-admins/community-setup.md`.
- Read `docs/community-admins/discord-bot.md`.
- Read `docs/community-admins/AGENTS.md`.

- [ ] Replace current outline with approved concise structure.
- [ ] Remove Mermaid, `ImageStepper`, and prose-only visual markers.
- [ ] Open with operational outcome and exact first creation path.
- [ ] Add Asteria Rescue field-value table with expected results.
- [ ] Describe Community Portal selector > **Create new community** > **Manage Community**.
- [ ] Document required, optional, and system-managed fields plus current limits.
- [ ] Leave **Parent Community** empty for main root walkthrough.
- [ ] Treat **Official Relationship** as read-only system state for community admins.
- [ ] Install app through tooltip **Invite Citizen iD bot to your Discord server** before server selection.
- [ ] Add bounded five-minute mutual-server cache recovery without repeated refresh.
- [ ] Select Asteria Hub, use **Save changes**, and verify selector, **Management**, and read-only server field.
- [ ] Link to Discord Bot for permissions, hierarchy, and first feature test.
- [ ] Add root-versus-child mapping table and one-level hierarchy rules.
- [ ] Explain parent identifier changes rewrite direct child identifiers and Citizen iD role-name prefixes.
- [ ] Add exact staff add, verification, silent missing-account, access verification, and removal flows.
- [ ] Explain all current staff have same full administrative access.
- [ ] Add exact official-relationship lock behavior.
- [ ] Add safe Discord server remapping and server uniqueness.
- [ ] Add exact permanent community removal flow and child cascade.
- [ ] Add troubleshooting for server selection, validation, hierarchy, staff lookup, and support evidence.
- [ ] Add four complete placement blocks: form, hierarchy, staff, removal.

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
rtk rg -n "^#{1,4} " docs/community-admins/community-setup.md
rtk rg -n "Screenshot placement|Purpose:|Required contents:|Crop and focus:|Annotations:|Proposed caption:|Alt-text intent:" docs/community-admins/community-setup.md
rtk rg -n "mermaid|ImageStepper|what should be on the screenshot|Official Discord server" docs/community-admins/community-setup.md
rtk rg -n "Create new community|Manage Community|Identifier|Official Relationship|Official Community Server|Save changes|Add Staff Member|Add User|Remove community" docs/community-admins/community-setup.md
```

Expected: concise approved outline, four complete placements, no stale visuals or stale server label, exact creation/staff/removal labels present.

- [ ] Run `rtk proxy corepack pnpm build`.
- [ ] Commit as `docs: add community setup walkthrough`.

## Task 2: Consumer Reviews

- [ ] Dispatch first-time community owner reviewer.
- [ ] Ask reviewer to create root record without server-selection dead end, predict saved values, understand optional fields, and verify result.
- [ ] Dispatch support moderator reviewer in parallel.
- [ ] Ask reviewer to verify hierarchy, locks, uniqueness, staff access, silent lookup outcome, deletion impact, and private evidence.
- [ ] Apply all correct Critical and Important findings.
- [ ] Record evidence for rejected findings.
- [ ] Rebuild.
- [ ] Commit review changes as `docs: refine community setup guidance` when needed.

## Task 3: Final Review

- [ ] Dispatch requirements reviewer against design spec and pinned implementation.
- [ ] Dispatch documentation quality reviewer against final diff.
- [ ] Resolve all correct Critical and Important findings.
- [ ] Re-run source checks and build.
- [ ] Commit fixes as `docs: polish community setup guide` when needed.

## Task 4: Visual Audit

- [ ] Run `rtk proxy corepack pnpm lint`.
- [ ] Run `rtk proxy corepack pnpm build`.
- [ ] Run `rtk git diff --check`.
- [ ] Start local VitePress server on `127.0.0.1:5174` using bounded 30-second readiness poll.
- [ ] Run `rtk proxy corepack pnpm visual:audit`.
- [ ] Inspect Community Setup at desktop light, desktop dark, and mobile widths.
- [ ] Confirm no clipping, overlap, target-page overflow, unreadable table, excessive outline wrapping, or broken placement container.
- [ ] Apply documentation-only visual fixes if required.
- [ ] Re-run changed checks and stop local server.

## Task 5: Completion Audit

- [ ] Compare page line by line against design spec and Global Constraints.
- [ ] Confirm creation entry, labels, values, install-before-select order, and save verification.
- [ ] Confirm hierarchy rules and identifier effects.
- [ ] Confirm staff full-access and exact add/remove behavior.
- [ ] Confirm relationship locks only implementation-backed fields.
- [ ] Confirm permanent deletion and child cascade.
- [ ] Confirm four placement blocks render.
- [ ] Confirm no screenshot assets, Mermaid, or `ImageStepper` remain.
- [ ] Confirm worktree clean and commits scoped.
