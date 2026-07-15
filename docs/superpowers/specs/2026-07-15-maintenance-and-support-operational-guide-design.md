# Maintenance And Support Operational Guide Design

## Guide Goal

Rework Maintenance and Support into a walkthrough-first operational guide for creating, checking, testing, changing, and removing maintenance announcements without unexpectedly blocking users or community staff.
Keep role, nickname, screenshot, and escalation evidence practical enough for a community administrator to collect safely.
Base every control name and behavior on the pinned Citizen iD implementation.

## Intended Readers

Primary readers are community administrators preparing a narrow maintenance announcement for one Citizen iD application flow.
Secondary readers are support moderators who need to distinguish configuration errors, active matching, lockout, and evidence gaps.
Assume the reader understands their community and application but does not know the matching rules, UTC boundary semantics, or immediate-action hazards.

## Design Direction

Lead with one complete, safe example for Asteria Rescue and Asteria Dispatch.
The reader creates and saves the example as **Disabled** before learning broader matching rules or live-test operations.
Follow the example with targeting semantics, controlled testing, maintenance-row operations, support evidence, and escalation.

Use Atlassian Statuspage's [scheduled maintenance guide](https://support.atlassian.com/statuspage/docs/schedule-maintenance/) as inspiration for presenting the maintenance name, exact window, affected component, state, and verification together.
Use Atlassian's [incident communication tips](https://support.atlassian.com/statuspage/docs/incident-communication-tips/) as inspiration for early, precise, consistent, impact-focused wording.
Citizen iD differs from Statuspage because a matching announcement blocks the selected product surface rather than only communicating status, so the guide must make safe targeting and recovery more prominent.

## Heading Design

Use three-word or four-word headings throughout the published page.
Use this structure:

```markdown
# Maintenance And Support

## Before You Start

### Confirm Admin Access
### Choose Safe Scope
### Prepare UTC Window

## Create Disabled Notice

### Open Community Management
### Reset Unsafe Defaults
### Enter Notice Content
### Set UTC Window
### Choose Authorization Create
### Target Asteria Dispatch
### Save Disabled Notice
### Confirm Saved Row

## Understand Notice Matching

### Check Module Scope
### Check Audience Inclusion
### Check Required Roles
### Check Excluded Roles
### Check Active Window

## Test Blocking Safely

### Prepare Recovery Access
### Enable At Window
### Verify Blocked Flow
### Disable After Testing

## Manage Saved Notices

### Edit Existing Notice
### Clear Draft Form
### Toggle Notice State
### Delete Saved Notice
### Review Platform Notices

## Collect Support Evidence

### Triage Missing Role
### Check Audit Evidence
### Run One Resync
### Triage Nickname Issue
### Capture Safe Screenshots

## Troubleshoot Notice Behavior

### Notice Stays Inactive
### Wrong Users Blocked
### Staff Access Blocked
### Notice Was Deleted

## Escalate Support Safely

### Run Local Checks
### Prepare Private Evidence
### Contact Citizen Support
```

## Main Walkthrough

Create a disabled maintenance announcement for the **Authorization Create** flow in the **Asteria Dispatch** application owned by **Asteria Rescue**.
Use these exact example values:

| Field | Example value | Operational result |
| --- | --- | --- |
| **Title** | `Asteria Dispatch authorization maintenance` | Identifies the affected application flow and stays below the 120-character limit. |
| **Enabled** | Off | Saves a disabled row that cannot match or block users. |
| **Display from date (UTC)** | `2030-01-15` | Starts the example window on 15 January 2030. |
| **Display from time (UTC)** | `18:00` | Makes the start instant `2030-01-15 18:00 UTC`. |
| **Display until date (UTC)** | `2030-01-15` | Ends the example window on the same date. |
| **Display until time (UTC)** | `19:00` | Makes the end instant `2030-01-15 19:00 UTC`. |
| **Markdown Body** | `Asteria Dispatch authorization creation is temporarily unavailable from 18:00 to 19:00 UTC.` | Gives a short, precise impact statement without promising an SLA. |
| **Scope Community** | Asteria Rescue | Keeps ownership in the current community scope. |
| **Community Management** | **Community managed** | Identifies a row the community administrator may change. |
| **Modules** | **Authorization Create** only | Limits matching to creation of an authorization. |
| **Required roles** | Empty | Adds no account-role requirement. |
| **Excluded roles** | Empty | Adds no account-role veto. |
| **Communities** | Empty | Removes the automatically selected Asteria Rescue audience. |
| **Applications** | Asteria Dispatch only | Makes Asteria Dispatch the sole inclusion target. |
| **Accounts** | Empty | Adds no individual-account inclusion target. |

State that the community, application, title, and message are replaceable examples, while the fixed UTC values exist so the walkthrough remains deterministic.
Explain that community-scoped creation currently begins with **Enabled** on, **Display from** set to the current UTC time, **Community Portal** selected, and the current community added as an audience target.
Call these defaults unsafe for this walkthrough because saving them unchanged can create an immediately active, broadly matched portal block.

Use this exact sequence:

1. Sign in as an administrator of Asteria Rescue.
2. Open Asteria Rescue in the Community Portal and open **Management**.
3. Find **Create maintenance announcement**.
4. Turn **Enabled** off before entering other values.
5. Enter the exact title and Markdown body from the table.
6. Set the exact UTC start and end fields from the table.
7. Expand **Modules**, remove **Community Portal**, and select **Authorization Create** only.
8. Expand **Audience targets** and remove the default Asteria Rescue community.
9. Add Asteria Dispatch under applications and leave communities and accounts empty.
10. Leave **Role targeting** required and excluded roles empty.
11. Review every field, especially **Enabled**, module, application, and UTC values.
12. Select **Save**.
13. Confirm the snackbar reads **Maintenance announcement saved.**
14. Confirm the new row appears under **Existing maintenance announcements** with a **Disabled** chip.

Explain that **Markdown Body** is sanitized when rendered and that the editor has no preview.
Require simple formatting and a post-save render check on a safe surface before relying on complex Markdown.
Do not instruct the reader to enable the notice during creation.

## Matching Semantics

Explain matching as one compact decision sequence.
The announcement must be enabled, within its UTC window, matched to the current module and scope, and matched to the current audience and role context.
Any matching announcement blocks the full child content with **Maintenance in progress**.
Only a superadmin bypasses the maintenance gate.

Document exact time behavior:

- **Display from** is required and inclusive, so a notice beginning at `18:00 UTC` may match at exactly `18:00 UTC`.
- **Display until** is optional and exclusive, so a notice ending at `19:00 UTC` no longer matches at exactly `19:00 UTC`.
- When no end exists, the notice continues matching after its start while it remains enabled and all other conditions match.
- **Enabled** and **Disabled** chips show the stored switch only; they do not prove whether the current time and targeting context produce an active match.
- All form labels and walkthrough values use UTC, so the guide must not silently convert them to browser-local time.

Document exact targeting behavior:

- Module, scope, audience, and role conditions combine with AND logic.
- Account, application, and community inclusion targets combine with OR logic.
- With no inclusion targets, inclusion is broad for any context that passes the remaining checks.
- Every required role must match, so required roles combine with AND logic.
- Any matching excluded role vetoes the announcement.
- Role filters cannot match when the request has no account context.
- Community administrators may select exactly **Authorization Create**, **Authorization Use**, **Community Portal**, and **Developer Portal**.

Make the default-audience hazard explicit.
If Asteria Rescue remains selected while Asteria Dispatch is added, the OR rule can match the community or the application.
Removing the community and keeping only Asteria Dispatch makes the example application-specific.

## Blocking Safety

Treat enabling as an operational change, not a harmless preview.
Before a controlled live test, require a separate test application or agreed test window, an informed test user, a second authorized operator when practical, and a confirmed superadmin escalation route.
Require the operator to verify the saved row again before toggling.

State that enable and disable actions apply immediately and show no confirmation dialog.
At the scheduled start, an enabled matching row replaces the selected child content with **Maintenance in progress**.
After the controlled check, the operator must disable the notice immediately and verify the normal content returns.
Disabling is also immediate and has no confirmation dialog.

Warn prominently that selecting **Community Portal** can block community staff from the management page containing the maintenance controls.
Ordinary community staff do not bypass that block.
Do not use **Community Portal** for a first live test.
Before any broad portal maintenance, arrange another operator or superadmin recovery path outside the blocked workflow.

## Notice Operations

Explain the saved-row actions by effect rather than icon alone.
Editing opens the stored values for review and change.
The enable or disable action changes the switch immediately without confirmation.
Deleting removes the saved announcement immediately without confirmation, so require capturing the configuration before deletion when recreation may be necessary.

Explain **Clear** separately from deletion.
**Clear** resets the unsaved form without warning and does not delete a saved row.
It restores creation defaults, including enabled state, current UTC start, **Community Portal**, and the current community audience.
After **Clear**, require turning **Enabled** off and rebuilding the safe scope before saving anything.

Explain ownership locks.
Rows marked **Platform managed** are locked against community-admin mutation.
The guide must direct the reader to support instead of suggesting edit, toggle, or delete workarounds.

## Support Evidence

Preserve the useful role and nickname evidence from the current page but place it after the maintenance workflow.

Use a concrete role incident for Dana, who reports a missing `Verified Pilot` role in Asteria Hub at `2026-07-15 18:05 UTC`.
Use this sequence:

1. Record the community identifier `asteria-rescue`, Asteria Hub, the affected member and role, expected and observed state, and report time.
2. Open **Bot Configuration**, **Roles**, and **Preview** for Dana.
3. If Preview excludes the role, inspect the rule and member data instead of resyncing.
4. If Preview includes the role, open **Audit Log**.
5. Filter **From** and **To** around the report in UTC, select the Discord role, search Dana, and review all outcomes.
6. Capture only the displayed **Time**, **Result**, **Target member**, **Action**, **Role**, and **Reason**.
7. Explain that the stored operation ID is not displayed in the current community grid and the audit row does not expose the evaluated rule or full plan.
8. A failed row can identify the reason to fix before resync.
9. A successful row means Citizen iD recorded success, so compare current Discord state and hierarchy.
10. No row can mean no match or no change; preserve Preview and current Discord state.
11. After a confirmed correction only, select **Resync**, read **Re-sync Role Assignments**, and run it once.
12. Explain that resync is server-wide, rate-limited, can add and remove managed roles, and has no promised completion time.

For a nickname problem, open **Bot Configuration** and **Nicknames**, compare preview with the live nickname, and check **Manage Nicknames** plus Discord hierarchy.
State that no detailed admin-visible nickname audit exists.
Use **Re-sync on server** only after a confirmed correction, read **Re-sync User Nicknames**, and explain that it is server-wide.
Do not claim Citizen iD exposes a detailed rejection reason for server owners or Discord-protected accounts.

Screenshots must exclude tokens, authorization codes, callback parameters, email addresses, private account identifiers, private messages, and raw exports.
Use demo accounts and applications where possible, crop to the relevant control and result, and redact unrelated identifiers before publication or support sharing.
Direct detailed evidence handling to `/reference/support-evidence` and operational caveats to `/reference/operations-notes`.

## Screenshot Placements

Use exactly five rendered VitePress info containers in the published page.
Do not add screenshot files, generated illustrations, diagrams, image steppers, Mermaid, or prose-only screenshot markers during the documentation rewrite.

### Creation Form Placement

Place this block after the reader enters the notice content and UTC window:

```markdown
::: info Screenshot placement
**Purpose:** Show the safe initial state before targeting is configured.

**Required contents:** Current **Create maintenance announcement** form with the Asteria title, **Enabled** off, exact `2030-01-15 18:00` to `19:00` UTC fields, Markdown body, and **Authorization Create** selected.

**Crop and focus:** Keep the title, enabled control, UTC fields, body, and module selection legible; exclude navigation and unrelated community data.

**Annotations:** Mark **Enabled** as safely off, identify both UTC boundaries, and point to **Authorization Create** as the only module.

**Proposed caption:** Prepare the exact maintenance window while the announcement remains disabled.

**Alt-text intent:** Disabled Asteria Dispatch maintenance form with a one-hour UTC window and Authorization Create selected.
:::
```

### Targeting Form Placement

Place this block after Asteria Dispatch becomes the only audience inclusion target:

```markdown
::: info Screenshot placement
**Purpose:** Prove that the broad default community audience was removed.

**Required contents:** Expanded **Modules**, **Role targeting**, and **Audience targets** showing **Authorization Create** only, empty required and excluded roles, no community or account targets, and Asteria Dispatch as the only application.

**Crop and focus:** Center the expanded targeting controls and keep every selected chip and empty group visible.

**Annotations:** Mark Asteria Dispatch as the sole OR inclusion target and identify the removed Asteria Rescue community target.

**Proposed caption:** Target only Asteria Dispatch and leave role filters empty.

**Alt-text intent:** Maintenance targeting form with only the Asteria Dispatch application included and no community, account, or role filters.
:::
```

### Saved Row Placement

Place this block after the save verification steps:

```markdown
::: info Screenshot placement
**Purpose:** Show the two success signals without implying that the notice is active.

**Required contents:** Exact **Maintenance announcement saved.** snackbar and the Asteria row under **Existing maintenance announcements** with its **Disabled** chip, UTC window summary, and edit, toggle, and delete actions.

**Crop and focus:** Keep the snackbar and complete saved row legible; exclude unrelated announcements where possible.

**Annotations:** Point to the **Disabled** chip, saved UTC window, and immediate-action controls.

**Proposed caption:** Confirm the announcement saved and remains disabled.

**Alt-text intent:** Saved Asteria maintenance row displaying the success snackbar, Disabled chip, UTC window, and management actions.
:::
```

### Blocking Result Placement

Place this block in the controlled testing section after the active-window explanation:

```markdown
::: info Screenshot placement
**Purpose:** Show the user-visible result of a deliberately enabled matching test.

**Required contents:** Safe test surface for Asteria Dispatch **Authorization Create** displaying **Maintenance in progress** during the active UTC window.

**Crop and focus:** Show only the blocked product surface and maintenance message; omit browser address parameters, authorization codes, callbacks, accounts, and unrelated application data.

**Annotations:** Identify the blocked Authorization Create child content and note that the test notice must be disabled immediately afterward.

**Proposed caption:** A matching active notice replaces the Authorization Create flow during its UTC window.

**Alt-text intent:** Asteria Dispatch Authorization Create flow replaced by the Maintenance in progress message during a controlled test.
:::
```

### Role Audit Placement

Place this block after the Dana audit filters:

```markdown
::: info Screenshot placement
**Purpose:** Show the evidence used to distinguish a failed role operation from a rule mismatch or no-change result.

**Required contents:** Current **Roles** > **Audit Log** with UTC **From** and **To**, `Verified Pilot` selected as **Discord Role**, Dana under **Search**, and one privacy-safe row showing **Time**, **Result**, **Target member**, **Action**, **Role**, and **Reason**.

**Crop and focus:** Keep the filters and one representative row legible; redact member and server identifiers before publication.

**Annotations:** Mark the UTC window, expected role, result, and displayed reason; do not request a hidden operation ID.

**Proposed caption:** Filter the role audit before deciding whether one server-wide resync is justified.

**Alt-text intent:** Role audit filters and one Dana result used to diagnose a missing Verified Pilot role.
:::
```

## Troubleshooting Design

Lead troubleshooting with the stored row and current UTC time rather than asking readers to recreate the notice.
For an inactive notice, check **Enabled**, inclusive start, exclusive end, module, scope, all inclusion targets, required roles, excluded roles, and account context.
For unexpectedly broad blocking, check for the retained default community target and remember that inclusion targets use OR logic.
For staff lockout, identify a matching **Community Portal** announcement and use the prearranged second operator or superadmin recovery route.
For an accidentally deleted row, explain that deletion was immediate and no undo appears in this flow, then rebuild from captured configuration or escalate with available evidence.

Do not promise restoration times, response SLAs, hidden audit history, or recovery controls that the implementation does not expose.
Do not recommend deletion or **Clear** as a generic troubleshooting reset.

## Escalation Design

Ask the reader to run the implementation-backed local checks first and record exact UTC observations.
Then prepare the smallest privacy-safe evidence set that demonstrates expected result, observed result, community, application, module, targeting, row state, and time window.
Direct private operational help to the official Citizen iD Discord at [discord.citizenid.space](https://discord.citizenid.space) or `hi@citizenid.space` for sensitive evidence.
Do not place private evidence in public issue text or documentation examples.

## Content Style

Lead each section with the operational effect or risk.
Keep every Markdown sentence on its own source line.
Use numbered steps for ordered work and compact tables for exact values.
Use exact current labels and bold them when the reader must find or verify a control.
Distinguish stored enabled state, current active match, and visible blocking result.
Avoid vague words such as soon, later, local time, or affected users when an exact UTC boundary or target can be named.

## Review Criteria

A first-time community administrator must be able to save the complete Asteria example without activating it or leaving the broad default audience in place.
The reader must predict that start is inclusive, end is exclusive, inclusion targets use OR, required roles use AND, and any excluded role vetoes matching.
The reader must understand that any matching notice replaces the child content, only superadmins bypass it, and **Community Portal** targeting can lock staff out of their own controls.
The reader must recognize that enable, disable, and delete are immediate and unconfirmed, while **Clear** resets only the draft form to potentially unsafe defaults.
The reader must identify platform-managed rows as locked and know when to escalate.

## Verification Plan

Build the documentation site after the page rewrite.
Inspect desktop light, desktop dark, and mobile renderings.
Confirm the outline uses three-word or four-word headings.
Confirm all five screenshot-placement containers render and contain every required field.
Confirm no Mermaid, image stepper, generated image, screenshot asset, or prose-only visual marker remains.
Confirm the Asteria example saves as disabled and removes the default community audience.
Confirm exact labels, snackbar text, module names, UTC boundaries, matching rules, lockout warning, immediate actions, and platform locks against the pinned implementation.
Confirm support links resolve and screenshots request no secrets or private identifiers.

## Implementation Evidence

Implementation evidence comes from the sibling Citizen iD checkout pinned at `330f1477ad58f0afee38be62652acc94707a2a38` and was reviewed on 2026-07-15.
Recheck these behaviors if the application revision changes before the page rewrite lands.
Key files are:

- `CitizenId.Host.Web/Components/Pages/CommunityManagement.razor` for the embedded maintenance management panel.
- `CitizenId.Host.Web/Components/Maintenance/MaintenanceManagementPanel.razor` for labels, defaults, allowed modules, form behavior, saved rows, snackbar text, and edit, toggle, clear, and delete actions.
- `CitizenId.Host.Web/Services/MaintenanceManagementService.cs` for community ownership, platform locks, and mutation paths.
- `CitizenId.Infrastructure/Data/Repositories/MaintenanceAnnouncementRepository.cs` for enabled state and inclusive-start, exclusive-end UTC filtering.
- `CitizenId.Infrastructure/Services/MaintenanceAnnouncementMatcher.cs` for module, scope, audience, required-role, and excluded-role matching.
- `CitizenId.Host.Web/Components/Maintenance/MaintenanceGate.razor` for blocking and superadmin bypass.
- `CitizenId.Host.Web/Components/Maintenance/MaintenanceBlock.razor` for the exact **Maintenance in progress** result.
- `CitizenId.Host.Web/Components/Maintenance/MaintenanceAnnouncements.razor` for active announcement rendering.
- `CitizenId.Domain/Models/MaintenanceAnnouncement.cs` for title limit, required start, optional end, and stored targeting fields.
- `CitizenId.Domain/Enums/MaintenanceAnnouncementModule.cs` for module identities.

External design inspiration comes from Atlassian's official Statuspage documentation for [scheduling maintenance](https://support.atlassian.com/statuspage/docs/schedule-maintenance/) and [incident communication](https://support.atlassian.com/statuspage/docs/incident-communication-tips/).
