# Discord Bot Operational Guide Implementation Plan

> **For agentic workers:** Use subagent-driven development task by task.

**Goal:** Replace linear Discord Bot reference page with walkthrough-first setup guide, concrete outcomes, renderable screenshot placements, feature routing, linked-role guidance, and support-safe troubleshooting.

**Architecture:** Keep integration setup and feature routing on `docs/community-admins/discord-bot.md`.
Link to detailed Role Assignments and Nickname Management pages.
Represent future visuals with rendered VitePress information containers.

**Tech stack:** VitePress Markdown, custom containers, Markdown tables, PNPM, ESLint, Playwright visual audit.

## Global Constraints

Use `docs/superpowers/specs/2026-07-15-discord-bot-operational-guide-design.md` as binding specification.
Use Citizen iD sibling implementation pinned at `330f1477ad58f0afee38be62652acc94707a2a38` as product evidence.
Keep every Markdown sentence on its own source line.
Keep outline headings to three or four words where practical.
Use exact product labels.
Describe **General** and **Moderation** as unavailable.
Describe **Roles** and **Nicknames** as available feature paths subject to portal permissions.
Use current five-minute portal cache statement.
Do not invent twenty-minute waits, resync completion promises, or unsupported bot capabilities.
Separate portal access, bot permissions, Discord hierarchy, and protected targets.
Separate Discord linked roles from bot-managed role assignments.
Create `::: info Screenshot placement` blocks only.
Do not add screenshots, generated illustrations, Mermaid, `ImageStepper`, or dependencies.

## Task 1: Rewrite Page

**Files:**

- Modify `docs/community-admins/discord-bot.md`.
- Read `docs/community-admins/role-assignments.md`.
- Read `docs/community-admins/nickname-management.md`.
- Read `docs/community-admins/AGENTS.md`.

- [ ] Replace current linear outline with approved concise heading structure.
- [ ] Remove Mermaid, `ImageStepper`, and prose-only visual markers.
- [ ] Open with operational outcome and point reader to first setup workflow.
- [ ] Write Asteria Rescue/Asteria Hub walkthrough from community settings through one-member feature test.
- [ ] Explain trusted add-app control, Discord authorization, **Official Community Server**, bot presence, permissions, hierarchy, **Bot Configuration**, selected server, feature tab, and test.
- [ ] Add feature-state table for **General**, **Roles**, **Nicknames**, and **Moderation**.
- [ ] Link **Roles** and **Nicknames** to existing detailed guides.
- [ ] Add permission ownership table.
- [ ] Explain current reader **Manage Roles** portal-access behavior separately from bot **Manage Roles** and **Manage Nicknames** execution permissions.
- [ ] Explain hierarchy and server-owner/equal-or-higher protection.
- [ ] Use five-minute portal cache boundary and distinguish it from resync timing.
- [ ] Add concrete `RSI Verified` linked-role guide using Discord **Server Settings** > **Roles** > **Links**.
- [ ] Explain that Discord owns requirements and member claim while Citizen iD supplies metadata.
- [ ] Add safe one-feature rollout and representative-member test.
- [ ] Add ordered troubleshooting and privacy-safe support evidence.
- [ ] Add four complete `::: info Screenshot placement` blocks: install, configuration, hierarchy, linked role.

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
rtk rg -n "^#{1,4} " docs/community-admins/discord-bot.md
rtk rg -n "Screenshot placement|Purpose:|Required contents:|Crop and focus:|Annotations:|Proposed caption:|Alt-text intent:" docs/community-admins/discord-bot.md
rtk rg -n "mermaid|ImageStepper|what should be on the screenshot|twenty minutes|about twenty" docs/community-admins/discord-bot.md
rtk rg -n "This feature is not yet available|five minutes|Manage Roles|Manage Nicknames|Linked Roles" docs/community-admins/discord-bot.md
```

Expected: concise outline, four complete placements, no stale visuals or twenty-minute language, exact feature and permission terms present.

- [ ] Run `rtk proxy corepack pnpm build`.
- [ ] Commit as `docs: add Discord bot setup walkthrough`.

## Task 2: Consumer Reviews

**Files:** Review and modify `docs/community-admins/discord-bot.md` only when required.

- [ ] Dispatch first-time community administrator reviewer.
- [ ] Ask reviewer to follow install, server selection, permission, hierarchy, supported-feature selection, and one-member test without prior Citizen iD knowledge.
- [ ] Ask reviewer to flag unstated prerequisites, ambiguous titles, unclear product labels, and unsafe assumptions.
- [ ] Dispatch support moderator reviewer in parallel.
- [ ] Ask reviewer to verify ownership boundaries, locked tabs, five-minute cache meaning, linked-role distinction, privacy-safe evidence, and bounded troubleshooting.
- [ ] Apply all correct Critical and Important findings.
- [ ] Record evidence for rejected findings.
- [ ] Rebuild.
- [ ] Commit review changes as `docs: refine Discord bot guidance` when needed.

## Task 3: Final Review

- [ ] Dispatch requirements reviewer against design spec and pinned implementation evidence.
- [ ] Dispatch documentation quality reviewer against final diff.
- [ ] Resolve all correct Critical and Important findings.
- [ ] Re-run source checks and build.
- [ ] Commit fixes as `docs: polish Discord bot guide` when needed.

## Task 4: Visual Audit

- [ ] Run `rtk proxy corepack pnpm lint`.
- [ ] Run `rtk proxy corepack pnpm build`.
- [ ] Run `rtk git diff --check`.
- [ ] Start local VitePress server on `127.0.0.1:5174` using bounded 30-second readiness poll.
- [ ] Run `rtk proxy corepack pnpm visual:audit`.
- [ ] Inspect Discord Bot page at desktop light, desktop dark, and mobile widths.
- [ ] Confirm no clipping, overlap, horizontal overflow, unreadable table, excessive outline wrapping, or broken container rendering.
- [ ] Apply documentation-only visual fixes if required.
- [ ] Re-run changed checks.
- [ ] Stop local server.

## Task 5: Completion Audit

- [ ] Compare final page line by line against design specification and Global Constraints.
- [ ] Confirm install path and official-server selection match pinned implementation.
- [ ] Confirm selected server and tab states match current **Bot Configuration** UI.
- [ ] Confirm current five-minute cache language.
- [ ] Confirm no unsupported twenty-minute guidance.
- [ ] Confirm linked roles are Discord-claimed, not bot-assigned.
- [ ] Confirm four placement blocks render.
- [ ] Confirm no visual assets, Mermaid, or `ImageStepper` remain.
- [ ] Confirm worktree clean and commits scoped.
