# Discord Bot Operational Guide Design

## Goal

Rework the Discord Bot page into an operational guide that helps a community administrator install the official app, connect the correct server, verify permissions and hierarchy, choose a supported feature, test one member, and diagnose failures.
Keep detailed role and nickname configuration on their existing pages.

## Audience

Primary reader is a community administrator performing first setup or repairing a broken integration.
Reader may understand Discord administration but not Citizen iD ownership boundaries, portal caching, or difference between bot-managed automation and Discord linked roles.
Support moderators are secondary readers who need a predictable evidence checklist.

## Design Direction

Use walkthrough-first structure consistent with Role Assignments and Nickname Management guides.
Use fictional Asteria Rescue community and Asteria Hub server.
Lead to one verified outcome: Citizen iD app installed in Asteria Hub, Asteria Hub selected as official server, required bot permissions and hierarchy confirmed, one supported feature opened, one representative member tested.
Treat this page as integration setup and feature routing, not duplicate role or nickname manuals.

Use Discord's official Linked Roles admin guide as pattern inspiration for task-first setup, concrete server paths, and separate admin/member responsibilities.
Use Discord's official roles guide for hierarchy language.
Use Discord's developer documentation only to explain server installation authorization.

## Heading Constraint

Keep outline headings to three or four words where practical.
Use this structure:

```markdown
# Discord Bot

## Before You Start

### Confirm Admin Access
### Choose First Feature
### Record Current State

## Connect Your Server

### Open Community Settings
### Install Citizen iD
### Select Asteria Hub
### Confirm Bot Presence
### Check Bot Permissions
### Check Role Hierarchy
### Open Bot Configuration
### Test One Member

## Choose Feature Path

### Role Assignments
### Nickname Management
### Linked Roles
### Unavailable Areas

## Understand Permissions

### Portal Access
### Bot Permissions
### Role Hierarchy
### Discord Protection
### Cache Timing

## Configure Linked Roles

### Choose Claim Role
### Add Citizen iD
### Set Requirements
### Publish Instructions
### Verify Member Claim

## Safe Rollout

### Start One Feature
### Select Test Members
### Notify Members
### Monitor Results

## Troubleshoot Bot Setup

### Wrong Server
### Bot Missing
### Tab Locked
### Action Rejected
### State Looks Stale
### Support Evidence
```

## Main Walkthrough

Use exact current product path and labels where visible.

1. Confirm reader can administer Asteria Hub and edit Asteria Rescue community settings.
2. Choose either **Roles** or **Nicknames** as first bot-managed feature.
3. Record current official server, bot role position, and bot permissions before changing setup.
4. Open Asteria Rescue community settings and edit **Official Community Server**.
5. Use Citizen iD's add-app control to open Discord's authorization flow.
6. Confirm Citizen iD application name and choose **Add to server** for Asteria Hub.
7. Authorize requested permissions only after checking application and server.
8. Return to community settings, select Asteria Hub under **Official Community Server**, and save.
9. Confirm Citizen iD appears in Asteria Hub.
10. Confirm bot has **Manage Roles** for role assignments or **Manage Nicknames** for nickname automation.
11. Place Citizen iD's highest bot role above roles it must assign and members it must rename.
12. Open **Bot Configuration** and confirm selected-server label names Asteria Hub.
13. Open **Roles** or **Nicknames**.
14. Follow corresponding operational guide and test one representative member before broader rollout.

State that Discord server installation requires server-level authorization.
Do not claim every Discord administrator can select the server in Citizen iD unless the portal control confirms their account has required access.
State that current community settings selector says user must be an administrator on corresponding server.

## Feature Routing

Explain four visible tabs accurately.

| Area | Current state | Use |
| --- | --- | --- |
| **General** | Unavailable | Displays **This feature is not yet available.** |
| **Roles** | Available with portal permission | Configure bot-managed role assignment templates, preview, resync, and audit. |
| **Nicknames** | Available with portal permission | Configure nickname template, preview, and server resync. |
| **Moderation** | Unavailable | Displays **This feature is not yet available.** |

Route **Roles** and **Nicknames** to existing operational pages.
Explain that Discord linked roles are configured in Discord server role settings, not in a dedicated available Citizen iD tab.

## Permission Ownership

Separate these layers:

| Layer | Owner | Effect |
| --- | --- | --- |
| Community access | Citizen iD | Controls whether reader can edit community record and open its bot configuration. |
| Server selection | Discord plus Citizen iD | Requires bot installed in server, server visible to account, and portal selector access. |
| Tab access | Citizen iD using current Discord state | Current **Roles** and **Nicknames** portal access checks use reader's Discord **Manage Roles** permission unless internal override applies. |
| Bot action | Discord | Bot needs **Manage Roles** or **Manage Nicknames** for requested action. |
| Hierarchy | Discord | Bot can affect only roles and members below its highest role. |
| Protected target | Discord | Server owner and equal-or-higher role targets remain outside bot control. |

Call out current Nicknames tooltip mismatch only if useful: UI may mention **Manage Nicknames**, while current access check uses reader's **Manage Roles** permission.
Prefer actionable docs wording: reader needs **Manage Roles** for current portal access; bot separately needs **Manage Nicknames** for live nickname changes.

Use exact cache boundary shown by **Bot Configuration**.
Recent role and permission changes may take up to five minutes to appear due to internal caching.
Do not repeat current unsupported twenty-minute expectation.
Treat five minutes as portal reflection boundary, not completion promise for resync operations.

## Linked Role Guide

Keep linked roles clearly separate from bot-assigned roles.
Discord owns role creation, requirements, member opt-in, and final claim.
Citizen iD supplies connection metadata after member authorization.

Use this admin example:

- Role: `RSI Verified`.
- Requirement: Citizen iD reports verified RSI account.
- Result: eligible member claims `RSI Verified` through Discord's **Linked Roles** flow.

Use current official Discord path:

1. Open **Server Settings** in Asteria Hub.
2. Open **Roles** and choose or create `RSI Verified`.
3. Open role's **Links** tab.
4. Add Citizen iD connection requirement.
5. Choose verified-RSI requirement and save.
6. Tell members which role to claim, required Citizen iD account state, and where to open **Linked Roles**.
7. Test with one non-admin member because administrators may bypass channel visibility gates.

State that linked-role members opt in and claim role through Discord.
Do not describe Citizen iD bot as directly assigning linked role.
State that multiple requirements on one linked role must all pass, matching official Discord behavior.

## Screenshot Placements

Use rendered VitePress info containers only.
Do not add screenshots, generated illustrations, diagrams, image steppers, or Mermaid.
Every block must include purpose, required contents, crop and focus, annotations, proposed caption, and alt-text intent.

### Install Placement

Place after server selection walkthrough.
Request current Discord authorization screen showing Citizen iD application identity, **Add to server**, Asteria Hub selection, and requested permissions.
Require demo server or safe redaction.
Annotate application identity, installation context, server picker, and permission summary.

### Configuration Placement

Place after opening **Bot Configuration**.
Request current portal header showing selected Asteria Hub label plus **General**, **Roles**, **Nicknames**, and **Moderation** tabs.
Show unavailable state for General or Moderation and available feature tabs.
Annotate selected server, supported paths, and locked areas.

### Hierarchy Placement

Place under **Role Hierarchy**.
Request Discord **Server Settings** > **Roles** view showing Citizen iD bot role above `RSI Verified`, `Rescue Pilot`, and representative member roles.
Annotate highest bot role, manageable roles, and blocked equal-or-higher region.

### Linked Role Placement

Place within linked-role walkthrough.
Request Discord role **Links** tab showing Citizen iD connection and verified-RSI requirement for `RSI Verified`.
Annotate connection provider, requirement, save control, and member-claim outcome.

## Content Style

Lead each section with operational effect.
Keep each Markdown sentence on own source line.
Use numbered lists for ordered workflows and compact tables for mappings.
Name owner of each requirement or failure.
Use exact current product labels.
Keep titles short enough for page outline.
Link to Role Assignments and Nickname Management rather than duplicating their detailed procedures.

## Comprehensibility Review

Run two subagent role-play reviews after drafting.
First-time community administrator must identify installation path, official-server selection, permissions, hierarchy, supported feature, and single-member test without prior Citizen iD knowledge.
Support moderator must verify ownership boundaries, five-minute cache guidance, unavailable areas, linked-role distinction, privacy-safe evidence, and no invented completion promises.
Resolve Critical and Important findings before visual audit.

## Verification

Build documentation site.
Inspect desktop light, desktop dark, and mobile renderings.
Confirm outline labels do not wrap excessively.
Confirm placement blocks render intentionally.
Confirm tables remain readable.
Confirm no Mermaid, `ImageStepper`, screenshot asset, or prose-only visual marker remains.
Confirm General and Moderation are described as unavailable.
Confirm Roles and Nicknames route to existing guides.
Confirm five-minute portal cache statement matches current interface.
Confirm linked roles remain Discord-claimed.

## Evidence Sources

Implementation evidence comes from sibling Citizen iD checkout pinned at `330f1477ad58f0afee38be62652acc94707a2a38`.
Key files are:

- `CitizenId.Host.Web/Components/AvailableDiscordGuildsOverview.razor` for trusted add-app control.
- `CitizenId.Host.Web/Components/CitizenCommunityDetailsForm.razor` for **Official Community Server** selection and administrator helper text.
- `CitizenId.Infrastructure/Services/DiscordOAuthClient.cs` for Discord-provided application install link.
- `CitizenId.Host.Web/Components/Pages/CommunityBot.razor` for **Bot Configuration**, selected guild, and five-minute cache message.
- `CitizenId.Host.Web/Components/DiscordBotConfigurationTabs.razor` for visible tab set.
- `CitizenId.Host.Web/Components/DiscordBotGeneralControlsTabPanel.razor` and `DiscordBotModerationControlsTabPanel.razor` for unavailable states.
- `CitizenId.Host.Web/Components/DiscordBotRoleAssignmentControlsTabPanel.razor` and `DiscordBotNicknameManagementControlsTabPanel.razor` for portal access checks.
- `CitizenId.Host.Web/Components/Pages/AccountDiscordLinkedRoles.razor` for member authorization and return-to-Discord claim flow.

Public inspiration and behavior sources:

- [Discord Linked Roles for admins](https://support.discord.com/hc/en-us/articles/10388356626711-Connections-Linked-Roles-Admins).
- [Discord roles and permissions](https://support.discord.com/hc/en-us/articles/214836687-Discord-Roles-and-Permissions).
- [Discord application installation](https://docs.discord.com/developers/resources/application#installation-context).
