# OAuth2 Credentials Revocation

OAuth2 token revocation allows clients to invalidate access tokens and refresh tokens that are no longer needed or have been compromised.
This helps maintain the security of the ecosystem by ensuring that tokens do not remain valid indefinitely if they are no longer in use.

## Revoking Tokens

To revoke a token, your application must make a request to the revocation endpoint.
Review the [Token Revocation section in Flows & Grants](flows-grants.md#token-revocation) for the exact API specification.

---

*Last updated: February 2026*
