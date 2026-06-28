# API Authentication and Authorization

Citizen iD supports multiple authentication methods depending on the client type and context.

## User Cookies

Browser-based sessions are authenticated via securely encrypted `HttpOnly` cookies.
This is primarily used by the Citizen iD frontend and strictly first-party applications.
External integrators should generally rely on OAuth2 tokens instead.

## Bearer Tokens

The primary method for third-party applications to authenticate with the API is using **Bearer Tokens** in the `Authorization` header.

```http
Authorization: Bearer <your_access_token>
```

### Users

To access API endpoints on behalf of a user (e.g., retrieving their profile or organizations), you must obtain a user-delegated **Access Token** via one of the OAuth2 flows (such as Authorization Code flow).
The token must specifically include the scopes required by the endpoint you are calling (e.g., `profile`, `rsi.profile`).

### Applications

Service-to-service communication, where no user context is involved (e.g., syncing global configurations), can be performed using **Client Credentials**.
Tokens obtained this way represent the application itself.

> [!WARNING]
> Not all endpoints support application-only authentication.

---

*Last updated: February 2026*
