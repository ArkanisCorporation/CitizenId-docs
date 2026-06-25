---
title: Scopes And Claims
description: Scope families, required scopes, consent, and token claims.
---

# Scopes And Claims

Scopes define what a community application is asking Citizen iD to share.

Claims are the values Citizen iD may place in tokens or userinfo responses after access is approved.

## Scope Families

Citizen iD supports standard identity scopes such as `profile`, `email`, `roles`, and `offline_access`.

It also supports Citizen iD and provider-specific scopes for Discord, Google, Twitch, RSI profile data, RSI organization data, and public roles.

Some scope families have required variants such as `email:required` or `rsi.profile:required`.

Required scopes are first-class requests, but they share a canonical family with the optional form.

## Missing Data

Optional data can be omitted when it does not exist or is not approved.

Required data can block authorization until the player supplies the missing requirement.

This distinction should be visible in developer docs and player consent docs.

## Claim Naming

Citizen iD uses the OpenID Connect role claim name `role`.

Older docs may still say `roles` in some places.

Treat that wording as legacy until the detailed claims table is rewritten.

## Legacy Details

The older scopes page remains available while this page is rewritten from current code.

See [Scopes And Claims](/integrator-guide/oauth2/scopes-claims).
