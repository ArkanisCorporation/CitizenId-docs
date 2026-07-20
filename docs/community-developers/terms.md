---
title: Terms
description: Canonical protocol, application, security, and Citizen iD terms for developers.
---

# Terms

When complete, you will be able to distinguish the tool you build, its stored application record, its OAuth client identity, and every protected resource it accesses.

The abbreviation list below is rendered from the same dictionary used by the Start pages.

<AbbreviationGlossary />

## Protocol Terms

**Issuer**

The issuer is the exact identifier for one authorization-server environment.
For Citizen iD it includes the trailing slash, such as `https://citizenid.dev/` or `https://citizenid.space/`.

**Discovery document**

The discovery document is environment metadata that lists protocol endpoints, grants, response types, authentication methods, and related capabilities advertised by an authorization server.
It describes server capability and does not grant a client permission to use every advertised feature.

**Grant**

A grant is the protocol mechanism a client uses to obtain tokens, such as authorization code or client credentials.
Citizen iD staff must permit the intended grant for the client.

**Flow**

A flow is the complete sequence among a member, client, authorization server, and protected resource.
A usable flow depends on discovery support, correct client configuration, assigned permissions, and a successful bounded test.

**Scope**

A scope is a named boundary for access or identity information requested by a client.
Request only the scopes the application needs, and let the member review applicable consent.

**Permission**

A permission is a Citizen iD client setting that allows a specific endpoint, grant, response type, scope, audience, or resource.
An ordinary Integrator reads these assignments but Citizen iD staff control them.

## Application Terms

**Community tool**

A community tool is the website, browser interface, native application, service, or other software an operator builds.
Asteria Dispatch is a tool; it is not itself the stored portal record or its client identity.

**Application record**

An application record is the Citizen iD portal record containing the name, owning community, Application Type, Client Type, redirect records, client identifier, secret existence, permissions, and requirements.
The record configures a tool's integration but is not the running tool.

**OAuth client**

An OAuth client is the protocol identity used by one application runtime when it communicates with Citizen iD.
Its client identifier and authentication method come from the application record.

**Client identifier**

A client identifier is the generated, non-secret value that selects an OAuth client record.
It is environment-specific and must not be reused as if it were a production credential.

**Client secret**

A client secret is confidential authentication material for a client that can protect it on an operator-controlled server.
It must never be embedded in browser, mobile, desktop, command-line, or other distributed code.

**Redirect URI**

A redirect Uniform Resource Identifier is an exact registered destination to which Citizen iD may return an interactive protocol response.
Wildcards, fragments, user-information components, and application-controlled open redirectors are unsafe.

**Protected resource**

A protected resource is an application programming interface or service that accepts an access token for authorized operations.
Asteria API is Asteria Rescue's resource for later Build guides and is not the Asteria Dispatch application record or OAuth client identity.

**Token custodian**

A token custodian is the component responsible for storing and using access or refresh tokens.
Choosing it makes the secret and browser boundaries observable before registration.

## Security Terms

**Staff-controlled setting**

A staff-controlled setting is a read-only permission or requirement that an ordinary Integrator can inspect but cannot change.
Citizen iD staff control endpoint, grant, response-type, scope, Proof Key for Code Exchange, and Pushed Authorization Request assignments shown as read-only.

**Secret boundary**

A secret boundary is the operator-controlled server boundary inside which confidential client authentication material can be protected.
Code distributed to a member's browser or device is outside that boundary.

**Exact redirect matching**

Exact redirect matching means the authorization request value must equal a registered redirect record rather than match a wildcard or prefix.
Staging and production keep separate records.

## Citizen iD Terms

**Member context**

Member context means an interactive flow has a signed-in member whose authorization and claims may affect the result.
A client-credentials exchange has no member context and cannot impersonate a member.

**Community ownership**

Community ownership is the association between an existing Citizen iD community and an application record.
It does not mean the tool owns a member, a member identity, or an external protected resource.

**Integrator**

Integrator is the Citizen iD product role that permits an approved developer to use the developer portal and manage application records.
Receiving the role does not authorize any application for a member.

**Environment**

An environment is a separate Citizen iD authorization server and portal deployment.
Staging and production have separate issuers, eligibility decisions, application records, client identifiers, secrets, permissions, and redirect records.
