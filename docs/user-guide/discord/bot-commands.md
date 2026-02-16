# Discord Bot Commands

The Citizen iD Discord bot offers a variety of slash commands to help users manage their accounts and assisting server administrators in maintaining their community.

## Account Management

These commands allow users to manage their Citizen iD account directly from Discord.

- **/account create**
  <br>Prompt a user to create a Citizen iD account. This is useful for onboarding new members.

- **/account set-display-name**
  <br>Update your display name preferences. This allows you to change your global or server specific display name.

- **/account unset-display-name**
  <br>Remove your custom display name preference and revert to the default behavior.

## RSI Profile

Commands for interacting with RSI profile data.

- **/rsi profile**
  <br>Retrieve and display information about an RSI profile, such as verification status and organization memberships.

- **/rsi refresh**
  <br>_(Admin Only)_ Force a refresh of RSI profile data for a specific user. This is useful if a user's data appears out of sync.

## Role Management

- **/roles update**
  <br>Request an immediate update of all user roles on the current server.
  <br><em>Note: This command requires the "Manage Roles" permission to be used.</em>

## System Administration

These commands are intended for bot administrators and debugging purposes.

- **/system reverify**
  <br>_(Admin Only)_ Force the system to re-verify an account's status.

- **/system resync-state**
  <br>_(Admin Only)_ Force a complete re-sync of an account's state across all services.

- **/system health**
  <br>Display a health report for the bot and its connected services.

---

*Last updated: February 2026*
