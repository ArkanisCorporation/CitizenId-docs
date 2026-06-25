---
title: Role Assignments
description: Role assignment templates, conditions, targets, preview, audit logs, and resync.
---

# Role Assignments

Role assignments are the core community-admin automation model for Citizen iD.

They replace shallow "one condition, one role" thinking with templates that can evaluate Citizen iD, Discord, RSI, and community context.

## Template Anatomy

A role assignment template has a display name, description, group, order, condition, targets, and enabled state.

Conditions can be composite and can inspect Citizen iD state, Discord state, public profile settings, RSI profile data, RSI profile details, and RSI organization membership.

Targets can assign Citizen iD roles, Discord roles, or RSI organization based roles.

## Preview Before Applying

Use preview before relying on a new or changed template.

Preview builds an evaluation context, applies templates, and reports the resulting role state before live changes are made.

Preview is also the safest place to test custom RSI organization membership cases.

## Audit And Resync

Role assignment changes are audited.

Audit entries are scoped to the community and can be filtered by outcome, date range, and operation details.

Members can ask for a manual role update when they believe Discord roles are out of sync.

Community admins should use audit entries when escalating support.

## Related Legacy Content

The old role management page remains available while this deep-dive is expanded.

See [Role Management](/integrator-guide/discord/role-management).
