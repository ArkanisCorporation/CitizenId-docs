# Discord Linked Roles Integration

The linked roles allow various conditions to be configured based on RSI account verification state and account data.
This allows communities to securely grant access, enforce membership rules, or unlock special channels without custom RSI account checks.

## Step 1 — Add the Citizen iD App Link

Open the Server Settings in Discord and navigate to the "People" > "Roles" section.
Here, create a new role and add Citizen iD as a connected app under "Links" tab using the "Add requirement" button.
<ImageFigure
  src="/images/discord-bot-server-role-links.png"
  alt="Discord Server Role Link Add"
/>

Click the Citizen iD connection under "Apps".
This establishes the link between Discord's role system and Citizen iD accounts of your members.
<ImageFigure
  src="/images/discord-bot-server-role-add-link.png"
  alt="Discord Server Role Link Connection Dialog"
/>

## Step 2 — Configure Role Conditions

When setting up the corresponding linked role, define the conditions under which it should be granted.
For example, you may require that a user has a verified RSI account linked or that their RSI account has existed for a minimum number of days.
These checks are performed automatically by Citizen iD.

<ImageFigure
  src="/images/discord-bot-server-role-configure-link.png"
  alt="Discord Server Role Link Connection Requirements"
/>

## Step 3 — Inform Your Users

Once the setup is complete, let your community know how to claim their new role.
Users will see the corresponding role listed under the "Linked Roles" dialog in your server menu  and can connect their accounts in just a few clicks.
You can also use the `<id:linked-roles>` Discord message link to allow users to visit the linked roles menu in your server directly.

<ImageFigure
  src="/images/discord-server-menu-roles.png"
  alt="Discord Server Navigation Menu"
/>

<ImageFigure
  src="/images/discord-linkedroles-select.png"
  alt="Discord Server Linked Role Selection Dialog"
/>

Once they select the role, Discord will display a prompt to connect their Citizen iD account.
<ImageFigure
  src="/images/discord-linkedroles-authorize.png"
  alt="Discord Server Linked Role Authorization Dialog"
/>

<ImageFigure
  src="/images/discord-linkedroles-authorize-redirect.png"
  alt="Discord Server Linked Role Authorization Redirect Dialog"
/>

After authorizing, Discord will verify that the user's account meets the role requirements and in case they do, it allows the users to finally claim the role.
<ImageFigure
  src="/images/discord-linkedroles-claim.png"
  alt="Discord Server Linked Role Claim Dialog"
/>

---

*Last updated: September 2025*
