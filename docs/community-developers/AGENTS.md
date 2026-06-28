# Community Developer Documentation Guide

This guide applies to community-developer pages under `docs/community-developers/`.
Use it together with the parent `docs/AGENTS.md`.

## Reader Model

Assume the reader is integrating a community website, overlay, dashboard, bot, or operations tool.
Be precise about OAuth, OIDC, scopes, claims, consent, revocation, token handling, and data retention.
Separate normative requirements from examples.

## Developer Diagrams

Use diagrams for OAuth flows, consent boundaries, token lifecycle, claim production, API calls, revocation, and data ownership.
Use `actor` for players, app operators, community developers, and external providers.
Use `service` for Citizen iD authorization, identity, consent, token, and API services.
Use `context` for client apps, redirects, browsers, dashboards, and external systems.
Use `data` for tokens, claims, userinfo responses, exports, and stored records.
Use `decision` for consent, scope requirements, validation checks, and authorization outcomes.
Use `blocked` for denied consent, missing requirements, invalid tokens, and forbidden access.

Developer diagrams may be more technical than player diagrams.
Still label edges with reader-facing events such as `Authorize`, `Request token`, `Validate claims`, or `Revoke access`.
Do not put secrets, example real tokens, or confidential endpoints into diagrams.
