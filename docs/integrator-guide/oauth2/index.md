# OAuth2 Integration Guide

Citizen iD has been designed from the ground up to be a secure and flexible identity provider, built on the widely adopted [OAuth2][rfc6749] and OpenID Connect (OIDC) standards.
This guide provides an overview of how to set up and use Citizen iD as an OAuth2

## Becoming an Integrator

To integrate your application with Citizen iD, you first need to register as an integrator.
This process involves granting your account an integrator role and access and agreeing to the terms of service for integrators.
To apply, please contact us via the ticket system on [our official Discord server][discord].

## Managing Client Applications

Once registered as an integrator, you can create and manage OAuth2 client applications through the [Citizen iD developer dashboard][cid-dev-dashboard].

Before creating a client application, you will be required to create a group that represents your organisation or project.
This group will be associated with client applications you create and helps us manage and monitor usage.
You can create multiple groups if needed, for example, to separate unrelated projects.

After creating a group, you can proceed to create a client application.
When creating an application, you will need to decide on the type of application you are building, as this will determine the OAuth2 client type you should use:
- **Confidential clients**
  <br>These are applications that **can securely store** a client secret, such as server-side web applications.
- **Public clients**
  <br>These are applications that **cannot securely store** and by extension use a client secret, such as single-page applications (SPAs) or mobile apps.

Once you fill out the required information and create the application, you will be provided with a client ID and, if applicable, a client secret.
Application secret can be reset at any time from the developer dashboard.

> [!WARNING]
> Make sure to store these credentials securely, as they authenticate your application with Citizen iD and authorize it to access and change relevant data.

---

*Last updated: October 2025*

[cid-dev-dashboard]: <https://citizenid.space/developer> "Citizen iD Developer Dashboard"
[discord]: <https://discord.citizenid.space> "Citizen iD Official Discord Server"
[rfc6749]: <https://datatracker.ietf.org/doc/html/rfc6749> "RFC6749: OAuth 2.0 Authorization Framework"
