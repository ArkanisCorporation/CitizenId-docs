---
title: Operations Notes
description: Public operations notes and boundaries for Citizen iD docs.
---

# Operations Notes

All Citizen iD docs are public.

Operational pages should explain user-visible behavior without publishing secrets, private infrastructure identifiers, or environment-specific access details.

## Publicly Useful Operations Topics

Maintenance windows are useful to players, community admins, and developers.

Rate limits are useful when explaining retry behavior.

OpenAPI availability is useful to developers.

Role-assignment audit behavior is useful to community admins.

## Maintainer Topics

Aspire, Kubernetes, Helm, secret providers, database migrations, release automation, and observability can be documented publicly when the content is intentionally safe.

Do not publish credentials, private cluster names, private dashboard links, or emergency-only procedures.

## Deployment Path

GitHub Pages is the canonical deployment path for this docs site.

Netlify configuration should not be treated as an active deployment target.
