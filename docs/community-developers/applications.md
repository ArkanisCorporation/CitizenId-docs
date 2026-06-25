---
title: Applications
description: Community-scoped application records for Citizen iD integrations.
---

# Applications

Applications represent community tools that integrate with Citizen iD.

They are managed from the developer portal and are scoped through the relevant community context.

## Client Types

Public clients are suitable for applications that cannot safely store a client secret.

Confidential clients are suitable for trusted server-side applications that can protect a client secret.

Confidential client secrets are shown only when created or reset.

Store them securely and rotate them when access changes.

## Redirect URIs

Redirect URIs define where Citizen iD can send users after authorization.

Post-logout redirect URIs define where users can return after sign-out flows.

Keep development, staging, and production URIs separate.

## Security Settings

Use PKCE for public clients.

Use pushed authorization requests where required by the application configuration.

Request only the permissions and scopes your tool needs.

## Legacy Details

The older OAuth setup page remains available while this page is expanded.

See [OAuth2 Integration](/integrator-guide/oauth2/).
