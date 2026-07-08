# Community Admin Documentation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the community admin guide so it matches the player guide's structure, narrative depth, and visual clarity while staying accurate to the Citizen iD implementation.

**Architecture:** Keep the existing community-admin module and page list, but reshape each page around practical admin journeys, ownership boundaries, and support evidence.
Use early diagrams or screenshot placeholders in the same style as the player guide.
Migrate only still-current legacy Discord material and replace "legacy content" exits with integrated guidance.

**Tech Stack:** VitePress Markdown, existing Vue documentation components, Mermaid diagrams, existing Playwright visual-audit script.

---

### Task 1: Evidence And Narrative Map

**Files:**
- Read: `docs/players/index.md`
- Read: `docs/players/discord-integrations.md`
- Read: `docs/players/getting-help.md`
- Read: `docs/community-admins/*.md`
- Read: `docs/integrator-guide/discord/*.md`
- Read: `D:\Git\github\ArkanisCorporation\CitizenId\src\CitizenId.Host.Web\Components\Pages\CommunityBot.razor`
- Read: `D:\Git\github\ArkanisCorporation\CitizenId\src\CitizenId.Host.Web\Components\DiscordBotConfigurationTabs.razor`
- Read: `D:\Git\github\ArkanisCorporation\CitizenId\src\CitizenId.Domain\Models\Entities\RoleAssignmentTemplate.cs`
- Read: `D:\Git\github\ArkanisCorporation\CitizenId\src\CitizenId.Domain\Models\Entities\CitizenCommunity.cs`

- [x] **Step 1: Capture the player guide pattern**

Record that the player guide opens with a connected-experiences overview, a journey map, start-here list, core concepts, common journeys, boundaries, and manual-depth expectations.

- [x] **Step 2: Capture admin page gaps**

Record that the current community admin pages are mostly stubs, have few diagrams, rely on "Related Legacy Content" sections, and do not yet explain ownership and support boundaries in the same layered way.

- [x] **Step 3: Capture implementation-backed facts**

Use the implementation checkout and explorer-agent findings to confirm community details, Discord bot tabs, role-assignment templates, nickname management permissions, branding asset lifecycle, maintenance windows, and audit evidence.

### Task 2: Rewrite The Admin Index

**Files:**
- Modify: `docs/community-admins/index.md`

- [x] **Step 1: Mirror the player index shape**

Rewrite the intro around connected admin responsibilities: community setup, Discord bot operations, role automation, nickname management, branding assets, and maintenance/support.

- [x] **Step 2: Add a clickable Mermaid journey map**

Add a diagram that routes from community setup to Discord bot, role assignments, nickname management, branding, and support.
Mark screenshot or diagram review needs using the exact phrase `what should be on the screenshot/diagram`.

- [x] **Step 3: Add start-here, core concepts, common journeys, and boundaries**

Explain what admins control, what Citizen iD applies, and what Discord can still block.

### Task 3: Expand Setup And Bot Pages

**Files:**
- Modify: `docs/community-admins/community-setup.md`
- Modify: `docs/community-admins/discord-bot.md`

- [x] **Step 1: Rework community setup**

Explain community records, slugs, parent communities, staff access, Discord server mapping, and delete/change caution in plain admin-facing language.

- [x] **Step 2: Rework Discord bot**

Integrate old bot installation, role hierarchy, linked-role setup, configuration tabs, sync delay, and manual support notes.

- [x] **Step 3: Mark illustration placements**

Keep existing screenshot placeholders where useful and add explicit `what should be on the screenshot/diagram` review text for missing or future visuals.

### Task 4: Expand Automation Pages

**Files:**
- Modify: `docs/community-admins/role-assignments.md`
- Modify: `docs/community-admins/nickname-management.md`

- [x] **Step 1: Rework role assignments**

Explain templates, conditions, targets, preview, audit logs, resync, and safe rollout in admin language.

- [x] **Step 2: Rework nickname management**

Explain template fields, member display-name preferences, Discord nickname limits, permissions, role hierarchy, unavailable fields, and resync.

- [x] **Step 3: Add diagrams**

Use Mermaid diagrams for the role-assignment decision path and nickname application path.
Mark proposed illustration placements with `what should be on the screenshot/diagram`.

### Task 5: Expand Operations Pages

**Files:**
- Modify: `docs/community-admins/branding-assets.md`
- Modify: `docs/community-admins/maintenance-and-support.md`

- [x] **Step 1: Rework branding assets**

Explain ownership, asset states, review outcomes, preview matrix use, and brand-boundary cautions.

- [x] **Step 2: Rework maintenance and support**

Explain maintenance ownership, platform-locked rows, role-audit evidence, nickname evidence, safe screenshots, and escalation boundaries.

- [x] **Step 3: Link shared references**

Keep references to support evidence and brand guidance where deeper shared material already exists.

### Task 6: Visual Audit And Review Passes

**Files:**
- Modify if needed: `scripts/visual-audit.mjs`
- Review: generated screenshots under the visual audit output directory

- [x] **Step 1: Update visual audit coverage**

Include the community admin pages alongside player pages so the audit can compare modules directly.

- [x] **Step 2: Run lint and build**

Run `pnpm lint` and `pnpm build` after installing dependencies if needed.

- [x] **Step 3: Run visual audit**

Start a bounded VitePress server, run `pnpm visual:audit`, and inspect generated desktop, dark, and mobile screenshots for player and community-admin pages.

- [x] **Step 4: Run consumer-like review subagents**

Dispatch target-reader review passes after the first draft: one community admin reader and one general consumer reader.
Integrate actionable findings that improve clarity without adding implementation jargon.
