# Role Assignments Operational Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the linear Role Assignments reference page with a walkthrough-first operational guide containing concrete configurations, result examples, renderable screenshot placement blocks, rollout guidance, and troubleshooting.

**Architecture:** Keep all role-assignment guidance on the existing `docs/community-admins/role-assignments.md` page.
Organize the page around a first successful Discord-role assignment, then add outcome interpretation, compact recipes, rollout, troubleshooting, and advanced reference sections.
Represent future visuals as rendered VitePress information containers rather than adding screenshot assets.

**Tech Stack:** VitePress Markdown, VitePress custom containers, Markdown tables, PNPM, ESLint, Playwright visual-audit script.

## Global Constraints

Use `docs/superpowers/specs/2026-07-10-role-assignments-operational-guide-design.md` as the binding content specification.
Keep every Markdown sentence on its own source line.
Keep outline headings to three or four words where practical.
Use exact product labels including **Roles**, **Editor**, **Preview**, **Audit Log**, **Add New Template**, **Disable role assignment**, **Edit role assignment details**, **Save changes**, **Enable role assignment**, **Changes Pending**, and **Save All**.
Use Asteria Rescue, Asteria Hub, and the named example members consistently.
Explain pending preview behavior separately from saved live behavior.
Explain that enabled targets control role membership and can remove a role after eligibility is lost.
Separate Citizen iD policy evaluation from Discord execution and audit evidence.
Do not promise an audit record for a no-match or no-change evaluation.
Create renderable `::: info Screenshot placement` blocks instead of adding screenshot or illustration assets.
Every placement block must include purpose, required contents, crop and focus, annotations, proposed caption, and alt-text intent.
Do not add dependencies or modify application code.

---

### Task 1: Rewrite The Page

**Files:**

- Modify: `docs/community-admins/role-assignments.md`
- Read: `docs/superpowers/specs/2026-07-10-role-assignments-operational-guide-design.md`
- Read: `docs/community-admins/AGENTS.md`

**Interfaces:**

- Consumes: The existing community-admin navigation entry and VitePress Markdown conventions.
- Produces: A self-contained operational Role Assignments page at the existing URL.

- [ ] **Step 1: Replace the linear outline**

Use the exact H2 and H3 structure from the design specification.
Open with the operational outcome and direct the reader to **Before You Start** rather than opening with a diagram or template anatomy.
Preserve any implementation-backed facts from the current page that remain useful, but move them into the appropriate operational or advanced section.

- [ ] **Step 2: Write the first walkthrough**

Configure `Verified Citizen iD member` for Asteria Rescue.
Use Citizen iD role `Verified` as the condition and Discord role `Verified Pilot` as the target.
Describe the path through **Roles → Editor** and **Add New Template**, noting that the new enabled, unpersisted draft is named `Assignment Template`.
Configure conditions and role assignments while the draft is enabled, then select **Disable role assignment** before **Edit role assignment details**.
Enter the final details and select **Save changes**, which persists the whole template while it is disabled and cannot make live role changes.
Select **Enable role assignment**, preview the final named template while **Changes Pending** is visible, and select **Save All** only after the results match policy.
Confirm the targeted `/roles update affected-user:@Alex targeted-role:@Verified Pilot` result in the live Discord role and **Audit Log**.

- [ ] **Step 3: Add concrete outcomes**

Add the Alex, Blake, Casey, and Erin result matrix from the design specification.
Explain Dana separately as a previewed addition that Discord rejects during live execution.
Cover matched, no-match, unavailable, add, keep, remove, no-change, failed execution, and missing-audit expectations.

- [ ] **Step 4: Add compact recipes**

Add recipes for verified members, main organization members, Asteria Rescue members whose **Member Rank** is exactly `Rank 5` and receive `Senior Member`, combined conditions, and explicit exclusions.
For each recipe include the goal, exact condition, exact target, representative result, privacy or availability caveat, and verification step without turning those labels into additional headings.
Reserve unavailable for RSI facts explicitly marked private or unavailable, and treat visible absent or nonmatching profile, organization membership, membership type, or rank facts as no-match.
Verify the organization-rank recipe with one visible `Rank 5` member, one visible different-rank member, and one member whose organization facts are explicitly unavailable.
Keep Citizen iD targets, RSI organization targets, multiple-template union behavior, nested conditions, and complexity limits in **Advanced Rules**.

- [ ] **Step 5: Add placement blocks**

Add one rendered `::: info Screenshot placement` block for the editor after the disabled save and pending re-enable, showing the final named template, **Changes Pending**, and **Save All**.
Add one rendered block for preview immediately before the result matrix.
Add one rendered block for the failed audit entry under **Discord Rejections** or **Role Not Applied**.
Use all six required labels in every block.

- [ ] **Step 6: Check source structure**

Run:

```powershell
rtk rg -n "^#{1,4} " docs/community-admins/role-assignments.md
rtk rg -n "Screenshot placement|Purpose:|Required contents:|Crop and focus:|Annotations:|Proposed caption:|Alt-text intent:" docs/community-admins/role-assignments.md
```

Expected: The approved concise outline is present and three complete placement blocks are reported.

- [ ] **Step 7: Build the page**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 8: Commit the draft**

Run:

```powershell
rtk git add docs/community-admins/role-assignments.md
rtk git commit -m "docs: add role assignment walkthrough"
```

### Task 2: Consumer Review Passes

**Files:**

- Review: `docs/community-admins/role-assignments.md`
- Modify if required: `docs/community-admins/role-assignments.md`

**Interfaces:**

- Consumes: The complete walkthrough-first draft from Task 1.
- Produces: A comprehensible and support-safe revision with approved review findings resolved.

- [ ] **Step 1: Run newcomer review**

Dispatch a first-time community administrator reviewer.
Ask whether they can identify prerequisites, configure the first rule, predict each result, understand when a role can be removed, and distinguish preview from live behavior.
Ask them to flag ambiguous headings, unexplained product terms, and steps that require unstated knowledge.

- [ ] **Step 2: Run support review**

Dispatch a support moderator reviewer in parallel with the newcomer review.
Ask them to verify ownership boundaries, privacy-safe evidence guidance, audit expectations, Discord hierarchy failures, unavailable-data behavior, and the distinction between Discord linked roles and ordinary bot-managed roles.

- [ ] **Step 3: Apply review findings**

Use one fix subagent to apply all actionable Critical and Important findings from both reviewers.
Keep the operational-first structure and short-heading constraint intact.
Record any rejected finding with the implementation evidence that makes it incorrect.

- [ ] **Step 4: Rebuild the revision**

Run:

```powershell
rtk proxy corepack pnpm build
```

Expected: VitePress exits with code 0 and reports a successful build.

- [ ] **Step 5: Commit review fixes**

If the review changed the page, run:

```powershell
rtk git add docs/community-admins/role-assignments.md
rtk git commit -m "docs: refine role assignment guidance"
```

### Task 3: Visual And Final Verification

**Files:**

- Review: `docs/community-admins/role-assignments.md`
- Review: generated images under the operating system temporary directory `citizenid-docs-visual-audit`.
- Modify if required: `docs/community-admins/role-assignments.md`

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

Start `rtk proxy corepack pnpm serve --host 127.0.0.1 --port 5174` in a hidden background process.
Poll `http://127.0.0.1:5174/community-admins/role-assignments` for no more than 30 seconds.
Stop and diagnose instead of extending the wait if the page does not become available.

- [ ] **Step 3: Run visual audit**

Run:

```powershell
rtk proxy corepack pnpm visual:audit
```

Expected: The JSON result reports no horizontal-overflow offenders for the Role Assignments page and writes `desktop-role-assignments.png`, `desktop-dark-role-assignments.png`, and `mobile-role-assignments.png` under the temporary audit directory.

- [ ] **Step 4: Inspect renderings**

Inspect all three Role Assignments audit images.
Confirm that the outline and headings scan without excessive wrapping, tables remain readable, rendered placement blocks look intentional, dark-mode contrast is sufficient, and no content overlaps or clips.
Apply only documentation changes needed to resolve observed issues.

- [ ] **Step 5: Re-run changed checks**

If visual fixes were required, re-run `rtk proxy corepack pnpm lint`, `rtk proxy corepack pnpm build`, and `rtk proxy corepack pnpm visual:audit` before continuing.
Stop the local server after the final audit.

- [ ] **Step 6: Final requirements audit**

Compare the final page line by line with the Global Constraints and design specification.
Confirm that all required configurations, outcomes, placement blocks, ownership boundaries, and review passes are present.
Confirm that the safe disabled-save and pending-re-enable sequence uses every exact product label and ends with **Save All** only after preview matches policy.
Confirm that the organization recipe uses supported **Member Rank** and that unavailable remains distinct from visible no-match.
Confirm that no screenshot or generated illustration asset was added.

- [ ] **Step 7: Commit visual fixes**

If the visual audit changed the page, run:

```powershell
rtk git add docs/community-admins/role-assignments.md
rtk git commit -m "docs: polish role assignment guide"
```
