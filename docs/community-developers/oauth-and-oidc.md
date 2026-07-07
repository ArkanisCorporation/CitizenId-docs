---
title: OAuth And OIDC
description: OAuth 2.0 and OpenID Connect entry points for developers.
---

# OAuth And OIDC

Citizen iD is an OAuth 2.0 and OpenID Connect provider.

Community tools can use it for sign-in, account linking, API access, and approved delegation workflows.

## Core Endpoints

Use `/connect/authorize` to start an authorization request.

Use `/connect/token` to exchange authorization codes, refresh tokens, client credentials, or approved token exchanges.

Use `/connect/userinfo` for OpenID Connect user information.

Use `/connect/revoke` for standard OAuth token revocation.

Use the OpenID Connect discovery document to find supported metadata for the environment you target.

## Supported Use Cases

Use authorization code flow for user sign-in.

Use refresh tokens when your application needs continuing access and the user approved `offline_access`.

Use client credentials for application-owned API calls where your client is approved for that access.

Use token exchange only when your application is approved for delegation.

## Legacy Details

The older OAuth pages contain the current code samples while this section is reorganized.

See [OpenID Connect](/integrator-guide/oauth2/oidc) and [Flows And Grants](/integrator-guide/oauth2/flows-grants).
