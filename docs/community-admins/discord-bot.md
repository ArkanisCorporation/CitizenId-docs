---
title: Discord Bot
description: Bot setup, permissions, configuration tabs, and synchronization expectations.
---

# Discord Bot

Connect a community to its Discord server, verify permissions and hierarchy, then test one feature with one member before broader rollout.
This walkthrough uses the replaceable examples Asteria Rescue, Asteria Hub, and `RSI Verified`.

## Before You Start

Prepare access and choose one first outcome before changing Discord or Citizen iD.

### Confirm Admin Access

Confirm you can edit Asteria Rescue community settings in Citizen iD and administer Asteria Hub in Discord.
Discord server installation requires server-level authorization.
The **Official Community Server** selector normally requires Discord **Administrator** on the corresponding server unless an internal override applies.
Do not assume every Discord administrator can select a server until the portal control confirms access for their account.

### Choose First Feature

Choose either bot-managed **Roles** or **Nicknames** as the first feature.
Starting with one feature keeps permission, hierarchy, and result failures easier to isolate.

Use [Role Assignments](/community-admins/role-assignments) for automated Discord roles.
Use [Nickname Management](/community-admins/nickname-management) for automated server nicknames.

### Record Current State

Before changing setup, record:

- Current **Official Community Server**.
- Citizen iD bot presence in that server.
- Citizen iD bot permissions.
- Highest Citizen iD bot role and roles below it.
- First feature and representative test member.

This record gives support a before-and-after comparison if setup fails.

## Connect Your Server

Connect Asteria Rescue to Asteria Hub, then verify one feature path end to end.

### Open Community Settings

1. Open Asteria Rescue in the Community Portal.
2. Edit community settings.
3. Find **Official Community Server** and its trusted add-app control.

### Install Citizen iD

1. Use the add-app control to open Discord authorization.
2. Confirm the application name is Citizen iD.
3. Choose **Add to server**.
4. Authorize requested permissions only after confirming the application and intended server.

Do not reuse an unverified invite link.

### Select Asteria Hub

1. Select Asteria Hub in Discord's server picker.
2. Complete Discord authorization.
3. Return to Asteria Rescue community settings.
4. Select Asteria Hub from the mutual-guild list under **Official Community Server**.
5. Select **Save changes**.

Fresh installation makes Asteria Hub eligible to appear in the mutual-guild selector after Discord and portal state refresh.

::: info Screenshot placement
**Purpose:** Show the trusted Discord authorization step and exact server selection used in the walkthrough.

**Required contents:** Show the Citizen iD application identity, **Add to server**, Asteria Hub in the server picker, and requested permission summary.

**Crop and focus:** Focus on the Discord authorization card, server picker, and permission summary instead of the full browser or Discord shell.

**Annotations:** Call out application identity, installation context, selected server, and requested permissions.

**Proposed caption:** Confirm Citizen iD and Asteria Hub before authorizing the application.

**Alt-text intent:** Communicate which application is being authorized, which server receives it, and where requested permissions are reviewed.
:::

Use a demo server or redact server IDs, account details, and unrelated server names before publishing this screenshot.

### Confirm Bot Presence

Open Asteria Hub and confirm Citizen iD appears as a server member.
If Citizen iD is missing, do not continue to feature configuration.

### Check Bot Permissions

Confirm the bot has **Manage Roles** for role assignments or **Manage Nicknames** for nickname automation.
Grant only permissions required by enabled features.
Portal-tab access uses the reader's permissions separately from these bot execution permissions.

### Check Role Hierarchy

Place Citizen iD's highest bot role above every role it must assign or remove and every member whose nickname it must change.
Discord blocks targets at or above the bot's highest role and protects the server owner.

### Open Bot Configuration

1. Return to the Asteria Rescue community page.
2. Open **Bot Configuration**.
3. Confirm the selected-server label names Asteria Hub.
4. Open **Roles** or **Nicknames**.

::: info Screenshot placement
**Purpose:** Show the selected server and current feature tabs after connection succeeds.

**Required contents:** Show **Bot Configuration**, the Asteria Hub selected-server label, **General**, **Roles**, **Nicknames**, and **Moderation**, plus an unavailable state for **General** or **Moderation**.

**Crop and focus:** Focus on the configuration header, selected server, tabs, and unavailable message.

**Annotations:** Call out Asteria Hub, available **Roles** and **Nicknames** paths, and unavailable **General** and **Moderation** areas.

**Proposed caption:** Asteria Hub is selected, with Roles and Nicknames available for supported configuration.

**Alt-text intent:** Communicate the selected server, four visible tabs, and which feature areas are available or unavailable.
:::

### Test One Member

Follow the selected feature guide and test one representative non-admin member before wider rollout.
Verify the expected result in Discord.
Do not treat portal access or a successful preview as proof that Discord accepted a live role or nickname change.

## Choose Feature Path

Use the current tab state to choose a supported path without assuming unavailable areas work.

| Area | Current state | Use |
| --- | --- | --- |
| **General** | Unavailable | Displays **This feature is not yet available.** |
| **Roles** | Available with portal permission | Configure bot-managed role assignment templates, preview, resync, and audit. |
| **Nicknames** | Available with portal permission | Configure nickname template, preview, and server resync. |
| **Moderation** | Unavailable | Displays **This feature is not yet available.** |

### Role Assignments

Use [Role Assignments](/community-admins/role-assignments) to configure templates, preview representative members, review audit evidence, and request role resync.
The bot assigns these roles directly when Citizen iD rules and Discord execution checks pass.

### Nickname Management

Use [Nickname Management](/community-admins/nickname-management) to configure nickname fields, preview results, and request server nickname resync.
Discord permissions, hierarchy, owner protection, and nickname rules still control live changes.

### Linked Roles

Configure Discord linked roles in Discord **Server Settings**, not in a dedicated available Citizen iD tab.
Discord owns role requirements and member claims, while Citizen iD supplies connection metadata after member authorization.

### Unavailable Areas

**General** and **Moderation** currently display **This feature is not yet available.**
Do not plan operations around those areas until the interface changes.

## Understand Permissions

Separate portal access from Discord execution before diagnosing a locked tab or rejected action.

| Layer | Owner | Effect |
| --- | --- | --- |
| Community access | Citizen iD | Controls whether you can edit the community record and open bot configuration. |
| Server selection | Discord plus Citizen iD | Requires bot installation, server visibility, and portal selector access. |
| Tab access | Citizen iD using current Discord state | **Roles** and **Nicknames** currently check your Discord **Manage Roles** permission unless an internal override applies. |
| Bot action | Discord | Bot needs **Manage Roles** or **Manage Nicknames** for the requested action. |
| Hierarchy | Discord | Bot can affect only roles and members below its highest role. |
| Protected target | Discord | Server owner and equal-or-higher role targets remain outside bot control. |

### Portal Access

Your Discord account currently needs **Manage Roles** to open **Roles** and **Nicknames**, unless Citizen iD applies an internal override.
If you have **Manage Roles** but a tab remains locked, contact Citizen iD support because internal access state is not visible to community administrators.

The Nicknames interface may mention **Manage Nicknames**, but current portal access checks use your **Manage Roles** permission.
The bot separately needs **Manage Nicknames** for live nickname changes.

### Bot Permissions

Bot-managed role assignments require the bot's **Manage Roles** permission.
Nickname automation requires the bot's **Manage Nicknames** permission.
These bot permissions do not grant your account portal access.

### Role Hierarchy

Discord permits the bot to affect only roles and members below its highest role.
Place the Citizen iD bot role above `RSI Verified`, `Rescue Pilot`, and representative member roles it must manage.

::: info Screenshot placement
**Purpose:** Show the Discord hierarchy boundary that controls role and nickname execution.

**Required contents:** Show Discord **Server Settings** > **Roles** with the Citizen iD bot role above `RSI Verified`, `Rescue Pilot`, and representative member roles.

**Crop and focus:** Focus on the ordered role list from the Citizen iD bot role through manageable roles and the first blocked equal-or-higher region.

**Annotations:** Call out the bot's highest role, manageable roles below it, and blocked roles at or above it.

**Proposed caption:** Citizen iD can manage only roles and members below its highest Discord role.

**Alt-text intent:** Communicate the vertical role order and which roles or members fall inside or outside bot control.
:::

Use a demo server or redact unrelated role and member names before publishing this screenshot.

### Discord Protection

The bot cannot manage the server owner.
The bot also cannot manage a member whose highest role is equal to or above the bot's highest role.
Discord owns these protections even when Citizen iD configuration and preview are correct.

### Cache Timing

Recent role and permission changes may take up to five minutes to appear in **Bot Configuration** because of internal caching.
Treat five minutes as the portal reflection boundary, not a resync completion promise.
Feature preview and resync actions do not refresh this permission cache.
After five minutes, refresh the portal and recheck the selected server, reader permission, bot permission, and hierarchy.

## Configure Linked Roles

Create `RSI Verified` as an opt-in Discord linked role using Citizen iD metadata.

### Choose Claim Role

1. Open **Server Settings** in Asteria Hub.
2. Open **Roles**.
3. Choose or create `RSI Verified`.
4. Open the role's **Links** tab.

Discord owns the role, requirement set, and final member claim.

### Add Citizen iD

Add Citizen iD as the connection provider for `RSI Verified`.
Members must authorize the Citizen iD connection before Citizen iD can supply linked-role metadata.

### Set Requirements

Choose the requirement that Citizen iD reports a verified RSI account, then save the linked-role configuration.
If one linked role has multiple requirements, the member must pass all of them.

::: info Screenshot placement
**Purpose:** Show the Discord-owned linked-role requirement for the `RSI Verified` example.

**Required contents:** Show the `RSI Verified` role's **Links** tab, Citizen iD connection, verified-RSI requirement, and save control.

**Crop and focus:** Focus on the role name, connection provider, requirement editor, and save action.

**Annotations:** Call out Citizen iD as provider, verified-RSI requirement, save control, and expected member-claim outcome.

**Proposed caption:** Discord uses Citizen iD metadata to evaluate the `RSI Verified` linked-role requirement.

**Alt-text intent:** Communicate which role is configured, which provider supplies metadata, which requirement must pass, and where the configuration is saved.
:::

### Publish Instructions

Tell members:

- Which role to claim.
- Which Citizen iD account state is required.
- How to authorize the Citizen iD connection.
- Where to open Discord **Linked Roles**.
- Where to report a failed claim.

Do not describe Citizen iD bot as directly assigning this linked role.
The member opts in and claims it through Discord.

### Verify Member Claim

Test with one eligible non-admin member.
Confirm the member authorizes Citizen iD, opens Discord **Linked Roles**, and claims `RSI Verified`.
Use a non-admin because administrators may bypass channel visibility gates.

## Safe Rollout

Expand only after one supported feature works for representative members.

### Start One Feature

Enable either bot-managed roles or nicknames first.
Keep linked-role rollout separate because Discord uses a member-claim flow instead of bot assignment.

### Select Test Members

Choose one representative non-admin member for the happy path and one member near a permission, hierarchy, or account-state boundary.
Do not use the server owner as the only test because Discord protects that target.

### Notify Members

Tell members what changes, when testing starts, which account state matters, and where to report problems.
For linked roles, explain that members must authorize and claim the role themselves.

### Monitor Results

Record expected and visible Discord state for the same representative members.
Record UTC time, selected server, feature, portal state, bot permission, and hierarchy.
Use feature-specific preview, audit, or resync evidence without inventing a completion signal.

## Troubleshoot Bot Setup

Diagnose server selection and portal access before bot execution and hierarchy.

### Wrong Server

Confirm Asteria Hub is selected under **Official Community Server** and in **Bot Configuration**.
Confirm Citizen iD is installed in that same server.
If the server is absent from the selector, verify your administrator access and Discord server visibility.

### Bot Missing

Return to the trusted add-app control and confirm the Discord authorization targeted Asteria Hub.
Check Asteria Hub's member list for Citizen iD.
Do not configure automation until bot presence is confirmed.

### Tab Locked

Verify your Discord account has **Manage Roles**.
Confirm **Bot Configuration** still names Asteria Hub because tab locks inspect reader and selected-server state, not the bot's live execution permissions.
Wait up to five minutes for recent permission changes to appear, then refresh **Bot Configuration**.
If the tab remains locked, contact Citizen iD support because internal access state is not visible to community administrators.

Do not use the bot's permissions or hierarchy to diagnose your portal access.

### Action Rejected

Confirm the bot has **Manage Roles** for role changes or **Manage Nicknames** for nickname changes.
Check that the target role or member is below the bot's highest role and is not the server owner.
Then use the relevant [Role Assignments](/community-admins/role-assignments) or [Nickname Management](/community-admins/nickname-management) troubleshooting path.

### State Looks Stale

Allow up to five minutes for recent role and permission changes to appear in the portal.
Refresh **Bot Configuration** and compare its server and permission state with Discord.
Five minutes is a cache boundary, not a promise that role or nickname resync has completed.

### Support Evidence

Collect privacy-safe evidence:

- Community slug and Asteria Hub server ID.
- Selected **Official Community Server** and **Bot Configuration** server label.
- Affected feature and representative member.
- Your relevant Discord permission.
- Bot permissions and highest role position.
- Expected and visible Discord result.
- UTC time of setup, permission change, test, and resync request.
- Whether five minutes passed after the latest permission or role change.

Redact unrelated server names, member details, account data, and tokens from screenshots.
Send evidence through private support paths described in [Maintenance And Support](/community-admins/maintenance-and-support).
