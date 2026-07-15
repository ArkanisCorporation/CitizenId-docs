# Nickname Management Operational Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the linear Nickname Management reference page with a walkthrough-first operational guide containing concrete templates, result examples, renderable screenshot placement blocks, rollout guidance, and troubleshooting.

**Architecture:** Keep all nickname guidance on the existing `docs/community-admins/nickname-management.md` page.
Organize the page around a first successful RSI-handle template, then add outcome interpretation, compact recipes, rollout, troubleshooting, and advanced formatting.
Represent future visuals as rendered VitePress information containers rather than adding screenshot assets or Mermaid diagrams.

**Tech Stack:** VitePress Markdown, VitePress custom containers, Markdown tables, PNPM, ESLint, Playwright visual-audit script.

## Global Constraints

Use `docs/superpowers/specs/2026-07-15-nickname-management-operational-guide-design.md` as the binding content specification.
Keep every Markdown sentence on its own source line.
Keep outline headings to three or four words where practical.
Use exact product labels including **Nicknames**, **Naming template**, **Username (Handle/IGN)**, **Example Discord user ID**, **Result parts**, **Final result**, **Re-sync on server**, **Re-sync User Nicknames**, **Re-sync**, **Text Embed Format Options**, and **Save changes**.
Explain that adding, removing, reordering, or formatting a field persists the template immediately.
Explain that server-wide resync is separate and that new joins or later refresh events can use the stored template before resync.
Separate Citizen iD template composition from Discord execution.
Do not promise a nickname audit entry because the current admin interface has no equivalent to the Role Assignments audit log.
Treat administrator **Manage Roles** as the portal-access requirement unless an internal override exists, separate from bot **Manage Nicknames** and hierarchy for live execution.
State that nickname resolution does not consult public-discovery or privacy settings and may disclose configured RSI or organization fields in public Discord nicknames.
Document global Discord display name then username composition fallback, unlinked preview errors, and the live limitation that may preserve an existing custom server nickname.
Document that **Content Casing** is currently ineffective, normalization lowercases and works, and field order is left to right with visual wrapping on narrow screens.
Document null-field formatting omission, empty-string formatting emission, re-sync requests for human server members, skipped bots and webhooks, possible failure before every human is reached, and the lack of a completion signal.
Create renderable `::: info Screenshot placement` blocks instead of adding screenshot, illustration, or Mermaid assets.
Every placement block must include purpose, required contents, crop and focus, annotations, proposed caption, and alt-text intent.
Do not add dependencies or modify application code.

---

### Task 1: Rewrite The Page

**Files:**

- Modify: `docs/community-admins/nickname-management.md`
- Modify: `docs/players/discord-integrations.md`
- Read: `docs/superpowers/specs/2026-07-15-nickname-management-operational-guide-design.md`
- Read: `docs/community-admins/AGENTS.md`

**Interfaces:**

- Consumes: The existing community-admin navigation entry and VitePress Markdown conventions.
- Produces: A self-contained operational Nickname Management page at the existing URL.
- Produces: Consistent player-facing nickname commands, visibility boundaries, fallback behavior, and preference precedence.

- [ ] **Step 1: Replace the linear outline**

Use the exact H2 and H3 structure from the design specification.
Open with the operational outcome and direct the reader to **Before You Start** rather than opening with a diagram.
Remove the current Mermaid diagram and prose-only screenshot notes.
Preserve implementation-backed facts from the current page only when they fit the operational workflow or advanced reference.

- [ ] **Step 2: Write the first walkthrough**

Configure Asteria Rescue to use verified RSI handles on Asteria Hub.
Use **Username (Handle/IGN)** under **RSI Account** and Alex's `AlexRsi` result.
Describe the exact path through **Nicknames**, **Naming template**, **Example Discord user ID**, **Result parts**, and **Final result**.
Warn before the first edit that field additions and formatting changes save immediately.
Require recording existing fields, left-to-right order, and all formatting because there is no undo or export and rollback is manual.
Remove existing fields, add only **Username (Handle/IGN)**, leave prefix and suffix blank, use **Original** casing, and turn normalization off.
Explain how to copy a Discord user ID through desktop Developer Mode and link the official Discord ID article.
Explain that selecting **Re-sync on server** is a separate server-wide action.
Confirm the `Asteria Hub` scope in **Re-sync User Nicknames** before selecting **Re-sync**.
Before re-sync, record UTC start and set a local observation deadline such as 15 minutes that is explicitly not an SLA.
Inspect the same representative members until the deadline, avoid another re-sync while changes appear, then troubleshoot or escalate with evidence.

- [ ] **Step 3: Add concrete outcomes**

Add the result matrix from the design specification.
Cover a linked verified handle, missing usable RSI data, no linked account, truncation, missing Discord permission or hierarchy, and server-owner protection.
Explain that composition uses global Discord display name when present, otherwise username, when no account is linked, no fields exist, or all selected values are null.
State that unlinked IDs error in preview and live sync may leave an existing custom server nickname unchanged instead of resetting it to fallback.
State that generated nicknames are limited to 32 characters.

- [ ] **Step 4: Add compact recipes**

Add **RSI Handle**, **Preferred Name**, **Name And Handle**, and **Org And Handle** recipes.
For each recipe include the goal, exact field order and formatting, representative result, missing-data behavior, policy caveat, and verification step.
Use **Preferred Display Name (Guild/Account)** for player-controlled naming.
Use **Spectrum ID** with prefix `[` and suffix `] ` before **Username (Handle/IGN)** for `[ASTRA] AlexRsi`.
Correct the unset command to `/account unset-display-name server-display-name:true`.

- [ ] **Step 5: Add placement blocks**

Add one rendered `::: info Screenshot placement` block for the configured template and Alex preview.
Require a dedicated demo Discord account or redact its ID before publishing the template screenshot.
Add one rendered block for **Text Embed Format Options** configured for the Spectrum ID field.
Annotate that **Content Casing** is ineffective and normalization lowercases content.
Add one rendered block for **Re-sync User Nicknames** naming Asteria Hub.
Use all six required labels in every block.

- [ ] **Step 6: Add rollout guidance**

Recommend a quiet production support window.
Preview one known-good linked member and one dedicated linked demo member without a verified RSI profile before resync.
Expect empty **Result parts** and global Discord display name, else username, in **Final result** for the fallback demo.
Do not use an unlinked ID for fallback preview because it errors.
Notify members about enforced naming and player-controlled fields.
Notify members that selected RSI or organization data may become public Discord nickname content regardless of privacy settings.
Explain that the server-wide operation requests processing for human server members, skips bots and webhooks, may stop before every human is reached, has no completion signal, and requires a bounded observation deadline rather than repeated resync.
Never promise that all human members are processed.

- [ ] **Step 7: Add troubleshooting**

Cover invalid or unlinked example user IDs, null and empty-string fields, unexpected fallback retention, wrong left-to-right field order, ineffective casing, working normalization, truncation, portal **Manage Roles**, bot **Manage Nicknames**, role hierarchy, owner protection, and delayed resync.
Collect the community slug, Discord server, affected member, selected fields and formatting, preview result, expected and actual nicknames, UTC time, resync attempt, permission state, and hierarchy state.
Route private account or RSI evidence through private support paths.

- [ ] **Step 8: Check source structure**

Run:

```powershell
rtk rg -n "^#{1,4} " docs/community-admins/nickname-management.md
rtk rg -n "Screenshot placement|Purpose:|Required contents:|Crop and focus:|Annotations:|Proposed caption:|Alt-text intent:" docs/community-admins/nickname-management.md
rtk rg -n "mermaid|what should be on the screenshot" docs/community-admins/nickname-management.md
rtk rg -n "/account unset-display-name" docs/community-admins/nickname-management.md docs/players/discord-integrations.md
rtk rg -n "unset-display-name server-display-name:<YOUR_DISPLAY_NAME>|privacy settings disallow.*template|<REDACTED>.*nickname|nickname.*<REDACTED>" docs/community-admins/nickname-management.md docs/players/discord-integrations.md
```

Expected: The approved concise outline is present, three complete placement blocks are reported, and the stale visual markers are absent.
Expected: Every unset command is `/account unset-display-name server-display-name:true`, and the stale unset, nickname-privacy, and nickname-`<REDACTED>` patterns are absent.
Compare both pages directly and confirm they use the same **Preferred Display Name (Guild/Account)** precedence, public nickname visibility boundary, null-field omission, all-null fallback, and custom-server-nickname limitation.

- [ ] **Step 9: Build the page**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 10: Commit the draft**

Run:

```powershell
rtk git add docs/community-admins/nickname-management.md docs/players/discord-integrations.md
rtk git commit -m "docs: add nickname management walkthrough"
```

### Task 2: Consumer Review Passes

**Files:**

- Review: `docs/community-admins/nickname-management.md`
- Modify if required: `docs/community-admins/nickname-management.md`

**Interfaces:**

- Consumes: The complete walkthrough-first draft from Task 1.
- Produces: A comprehensible and support-safe revision with approved review findings resolved.

- [ ] **Step 1: Run newcomer review**

Dispatch a first-time community administrator reviewer.
Ask whether they can identify separate portal and bot prerequisites, capture and restore an existing template, configure the first template, copy an ID, preview linked success and fallback members, predict fallback retention and truncation, and run a bounded server-wide resync safely.
Ask them to flag ambiguous headings, unexplained product terms, and steps requiring unstated knowledge.

- [ ] **Step 2: Run support review**

Dispatch a support moderator reviewer in parallel with the newcomer review.
Ask them to verify public nickname disclosure, privacy-safe evidence guidance, null versus empty-string formatting, unlinked preview errors, fallback retention, separate access and execution permissions, resync scope and deadline, and the absence of a completion signal or admin-visible audit trail.

- [ ] **Step 3: Apply review findings**

Use one fix subagent to apply all actionable Critical and Important findings from both reviewers.
Keep the operational-first structure, exact product labels, and short-heading constraint intact.
Record any rejected finding with implementation evidence that makes it incorrect.

- [ ] **Step 4: Rebuild the revision**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 5: Commit review fixes**

If the review changed the page, run:

```powershell
rtk git add docs/community-admins/nickname-management.md
rtk git commit -m "docs: refine nickname management guidance"
```

### Task 3: Visual And Final Verification

**Files:**

- Review: `docs/community-admins/nickname-management.md`
- Review: generated images under the operating system temporary directory `citizenid-docs-visual-audit`.
- Modify if required: `docs/community-admins/nickname-management.md`

**Interfaces:**

- Consumes: The reviewed page from Task 2 and the existing VitePress visual-audit runner.
- Produces: A clean rendered page verified at desktop, desktop dark, and mobile viewports.

- [ ] **Step 1: Run static verification**

Run:

```powershell
rtk proxy corepack pnpm lint
rtk proxy corepack pnpm build
rtk git diff --check
```

Expected: ESLint and VitePress exit with code 0, and Git reports no whitespace errors.

- [ ] **Step 2: Start a bounded local server**

Start the existing VitePress development command on `127.0.0.1:5174` in a hidden background process.
Poll `http://127.0.0.1:5174/community-admins/nickname-management` for no more than 30 seconds.
Stop and diagnose instead of extending the wait if the page does not become available.

- [ ] **Step 3: Run visual audit**

Run:

```powershell
rtk proxy corepack pnpm visual:audit
```

Expected: The JSON result reports no horizontal-overflow offenders for the Nickname Management page and writes `desktop-nickname-management.png`, `desktop-dark-nickname-management.png`, and `mobile-nickname-management.png` under the temporary audit directory.

- [ ] **Step 4: Inspect renderings**

Inspect all three Nickname Management audit images.
Confirm that the outline and headings scan without excessive wrapping, tables remain readable, rendered placement blocks look intentional, dark-mode contrast is sufficient, and no content overlaps or clips.
Apply only documentation changes needed to resolve observed issues.

- [ ] **Step 5: Re-run changed checks**

If visual fixes were required, re-run `rtk proxy corepack pnpm lint`, `rtk proxy corepack pnpm build`, and `rtk proxy corepack pnpm visual:audit` before continuing.
Stop the local server after the final audit.

- [ ] **Step 6: Final requirements audit**

Compare the final admin and player pages line by line with the Global Constraints and design specification.
Confirm that all required templates, outcomes, placement blocks, ownership boundaries, and review passes are present.
Confirm that immediate persistence, manual backup, no undo or export, and manual restoration are explained before the first configuration action and that **Re-sync** happens only after representative previews.
Confirm that the unset command uses a Boolean value, null and empty-string fields are distinct, unlinked preview IDs error, fallback may retain a custom nickname, and no completion signal or admin-visible audit log is promised.
Confirm that both pages agree on preferred-name precedence, public nickname visibility, privacy-setting independence, null-field omission, all-null fallback, and live custom-nickname retention.
Confirm that no screenshot, generated illustration, or Mermaid asset was added.

- [ ] **Step 7: Commit visual fixes**

If the visual audit changed the page, run:

```powershell
rtk git add docs/community-admins/nickname-management.md
rtk git commit -m "docs: polish nickname management guide"
```
