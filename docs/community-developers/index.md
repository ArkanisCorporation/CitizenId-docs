---
title: Developer Guide
description: Start the Citizen iD developer journey with access, client selection, and application registration.
---

# Developer Guide

When complete, you will be ready to request Integrator access, choose a safe OAuth client, and register a synthetic staging application with Citizen iD.

## What You Will Build

You will prepare Asteria Rescue's four fictional tools for later Build guides.
The Start journey registers the [application records](/community-developers/terms#application-record) and [OAuth client](/community-developers/terms#oauth-client) identities but does not yet implement sign-in, call an Application Programming Interface, or deploy a [protected resource](/community-developers/terms#protected-resource).
After Start, later guides will build the protocol flows and operate them safely.

## Scenario Map

<ScenarioContext fixture="asteria" focus="overview" view="tree" />

The map groups one reusable set of synthetic examples.
Asteria API is an application-owned protected resource for later Build guides and is not registered during Start.

## Start The Journey

Complete these steps in order because each one produces the input required by the next.

### Get Access

[Get Access](/community-developers/access) prepares a verified account, linked Discord identity, official-server membership, and a complete Integrator request.
It also explains automatic approval, manual review, rejection, and the single-pending-request boundary.

### Choose Client

[Choose Client](/community-developers/client-types) locates the token exchange and token custodian before selecting portal values.
You will record `Web` or `Native`, `Confidential` or `Public`, redirect records, intended grants, and required staff permissions.

### Register App

[Register App](/community-developers/applications) uses the completed worksheet to create staging application records.
You will verify stored configuration separately from staff-granted and protocol-tested capabilities.

## Know The Boundary

### Developer Duties

The developer chooses the runtime, protects confidential secrets, registers exact redirects, requests only necessary permissions, and runs bounded staging tests.
The developer must never embed a secret in browser, mobile, desktop, command-line, or other distributed code.

### Admin Duties

The community administrator makes the existing community available for selection but does not operate the developer's token exchange.
Citizen iD staff control endpoint, grant, response-type, scope, and read-only requirement permissions that an ordinary Integrator cannot change.

### Member Control

A member decides whether to authorize an interactive application and can revoke that authorization later.
A client-credentials service represents the service itself and never proves that a member is present or permits member impersonation.

## Check Capabilities

Discovery metadata describes authorization-server capabilities.
It does not grant any capability to a particular OAuth client, and the stored client permissions remain authoritative.

### Start In Staging

Use the exact staging issuer `https://citizenid.dev/` and staging portal origin `https://citizenid.dev`.
Staging credentials, application records, and redirect records are separate from production.
Before relying on a feature, confirm discovery support, the stored client configuration, staff-assigned permissions, and a bounded staging smoke test.

### Read Discovery

The staging and production discovery documents were checked on 2026-07-20.
Both advertised authorization code, refresh token, client credentials, and token exchange grants, the `code` response type, and S256 Proof Key for Code Exchange support.
Both advertised only `client_secret_post`, `private_key_jwt`, and `client_secret_basic` for token-endpoint authentication.
Neither advertised `none`, so discovery did not prove a secretless public-client code exchange.
Neither advertised `pushed_authorization_request_endpoint`, so Pushed Authorization Requests are not presented as usable.
Treat this dated snapshot as review evidence, not a permanent promise.

### Confirm Production

Use the exact production issuer `https://citizenid.space/` and production portal origin `https://citizenid.space`.
Repeat discovery checks, permission review, exact redirect registration, and a bounded protocol test with production-only credentials before launch.
Do not label a public native flow usable until production advertises secretless token-endpoint authentication and the end-to-end production path with S256 <Abbr term="PKCE" /> is proven.

## Get Support

Collect the environment, application name, client identifier, timestamp in Coordinated Universal Time, expected result, exact visible error, and redacted configuration before contacting Citizen iD support.
After spelling it out once, record the timestamp as <Abbr term="UTC" />.
Never send a client secret, token, authorization code, cookie, personal data, or private identifier through an issue, ticket, chat, screenshot, or log.
Do not use a production OAuth debugger or third-party token decoder to investigate a failure.
