---
title: Linked Accounts
description: Add, use, and remove external identities connected to a Citizen iD account.
---

# Linked Accounts

Linked accounts connect Citizen iD to external identity providers.
They let you sign in, recover account access, use Discord features, prove RSI account control, or provide provider-specific claims to applications that you approve.
Not every linked account has the same purpose.

The common provider roles are:

<dl>
  <dt><strong>Discord</strong></dt>
  <dd>Usually tied to Discord server features such as linked roles, role assignments, nickname management, and Discord-based discovery where enabled.</dd>
  <dt><strong>Google and Twitch</strong></dt>
  <dd>General sign-in providers unless a specific application requests provider-related data and you approve that request.</dd>
  <dt><strong>RSI</strong></dt>
  <dd>A trust-sensitive game-account verification link used for Star Citizen identity checks.</dd>
  <dt><strong>Email</strong></dt>
  <dd>Can support contact and recovery where the product flow offers it.</dd>
</dl>

<ImageFigure
  src="/images/citizenid-discord-auth.png"
  alt="Old Discord authorization screen asking the player to authorize Citizen iD access."
  title="Provider authorization"
  caption="Shows the provider-side authorization step that can appear while adding or using a linked Discord account."
  description="Citizen iD sends you to the provider when it needs that provider to confirm who you are or approve a new link."
  note="This image is a placeholder from an older Discord provider flow and should be replaced with the current linked accounts management page when available."
  missing="The ideal image should show provider cards for Discord, Google, Twitch, email, and RSI-style special links, plus the add, unlink, and last-sign-in-provider warning states."
/>

## Link Accounts

Use the linked-account flow when you intentionally want another provider attached to the same Citizen iD account.

1. Open the linked accounts page from your account portal or account settings.
2. Choose the provider you want to add.
3. Authorize the connection on the provider's own screen.
4. Return to Citizen iD after the provider callback completes.
5. Confirm that the account appears in the linked accounts list.
6. Return to the original application or Discord flow if that flow required the link.

## Unlink Accounts

You can unlink supported external providers from the linked accounts page.
The normal unlink flow is:

1. Open the linked accounts page.
2. Review which provider account will be removed.
3. Confirm the unlink action when Citizen iD asks for confirmation.
4. Check whether the provider disappeared from the linked accounts list.
5. Review affected Discord or application flows if that provider was used by them.

Unlinking removes the association between that provider account and your Citizen iD account.
It can also trigger cleanup in external integration state, depending on the provider.

You cannot unlink your last external sign-in method unless another supported sign-in method is already linked.
This protects you from locking yourself out of the account.

::: warning Last sign-in method
If Discord is your only sign-in method and you want to unlink it, add another supported provider first.
Otherwise you may lose the normal way to sign in.
:::

## Provider Effects

Provider links affect different parts of the platform:

<dl>
  <dt><strong>Discord</strong></dt>
  <dd>Affects Discord linked roles, Discord bot account matching, role assignment, nickname management, and Discord-based discovery where enabled.</dd>
  <dt><strong>Google and Twitch</strong></dt>
  <dd>Can be used for sign-in and can provide provider-specific data to applications only when the relevant access is requested and approved.</dd>
  <dt><strong>Email</strong></dt>
  <dd>Can support contact or account recovery where available.</dd>
  <dt><strong>RSI verification</strong></dt>
  <dd>Affects verified status, RSI-derived claims, public profile behavior, and community rules that depend on Star Citizen identity.</dd>
</dl>

## RSI Links

RSI verification is not just another social login.
It is a trust signal used by communities and integrations.
Removing or changing the RSI link may require support because Citizen iD needs to preserve integrity against duplicate verification, impersonation, and ban evasion.
If you verified the wrong RSI account or need the link reviewed, contact support instead of trying to create a second Citizen iD account to work around the issue.

## After Unlinking

Unlinking stops Citizen iD from treating that provider account as connected going forward.
It does not automatically delete data that a Discord server, external application, or provider already stored.

After unlinking, remember these follow-up effects:

- Discord servers may need time or a resync before role or nickname automation reflects the change.
- External applications may retain data they already received while authorized.
- Provider-side data remains controlled by the provider.
- Application authorization is separate, so use [External Apps](/players/external-apps) to revoke application access.
