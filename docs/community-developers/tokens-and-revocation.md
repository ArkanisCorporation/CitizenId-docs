---
title: Tokens And Revocation
description: Token lifetime, refresh tokens, delegated tokens, and revocation surfaces.
---

# Tokens And Revocation

Citizen iD issues tokens through OAuth 2.0 and OpenID Connect flows.

Community developers should understand which token belongs to the user, which token belongs to the application, and which revocation path applies.

## Token Types

Access tokens authorize API access.

ID tokens identify the signed-in user for OpenID Connect clients.

Refresh tokens can renew access when `offline_access` was approved.

Delegated tokens can represent approved token-exchange scenarios.

## Revocation Paths

Use `/connect/revoke` for standard OAuth token revocation.

Players can revoke application authorizations from their account.

Approved applications can use application-owned token management APIs where available.

Document whether an endpoint is user-token, application-token, or integrator-user protected before building against it.

## Legacy Details

The older token pages remain available while this page is expanded.

See [Token Reference](/integrator-guide/oauth2/tokens), [Credential Delegation](/integrator-guide/oauth2/delegation), and [Credential Revocation](/integrator-guide/oauth2/revocation).
