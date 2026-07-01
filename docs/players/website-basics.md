---
title: Website Basics
description: Player sign-up, sign-in, account overview, settings, and normal website use.
---

# Website Basics

The Citizen iD website is where you manage the parts of your identity that belong to Citizen iD itself.
That includes signing in, creating an account, [linking sign-in providers](/players/linked-accounts), checking [RSI verification](/players/rsi-verification), reviewing [authorized applications](/players/third-party-apps#revoke-access), changing [privacy settings](/players/privacy-controls), and downloading your [account data](/players/data-rights#download-your-data).
If a community tool, Discord server, or third-party app sends you to Citizen iD, the website is the place where you authenticate and decide what happens next.

Production is intended to support Discord, Google, and Twitch sign-in.
Staging environments may expose fewer providers because they are used for testing and verification before production release.

The supported providers have different practical roles:

- **Discord** is used for Discord-linked community workflows and can also identify the Discord account that communities expect to see.
- **Google** is available for general account access and can provide an email address for the Citizen iD account.
- **Twitch** is available for general account access and can provide an email address where that account data is available.

The sign-up and sign-in pages can look similar because they show the same provider choices.
The behavior is intentionally different, so use the entry point that matches what you are trying to do.

<ImageFigure
  src="/images/citizenid-sign-in.png"
  alt="Old Citizen iD sign-in page showing available provider buttons."
  title="Sign-in providers"
  caption="Shows the provider choice that appears when you start sign-in or account creation from Citizen iD."
  description="Choose the provider that belongs to the Citizen iD account you want to open, especially when you already use Citizen iD with Discord servers or community tools."
  note="This image is a placeholder from the older sign-in interface and should be replaced with current production sign-in and sign-up screenshots when available."
/>

## Account Entry {#account-entry}

Citizen iD has two direct entry points for normal account access.
Use [Create Account](#create-account) when a new account may be created, and [Open Account](#open-account) when you only want an existing account.

### Create Account {#create-account}

Use [register or sign in](https://citizenid.space/sign-up) when you are ready for Citizen iD to create an account if one does not already exist for the selected provider.
If the selected provider is already linked to an existing Citizen iD account, the same page signs you in to that account instead.
If the selected provider is not linked to any Citizen iD account, Citizen iD can automatically create a new account for you.

### Open Account {#open-account}

Use [sign in](https://citizenid.space/sign-in) when you are unsure whether an account already exists or when you want the safer no-create path.
The sign-in page either signs you in to an account that already has the selected provider linked, or tells you that the account was not found.
It never creates a new account from that direct sign-in entry point.

This distinction matters most when you have used Citizen iD before.
If you accidentally choose the register-or-sign-in entry with a different provider, Citizen iD may create a separate new account instead of opening the one you expected.
If your goal is only to return to an existing account, start with sign in.

## First Sign-Up

Use register-or-sign-in when you do not already have a Citizen iD account, or when you intentionally want Citizen iD to create one if no account exists for the chosen provider.
The normal first-use flow is:

1. Open the register-or-sign-in page.
2. Choose a supported provider.
3. Authorize the connection on the provider's own screen.
4. Return to Citizen iD after the provider completes the callback.
5. Complete the first-account setup steps that Citizen iD presents.
6. Continue to the account overview or back to the tool that started the flow.

After initial sign-up, Citizen iD guides you through the core setup tasks that make the account usable.
You should expect to review and accept required legal documents such as privacy policy, terms of service, or other service conditions before using the account normally.
You should also expect to choose default account settings such as username, display name, and privacy options.
Citizen iD then guides you toward RSI account verification.
RSI verification can be skipped when it is not required for the immediate task, but it is recommended to handle it right away because many communities and third-party apps rely on verified Star Citizen identity.

::: tip Recommended first setup
- Create or open the account from the intended provider.
- Accept the required legal agreements.
- Set the username, display name, and privacy defaults.
- Link Discord if you use Citizen iD with Discord servers.
- Verify RSI if your communities require verified Star Citizen identity.
- Review privacy controls before relying on public profile lookup.
:::

## Sign In

Use sign in when you already have a Citizen iD account and want to avoid accidental account creation.
Your entry point determines what happens after authentication:

- If you sign in from the Citizen iD website, you usually land in the account overview.
- If a third-party app redirected you to Citizen iD, the flow may continue into an app consent screen and then return you to that app.
- If you are already signed in, Citizen iD can skip the provider step and take you directly to the next part of the flow.

The provider you choose must be linked to the Citizen iD account you want to open.
If you choose a provider that belongs to a different account, you will sign in to that different account.
If you choose a provider that is not linked to any account, the direct sign-in page tells you that the account was not found instead of creating a new one.

When troubleshooting account access, compare three things before changing settings:

- The page you started from: register-or-sign-in, sign-in, or a third-party app redirect.
- The provider you selected: Discord, Google, Twitch, or another provider when supported.
- The account you expected: username, display name, linked providers, and RSI verification state.

## Third-Party Sign-In

Third-party apps are community-operated tools that use Citizen iD for [sign-in, consent, or API access](/players/third-party-apps).
When a third-party app sends you to Citizen iD, Citizen iD tries not to create a new account by accident.
The selected sign-in provider should already be linked to the existing Citizen iD account that you want to use.

Creation of a completely new Citizen iD account during a third-party app flow is also supported.
The important difference is intent: if the app flow is trying to find an existing Citizen iD account, use a provider that is already linked to that account.
If the flow lets you intentionally create a new account, complete the same first-account setup steps described above before expecting verified or consent-protected data to be available.

If a third-party app says that required data is missing, return to the Citizen iD account overview and check the account state first.
Common blockers include missing [linked providers](/players/linked-accounts), missing email data, incomplete legal agreements, [privacy settings](/players/privacy-controls), or incomplete [RSI verification](/players/rsi-verification).

## Account Overview

The account overview is the best first place to check account state.
Use it to confirm the important account facts before changing Discord roles, reauthorizing a third-party app, or asking a community admin to debug an issue.

From the account overview, players can reach the main account surfaces:

- **Settings** for username, display name, privacy settings, email/contact information, integrator access, linked accounts, and sign-in providers.
- **Community portal** for publicly available Discord bot and community management features when the account has access to those tools.
- **Authorized applications** for reviewing third-party apps that can use Citizen iD authorization.
- **RSI account management** for checking verified RSI state and daily public profile refresh context.

The overview also summarizes visible account state such as verified RSI status, roles, authorized app count, and communities or Discord servers that use Citizen iD services.
If you are trying to debug a problem, check this page before changing connected systems.
It tells you whether the issue is likely about your Citizen iD account or about the third-party system using it.

<ImageFigure
  src="/images/citizenid-account-overview-current.png"
  alt="Current Citizen iD account overview showing account navigation, settings link, Discord server services, verified RSI account, roles, and authorized applications."
  title="Account overview"
  caption="Shows the current signed-in home page where a player checks important account state."
  description="Use this page to navigate to settings, community management areas, RSI account details, and authorized applications before troubleshooting connected tools."
/>

## Account Settings {#account-settings}

Account settings contain profile, access, contact, linked-account, and privacy controls.
Use account settings for:

- Updating basic account information such as username and global display name.
- Managing account recovery and contact information such as email when available from linked providers.
- Opening integrator access for OIDC, OAuth2, and API features where the account has that product role.
- Reviewing linked account state and opening linked-account management.
- Changing public profile discovery switches.
- Requesting your account data export.
- Following the current account removal process.

The public discovery switches affect how other users and applications can find your Citizen iD profile.
They do not override consent that you intentionally granted to a third-party app.
If an application already has authorization to receive linked profile data, it may still resolve your account through the data you approved for that app.
Use [Privacy Controls](/players/privacy-controls) to compare public discovery, authorized applications, and browser analytics preferences.

<ImageFigure
  src="/images/citizenid-account-settings-current.png"
  alt="Current Citizen iD account settings page showing account essentials, account recovery and contact, integrator access, linked accounts, public profile discovery options, and data download link."
  title="Account settings"
  caption="Shows the current settings page where a player updates profile, contact, access, linked-account, and privacy options."
  description="Use this page when the question is about display name, username, email and recovery options, integrator access, sign-in providers, profile discovery, or account data download."
/>

Account removal is request-only at the moment.
Self-service removal is intended, but the docs should not claim that it is available until the product flow exists.

## Maintenance States

Citizen iD can show maintenance messages for sign-in, sign-up, RSI verification, authorization, or other modules.
Maintenance can be global or targeted.
If a maintenance window blocks a task:

1. Read the maintenance message before retrying.
2. Wait until the window ends unless the message tells you to contact support.
3. Avoid repeated retries if the message mentions rate limits.
4. Include the page, UTC time, and maintenance title or error request ID when asking for support.

::: details Details for blocked website flows

A blocked sign-in does not always mean your provider login is wrong.

It can also mean one of these conditions is active:

- Sign-in maintenance is active.
- Legal agreements must be accepted.
- A provider callback failed.
- A rate limit was hit.
- The current environment does not support the provider you selected.
- The third-party app requested account state that your Citizen iD account does not currently have.

Collect the request ID, wait for the retry period if one is shown, and include the affected provider when asking for help.

:::
