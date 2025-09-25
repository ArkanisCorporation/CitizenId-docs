# Discord Integration Guide

Citizen iD can be integrated with Discord servers as a connection to automatically manage [linked roles](https://support.discord.com/hc/articles/8063233404823), classic roles and user nicknames.

## Step 1 — Invite the Citizen iD Bot to Your Server

Begin by [inviting the official Citizen iD bot to your Discord server](https://discord.com/oauth2/authorize?client_id=1401182502021894255).
The bot acts as the connection between Discord’s Linked Roles system, your Discord server and the Citizen iD platform.
Follow the prompts to select the relevant server and authorize the bot with requested permissions.

![Discord Bot Installation Dialog](/images/discord-bot-install.png)

![Discord Bot Installation Server Selection Dialog](/images/discord-bot-install-server.png)

## Step 2 — Change the Bot's Role Position

After adding the bot to your server, navigate to the Roles section in your Server Settings.
Ensure that the Citizen iD bot's role is positioned **<u>above</u> any roles it will manage**.
_This is crucial for the bot to have the necessary permissions to manage roles and nicknames correctly._

![discord-bot-server-roles.png](/images/discord-bot-server-roles.png)
