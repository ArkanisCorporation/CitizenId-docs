# Role Assignments Operational Guide Design

## Goal

Rework the Role Assignments page into an operational guide that helps a community administrator configure, preview, save, verify, and troubleshoot a working assignment.
Keep reference material available after the main workflow instead of leading with implementation details.

## Audience

The primary reader is a community administrator configuring role automation for the first time.
The reader understands their community policy and Discord roles but may not understand Citizen iD conditions, targets, preview behavior, or ownership boundaries.
Support moderators are a secondary audience who need predictable result states and evidence-collection guidance.

## Design Direction

Use a walkthrough-first structure.
Lead with one complete and useful configuration, then explain its result states, related recipes, rollout guidance, troubleshooting, and advanced behavior.
Use the fictional Asteria Rescue community consistently so configuration and outcomes remain easy to compare.

## Heading Constraint

Keep outline headings to three or four words where practical.
Prefer exact product terms over shorter but ambiguous labels.
Verify the rendered outline at desktop and narrow viewport widths before considering the page complete.

Use this heading structure:

```markdown
# Role Assignments

## Before You Start

### Required Setup
### Choose Target Role
### Know Who Controls What

## Assign First Role

### Define Policy
### Create Template
### Add Condition
### Select Discord Role
### Stage Template
### Preview Member Results
### Save Template
### Confirm Result

## Understand Results

### Match And No-Match
### Missing Data Outcomes
### Roles Added Or Removed
### Discord Rejections
### Audit Records

## Common Policies

### Verified Members
### Main Organization Members
### Organization Rank
### Combine Multiple Conditions
### Exclude Specific Members

## Safe Rollout

### Select Test Members
### Notify Members
### Start Small
### Monitor Changes

## Troubleshoot Assignments

### No Template Matches
### Role Not Applied
### Role Removed Unexpectedly
### Missing Audit Record
### Support Evidence

## Advanced Rules

### One Role, Multiple Templates
### Citizen iD Roles
### RSI Org Targets
### Nested Conditions
### Rule Complexity Limits
```

## Main Walkthrough

Configure the policy “A verified Citizen iD member receives the `Verified Pilot` Discord role.”

Use these example names:

- Community: `Asteria Rescue`.
- Discord server: `Asteria Hub`.
- Template: `Verified Citizen iD member`.
- Citizen iD condition role: `Verified`.
- Discord target role: `Verified Pilot`.

Follow the actual product workflow:

1. Open the community bot configuration and select **Roles** and then **Editor**.
2. Select **Add New Template**.
3. Explain that the new enabled draft initially appears as `Assignment Template` and is not persisted yet.
4. Select the Citizen iD `Verified` role in **Conditions**.
5. Select the `Verified Pilot` Discord role in **Role Assignments**.
6. Select **Disable role assignment**, then **Edit role assignment details**.
7. Enter the `Verified Citizen iD member` display name, description, and optional group.
8. Select **Save changes** to persist the whole template while it is disabled and cannot make live role changes.
9. Select **Enable role assignment** and explain that the enabled state remains pending under **Changes Pending** until **Save All**.
10. Open **Preview** and test representative Citizen iD and Discord states against the final named template.
11. Return to **Editor** and select **Save All** after the results match the intended policy.
12. Run `/roles update affected-user:@Alex targeted-role:@Verified Pilot` for targeted confirmation.
13. Confirm the live role and attempted live changes under **Audit Log**.

Explain that condition and target controls remain editable while the new template is enabled.
Explain that **Save changes** in the details dialog persists the whole template, so the walkthrough disables it first.
The pending re-enabled state participates in preview without changing live members until **Save All** is selected.
Explain that saving an enabled template makes the target role controlled by the assignment policy.

## Example Results

Use a compact matrix to demonstrate the complete behavior of the first rule.

| Member | Verified | Has `Verified Pilot` | Preview result |
| --- | --- | --- | --- |
| Alex | Yes | No | Add the role. |
| Blake | Yes | Yes | Make no change. |
| Casey | No | Yes | Remove the controlled role. |
| Erin | No | No | Make no change. |

Use Dana as a separate execution example.
Dana is verified and does not have the target role, so preview plans an addition.
Discord rejects the live addition because the Citizen iD bot cannot manage the target role, so the audit record reports a failed operation.

## Supporting Recipes

Keep each recipe shorter than the main walkthrough.
Give each recipe a goal, exact condition, exact target, representative result, privacy or availability caveat, and verification step.

Include these recipes:

- Main organization membership assigns `Org Member`.
- Asteria Rescue membership with **Member Rank** exactly `Rank 5` assigns `Senior Member`.
- Verified status combined with main organization membership assigns `Flight Ready`.
- Explicitly private or unavailable organization facts produce unavailable, while visible absent or nonmatching profile, organization, membership type, or rank facts produce no-match.
- Negation preserves unavailable but can invert a real no-match.
- Lost eligibility removes a role controlled by an enabled target.
- Multiple matching templates targeting the same role combine their desired targets, so one matching template keeps the role desired.

Verify the organization-rank recipe with one visible `Rank 5` member, one visible different-rank member, and one member whose organization facts are explicitly unavailable.

Move deeply nested conditions, Citizen iD targets, RSI organization targets, and evaluation limits into the advanced section.

## Result Boundaries

Separate policy evaluation from external execution throughout the page.
Preview explains whether templates match and which role changes are desired.
Preview does not prove that Discord will accept a live role change.
Discord permissions, role hierarchy, target validity, and server ownership can still block execution.
Audit records are most useful when Citizen iD attempts a live change and records success or failure.
Do not promise an audit record for every member who matches no template or requires no change.

## Visual Placements

Do not create or embed new screenshots or illustrations in this change.
Insert rendered VitePress information containers where a future screenshot is needed.
Each placement block must identify its purpose, required contents, crop or focus, annotation requirements, proposed caption, and alt-text intent.

Use this renderable format:

```markdown
::: info Screenshot placement
**Purpose:** Explain why the screenshot is needed.

**Required contents:** Describe the exact page state and controls that must be visible.

**Crop and focus:** Describe the useful viewport or element boundary.

**Annotations:** Describe any callouts that should be added.

**Proposed caption:** Provide reader-facing caption text.

**Alt-text intent:** Describe the information the final alt text must communicate.
:::
```

Add three placement blocks to the page.

### Editor Placement

Place the editor block in the first walkthrough after the configuration steps.
Request a screenshot of the final named `Verified Citizen iD member` template after its disabled save and pending re-enable in **Roles → Editor**.
Require the display name, `Verified` condition, `Verified Pilot` Discord target, **Changes Pending** indicator, and **Save All** action to be visible.
Focus on the template card rather than the full application shell.
Request callouts for the condition, target, pending enabled state, and **Save All** action.

### Preview Placement

Place the preview block immediately before the result matrix.
Request a screenshot of **Roles → Preview** with a representative verified member context and a planned addition of `Verified Pilot`.
Require the relevant Citizen iD state, current Discord role state, matching template result, and planned role change to be visible.
Focus on the inputs and result summary needed to explain why the role will be added.
Request callouts that distinguish member inputs from the resulting desired state.

### Audit Placement

Place the audit block in troubleshooting under **Role Not Applied** or **Discord Rejections**.
Request a screenshot of **Roles → Audit Log** filtered to Dana's failed `Verified Pilot` addition.
Require the member, target role, add operation, failed outcome, timestamp, and useful reason text to be visible.
Focus on the audit entry and filters needed for support evidence.
Request callouts for the failure outcome and reason.

## Content Style

Lead every section with the operational effect.
Keep each sentence on its own Markdown source line.
Use numbered steps only for ordered workflows.
Use compact tables for exact mappings and repeated outcome comparisons.
State clearly whether Citizen iD, the community administrator, the member, or Discord owns each prerequisite and failure.
Avoid exposing implementation type names unless they help an administrator make a decision.
Avoid turning every recipe label into another outline heading.

## Comprehensibility Review

After drafting, run two role-play reviews with subagents.
Use one first-time community administrator to check whether the walkthrough can be followed without prior role-assignment knowledge.
Use one support moderator to check ownership boundaries, privacy-safe evidence guidance, audit expectations, and failure diagnosis.
Resolve terminology and comprehension findings before the visual audit.

## Verification

Build the documentation site after the page rewrite.
Inspect the rendered page at desktop and narrow viewport widths.
Confirm that the table remains readable and the placement blocks render as intentional authoring placeholders.
Confirm that outline labels remain concise and do not wrap excessively.
Confirm that every product label matches the current Roles editor, Preview, and Audit Log interfaces.
Confirm that the walkthrough disables the template before **Save changes**, previews the pending re-enabled state, and selects **Save All** only after preview matches policy.
Confirm that unavailable is reserved for explicitly private or unavailable RSI facts and visible absent or nonmatching facts produce no-match.
Confirm that no screenshot or generated illustration was added.
