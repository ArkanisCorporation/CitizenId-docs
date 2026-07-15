# Nickname Management Operational Guide Design

## Goal

Rework the Nickname Management page into an operational guide that helps a community administrator configure, preview, roll out, verify, and troubleshoot server nickname automation.
Keep reference material available after the main workflow instead of leading with implementation details.

## Audience

The primary reader is a community administrator configuring nickname automation for the first time.
The reader understands their Discord server naming policy but may not understand Citizen iD fields, formatting, fallback behavior, live configuration changes, or Discord permission boundaries.
Support moderators are a secondary audience who need predictable result states and privacy-safe evidence guidance.

## Design Direction

Use a walkthrough-first structure consistent with the Role Assignments operational guide.
Lead with one deterministic RSI-handle configuration, then explain result states, secondary recipes, rollout guidance, troubleshooting, and advanced formatting.
Use the fictional Asteria Rescue community and Asteria Hub server consistently.
Use a production-safe rollout during a quiet support window instead of requiring a separate test server.

## Heading Constraint

Keep outline headings to three or four words where practical.
Prefer exact product terms over shorter but ambiguous labels.
Verify the rendered outline at desktop and narrow viewport widths before considering the page complete.

Use this heading structure:

```markdown
# Nickname Management

## Before You Start

### Required Setup
### Choose Naming Policy
### Understand Live Changes

## Set First Template

### Open Nicknames
### Select RSI Handle
### Preview Member
### Check Results
### Resync Server
### Confirm Result

## Understand Results

### Available Fields
### Missing Fields
### Length Limits
### Discord Rejections
### Update Timing

## Common Templates

### RSI Handle
### Preferred Name
### Name And Handle
### Org And Handle

## Safe Rollout

### Select Test Members
### Notify Members
### Configure Quietly
### Run Resync
### Monitor Results

## Troubleshoot Nicknames

### Preview Fails
### Nickname Unchanged
### Wrong Nickname
### Unexpected Truncation
### Resync Delayed
### Support Evidence

## Advanced Formatting

### Prefix And Suffix
### Content Casing
### Field Ordering
### Empty Results
### Enforcement Behavior
```

## Main Walkthrough

Configure the policy “Use each linked member's verified RSI handle as their Asteria Hub nickname.”

Use these example names:

- Community: `Asteria Rescue`.
- Discord server: `Asteria Hub`.
- Selected field: **Username (Handle/IGN)** under **RSI Account**.
- Example member: Alex.
- Alex's verified RSI handle: `AlexRsi`.
- Expected Discord nickname: `AlexRsi`.

State that these names are replaceable examples.

Follow the actual product workflow:

1. Confirm Asteria Hub is linked to the community, the portal administrator has Discord **Manage Roles** unless an internal override exists, the bot has **Manage Nicknames**, and its highest role is above members it must rename.
2. Explain that administrator **Manage Roles** controls portal access while bot **Manage Nicknames** and hierarchy control live execution.
3. Choose a quiet support window because adding, removing, reordering, or formatting a field saves that configuration immediately.
4. Before editing, record selected fields, left-to-right order, and every field's formatting because there is no undo or export and restoration is manual.
5. Open the community Discord bot configuration and select **Nicknames**.
6. Remove existing selected fields, then add only **Username (Handle/IGN)** under **RSI Account**.
7. Leave prefix and suffix blank, use **Original** casing, and turn **Normalize content before formatting** off.
8. Explain that changes are persisted and can affect new joins or later nickname-refresh events before server-wide resync.
9. Explain how to enable Discord desktop Developer Mode and use **Copy User ID**, linking the official Discord ID article.
10. Enter Alex's Discord user ID under **Example Discord user ID** and confirm **Result parts** and **Final result** show `AlexRsi`.
11. For fallback preview, use a dedicated linked demo member without a verified RSI profile, then confirm empty **Result parts** and a **Final result** of global Discord display name when present, otherwise username.
12. State that an unlinked Discord user ID errors in preview and cannot demonstrate fallback.
13. Before re-sync, notify members, arrange support coverage, check permissions and hierarchy, record UTC start, and set a local observation deadline such as 15 minutes that is explicitly not an SLA.
14. Select **Re-sync on server** only after representative results, including fallback, match expectations.
15. In **Re-sync User Nicknames**, confirm that `Asteria Hub` is named, then select **Re-sync**.
16. State that server-wide re-sync requests processing for human server members while bots and webhooks are skipped.
17. Explain that some failures can stop processing before every human member is reached, so the guide must not promise all humans are processed.
18. Explain that re-sync has no completion signal or admin-visible audit entry.
19. Until the observation deadline, inspect the same representative members and do not start another re-sync while changes appear.
20. At the deadline, troubleshoot or escalate with UTC time and evidence instead of waiting indefinitely or retrying blindly.

State clearly that the template editor has no separate draft or final-save step.
Every field add, remove, reorder, and formatting save changes the stored template immediately.
The server-wide resync is a separate action that requests processing for human server members and may take time.
Bots and webhooks are skipped.
Some failures can stop processing before every human member is reached, so never promise all humans are processed.
New joins and other nickname-refresh events can use the stored template before that resync.

## Example Results

Use a compact matrix to demonstrate the first template.

| Member state | Resolved template | Expected result |
| --- | --- | --- |
| Linked account with verified RSI handle `AlexRsi` | `AlexRsi` | Discord nickname becomes `AlexRsi` if Discord accepts the update. |
| Linked account without verified RSI profile | **Result parts** is empty; **Final result** is global Discord display name, else username. | Citizen iD expects the fallback, but an existing custom server nickname may remain unchanged. |
| No linked Citizen iD account | Preview errors; live composition expects global Discord display name, else username. | An existing custom server nickname may remain unchanged. |
| Handle longer than the remaining limit | Truncated | Citizen iD limits the generated nickname to 32 characters and may append an ellipsis. |
| Bot lacks permission or hierarchy | `AlexRsi` | Preview can be correct while the live Discord nickname remains unchanged. |
| Member is the server owner | `AlexRsi` | Discord prevents the bot from changing the nickname. |

Explain that a correct **Final result** proves template composition, not Discord execution.
Discord permission, role hierarchy, owner protection, and name validation still control the live update.

## Supporting Recipes

Keep each recipe shorter than the main walkthrough.
Give each recipe a goal, exact field order and formatting, representative result, missing-data behavior, policy caveat, and verification step.

Include these recipes:

- **RSI Handle** uses **Username (Handle/IGN)** and produces `AlexRsi`.
- **Preferred Name** uses **Preferred Display Name (Guild/Account)** and allows a member's server preference to influence the result, with fallback to account or Discord display values.
- **Name And Handle** places **Preferred Display Name (Guild/Account)** before **Username (Handle/IGN)** and uses formatting to produce a result such as `Alex [AlexRsi]`.
- **Org And Handle** places **Spectrum ID** before **Username (Handle/IGN)** and uses formatting to produce `[ASTRA] AlexRsi`; when the organization field is null, its own prefix and suffix are omitted and the handle remains.

Warn that member-controlled display names require a documented naming policy and moderation path.
Explain the exact player commands for setting and removing a server preference.
Use `/account set-display-name server-display-name:<YOUR_DISPLAY_NAME>` to set it.
Use `/account unset-display-name server-display-name:true` to remove it, matching the current Boolean command parameter.

## Result Boundaries

Separate template composition from Discord execution throughout the page.
The example user preview resolves account data and shows the generated nickname.
It does not prove that Discord will accept the update.
The current nickname workflow has no community-admin audit view equivalent to the Role Assignments audit log.
Troubleshooting therefore uses the template preview, visible Discord state, permissions, hierarchy, UTC time, and safe member context.

Distinguish a missing field from an empty template result.
A missing or null RSI or organization value omits that field and its formatting.
An empty string can still emit its prefix or suffix, so representative previews are required.
If all selected values are null, no template fields exist, or no account is linked, composition uses global Discord display name when present, otherwise username.
Live sync compares that fallback with the non-guild display name and may leave an existing custom server nickname unchanged.
Do not promise that fallback clears or resets a custom server nickname.
An unlinked ID errors in preview, so use a dedicated linked demo member without a verified RSI profile to preview fallback.
Nickname preview and resolution do not consult public-discovery or privacy settings.
Warn that configured RSI and organization fields may become public Discord nickname content and must be chosen deliberately.
Portal access requires administrator **Manage Roles** unless an internal override exists; live execution separately requires bot **Manage Nicknames** and sufficient hierarchy.
**Content Casing** is currently ineffective because its transformed string is discarded.
**Normalize content before formatting** works and lowercases content.
Field order is left to right and may wrap visually on narrow screens.
The final composed nickname is limited to 32 characters.

## Implementation Evidence

The behavior in this design was verified on 2026-07-15 against the clean sibling repository `D:/Git/github/ArkanisCorporation/CitizenId` at commit `330f1477ad58f0afee38be62652acc94707a2a38`.
Recheck these limitations whenever the application changes.

- `src/CitizenId.Host.Web/Components/DiscordBotNicknameManagementControlsTabPanel.razor` establishes the **Nicknames** access control, product labels, **Re-sync on server** workflow, and lack of a portal progress or completion display.
- `src/CitizenId.Host.Web/Components/DiscordBotNicknameTemplateControls.razor` establishes immediate persistence for field additions, removals, and ordering, plus preview errors for invalid or unlinked Discord user IDs.
- `src/CitizenId.Host.Web/Components/DiscordBotNicknameUserInfoField.razor` and `src/CitizenId.Host.Web/Components/Dialogs/TextEmbedFormatOptionsDialog.razor` establish per-field formatting access, the formatting controls, and **Save changes** persistence.
- `src/CitizenId.Infrastructure/Data/Repositories/DiscordNicknameManagementRepository.cs` establishes stored fields, nickname composition, no-account, no-field, and all-null fallback, and the 32-character limit.
  Together with the editor components, it shows that the current workflow has no separate draft or final-save stage.
- `src/CitizenId.Infrastructure/Models/UserInfoField.cs` establishes the available nickname field model and formatting metadata.
- `src/CitizenId.Infrastructure/Services/UserInfoFieldValueProviders.cs` establishes the concrete field-resolution chains, their null results, and the absence of public-discovery or privacy checks in those providers.
- `src/CitizenId.Domain/Helpers/TextEmbedFormatting.cs` establishes null-field formatting omission, empty-string formatting behavior, working lowercase normalization, and the current discarded casing transformation.
- `src/CitizenId.Host.Discord/EventHandlers/UserNicknameSyncHandler.cs` establishes live comparison that causes the custom-server-nickname fallback limitation, Discord execution, skipped bots and webhooks, early abort before every human member is reached, and server-side logging.
- `src/CitizenId.Host.Gateway/DiscordBotHub.cs` and `src/CitizenId.Host.Discord/DiscordBotHubProviderForBot.cs` forward the nickname-refresh request without returning portal progress or a completion result.
  Together with the tab panel, they establish the current lack of a portal completion UI or signal.
- `src/CitizenId.Host.Discord/Modules/AccountModule.cs` establishes `/account set-display-name server-display-name:<YOUR_DISPLAY_NAME>` and `/account unset-display-name server-display-name:true`.

At the pinned commit, repository-wide verification with `rg -n -i "nickname.*audit|audit.*nickname" src -g "*.cs" -g "*.razor"` returned no matches, while `UserNicknameSyncHandler.cs` records server logs only.
This is evidence that no admin-visible nickname audit was found at that commit, not proof beyond the pinned revision.

## Public Inspiration

Use the [Kubernetes Tasks](https://kubernetes.io/docs/tasks/) documentation pattern as structural inspiration.
It leads with one concrete task, gives an ordered procedure, and keeps conceptual depth after the successful path.
Use the official [Discord user-name restrictions](https://docs.discord.com/developers/resources/user#usernames-and-nicknames), [guild member modification](https://docs.discord.com/developers/resources/guild#modify-guild-member), and [permission hierarchy](https://docs.discord.com/developers/topics/permissions#permission-hierarchy) references as the authority for nickname length, **Manage Nicknames**, and hierarchy boundaries.

## Visual Placements

Do not create or embed new screenshots or illustrations in this change.
Remove the current conceptual Mermaid diagram and prose-only screenshot notes.
Insert rendered VitePress information containers where future screenshots are needed.
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

### Template Placement

Place the template block after Alex is loaded in the main walkthrough.
Request a screenshot of **Nicknames** with **Username (Handle/IGN)** selected under **Naming template**, a safe demo Discord user ID in **Example Discord user ID**, `AlexRsi` under **Result parts**, and `AlexRsi` under **Final result**.
Require a dedicated demo account or ID redaction before publication.
Focus on the template and preview grid instead of the full application shell.
Request callouts for the selected field, test-user input, resolved part, and final result.

### Formatting Placement

Place the formatting block under **Prefix And Suffix**.
Request a screenshot of **Text Embed Format Options** for the **Spectrum ID** field configured with prefix `[` and suffix `] `.
Require **Content Casing**, **Normalize content before formatting**, **Preview content**, formatted preview, and **Save changes** to be visible.
Focus on settings that explain `[ASTRA] ` before the handle.
Annotate that **Content Casing** is currently ineffective while **Normalize content before formatting** lowercases content and works.

### Resync Placement

Place the resync block immediately before the final confirmation step.
Request a screenshot of **Re-sync User Nicknames** naming `Asteria Hub`, with **Re-sync** and **Cancel** visible.
Focus on the server name and server-wide scope warning.
Request a callout that distinguishes saved template changes from the separate server-wide resync.

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
Use one first-time community administrator to check whether the walkthrough can be followed without prior nickname-template knowledge.
Use one support moderator to check ownership boundaries, privacy-safe evidence guidance, missing-field and fallback behavior, permission diagnosis, and the lack of an admin-visible audit trail.
Resolve terminology and comprehension findings before the visual audit.

## Verification

Build the documentation site after the page rewrite.
Inspect the rendered page at desktop light, desktop dark, and mobile viewport widths.
Confirm that tables remain readable and the placement blocks render as intentional authoring placeholders.
Confirm that outline labels remain concise and do not wrap excessively.
Confirm that every product label matches the current Nicknames interface and resync dialog.
Confirm that the walkthrough explains immediate template persistence before using **Re-sync on server**.
Confirm that null values omit their fields and formatting, empty strings may emit formatting, composition fallback is global Discord display name then username, and generated nicknames are limited to 32 characters.
Confirm that unlinked preview IDs error and live fallback may preserve an existing custom server nickname.
Confirm that no privacy-setting dependency, casing behavior, completion signal, or all-member resync is promised.
Confirm that no screenshot, generated illustration, or Mermaid diagram remains on the page.
