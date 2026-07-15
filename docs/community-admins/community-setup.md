---
title: Community Setup
description: Community records, identifiers, hierarchy, staff, and public community details.
---

# Community Setup

Create a root community record, connect its Discord server, verify saved state, then manage hierarchy and staff safely.
This walkthrough creates Asteria Rescue with replaceable example names and URLs.

## Before You Start

Prepare account access, record shape, and field values before opening creation.

### Confirm Access

Sign in with a verified Citizen iD account linked to the same Discord account that administers Asteria Hub.
Confirm that Discord account has **Administrator** in Asteria Hub.
The creator becomes community owner and joins the new community when the record is saved.

### Choose Record Shape

Create Asteria Rescue as a root community.
Leave **Parent Community** empty.

Use a child only when it belongs under an existing root community.
Citizen iD supports one hierarchy level, so a child cannot become a parent.

### Prepare Values

Use these values for the walkthrough:

| Field | Example value | Result |
| --- | --- | --- |
| **Parent Community** | None | Root community. |
| **Official Relationship** | **No official relationship** | Default system-controlled relationship state. |
| **Display Name** | `Asteria Rescue` | Main visible community name. |
| **Short Display Name** | `Asteria` | Optional compact name. |
| **Identifier** | `asteria-rescue` | Stored root identifier. |
| **Community Type** | **In-game organization** | Describes a Star Citizen organization. |
| **Homepage** | `https://example.org/asteria-rescue` | Replaceable public URL. |
| **Official Community Server** | Asteria Hub | Discord server used by community features. |
| **Description** | `A Star Citizen rescue community coordinating medical response, recovery, and training.` | Public community summary. |

The new-record **Community Type** default is **Generic**.
Select **In-game organization** for this example.

Domain-required fields are **Display Name**, **Identifier**, and **Description**.
The current form also marks **Community Type** and **Official Community Server** as required.
Optional fields are **Parent Community**, **Short Display Name**, and **Homepage**.
**Official Relationship** is system-managed for community administrators.

Current limits are 60 characters for display name, 20 for short display name, 40 for stored identifier, and 2000 for description.

## Create Community

Create the record through the community selector, installing Citizen iD before selecting Asteria Hub.

### Open Community Portal

1. Open the Community Portal.
2. Open the selector labeled **Citizen Community** with placeholder **Select a community**.
3. Select **Create new community**.
4. Confirm the **Manage Community** dialog opens.

### Enter Core Details

1. Leave **Parent Community** empty.
2. Leave read-only **Official Relationship** at **No official relationship**.
3. Enter `Asteria Rescue` in **Display Name**.
4. Enter `Asteria` in **Short Display Name**.
5. Select **In-game organization** under **Community Type**.
6. Enter `https://example.org/asteria-rescue` in **Homepage**.
7. Enter `A Star Citizen rescue community coordinating medical response, recovery, and training.` in **Description**.

::: info Screenshot placement
**Purpose:** Show every creation field, example value, and field-ownership boundary before saving.

**Required contents:** Show the current **Manage Community** form with all fields, Asteria example values, **Save changes**, and the add-app icon beside **Official Community Server**.

**Crop and focus:** Focus on the complete form from **Parent Community** through **Description**, including required markers and action controls.

**Annotations:** Call out required fields, optional fields, system-managed **Official Relationship**, and the Discord install icon.

**Proposed caption:** Asteria Rescue is configured as a root community before connecting Asteria Hub.

**Alt-text intent:** Communicate each visible field, its example value, which fields are required or optional, and which relationship field is read-only.
:::

Use a demo server and `example.org` URL in the final screenshot.
Redact account IDs and unrelated communities before publication.

### Choose Identifier

Enter `asteria-rescue` in **Identifier**, or use the identifier-generation control after entering the display name.
Citizen iD sanitizes the input.
The complete stored identifier must fit the 40-character limit.

Use **Identifier** in procedures, not slug.
Use stored identifier when describing the canonical saved value.

### Connect Discord

1. Find the icon beside **Official Community Server** with tooltip **Invite Citizen iD bot to your Discord server**.
2. Use it to open the trusted Discord installation flow.
3. Confirm Citizen iD and Asteria Hub before authorizing.
4. Complete installation in Asteria Hub.
5. Return to **Manage Community**.
6. Select Asteria Hub from the mutual-server list under **Official Community Server**.

Do not try to select Asteria Hub before installing Citizen iD there.

If the selector displays **You need to authorize additional permissions.**, complete the required Discord authorization for the same linked account.
If it displays **There are no guilds in common with the current user.**, confirm bot presence, the same linked Discord account, **Administrator**, and server visibility.

Mutual-server results are unsorted, so search the full list carefully.
After installation, allow up to five minutes for cached mutual-server state without repeated refresh.
Then refresh once and recheck.
If Asteria Hub remains absent, use private Citizen iD support instead of reinstalling blindly.

### Save Record

Select **Save changes**.
Do not navigate away while validation errors remain visible.

### Confirm Result

Confirm all of these results:

- **Manage Community** closes.
- **Citizen Community** selector shows Asteria Rescue.
- Asteria Rescue **Management** page opens.
- Saved values match the walkthrough.
- Read-only **Official Community Server** displays Asteria Hub.

Continue to [Discord Bot](/community-admins/discord-bot) for permissions, hierarchy, and the first representative-member feature test.

## Understand Hierarchy

Choose root or child structure before creating dependent records.

| Shape | Parent | Local identifier | Stored identifier | Display result |
| --- | --- | --- | --- | --- |
| Root Asteria Rescue | None | `asteria-rescue` | `asteria-rescue` | `Asteria Rescue` |
| Root Asteria Network | None | `asteria` | `asteria` | `Asteria Network` |
| Child Rescue Wing | Asteria Network | `rescue` | `asteria:rescue` | `Asteria Rescue Wing` when parent short name `Asteria` is loaded. |

### Root Community

A root has no **Parent Community**.
Only a root can become a parent.
A community with direct children cannot later become a child.

### Child Community

A child selects an existing root under **Parent Community**.
Its local identifier is combined with the parent identifier and a colon.
For parent `asteria` and local value `rescue`, Citizen iD stores `asteria:rescue`.

A child cannot become a parent, a community cannot parent itself, and the combined identifier must fit the same 40-character limit.

::: info Screenshot placement
**Purpose:** Compare root and child identifier behavior before creating a hierarchy.

**Required contents:** Show a root state with empty **Parent Community** and `asteria`, plus a child state with Asteria Network selected, visible `asteria:` prefix, editable `rescue` segment, and identifier counter.

**Crop and focus:** Focus on **Parent Community**, identifier prefix, local identifier input, and length counter in both states.

**Annotations:** Call out stored `asteria:rescue`, parent-owned prefix, editable local segment, and one-level hierarchy rule.

**Proposed caption:** Selecting Asteria Network prefixes the child identifier and stores `asteria:rescue`.

**Alt-text intent:** Communicate the difference between an empty-parent root identifier and a parent-prefixed child identifier.
:::

### Identifier Changes

Changing a root identifier rewrites direct child identifiers and Citizen iD role-name prefixes tied to the changed identifiers.
Old identifier routes stop resolving.
Old links, screenshots, support references, and instructions become stale.

Before renaming, record old and new identifiers, direct child records, role-name prefixes, links, and member instructions.
After saving, verify each direct child and update every known reference.

## Manage Staff

Grant staff only after the user consents and understands that current staff access is fully administrative.

The **Management** page shows **Community Owner** separately from **Manage community staff members**.
All current staff share the same full administrative access.
Fine-grained staff permissions are not available.

### Add Staff Member

1. Open Asteria Rescue **Management**.
2. Review the full-administrative-access warning.
3. Select **Add Staff Member**.
4. Enter the consenting user's exact Citizen iD account UUID under **User ID**.

::: info Screenshot placement
**Purpose:** Show the full-access warning and exact staff-account entry workflow.

**Required contents:** Show **Manage community staff members**, its full-administrative-access warning, **Add Staff Member**, the **Add Staff Member** dialog, **User ID**, and **Add User**.

**Crop and focus:** Focus on the warning, staff table, UUID input, and add action.

**Annotations:** Call out full-admin scope, exact UUID requirement, **Add User**, and required table verification.

**Proposed caption:** Add a consenting staff member by exact Citizen iD account UUID, then verify the table.

**Alt-text intent:** Communicate the full-access warning, exact-ID input, add control, and where successful membership is verified.
:::

Use a dedicated demo account and redact its UUID before publishing this screenshot.
Treat UUID and account identity as private operational evidence.

5. Select **Add User**.
6. Confirm the user appears in the staff table.

A valid UUID that does not resolve can close the dialog without adding a row.
Do not treat dialog closure as success.

### Verify Access

Ask the new staff member to open Asteria Rescue and verify expected administrative access.
Individual accounts show current access only.
There is no community-settings audit trail for reconstructing earlier access changes.

### Remove Staff Member

1. Select the delete action beside the intended staff member.
2. Confirm **Remove staff member from community?** names the correct person and community.
3. Select **Delete**, or select **Cancel** if any detail is wrong.
4. Confirm the removed person no longer appears in the staff table.
5. Ask the removed person to verify access is gone.

The visible flow provides no owner, self-removal, or last-staff guard to rely on.
Verify the target and remaining administrative coverage before removal.

## Change Community

Treat identifier, relationship, and server changes as operational migrations.

### Locked Fields

Internal Citizen iD administrators own **Official Relationship**.
Community administrators see it read-only.

When the value is not **No official relationship**, these fields are locked with **Contact support to change this field.**:

- **Display Name**.
- **Short Display Name**.
- **Homepage**.
- **Official Community Server**.

This relationship state does not lock **Identifier**, **Community Type**, or **Description**.

### Change Discord Server

1. Record old and new Discord server IDs.
2. Install Citizen iD in the new server.
3. Confirm the same linked Discord account has **Administrator** and can see the new server.
4. Select the new server under **Official Community Server**.
5. Select **Save changes**.
6. Confirm the read-only field shows the new server.
7. Follow [Discord Bot](/community-admins/discord-bot) to recheck permissions, hierarchy, role targets, nickname behavior, linked-role instructions, and support evidence.

One Discord server cannot be assigned to more than one community.
Do not remove the old bot setup until the new mapping and required features are verified.

### Rename Safely

Record the current identifier, child identifiers, role-name prefixes, public links, screenshots, support references, and member instructions.
Change the identifier only inside a planned migration window.
After saving, verify direct children and update every old route because old identifier routes stop resolving.

## Remove Community

Community removal is permanent and can delete related records.
Never use deletion as a troubleshooting reset.

### Review Impact

Inventory:

- Community owner and staff.
- Direct child communities.
- Community members and roles.
- Applications and authorizations.
- Bot automation and Discord mappings.
- Branding, links, and member instructions.

Prefer rename, staff removal, or Discord remapping when those actions solve the actual problem.
Deleting a parent deterministically cascades deletion to its direct child records.
The confirmation dialog does not disclose that child cascade, so inventory children before opening it.

### Confirm Removal

1. Select **Remove community** only when permanent removal is intended.
2. Confirm **Remove community and all related data?** names Asteria Rescue.
3. Read the warning that community members, roles, applications, and authorizations are removed.

::: info Screenshot placement
**Purpose:** Show the permanent removal scope and named target before the final destructive action.

**Required contents:** Show **Remove community and all related data?** naming Asteria Rescue, with related-data warning, **Delete**, and **Cancel** visible.

**Crop and focus:** Focus on the dialog title, named community, permanent effects, and both actions.

**Annotations:** Call out permanent related-data removal, separately documented child cascade, and safe **Cancel** action.

**Proposed caption:** Verify Asteria Rescue and all related-data impact before permanent deletion.

**Alt-text intent:** Communicate the named deletion target, described related-data scope, additional child-cascade warning, and confirm or cancel choices.
:::

4. Select **Delete** only after accepting the full impact.
5. Otherwise select **Cancel**.

## Troubleshoot Setup

Start with exact field, account, hierarchy, and server state before retrying.

### Server Missing

Install Citizen iD in the server before expecting it in **Official Community Server**.
Confirm the same linked Discord account, bot presence, Discord **Administrator**, and server visibility.

Handle exact selector messages:

- **You need to authorize additional permissions.** means the linked Discord account needs additional authorization.
- **There are no guilds in common with the current user.** means current mutual-server data contains no selectable server.

Allow up to five minutes for cached mutual-server state without repeated refresh, then refresh once.
Search the unsorted results fully.
If the server remains missing, contact Citizen iD through a private support path instead of reinstalling blindly.

### Save Fails

Check required fields, visible validation messages, field limits, identifier sanitization, and server uniqueness.
Confirm the stored identifier stays within 40 characters, including a child parent prefix and colon.
Do not assume dialog closure or button selection means save succeeded.

### Parent Rejected

Confirm the selected parent is a root, not a child.
Confirm the current community has no direct children, is not its own parent, and produces a combined identifier within 40 characters.

### Staff Missing

Confirm the UUID is exact and belongs to an existing consenting Citizen iD account.
If **Add User** closes the dialog, verify the staff table because unresolved valid UUIDs can fail silently.
Do not send account UUIDs through public Discord channels.

### Support Evidence

Collect privacy-safe evidence:

- Community **Identifier** and visible community name.
- Exact action and UTC time.
- Field labels, entered lengths, and validation messages.
- Parent identifier and expected stored child identifier.
- Old and new Discord server IDs for remapping.
- Exact mutual-server message.
- Whether five minutes passed and one refresh was attempted.
- Staff-table result with unrelated UUIDs redacted.
- Deletion target and known child communities.

Community settings have no admin-visible audit trail, so record before-and-after state during planned changes.
Redact account UUIDs, unrelated communities, server data, and tokens.
Use [Maintenance And Support](/community-admins/maintenance-and-support) for private escalation.
