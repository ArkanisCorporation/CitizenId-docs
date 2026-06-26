---
title: Player Guide
description: Start here if you use Citizen iD as a player.
---

# Player Guide

Citizen iD is a player identity service for Star Citizen communities.
It helps you use one account to sign in to community tools, prove control of your RSI account, connect Discord features, and decide which parts of your identity can be shared.
The most important idea is that Citizen iD is not one single feature.
It is a set of connected flows: <strong>website account management</strong>, <strong>RSI verification</strong>, <strong>Discord integrations</strong>, <strong>external application consent</strong>, and <strong>privacy and data controls</strong>.
This guide follows that same shape so you can start with the thing you are trying to do instead of learning the entire platform first.

<figure class="cid-illustration">
  <figcaption><strong>Illustration plan:</strong> Player journey map.</figcaption>
  <p>The page should show a simple left-to-right diagram with five stations: sign in, link accounts, verify RSI, use Discord/community tools, and manage privacy/data.</p>
  <p>Each station should link visually to the matching guide page so a new player can understand where to go next.</p>
</figure>

## Start Here

Use this order when you are unsure where to begin.
Each item points to the page that answers the practical question behind the task.

1. Start with [Website Basics](/players/website-basics) if you are creating an account, signing in, checking the account portal, or finding the right account setting.
2. Use [RSI Verification](/players/rsi-verification) when a community asks you to prove control of your Star Citizen identity.
3. Use [Linked Accounts](/players/linked-accounts) when you need to add or remove Discord, Google, Twitch, email, or RSI-related links.
4. Use [Discord Integrations](/players/discord-integrations) when the question starts with Discord roles, nicknames, linked roles, or bot commands.
5. Use [External Apps](/players/external-apps) when the question starts in a community website, bot, overlay, dashboard, or other third-party tool.
6. Use [Privacy Controls](/players/privacy-controls) when the question is about visibility, public discovery, application consent, or analytics consent.
7. Use [Data Rights](/players/data-rights) when the question is about data export, account removal, retained records, or third-party data boundaries.
8. Use [Getting Help](/players/getting-help) when something is not working and you need to collect the right evidence before asking for support.

## Core Concepts

Citizen iD gives communities a consistent identity layer, but it does not make every community behave the same way.
The same player account can appear in several different surfaces:

- A Discord server might only use Citizen iD linked roles.
- Another Discord server might use automatic role assignments and nickname management.
- A community website might request Citizen iD claims through an external application consent flow.
- A separate community tool might use Citizen iD only for sign-in and never touch Discord at all.

When you are unsure what is happening, identify which surface you are using first: the Citizen iD website, Discord, or an external application.
That one distinction usually explains which settings matter and who controls the next step.

::: tip Player control
Citizen iD is designed around <strong>explicit account links</strong>, <strong>application consent</strong>, <strong>revocation</strong>, and <strong>privacy switches</strong>.
Those controls govern future sharing through Citizen iD.
They do not automatically erase data that a community, Discord server, or external application already received while access was allowed.
:::

## Common Journeys

<dl>
  <dt><strong>I want to join a community Discord server.</strong></dt>
  <dd>Sign in to Citizen iD, link Discord, verify RSI if the server requires it, and then follow that server's linked-role or role-assignment instructions.</dd>
  <dt><strong>I want to use a community website.</strong></dt>
  <dd>Let the website redirect you to Citizen iD, read the consent screen, approve only the access you understand, and return to the website after authorization.</dd>
  <dt><strong>I want people to find my verified profile.</strong></dt>
  <dd>Enable public profile discovery, verify RSI, and decide whether discovery through linked external accounts should also be allowed.</dd>
  <dt><strong>I want to stop using an application.</strong></dt>
  <dd>Open authorized apps, review the application, revoke its authorization, and contact the application operator if you need deletion of data already stored outside Citizen iD.</dd>
</dl>

## Not Covered

Citizen iD is not a government identity service, age verification service, reputation system, payment service, or guarantee that a third-party community configured its tools correctly.
The most important boundaries are:

- RSI verification proves control of an RSI account when Citizen iD can verify it.
- RSI verification does <em>not</em> prove real-world identity, legal status, trustworthiness, account value, or player reputation.
- Discord role automation reflects the rules chosen by a server or community admin.
- Citizen iD can evaluate and apply those rules, but it does not decide what every server should grant you.

::: warning When something looks wrong
Do not assume every unexpected role, nickname, or blocked application means your Citizen iD account is broken.
First identify whether the behavior comes from Citizen iD account state, Discord server configuration, external application scopes, privacy settings, or a temporary maintenance/rate-limit condition.
:::

## Manual Depth

The manual is layered so that casual readers and careful troubleshooters can use the same page.

- The main sections explain the normal path first.
- Lists capture steps, checks, and decision points that players commonly need to repeat.
- Expandable detail blocks explain edge cases, data boundaries, and troubleshooting reasons.
- Use the detail blocks when you need to understand why Citizen iD behaves a certain way rather than only how to click through a flow.
