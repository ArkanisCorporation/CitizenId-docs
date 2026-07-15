---
title: Nickname Management
description: Template-based Discord nickname automation for communities.
---

# Nickname Management

Configure, preview, roll out, and verify automated Discord nicknames for your community.
This walkthrough configures Asteria Rescue to use each linked member's verified RSI handle as their nickname in Asteria Hub.
Asteria Rescue, Asteria Hub, Alex, and `AlexRsi` are replaceable examples; use your own community, server, test member, and expected handle.

## Before You Start

Prepare the Discord permissions, naming policy, and rollout window before changing the template.

### Required Setup

Confirm all of these prerequisites:

- Citizen iD is installed in the official Asteria Hub server.
- The Citizen iD bot has **Manage Nicknames**.
- The bot's highest role is above every member role it must rename.
- You can open the Asteria Rescue community's Discord bot configuration and its **Nicknames** tab.

The portal administrator may also need Discord role-management authority to open the **Nicknames** tab, even though the bot uses **Manage Nicknames** to apply nicknames.
Discord prevents bots from changing the server owner's nickname and from managing members at or above the bot's highest role.

### Choose Naming Policy

Write the policy in one sentence before configuring it.
For this walkthrough, use: “Use each linked member's verified RSI handle as their Asteria Hub nickname.”

The selected field is **Username (Handle/IGN)** under **RSI Account**.
Alex is the example member, `AlexRsi` is Alex's verified RSI handle, and `AlexRsi` is the expected nickname.

### Understand Live Changes

Choose a quiet production support window before opening the editor.

::: warning Changes persist immediately
The template editor has no separate draft or final-save step.
Adding, removing, or reordering a field changes the stored template immediately, and saving field formatting does the same.
New joins and other nickname-refresh events can use the changed template before you run a server-wide re-sync.
:::

**Re-sync on server** is a separate action that asks Citizen iD to process every server member and may take time.

## Set First Template

Build and verify the RSI-handle template before applying it server-wide.

### Open Nicknames

1. Open the Asteria Rescue community in the Citizen iD portal.
2. Open its Discord bot configuration for Asteria Hub.
3. Select **Nicknames**.

If the tab reports a permission problem, confirm both the portal administrator's role-management authority and the bot's nickname permissions and role position.

### Select RSI Handle

Under **RSI Account**, use the plus control to add **Username (Handle/IGN)** to **Naming template**.
The field is stored immediately and may affect nickname-refresh events from this point onward.

### Preview Member

Enter Alex's Discord user ID in **Example Discord user ID**.
Use a member whose Discord account is linked to Citizen iD and whose verified RSI handle is `AlexRsi`.
Wait for **Result parts** and **Final result** to populate before evaluating the preview.
If they do not populate, use [Preview Fails](#preview-fails) instead of starting a re-sync.

::: info Screenshot placement
**Purpose:** Show the complete RSI-handle template and Alex preview used in the walkthrough.

**Required contents:** Show **Nicknames**, **Username (Handle/IGN)** selected under **Naming template**, a safe demo Discord user ID in **Example Discord user ID**, `AlexRsi` under **Result parts**, and `AlexRsi` under **Final result**.
Use a dedicated demo account or redact the Discord user ID before publication.

**Crop and focus:** Crop to the naming template and preview grid rather than the full application shell.

**Annotations:** Call out the selected field, test-user input, resolved result part, and final result.

**Proposed caption:** Asteria Hub's RSI-handle template resolves Alex's linked account to `AlexRsi` before re-sync.

**Alt-text intent:** Communicate which field is selected, where the example Discord user ID is entered, and how `AlexRsi` appears in both preview outputs.
:::

### Check Results

Confirm **Result parts** shows Alex's resolved handle and **Final result** shows `AlexRsi`.
Then preview one member with a verified RSI profile and one linked member without usable RSI handle data.

A correct **Final result** proves template composition, not Discord execution.
Discord permissions, role hierarchy, owner protection, and name validation still determine whether the live nickname changes.

### Resync Server

Before the first live re-sync, confirm:

- Representative test members cover a verified handle and the expected fallback.
- Members received notice of the naming change.
- Support or moderation coverage is available during rollout.
- The bot has **Manage Nicknames** and a role above the members it must rename.
- Both previews match the expected results, including fallback.

See [Safe Rollout](#safe-rollout) for the full rollout sequence.
Select **Re-sync on server** only after this checklist passes.
In **Re-sync User Nicknames**, confirm the dialog names `Asteria Hub` and explains the server-wide scope.

::: info Screenshot placement
**Purpose:** Show the separate confirmation required to apply a stored template across the server.

**Required contents:** Show **Re-sync User Nicknames** naming `Asteria Hub`, with the server-wide warning and both **Re-sync** and **Cancel** visible.

**Crop and focus:** Focus on the server name, scope warning, and dialog actions.

**Annotations:** Call out that template edits are already stored and that **Re-sync** starts a separate server-wide operation.

**Proposed caption:** Confirm Asteria Hub before starting the separate server-wide nickname re-sync.

**Alt-text intent:** Communicate the named server, the operation's server-wide scope, and the available confirm and cancel actions.
:::

Select **Re-sync**.

### Confirm Result

Allow processing time, then inspect Alex and the other representative members in Asteria Hub.
Confirm Alex's live Discord nickname is `AlexRsi`.
If the preview was correct but the live nickname is unchanged, continue to [Nickname Unchanged](#nickname-unchanged).

## Understand Results

Use the preview and live Discord state together to distinguish composition results from execution results.
The community administrator owns the naming policy, template, and re-sync decision.
The member owns account linking, preferred names, and privacy choices; Citizen iD resolves available data, composes the nickname, and attempts the update; Discord accepts or rejects the live change.

| Member state | Resolved template | Expected result |
| --- | --- | --- |
| Linked account with verified RSI handle `AlexRsi` | `AlexRsi` | Discord nickname becomes `AlexRsi`. |
| Linked account without usable RSI handle data | Empty | Citizen iD falls back to the member's global Discord display name or username. |
| No linked Citizen iD account | Not evaluated | Citizen iD falls back to the member's global Discord display name or username. |
| Handle longer than the remaining limit | Truncated | Citizen iD limits the generated nickname to 32 characters and may append an ellipsis. |
| Bot lacks permission or hierarchy | `AlexRsi` | Preview can be correct while the live Discord nickname remains unchanged. |
| Member is the server owner | `AlexRsi` | Discord prevents the bot from changing the nickname. |

### Available Fields

Nickname fields can resolve from Citizen iD account data, verified RSI account data, and RSI primary organization data.
Choose fields whose ownership and privacy requirements match the community's naming policy.

### Missing Fields

A missing value omits that field and its own prefix and suffix.
For example, an unavailable organization does not leave empty brackets before a valid handle.

If every selected field produces no content, or no template fields exist, Citizen iD falls back to the member's global Discord display name or username.
A member without a linked Citizen iD account receives the same fallback.

### Length Limits

Citizen iD limits the final composed nickname to Discord's 32-character maximum and may append an ellipsis when truncating it.
Preview long real-world values before rollout because formatting consumes part of that limit.
See Discord's [user-name restrictions](https://docs.discord.com/developers/resources/user#usernames-and-nicknames) for the platform rules.

### Discord Rejections

Discord owns live nickname acceptance.
A correct preview can still be rejected when the bot lacks **Manage Nicknames**, its role is not high enough, the member is the server owner, or the final name violates Discord rules.
See Discord's [guild member modification](https://docs.discord.com/developers/resources/guild#modify-guild-member) and [permission hierarchy](https://docs.discord.com/developers/topics/permissions#permission-hierarchy) references for these boundaries.

### Update Timing

Template edits persist as they are made, but existing members are not necessarily updated at the same moment.
New joins and other refresh events may use the stored template before a manual re-sync.
A server-wide re-sync processes separately and may take time to finish.

## Common Templates

Use these recipes as starting points, then preview representative members before rollout.

### RSI Handle

**Goal:** Apply a verified RSI handle where available.

**Fields and formatting:** Add **Username (Handle/IGN)** with no prefix or suffix.

**Result:** Alex becomes `AlexRsi`.

**Missing data:** An empty composition falls back to the member's global Discord display name or username.

**Policy caveat:** Members must link and verify the expected RSI account for the handle to resolve, and Discord must permit the live update.

**Verify:** Preview a member with a verified handle and one without usable handle data.

### Preferred Name

**Goal:** Let a member's preferred server or account name influence their nickname.

**Fields and formatting:** Add **Preferred Display Name (Guild/Account)** with no prefix or suffix.

**Result:** Alex's configured preferred name becomes the nickname, with fallback through account or Discord display values when needed.

**Missing data:** Citizen iD uses the available account or Discord display fallback.

**Policy caveat:** Member-controlled names require a documented naming policy and moderation path.

**Verify:** Preview a member with a server preference and one using a fallback value.

Members set a server preference with `/account set-display-name server-display-name:<YOUR_DISPLAY_NAME>`.
Members remove it with `/account unset-display-name server-display-name:true`.
See [Discord Integrations](/players/discord-integrations#player-commands) for player command context.

### Name And Handle

**Goal:** Show a preferred name followed by a verified handle.

**Fields and formatting:** Place **Preferred Display Name (Guild/Account)** first, then **Username (Handle/IGN)**, and format the handle with prefix ` [` and suffix `]`.

**Result:** Alex becomes `Alex [AlexRsi]`.

**Missing data:** Each unavailable field and its formatting are omitted; an entirely empty composition uses the Discord fallback.

**Policy caveat:** The preferred name is member-controlled and needs a documented moderation path.

**Verify:** Preview members with both values and with either value missing.

### Org And Handle

**Goal:** Show primary organization context before the verified handle.

**Fields and formatting:** Place **Spectrum ID** first with prefix `[` and suffix `] `, then add **Username (Handle/IGN)** without formatting.

**Result:** An `ASTRA` Spectrum ID and `AlexRsi` handle produce `[ASTRA] AlexRsi`.

**Missing data:** If **Spectrum ID** is missing, its brackets and trailing space are omitted and `AlexRsi` remains.

**Policy caveat:** Organization membership data can change and may not be available for every member.

**Verify:** Preview members with and without a usable Spectrum ID.

## Safe Rollout

Roll out in a quiet window so administrators can observe changes and help affected members.

### Select Test Members

Choose a small set covering linked and unlinked accounts, present and missing fields, long values, elevated roles, and an ordinary member.
Do not use the server owner as the only test because Discord always protects that nickname.

### Notify Members

Tell members what policy will be enforced, which account data supplies the nickname, when rollout begins, and where to report a mismatch.
If preferred names are allowed, publish the naming and moderation policy before enabling that recipe.

### Configure Quietly

Make template edits during the announced quiet support window.
Keep an administrator available because edits persist immediately and refresh events can use them before re-sync.

### Run Resync

Preview every test state first.
Then use **Re-sync on server**, confirm the correct server in **Re-sync User Nicknames**, and select **Re-sync** once.

### Monitor Results

Check the test members in Discord as processing proceeds.
Record the UTC start time, expected result, visible result, and any permission or hierarchy pattern without collecting private account details.

## Troubleshoot Nicknames

Start with the preview, then inspect Discord execution conditions and timing.
Nickname management currently has no community-admin-visible audit log, so the preview and visible server state are the primary evidence.

### Preview Fails

Confirm the example value is the member's Discord user ID and that the member linked the expected Discord account to Citizen iD.
Check whether the selected account, RSI, or organization field exists and is available under the member's privacy settings.
The admin preview may not distinguish absent data from data hidden by a member's privacy choice, so do not infer which state applies.
Do not ask the member to relax privacy settings to diagnose the preview.
Remember that a missing field omits its own formatting and an entirely empty composition uses the Discord fallback.

### Nickname Unchanged

If **Final result** is correct but Discord is unchanged, check the bot's **Manage Nicknames** permission and highest role position.
Confirm the member is not the server owner and does not have a role at or above the bot's highest role.
The preview proves composition only; it does not prove Discord execution.

### Wrong Nickname

Verify the template field order, prefixes, suffixes, and the account linked to the affected Discord user.
For **Preferred Display Name (Guild/Account)**, confirm whether a server preference, account preference, or Discord display fallback supplied the value.
Re-preview the affected member before running another server-wide re-sync.

### Unexpected Truncation

Count formatting as part of the 32-character final nickname limit.
Preview the longest likely preferred names, organization IDs, and handles.
Shorten formatting or remove a lower-priority field if important text is being truncated.

### Resync Delayed

A server-wide re-sync may take time and is separate from saving the template.
Confirm the correct server was selected, allow processing time, and inspect several ordinary members before retrying.
If they remain unchanged, check permissions, hierarchy, and owner protection before deciding the re-sync failed.
Avoid repeated re-sync requests while the first operation may still be processing.

### Support Evidence

Collect privacy-safe evidence before contacting support:

- Community slug and Discord server name.
- Affected member's Discord user ID.
- Selected fields, order, prefixes, suffixes, and casing.
- **Result parts** and **Final result** from the preview.
- Expected and visible live nickname.
- UTC time of the preview and re-sync.
- Whether re-sync was attempted and whether other members changed.
- Bot permission, role hierarchy, and server-owner checks.

Do not ask members to post private Citizen iD, RSI, or organization data in a public Discord channel.
Send evidence through the private escalation path, include only fields needed to diagnose the mismatch, and redact unrelated values from screenshots.
Do not ask members to disclose hidden data or relax privacy settings for support.
There is no admin-visible nickname audit log to attach.
Use [Maintenance And Support](/community-admins/maintenance-and-support) for escalation paths.

## Advanced Formatting

Use formatting to make multi-field names readable without obscuring missing-field behavior or the 32-character limit.

### Prefix And Suffix

Prefixes and suffixes belong to their field and disappear when that field is missing.
For `[ASTRA] AlexRsi`, configure **Spectrum ID** with prefix `[` and suffix `] ` before **Username (Handle/IGN)**.

::: info Screenshot placement
**Purpose:** Show exactly how the organization field produces `[ASTRA] ` before the handle.

**Required contents:** Show **Text Embed Format Options** for **Spectrum ID** with prefix `[`, suffix `] `, **Content Casing**, **Normalize content before formatting**, **Preview content**, the formatted preview, and **Save changes** visible.

**Crop and focus:** Focus on the settings that transform `ASTRA` into `[ASTRA] ` rather than the full application shell.

**Annotations:** Call out the prefix, suffix including its trailing space, preview input, formatted preview, and immediate **Save changes** action.

**Proposed caption:** Spectrum ID formatting adds brackets and a trailing space before the RSI handle.

**Alt-text intent:** Communicate the prefix and suffix values, relevant normalization and casing controls, the formatted preview, and where the immediate save occurs.
:::

Formatting saves persist immediately, so preview again after every change.

### Content Casing

Use **Content Casing** only when the community policy requires consistent capitalization.
Test real organization IDs and names because casing changes can reduce recognizability.

### Field Ordering

The template resolves fields from top to bottom.
Put the policy's most important identifier first when truncation could occur, and re-preview after every reorder because the change persists immediately.

### Empty Results

Missing fields omit their own content, prefix, and suffix.
If all selected fields are missing, or no fields are configured, Citizen iD uses the member's global Discord display name or username.
Preview missing-data cases so fallback names do not surprise moderators.

### Enforcement Behavior

Citizen iD can restore the configured nickname after a member changes it manually during a later refresh event.
Explain in server rules whether the format is optional, recommended, or enforced.
Discord still owns permission, hierarchy, owner, validation, and 32-character constraints for every attempted update.
