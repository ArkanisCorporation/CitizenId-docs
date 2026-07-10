---
title: Role Assignments
description: Configure, preview, verify, and troubleshoot automated role assignments.
---

# Role Assignments

Role assignments keep member roles aligned with Asteria Rescue policy by adding, keeping, or removing configured Citizen iD and Discord roles.
This guide walks through one complete Discord assignment before covering common policies, rollout, troubleshooting, and advanced rules.
Begin with **Before You Start** so the first preview reflects the correct community, Discord server, member data, and bot permissions.

## Before You Start

### Required Setup

Confirm each owner has completed the setup that only they control.

| Owner | Requirement |
| --- | --- |
| Citizen iD community administrator | Has access to Asteria Rescue and its bot configuration in the **Community Portal**. |
| Discord server owner or administrator | Has Discord **Manage Server** and installs the Citizen iD app in Asteria Hub. |
| Discord administrator | Has Discord **Manage Roles**, grants or verifies the bot permission, reorders roles, and can run the manual role update command. |
| Citizen iD bot | Is installed in the official server, has Discord **Manage Roles**, and can manage only target roles below its highest role. |
| Test member | Has linked Citizen iD and Discord accounts, belongs to Asteria Hub, and has the Citizen iD facts used by the policy. |

Use [Community Setup](/community-admins/community-setup) for the broader community path and [Discord Bot](/community-admins/discord-bot) for installation and server configuration.
Prepare at least one member who should match and one who should not match before opening the editor.

### Choose Target Role

Create or identify the ordinary Discord role `Verified Pilot` in Asteria Hub.
Place `Verified Pilot` below the Citizen iD bot role so Discord allows the bot to manage it.
The Discord role picker avoids managed roles such as linked roles because Discord, rather than an ordinary bot assignment, controls those roles.
Use only a target from the official server selected for Asteria Rescue.

### Know Who Controls What

Asteria Rescue community administrators own the Citizen iD policy, template configuration, and official server choice in the **Community Portal**.
A Discord server owner or administrator owns app installation, Discord permissions, and the Asteria Hub role hierarchy.
Citizen iD community access alone does not grant authority to install the app, grant Discord permissions, or reorder Discord roles.
Members own their account links and any privacy choices that affect the available Citizen iD or public RSI data.
Citizen iD evaluates saved templates and determines the desired role state.
Discord decides whether a requested Discord role change can be executed.
The **Audit Log** provides evidence for attempted live changes, but a no-match or no-change evaluation might not produce an audit record.

## Assign First Role

### Define Policy

Start with this policy: “A verified Citizen iD member receives the `Verified Pilot` Discord role.”
For Asteria Rescue, name the template `Verified Citizen iD member` so preview results and support conversations describe the policy plainly.

### Create Template

1. Open the community bot configuration for Asteria Rescue.
2. Select **Roles**, then **Editor**.
3. Select **Add new template**.
4. Enter `Verified Citizen iD member` as the display name.
5. Add a description such as “Assigns Verified Pilot to members with the Verified Citizen iD role.”
6. Add an optional group if Asteria Rescue uses groups to organize related templates.

A newly added template is enabled in the editor, but it remains unsaved and is not live until you save it.
The editor shows **Changes Pending** while this draft differs from the saved live policy.

### Add Condition

In **Conditions**, select the Citizen iD role `Verified`.
Citizen iD grants this status after the member completes RSI account-control verification, as described in [Verified Status](/players/rsi-verification#verified-status).
The `Verified` condition is a known present-or-absent Citizen iD fact and matches when the evaluated member currently has that role.

### Select Discord Role

In **Role Assignments**, select the Asteria Hub Discord role `Verified Pilot` as the target.
The complete pending rule now reads: when the member has the Citizen iD role `Verified`, the desired Discord roles include `Verified Pilot`.

::: info Screenshot placement
**Purpose:** Show the complete first template before an administrator previews or saves it.

**Required contents:** Show one pending `Verified Citizen iD member` template in **Roles → Editor**, including the display name, `Verified` condition, `Verified Pilot` Discord target, **Changes Pending** indicator, and save action.

**Crop and focus:** Crop to the template card and the nearby pending and save controls rather than the full application shell.

**Annotations:** Add callouts for the condition, target, pending state, and save action.

**Proposed caption:** The pending verified-member template in **Roles → Editor** before it is saved live.

**Alt-text intent:** Communicate that an enabled but unsaved template connects the `Verified` Citizen iD condition to the `Verified Pilot` Discord target and still shows **Changes Pending**.
:::

### Preview Member Results

Open **Preview** while **Changes Pending** is visible.
The enabled pending template participates in preview, so you can test the proposed policy before it changes live members.
Preview shows whether the Citizen iD policy matches and which role changes are desired.
Preview does not prove that Discord will accept a live change after the template is saved.

::: info Screenshot placement
**Purpose:** Explain how member inputs lead to a planned `Verified Pilot` addition before the result matrix.

**Required contents:** Show **Roles → Preview** with a representative verified member, the member's relevant Citizen iD state, current Asteria Hub role state, matching `Verified Citizen iD member` template, and planned addition of `Verified Pilot`.

**Crop and focus:** Focus on the member inputs and result summary that explain why the role will be added.

**Annotations:** Distinguish the supplied Citizen iD and Discord inputs from the resulting desired role state.

**Proposed caption:** Preview connects a verified member's current state to the planned `Verified Pilot` addition.

**Alt-text intent:** Communicate that a member with `Verified` and without `Verified Pilot` matches the pending template and produces an add result.
:::

| Member | Verified | Has `Verified Pilot` | Preview result |
| --- | --- | --- | --- |
| Alex | Yes | No | Add the role. |
| Blake | Yes | Yes | Make no change. |
| Casey | No | Yes | Remove the controlled role. |
| Erin | No | No | Make no change. |

::: warning Controlled role
Saving the enabled `Verified Pilot` target makes every membership in that role authoritative to the policy.
Citizen iD can remove the role from an evaluated member when no enabled matching template desires it, including when staff originally assigned the role manually.
Disabling the target or deleting the final template that targets the role stops managing it and leaves existing memberships untouched.
:::

### Save Template

Return to **Editor** after the representative results match the intended policy.
Save the pending template to clear **Changes Pending** and make the enabled rule live.
Saving an enabled target makes `Verified Pilot` controlled by this assignment policy, so later loss of eligibility can remove the role.

### Confirm Result

After saving, a Discord administrator with **Manage Roles** can scope a manual update to Alex and `Verified Pilot` with `/roles update affected-user:@Alex targeted-role:@Verified Pilot`.

The command scopes the request to the selected member and role and responds `Role update request sent.`.
After a few minutes, confirm the live role in Asteria Hub and check **Audit Log** for an attempted add or remove operation.
Treat the live Discord state and any recorded attempt as confirmation, rather than treating preview alone as proof of execution.
If the live role still contradicts preview after about twenty minutes, collect the evidence under **Support Evidence** and escalate instead of repeatedly retrying.

## Understand Results

### Match And No-Match

A matched result means all required condition facts are available and satisfy the template.
For Alex, the `Verified` condition matches and the desired state includes `Verified Pilot`.
A no-match result means the required facts are available but do not satisfy the condition.
For Erin, `Verified` is known to be absent, so the template does not match and no role change is needed.

### Missing Data Outcomes

An unavailable result means Citizen iD cannot evaluate a required fact, such as private or missing RSI organization data.
Unavailable is different from no-match because the policy does not know whether the requirement is true or false.
An unavailable condition does not match and therefore does not desire its targets.
A member without the controlled target receives no addition.
A member who already has the controlled target receives a planned removal unless another enabled matching template still desires it.
The multiple-template union preserves the role when at least one enabled template matches and desires it.
Negation does not turn an unavailable fact into a match.
Preview unavailable organization-data cases before saving because privacy changes or provider unavailability can revoke a controlled access role.

### Roles Added Or Removed

An enabled target controls membership in that role.
Alex receives `Verified Pilot` because the saved policy desires the role and he does not have it.
Blake keeps `Verified Pilot` because the policy still desires a role he already has, which is a no-change result.
Casey loses `Verified Pilot` because this saved rule controls the role but no longer matches him.
Erin remains unchanged because she neither matches nor has the controlled role.

### Discord Rejections

Dana is verified and does not have `Verified Pilot`, so preview plans an addition.
After the template is saved, Citizen iD can request that addition, but Discord rejects it if the Citizen iD bot cannot manage `Verified Pilot`.
The failed execution does not change Dana's policy match or desired state.
It means the administrator must correct the Discord permission or role hierarchy before retrying.

::: info Screenshot placement
**Purpose:** Show the evidence that distinguishes Dana's successful policy match from Discord's failed live execution.

**Required contents:** Show **Roles → Audit Log** filtered to Dana's failed `Verified Pilot` addition, including the member, target role, add operation, failed outcome, timestamp, and useful reason text.

**Crop and focus:** Focus on the failed audit entry and the filters needed to preserve useful support context.

**Annotations:** Call out the failed outcome and the Discord reason text.

**Proposed caption:** Dana matched the policy, but Discord rejected the attempted `Verified Pilot` addition.

**Alt-text intent:** Communicate the member, role, add operation, failure, time, and reason that support staff need to diagnose the rejected Discord change.
:::

### Audit Records

The **Audit Log** is most useful when Citizen iD attempts a live role addition or removal and records success or failure.
Use a failed record to separate policy evaluation from Discord execution.
Do not expect an audit record merely because a member matched no template or already had the desired role.
Confirm those no-match and no-change cases in **Preview**, and collect an audit record only when one is available.

## Common Policies

### Verified Members

**Goal:** Give verified Citizen iD members a recognizable Asteria Hub role.
**Condition:** Citizen iD role is exactly `Verified`.
**Target:** Discord role is exactly `Verified Pilot`.
**Representative result:** Alex matches and preview plans to add `Verified Pilot`, while Blake matches and keeps the role without a change.
**Privacy or availability caveat:** `Verified` is a known present-or-absent Citizen iD fact, while unavailable outcomes apply to private or missing RSI profile or organization facts.
**Verification step:** Preview one verified member and one known unverified member, then confirm an attempted live change in **Audit Log** after saving.

### Main Org Members

**Goal:** Give members whose main RSI organization is Asteria Rescue the `Org Member` role.
**Condition:** RSI main organization is exactly `Asteria Rescue`.
**Target:** Discord role is exactly `Org Member`.
**Representative result:** A member with Asteria Rescue as the available main organization matches and receives `Org Member` if it is missing.
**Privacy or availability caveat:** Private or missing organization data produces unavailable rather than no-match, and it must not be treated as proof of non-membership.
**Verification step:** Preview one member with visible Asteria Rescue main-organization data and one visible member whose main organization is different.

### Organization Officers

**Goal:** Give public Asteria Rescue officers the `Officer` role.
**Condition:** RSI organization is exactly `Asteria Rescue` and organization membership type is exactly `Officer`.
**Target:** Discord role is exactly `Officer`.
**Representative result:** A member whose available Asteria Rescue membership reports `Officer` matches and receives the Discord role.
**Privacy or availability caveat:** Hidden organization membership or unavailable officer data cannot satisfy the condition.
**Verification step:** Preview one visible officer and one visible non-officer, then verify the first attempted change in **Audit Log**.

### Combine Conditions

**Goal:** Give verified Asteria Rescue main-organization members the `Flight Ready` role.
**Condition:** Citizen iD role is exactly `Verified` and RSI main organization is exactly `Asteria Rescue`.
**Target:** Discord role is exactly `Flight Ready`.
**Representative result:** A verified member with available Asteria Rescue main-organization data matches only when both conditions are true.
**Privacy or availability caveat:** Unavailable organization data makes the combined evaluation unavailable, and `Verified` alone is not enough.
**Verification step:** Preview members representing both true, one false, and one unavailable inputs before saving.

### Restricted Members

**Goal:** Give eligible verified members `Operations Access` unless they have the Citizen iD role `Restricted`.
**Condition:** Citizen iD role is exactly `Verified` and Citizen iD role is not `Restricted`.
**Target:** Discord role is exactly `Operations Access`.
**Representative result:** Alex receives `Operations Access` when verified and not restricted, while a verified restricted member does not match.
**Privacy or availability caveat:** Citizen iD roles are known present or absent, so an absent `Restricted` role is a no-match that negation turns into a match.
**Verification step:** Preview one verified unrestricted member and one verified restricted member, then confirm that only the intended member has the live target role.

## Safe Rollout

### Select Test Members

Use Alex, Blake, Casey, and Erin as the four minimum state combinations for a controlled role.
Add Dana when validating a known Discord rejection path.
For organization policies, include a visible match, a visible no-match, and a member whose required data is unavailable.

### Notify Members

Tell members which account link, Citizen iD role, public RSI fact, or Discord membership the policy requires.
Explain that enabled targets can remove controlled roles when eligibility is lost.
Notify moderators before a policy change can remove access or change support expectations.

### Start Small

Begin with one clear template and one ordinary Discord target.
Use the enabled but unsaved draft in **Preview**, then save it only while staff are available to monitor the first live evaluations.
Avoid introducing nested organization, verification, and Discord conditions in the first rollout.

### Monitor Changes

Watch **Audit Log** for attempted additions, removals, and failures after saving.
Compare member reports with live Asteria Hub roles and preview inputs.
A Discord administrator with **Manage Roles** can scope a manual update to Alex and `Verified Pilot` with `/roles update affected-user:@Alex targeted-role:@Verified Pilot`.
The command responds `Role update request sent.`.
Check the live role and **Audit Log** after a few minutes.
If a contradiction persists for about twenty minutes, collect evidence and escalate instead of repeatedly retrying.
Remember that no-match and no-change evaluations might have no audit record to monitor.

## Troubleshoot Assignments

### No Template Matches

Confirm that the intended template is saved and enabled.
Check whether every required condition is available and uses the expected member, community, and official server context.
Distinguish a genuine no-match from unavailable private or missing data.
Preview representative inputs again after correcting the condition or data source.

### Role Not Applied

First confirm that **Preview** desires the role.
Then confirm that the target belongs to Asteria Hub, is an ordinary bot-managed Discord role, and is below the Citizen iD bot role.
Check that the bot remains installed and can manage roles in the official server.
A Discord-managed linked role cannot become assignable through permission changes, hierarchy changes, or resyncs.
Replace it with an ordinary Discord role for bot-managed assignment or configure it through the separate [Discord Linked Roles flow](/community-admins/discord-bot#linked-role-setup).
Use the failed **Audit Log** entry, if available, to identify the Discord rejection before retrying the targeted command.

### Unexpected Removal

An enabled target controls both addition and continued membership.
If a member loses eligibility for a controlled target, Citizen iD can remove the role.
Preview the member's current Citizen iD, Discord, and RSI facts, then check whether a template was disabled, changed, or saved with a new condition.
Do not restore the role manually without first understanding whether the saved community policy will remove it again.

### Missing Audit Record

A missing audit record does not by itself mean evaluation failed.
No-match and no-change evaluations might not create an attempted live operation to record.
Use **Preview** to confirm the policy outcome and inspect the member's live Asteria Hub role state.
Escalate only after recording the evaluation inputs, expected target, live state, and relevant time.

### Support Evidence

Route every detail according to its sensitivity before sending evidence.

| Route | Evidence |
| --- | --- |
| Public | Community slug, general issue summary, affected page or feature, template name, target role name, and UTC time. |
| Staff-private | Server, member, and role IDs; preview outcome; saved, enabled, or pending state; current versus expected role state; bot hierarchy; targeted command attempt; and redacted audit failure reason. |
| Citizen iD-private | Account identity, privacy-setting details, unavailable-fact details, or private profile evidence that community staff should not receive. |
| Never share | Bot tokens, access or refresh tokens, client secrets, authorization codes, password-reset links, verification codes, URLs containing credentials, private Discord messages, or unredacted private profiles. |

For a support request, include the stable server, member, and role IDs; preview outcome; saved, enabled, or pending template state; current and expected role state; targeted command attempt; operation ID; and redacted Discord reason when available.
Crop and redact screenshots and exports according to the routing table before sharing them.
For broader escalation guidance, use [Maintenance And Support](/community-admins/maintenance-and-support).

## Advanced Rules

### Multiple Templates

Multiple enabled templates can target the same role.
Their desired targets combine as a union, so one matching template keeps the shared role desired even when another template does not match.
The controlled role is removed only when the evaluated role is no longer desired by any enabled matching template.
Use separate plain-language templates when that makes each eligibility path easier to preview and support.

### Citizen iD Roles

Targets can add or remove supported Citizen iD community roles used by community tools as well as ordinary Discord roles.
Citizen iD evaluates and applies its own role target, while Discord permission and hierarchy checks apply only to Discord targets.
Name the template so administrators can tell which system owns the target.

### RSI Org Targets

An RSI organization target projects a configured RSI organization membership role or rank into the evaluated Citizen iD policy context for downstream rule evaluation.
This target does not write to or change RSI itself.
Treat RSI organization data as an input whose privacy or availability can affect evaluation, not as a system Citizen iD controls.

### Nested Conditions

Composite conditions can combine Citizen iD state, Discord state, profile settings, RSI profile details, and RSI organization membership when the required data is available.
Use these results to keep unavailable facts distinct from false throughout nested conditions.

**AND**

| Result | When |
| --- | --- |
| Match | All facts are true. |
| No-match | Any fact is false. |
| Unavailable | No fact is false and at least one fact is unavailable. |

**OR**

| Result | When |
| --- | --- |
| Match | Any fact is true. |
| No-match | All facts are false. |
| Unavailable | No fact is true and at least one fact is unavailable. |

**Negation**

| Input | Result |
| --- | --- |
| Match | Becomes no-match. |
| No-match | Becomes match. |
| Unavailable | Remains unavailable. |

Split deeply nested policies into clearer templates when separate eligibility paths are easier to explain and verify.

### Complexity Limits

The current default model supports up to 25 templates per community, 10 conditions per template, 5 items in one composite condition, and 2 nested composite levels.
Ask for a limit review only after simplifying the community policy into clear templates.
Role sync work is coordinated per Discord guild member so overlapping sync work does not process the same member at the same time.
That coordination does not prevent Discord permission failures, Discord caching delays, or third-party availability issues.
Keep OAuth scopes, token claims, and implementation type names out of administrator-facing policy explanations unless an administrator is also building a third-party application.
