# Discord Linked Roles Integration

The linked roles allow various conditions to be configured based on RSI account verification state and account data.
This allows communities to securely grant access, enforce membership rules, or unlock special channels without custom RSI account checks.

## Step 1 — Add the Citizen iD App Link

Open the Server Settings in Discord and navigate to the "People" > "Roles" section.
Here, create a new role and add Citizen iD as a connected app under "Links" tab using the "Add requirement" button.
![Discord Server Role Link Add](/images/discord-bot-server-role-links.png)

Click the Citizen iD connection under "Apps".
This establishes the link between Discord's role system and Citizen iD accounts of your members.
![Discord Server Role Link Connection Dialog](/images/discord-bot-server-role-add-link.png)

## Step 2 — Configure Role Conditions

When setting up the corresponding linked role, define the conditions under which it should be granted.
For example, you may require that a user has a verified RSI account linked or that their RSI account has existed for a minimum number of days.
These checks are performed automatically by Citizen iD.

![Discord Server Role Link Connection Requirements](/images/discord-bot-server-role-configure-link.png)

## Step 3 — Inform Your Users

Once the setup is complete, let your community know how to claim their new role.
Users will see the corresponding role listed under the "Linked Roles" dialog in your server menu  and can connect their accounts in just a few clicks.
You can also use the `<id:linked-roles>` Discord message link to allow users to visit the linked roles menu in your server directly.

![Discord Server Navigation Menu](/images/discord-server-menu-roles.png)

![Discord Server Linked Role Selection Dialog](/images/discord-linkedroles-select.png)

Once they select the role, Discord will display a prompt to connect their Citizen iD account.
![Discord Server Linked Role Authorization Dialog](/images/discord-linkedroles-authorize.png)

![Discord Server Linked Role Authorization Redirect Dialog](/images/discord-linkedroles-authorize-redirect.png)

After authorizing, Discord will verify that the user's account meets the role requirements and in case they do, it allows the users to finally claim the role.
![Discord Server Linked Role Claim Dialog](/images/discord-linkedroles-claim.png)

---

*Last updated: September 2025*
