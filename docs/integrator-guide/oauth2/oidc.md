# OpenID Connect (OIDC) Integration Guide

Citizen iD supports OpenID Connect (OIDC) as an identity provider, allowing you to integrate secure authentication and user information retrieval into your applications in a standardised and well-supported manner.
This guide provides an overview of how to set up and use Citizen iD as an OIDC provider.

## Examples

The following examples demonstrate how to integrate Citizen iD as an OpenID Connect (OIDC) provider using various libraries and frameworks.
If you have a working example you'd like to contribute, please open a pull request on our GitHub repository (follow the link at the bottom of this page).

### ASP.NET Core

Using the `Microsoft.AspNetCore.Authentication.OpenIdConnect` to integrate with ASP.NET Core is straightforward.
Below is an example configuration for integrating Citizen iD as an OIDC provider.

Required NuGet packages:
- [`Microsoft.AspNetCore.Authentication.OpenIdConnect`](https://www.nuget.org/packages/Microsoft.AspNetCore.Authentication.OpenIdConnect)

```csharp
// Program.cs

const string CitizenIdAuthority = "https://citizenid.space";
const string CitizenIdClientId = "<YOUR_CLIENT_ID>";
const string CitizenIdClientSecret = "<YOUR_CLIENT_SECRET_IF_ANY>";

var builder = WebApplication.CreateBuilder(args);

services.AddAuthentication()
    .AddOpenIdConnect("CitizenId", "Citizen iD", ConfigureCitizenIdOidc);

void ConfigureCitizenIdOidc(OpenIdConnectOptions options)
{
    options.Authority = CitizenIdAuthority;
    options.ClientId = CitizenIdClientId;
    options.ClientSecret = CitizenIdClientSecret; // optional for public clients
    options.CallbackPath = "/signin-citizenid";
    // options.SignInScheme = IdentityConstants.ExternalScheme; // if using ASP.NET Core Identity to handle sign-ins
    options.SaveTokens = true; // if you want to persist the tokens in the auth ticket

    options.ResponseMode = OpenIddictConstants.ResponseModes.FormPost;
    options.ResponseType = OpenIddictConstants.ResponseTypes.Code; // Authorization Code Flow

    options.Scope.Add("openid"); // required
    options.Scope.Add("profile"); // if you need the standard profile claims (like name, picture, etc.)

    options.Scope.Add("roles"); // if you need the role claims
    options.Scope.Add("email"); // if you need the email claim (not all users have email)
    options.Scope.Add("offline_access"); // if you need refresh tokens
    options.Scope.Add("rsi.profile"); // if you need RSI profile data
    // ...

    // Require verified RSI account link for a valid sign-in
    options.Events.OnTicketReceived = context =>
    {
        if (context.Principal?.IsInRole("CitizenId.Status.Verified") is not true)
        {
            context.Fail("The user does not have a verified RSI account linked.");
        }

        return Task.CompletedTask;
    };

    // ensure the token is intended for this client
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidAudience = CitizenIdClientId,
        NameClaimType = JwtRegisteredClaimNames.PreferredUsername,
    };
}

// ... 

var app = builder.Build();
app.Run();
```

---

*Last updated: October 2025*
