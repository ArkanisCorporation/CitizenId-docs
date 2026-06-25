# Discord Nickname Management
Citizen iD can automatically manage the nicknames of members in your Discord server to match their verified RSI handle or a custom display name.

## Features

- **Automatic Sync**: Upon joining or verifying, a user's nickname is updated to match their Citizen iD profile.
- **RSI Handle Sync**: By default, the nickname is set to the user's verified RSI handle.
- **Custom Display Name**: Users can choose to use a custom display name (if allowed by your server configuration) via the `/account set-display-name` command.
- **Enforcement**: If a user manually changes their nickname in Discord, the bot can be configured to revert it to the enforced value.

## Configuration

To enable nickname management:

1. ensure the Citizen iD bot has the **Manage Nicknames** permission,
2. and that the bot's role is **above** the roles of the users you want it to manage in the server role hierarchy.

*Note: The bot cannot change the nickname of the server owner or users with roles higher than the bot's highest role.*

---

*Last updated: February 2026*
