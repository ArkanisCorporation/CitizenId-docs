# Brand Guidelines

These guidelines define how external developers, community operators, media, and press may use Citizen iD brand assets.
They cover approved names, logos, icons, colors, sign-in buttons, co-branding language, environment-specific assets, and
approval requirements.

## Quick rules

- Use the name **Citizen iD** exactly as written.
- Do not use **CiD**, **CitizenID**, or **Citizen ID** in public user-facing text when referring to this project.
- Use only the official logo and icon assets listed on this page.
- Use the production orange star assets for production Citizen iD integrations.
- Use the development/staging red star assets only for unstable, development, staging, test, or internal environments.
- Do not recolor, distort, crop, outline, shadow, animate, or otherwise modify Citizen iD assets.
- Do not imply endorsement, certification, partnership, verification, or official affiliation unless that status is
  explicitly granted and reflected in Citizen iD systems.
- Citizen iD is not affiliated with, endorsed by, sponsored by, or operated by Cloud Imperium Games or the official Star
  Citizen brand.

## Brand statement

Use this short description where a concise project description is needed:

> Citizen iD is a privacy-focused Star Citizen identity platform.

For developer documentation, press kits, and integration pages, this longer form is preferred:

> Citizen iD provides privacy-focused identity and sign-in infrastructure for Star Citizen community applications.

## Name usage

| Rule                      | Approved usage                                               |
|---------------------------|--------------------------------------------------------------|
| Public project name       | **Citizen iD**                                               |
| First mention             | **Citizen iD**, followed by a short description where useful |
| Possessive                | **Citizen iD's**                                             |
| Button text               | **Sign in with Citizen iD**                                  |
| User-facing abbreviations | Not approved                                                 |

Do not use these variants in public user-facing copy when referring to this project:

- `CiD`
- `CitizenID`
- `Citizen ID`
- `Citizen Id`
- `citizen id`

Asset URLs and file names may contain lowercase implementation names. Do not convert those file names into public
display names.

## Color palette

| Color             | Hex       | Usage                                                                                      |
|-------------------|-----------|--------------------------------------------------------------------------------------------|
| Gray              | `#212126` | Primary dark surface, neutral brand background, dark UI button                             |
| Black             | `#0E0E0F` | High-contrast dark surface, dark UI button, typography on light surfaces where appropriate |
| White             | `#F0F0F0` | Light surface, typography on dark surfaces, light UI button                                |
| Production orange | `#F39C13` | Production environment star accent only                                                    |
| Development red   | `#FF0000` | Development, staging, unstable, and test environment star accent only                      |
| Blue              | `#2196F3` | Approved accent and sign-in button color                                                   |

Use orange only for production Citizen iD brand accents. Use red only to identify development, staging, unstable, or
test assets and environments.

## Production assets

Use these assets for production integrations, public documentation, media references, application login screens, and
community pages.

### Production logos

<FlexGrid style="margin-top: 8px">
  <GridItem>
    <img src="https://citizenid.space/assets/prod/citizenid-logo-dark.png" alt="Citizen iD dark logo for light themes"/>
  </GridItem>
  <GridItem isDark>
    <img src="https://citizenid.space/assets/prod/citizenid-logo-light.png" alt="Citizen iD light logo for dark themes"/>
  </GridItem>
</FlexGrid>

| Asset      | Use                                | URL                                                            |
|------------|------------------------------------|----------------------------------------------------------------|
| Dark logo  | Light themes and light backgrounds | `https://citizenid.space/assets/prod/citizenid-logo-dark.png`  |
| Light logo | Dark themes and dark backgrounds   | `https://citizenid.space/assets/prod/citizenid-logo-light.png` |

### Production icons

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 40%">
    <img src="https://citizenid.space/assets/prod/citizenid-icon-dark.png" alt="Citizen iD dark icon for light themes"/>
  </GridItem>
  <GridItem style="width: 40%" isDark>
    <img src="https://citizenid.space/assets/prod/citizenid-icon-light.png" alt="Citizen iD light icon for dark themes"/>
  </GridItem>
</FlexGrid>

| Asset                  | Use                                | URL                                                            |
|------------------------|------------------------------------|----------------------------------------------------------------|
| Dark transparent icon  | Light themes and light backgrounds | `https://citizenid.space/assets/prod/citizenid-icon-dark.png`  |
| Light transparent icon | Dark themes and dark backgrounds   | `https://citizenid.space/assets/prod/citizenid-icon-light.png` |

### Production icons with background

Use background-backed icons when the surrounding color may reduce contrast, including orange, red, highly saturated
backgrounds, gradients, photography, video thumbnails, or other non-neutral surfaces.

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 40%">
    <template #bot>
      <div style="text-align: center; margin-bottom: 8px">For square placements</div>
    </template>
    <img src="https://citizenid.space/assets/prod/citizenid-bg-icon.jpg" alt="Citizen iD icon with square background"/>
  </GridItem>
  <GridItem style="width: 40%">
    <template #bot>
      <div style="text-align: center; margin-bottom: 8px">For circular placements</div>
    </template>
    <img src="https://citizenid.space/assets/prod/citizenid-discord-icon.jpg" alt="Citizen iD icon with circular background" style="border-radius: 50%"/>
  </GridItem>
</FlexGrid>

| Asset                    | Use                                                | URL                                                              |
|--------------------------|----------------------------------------------------|------------------------------------------------------------------|
| Background icon          | Square placements and mixed backgrounds            | `https://citizenid.space/assets/prod/citizenid-bg-icon.jpg`      |
| Circular background icon | Circular embeds, avatars, Discord-style placements | `https://citizenid.space/assets/prod/citizenid-discord-icon.jpg` |

### Production social assets

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 80%">
    <img src="https://citizenid.space/assets/prod/citizenid-social-card.jpg" alt="Citizen iD production social card"/>
  </GridItem>
  <GridItem style="width: 80%">
    <img src="https://citizenid.space/assets/prod/citizenid-discord-banner.jpg" alt="Citizen iD production Discord banner"/>
  </GridItem>
</FlexGrid>

| Asset          | Use                                          | URL                                                                |
|----------------|----------------------------------------------|--------------------------------------------------------------------|
| Social card    | Link previews, articles, announcement images | `https://citizenid.space/assets/prod/citizenid-social-card.jpg`    |
| Discord banner | Community server banners and social headers  | `https://citizenid.space/assets/prod/citizenid-discord-banner.jpg` |

## Unstable environment assets

These assets are visible for integrators who need to distinguish development, staging, unstable, test, or internal
Citizen iD environments from production. Do not use red star assets for production login, public community verification,
production marketing, or production press material.

### Unstable logos

<FlexGrid style="margin-top: 8px">
  <GridItem>
    <img src="https://citizenid.dev/assets/dev/citizenid-logo-dark.png" alt="Citizen iD unstable dark logo for light themes"/>
  </GridItem>
  <GridItem isDark>
    <img src="https://citizenid.dev/assets/dev/citizenid-logo-light.png" alt="Citizen iD unstable light logo for dark themes"/>
  </GridItem>
</FlexGrid>

| Asset               | Use                                                                 | URL                                                         |
|---------------------|---------------------------------------------------------------------|-------------------------------------------------------------|
| Unstable dark logo  | Development, staging, unstable, test, or internal light backgrounds | `https://citizenid.dev/assets/dev/citizenid-logo-dark.png`  |
| Unstable light logo | Development, staging, unstable, test, or internal dark backgrounds  | `https://citizenid.dev/assets/dev/citizenid-logo-light.png` |

### Unstable icons

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 40%">
    <img src="https://citizenid.dev/assets/dev/citizenid-icon-dark.png" alt="Citizen iD unstable dark icon for light themes"/>
  </GridItem>
  <GridItem style="width: 40%" isDark>
    <img src="https://citizenid.dev/assets/dev/citizenid-icon-light.png" alt="Citizen iD unstable light icon for dark themes"/>
  </GridItem>
</FlexGrid>

| Asset                           | Use                                                                 | URL                                                         |
|---------------------------------|---------------------------------------------------------------------|-------------------------------------------------------------|
| Unstable dark transparent icon  | Development, staging, unstable, test, or internal light backgrounds | `https://citizenid.dev/assets/dev/citizenid-icon-dark.png`  |
| Unstable light transparent icon | Development, staging, unstable, test, or internal dark backgrounds  | `https://citizenid.dev/assets/dev/citizenid-icon-light.png` |

<FlexGrid style="margin-top: 16px">
  <GridItem style="width: 40%">
    <template #bot>
      <div style="text-align: center; margin-bottom: 8px">For square placements</div>
    </template>
    <img src="https://citizenid.dev/assets/dev/citizenid-bg-icon.jpg" alt="Citizen iD unstable icon with square background"/>
  </GridItem>
  <GridItem style="width: 40%">
    <template #bot>
      <div style="text-align: center; margin-bottom: 8px">For circular placements</div>
    </template>
    <img src="https://citizenid.dev/assets/dev/citizenid-discord-icon.jpg" alt="Citizen iD unstable icon with circular background" style="border-radius: 50%"/>
  </GridItem>
</FlexGrid>

| Asset                             | Use                                                                 | URL                                                           |
|-----------------------------------|---------------------------------------------------------------------|---------------------------------------------------------------|
| Unstable background icon          | Development, staging, unstable, test, or internal square placements | `https://citizenid.dev/assets/dev/citizenid-bg-icon.jpg`      |
| Unstable circular background icon | Development, staging, unstable, test, or internal circular embeds   | `https://citizenid.dev/assets/dev/citizenid-discord-icon.jpg` |

### Unstable social assets

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 80%">
    <img src="https://citizenid.dev/assets/dev/citizenid-social-card.jpg" alt="Citizen iD unstable social card"/>
  </GridItem>
  <GridItem style="width: 80%">
    <img src="https://citizenid.dev/assets/dev/citizenid-discord-banner.jpg" alt="Citizen iD unstable Discord banner"/>
  </GridItem>
</FlexGrid>

| Asset                   | Use                                                                                 | URL                                                             |
|-------------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------|
| Unstable social card    | Development, staging, unstable, test, or internal link previews                     | `https://citizenid.dev/assets/dev/citizenid-social-card.jpg`    |
| Unstable Discord banner | Development, staging, unstable, test, or internal server banners and social headers | `https://citizenid.dev/assets/dev/citizenid-discord-banner.jpg` |

## Logo and icon usage

### Clear space

Keep a minimum clear space around the logo equal to the height of the star in the logo mark. For icon-only use, keep a
minimum clear space equal to 20% of the icon width on all sides.

Do not place text, badges, borders, partner logos, UI controls, or decorative elements inside the clear space.

### Minimum size

| Asset                           | Minimum size               |
|---------------------------------|----------------------------|
| Full logo in digital UI         | 120 px wide                |
| Full logo in documents or media | 32 mm wide                 |
| Transparent icon in digital UI  | 24 px by 24 px             |
| Background icon in digital UI   | 32 px by 32 px             |
| Social card                     | Use at native aspect ratio |
| Discord banner                  | Use at native aspect ratio |

When assets must appear smaller than the minimum full-logo size, use the icon instead of the full logo.

### Theme and contrast

| Situation                                                                  | Use                                                        |
|----------------------------------------------------------------------------|------------------------------------------------------------|
| Light background                                                           | Dark logo or dark transparent icon                         |
| Dark background                                                            | Light logo or light transparent icon                       |
| Gray, black, white, or blue button                                         | Transparent icon or name asset, provided contrast is clear |
| Orange, red, saturated, photographic, gradient, or low-contrast background | Background-backed circular or square icon                  |
| Circular avatar or Discord-style placement                                 | Circular background icon                                   |

Always choose the asset variant that provides the strongest readable contrast against the immediate background.

### Prohibited modifications

Do not:

- Recolor the logo, icon, star, or wordmark.
- Change the capitalization, spacing, proportions, or composition of the wordmark.
- Stretch, compress, skew, rotate, or distort assets.
- Crop the logo or icon.
- Add outlines, shadows, glows, gradients, textures, animations, or effects.
- Place the transparent logo or icon on a background that makes it difficult to read.
- Combine Citizen iD assets with other logos in a way that implies endorsement, ownership, certification, or
  partnership.
- Use unstable red star assets for production contexts.

## Sign-in button usage

Citizen iD sign-in buttons must use an official icon or official full-name asset. Custom wordmarks are not approved.

### Approved button labels

Approved formats:

- `<icon> Sign in with Citizen iD`
- `Sign in with <name asset>`

The icon dark or light variant must correspond to the current site theme and the contrast of the underlying button
surface.

### Button colors

Approved button colors:

| Button color | Hex       | Recommended asset                               |
|--------------|-----------|-------------------------------------------------|
| Gray         | `#212126` | Light transparent icon or light full-name asset |
| Black        | `#0E0E0F` | Light transparent icon or light full-name asset |
| White        | `#F0F0F0` | Dark transparent icon or dark full-name asset   |

When using orange, red, gradients, images, or any non-approved button color, use the circular background icon to
preserve contrast and readability.

### Button examples

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 45%; text-align: center">
    <template #top>
      <strong>Approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; border: 1px solid #2d2d33; background: #212126; color: #F0F0F0; font-weight: 600;">
      <img src="https://citizenid.space/assets/prod/citizenid-icon-light.png" alt="" style="width: 24px; height: 24px"/>
      <span>Sign in with Citizen iD</span>
    </button>
  </GridItem>
  <GridItem style="width: 45%; text-align: center" isDark>
    <template #top>
      <strong>Approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; border: 1px solid #d6d6d6; background: #F0F0F0; color: #0E0E0F; font-weight: 600;">
      <img src="https://citizenid.space/assets/prod/citizenid-icon-dark.png" alt="" style="width: 24px; height: 24px"/>
      <span>Sign in with Citizen iD</span>
    </button>
  </GridItem>
</FlexGrid>

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 45%; text-align: center">
    <template #top>
      <strong>Use with care</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; border: 1px solid #d3830c; background: #F39C13; color: #0E0E0F; font-weight: 600;">
      <img src="https://citizenid.space/assets/prod/citizenid-discord-icon.jpg" alt="" style="width: 24px; height: 24px; border-radius: 50%"/>
      <span>Sign in with Citizen iD</span>
    </button>
  </GridItem>
  <GridItem style="width: 45%; text-align: center">
    <template #top>
      <strong>Not approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; border: 1px solid #d3830c; background: #F39C13; color: #0E0E0F; font-weight: 600;">
      <img src="https://citizenid.space/assets/prod/citizenid-icon-dark.png" alt="" style="width: 24px; height: 24px"/>
      <span>Sign in with Citizen iD</span>
    </button>
  </GridItem>
</FlexGrid>

### Button examples using the full-name asset

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 45%; text-align: center">
    <template #top>
      <strong>Approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 8px; border: 1px solid #2d2d33; background: #212126; color: #F0F0F0; font-weight: 600;">
      <span>Sign in with</span>
      <img src="https://citizenid.space/assets/prod/citizenid-logo-light.png" alt="Citizen iD" style="height: 22px; width: auto"/>
    </button>
  </GridItem>

  <GridItem style="width: 45%; text-align: center" isDark>
    <template #top>
      <strong>Approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 8px; border: 1px solid #d6d6d6; background: #F0F0F0; color: #0E0E0F; font-weight: 600;">
      <span>Sign in with</span>
      <img src="https://citizenid.space/assets/prod/citizenid-logo-dark.png" alt="Citizen iD" style="height: 22px; width: auto"/>
    </button>
  </GridItem>
</FlexGrid>

<FlexGrid style="margin-top: 8px">
  <GridItem style="width: 45%; text-align: center">
    <template #top>
      <strong>Not approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 8px; border: 1px solid #0d78c9; background: #2196F3; color: #F0F0F0; font-weight: 600;">
      <span>Sign in with</span>
      <img src="https://citizenid.space/assets/prod/citizenid-logo-light.png" alt="Citizen iD" style="height: 22px; width: auto"/>
    </button>
  </GridItem>

  <GridItem style="width: 45%; text-align: center">
    <template #top>
      <strong>Not approved</strong>
    </template>
    <button style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 8px; border: 1px solid #d3830c; background: #F39C13; color: #0E0E0F; font-weight: 600;">
      <span>Sign in with</span>
      <img src="https://citizenid.space/assets/prod/citizenid-logo-dark.png" alt="Citizen iD" style="height: 22px; width: auto"/>
    </button>
  </GridItem>
</FlexGrid>

## Co-branding and status language

### Allowed without special status

The following phrases may be used by applications that actually use Citizen iD for the described function:

- `Powered by Citizen iD`
- `Login secured by Citizen iD`
- `Sign in with Citizen iD`

Do not use these phrases if Citizen iD is not active in the relevant login, identity, or account flow.

### Status-restricted phrases

| Phrase                        | Requirement                                                                                                                                    |
|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| `Citizen iD verified`         | Allowed only when the community, application, or entity is actually verified by Citizen iD and that status is reflected in Citizen iD systems. |
| `Official Citizen iD partner` | Allowed only when an official partnership has been granted and that status is reflected in Citizen iD community management.                    |
| `Certified by Citizen iD`     | Not approved unless explicitly granted in writing.                                                                                             |
| `Endorsed by Citizen iD`      | Not approved unless explicitly granted in writing.                                                                                             |

Do not create badges, seals, or verification marks that resemble official Citizen iD status indicators unless those
indicators are provided or approved by Citizen iD.

## Endorsement and affiliation boundaries

Using Citizen iD branding does not imply that Citizen iD endorses, certifies, audits, sponsors, operates, or is
responsible for your application, community, event, content, or service.

Citizen iD is a community identity platform. It is not affiliated with, endorsed by, sponsored by, or operated by Cloud
Imperium Games or the official Star Citizen brand. Do not present Citizen iD assets in a way that could make users
believe your project is official Star Citizen infrastructure, an official Cloud Imperium Games service, or an official
Star Citizen partner service.

## Approval requirements

Non-physical and non-monetized use does not require explicit approval when these guidelines are followed.

| Use case                                                                            | Approval required?                                          |
|-------------------------------------------------------------------------------------|-------------------------------------------------------------|
| Application login screen using approved sign-in button                              | No                                                          |
| Developer documentation showing approved integration assets                         | No                                                          |
| Community website stating `Powered by Citizen iD`                                   | No, if the integration is active                            |
| Press article showing official production logo                                      | No, if the article is factual and non-misleading            |
| Non-monetized social post or community announcement                                 | No, if the use is factual and non-misleading                |
| Physical goods, printed materials, stickers, apparel, booth signage, or merchandise | Yes                                                         |
| Monetized use, paid promotion, sponsorship material, or commercial packaging        | Yes                                                         |
| Partnership, verification, certification, or endorsement claims                     | Yes, and the status must be reflected in Citizen iD systems |
| Modified, combined, animated, or derivative assets                                  | Yes                                                         |

When approval is required, request review before publication, production, or distribution.

## Do and don't examples

| Do                                                                                                 | Don't                                                                                    |
|----------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Use **Citizen iD** exactly.                                                                        | Use `CiD`, `CitizenID`, or `Citizen ID` as public project names.                         |
| Use the production orange star assets for production.                                              | Use development red star assets in production.                                           |
| Match dark assets to light backgrounds and light assets to dark backgrounds.                       | Place transparent assets on low-contrast or visually noisy backgrounds.                  |
| Use the circular background icon on orange, red, saturated, photographic, or gradient backgrounds. | Place a transparent icon directly on an orange or red button if contrast suffers.        |
| Say `Powered by Citizen iD` when Citizen iD powers the relevant flow.                              | Say `Official Citizen iD partner` unless that status is explicitly granted and recorded. |
| Keep clear space around the logo and icon.                                                         | Crop, stretch, recolor, outline, shadow, or combine the assets with other marks.         |
| State that Citizen iD supports Star Citizen community applications.                                | Suggest Citizen iD is official Star Citizen or Cloud Imperium Games infrastructure.      |

## Media and press usage

Media and press may use the production logo, production icon, and production social assets for factual coverage of
Citizen iD. Use the brand statement from this page where a short description is needed.

Do not use unstable assets in media coverage unless the article is specifically about development, staging, test, or
unstable Citizen iD environments.

## Legal and trademark-style terms

Citizen iD branding, logos, icons, social cards, banners, names, and related visual assets are owned by the Citizen iD
project or its applicable rights holders.

Permission to use Citizen iD brand assets is limited to the uses described in these guidelines. Citizen iD may request
correction or removal of brand usage that is misleading, harmful, low-quality, confusing, unlawful, monetized without
approval, physically reproduced without approval, or inconsistent with these guidelines.

No rights are granted to Cloud Imperium Games, Star Citizen, or any third-party marks. Star Citizen and related marks
belong to their respective rights holders.

## Implementation checklist

Before publishing a Citizen iD brand use, verify that:

- The name is written as **Citizen iD**.
- The asset is an official asset listed on this page.
- The production or unstable asset family matches the environment.
- The asset has sufficient contrast against the immediate background.
- Clear space is preserved.
- The asset is not modified.
- Button text uses an approved format.
- Co-branding language does not imply ungranted verification, endorsement, certification, or partnership.
- The page does not imply affiliation with Cloud Imperium Games or official Star Citizen infrastructure.
- Approval has been requested for physical, printed, monetized, partnership, verification, or non-standard use.

---

*Last updated: May 2026*
