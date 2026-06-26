---
title: Privacy Controls
description: Public profile discovery, external account discovery, application consent, and analytics choices.
---

# Privacy Controls

Citizen iD privacy controls decide how your account can be discovered and how future sharing happens through Citizen iD.
They are not a magic eraser for every copy of information already held by Discord, RSI, Google, Twitch, a community server, or an external application.

Think of privacy controls as three separate layers: <strong>public discovery</strong>, <strong>application consent</strong>, and <strong>analytics consent</strong>.
Each layer answers a different question.

<dl>
  <dt><strong>Public discovery</strong></dt>
  <dd>Controls whether other people or supported lookup paths can find your Citizen iD profile.</dd>
  <dt><strong>Application consent</strong></dt>
  <dd>Controls whether a specific external application may receive approved claims through Citizen iD.</dd>
  <dt><strong>Analytics consent</strong></dt>
  <dd>Controls whether analytics can run in your browser for the Citizen iD website.</dd>
</dl>

<figure class="cid-illustration">
  <figcaption><strong>Illustration plan:</strong> Privacy controls decision tree.</figcaption>
  <p>The diagram should ask three questions: can people find my Citizen iD profile, can apps receive approved claims, and can analytics run in my browser.</p>
  <p>The answer path should point to public discovery switches, authorized apps, and analytics consent respectively.</p>
</figure>

## Discovery Options

Citizen iD has two public discovery switches that matter most to players.

<dl>
  <dt><strong>Allow public profile discovery</strong></dt>
  <dd>This allows your Citizen iD profile to be discovered by your Citizen iD account ID or verified RSI handle.</dd>
  <dt><strong>Allow discovery via linked external accounts</strong></dt>
  <dd>This allows supported linked external accounts, such as Discord, to be used for public profile discovery where a feature supports it.</dd>
</dl>

The first switch controls whether the profile itself can be public.
The second switch controls whether linked external accounts can be used as a lookup path into that profile.

External-account discovery depends on public profile discovery.
If the profile is not publicly discoverable, linked external account discovery cannot make it public by itself.

Use this quick interpretation:

- Turn off public profile discovery when you do not want profile lookup to confirm that your Citizen iD profile is public.
- Turn off linked-account discovery when you do not want supported provider links, such as Discord, to act as public lookup handles.
- Keep both concepts separate from application authorization, because applications use consent rather than public discovery.

## Public Profiles

When public profile discovery is enabled, public profile pages can show your display name, avatar, and public RSI account data.
Public RSI account data means data that Citizen iD can read from public RSI/Spectrum sources and that is suitable for the public profile surface.

When discovery is disabled, a lookup can return a not-found or not-public result even when the account exists.
That is intentional.
It prevents the lookup result from confirming private account existence in situations where the profile should not be discoverable.

Public profile behavior can therefore produce three different outcomes:

- A public profile appears because discovery is enabled and the profile has public data to show.
- A lookup fails because the profile is not publicly discoverable.
- A lookup finds an account but cannot expose details because the relevant visibility setting blocks the surface.

## External Discovery

External-account discovery matters when a feature tries to resolve your Citizen iD profile through a linked provider account.
Discord is the most important example today.
Some Discord linked-role or bot flows may need to resolve your Citizen iD account from Discord account context.

If the relevant discovery setting is off, the lookup can fail even though both accounts exist.
Use this setting when you want to decide whether provider links can be used as public lookup handles.

When external discovery fails, check:

- Whether public profile discovery is enabled.
- Whether discovery through linked external accounts is enabled.
- Whether the provider account is actually linked to the expected Citizen iD account.
- Whether the feature you are using supports that provider as a lookup path.

## Application Consent

Application consent is separate from public discovery.
An application can receive data covered by approved scopes even if your public profile is not discoverable.
That happens because you explicitly authorized that application through the Citizen iD consent flow.

If you no longer want an application to receive data, review and revoke it in [External Apps](/players/external-apps).

The practical rule is:

- Public discovery controls who can look up public profile surfaces.
- Application consent controls which approved application can receive approved claims.
- Revocation stops future application access through Citizen iD.
- Revocation does not automatically delete data an application already received.

::: warning Consent is separate
Turning off public discovery does not revoke an application authorization.
Revoking an application authorization does not necessarily disable Discord server automation.
These controls are related, but they are not interchangeable.
:::

## Analytics Consent

Citizen iD analytics are consent-gated.
The analytics behavior is:

- If you accept analytics, analytics may run in that browser context.
- If you reject analytics, analytics tracking should stay disabled.
- If your browser sends Do Not Track, Citizen iD can treat that as a forced analytics rejection.

Analytics consent is stored locally in your browser, so changing browsers or clearing storage can cause the banner or preference state to appear again.

## Good Questions

Use these questions to choose the right control:

- Ask <em>who can find my profile</em> when changing discovery settings.
- Ask <em>which application can access which data</em> when reviewing consent.
- Ask <em>which server configured this automation</em> when Discord roles or nicknames change.
- Ask <em>where is this data stored now</em> when trying to delete or correct old third-party data.
