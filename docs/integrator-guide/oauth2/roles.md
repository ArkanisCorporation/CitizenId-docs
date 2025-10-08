# Supported OAuth2 User Roles

This document outlines the different user roles that can be assigned to users within the Citizen iD platform.
These roles can be used by integrators to manage access control and permissions within their applications.

> [!NOTE] Claim Availability
> The `roles` claim is only included in the ID token and access token if the `roles` scope is requested during the OAuth2 authorization process.

## System Roles

The following roles are system-wide and can be assigned to any user.
They are typically used to manage user access and permissions across the entire Citizen iD platform.

### User Account Status

| Claim Value                 | Description                                    |
|-----------------------------|------------------------------------------------|
| `CitizenId.Status.Verified` | Account has been linked with RSI and verified. |
| `CitizenId.Status.Banned`   | Account has been suspended.                    |

### Account Types

| Claim Value                          | Description                                          |
|--------------------------------------|------------------------------------------------------|
| `CitizenId.AccountType.Organization` | _Currently unused._ Registered organization account. |
| `CitizenId.AccountType.Citizen`      | Individual user account.                             |

### Privileged Roles

| Claim Value            | Description                                         |
|------------------------|-----------------------------------------------------|
| `CitizenId.Partner`    | Represents a trusted external partner organization. |
| `CitizenId.Integrator` | Entity integrating with the Citizen iD platform.    |

### Internal Roles

These roles are reserved for internal use by Citizen iD staff.
You should not use these roles for anything in your own applications.

| Claim Value                         | Description                             |
|-------------------------------------|-----------------------------------------|
| `CitizenId.Internal.InternalSystem` | System-level operations and automation. |
| `CitizenId.Internal.SuperAdmin`     | Highest administrative privileges.      |
| `CitizenId.Internal.Admin`          | Standard administrative privileges.     |
| `CitizenId.Internal.Moderator`      | Content moderation and user management. |

## Group Roles

> [!WARNING] Not Yet Available
> This feature is not yet available. It is planned for a future release.

---

*Last updated: October 2025*
