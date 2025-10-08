<style>
    .jwt code {
        white-space: pre-wrap !important;
        overflow-wrap: break-word !important;
        word-break: break-all !important;
        font-size: 12px !important;
        line-height: 16px !important;
    }
</style>

# Supported OAuth2 Token Reference

This document provides an overview of the different types of OAuth2 tokens supported by Citizen iD, including their purposes, lifetimes, example contents, and usage guidelines.

## Access Tokens

Access tokens are used to authorize access to protected resources and APIs on behalf of the user.
They are issued to client applications after successful user authentication and action authorization.

These tokens are typically short-lived and contain information essential for account identification and request authorization.

| Property              | Description                                                |
|-----------------------|------------------------------------------------------------|
| **Type**              | JWT (JSON Web Token)                                       |
| **Format**            | `Bearer` token                                             |
| **Signing Algorithm** | RSA Signature with SHA-256 (can be validated by consumers) |
| **Lifetime**          | 4 hours from issuance                                      |

### Example

<div class="jwt">

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IkE3QTRDRDIzNENBNjRGMDBDN0IzNkUzODVDMUE4QTdEM0I1RUVGNDYiLCJ4NXQiOiJwNlROSTB5bVR3REhzMjQ0WEJxS2ZUdGU3MFkiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2Rldi5jaXRpemVuaWQuc3BhY2UvIiwiZXhwIjoxNzU5OTUxMzE1LCJpYXQiOjE3NTk5MzY5MTUsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcm9sZXMgZGlzY29yZC5wcm9maWxlIHJzaS5wcm9maWxlIG9mZmxpbmVfYWNjZXNzIiwianRpIjoiOTljY2UwOWQtYWVjMC00ZTA0LTljNmQtMzQyNDA4OGYzODAyIiwib2lfcHJzdCI6IjQ4ZTczY2ZjLTg3MWMtNGU0Ny1iNjQ5LTVmYjRjM2JkMTEwYiIsIm9pX2F1X2lkIjoiMDE5OWM0NjktZmM3NC03MjE1LWJjMTItOTgxODk3MTFkMzM3Iiwic3ViIjoiMDE5OGQ5MTktODJmYy03ZGMxLWFjMzktODYzMjkyNDgxM2M2IiwibmFtZSI6InRoZWtyb25ueSIsInByZWZlcnJlZF91c2VybmFtZSI6InRoZWtyb25ueSIsInJvbGUiOlsiQ2l0aXplbklkLkFjY291bnRUeXBlLkNpdGl6ZW4iLCJDaXRpemVuSWQuSW50ZXJuYWwuU3VwZXJBZG1pbiIsIkNpdGl6ZW5JZC5TdGF0dXMuVmVyaWZpZWQiXSwidXJuOnVzZXI6ZGlzY29yZDphY2NvdW50SWQiOiIyMjQ1ODA4NTg0MzI5Nzg5NDQiLCJ1cm46dXNlcjpyc2k6c3BlY3RydW1JZCI6Ijk1NTAxOSIsInVybjp1c2VyOnJzaTp1c2VybmFtZSI6Iktyb25uWSIsInVybjp1c2VyOnJzaTpjaXRpemVuSWQiOiI2MDc2MzMiLCJjbGllbnRfaWQiOiI0OGU3M2NmYy04NzFjLTRlNDctYjY0OS01ZmI0YzNiZDExMGIiLCJvaV90a25faWQiOiIwMTk5YzQ2YS0yNzA4LTc0ZjgtOTk4OC1hZDg1NGJiMDNjMzAifQ.FwsLm98cCEX6u1B0RDsnAY_kNe11RbAHLkaN8bhH5hD39WKXM2FqbSVacIy6-w1yMwV12BGySnoHXbMG2KxhspDUzY-ihwPM_YN6Hy4L09kTMMWhEBBXwu2rOW_d4mrzK5VT4SrDcxebzmMbUqWinZ1SiTWX-miSt02-cOpashGWX77Vm2UoOagsxHU_sv6iTd4Sn0qjV-lgHxYKHLXMaA1cyVVQOWQmTV1OPZu3wseuV2abip7JfuaoKjwHWcIfZQijbTRDGD2YdBEqP-34YRHHYbRR1zd9s65XY5U8Gyx3cZg-F9MGjZjJx9BSPw96X48gODb3rKFkRad3x6CsQw
```

</div>

> [!TIP] Token Inspection
> Contents of this token are unencrypted and can be inspected using [jwt.io][jwt].

```json
{
  "iss": "https://dev.citizenid.space/",
  "exp": 1759951315,
  "iat": 1759936915,
  "scope": "openid profile roles discord.profile rsi.profile offline_access",
  "jti": "99cce09d-aec0-4e04-9c6d-3424088f3802",
  "oi_prst": "48e73cfc-871c-4e47-b649-5fb4c3bd110b",
  "oi_au_id": "0199c469-fc74-7215-bc12-98189711d337",
  "sub": "0198d919-82fc-7dc1-ac39-8632924813c6",
  "name": "thekronny",
  "preferred_username": "thekronny",
  "role": [
    "CitizenId.AccountType.Citizen",
    "CitizenId.Internal.SuperAdmin",
    "CitizenId.Status.Verified"
  ],
  "urn:user:discord:accountId": "224580858432978944",
  "urn:user:rsi:spectrumId": "955019",
  "urn:user:rsi:username": "KronnY",
  "urn:user:rsi:citizenId": "607633",
  "client_id": "48e73cfc-871c-4e47-b649-5fb4c3bd110b",
  "oi_tkn_id": "0199c46a-2708-74f8-9988-ad854bb03c30"
}
```

## ID Tokens

ID tokens are used to convey verified identity information about the authenticated user to the client application.
They are primarily intended for authentication purposes and provide details about the user, and additional profile information.
They are issued as part of OpenID Connect (OIDC) flows.

| Property              | Description                                                |
|-----------------------|------------------------------------------------------------|
| **Type**              | JWT (JSON Web Token)                                       |
| **Format**            | Identity token                                             |
| **Signing Algorithm** | RSA Signature with SHA-256 (can be validated by consumers) |
| **Lifetime**          | 4 hours from issuance                                      |

### Example

<div class="jwt">

```
eyJhbGciOiJSUzI1NiIsImtpZCI6IkE3QTRDRDIzNENBNjRGMDBDN0IzNkUzODVDMUE4QTdEM0I1RUVGNDYiLCJ4NXQiOiJwNlROSTB5bVR3REhzMjQ0WEJxS2ZUdGU3MFkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2Rldi5jaXRpemVuaWQuc3BhY2UvIiwiZXhwIjoxNzU5OTUxMzE1LCJpYXQiOjE3NTk5MzY5MTUsImF1ZCI6IjQ4ZTczY2ZjLTg3MWMtNGU0Ny1iNjQ5LTVmYjRjM2JkMTEwYiIsIm9pX2F1X2lkIjoiMDE5OWM0NjktZmM3NC03MjE1LWJjMTItOTgxODk3MTFkMzM3Iiwic3ViIjoiMDE5OGQ5MTktODJmYy03ZGMxLWFjMzktODYzMjkyNDgxM2M2IiwibmFtZSI6InRoZWtyb25ueSIsInByZWZlcnJlZF91c2VybmFtZSI6InRoZWtyb25ueSIsInJvbGUiOlsiQ2l0aXplbklkLkFjY291bnRUeXBlLkNpdGl6ZW4iLCJDaXRpemVuSWQuSW50ZXJuYWwuU3VwZXJBZG1pbiIsIkNpdGl6ZW5JZC5TdGF0dXMuVmVyaWZpZWQiXSwidXJuOnVzZXI6ZGlzY29yZDphY2NvdW50SWQiOiIyMjQ1ODA4NTg0MzI5Nzg5NDQiLCJ1cm46dXNlcjpkaXNjb3JkOnVzZXJuYW1lIjoidGhla3Jvbm55IiwidXJuOnVzZXI6ZGlzY29yZDphdmF0YXI6dXJsIjoiaHR0cHM6Ly9jZG4uZGlzY29yZGFwcC5jb20vYXZhdGFycy8yMjQ1ODA4NTg0MzI5Nzg5NDQvYV80MDk4Y2RkYTdhOGExYTRhZjVmYzdkMTE2ODM5YjU2Mi5naWYiLCJ1cm46dXNlcjpyc2k6c3BlY3RydW1JZCI6Ijk1NTAxOSIsInVybjp1c2VyOnJzaTp1c2VybmFtZSI6Iktyb25uWSIsInVybjp1c2VyOnJzaTplbmxpc3RlZEF0IjoiMjAxNC0xMC0wMSIsInVybjp1c2VyOnJzaTphdmF0YXI6dXJsIjoiaHR0cHM6Ly9yb2JlcnRzc3BhY2VpbmR1c3RyaWVzLmNvbS9tZWRpYS92aWszeWY2bW14NjR0ci9oZWFwX2luZm9ib3gvN2M2MDMxZTAtMWY2Ni00N2MwLUExNDctQzgwMTE2OGUxYzA5LmpwZyIsInVybjp1c2VyOnJzaTpjaXRpemVuSWQiOiI2MDc2MzMiLCJhenAiOiI0OGU3M2NmYy04NzFjLTRlNDctYjY0OS01ZmI0YzNiZDExMGIiLCJub25jZSI6IkVUZGEwY0t0U3MiLCJhdF9oYXNoIjoiNk1kMXRYT2xCUGhqOG9sYTRhZnp0USIsIm9pX3Rrbl9pZCI6IjAxOTljNDZhLTI3MjktNzYyMS1hNGQ5LWQ3MTYzMjA0MDk0ZCJ9.XdZRrLSehUY1BV-Mwps9HfOPbToUfq4EusoniPRukCxN3vsD5Z6JEsJPkU0Gwq54ZEthPE9QIH_ymLcYStH9y3jhaIx0ApoySVLFNTLhkyd3UxfsY274C6OdIiLM1sgnvG51rR3Jxy2bkUjfZGRE8l20yraZfLWyLq9xbRPBN9T4tU2kfKZ_Lu9u0-MDaMJ3XXbr312_6cqSqqo92T7Q_64M---LxL5YZlumdQH_X2T_wXaA0hj-e0Hoi_SLZDbEeQZtbF5m1rMvWIlbLkxvIhEeldZL7OQxwkUuVpdgttUY5w0rQevk1g5O5HAfm_xfQoSZQ4BD8jG2OjkHwzyZHA
```

</div>

> [!TIP] Token Inspection
> Contents of this token are unencrypted and can be inspected using [jwt.io][jwt].

```json
{
  "iss": "https://dev.citizenid.space/",
  "exp": 1759951315,
  "iat": 1759936915,
  "aud": "48e73cfc-871c-4e47-b649-5fb4c3bd110b",
  "oi_au_id": "0199c469-fc74-7215-bc12-98189711d337",
  "sub": "0198d919-82fc-7dc1-ac39-8632924813c6",
  "name": "thekronny",
  "preferred_username": "thekronny",
  "role": [
    "CitizenId.AccountType.Citizen",
    "CitizenId.Internal.SuperAdmin",
    "CitizenId.Status.Verified"
  ],
  "urn:user:discord:accountId": "224580858432978944",
  "urn:user:discord:username": "thekronny",
  "urn:user:discord:avatar:url": "https://cdn.discordapp.com/avatars/224580858432978944/a_4098cdda7a8a1a4af5fc7d116839b562.gif",
  "urn:user:rsi:spectrumId": "955019",
  "urn:user:rsi:username": "KronnY",
  "urn:user:rsi:enlistedAt": "2014-10-01",
  "urn:user:rsi:avatar:url": "https://robertsspaceindustries.com/media/vik3yf6mmx64tr/heap_infobox/7c6031e0-1f66-47c0-A147-C801168e1c09.jpg",
  "urn:user:rsi:citizenId": "607633",
  "azp": "48e73cfc-871c-4e47-b649-5fb4c3bd110b",
  "nonce": "ETda0cKtSs",
  "at_hash": "6Md1tXOlBPhj8ola4afztQ",
  "oi_tkn_id": "0199c46a-2729-7621-a4d9-d7163204094d"
}
```

## Refresh Tokens

Refresh tokens are used to obtain new access tokens without requiring the user to re-authenticate.
They are typically long-lived and can be used to maintain user sessions over extended periods.
Refresh tokens should be securely stored by the client application and only sent to the authorization server when requesting new access tokens.

> [!TIP] Necessary Scopes
> To receive a refresh token, the `offline_access` scope must be requested during the initial authorization process.

| Property              | Description            |
|-----------------------|------------------------|
| **Type**              | Opaque token reference |
| **Format**            | Reference token        |
| **Signing Algorithm** | N/A                    |
| **Lifetime**          | 14 days from issuance  |

### Example

<div class="jwt">

```
zqCQenD2XW2d7nHSq_fgmFkVyTAuxDdnaURuAwQ3D6U
```

</div>

> [!WARNING] Token Inspection
> This token is an encrypted token reference and cannot be inspected like JWT tokens.

---

*Last updated: October 2025*

[jwt]: <https://jwt.io> "JWT.IO - JSON Web Token Debugger"
