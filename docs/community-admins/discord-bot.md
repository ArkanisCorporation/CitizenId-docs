---
title: Discord Bot
description: Bot setup, permissions, configuration tabs, and synchronization expectations.
---

# Discord Bot

The Citizen iD Discord bot connects community configuration to Discord server behavior.

It supports role automation, nickname automation, moderation-related configuration, and manual resync commands.

## Setup Expectations

Invite the official Citizen iD bot to the correct Discord server.

Grant the permissions required by the features you plan to use.

Place the bot role high enough in the Discord role hierarchy for managed roles and nicknames.

Return to Citizen iD and configure the bot from the community portal.

<ImageStepper
  title="Existing Discord bot installation screens"
  note="These images are placeholders from an older Discord bot setup flow and should be replaced with current production screenshots when available."
  :items="[
    {
      src: '/images/discord-bot-install.png',
      alt: 'Discord bot installation dialog for Citizen iD.',
      title: 'Install bot',
      caption: 'Shows the Discord-side installation dialog used to add the Citizen iD bot.',
      description: 'Start from the official bot invite path and confirm that the request names the expected Citizen iD application before continuing.'
    },
    {
      src: '/images/discord-bot-install-server.png',
      alt: 'Discord bot installation server selection dialog.',
      title: 'Choose server',
      caption: 'Shows the Discord server selection step during bot installation.',
      description: 'Select the community server you administer, because the bot can only manage the server where it is installed and permitted.'
    },
    {
      src: '/images/discord-bot-server-roles.png',
      alt: 'Discord server roles page showing role ordering priority.',
      title: 'Check hierarchy',
      caption: 'Shows the Discord role hierarchy that affects whether the bot can manage roles and nicknames.',
      description: 'Place the Citizen iD bot role above roles it must assign or members whose nicknames it must manage.'
    }
  ]"
/>

## Configuration Areas

The community bot configuration is organized around General, Roles, Nicknames, and Moderation.

Role and permission changes may take up to five minutes to become visible in Citizen iD.

Manual role refresh commands can help when members believe their roles are out of sync.

## Linked Role Setup

Some Discord linked role setup happens in Discord server settings.
Use these screens when the community wants Discord's linked-role claim interface to use Citizen iD metadata.

<ImageStepper
  title="Existing Discord linked role setup screens"
  note="These images are placeholders from an older Discord linked-role setup flow and should be replaced with current Discord and Citizen iD screenshots when available."
  :items="[
    {
      src: '/images/discord-bot-server-role-links.png',
      alt: 'Discord server settings page showing role links.',
      title: 'Open role links',
      caption: 'Shows the Discord server settings area where role links are managed.',
      description: 'Use this area when configuring a Discord role that players can claim after Citizen iD metadata confirms the requirement.'
    },
    {
      src: '/images/discord-bot-server-role-add-link.png',
      alt: 'Discord dialog for adding a role link connection.',
      title: 'Add connection',
      caption: 'Shows the connection dialog used when adding Citizen iD as a linked-role provider.',
      description: 'Choose the Citizen iD connection only for roles whose claim requirement should be backed by Citizen iD account state.'
    },
    {
      src: '/images/discord-bot-server-role-configure-link.png',
      alt: 'Discord linked role requirements configuration dialog.',
      title: 'Configure requirement',
      caption: 'Shows the requirement selection step for a Discord linked role.',
      description: 'Select requirements that match the access rule you want players to satisfy before Discord allows the role claim.'
    }
  ]"
/>

## Related Legacy Content

The old Discord setup pages remain available during migration.

See [Discord Integrations](/integrator-guide/discord/).
