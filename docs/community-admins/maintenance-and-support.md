---
title: Maintenance And Support
description: Create safe maintenance notices, diagnose role and nickname issues, and prepare support evidence.
---

# Maintenance And Support

Use this guide to create a narrowly targeted maintenance notice without unexpectedly blocking users or community staff.
The walkthrough saves a disabled notice first, then explains matching, controlled testing, saved-notice operations, role and nickname evidence, troubleshooting, and escalation.

## Before You Start

### Confirm Admin Access

Sign in as a community administrator for Asteria Rescue and open its **Management** page in the Community Portal.
Confirm Asteria Dispatch is already available as an application target.
The community and application names in this guide are replaceable examples.

A matching maintenance notice blocks the selected child content instead of merely displaying a passive status message.
Prepare an informed test user, a controlled test application or agreed window, a second authorized operator whose context is confirmed not to match when practical, and a confirmed superadmin escalation route before any live test.

### Choose Safe Scope

The safe example affects only the **Authorization Create** flow for Asteria Dispatch.
It does not target the Community Portal, Developer Portal, other applications, individual accounts, communities, or roles.

Community administrators can select exactly these modules:

- **Authorization Create**.
- **Authorization Use**.
- **Community Portal**.
- **Developer Portal**.

Do not use **Community Portal** for a first live test.
A matching Community Portal notice can block ordinary community staff from the page that contains the maintenance controls.

### Prepare UTC Window

Use an exact UTC start and end so every operator reviews the same window.
This walkthrough uses `2030-01-15 18:00 UTC` through `2030-01-15 19:00 UTC`.

**Display from** is required and its start is inclusive.
**Display until** is optional and its end is exclusive.
When an end is entered, it must be later than the start.

## Create Disabled Notice

### Open Community Management

1. Open Asteria Rescue in the Community Portal.
2. Open **Management**.
3. Find **Create maintenance announcement**.

Community-scoped creation currently begins with **Enabled** on, **Display from** set to the current UTC time, **Community Portal** selected, and Asteria Rescue added as an audience target.
Those defaults are unsafe for this walkthrough because saving them unchanged can create an immediately active, broadly matched portal block.

### Reset Unsafe Defaults

Turn **Enabled** off before entering any other value.
Remove **Community Portal** from **Modules**.
Expand **Audience targets** and remove Asteria Rescue from communities.

Do not select **Clear** as a shortcut.
**Clear** restores the same potentially unsafe creation defaults without a warning.

### Enter Notice Content

Enter these exact values:

| Field | Example value | Operational result |
| --- | --- | --- |
| **Title** | `Asteria Dispatch authorization maintenance` | Identifies the affected application flow. |
| **Enabled** | Off | Prevents the saved row from matching or blocking users. |
| **Markdown Body** | `Asteria Dispatch authorization creation is temporarily unavailable from 18:00 to 19:00 UTC.` | States the impact and window without promising an SLA. |
| **Scope Community** | Asteria Rescue | Keeps ownership in the current community scope. |
| **Community Management** | **Community managed** | Identifies a row the community administrator may change. |

The title is required and has a 120-character maximum.
Markdown is sanitized when rendered, and the editor has no preview.
Use simple formatting and verify its rendered result on a safe surface before relying on complex Markdown.

### Set UTC Window

Enter the walkthrough window exactly:

| Field | Value |
| --- | --- |
| **Display from date (UTC)** | `2030-01-15` |
| **Display from time (UTC)** | `18:00` |
| **Display until date (UTC)** | `2030-01-15` |
| **Display until time (UTC)** | `19:00` |

Do not convert these values to browser-local time.
They remain fixed examples so the walkthrough is deterministic.
For a real controlled test, substitute an agreed near-future UTC window and review every boundary again before saving.

### Choose Authorization Create

Expand **Modules** and select **Authorization Create** only.
Confirm **Community Portal**, **Authorization Use**, and **Developer Portal** are not selected.

::: info Screenshot placement
**Purpose:** Show the safe initial state before targeting is configured.

**Required contents:** Current **Create maintenance announcement** form with the Asteria title, **Enabled** off, exact `2030-01-15 18:00` to `19:00` UTC fields, Markdown body, and **Authorization Create** selected.

**Crop and focus:** Keep the title, enabled control, UTC fields, body, and module selection legible; exclude navigation and unrelated community data.

**Annotations:** Mark **Enabled** as safely off, identify both UTC boundaries, and point to **Authorization Create** as the only module.

**Proposed caption:** Prepare the exact maintenance window while the announcement remains disabled.

**Alt-text intent:** Disabled Asteria Dispatch maintenance form with a one-hour UTC window and Authorization Create selected.
:::

### Target Asteria Dispatch

Expand **Audience targets**.
Remove the default Asteria Rescue community if it is still present.
Add Asteria Dispatch under applications.
Leave communities and accounts empty.

Expand **Role targeting** and leave required and excluded roles empty.
The finished targeting state is:

| Target group | Value |
| --- | --- |
| Applications | Asteria Dispatch only |
| Communities | Empty |
| Accounts | Empty |
| Required roles | Empty |
| Excluded roles | Empty |

::: info Screenshot placement
**Purpose:** Prove that the broad default community audience was removed.

**Required contents:** Expanded **Modules**, **Role targeting**, and **Audience targets** showing **Authorization Create** only, empty required and excluded roles, no community or account targets, and Asteria Dispatch as the only application.

**Crop and focus:** Center the expanded targeting controls and keep every selected chip and empty group visible.

**Annotations:** Mark Asteria Dispatch as the sole OR inclusion target and identify the removed Asteria Rescue community target.

**Proposed caption:** Target only Asteria Dispatch and leave role filters empty.

**Alt-text intent:** Maintenance targeting form with only the Asteria Dispatch application included and no community, account, or role filters.
:::

### Save Disabled Notice

Review every field before saving.
Confirm **Enabled** is off, **Authorization Create** is the only module, Asteria Dispatch is the only inclusion target, all role filters are empty, and both UTC boundaries are correct.
Select **Save**.

### Confirm Saved Row

Confirm the snackbar reads **Maintenance announcement saved.**
Under **Existing maintenance announcements**, confirm the Asteria row has a **Disabled** chip and the expected UTC window.

The **Disabled** chip confirms the stored switch is off.
An **Enabled** chip would confirm only that the stored switch is on, not that the current time and targeting context produce an active match.

::: info Screenshot placement
**Purpose:** Show the two success signals without implying that the notice is active.

**Required contents:** Exact **Maintenance announcement saved.** snackbar and the Asteria row under **Existing maintenance announcements** with its **Disabled** chip, UTC window summary, and edit, toggle, and delete actions.

**Crop and focus:** Keep the snackbar and complete saved row legible; exclude unrelated announcements where possible.

**Annotations:** Point to the **Disabled** chip, saved UTC window, and immediate-action controls.

**Proposed caption:** Confirm the announcement saved and remains disabled.

**Alt-text intent:** Saved Asteria maintenance row displaying the success snackbar, Disabled chip, UTC window, and management actions.
:::

## Understand Notice Matching

An announcement blocks content only when its enabled state, UTC window, module, scope, audience, and role context all match.

### Check Module Scope

The current request must match a selected module and the announcement scope.
The walkthrough selects **Authorization Create**, so it does not match **Authorization Use**, **Community Portal**, or **Developer Portal**.

### Check Audience Inclusion

Account, application, and community inclusion targets combine with OR logic.
If Asteria Rescue remained selected when Asteria Dispatch was added, either the community or the application could satisfy inclusion.
Removing Asteria Rescue and keeping only Asteria Dispatch makes this notice application-specific.

When no account, application, or community inclusion target exists, inclusion is broad for any context that passes the remaining checks.
An empty inclusion list does not mean nobody.

### Check Required Roles

Every required role must match, so required roles combine with AND logic.
Role filters cannot match when the request has no account context.

### Check Excluded Roles

Any matching excluded role vetoes the announcement.
An excluded role wins even when all required roles and other targeting conditions match.

### Check Active Window

An enabled notice with this walkthrough window is time-eligible at exactly `2030-01-15 18:00 UTC` because the start is inclusive.
It is no longer time-eligible at exactly `2030-01-15 19:00 UTC` because the end is exclusive.

When **Display until** is empty, the notice continues matching after its start while it remains enabled and every other condition matches.
An **Enabled** chip alone never proves the notice is currently active.
Already loaded pages do not poll for a changed switch or clock boundary, so navigate again or refresh after enabling, disabling, reaching the start, or reaching the end.

## Test Blocking Safely

### Prepare Recovery Access

Treat enabling as a live operational change, not a preview.
Use a controlled test application or agreed test window and inform the test user.
Confirm a second authorized operator whose context is known not to match when practical and a superadmin escalation route before toggling.

Only superadmins bypass maintenance.
Ordinary community administrators and staff remain subject to matching notices.

### Enable At Window

Immediately before the test, recheck the saved module, application target, empty community and account targets, empty role filters, and current UTC.
Use the saved-row power action only when the agreed window begins.
Enabling applies immediately and has no confirmation dialog.

### Verify Blocked Flow

Open the Asteria Dispatch **Authorization Create** flow as the informed test user.
When the notice is enabled, within its UTC window, and matched by all targeting conditions, Citizen iD replaces the full child content with **Maintenance in progress**.

::: info Screenshot placement
**Purpose:** Show the user-visible result of a deliberately enabled matching test.

**Required contents:** Safe test surface for Asteria Dispatch **Authorization Create** displaying **Maintenance in progress** during the active UTC window.

**Crop and focus:** Show only the blocked product surface and maintenance message; omit browser address parameters, authorization codes, callbacks, accounts, and unrelated application data.

**Annotations:** Identify the blocked Authorization Create child content and note that the test notice must be disabled immediately afterward.

**Proposed caption:** A matching active notice replaces the Authorization Create flow during its UTC window.

**Alt-text intent:** Asteria Dispatch Authorization Create flow replaced by the Maintenance in progress message during a controlled test.
:::

### Disable After Testing

Disable the notice immediately after confirming the blocked result.
Disabling applies immediately and has no confirmation dialog.
Navigate again or refresh the same flow and confirm normal Authorization Create content returns.

Do not use **Community Portal** for this first test.
A matching Community Portal notice can remove ordinary staff access to the maintenance controls, and only a superadmin bypasses that gate.

## Manage Saved Notices

### Edit Existing Notice

Use the edit action to load a saved notice into the form.
Recheck enabled state, UTC window, module, audience, and roles before saving an edit because a changed notice can match a different surface or user.

### Clear Draft Form

**Clear** resets the unsaved form without warning.
It does not delete any saved row.

After **Clear**, the form again defaults to **Enabled** on, the current UTC start, **Community Portal**, and the current community audience.
Turn **Enabled** off and rebuild the safe scope before saving anything.

### Toggle Notice State

The saved-row power action enables or disables the notice immediately without confirmation.
Verify the named row, current UTC, module, and audience before selecting it.
After disabling, verify the affected surface returns to normal.

### Delete Saved Notice

Delete removes the saved announcement immediately without confirmation.
Capture the title, body, UTC window, module, audience, and roles first when manual recreation may be necessary.
Do not use delete as a troubleshooting reset.

### Review Platform Notices

Rows marked **Platform managed** are controlled by Citizen iD and locked against community-admin edits, toggles, and deletion.
Collect privacy-safe evidence and contact support when a platform-managed notice appears wrong or stale.
Do not attempt a workaround through a different community row.

## Collect Support Evidence

Start with current configuration and visible results before changing a rule or starting a server-wide resync.

### Triage Missing Role

Dana reports that `Verified Pilot` is missing in Asteria Hub at `2026-07-15 18:05 UTC`.
Record community identifier `asteria-rescue`, Asteria Hub, Dana, `Verified Pilot`, expected assignment, observed assignment, and the report time.

Open **Bot Configuration**, **Roles**, and **Preview** for Dana.
If Preview excludes `Verified Pilot`, inspect the rule and member data instead of resyncing.
If Preview includes `Verified Pilot`, continue to the audit evidence.

### Check Audit Evidence

Open **Audit Log**.
Set UTC **From** and **To** around `2026-07-15 18:05 UTC`, select `Verified Pilot` under **Discord Role**, and search for Dana under **Search**.
Review every matching outcome rather than stopping at the first row.

::: info Screenshot placement
**Purpose:** Show the evidence used to distinguish a failed role operation from a rule mismatch or no-change result.

**Required contents:** Current **Roles** > **Audit Log** with UTC **From** and **To**, `Verified Pilot` selected as **Discord Role**, Dana under **Search**, and one privacy-safe row showing **Time**, **Result**, **Target**, **Action**, **Role**, and **Reason**.

**Crop and focus:** Keep the filters and one representative row legible; redact member and server identifiers before publication.

**Annotations:** Mark the UTC window, expected role, result, and displayed reason; do not request a hidden operation ID.

**Proposed caption:** Filter the role audit before deciding whether one server-wide resync is justified.

**Alt-text intent:** Role audit filters and one Dana result used to diagnose a missing Verified Pilot role.
:::

Capture only displayed **Time**, **Result**, **Target**, **Action**, **Role**, and **Reason**.
The **Target** column contains the affected member.
The current community grid does not display the stored operation ID, evaluated rule, or full plan.

A failed row can reveal a reason to correct before resync.
A successful row means Citizen iD recorded success, so compare the current Discord role and hierarchy.
No row can mean no match or no change, so preserve Preview and the current Discord state instead of inventing an operation record.

### Run One Resync

Resync only after Preview and audit evidence identify a correction that should change the result.
Select **Resync**, read **Re-sync Role Assignments**, confirm Asteria Hub, and start it once.

Role resync is server-wide, rate-limited, and can add or remove managed roles.
It has no promised completion time.
Do not repeat the request while results are still changing.

### Triage Nickname Issue

Open **Bot Configuration** and **Nicknames**.
Compare the configured template and preview with the live nickname.
Check the bot's **Manage Nicknames** permission and its role position above the affected member.
Account for Citizen iD truncating the rendered nickname to 32 characters before treating a shorter live result as a failure.

Nickname management has no detailed community-admin-visible audit log.
Use **Re-sync on server** only after a confirmed correction, read **Re-sync User Nicknames**, confirm the named server, and remember the action is server-wide.
Citizen iD does not expose a detailed community-admin rejection reason for server owners or Discord-protected accounts.

### Capture Safe Screenshots

Capture only the relevant page title, non-secret configuration, exact UTC time, visible result, and non-secret reason or request ID.
Exclude tokens, authorization codes, callback parameters, email addresses, private account identifiers, private messages, unrelated members, and raw exports.

Use demo accounts and applications where possible.
Crop to the relevant control and result, then redact unrelated identifiers before publication or support sharing.
See [Support Evidence](/reference/support-evidence) for the shared checklist and [Operations Notes](/reference/operations-notes) for public operational boundaries.

## Troubleshoot Notice Behavior

### Notice Stays Inactive

Check the stored **Enabled** state and current UTC first.
Confirm the inclusive start has arrived and the exclusive end has not arrived.
Then check module, scope, every inclusion target, every required role, every excluded role, and whether the request has account context for role filtering.

Do not recreate or delete the notice merely because an **Enabled** chip does not produce a block.
The chip does not prove the other match conditions.

### Wrong Users Blocked

Check whether the default Asteria Rescue community target remains beside Asteria Dispatch.
Account, application, and community inclusion targets use OR, so any retained target can broaden the match.
Also check for empty inclusion targeting, which is broad rather than empty.

Review required and excluded roles with the affected account context.
Every required role must match, while any excluded role vetoes the notice.

### Staff Access Blocked

Identify whether an enabled, time-active notice targets **Community Portal** and matches the staff member's context.
Ordinary community staff cannot bypass it.
Use a prearranged operator only when their context is confirmed not to match.
For a broad/default Community Portal block, use private support for superadmin recovery or wait for the exclusive end, then navigate again or refresh.

### Notice Was Deleted

Deletion applies immediately and this flow exposes no undo.
Rebuild the row from captured configuration or escalate with the remaining evidence.
Do not promise restoration from a hidden audit or recovery control.

## Escalate Support Safely

### Run Local Checks

Complete the matching, permission, hierarchy, Preview, and audit checks that apply to the report.
Record exact UTC observations and one bounded resync attempt when a confirmed correction justified it.
Do not wait indefinitely, retry blindly, or promise an SLA.

### Prepare Private Evidence

Prepare the smallest evidence set that shows expected result, observed result, community, application or Discord server, module or role, targeting, row state, and exact UTC window.
Include a non-secret request ID or displayed audit reason when available.
Remove secrets and unrelated identities before sharing.

### Contact Citizen Support

Open a [private `#support-and-contact` ticket](https://discord.com/channels/1401938319843004416/1401942231707029505) in the official support Discord, or email `hi@citizenid.space`, for private operational help.
Do not place private account, Discord, RSI, authorization, or callback evidence in public channels.
Citizen iD does not promise a specific uptime, restoration, support-response, role-sync, nickname-sync, or service-level commitment.
