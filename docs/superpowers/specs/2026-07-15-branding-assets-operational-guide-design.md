# Branding Assets Operational Guide Design

## Goal

Rework Branding Assets into an operational guide that helps a community administrator create, preview, submit, and safely replace a supported graphics asset.
Make current product limits, manual approval, matching rules, and review outcomes predictable before the reader changes anything.

## Audience

Primary reader is a first-time community brand manager with administrative access to a Citizen iD community.
The reader may own usable brand artwork but may not understand URL hosting, placement metadata, priority, draft previews, or moderation states.
Support moderators are secondary readers who need complete, privacy-safe approval evidence.

## Design Direction

Use the established walkthrough-first pattern.
Lead with one successful Asteria Rescue icon from a community-controlled HTTPS URL.
Follow with matching rules, a compact logo recipe, review outcomes, safe replacement, and troubleshooting.
Treat banner, background, and theme options as current availability constraints instead of advertised workflows.

Use [GitHub's social preview guide](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/customizing-your-repositorys-social-media-preview) as inspiration for exact navigation, concrete source requirements, transparency guidance, and a visible result.
Use [Apple's icon guidance](https://developer.apple.com/design/human-interface-guidelines/icons) as inspiration for simple, recognizable vector artwork that remains legible at small sizes.
Citizen iD guidance must go further by explaining placement metadata, preview scope, moderation locks, and manual approval.

## Heading Constraint

Keep outline headings to three or four words where practical.
Use this structure:

```markdown
# Branding Assets

## Before You Start

### Confirm Access
### Prepare Source
### Choose Asset Type

## Add First Icon

### Open Branding
### Choose Icon Type
### Enter Source URL
### Configure Placement
### Save Draft

## Preview Asset

### Check Asset Preview
### Check Placement Matrix

## Submit For Review

### Run Final Checks
### Request Approval
### Open Support Ticket
### Confirm Locked State

## Understand Matching

### Theme Matching
### Background Matching
### Container Matching
### Size Matching
### Priority Order

## Add Logo Variants

### Horizontal Logo
### Vertical Logo
### Light And Dark

## Handle Review

### Pending Submission
### Pending Approval
### Approved Asset
### Rejected Asset
### Review Ownership

## Manage Assets

### Edit Draft
### Replace Asset
### Delete Safely
### Current Limits

## Troubleshoot Branding

### Source Fails
### Preview Mismatch
### Asset Not Public
### Support Evidence
```

## Main Walkthrough

Create an Asteria Rescue icon using a replaceable example source such as `https://assets.example.org/asteria-rescue/icon-v1.svg`.
State that the reader must substitute a real, reachable URL that they control.

Use these exact example values:

| Field | Example value | Result |
| --- | --- | --- |
| **Type** | **Icon from URL** | Creates a supported graphics asset. |
| **Source URL** | `https://assets.example.org/asteria-rescue/icon-v1.svg` | Fetches a versioned SVG from community-controlled hosting. |
| **Priority** | `100` | Wins over another matching asset with a lower priority. |
| **Theme** | **Theme-agnostic** | Can match light and dark placements. |
| **Background** | **Transparent** | Matches transparent placements. |
| **Container** | **Container-agnostic** | Can match square and circle containers. |

Use actual creation flow:

1. Confirm the user can administer the intended community and owns or is licensed to use the artwork.
2. Host a simple SVG at a public, stable, versioned, absolute HTTPS URL.
3. Keep the response below the 2 MiB limit and ensure it is served as an image.
4. Open the community **Branding** page.
5. Select **Add Branding Asset**.
6. In **Create Branding Asset**, select **Icon from URL**.
7. Enter the URL under **Source URL**.
8. Continue to **Finalize Options**.
9. Set **Priority**, **Theme**, **Background**, and **Container** to the example values.
10. Select **Save changes**.
11. Confirm the asset shows **Pending Submission**.
12. Inspect the asset preview and placement matrix.
13. Change draft metadata when a placement is missing or inappropriate.
14. Explain that existing draft changes save immediately.
15. Select **Submit for approval** only after the final preview check.
16. In **Submit Asset for Approval**, read the lock warning and select **Request approval**.
17. Confirm the asset shows **Pending Approval** and normal matching controls are locked.
18. Open a support ticket on the official Citizen iD Discord because approval is not automated.
19. Provide visible community name, identifier, asset type, source URL, submission time, and a safe preview screenshot.
20. Confirm the final **Approved** or **Rejected** state.

Do not imply that placement preview publishes the asset.
Do not imply that submission automatically notifies or assigns a moderator.
Do not promise immediate remote-image refresh because browser or community-host caching may apply.

## Source Guidance

Require an absolute HTTPS URL.
State the 2 MiB maximum.
Explain that Citizen iD fetches the response and validates image content.
Prefer SVG for icon and logo artwork because it scales cleanly.
Recommend simple artwork with clear edges and little or no small text.
Require a stable, community-controlled host.
The URL is sent to viewers' browsers, so it must not contain access tokens, signatures, private hostnames, or other secrets.
Use a versioned filename so changed artwork gets a new URL and a new asset submission.
Warn against changing the bytes behind an already submitted URL.

Do not claim Citizen iD copies and permanently hosts the submitted artwork.
The current display path uses the stored external URL.

## Matching Rules

Explain that public selection requires an approved asset whose metadata matches the requested placement.
The placement matrix can render the current unapproved asset for preview.
Preview therefore verifies fit, not approval or publication.

Explain each field:

- **Theme** distinguishes theme-agnostic, light, and dark artwork.
- **Background** distinguishes transparent, semi-transparent, and opaque placements.
- **Container** distinguishes container-agnostic, square, and circle icon placements.
- **Orientation** distinguishes orientation-agnostic, horizontal, and vertical logo placements.
- **Priority** resolves multiple matching assets, with the highest value winning.
- Raster dimensions must meet or exceed the requested placement, while SVG is treated as scalable.

State supported combinations accurately:

- Icon supports transparent or opaque backgrounds and uses container matching.
- Logo requires transparent background and uses horizontal or vertical orientation.
- Banner uses opaque background but creation is currently disabled.
- Background creation is currently disabled.

## Logo Recipe

Keep logo guidance shorter than the main icon walkthrough.
Recommend two separate SVG assets when the community needs both horizontal and vertical placements.
Each logo must contain the full community name.
Use transparent background.
Set the matching **Orientation** explicitly.
Create separate light and dark variants only when one design does not remain legible in both themes.
Preview every variant before submission.

## Review Outcomes

Use exact state labels:

| State | Meaning | Available action |
| --- | --- | --- |
| **Pending Submission** | Draft exists and can be edited. | Preview, edit, submit, or remove. |
| **Pending Approval** | Submitted asset awaits review; normal metadata fields except **Priority** are locked. | Open or update the manual support ticket, or permanently remove the asset to withdraw it. |
| **Approved** | Asset is eligible for matching public placements. | Verify public result or remove carefully. |
| **Rejected** | Review failed and the reason is visible. | Read the reason and create a corrected new asset. |

Do not tell readers to edit or resubmit a rejected asset in place.
The current community UI locks rejected assets and does not expose its delete action.
Preserve the rejection reason as context, create a new versioned source, and submit a new asset.

## Change Safety

Existing pending draft metadata changes save immediately.
The source URL remains read-only, including while the asset is pending submission.
Submitted and reviewed assets lock source and normal matching fields.
The current UI leaves **Priority** editable in later states, but changing it can alter public selection without another review.
Tell community staff to treat **Priority** as locked after submission.
Replacing approved artwork should use a new versioned URL and new asset so the approved version remains stable until replacement approval.
After the replacement becomes approved and public behavior is verified, remove the old asset only when no placement still needs it.

The **Delete Asset** confirmation is permanent.
Deleting an approved asset can remove currently selected public branding.
Require checking matching coverage before selecting **Delete**.

## Current Limits

Show availability in a compact table:

| Option | Current availability |
| --- | --- |
| **Icon from URL** | Available. |
| **Logo from URL** | Available. |
| **Banner from URL** | Disabled. |
| **Background from URL** | Disabled. |
| **Authorization Page Theme** | Available only to communities with Partner relationship or higher. |
| **Member Profile Page Theme** | Disabled. |

Do not present relationship-gated authorization themes as part of the first graphics workflow.

## Screenshot Placements

Use rendered VitePress info containers only.
Do not add screenshots, generated illustrations, diagrams, image steppers, or Mermaid.
Every block must include purpose, required contents, crop and focus, annotations, proposed caption, and alt-text intent.

### Type Placement

Place after the reader opens **Create Branding Asset**.
Request the **Select Type** step showing available icon and logo options, disabled banner, background, and member-profile options, plus the relationship-gated authorization theme.
Annotate currently available, unavailable, and relationship-gated choices.

### Draft Placement

Place after configuring the example icon.
Request the pending asset editor showing **Priority**, **Theme**, **Background**, **Container**, read-only **Asset URL**, and the draft status.
Annotate the exact example values and immediate-save behavior.

### Preview Placement

Place after the placement-matrix instructions.
Request the Asteria Rescue icon preview across representative light, dark, square, and circle placements.
Annotate matching and nonmatching cells and state that preview does not mean approval.

### Review Placement

Place during submission.
Request the **Submit Asset for Approval** dialog with lock warning, **Request approval**, and **Cancel**, followed by the **Pending Approval** state with normal matching fields locked.
Annotate the submission lock and required manual support ticket.

## Content Style

Lead each section with the operational result.
Keep every Markdown sentence on its own source line.
Use exact current labels.
Use numbered steps for ordered workflows and compact tables for matching and state mappings.
Keep placement instructions renderable as VitePress info blocks.
Keep headings short enough for the page outline.

## Comprehensibility Review

Run two subagent role-play reviews after drafting.
First-time brand manager must create one icon, predict its matches, understand preview versus publication, and complete manual approval without guessing.
Support moderator must verify rights, source stability, current availability, state transitions, rejection recovery, delete risk, and ticket evidence.
Resolve Critical and Important findings before visual audit.

## Verification

Build the documentation site.
Inspect desktop light, desktop dark, and mobile renderings.
Confirm concise outline, readable tables, and intentional placement blocks.
Confirm no Mermaid, `ImageStepper`, screenshot asset, or prose-only visual marker remains.
Confirm exact labels for creation, source, save, submission, and state.
Confirm current type availability and relationship gate.
Confirm public URL requirements, no-secret warning, 2 MiB limit, raster size matching, immediate draft saves, read-only source, submission lock, priority exception, and manual ticket.
Confirm rejected recovery does not promise editing or deletion.
Confirm approved deletion risk is explicit.

## Evidence Sources

Implementation evidence comes from sibling Citizen iD checkout pinned at `330f1477ad58f0afee38be62652acc94707a2a38`.
Key files are:

- `CitizenId.Host.Web/Components/Pages/CommunityBranding.razor` for page instructions, asset guidance, add action, preview matrix, status actions, submission, deletion, and manual ticket requirement.
- `CitizenId.Host.Web/Components/Pages/CommunityHome.razor` and `CitizenId.Host.Web/Components/Shared/AppBarCommunity.razor` for **Site Branding** and **Branding** navigation.
- `CitizenId.Host.Web/Components/Dialogs/CreateBrandingAssetDialog.razor` for step labels, current type availability, relationship gate, source helper, final options, and save action.
- `CitizenId.Host.Web/Components/GraphicsAssetEditorControls.razor` for metadata labels, validation, SVG guidance, locks, and immediate draft saves.
- `CitizenId.Host.Web/Helpers/BrandingAssetMetadataFactory.cs` for HTTPS, image response, processing, rate limit, and 2 MiB validation.
- `CitizenId.Domain/Models/BrandingAsset.cs` for asset states, graphics metadata, review results, priority, URL, and content hash.
- `CitizenId.Host.Web/Components/BrandingAssetStatusAlert.razor` and `BrandingAssetStatusChip.razor` for exact status language.
- `CitizenId.Host.Web/Components/BrandingAssetPlacementPreviewMatrix.razor` for preview behavior and supported combinations.
- `CitizenId.Domain/Services/GraphicsAssetResolverBase.cs` and `CitizenId.Infrastructure/Data/Repositories/BrandingAssetDatabaseRepository.cs` for approval, matching, and priority order.
- `CitizenId.Host.Web/Components/GraphicsAssetDisplay.razor` for external URL rendering behavior.
