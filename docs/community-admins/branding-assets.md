---
title: Branding Assets
description: Community-owned branding assets and review workflow.
---

# Branding Assets

Create a community icon from a stable public URL, preview its matching placements, then request manual approval.
This walkthrough uses Asteria Rescue and a replaceable example URL.

## Before You Start

Confirm administrative access, artwork rights, and source hosting before creating an asset.

### Confirm Access

Confirm you can administer Asteria Rescue and open its **Branding** page.
Confirm the community owns the artwork or has a license allowing this public use.

Community branding represents the community.
It does not imply endorsement, certification, operation, or sponsorship by Citizen iD, Cloud Imperium Games, RSI, or Star Citizen.
Follow the [Brand Guidelines](/reference/brand-guidelines) when using Citizen iD names or assets.

### Prepare Source

Host a simple SVG at a public, stable, versioned, absolute HTTPS URL controlled by the community.
This walkthrough uses `https://assets.example.org/asteria-rescue/icon-v1.svg`, which must be replaced with a real reachable URL.

The response must be an image at most 2 MiB in size.
Prefer simple SVG artwork with clear edges and little or no small text.
Verify the artwork remains legible at small sizes and on light and dark surfaces.

Citizen iD fetches the source during creation, and viewers' browsers request it later when the asset renders.
The remote host can therefore receive both server and viewer request information.
Never include access tokens, signatures, private hostnames, or other secrets.
Do not change bytes behind a submitted URL.
Use a new versioned filename and new asset for changed artwork.

Citizen iD stores and renders the external URL.
Do not assume Citizen iD copies and permanently hosts the artwork.

### Choose Asset Type

Create **Icon from URL** first.
It is available and demonstrates theme, background, container, priority, preview, and review behavior.

Use these example values:

| Field | Example value | Result |
| --- | --- | --- |
| **Type** | **Icon from URL** | Creates a supported graphics asset. |
| **Source URL** | `https://assets.example.org/asteria-rescue/icon-v1.svg` | Fetches a versioned SVG from community-controlled hosting. |
| **Priority** | `100` | Wins over another matching asset with lower priority. |
| **Theme** | **Theme-agnostic** | Can match light and dark placements. |
| **Background** | **Transparent** | Matches transparent placements. |
| **Container** | **Container-agnostic** | Can match square and circle containers. |

## Add First Icon

Create one editable draft before configuring variants.

### Open Branding

1. Open Asteria Rescue in the Community Portal.
2. Open the **Site Branding** card, or select **Branding** in the community navigation.
3. Select **Add Branding Asset**.
4. Confirm **Create Branding Asset** opens.

### Choose Icon Type

Select **Icon from URL** under **Select Type**.

::: info Screenshot placement
**Purpose:** Show current asset-type availability before the first icon is created.

**Required contents:** Show **Create Branding Asset** at **Select Type**, with available **Icon from URL** and **Logo from URL**, disabled **Banner from URL**, **Background from URL**, and **Member Profile Page Theme**, plus relationship-gated **Authorization Page Theme**.

**Crop and focus:** Focus on the type cards, availability state, and relationship gate rather than the full portal shell.

**Annotations:** Call out available, disabled, and relationship-gated choices, with **Icon from URL** selected.

**Proposed caption:** Icon and logo URL assets are available, while other choices remain disabled or relationship-gated.

**Alt-text intent:** Communicate every visible asset type, its availability, and which type starts the walkthrough.
:::

### Enter Source URL

Enter `https://assets.example.org/asteria-rescue/icon-v1.svg` under **Source URL**.
Substitute the community's real public versioned URL.
Continue to **Finalize Options** only after the source validates.

### Configure Placement

Set these values:

- **Priority**: `100`.
- **Theme**: **Theme-agnostic**.
- **Background**: **Transparent**.
- **Container**: **Container-agnostic**.

These values allow the icon to match light and dark themes plus square and circle containers when the requested background is transparent.

### Save Draft

Select **Save changes**.
Confirm the asset shows **Pending Submission**.

The **Asset URL** is read-only after creation, including during **Pending Submission**.
Changes to existing draft metadata save immediately.
There is no separate final-save stage for later draft metadata changes.

::: info Screenshot placement
**Purpose:** Show the saved editable draft and exact matching metadata.

**Required contents:** Show the asset on the **Branding** page with **Priority** `100`, **Theme** **Theme-agnostic**, **Background** **Transparent**, **Container** **Container-agnostic**, read-only **Asset URL**, and **Pending Submission**.

**Crop and focus:** Focus on status, read-only source, metadata controls, and saved draft behavior.

**Annotations:** Call out exact example values, read-only URL, draft state, and immediate metadata saves after creation.

**Proposed caption:** The saved Asteria Rescue icon draft matches transparent light, dark, square, and circle placements.

**Alt-text intent:** Communicate saved draft status, immutable source URL, configured matching metadata, and immediate-save behavior.
:::

## Preview Asset

Preview verifies rendering and metadata fit, not approval or public publication.

### Check Asset Preview

Inspect the asset preview for sharp edges, correct transparency, expected colors, and readable details.
Compare light and dark surroundings.
If the source itself is wrong, create a new versioned URL and new asset instead of changing bytes behind the saved URL.

### Check Placement Matrix

Inspect representative light, dark, square, and circle cells in the placement matrix.
Confirm matching cells look correct and nonmatching cells remain excluded by metadata.

The matrix can render the current unapproved asset.
Preview therefore proves fit only.
It does not mean the asset is approved or public.

::: info Screenshot placement
**Purpose:** Show which placements the draft matches without implying publication.

**Required contents:** Show the Asteria Rescue icon across representative light, dark, square, and circle placement-matrix cells, including matching and nonmatching examples.

**Crop and focus:** Focus on the matrix labels, rendered icon cells, and excluded cells.

**Annotations:** Call out matching and nonmatching cells and state that preview does not mean approval or publication.

**Proposed caption:** Placement preview verifies icon fit, while approval still controls public eligibility.

**Alt-text intent:** Communicate where the draft renders, where it does not match, and the boundary between preview and public use.
:::

## Submit For Review

Submission locks theme, background, container, orientation, and source configuration and starts a manual review request that still needs a support ticket.
The current UI leaves **Priority** editable after submission, but changing it can alter which approved asset wins without a new review.
Treat all submitted and reviewed asset values as frozen.

### Run Final Checks

Before submission, confirm:

- The community owns or licenses the artwork.
- Source URL is public HTTPS and contains no secret.
- Filename is versioned and hosted stably.
- Response is a valid image at most 2 MiB in size.
- Preview remains legible at small sizes.
- Light, dark, square, and circle matches are intentional.
- Wording and artwork do not imply unsupported official status or endorsement.

### Request Approval

1. Select **Submit for approval**.
2. In **Submit Asset for Approval**, read the configuration-lock warning.
3. Select **Request approval**, or select **Cancel** if another edit is needed.

::: info Screenshot placement
**Purpose:** Show the submission lock and separate manual-review requirement.

**Required contents:** Show **Submit Asset for Approval** with the lock warning, **Request approval**, and **Cancel**, followed by **Pending Approval** with theme, background, and container controls locked.

**Crop and focus:** Focus on the confirmation warning, actions, resulting status, and locked editor controls.

**Annotations:** Call out submission lock, **Pending Approval**, and the required manual support ticket.

**Proposed caption:** Requesting approval locks normal matching fields, but a support ticket is still required for review.

**Alt-text intent:** Communicate the lock warning, confirm and cancel actions, resulting status, locked matching fields, and manual-ticket requirement.
:::

Submission does not automatically notify or assign a moderator.

### Open Support Ticket

Open a branding approval ticket through the official Citizen iD Discord support path.
Use [Maintenance And Support](/community-admins/maintenance-and-support) for current support routing.

Provide:

- Visible community name and identifier.
- Asset type.
- Public **Source URL**.
- UTC submission time.
- Current **Pending Approval** status.
- Safe cropped preview screenshot.
- Relevant rights or licensing context when requested privately.

Do not send unreleased source files or secrets in a public support channel.

### Confirm Locked State

Confirm the asset shows **Pending Approval** and normal matching controls are locked.
Wait for manual review through the support ticket.
Do not create repeated submissions for the same source while review is active.

## Understand Matching

Public selection requires an **Approved** asset whose metadata matches the requested placement.

### Theme Matching

**Theme-agnostic** can match light and dark placements.
Use explicit light or dark variants when one design does not remain legible in both themes.

### Background Matching

**Background** distinguishes transparent, semi-transparent, and opaque placements.
Icons support transparent or opaque backgrounds.
Logos require transparent backgrounds.

### Container Matching

**Container** distinguishes container-agnostic, square, and circle icon placements.
Use **Container-agnostic** only when the same artwork fits both square and circle crops.

### Size Matching

Raster artwork must be at least as wide and tall as the requested placement.
A valid raster below 2 MiB can still fail to match when its pixel dimensions are too small.
SVG is treated as scalable, which is another reason to prefer it for icons and logos.

### Priority Order

When multiple approved assets match one placement, the highest **Priority** value wins.
Use intentional priority gaps so later variants can be inserted without renumbering every asset.

## Add Logo Variants

Use separate logo assets when orientation or theme requires different artwork.

### Horizontal Logo

Create **Logo from URL** with a versioned SVG containing the full community name.
Use **Transparent** background and set **Orientation** to **Horizontal**.
Preview every intended horizontal placement before submission.

### Vertical Logo

Create a second versioned SVG containing the full community name.
Use **Transparent** background and set **Orientation** to **Vertical**.
Do not reuse a horizontal composition if it becomes unreadable vertically.

Use **Orientation-agnostic** only when one composition genuinely fits both horizontal and vertical requests.

### Light And Dark

Use one **Theme-agnostic** logo when it remains legible in both themes.
Create separate light and dark assets only when the design needs theme-specific contrast.
Give each variant explicit matching metadata and preview it before submission.

## Handle Review

Use status to determine the only safe next action.

| State | Meaning | Available action |
| --- | --- | --- |
| **Pending Submission** | Draft exists and can be edited. | Preview, edit, submit, or remove. |
| **Pending Approval** | Submitted asset awaits review; normal metadata fields except **Priority** are locked. | Open or update the manual support ticket, or permanently remove the asset to withdraw it. |
| **Approved** | Asset is eligible for matching public placements. | Verify public result or remove carefully. |
| **Rejected** | Review failed and the reason is visible. | Read the reason and create a corrected new asset. |

### Pending Submission

Preview and edit metadata before submission.
Draft metadata changes save immediately, while the source URL remains read-only.

### Pending Approval

Theme, background, container, orientation, and source configuration are locked.
Use the existing manual support ticket for review status and additional evidence.

Use **Remove asset** only when the submission must be withdrawn.
The resulting **Delete Asset** action is permanent and cannot be undone.

### Approved Asset

The asset becomes eligible for matching public placements when a refreshed public page resolves it.
The external image response can still be cached by browsers or the community's content delivery network.
Verify representative public surfaces before retiring any older approved asset.

### Rejected Asset

Read and preserve the visible rejection reason.
The current community UI locks source and normal metadata fields except **Priority**, and it does not expose the rejected asset's delete action.
Do not promise in-place editing, resubmission, or deletion.

Create corrected artwork at a new versioned URL, create a new asset, preview it, and submit that new asset.

### Review Ownership

Community staff create assets, edit drafts, submit them, and can delete every state except **Rejected**.
Citizen iD moderators perform the review and can return an asset to pending, mark it submitted, approve it, reject it with a required **Rejection message**, or delete it.
Community staff should use the support ticket instead of trying to reproduce moderator actions.

## Manage Assets

Protect public coverage while editing drafts, replacing approved artwork, or deleting assets.

### Edit Draft

Edit **Priority**, **Theme**, **Background**, **Container**, or **Orientation** only while the asset is **Pending Submission**.
Each metadata change saves immediately.
Create a new asset when the source artwork or URL must change.

Although **Priority** remains editable in later states in the current UI, changing it can alter public selection without a new review.
Treat it as locked after submission.

### Replace Asset

1. Publish corrected artwork at a new versioned URL.
2. Create and preview a new asset.
3. Submit it and open the required support ticket.
4. Wait for **Approved**.
5. Verify matching public surfaces.
6. Remove the old approved asset only when no required placement still depends on it.

This sequence keeps the approved version stable until its replacement is ready.

### Delete Safely

**Delete Asset** is permanent.
Deleting an approved asset can remove currently selected public branding.
The placement may fall through to a lower-priority matching asset, an official fallback where supported, or no asset.

Before selecting **Delete**, check every matching placement, priority relationship, and replacement approval.
Select **Cancel** if coverage is uncertain.

### Current Limits

| Option | Current availability |
| --- | --- |
| **Icon from URL** | Available. |
| **Logo from URL** | Available. |
| **Banner from URL** | Disabled. |
| **Background from URL** | Disabled. |
| **Authorization Page Theme** | Available only to communities with Partner relationship or higher. |
| **Member Profile Page Theme** | Disabled. |

Do not use relationship-gated authorization themes as part of the first graphics workflow.

## Troubleshoot Branding

Start with source validation and matching metadata before escalating review or public visibility.

### Source Fails

Confirm the URL is absolute public HTTPS, reachable without authentication, stable, and served as an image at most 2 MiB in size.
Remove tokens, signatures, private hostnames, and redirects to protected resources.
If processing is rate-limited, stop repeated attempts, wait at least five seconds, then retry once.

Use a new versioned URL after changing artwork.
Do not mutate an already submitted source.

### Preview Mismatch

Compare requested placement with **Theme**, **Background**, **Container**, **Orientation**, **Priority**, and raster pixel dimensions.
Remember that icons use container matching, while logos use orientation and require transparent background.
Preview can show an unapproved draft, so a correct preview is not publication evidence.

### Asset Not Public

Confirm the asset is **Approved**, matches the requested placement, and has sufficient priority.
Check whether a higher-priority approved asset wins.
Refresh the public page after approval.
If the correct approved asset is selected but the image looks stale, check browser and community-host caching for the versioned source URL.

If the asset is **Pending Approval**, continue through the manual support ticket.
If it is **Rejected**, create a corrected new asset rather than editing in place.

### Support Evidence

Collect privacy-safe evidence:

- Visible community name and identifier.
- Asset type and current status.
- Public source URL without secrets.
- **Priority**, **Theme**, **Background**, **Container**, and **Orientation** where applicable.
- Intended placement and observed result.
- UTC creation, submission, and observation times.
- Rejection reason when present.
- Safe cropped preview and public-surface screenshots.
- Existing support ticket reference.

Do not send private design archives, unreleased material, tokens, or licensing documents through public channels.
Use [Maintenance And Support](/community-admins/maintenance-and-support) for private escalation.
