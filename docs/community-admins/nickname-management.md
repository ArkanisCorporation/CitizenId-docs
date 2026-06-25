---
title: Nickname Management
description: Template-based Discord nickname automation for communities.
---

# Nickname Management

Citizen iD can manage Discord nicknames for a community server.

Nickname management is template-based and uses selected player fields to compose the final nickname.

## How It Works

Choose the fields that should appear in the nickname template.

Citizen iD composes a Discord-safe nickname from the available account information.

Discord nickname limits still apply.

The current implementation keeps generated nicknames within Discord's 32-character limit.

## Operational Notes

The bot needs Discord permissions to manage nicknames.

The bot role must be high enough in the server role hierarchy.

Members may also use player-facing commands to set or unset a Citizen iD display name where supported.

Manual resync is useful when Discord state and Citizen iD state appear out of sync.

## Related Legacy Content

The old nickname page remains available while this page is expanded.

See [Nickname Management](/integrator-guide/discord/nickname-management).
