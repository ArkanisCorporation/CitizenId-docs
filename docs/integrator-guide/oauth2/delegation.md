# OAuth2 Credentials Delegation

Citizen iD supports OAuth2 credentials delegation, allowing OAuth2 applications to delegate access to the user account and resources to third-party applications.
This is achieved through the OAuth2 token exchange flow.
This guide provides an overview of how to delegate, look up, and revoke OAuth2 credentials using Citizen iD.

## Delegating Credentials

To delegate credentials to another application, use the [Token Exchange flow](flows-grants#token-exchange).
This allows your application to exchange an existing access token for a new one that is scoped to a different client application, optionally with a reduced set of scopes.

The resulting token will include an `act` (actor) claim identifying the application that the credentials were delegated to.
This ensures that the original user's identity is preserved while indicating that the credentials are being used on behalf of a specific application.

## Looking Up Delegated Credentials

Delegated credentials can be identified by inspecting the `act` claim in the access token.
If the `act` claim is present, it indicates that the token was obtained through credential delegation.
The claim contains the `sub` (subject) and `name` of the actor application.

Additionally, Citizen iD provides API endpoints to list and filter delegated tokens for currently authenticated application (`client_credentials`).
These APIs also support revoking delegated tokens directly, offering an alternative to the standard OAuth2 revocation flow.

## Revoking Delegated Credentials

Delegated tokens can be revoked using the standard [Token Revocation](flows-grants#token-revocation) endpoint.
Both the original application and the delegate can revoke the token.
When revoked, the token is immediately invalidated and can no longer be used.

---

*Last updated: February 2026*
