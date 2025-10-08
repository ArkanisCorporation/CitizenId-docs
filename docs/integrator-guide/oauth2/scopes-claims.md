# Supported OAuth2 Scopes and Claims

Citizen iD supports a variety of OAuth2 scopes and corresponding claims to provide fine-grained access control and user information sharing.
When integrating with Citizen iD, you can request specific scopes during the authorization process to obtain the necessary permissions and user data required for your application.

The user must consent to the requested scopes during the authorization request unless they have previously granted consent for the same scopes to your application.

## Public Scopes

The scopes featured in this section are available to all integrators and can be freely requested during the OAuth2 authorization process.

### Standard Scopes

The following scopes provide access to common user information.

| Scope             | Available Claims               | Note                                     | 
|-------------------|--------------------------------|------------------------------------------| 
| `openid`          | -                              | **REQUIRED.**                            | 
| `profile`         | `name`<br>`preferred_username` |                                          | 
| `roles`           | `roles`                        |                                          | 
| `email`           | `email`                        | Not every user has got an email address. | 
| `offline_access`  | -                              | Grants access to refresh tokens.         | 

### Citizen iD Specific Scopes

The following scopes provide access to additional user information specific to Citizen iD.

| Scope             | Available Claims                                                                                                                           |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `google.profile`  | `urn:user:google:avatar:url`<br>`urn:user:google:email`<br>`urn:user:google:name`<br>`urn:user:google:accountId`                           |
| `twitch.profile`  | `urn:user:twitch:avatar:url`<br>`urn:user:twitch:email`<br>`urn:user:twitch:username`<br>`urn:user:twitch:accountId`                       |
| `discord.profile` | `urn:user:discord:avatar:url`<br>`urn:user:discord:username`<br>`urn:user:discord:accountId`<br>`urn:user:discord:scopes`                  |
| `rsi.profile`     | `urn:user:rsi:avatar:url`<br>`urn:user:rsi:username`<br>`urn:user:rsi:enlistedAt`<br>`urn:user:rsi:citizenId`<br>`urn:user:rsi:spectrumId` |

### Claim Availability

| Claim                        | ID Token | Access Token |
|------------------------------|:--------:|:------------:|
| `name`                       | &check;  |              |
| `preferred_username`         | &check;  |   &check;    |
| `roles`                      | &check;  |   &check;    |
| `email`                      | &check;  |   &check;    |
| `urn:user:google:accountId`  | &check;  |   &check;    |
| `urn:user:google:*`          | &check;  |              |
| `urn:user:twitch:accountId`  | &check;  |   &check;    |
| `urn:user:twitch:*`          | &check;  |              |
| `urn:user:discord:accountId` | &check;  |   &check;    |
| `urn:user:discord:*`         | &check;  |              |
| `urn:user:rsi:spectrumId`    | &check;  |   &check;    |
| `urn:user:rsi:citizenId`     | &check;  |   &check;    |
| `urn:user:rsi:username`      | &check;  |   &check;    |
| `urn:user:rsi:*`             | &check;  |              |

## Group Scopes

> [!WARNING] Not Yet Available
> This feature is not yet available. It is planned for a future release.

---

*Last updated: October 2025*
