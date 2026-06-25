# OpenID Connect (OIDC) Integration Guide

Citizen iD supports OpenID Connect (OIDC) as an identity provider, allowing you to integrate secure authentication and user information retrieval into your applications in a standardised and well-supported manner.
This guide provides an overview of how to set up and use Citizen iD as an OIDC provider.

## Configuration

To configure your application to use Citizen iD as an OIDC provider, you will need the following information:

| Parameter      | Value                                                      | Description                                                                       |
|----------------|------------------------------------------------------------|-----------------------------------------------------------------------------------|
| OIDC Discovery | `https://citizenid.space/.well-known/openid-configuration` | The OIDC discovery document URL for Citizen iD.                                   |
| `Issuer`       | `https://citizenid.space`                                  | The issuer identifier for Citizen iD, used to validate tokens.                    |
| `Authority`    | `https://citizenid.space`                                  | The base URL of the Citizen iD OIDC provider.                                     |
| `Audiences`    | `ClientId` (yours), `https://citizenid.space`              | The valid audiences of tokens issued by Citizen iD.                               |
| `ClientId`     | Your application's client ID                               | The client ID of your registered application.                                     |
| `ClientSecret` | Your application's client secret                           | The client secret of your registered application (only for confidential clients). |

> [!WARNING]
> When testing against the staging environment, make sure you use the correct domain (`https://citizenid.dev`) and client credentials registered for that environment.

## Examples

The following examples demonstrate how to integrate Citizen iD as an OpenID Connect (OIDC) provider using various libraries and frameworks.
If you have a working example you'd like to contribute, please open a pull request on our GitHub repository (follow the link at the bottom of this page).

<Tabs :tabs="[
{ key: 'dotnet', title: '.NET' },
{ key: 'passport-js', title: 'Passport.js' }
]">

<template #dotnet>

### ASP.NET Core APIs

You can use the `Microsoft.AspNetCore.Authentication.JwtBearer` package to validate JWT access tokens issued by Citizen iD.

Required NuGet packages:
- [`CitizenId.Domain.Shared`](https://www.nuget.org/packages/CitizenId.Domain.Shared)
- [`Microsoft.AspNetCore.Authentication.JwtBearer`](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.JwtBearer)

```csharp [Program.cs]
// ...

const string CitizenIdClientId = "<YOUR_CLIENT_ID>";

var builder = WebApplication.CreateBuilder(args);

services.AddAuthentication()
    .AddJwtBearer(ConfigureCitizenIdJwt);

void ConfigureCitizenIdJwt(JwtBearerOptions options)
{
    options.Authority = CitizenIdDeployments.Production.Authority;
    options.Audience = CitizenIdClientId; // ensure the token is intended for this client!

    options.RequireHttpsMetadata = !environment.IsDevelopment();

    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = JwtRegisteredClaimNames.PreferredUsername,
    };
}

// ...

var app = builder.Build();
app.Run();
```

### ASP.NET Core Identity

Using the `Microsoft.AspNetCore.Authentication.OpenIdConnect` to integrate with ASP.NET Core is straightforward.
Below is an example configuration for integrating Citizen iD as an OIDC provider.

Required NuGet packages:

- [`CitizenId.Domain.Shared`](https://www.nuget.org/packages/CitizenId.Domain.Shared)
- [`Microsoft.AspNetCore.Authentication.OpenIdConnect`](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.OpenIdConnect)

```csharp [Program.cs]
// ...
using CitizenId.Domain.Shared;

const string CitizenIdClientId = "<YOUR_CLIENT_ID>";
const string CitizenIdClientSecret = "<YOUR_CLIENT_SECRET_IF_ANY>";

var builder = WebApplication.CreateBuilder(args);

services.AddAuthentication()
    .AddOpenIdConnect("CitizenId", "Citizen iD", ConfigureCitizenIdOidc);

void ConfigureCitizenIdOidc(OpenIdConnectOptions options)
{
    options.Authority = CitizenIdDeployments.Production.Authority;
    options.ClientId = CitizenIdClientId;
    options.ClientSecret = CitizenIdClientSecret; // optional for public clients
    options.CallbackPath = "/signin-citizenid";
    // options.SignInScheme = IdentityConstants.ExternalScheme; // if using ASP.NET Core Identity to handle sign-ins
    options.SaveTokens = true; // if you want to persist the tokens in the auth ticket

    options.ResponseMode = OpenIddictConstants.ResponseModes.FormPost;
    options.ResponseType = OpenIddictConstants.ResponseTypes.Code; // Authorization Code Flow

    options.Scope.Add("openid"); // required
    options.Scope.Add(CitizenIdScopes.Profile); // if you need the standard profile claims (like name, picture, etc.)

    options.Scope.Add(CitizenIdScopes.Roles); // if you need the role claims
    options.Scope.Add(CitizenIdScopes.Email); // if you need the email claim (not all users have email)
    options.Scope.Add(CitizenIdScopes.OfflineAccess); // if you need refresh tokens
    options.Scope.Add(CitizenIdScopes.RsiProfile); // if you need RSI profile data
    // ...

    options.RequireHttpsMetadata = !environment.IsDevelopment();

    // if you wish to require a verified RSI account link for a valid sign-in
    options.Events.OnTicketReceived = context =>
    {
        if (context.Principal?.IsInRole(CitizenIdRoles.Status.Verified) is not true)
        {
            context.Fail("The user does not have a verified RSI account linked.");
        }

        return Task.CompletedTask;
    };

    options.TokenValidationParameters = new TokenValidationParameters
    {
        NameClaimType = JwtRegisteredClaimNames.PreferredUsername,
    };
}

// ...

var app = builder.Build();
app.Run();
```

</template>

<template #passport-js>

### Passport.js

You can use the [`passport-citizenid`](https://www.npmjs.com/package/@citizenid/passport-citizenid) strategy to integrate Citizen iD with Passport.js in JavaScript/TypeScript applications.
Read more about Passport.js strategies and usage in the [official documentation](https://www.passportjs.org/docs/).

```typescript
const { Strategy: CitizenIDStrategy, Scopes } = require('passport-citizenid')

const endpoints = getEndpoints(Endpoints.DEVELOPMENT.AUTHORITY)
// const endpoints = getEndpoints(Endpoints.PRODUCTION.AUTHORITY);

passport.use(new CitizenIDStrategy({
  clientID: CITIZENID_CLIENT_ID,
  clientSecret: CITIZENID_CLIENT_SECRET, // Optional for public clients with PKCE
  callbackURL: 'http://localhost:3000/auth/citizenid/callback',
  authorizationURL: endpoints.AUTHORIZATION,
  tokenURL: endpoints.TOKEN,
  userInfoURL: endpoints.USERINFO,
  scope: [Scopes.OPENID, Scopes.PROFILE, Scopes.EMAIL, Scopes.ROLES]
}, (accessToken, refreshToken, profile, done) => {
  // In a real application, you would save the user to your database
  return done(null, profile)
}))
```

</template>
</Tabs>

---

*Last updated: March 2026*
