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
eyJhbGciOiJSUzI1NiIsImtpZCI6IkM5OEI3OEZFNzU1MTFFMkZGRjc0RTc4QkVBOEM5MEY0MUVBMEZFNjgiLCJ4NXQiOiJ5WXQ0X25WUkhpX19kT2VMNm95UTlCNmdfbWciLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5kZXYvIiwiZXhwIjoxNzcxMTgyNjY4LCJpYXQiOjE3NzExNjgyNjgsImF1ZCI6Imh0dHBzOi8vY2l0aXplbmlkLmRldiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcnNpLnByb2ZpbGUgcnNpLm9yZ3MucHVibGljIHJzaS5vcmdzLnByaW1hcnkgb2ZmbGluZV9hY2Nlc3Mgcm9sZXMiLCJqdGkiOiI3ZmY0ZTdjNC0zZmU1LTRiZDMtOGNiMy0zOWI0YjVmYzNhMjEiLCJvaV9hdV9pZCI6IjAxOWM2MWRhLWUyYWItN2E4NS04MWU1LTBmMzY2MjczZjM5YSIsInN1YiI6IjAxOThkOTE5LTgyZmMtN2RjMS1hYzM5LTg2MzI5MjQ4MTNjNiIsInN1Yl90eXBlIjoidXNlciIsIm5hbWUiOiJUaGVLcm9ublkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0aGVrcm9ubnkiLCJ1cm46dXNlcjpyc2k6c3BlY3RydW1JZCI6Ijk1NTAxOSIsInVybjp1c2VyOnJzaTp1c2VybmFtZSI6Iktyb25uWSIsInVybjp1c2VyOnJzaTpjaXRpemVuSWQiOiI2MDc2MzMiLCJyb2xlIjpbIkNpdGl6ZW5JZC9JbnRlcm5hbC9TdXBlckFkbWluIiwiQ2l0aXplbklkL0FjY291bnRUeXBlL0NpdGl6ZW4iLCJDaXRpemVuSWQvU3RhdHVzL1ZlcmlmaWVkIiwiYXJrYW5pc2NvcnAvbWVtYmVyL2VtcGxveWVlIiwiYXJrYW5pc2NvcnAvc3ViL3QxIiwiYXJrYW5pc2NvcnAvZGlyZWN0b3IiXSwib2lfcHJzdCI6ImFya2FuaXNjb3JwLW92ZXJsYXkiLCJjbGllbnRfaWQiOiJhcmthbmlzY29ycC1vdmVybGF5Iiwib2lfdGtuX2lkIjoiMDE5YzYxZGEtZmVlMy03MTY3LWIzZTItNWY3Y2FmMTZmMzc2In0.NIOlI9jIh3FO3f9sZUwiFzH70boEm5Pzt3UhRFcp0HHhvOM3hshQ3LoIQIimFw-cW2SG2PZSkpZY1lJ9Gj2PstjwEA9uaSkFlY3gyxyrzTINhYagqVwu7ROCoRhJjlwsZNe10AMoC7skm555FjQsbbbckna9w4BjmVgkfoW-ymjspeqR5arMJwheBU03G08kAYmiznkLEOQdKV-C1eDhM9GHjpVH7__8V7bpE5389GrqkwXj-ww2GjWalECV-P1gaOuWf5obRUWvrXW6M6EuQQIk4V3hU4B6NoHZfyI_9yg-KUOo_SrOF__C0Bmi0iZ550zG1iQN0a9mcNWCPedzPA
```

</div>

> [!TIP] Token Inspection
> Contents of this token are unencrypted and can be inspected using [jwt.io][jwt].

```json
{
  "iss": "https://citizenid.dev/",
  "exp": 1771182668,
  "iat": 1771168268,
  "aud": "https://citizenid.dev",
  "scope": "openid profile rsi.profile rsi.orgs.public rsi.orgs.primary offline_access roles",
  "jti": "7ff4e7c4-3fe5-4bd3-8cb3-39b4b5fc3a21",
  "oi_au_id": "019c61da-e2ab-7a85-81e5-0f366273f39a",
  "sub": "0198d919-82fc-7dc1-ac39-8632924813c6",
  "sub_type": "user",
  "name": "TheKronnY",
  "preferred_username": "thekronny",
  "urn:user:rsi:spectrumId": "955019",
  "urn:user:rsi:username": "KronnY",
  "urn:user:rsi:citizenId": "607633",
  "role": [
    "CitizenId/Internal/SuperAdmin",
    "CitizenId/AccountType/Citizen",
    "CitizenId/Status/Verified",
    "arkaniscorp/member/employee",
    "arkaniscorp/sub/t1",
    "arkaniscorp/director"
  ],
  "oi_prst": "arkaniscorp-overlay",
  "client_id": "arkaniscorp-overlay",
  "oi_tkn_id": "019c61da-fee3-7167-b3e2-5f7caf16f376"
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
eyJhbGciOiJSUzI1NiIsImtpZCI6IkM5OEI3OEZFNzU1MTFFMkZGRjc0RTc4QkVBOEM5MEY0MUVBMEZFNjgiLCJ4NXQiOiJ5WXQ0X25WUkhpX19kT2VMNm95UTlCNmdfbWciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5kZXYvIiwiZXhwIjoxNzcxMTgyNjY4LCJpYXQiOjE3NzExNjgyNjgsImF1ZCI6ImFya2FuaXNjb3JwLW92ZXJsYXkiLCJvaV9hdV9pZCI6IjAxOWM2MWRhLWUyYWItN2E4NS04MWU1LTBmMzY2MjczZjM5YSIsInN1YiI6IjAxOThkOTE5LTgyZmMtN2RjMS1hYzM5LTg2MzI5MjQ4MTNjNiIsInN1Yl90eXBlIjoidXNlciIsIm5hbWUiOiJUaGVLcm9ublkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0aGVrcm9ubnkiLCJ1cm46dXNlcjpyc2k6c3BlY3RydW1JZCI6Ijk1NTAxOSIsInVybjp1c2VyOnJzaTp1c2VybmFtZSI6Iktyb25uWSIsInVybjp1c2VyOnJzaTpkaXNwbGF5TmFtZSI6IltBcmthbmlzXSBLcm9ublkiLCJ1cm46dXNlcjpyc2k6ZW5saXN0ZWRBdCI6IjIwMTQtMTAtMDEiLCJ1cm46dXNlcjpyc2k6YXZhdGFyOnVybCI6Imh0dHBzOi8vcm9iZXJ0c3NwYWNlaW5kdXN0cmllcy5jb20vbWVkaWEvdmlrM3lmNm1teDY0dHIvaGVhcF9pbmZvYm94LzdjNjAzMWUwLTFmNjYtNDdjMC1BMTQ3LUM4MDExNjhlMWMwOS5qcGciLCJ1cm46dXNlcjpyc2k6Y2l0aXplbklkIjoiNjA3NjMzIiwidXJuOnVzZXI6cnNpOm9yZ3M6cHVibGljIjpbIkFSS0FOSVMiLCJNRURSVU5ORVIiLCJVRVhDT1JQIiwiQ1pTSyJdLCJ1cm46dXNlcjpyc2k6b3JnczpwcmltYXJ5IjoiQVJLQU5JUyIsInJvbGUiOlsiQ2l0aXplbklkL0ludGVybmFsL1N1cGVyQWRtaW4iLCJDaXRpemVuSWQvQWNjb3VudFR5cGUvQ2l0aXplbiIsIkNpdGl6ZW5JZC9TdGF0dXMvVmVyaWZpZWQiLCJhcmthbmlzY29ycC9tZW1iZXIvZW1wbG95ZWUiLCJhcmthbmlzY29ycC9zdWIvdDEiLCJhcmthbmlzY29ycC9kaXJlY3RvciJdLCJhenAiOiJhcmthbmlzY29ycC1vdmVybGF5IiwiYXRfaGFzaCI6IlVNb1k1N01qeTgtWVBHN0F6Q3RnMEEiLCJvaV90a25faWQiOiIwMTljNjFkYS1mZWYzLTdmYTMtYmRiMi1iMzYwOWJhYzAyMzAifQ.X2pmjoRfIQN4GigBaucfDyGIe66u5AoD4ynQ6k3QiN_1T6kQXOA494C-EwBdbqwZ7lVe7RuKvkC9zWYW0DHLi1l_c0qOYQdviSm-wo4QGoPmllXKmFF7IlcWMr_FtuegJxPVE120QfMCgP1Vz74sdQASBvg4rORTrs9yN7xzUsRlfZCVBYK4ziEKpydQVvODLLBsFzBzfbR14wmpXRxa2h9vZKi3774ry74bDIiyMlIGICR31ci7A3WXke8Pvdzusdsh0QjsoUxwiyY8xw61mPB6yNHChgkME71kyLdhTuXC0ZS9_L37CYOb75NnSxUVQKIJiGv5zpS21VdUhVKw7w
```

</div>

> [!TIP] Token Inspection
> Contents of this token are unencrypted and can be inspected using [jwt.io][jwt].

```json
{
  "iss": "https://citizenid.dev/",
  "exp": 1771182668,
  "iat": 1771168268,
  "aud": "arkaniscorp-overlay",
  "oi_au_id": "019c61da-e2ab-7a85-81e5-0f366273f39a",
  "sub": "0198d919-82fc-7dc1-ac39-8632924813c6",
  "sub_type": "user",
  "name": "TheKronnY",
  "preferred_username": "thekronny",
  "urn:user:rsi:spectrumId": "955019",
  "urn:user:rsi:username": "KronnY",
  "urn:user:rsi:displayName": "[Arkanis] KronnY",
  "urn:user:rsi:enlistedAt": "2014-10-01",
  "urn:user:rsi:avatar:url": "https://robertsspaceindustries.com/media/vik3yf6mmx64tr/heap_infobox/7c6031e0-1f66-47c0-A147-C801168e1c09.jpg",
  "urn:user:rsi:citizenId": "607633",
  "urn:user:rsi:orgs:public": [
    "ARKANIS",
    "MEDRUNNER",
    "UEXCORP",
    "CZSK"
  ],
  "urn:user:rsi:orgs:primary": "ARKANIS",
  "role": [
    "CitizenId/Internal/SuperAdmin",
    "CitizenId/AccountType/Citizen",
    "CitizenId/Status/Verified",
    "arkaniscorp/member/employee",
    "arkaniscorp/sub/t1",
    "arkaniscorp/director"
  ],
  "azp": "arkaniscorp-overlay",
  "at_hash": "UMoY57Mjy8-YPG7AzCtg0A",
  "oi_tkn_id": "019c61da-fef3-7fa3-bdb2-b3609bac0230"
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
