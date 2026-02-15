# Supported OAuth2 Flows and Grant Types

Citizen iD supports several OAuth2 flows and grant types to accommodate different types of applications and use cases.
This section provides an overview of the supported flows and how to implement them.;

> [!WARNING] OAuth2 and OpenID Connect (OIDC)
> Citizen iD implements both the OAuth2 framework and the OpenID Connect (OIDC) identity layer on top of OAuth2.
> Make sure to **utilize existing OIDC libraries and frameworks** when integrating with Citizen iD,
> as they handle many security aspects and best practices for you.
> 
> There typically is no need to implement most of the following OAuth2 flows manually.

For more information on tokens themselves, please refer to the [Token Reference](./tokens).

## Authorization Code Flow

For trying out the authorization code flow, we recommend using [OAuth 2.0 Debugger][oauth-debugger].
`https://citizenid.space/connect/authorize` should be used as a value for the `Authorize URI` parameter.

> [!TIP] PKCE Support
> Citizen iD supports the [Proof Key for Code Exchange (PKCE)][rfc7636] extension to OAuth2.
> This is especially important for public clients that cannot securely store a client secret.

```http request
@authority=https://citizenid.space
@client_id=a3a5953f-8ab0-4d39-a407-d3f0cc9f94da
@redirect_uri=https://oauthdebugger.com/debug

GET {{authority}}/connect/authorize
    ?client_id={{client_id}}
    &redirect_uri={{redirect_uri}}
    &scope=openid profile roles email offline_access
    &response_type=code
    &response_mode=form_post
    &state={{$random.alphanumeric(10)}}
    &nonce={{$random.alphanumeric(10)}}
```

After the user successfully authenticates and consents to the requested scopes, they will be redirected to the specified redirect URI with an authorization code.
For example `nJPLq63gEszvyPspMO9HFx-MMh9C5r5RxsKT_GbFz7c`.

### Claiming an Authorization Code

To exchange the authorization code for tokens, make a POST request to the token endpoint `https://citizenid.space/connect/token` with the following parameters:

```http request
@authority=https://citizenid.space
@client_id=a3a5953f-8ab0-4d39-a407-d3f0cc9f94da
@client_secret=835af38b-3fd2-4eb6-993d-59218f828f85
@redirect_uri=https://oauthdebugger.com/debug
@authorization_code=nJPLq63gEszvyPspMO9HFx-MMh9C5r5RxsKT_GbFz7c

POST {{authority}}/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
    &code={{authorization_code}}
    &client_id={{client_id}}
    &client_secret={{client_secret}}
    &redirect_uri={{redirect_uri}}
```

The response will include an access token, its type, ID token, granted scopes, optionally a refresh token if the `offline_access` scope was requested and their expiration time (in seconds).

```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkM5OEI3OEZFNzU1MTFFMkZGRjc0RTc4QkVBOEM5MEY0MUVBMEZFNjgiLCJ4NXQiOiJ5WXQ0X25WUkhpX19kT2VMNm95UTlCNmdfbWciLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5kZXYvIiwiZXhwIjoxNzcxMTgyMjc5LCJpYXQiOjE3NzExNjc4NzksImF1ZCI6Imh0dHBzOi8vY2l0aXplbmlkLmRldiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgcnNpLnByb2ZpbGUgcnNpLm9yZ3MucHVibGljIHJzaS5vcmdzLnByaW1hcnkgb2ZmbGluZV9hY2Nlc3MiLCJqdGkiOiI2YWEwNmMwMC1hYjljLTQzOTUtOTFkZC1mZTgyNmFmZjljNjYiLCJvaV9hdV9pZCI6IjAxOWM2MWQ0LWU2YzEtN2JhNC05YmU3LWI3NGMxN2U2N2NiMSIsInN1YiI6IjAxOThkOTE5LTgyZmMtN2RjMS1hYzM5LTg2MzI5MjQ4MTNjNiIsInN1Yl90eXBlIjoidXNlciIsIm5hbWUiOiJUaGVLcm9ublkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0aGVrcm9ubnkiLCJ1cm46dXNlcjpyc2k6c3BlY3RydW1JZCI6Ijk1NTAxOSIsInVybjp1c2VyOnJzaTp1c2VybmFtZSI6Iktyb25uWSIsInVybjp1c2VyOnJzaTpjaXRpemVuSWQiOiI2MDc2MzMiLCJvaV9wcnN0IjoiYXJrYW5pc2NvcnAtb3ZlcmxheSIsImNsaWVudF9pZCI6ImFya2FuaXNjb3JwLW92ZXJsYXkiLCJvaV90a25faWQiOiIwMTljNjFkNS0wZmM1LTdmN2YtOTRkZC00OWQ5YWFmN2ZlZTYifQ.X7cFhPBGtE4PgNNF90gNXkjfl3RbSsDyL624iBC0LF6Mx-29mBEsWMfq_vYjtpWJrGDIvpyol3O6MzRqjwHt8PgK16fqQ3v1hbhuqsK0uGl4cZgqCnwzyVfAHRy10U2TUNidp2QKMG-zlpGwHk5s-nwSfKpcxOh5EBTXygrlkkWOuFHKIkHW1r-N1C302lJs4a01PWugqXODNP-_un3cPa36yyBPCq1gdEgOGCGA-kB6jDIVmEBw7511nUrRYm2vAKQPEg6BYWGIOSbqWZJzl_GUh3hWn49MX36zu3dbt9La7HE6Q7NIxSyjMotOuQXxb0deTIMaglBiSYv4iDGOvw",
  "token_type": "Bearer",
  "expires_in": 14400,
  "scope": "openid profile rsi.profile rsi.orgs.public rsi.orgs.primary offline_access",
  "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkM5OEI3OEZFNzU1MTFFMkZGRjc0RTc4QkVBOEM5MEY0MUVBMEZFNjgiLCJ4NXQiOiJ5WXQ0X25WUkhpX19kT2VMNm95UTlCNmdfbWciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5kZXYvIiwiZXhwIjoxNzcxMTgyMjc5LCJpYXQiOjE3NzExNjc4NzksImF1ZCI6ImFya2FuaXNjb3JwLW92ZXJsYXkiLCJvaV9hdV9pZCI6IjAxOWM2MWQ0LWU2YzEtN2JhNC05YmU3LWI3NGMxN2U2N2NiMSIsInN1YiI6IjAxOThkOTE5LTgyZmMtN2RjMS1hYzM5LTg2MzI5MjQ4MTNjNiIsInN1Yl90eXBlIjoidXNlciIsIm5hbWUiOiJUaGVLcm9ublkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0aGVrcm9ubnkiLCJ1cm46dXNlcjpyc2k6c3BlY3RydW1JZCI6Ijk1NTAxOSIsInVybjp1c2VyOnJzaTp1c2VybmFtZSI6Iktyb25uWSIsInVybjp1c2VyOnJzaTpkaXNwbGF5TmFtZSI6IltBcmthbmlzXSBLcm9ublkiLCJ1cm46dXNlcjpyc2k6ZW5saXN0ZWRBdCI6IjIwMTQtMTAtMDEiLCJ1cm46dXNlcjpyc2k6YXZhdGFyOnVybCI6Imh0dHBzOi8vcm9iZXJ0c3NwYWNlaW5kdXN0cmllcy5jb20vbWVkaWEvdmlrM3lmNm1teDY0dHIvaGVhcF9pbmZvYm94LzdjNjAzMWUwLTFmNjYtNDdjMC1BMTQ3LUM4MDExNjhlMWMwOS5qcGciLCJ1cm46dXNlcjpyc2k6Y2l0aXplbklkIjoiNjA3NjMzIiwidXJuOnVzZXI6cnNpOm9yZ3M6cHVibGljIjpbIkFSS0FOSVMiLCJNRURSVU5ORVIiLCJVRVhDT1JQIiwiQ1pTSyJdLCJ1cm46dXNlcjpyc2k6b3JnczpwcmltYXJ5IjoiQVJLQU5JUyIsImF6cCI6ImFya2FuaXNjb3JwLW92ZXJsYXkiLCJhdF9oYXNoIjoiZUlCcXpSYmFkemFlZHRjbzBpUmtHQSIsIm9pX3Rrbl9pZCI6IjAxOWM2MWQ1LTBmZTYtNzA1Zi04NGNkLThjN2EyZDM5NmI1MCJ9.Qalt_pgd9S68fwkzcz0Inav7e4Lgn3HiQR3abeujv4KelucScisTGL-qZ4zqOjxEIb-KsgoUqG6gSH1m27Hc6DdW2sdTPtCFxKuMzFY2HcgqYLOxApiZmU8v5SSX8lh14E0QtUhXOc-xnYVsps6LJfEBPummyx005BPjIKYJzpdXz-Uv9CYQ-h1YYXMTV43mxxxFIvTfQp-4vqkhtCm4Sh6Es6RVWf8riAuG544yN7ashwzRrViRO2UR60YfAaIUMsGjgliV7ruAQ0Je_HZJ10Sp9ZL_L8R7MYWePJF76bFDayLZMDgs__BxSvRDZT2ecmJwpMFs3qLj--lNtU74uQ",
  "refresh_token": "gWvWO5pmnrEtD1bewNNtlAu2S5oe-2Drx4J5jUMkF2w"
}
```

## Refresh Token Flow

If the `offline_access` scope was requested during the authorization process, a refresh token will be included in the token response.
This token has a much longer lifetime than access tokens and can be used to obtain new access tokens without requiring the user to re-authenticate.

```http request
@authority=https://citizenid.space
@client_id=a3a5953f-8ab0-4d39-a407-d3f0cc9f94da
@client_secret=a67ff0d8-6a4e-417a-a6c1-f686669bea20
@refresh_token=XdLfCEFkNZBoydqlcsQHIRvdm4cWMmNrb0Y6Wte0Z8I

POST {{authority}}/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
    &refresh_token={{refresh_token}}
    &client_id={{client_id}}
    &client_secret={{client_secret}}
```

Response to the refresh token request will be similar to the one when exchanging an authorization code for tokens:

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkE0MTc2ODhGOUQ4NDgwOTIzQTNDQjRBMTVGNkMzQjJCQTg0MTdDNDIiLCJ4NXQiOiJwQmRvajUyRWdKSTZQTFNoWDJ3N0s2aEJmRUkiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5zcGFjZS8iLCJleHAiOjE3NTk5Mzk2NzEsImlhdCI6MTc1OTkyNTI3MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSByb2xlcyBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsImp0aSI6ImJjMmVkOGExLWJkNzgtNDdiOS1hNjg1LTk4NDcwODFmYjkyYyIsIm9pX3Byc3QiOiJhM2E1OTUzZi04YWIwLTRkMzktYTQwNy1kM2YwY2M5Zjk0ZGEiLCJvaV9hdV9pZCI6IjAxOTlhM2RmLTZjMWEtNzBlOC1hY2Y4LWRiNzJmZDAwYTBmZiIsInN1YiI6IjAxOTlhMTA5LTM2NjItN2Y4My1iMTU1LTViYzUzZGI3YmYyNiIsInByZWZlcnJlZF91c2VybmFtZSI6InRoZWtyb25ueSIsInJvbGUiOlsiQ2l0aXplbklkLkFjY291bnRUeXBlLkNpdGl6ZW4iLCJDaXRpemVuSWQuSW50ZWdyYXRvciJdLCJlbWFpbCI6Imtyb25ueTRAZ21haWwuY29tIiwiY2xpZW50X2lkIjoiYTNhNTk1M2YtOGFiMC00ZDM5LWE0MDctZDNmMGNjOWY5NGRhIiwib2lfdGtuX2lkIjoiMDE5OWMzYjgtN2NkZC03ZmQ1LTg0ZmYtYTMwZWM4YmMwNjgwIn0.ZOXvV9b7fDS6AWnUtu7ly3rk0N9ejVgVH-08l7wbEH3iZNRPL4nXubrophfSSzucsd1hqVUmp7HUOFd4JUiRwuQaJNWUzrEd0LnA6XApn911OMk2fKpGaju9AFlwT-Luxi14XrL0yWUiH9q4oaEmk0RE0-UCs0brPniI5SEqjPv1LJ0z-uGCph_aHUHovF8QIfYv3z7-aLDfqpB8IgBVPq0T3myovaH9BCIohMQWpssKER-6GKzzeQtRATSP_fp7Fjqw81NqRS8kDaTlXeG3URvvIAoxr3e1neXUkstXrtXkaujlgOAiWHRmM6-Vu5Z76SB6BnLOwmw495_1N5Dc3w",
    "token_type": "Bearer",
    "expires_in": 14399,
    "scope": "openid profile roles email offline_access",
    "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkE0MTc2ODhGOUQ4NDgwOTIzQTNDQjRBMTVGNkMzQjJCQTg0MTdDNDIiLCJ4NXQiOiJwQmRvajUyRWdKSTZQTFNoWDJ3N0s2aEJmRUkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5zcGFjZS8iLCJleHAiOjE3NTk5Mzk2NzEsImlhdCI6MTc1OTkyNTI3MSwiYXVkIjoiYTNhNTk1M2YtOGFiMC00ZDM5LWE0MDctZDNmMGNjOWY5NGRhIiwib2lfYXVfaWQiOiIwMTk5YTNkZi02YzFhLTcwZTgtYWNmOC1kYjcyZmQwMGEwZmYiLCJzdWIiOiIwMTk5YTEwOS0zNjYyLTdmODMtYjE1NS01YmM1M2RiN2JmMjYiLCJuYW1lIjoidGhla3Jvbm55IiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGhla3Jvbm55Iiwicm9sZSI6WyJDaXRpemVuSWQuQWNjb3VudFR5cGUuQ2l0aXplbiIsIkNpdGl6ZW5JZC5JbnRlZ3JhdG9yIl0sImVtYWlsIjoia3Jvbm55NEBnbWFpbC5jb20iLCJhenAiOiJhM2E1OTUzZi04YWIwLTRkMzktYTQwNy1kM2YwY2M5Zjk0ZGEiLCJub25jZSI6IkE0QzRpRWxpZ20iLCJhdF9oYXNoIjoic0dRd0oza0RteUJBVlVTV0dCT3kzZyIsIm9pX3Rrbl9pZCI6IjAxOTljM2I4LTdjZjctN2E1NS05ODY0LTkwZGJhMTA5NWU0MyJ9.IASTvLdmSvUCyr20ng9gIreYH3blS2zGX8pdCYNl6xuP0StjVwLBARWMWHDU8HuevNfrwFk0MBxtnmWnqgB1auUdXPZKTuPZF3-B1JEngBFUabfF1cWZ0IT1_EMaosffTF0Afx8fYyQiBU0Qbt9toegKyfXxgyTpnTb6kYj7gVEpP5Ca-_ez5U8Skv3QQqZ68sPwcc9P-h8as4XIH9z7OwT5XEwMhaqsODRfV50UqpcoarS0Sx4t98hi0grAe56X2ITSRB4lyCw8PYxemSugmfWFcMhv7xdFmzAM-UvoMIlWeOTwxnsqMhAz3zXTOU2byKtuHWKJuvEKdrNrKpwvEw",
    "refresh_token": "3xW07XE_5HXUOHoCNRBCoK-GyeJu9og8bYARixaSE30"
}
```

> [!TIP] Refresh Token Invalidation
> Each time a refresh token is used to obtain new tokens, the refresh token used in the request is invalidated and a new refresh token is issued.
> However, there is a 30-second grace period during which the old refresh token can still be used.
> This allows for handling potential network issues or delays in token propagation.

## Client Credentials

The Client Credentials flow is used for machine-to-machine (M2M) communication where no user is involved.
This flow is suitable for backend services or applications that need to authenticate and authorize themselves to access resources.

> [!WARNING] Confidential Clients Only
> The Client Credentials Flow can only be used by confidential clients that can securely store and use a client secret.

```http request
@authority=https://citizenid.space
@client_id=2c7ec27a-4609-4ad3-a361-22a41f18be6b
@client_secret=a67ff0d8-6a4e-417a-a6c1-f686669bea20

POST {{authority}}/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
    &client_id={{client_id}}
    &client_secret={{client_secret}}
```
The response will include an access token, its type, granted scopes, and its expiration time (in seconds).

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkE0MTc2ODhGOUQ4NDgwOTIzQTNDQjRBMTVGNkMzQjJCQTg0MTdDNDIiLCJ4NXQiOiJwQmRvajUyRWdKSTZQTFNoWDJ3N0s2aEJmRUkiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5zcGFjZS8iLCJleHAiOjE3NTk5NDAzMDMsImlhdCI6MTc1OTkyNTkwMywianRpIjoiNWIyYzkyZGQtYjBiNS00ZGFmLTk0ZGYtMTMzZGE3MTkzODA1Iiwic3ViIjoiMmM3ZWMyN2EtNDYwOS00YWQzLWEzNjEtMjJhNDFmMThiZTZiIiwib2lfcHJzdCI6IjJjN2VjMjdhLTQ2MDktNGFkMy1hMzYxLTIyYTQxZjE4YmU2YiIsImNsaWVudF9pZCI6IjJjN2VjMjdhLTQ2MDktNGFkMy1hMzYxLTIyYTQxZjE4YmU2YiIsIm9pX3Rrbl9pZCI6IjAxOTljM2MyLTIyN2QtNzBiMy1hMzBiLWI2NGI0MDM2ZmI5YiJ9.jiH2fVV7oU-kq59waPtkMRNRccBsw3oOV0aiUl8MHXzRbgf41xqfsmksxXwfWgzJmYAQIZOr7rHDyLY7_7sbkxECHLO_Wu6kVC8SwAbDRiixoEO0RPLfMasWsywtz0YvLBUIZCrujJ3gbiwIJkrDOWNjfmfOJSHBay_32pGLwY7TffP1fjV2l4icjKhHWV2j7DVkqrAs5iygnbtFDCwvKgTd2kqyydxPjXJD769H38kHNKe0XzIZzDUDHVnzxNxnG8zgFUGUtjtfiLBqW4dlIuaB7_z3p8PVYttXazBc6xc1GP9KV8pq5k2OmQJtcQWnM-Y6Ongfcj-QePnoPIs1sw",
    "token_type": "Bearer",
    "expires_in": 14399
}
```

## Token Exchange

The Token Exchange flow allows a client to exchange an existing token for a new token with different scopes or audiences.
This is useful in scenarios where a service needs to call another service on behalf of a user or wishes to delegate access to another service.

The request can include the following parameters in addition to the ones required for all requests (shown in the HTTP request example below).

**`scope`**<br>
Allows requesting a subset of the scopes present in the subject token.

| Value           | Description                                                  |
|-----------------|--------------------------------------------------------------|
| Not provided    | The scopes of the subject token are used.                    |
| Valid scope set | An intersection of the current and requested scopes is used. |
| _Anything else_ | The request is rejected with an `invalid_scope` error.       |

**`audience`**<br>
Allows changing the `aud` (audience) claim of the new token to indicate the intended recipient of the token.

| Value           | Description                                                     |
|-----------------|-----------------------------------------------------------------|
| Not provided    | The provided `client_id` is used.                               |
| Allowed value   | The audience of the new token is changed to the provided value. |
| _Anything else_ | The request is rejected with an `invalid_request` error.        |

**`actor_client_id`**<br>
Allows changing the `act` (actor) claim of the new token to indicate the credentials have been delegated to the specified application.
The actor claim value is going to be based on:

| Value           | Description                                                                  |
|-----------------|------------------------------------------------------------------------------|
| Not provided    | The application information corresponding to the provided `client_id`.       |
| Valid client ID | The application information corresponding to the provided `actor_client_id`. |
| _Anything else_ | The request is rejected with an `invalid_request` error.                     |

```http request
@authority=https://citizenid.space
@client_id=a3a5953f-8ab0-4d39-a407-d3f0cc9f94da
@actor_client_id=2c7ec27a-4609-4ad3-a361-22a41f18be6b

POST {{authority}}/connect/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:token-exchange
    &subject_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkE0MTc2ODhGOUQ4NDgwOTIzQTNDQjRBMTVGNkMzQjJCQTg0MTdDNDIiLCJ4NXQiOiJwQmRvajUyRWdKSTZQTFNoWDJ3N0s2aEJmRUkiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5zcGFjZS8iLCJleHAiOjE3NTk5Mzk2NzEsImlhdCI6MTc1OTkyNTI3MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSByb2xlcyBlbWFpbCBvZmZsaW5lX2FjY2VzcyIsImp0aSI6ImJjMmVkOGExLWJkNzgtNDdiOS1hNjg1LTk4NDcwODFmYjkyYyIsIm9pX3Byc3QiOiJhM2E1OTUzZi04YWIwLTRkMzktYTQwNy1kM2YwY2M5Zjk0ZGEiLCJvaV9hdV9pZCI6IjAxOTlhM2RmLTZjMWEtNzBlOC1hY2Y4LWRiNzJmZDAwYTBmZiIsInN1YiI6IjAxOTlhMTA5LTM2NjItN2Y4My1iMTU1LTViYzUzZGI3YmYyNiIsInByZWZlcnJlZF91c2VybmFtZSI6InRoZWtyb25ueSIsInJvbGUiOlsiQ2l0aXplbklkLkFjY291bnRUeXBlLkNpdGl6ZW4iLCJDaXRpemVuSWQuSW50ZWdyYXRvciJdLCJlbWFpbCI6Imtyb25ueTRAZ21haWwuY29tIiwiY2xpZW50X2lkIjoiYTNhNTk1M2YtOGFiMC00ZDM5LWE0MDctZDNmMGNjOWY5NGRhIiwib2lfdGtuX2lkIjoiMDE5OWMzYjgtN2NkZC03ZmQ1LTg0ZmYtYTMwZWM4YmMwNjgwIn0.ZOXvV9b7fDS6AWnUtu7ly3rk0N9ejVgVH-08l7wbEH3iZNRPL4nXubrophfSSzucsd1hqVUmp7HUOFd4JUiRwuQaJNWUzrEd0LnA6XApn911OMk2fKpGaju9AFlwT-Luxi14XrL0yWUiH9q4oaEmk0RE0-UCs0brPniI5SEqjPv1LJ0z-uGCph_aHUHovF8QIfYv3z7-aLDfqpB8IgBVPq0T3myovaH9BCIohMQWpssKER-6GKzzeQtRATSP_fp7Fjqw81NqRS8kDaTlXeG3URvvIAoxr3e1neXUkstXrtXkaujlgOAiWHRmM6-Vu5Z76SB6BnLOwmw495_1N5Dc3w
    &subject_token_type=urn:ietf:params:oauth:token-type:access_token
    &requested_token_type=urn:ietf:params:oauth:token-type:access_token
    &scope=profile
    &client_id={{client_id}}
    &actor_client_id={{actor_client_id}}
```

The response will include a new access token, its type, and its expiration time (in seconds).

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IkE0MTc2ODhGOUQ4NDgwOTIzQTNDQjRBMTVGNkMzQjJCQTg0MTdDNDIiLCJ4NXQiOiJwQmRvajUyRWdKSTZQTFNoWDJ3N0s2aEJmRUkiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5zcGFjZS8iLCJleHAiOjE3NTk5NDIwNzAsImlhdCI6MTc1OTkyNzY3MCwiYXVkIjoiYTNhNTk1M2YtOGFiMC00ZDM5LWE0MDctZDNmMGNjOWY5NGRhIiwic2NvcGUiOiJwcm9maWxlIiwianRpIjoiZmUxMDExNjMtODNmOC00MjU0LTg3MWYtMjUyOGE0MTM4MjZjIiwib2lfcHJzdCI6ImEzYTU5NTNmLThhYjAtNGQzOS1hNDA3LWQzZjBjYzlmOTRkYSIsIm9pX2F1X2lkIjoiMDE5OWEzZGYtNmMxYS03MGU4LWFjZjgtZGI3MmZkMDBhMGZmIiwic3ViIjoiMDE5OWExMDktMzY2Mi03ZjgzLWIxNTUtNWJjNTNkYjdiZjI2IiwicHJlZmVycmVkX3VzZXJuYW1lIjoidGhla3Jvbm55IiwiYWN0Ijp7InN1YiI6IjJjN2VjMjdhLTQ2MDktNGFkMy1hMzYxLTIyYTQxZjE4YmU2YiIsInN1Yl90eXBlIjoiYXBwIiwibmFtZSI6IlRlc3QhIn0sImNsaWVudF9pZCI6ImEzYTU5NTNmLThhYjAtNGQzOS1hNDA3LWQzZjBjYzlmOTRkYSIsIm9pX3Rrbl9pZCI6IjAxOTljM2RkLTE3MjYtNzNkNC1iMTg5LWYzNmMyOTRmYmQzYSJ9.q7TI6g2LaOwbXPoYQhfsXQGMEBTcLtyN79bZbjldgkrhUoxKwWMMnufVb8kBt6vx0yIWOrRUpWtg_LfdxxxTuYO2_UHPNZXekRE-d3xhLNE1ldMruWxN1qintHHMaKgYDlph_hSJXqEeXjRxgW9hpHKlFditNeS5ybewZoR0H1JBsII2u6mMp-OayxZnBs4mjD6FYCeXrTjg_CIfJvsiUwN_4OVAoMwD9NN5Mro9gqUKX04jSevwLPZnd4JaNgqVu0wITdPJvitM_EaJVIzFy7KbFvS6_bBr8-isVFaETNspFcspIS1qqLr6bmYKJ8Avm6hmcvu5Slx0zdLOV5G-BQ",
    "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
    "token_type": "Bearer",
    "expires_in": 14399
}
```

> [!TIP] Refresh Tokens
> A `refresh_token` may also be included in the response if the `offline_access` scope was requested and was granted to the provided subject token.

Not all clients are allowed to use the Token Exchange flow out of the box.
If a client that is not authorized to use this flow attempts to do so, they will receive the following error response:

```json
{
    "error": "unauthorized_client",
    "error_description": "This client application is not allowed to use the specified grant type.",
    "error_uri": "https://documentation.openiddict.com/errors/ID2064"
}
```

## Token Revocation

Tokens can be individually revoked by the client applications:

```http request
@authority=https://citizenid.space
@client_id=a3a5953f-8ab0-4d39-a407-d3f0cc9f94da
@client_secret=a67ff0d8-6a4e-417a-a6c1-f686669bea20

POST {{authority}}/connect/revoke
Content-Type: application/x-www-form-urlencoded

token=3xW07XE_5HXUOHoCNRBCoK-GyeJu9og8bYARixaSE30
    &token_type_hint=refresh_token
    &client_id={{client_id}}
    &client_secret={{client_secret}}
```

```http request
@authority=https://citizenid.space
@client_id=2c7ec27a-4609-4ad3-a361-22a41f18be6b
@client_secret=a67ff0d8-6a4e-417a-a6c1-f686669bea20

POST {{authority}}/connect/revoke
Content-Type: application/x-www-form-urlencoded

token=eyJhbGciOiJSUzI1NiIsImtpZCI6IkE0MTc2ODhGOUQ4NDgwOTIzQTNDQjRBMTVGNkMzQjJCQTg0MTdDNDIiLCJ4NXQiOiJwQmRvajUyRWdKSTZQTFNoWDJ3N0s2aEJmRUkiLCJ0eXAiOiJhdCtqd3QifQ.eyJpc3MiOiJodHRwczovL2NpdGl6ZW5pZC5zcGFjZS8iLCJleHAiOjE3NTk5NDAzMDMsImlhdCI6MTc1OTkyNTkwMywianRpIjoiNWIyYzkyZGQtYjBiNS00ZGFmLTk0ZGYtMTMzZGE3MTkzODA1Iiwic3ViIjoiMmM3ZWMyN2EtNDYwOS00YWQzLWEzNjEtMjJhNDFmMThiZTZiIiwib2lfcHJzdCI6IjJjN2VjMjdhLTQ2MDktNGFkMy1hMzYxLTIyYTQxZjE4YmU2YiIsImNsaWVudF9pZCI6IjJjN2VjMjdhLTQ2MDktNGFkMy1hMzYxLTIyYTQxZjE4YmU2YiIsIm9pX3Rrbl9pZCI6IjAxOTljM2MyLTIyN2QtNzBiMy1hMzBiLWI2NGI0MDM2ZmI5YiJ9.jiH2fVV7oU-kq59waPtkMRNRccBsw3oOV0aiUl8MHXzRbgf41xqfsmksxXwfWgzJmYAQIZOr7rHDyLY7_7sbkxECHLO_Wu6kVC8SwAbDRiixoEO0RPLfMasWsywtz0YvLBUIZCrujJ3gbiwIJkrDOWNjfmfOJSHBay_32pGLwY7TffP1fjV2l4icjKhHWV2j7DVkqrAs5iygnbtFDCwvKgTd2kqyydxPjXJD769H38kHNKe0XzIZzDUDHVnzxNxnG8zgFUGUtjtfiLBqW4dlIuaB7_z3p8PVYttXazBc6xc1GP9KV8pq5k2OmQJtcQWnM-Y6Ongfcj-QePnoPIs1sw
    &token_type_hint=access_token
    &client_id={{client_id}}
    &client_secret={{client_secret}}
```

There will be no content in the response body, and a `200 OK` status code will indicate that the token has been successfully revoked.

---

*Last updated: October 2025*

[oauth-debugger]: <https://oauthdebugger.com/debug> "OAuth 2.0 Debugger"
[rfc7636]: <https://datatracker.ietf.org/doc/html/rfc7636> "RFC 7636: Proof Key for Code Exchange by OAuth Public Clients"
