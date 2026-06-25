# Discord Role Management
Citizen iD allows for automatic assignment and removal of Discord roles based on a user's Citizen iD account status, RSI verification, and other criteria.
This works in parallel with [Linked Roles](./linked-roles.md) but is managed directly by the bot, allowing for more complex triggers.

## Features

- **Verification Roles**: Automatically assign a "Verified" role when a user links their RSI account.
- **Organization Roles**: Assign roles based on the user's membership in specific RSI organizations (Main or Affiliate).
- **Rank Identification**: Map RSI organization ranks to specific Discord roles.
- **Automatic Revocation**: Roles are automatically removed if the user withdraws verification or leaves the organization.

## User Commands

Users can trigger a role update manually if they believe their roles are out of sync:

```
/roles update
```

## Configuration Requirements

For role management to function correctly:

1. The Citizen iD bot must have the **Manage Roles** permission.
2. The bot's role must be **higher** in the role hierarchy than any role it is expected to assign or remove.

---

*Last updated: February 2026*
