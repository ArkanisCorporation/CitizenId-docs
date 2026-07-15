# Community Setup Operational Guide Design

## Goal

Rework Community Setup into an operational guide that helps a verified Citizen iD user create, verify, staff, change, and safely remove a community record.
Fix fresh Discord setup order so the bot is installed before the server must appear in the mutual-server selector.
Keep detailed Discord feature setup on the Discord Bot page.

## Audience

Primary reader is a first-time community owner creating a Citizen iD record for a Star Citizen organization, project, company, or player community.
Reader may understand their Discord server but not Citizen iD identifiers, parent-child rules, official-relationship locks, or staff access.
Support moderators are secondary readers who need exact validation, ownership, and evidence boundaries.

## Design Direction

Use walkthrough-first structure consistent with Role Assignments, Nickname Management, and Discord Bot.
Lead with one successful root-community creation using Asteria Rescue and Asteria Hub.
Follow with root-versus-child examples, staff operations, safe edits, deletion, and troubleshooting.
Avoid duplicating feature-specific Discord configuration.

Use [Kubernetes task pages](https://kubernetes.io/docs/tasks/) as inspiration for a short prerequisite block followed by one concrete sequence and verification.
Use [GitHub's organization creation guide](https://docs.github.com/en/enterprise-server@3.21/organizations/collaborating-with-groups-in-organizations/creating-a-new-organization-from-scratch) as inspiration for naming exact navigation and creation actions.
Citizen iD guide must go further by showing exact field values, resulting stored identifiers, recovery paths, and destructive effects.

## Heading Constraint

Keep outline headings to three or four words where practical.
Use this structure:

```markdown
# Community Setup

## Before You Start

### Confirm Access
### Choose Record Shape
### Prepare Values

## Create Community

### Open Community Portal
### Enter Core Details
### Choose Identifier
### Connect Discord
### Save Record
### Confirm Result

## Understand Hierarchy

### Root Community
### Child Community
### Identifier Changes

## Manage Staff

### Add Staff Member
### Verify Access
### Remove Staff Member

## Change Community

### Locked Fields
### Change Discord Server
### Rename Safely

## Remove Community

### Review Impact
### Confirm Removal

## Troubleshoot Setup

### Server Missing
### Save Fails
### Parent Rejected
### Staff Missing
### Support Evidence
```

## Main Walkthrough

Create Asteria Rescue as root community.
Use these exact example values:

| Field | Example value | Result |
| --- | --- | --- |
| **Parent Community** | None | Root community. |
| **Official Relationship** | **No official relationship** | Default, system-controlled relationship state. |
| **Display Name** | `Asteria Rescue` | Main visible community name. |
| **Short Display Name** | `Asteria` | Optional compact name. |
| **Identifier** | `asteria-rescue` | Stored root identifier. |
| **Community Type** | **In-game organization** | Describes a Star Citizen organization. |
| **Homepage** | `https://example.org/asteria-rescue` | Replaceable public URL. |
| **Official Community Server** | Asteria Hub | Discord server used by community features. |
| **Description** | `A Star Citizen rescue community coordinating medical response, recovery, and training.` | Public community summary. |

State that all names and URLs are replaceable examples.

Use actual creation flow:

1. Sign in with a verified Citizen iD account linked to the same Discord account that administers Asteria Hub.
2. Open the Community Portal community selector.
3. Select **Create new community**.
4. Confirm **Manage Community** dialog opens.
5. Leave **Parent Community** empty for root record.
6. Treat **Official Relationship** as system-managed; new record uses **No official relationship**.
7. Enter display name, short name, community type, homepage, and description.
8. Enter `asteria-rescue` in **Identifier** or use identifier-generation control after entering display name.
9. Explain that identifier input is sanitized and must fit 40-character stored limit.
10. Edit **Official Community Server**.
11. Use icon beside field with tooltip **Invite Citizen iD bot to your Discord server**.
12. Complete trusted Discord install for Asteria Hub before trying to select server.
13. Return to dialog and select Asteria Hub from mutual-server list.
14. If missing, wait up to five minutes without repeated refresh, refresh once, and recheck same linked Discord account, bot presence, Discord **Administrator**, and server visibility.
15. Select **Save changes**.
16. Confirm dialog closes, community selector shows Asteria Rescue, and **Management** page shows saved values.
17. Confirm read-only **Official Community Server** displays Asteria Hub.
18. Continue to Discord Bot guide for feature permissions, hierarchy, and first-member test.

State field requirements accurately:

- Required: **Display Name**, **Identifier**, **Community Type**, **Official Community Server**, **Description**.
- Optional: **Parent Community**, **Short Display Name**, **Homepage**.
- System-managed for community admins: **Official Relationship**.
- Limits: display name 60, short display name 20, stored identifier 40, description 2000 characters.

Do not tell a new user to select a server before bot installation.
Do not call visible **Identifier** field “slug” in procedural instructions.
Use “stored identifier” for underlying canonical value.

## Hierarchy Examples

Explain root and child choices before reader creates records.

Use this result table:

| Shape | Parent | Local identifier | Stored identifier | Display result |
| --- | --- | --- | --- | --- |
| Root Asteria Rescue | None | `asteria-rescue` | `asteria-rescue` | `Asteria Rescue` |
| Root Asteria Network | None | `asteria` | `asteria` | `Asteria Network` |
| Child Rescue Wing | Asteria Network | `rescue` | `asteria:rescue` | `Asteria Rescue Wing` when parent short name `Asteria` is loaded. |

Explain one-level hierarchy:

- Parent must be root community.
- Child cannot be parent of another child.
- Community with direct children cannot later become child.
- Community cannot parent itself.
- Child identifier reserves parent identifier plus `:` within same 40-character stored limit.

Explain identifier change effects:

- Changing parent identifier rewrites direct child identifiers.
- Citizen iD role-name prefixes tied to changed community identifiers are rewritten.
- Old links, screenshots, support references, and instructions may become stale.
- Record old and new identifiers plus affected child records before rename.

## Staff Workflow

State that creator becomes owner and joins new community during save.
Management page shows **Community Owner** separately from **Manage community staff members**.
Current staff model has one role with full administrative access.
Do not imply fine-grained staff permissions exist.

Use exact add flow:

1. Open community **Management**.
2. Review full-administrative-access warning.
3. Select **Add Staff Member**.
4. Enter consenting user's exact Citizen iD account UUID under **User ID**.
5. Select **Add User**.
6. Confirm user appears in staff table.
7. Ask user to open Asteria Rescue and verify expected access.

Explain current silent missing-account behavior.
If valid UUID does not resolve, dialog can close without adding row.
Verify table rather than assuming button success.

Use exact remove flow:

1. Select delete action beside staff member.
2. Confirm **Remove staff member from community?** names correct person and community.
3. Select **Delete** or **Cancel**.
4. Confirm removed person no longer appears.

Use demo UUID or redact real UUID in visual requests.
Treat UUID and account identity as private operational evidence.

## Change Safety

Explain **Official Relationship** ownership.
Internal Citizen iD admins can set it.
Ordinary community admins see it read-only.
When value is not **No official relationship**, **Display Name**, **Short Display Name**, **Homepage**, and **Official Community Server** are locked with **Contact support to change this field.**
Do not incorrectly claim **Identifier**, **Community Type**, or **Description** are locked by this state.

Changing server mapping is operational change.
Before change, record old and new server IDs, install bot in new server, confirm same account and Administrator access, then select new server.
One Discord server cannot be assigned to more than one community.
After save, verify mapping and follow Discord Bot guide to recheck permissions, hierarchy, role targets, nickname behavior, linked-role instructions, and support evidence.

## Removal Safety

Use exact community removal flow:

1. Inventory owner, staff, children, roles, applications, authorizations, bot automation, branding, and member instructions.
2. Prefer rename, staff removal, or server remapping when they solve actual problem.
3. Select **Remove community** only for permanent removal.
4. Confirm dialog **Remove community and all related data?** names correct community.
5. Explain confirmation states community members, roles, applications, and authorizations are removed.
6. State parent deletion can also remove child records because hierarchy uses cascading deletion.
7. Select **Delete** only after impact is accepted; otherwise select **Cancel**.

Never suggest deletion as troubleshooting reset.

## Screenshot Placements

Use rendered VitePress info containers only.
Do not add screenshots, generated illustrations, diagrams, image steppers, or Mermaid.
Every block must include purpose, required contents, crop and focus, annotations, proposed caption, and alt-text intent.

### Form Placement

Place after core details are entered.
Request current **Manage Community** form showing every field, Asteria example values, **Save changes**, and add-app icon beside **Official Community Server**.
Use demo server and `example.org` URL.
Annotate required, optional, and system-managed fields.

### Hierarchy Placement

Place under **Child Community**.
Request two current identifier states: root with empty **Parent Community** and `asteria`, child with Asteria Network selected and visible `asteria:` prefix plus editable `rescue` local segment.
Focus on parent selector, identifier prefix, local input, and counter.
Annotate stored `asteria:rescue` result and one-level rule.

### Staff Placement

Place after entering staff UUID.
Request **Manage community staff members** warning, **Add Staff Member**, **Add Staff Member** dialog, **User ID**, and **Add User**.
Use dedicated demo account and redact UUID before publication.
Annotate full-admin warning, exact-ID input, add action, and table verification.

### Removal Placement

Place before final delete action.
Request **Remove community and all related data?** dialog naming Asteria Rescue with **Delete** and **Cancel** visible.
Focus on permanent scope and named target.
Annotate related-data warning and safe cancel action.

## Content Style

Lead each section with operational effect.
Keep every Markdown sentence on own source line.
Use numbered steps for ordered workflows and compact tables for mappings.
Use exact current labels.
Name owner of system-managed fields and Discord prerequisites.
Link to Discord Bot instead of duplicating its feature setup.
Keep headings short enough for page outline.

## Comprehensibility Review

Run two subagent role-play reviews after drafting.
First-time community owner must create root record without encountering server-selection dead end, predict saved values, understand optional fields, and verify success.
Support moderator must verify hierarchy constraints, official-relationship locks, uniqueness failures, staff full-access warning, silent staff lookup behavior, deletion impact, and privacy-safe evidence.
Resolve Critical and Important findings before visual audit.

## Verification

Build documentation site.
Inspect desktop light, desktop dark, and mobile renderings.
Confirm concise outline, readable tables, and intentional placement blocks.
Confirm no Mermaid, `ImageStepper`, screenshot asset, or prose-only visual marker remains.
Confirm first setup installs bot before selecting server.
Confirm current UI says **Identifier**, **Official Community Server**, and **Save changes**.
Confirm required and optional fields match current form.
Confirm relationship locks apply only to implementation-backed fields.
Confirm staff flow and removal confirmations use exact labels.
Confirm deletion warning and child cascade are not softened.

## Evidence Sources

Implementation evidence comes from sibling Citizen iD checkout pinned at `330f1477ad58f0afee38be62652acc94707a2a38`.
Key files are:

- `CitizenId.Host.Web/Components/Shared/AppBarCommunity.razor` and `CitizenCommunitySelectBox.razor` for **Create new community** entry.
- `CitizenId.Host.Web/Components/Dialogs/CitizenCommunityDialog.razor` for **Manage Community**.
- `CitizenId.Host.Web/Components/CitizenCommunityDetailsForm.razor` for labels, requirements, locks, identifier behavior, server install and selection, save, and removal.
- `CitizenId.Domain/Models/Entities/CitizenCommunity.cs` and `CommunityType.cs` for values, length limits, stored identifiers, display semantics, and cascade configuration.
- `CitizenId.Domain/Validation/CitizenCommunityValidator.cs` for field and hierarchy validation.
- `CitizenId.Infrastructure/Data/Repositories/CitizenCommunityRepository.cs` for server uniqueness, hierarchy enforcement, identifier rewrites, membership, and deletion.
- `CitizenId.Host.Web/Components/Pages/CommunityManagement.razor` for owner, staff warning, and staff entry.
- `CitizenId.Host.Web/Components/Dialogs/AddCitizenCommunityMemberDialog.razor` for exact staff add flow and silent missing-account outcome.
- `CitizenId.Host.Web/Components/Shared/CitizenCommunityMembershipDataGrid.razor` for staff verification and removal.
- `CitizenId.Host.Web/Components/Shared/DiscordMutualGuildSelectBox.razor` and `CitizenId.Infrastructure/Services/DiscordOAuthClient.cs` for mutual-server eligibility and trusted install.
