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

Follow the actual product workflow:

1. Confirm the bot is installed, the official server is correct, the bot has **Manage Nicknames**, and its highest role is above members it must rename.
2. Confirm the portal administrator can open the **Nicknames** tab.
3. Explain that the current portal can require the administrator to have Discord role-management authority even though Discord nickname execution requires **Manage Nicknames**.
4. Choose a quiet support window because adding, removing, reordering, or formatting a field saves that configuration immediately.
5. Open the community Discord bot configuration and select **Nicknames**.
6. Under **RSI Account**, add **Username (Handle/IGN)** to **Naming template** with the plus control.
7. Explain that the selected field is now persisted and can affect new joins or later nickname-refresh events before the server-wide resync.
8. Enter Alex's Discord user ID under **Example Discord user ID**.
9. Confirm **Result parts** shows Alex's resolved handle and **Final result** shows `AlexRsi`.
10. Check one member with a verified RSI profile and one linked member without usable RSI handle data.
11. Select **Re-sync on server** only after the previewed results match the policy.
12. In **Re-sync User Nicknames**, confirm that `Asteria Hub` is named, then select **Re-sync**.
13. Confirm Alex's live Discord nickname after processing completes.

State clearly that the template editor has no separate draft or final-save step.
Every field add, remove, reorder, and formatting save changes the stored template immediately.
The server-wide resync is a separate action that asks Citizen iD to process all members and may take time.
New joins and other nickname-refresh events can use the stored template before that resync.

## Example Results

Use a compact matrix to demonstrate the first template.

| Member state | Resolved template | Expected result |
| --- | --- | --- |
| Linked account with verified RSI handle `AlexRsi` | `AlexRsi` | Discord nickname becomes `AlexRsi`. |
| Linked account without usable RSI handle data | Empty | Citizen iD falls back to the member's global Discord display name or username. |
| No linked Citizen iD account | Not evaluated | Citizen iD falls back to the member's global Discord display name or username. |
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
- **Org And Handle** places **Spectrum ID** before **Username (Handle/IGN)** and uses formatting to produce `[ASTRA] AlexRsi`; when the organization field is missing, its own prefix and suffix are omitted and the handle remains.

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
A missing RSI or organization value omits that field and its formatting.
If all selected fields produce no content, or no template fields exist, Citizen iD falls back to the member's global Discord display name or username.
The final composed nickname is limited to 32 characters.

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
Request a screenshot of **Nicknames** with **Username (Handle/IGN)** selected under **Naming template**, Alex's Discord user ID in **Example Discord user ID**, `AlexRsi` under **Result parts**, and `AlexRsi` under **Final result**.
Focus on the template and preview grid instead of the full application shell.
Request callouts for the selected field, test-user input, resolved part, and final result.

### Formatting Placement

Place the formatting block under **Prefix And Suffix**.
Request a screenshot of **Text Embed Format Options** for the **Spectrum ID** field configured with prefix `[` and suffix `] `.
Require **Content Casing**, **Normalize content before formatting**, **Preview content**, formatted preview, and **Save changes** to be visible.
Focus on settings that explain `[ASTRA] ` before the handle.

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
Confirm that missing values omit their fields, empty composed results fall back, and generated nicknames are limited to 32 characters.
Confirm that no screenshot, generated illustration, or Mermaid diagram remains on the page.
