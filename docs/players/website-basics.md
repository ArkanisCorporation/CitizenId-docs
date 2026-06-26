---
title: Website Basics
description: Player sign-up, sign-in, account dashboard, and normal website use.
---

# Website Basics

The Citizen iD website is where you manage the parts of your identity that belong to Citizen iD itself.
That includes signing in, creating an account, linking providers, checking RSI verification, reviewing authorized applications, changing privacy settings, and downloading your account data.
If a community tool or Discord server sends you to Citizen iD, the website is the place where you authenticate and decide what happens next.

Production is intended to support Discord, Google, and Twitch sign-in.
Staging environments may expose fewer providers because they are used for testing and verification before production release.

The production sign-in surface is intended to support:

- Discord for Discord-linked community workflows.
- Google for general account access.
- Twitch for general account access where Twitch identity is useful to the player or application.

<figure class="cid-illustration">
  <figcaption><strong>Illustration plan:</strong> Citizen iD account portal overview screenshot.</figcaption>
  <p>The screenshot should show the signed-in account portal with callouts for verified status, linked accounts, authorized apps, account settings, and privacy/data actions.</p>
  <p>The callouts should avoid personal data by using a seeded demo account.</p>
</figure>

## First Sign-Up

Use sign-up when you do not already have a Citizen iD account.
The normal first-use flow is:

1. Open the sign-up page.
2. Choose a supported external provider.
3. Authorize the connection on the provider's own screen.
4. Return to Citizen iD after the provider completes the callback.
5. Confirm that Citizen iD created or opened your account.
6. Continue to the account portal or back to the tool that started the flow.

For a smooth first setup, link the providers you expect to use and complete RSI verification before a community requires it.
This prevents the common situation where you are already in a Discord role claim or external app sign-in flow and need to stop midway to finish account setup.

::: tip Recommended first setup
- Create the account.
- Link Discord if you use Discord servers.
- Verify RSI if your communities require verified Star Citizen identity.
- Review privacy controls before relying on public profile lookup.
:::

## Sign In

Use sign-in when you already have a Citizen iD account.
Your entry point determines what happens after authentication:

- If you sign in from the Citizen iD website, you usually land in the account portal.
- If an external application redirected you to Citizen iD, the flow may continue into an application consent screen and then return you to that application.
- If you are already signed in, Citizen iD can skip the provider step and take you directly to the next part of the flow.

The sign-in provider you choose must be linked to your Citizen iD account.
If it is not linked, Citizen iD may treat the provider login as a new account attempt, a linking flow, or an error depending on where the flow started.

## Account Portal

The account portal is the best first place to check account state.
Use it to confirm the high-signal account facts before changing external systems:

- Whether you are signed in to the expected Citizen iD account.
- Whether RSI verification is complete.
- Whether the providers you need are linked.
- Whether the applications you rely on are authorized.
- Whether account settings, linked accounts, authorized apps, and data export are reachable.

If you are trying to debug a problem, check the portal before changing Discord roles or reauthorizing an external application.
It tells you whether the issue is likely about your Citizen iD account or about the external system using it.

## Account Settings

Account settings contain profile and privacy controls.
Use account settings for:

- Updating basic account information such as your global display name.
- Reviewing linked account state and opening linked-account management.
- Changing public discovery switches.
- Requesting your account data export.
- Following the current account removal process.

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

Collect the request ID, wait for the retry period if one is shown, and include the affected provider when asking for help.

:::
