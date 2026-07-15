# Maintenance And Support Operational Guide Implementation Plan

> **For agentic workers:** Use subagents to implement and review this plan task by task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the conceptual Maintenance and Support page with a walkthrough-first guide for safely creating, verifying, testing, changing, and removing maintenance announcements, then diagnosing role and nickname problems with privacy-safe evidence.

**Architecture:** Keep maintenance operations and first-line support triage on `docs/community-admins/maintenance-and-support.md` at its existing URL.
Organize the page around one disabled Asteria Dispatch announcement, then explain exact matching, controlled testing, saved-row operations, role and nickname evidence, troubleshooting, and escalation.
Represent future visuals as five rendered VitePress information containers without adding screenshot assets, Mermaid, or other diagrams.

**Tech Stack:** VitePress Markdown, VitePress custom containers, Markdown tables, PNPM, ESLint, and the existing Playwright visual-audit script.

## Global Constraints

Use `docs/superpowers/specs/2026-07-15-maintenance-and-support-operational-guide-design.md` as the binding content specification.
Use the sibling Citizen iD implementation pinned at `330f1477ad58f0afee38be62652acc94707a2a38` as product evidence.
Keep every Markdown sentence on its own source line.
Keep every published H1, H2, and H3 heading to three or four words.
Use exact current product labels and messages.
Lead with a saved **Disabled** example and never enable it during creation.
Use Asteria Rescue as the example community and Asteria Dispatch as the sole application target.
Use exact UTC window `2030-01-15 18:00` through `2030-01-15 19:00`.
Use **Authorization Create** as the only module.
Remove the default Asteria Rescue community audience before saving.
Leave account, community, required-role, and excluded-role targeting empty.
Distinguish stored enabled state from an active match and visible blocking result.
State that start is inclusive and end is exclusive.
State that inclusion targets use OR, required roles use AND, and any excluded role vetoes matching.
State that any active match replaces child content with **Maintenance in progress** and only superadmins bypass the gate.
Warn that **Community Portal** targeting can lock ordinary community staff out of the management controls.
State that enable, disable, and delete actions are immediate and have no confirmation.
State that **Clear** resets only the unsaved form without warning and restores potentially unsafe creation defaults.
State that **Platform managed** rows are locked against community-admin changes.
Preserve exact role audit and nickname evidence boundaries from the design.
Do not promise an SLA, restoration time, completion signal, hidden audit field, or recovery control.
Create exactly five rendered `::: info Screenshot placement` blocks.
Every placement block must include purpose, required contents, crop and focus, annotations, proposed caption, and alt-text intent.
Do not add screenshots, generated illustrations, diagrams, Mermaid, `ImageStepper`, dependencies, or application code.

---

## Task 1: Rewrite Guide Page

**Files:**

- Modify: `docs/community-admins/maintenance-and-support.md`.
- Read: `docs/superpowers/specs/2026-07-15-maintenance-and-support-operational-guide-design.md`.
- Read: `docs/community-admins/AGENTS.md`.
- Read: `docs/reference/support-evidence.md`.
- Read: `docs/reference/operations-notes.md`.
- Read: `docs/community-admins/role-assignments.md`.
- Read: `docs/community-admins/nickname-management.md`.

**Interfaces:**

- Consumes: Existing community-admin navigation entry and VitePress Markdown conventions.
- Produces: A self-contained operational Maintenance and Support page at the existing URL.
- Produces: Consistent cross-links to shared evidence and operations references.

- [ ] **Step 1: Replace page structure**

Use the exact H1, H2, and H3 structure from the design specification.
Open with the operational outcome and direct the reader to **Before You Start**.
Remove the current Mermaid diagram, diagram prose, prose-only screenshot markers, and conceptual **Maintenance Windows** opening.
Preserve current implementation-backed support material only where it fits the approved maintenance, role, nickname, troubleshooting, or escalation flow.

- [ ] **Step 2: Add safe prerequisites**

Require Asteria Rescue administrator access, a known Asteria Dispatch application, an exact UTC plan, and a recovery route before any maintenance operation.
Explain that a matching notice blocks child content rather than merely displaying a passive status message.
Recommend an informed test user, a controlled test application or agreed window, a second authorized operator when practical, and confirmed superadmin escalation before any live test.
Warn before the form walkthrough that community-scoped creation defaults to **Enabled** on, the current UTC start, **Community Portal**, and the current community audience.

- [ ] **Step 3: Write disabled walkthrough**

Create Asteria Rescue's disabled Asteria Dispatch authorization announcement with the exact design table.
Use title `Asteria Dispatch authorization maintenance`.
Use **Enabled** off.
Use `2030-01-15 18:00 UTC` as the inclusive start and `2030-01-15 19:00 UTC` as the exclusive end.
Use Markdown body `Asteria Dispatch authorization creation is temporarily unavailable from 18:00 to 19:00 UTC.`.
Keep **Community managed** ownership and Asteria Rescue scope.
Remove **Community Portal** and select **Authorization Create** only.
Remove the default Asteria Rescue audience.
Select Asteria Dispatch as the only application target.
Leave accounts, communities, required roles, and excluded roles empty.
Select **Save** only after rechecking enabled state, module, application, and UTC values.
Verify exact snackbar **Maintenance announcement saved.** and the new **Disabled** row under **Existing maintenance announcements**.
State that the title has a 120-character maximum.
State that **Display from** is required, **Display until** is optional, and an entered end must be later than the start.
State that Markdown is sanitized when rendered and that the editor has no preview.

- [ ] **Step 4: Explain exact matching**

Explain the match as enabled state AND active UTC window AND module AND scope AND audience and role context.
Explain that inclusion targets across accounts, applications, and communities use OR.
Explain that no inclusion targets create broad inclusion for contexts passing the remaining checks.
Explain that all required roles must match and any matching excluded role vetoes the notice.
Explain that role filters cannot match without account context.
List the exact community-managed modules: **Authorization Create**, **Authorization Use**, **Community Portal**, and **Developer Portal**.
Explain why retaining Asteria Rescue while adding Asteria Dispatch would broaden the example through OR matching.
Add a compact exact-boundary example showing active eligibility at `18:00 UTC` and no time match at `19:00 UTC`.
Explain that the **Enabled** chip records the switch but does not prove the current window and targeting match.

- [ ] **Step 5: Add controlled testing**

Treat enabling as a live operational change rather than preview.
Require another review of saved module, audience, roles, and current UTC before the toggle.
State that enable applies immediately without confirmation.
Show that a matching active notice replaces the Asteria Dispatch Authorization Create child content with **Maintenance in progress**.
Require disabling immediately after the controlled verification and checking that normal content returns.
State that disable applies immediately without confirmation.
Warn that only superadmins bypass maintenance and ordinary community staff remain subject to matching **Community Portal** notices.
Prohibit **Community Portal** as the first test module.

- [ ] **Step 6: Document saved operations**

Explain edit, toggle, clear, delete, and platform ownership by operational effect.
State that edit loads stored values for review and change.
State that enable and disable mutate immediately without confirmation.
State that delete removes the saved announcement immediately without confirmation.
Require capturing configuration before delete when recreation may be needed.
State that **Clear** resets the unsaved editor only and does not delete a saved row.
State that **Clear** has no warning and restores enabled state, current UTC start, **Community Portal**, and the current community audience.
Require turning **Enabled** off and rebuilding safe scope after **Clear**.
State that **Platform managed** rows are locked and must be escalated instead of edited, toggled, or deleted by a community administrator.

- [ ] **Step 7: Add role triage**

Use Dana's missing `Verified Pilot` role in Asteria Hub at `2026-07-15 18:05 UTC`.
Record community identifier `asteria-rescue`, server, member, role, expected state, observed state, and report time.
Open **Bot Configuration**, **Roles**, and **Preview** for Dana.
If Preview excludes the role, inspect the rule and member data instead of resyncing.
If Preview includes the role, open **Audit Log** and filter **From**, **To**, **Discord Role**, and **Search** around the report.
Capture only displayed **Time**, **Result**, **Target member**, **Action**, **Role**, and **Reason**.
State that the current community grid does not display the stored operation ID, evaluated rule, or full plan.
Explain failed, successful, and absent audit-row interpretations without overstating certainty.
Use **Resync** only once after a confirmed correction and after reading **Re-sync Role Assignments**.
State that role resync is server-wide, rate-limited, may add and remove managed roles, and has no promised completion time.

- [ ] **Step 8: Add nickname triage**

Open **Bot Configuration** and **Nicknames**.
Compare preview output with the live nickname.
Check bot **Manage Nicknames** permission and Discord role hierarchy.
State that no detailed admin-visible nickname audit exists.
Use **Re-sync on server** only after a confirmed correction and after reading **Re-sync User Nicknames**.
State that nickname resync is server-wide.
Do not claim Citizen iD exposes a detailed rejection reason for server owners or Discord-protected accounts.

- [ ] **Step 9: Add safe escalation**

Collect only the smallest evidence set proving expected result, observed result, community, application or server, module or role, targeting, row state, and exact UTC window.
Exclude tokens, authorization codes, callback parameters, email addresses, private account identifiers, private messages, and raw exports.
Use demo identities and redact unrelated identifiers in publication visuals.
Link to `/reference/support-evidence` and `/reference/operations-notes`.
Direct private help to [discord.citizenid.space](https://discord.citizenid.space) or `hi@citizenid.space`.
Do not send sensitive evidence through public channels.

- [ ] **Step 10: Add placement blocks**

Add exactly five rendered `::: info Screenshot placement` containers from the design specification.
Add the creation-form placement after entering the title, disabled state, UTC window, body, and **Authorization Create** module.
Add the targeting-form placement after Asteria Dispatch becomes the only inclusion target.
Add the saved-row placement after verifying **Maintenance announcement saved.** and the **Disabled** chip.
Add the blocking-result placement inside controlled testing after explaining active-window behavior.
Add the role-audit placement after applying Dana's audit filters.
Use all six required labels in every block:

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

Do not add actual screenshot assets during this rewrite.

- [ ] **Step 11: Check source structure**

Run:

```powershell
rtk rg -n "^#{1,4} " docs/community-admins/maintenance-and-support.md
rtk rg -n "Screenshot placement|Purpose:|Required contents:|Crop and focus:|Annotations:|Proposed caption:|Alt-text intent:" docs/community-admins/maintenance-and-support.md
rtk rg -n "mermaid|what should be on the screenshot|Diagram:" docs/community-admins/maintenance-and-support.md
rtk rg -n "Maintenance announcement saved\.|Maintenance in progress|Authorization Create|Asteria Dispatch|Display from|Display until|Enabled|Disabled|Platform managed" docs/community-admins/maintenance-and-support.md
rtk rg -n "2026-07-15 18:05 UTC|Verified Pilot|Audit Log|Re-sync Role Assignments|Re-sync User Nicknames" docs/community-admins/maintenance-and-support.md
```

Expected: Approved concise outline is present and every published heading contains three or four words.
Expected: Exactly five placement blocks and thirty required placement labels are reported.
Expected: Mermaid, diagram prose, and prose-only screenshot markers are absent.
Expected: Exact maintenance, blocking, audit, resync, and example labels are present.

- [ ] **Step 12: Build rewritten guide**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 13: Commit initial guide**

Run:

```powershell
rtk git add docs/community-admins/maintenance-and-support.md
rtk git commit -m "docs: add maintenance support walkthrough"
```

## Task 2: Consumer Review Passes

**Files:**

- Review: `docs/community-admins/maintenance-and-support.md`.
- Modify if required: `docs/community-admins/maintenance-and-support.md`.

**Interfaces:**

- Consumes: Complete walkthrough-first draft from Task 1.
- Produces: A comprehensible, recovery-safe, and support-safe revision with approved findings resolved.

- [ ] **Step 1: Run newcomer review**

Dispatch a first-time community administrator subagent.
Ask whether they can disable unsafe defaults, enter the exact UTC window, select **Authorization Create**, remove the community audience, target only Asteria Dispatch, save safely, and verify the disabled row.
Ask whether they can predict inclusive start, exclusive end, OR inclusion, AND required roles, excluded-role veto, and broad matching with no inclusion targets.
Ask whether they understand immediate toggles and deletion, **Clear** behavior, platform locks, superadmin-only bypass, and the **Community Portal** lockout risk.
Ask them to flag ambiguous headings, unexplained labels, missing recovery steps, and steps requiring unstated product knowledge.

- [ ] **Step 2: Run support review**

Dispatch a support moderator subagent in parallel with the newcomer review.
Ask them to verify exact targeting and time semantics, disabled-versus-active distinction, lockout recovery boundaries, and the lack of confirmation for enable, disable, and delete.
Ask them to verify Dana's role triage, audit-field limits, one-resync boundary, nickname audit limitation, server-wide resync warnings, and privacy-safe escalation.
Ask them to flag unsupported SLA, audit, recovery, or product claims.

- [ ] **Step 3: Apply review findings**

Use one fix subagent to apply all actionable Critical and Important findings from both reviewers.
Keep the approved walkthrough-first structure, exact labels, fixed UTC example, five placement blocks, and short-heading constraint intact.
Record any rejected finding with pinned implementation evidence showing why it is incorrect.

- [ ] **Step 4: Rebuild reviewed guide**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 5: Commit review fixes**

If review changed the page, run:

```powershell
rtk git add docs/community-admins/maintenance-and-support.md
rtk git commit -m "docs: refine maintenance support guidance"
```

## Task 3: Final Review Passes

**Files:**

- Review: `docs/community-admins/maintenance-and-support.md`.
- Review: `docs/superpowers/specs/2026-07-15-maintenance-and-support-operational-guide-design.md`.
- Modify if required: `docs/community-admins/maintenance-and-support.md`.

- [ ] **Step 1: Run requirements review**

Dispatch a requirements-review subagent against the binding design specification and pinned implementation evidence.
Require a line-by-line check of every exact value, label, matching rule, action effect, lock, evidence boundary, and screenshot-placement requirement.
Require explicit reporting of missing requirements, contradictions, and unsupported claims.

- [ ] **Step 2: Run quality review**

Dispatch a documentation-quality subagent in parallel against the complete diff.
Ask them to assess operational ordering, scanability, three-word or four-word headings, sentence-per-line source formatting, table clarity, link placement, repetition, and safety-warning timing.
Require them to preserve implementation precision while removing avoidable ambiguity.

- [ ] **Step 3: Resolve final findings**

Apply every correct Critical and Important finding.
Record evidence for rejected findings.
Re-run source checks from Task 1 and confirm exactly five placement containers remain.

- [ ] **Step 4: Rebuild final revision**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 5: Commit final fixes**

If final review changed the page, run:

```powershell
rtk git add docs/community-admins/maintenance-and-support.md
rtk git commit -m "docs: polish maintenance support guide"
```

## Task 4: Visual Audit

**Files:**

- Review: `docs/community-admins/maintenance-and-support.md`.
- Review: Generated images under the operating-system temporary directory `citizenid-docs-visual-audit`.
- Modify if required: `docs/community-admins/maintenance-and-support.md`.

**Interfaces:**

- Consumes: Reviewed page from Task 3 and the existing VitePress visual-audit runner.
- Produces: A clean rendered page verified at desktop light, desktop dark, and mobile viewports.

- [ ] **Step 1: Run static verification**

Run:

```powershell
rtk proxy corepack pnpm lint
rtk proxy corepack pnpm build
rtk git diff --check
```

Expected: ESLint and VitePress exit with code 0 and Git reports no whitespace errors.

- [ ] **Step 2: Start bounded server**

Start the existing VitePress development command on `127.0.0.1:5174` in a hidden background process.
Poll `http://127.0.0.1:5174/community-admins/maintenance-and-support` for no more than 30 seconds.
Stop and diagnose instead of extending the wait if the page does not become available.

- [ ] **Step 3: Run visual audit**

Run:

```powershell
rtk proxy corepack pnpm visual:audit
```

Expected: JSON result reports no horizontal-overflow offenders for Maintenance and Support.
Expected: Audit writes `desktop-maintenance-and-support.png` and `mobile-maintenance-and-support.png` under the temporary audit directory.

- [ ] **Step 4: Inspect all renderings**

Inspect the generated desktop-light and mobile images, then inspect desktop dark mode in the local browser.
Confirm the outline and headings scan without excessive wrapping.
Confirm the exact-value table remains readable.
Confirm all five placement containers look intentional.
Confirm dark-mode contrast is sufficient.
Confirm no content overlaps, clips, or creates page-level horizontal overflow.
Apply only documentation changes needed to resolve observed issues.

- [ ] **Step 5: Re-run changed checks**

If visual fixes were required, re-run lint, build, visual audit, and image inspection.
Stop the local server after the final audit.

- [ ] **Step 6: Commit visual fixes**

If visual audit changed the page, run:

```powershell
rtk git add docs/community-admins/maintenance-and-support.md
rtk git commit -m "docs: polish maintenance support rendering"
```

## Task 5: Completion Audit

- [ ] Compare the final page line by line with the binding design and Global Constraints.
- [ ] Confirm the Asteria walkthrough begins disabled and removes all unsafe defaults before save.
- [ ] Confirm Asteria Dispatch is the sole inclusion target and **Authorization Create** is the sole module.
- [ ] Confirm exact title, Markdown body, UTC start, UTC end, snackbar, saved-row chip, and blocking heading.
- [ ] Confirm start-inclusive, end-exclusive, optional-end, OR inclusion, AND required-role, excluded-role veto, and no-account role behavior.
- [ ] Confirm enabled state is not described as proof of an active match.
- [ ] Confirm any matching notice blocks child content and only superadmins bypass it.
- [ ] Confirm first testing avoids **Community Portal** and documents recovery access before toggling.
- [ ] Confirm enable, disable, and delete are immediate and unconfirmed.
- [ ] Confirm **Clear** does not delete saved rows and restores potentially unsafe form defaults without warning.
- [ ] Confirm **Platform managed** rows remain locked.
- [ ] Confirm Dana's role audit workflow uses only displayed fields and permits one server-wide resync only after a confirmed fix.
- [ ] Confirm nickname triage does not invent an admin-visible audit or detailed rejection reason.
- [ ] Confirm private evidence boundaries, official support Discord, support email, and shared-reference links.
- [ ] Confirm exactly five placement blocks render with all six required labels.
- [ ] Confirm no screenshot asset, generated illustration, diagram, Mermaid, `ImageStepper`, or prose-only visual marker remains.
- [ ] Confirm lint, build, whitespace checks, source checks, subagent reviews, and visual audit all pass.
- [ ] Confirm commits contain only intended documentation changes and the final worktree state is understood before handoff.
