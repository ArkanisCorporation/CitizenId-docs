# Community Developers Complete Migration And Documentation System Rework Design

## Goal

Replace the temporary Community Developers migration shell with a complete journey-first developer manual.
Transfer every substantive concept, example, image decision, and operator outcome from `docs/integrator-guide/**` into its audience-correct canonical destination.
Expand the transferred material into scenario packs that help a developer build, verify, operate, and troubleshoot a Citizen iD integration without consulting a legacy route.
Fix the shared presentation system so diagrams, scenario context, terms, code proofs, and built-in VitePress components remain readable and professional in desktop light and dark modes.
Delete `docs/integrator-guide/**` only after traceable content-equivalence, example-provenance, link, build, and visual-review gates pass.

## Approved Decisions

- `/integrator-guide` is obsolete and must be removed.
- No redirect, alias, compatibility page, or legacy-route stub is required for `/integrator-guide`.
- A request to an old `/integrator-guide` URL must resolve to the ordinary not-found experience after migration.
- Complete transfer means preserving every substantive teaching point and proof outcome, then correcting and expanding it where current behavior or security guidance requires.
- Complete transfer does not require retaining obsolete navigation prose, duplicated introductions, or an instruction that current verified behavior proves wrong.
- Every corrected or consolidated item must remain traceable to a canonical destination and a recorded rationale.
- Complete credential-shaped proof examples are required documentation, not content to abbreviate or remove because of their shape.
- Every current credential-shaped sample and encoded-to-decoded pair must migrate byte-for-byte by default.
- Uncertain provenance alone is not permission to shorten, sanitize, regenerate, or replace a proof.
- Replacement is permitted only when positive evidence identifies an operable credential, real personal data, or other sensitive value, or when the user explicitly approves the replacement.
- An approved replacement must remain a complete structurally and semantically equivalent synthetic proof, and the security response and replacement rationale must be recorded.
- Discord operations remain canonically owned by Community Admin and Player guides.
- Shared brand policy remains canonically owned by Reference.
- Community Developers links to those canonical guides instead of maintaining competing copies.
- Desktop light and dark modes are the primary visual-review targets.
- Narrow layouts remain a containment and accessibility gate even though they are not the primary design target.

## Observed Baseline

The legacy tree contains 18 public Markdown pages, 110 headings, 23 fenced examples, 11 local screenshot references, and 16 unique remote brand assets.
The four current Community Developers OAuth and API pages are migration shells that link back to the legacy tree instead of containing the promised detail.
The Reference brand page is also a migration stub.
VitePress currently discovers authoring files such as `AGENTS.md` and `docs/superpowers/**` as public pages because `srcExclude` is not configured.
The sidebar still assigns the Community Developers navigation to `/integrator-guide/`.

At a 1440 by 1000 desktop viewport, ordinary document content is approximately 688 pixels wide.
The current Scenario Context two-column grid can reduce the worksheet wrapper to approximately 365 pixels while the ten-column table remains approximately 1456 pixels wide.
The first wrapped worksheet row was observed at approximately 1576 pixels tall, and the complete component at approximately 2705 pixels tall.
The horizontal scrollbar appears only after that long content, so information is effectively hidden during reading.

In dark mode, semantic Mermaid nodes retain light pastel fills while their labels inherit light canvas text.
Measured node-label contrast was approximately 1.07:1 to 1.17:1, far below the 4.5:1 target for normal text.
The current visual-audit script records metrics but swallows Mermaid-readiness failures and does not fail the command when an objective assertion is violated.

## Reader Outcomes

After completing the new guide, a developer can:

- Obtain and verify Integrator access.
- Choose a client architecture from observable runtime and custody boundaries.
- Register separate staging and production application records safely.
- Sign members in with authorization code and OpenID Connect.
- Request the minimum member data and handle unavailable optional or required claims.
- Protect an application programming interface with a validated access token.
- Call Citizen iD APIs with either member or application context where the operation permits it.
- Delegate scope-reduced access without confusing delegation with impersonation.
- Store, refresh, rotate, and dispose of tokens according to their purpose.
- Revoke member, client, and delegated access safely.
- Promote a staging integration to production using a bounded readiness process.
- Diagnose failures at the correct protocol boundary and prepare privacy-safe support evidence.
- Find exact protocol, scope, claim, role, token, API, software-development-kit, brand, and terminology reference material.
- Follow Community Admin or Player documentation for Discord operations without encountering a second, conflicting manual.

## Information Architecture

Use journey categories for task instruction and compact reference pages for lookup.
Do not add category landing pages that merely repeat the sidebar.
Keep the existing Start routes because they already form the approved entry journey.

### Start

| Page | Canonical route | Purpose |
| --- | --- | --- |
| Developer Guide | `/community-developers/` | Map the complete Start, Build, Operate, Reference, Community Admin, Player, and brand journeys. |
| Get Access | `/community-developers/access` | Obtain Integrator access and understand eligibility, review, rejection, and retry outcomes. |
| Choose Client | `/community-developers/client-types` | Select a safe runtime, client type, token custodian, secret boundary, and grant set. |
| Register App | `/community-developers/applications` | Create and verify staging and production application records and handle secret reset. |

### Build

| Page | Proposed canonical route | Outcome |
| --- | --- | --- |
| Sign In Members | `/community-developers/sign-in-members` | Complete authorization code and OpenID Connect sign-in for the Asteria web scenarios. |
| Request Member Data | `/community-developers/request-member-data` | Select minimum scopes and handle available, optional, and required claims. |
| Protect An API | `/community-developers/protect-an-api` | Validate access tokens and enforce audience, purpose, scope, and policy at Asteria API. |
| Call APIs | `/community-developers/call-apis` | Call Citizen iD operations with the operation-appropriate member or application token. |
| Delegate Access | `/community-developers/delegate-access` | Exchange a member token for a scope-reduced, audience-bound delegated token. |

### Operate

| Page | Proposed canonical route | Outcome |
| --- | --- | --- |
| Manage Sessions | `/community-developers/manage-sessions` | Store, refresh, rotate, expire, and dispose of member-session tokens. |
| Revoke Access | `/community-developers/revoke-access` | Revoke access, refresh, authorization, and delegated credentials with known propagation boundaries. |
| Go To Production | `/community-developers/go-to-production` | Re-register, re-authorize, re-test, and review a staging integration for production. |
| Troubleshoot | `/community-developers/troubleshoot` | Diagnose capability, configuration, permission, runtime, member-state, and support boundaries. |

### Reference

| Page | Canonical route | Purpose |
| --- | --- | --- |
| OAuth And OpenID Connect | `/community-developers/oauth-and-oidc` | Look up actors, issuers, discovery, endpoints, grants, response types, client authentication, and capability status. |
| Scopes And Claims | `/community-developers/scopes-and-claims` | Look up scope families, consent, claim names, claim locations, optionality, and retention guidance. |
| Tokens And Revocation | `/community-developers/tokens-and-revocation` | Identify token purpose, format, validation, custody, lifetime source, rotation, and revocation semantics. |
| Roles | `/community-developers/roles` | Distinguish documented public roles, account state, internal values, and application-policy boundaries. |
| API Reference | `/community-developers/api-reference` | Find an operation's environment, schema, authentication context, scopes, and implementation status. |
| SDKs And Libraries | `/community-developers/sdks-and-libraries` | Select a maintained protocol library and understand what responsibility remains with the application. |
| Brand Guidelines | `/reference/brand-guidelines` | Use the single cross-audience source for name, asset, sign-in, affiliation, press, legal, and approval rules. |
| Terms | `/community-developers/terms` | Define canonical protocol, application, security, delegation, and Citizen iD terms. |

The current `Tokens And Revocation` route remains useful as a lookup reference.
The new task pages own the procedural session and revocation narratives, while the reference page owns compact token facts and links to complete proofs.

## Narrative Contract

Every task page uses the shared Asteria Rescue fixture and follows this order:

1. `When complete` states the observable result.
2. `Scenario Context` identifies the application, actor, member state, environment, token custodian, and responsibility boundary.
3. `Before You Start` lists prerequisites and capability checks.
4. `Configuration` records developer-controlled and staff-controlled requirements separately.
5. `Protocol Flow` explains the ordered interaction and trust boundaries.
6. `Working Example` contains complete, copyable requests, responses, credentials, decoded artifacts, and application behavior.
7. `Expected Result` states both the protocol outcome and member-visible effect.
8. `Verify It` separates server capability, stored client configuration, assigned permissions, and runtime proof.
9. `Failure Branches` records trigger, visible result, saved state, safe retry point, member effect, and support evidence.
10. `Next Step` links to the next Build or Operate task.

Omit an inapplicable heading instead of adding empty ceremony.
Reference pages remain lookup-first.
Each reference page opens with one compact Asteria example that shows when the reference is used, then provides tables, complete artifacts, and task-guide links.
Do not bury required configuration, security boundaries, or complete proof artifacts inside disclosure controls.

## Task Page Design

### Developer Guide

Extend the existing Asteria scenario map through Build, Operate, and Reference.
Add a compact lifecycle that moves from access and registration through build, launch, operation, and revocation.
Explain which page applies to interactive sign-in, API protection, member calls, application-only calls, delegation, Discord administration, and production launch.
Add one concise Admin Duties handoff to Community Setup, Discord Bot, Role Assignments, and Nickname Management.
Add one concise shared-reference handoff to Brand Guidelines.

### Get Access

Preserve the existing automatic approval, manual review, rejection, pending-request, and already-Integrator scenario packs.
Transfer account creation, verification, Discord linking, official-server membership, terms, staff contact, and staging-versus-production boundaries from the legacy registration material.
Use the current portal request workflow as authoritative when it differs from the old contact-first sequence.

### Choose Client

Preserve the server website, browser with confidential backend, capability-gated native client, and background service scenarios.
Transfer the complete confidential/public client distinction and application-type guidance.
Keep token custody, distributed-secret prohibition, required grants, S256 Proof Key for Code Exchange, and staff permissions explicit.
Replace the current wide worksheet with the structured Scenario Context design specified below.

### Register App

Preserve all four Asteria registration scenarios and secret reset.
Transfer environment separation, community ownership, generated identifiers, one-time secrets, redirect records, and client-management behavior.
Distinguish developer-controlled settings, system-generated values, and staff-controlled permissions.
Verify any claim about reset overlap, redirect validation, public-client support, or production behavior against current source and bounded environment evidence.

### Sign In Members

Asteria Dispatch signs Alex in through authorization code and OpenID Connect.
Asteria Console demonstrates the confidential backend-for-frontend variation.
Asteria Mobile remains visibly capability-pending until secretless code redemption with S256 is proven.
Transfer the complete authorization request, callback, code exchange, token response, discovery, library, ASP.NET Core sign-in, and Passport examples.
Expand the flow with exact redirect matching, `state`, `nonce`, S256 challenge and verifier, ID-token validation, server session creation, and logout boundaries.
Cover denied consent, redirect mismatch, state or nonce mismatch, reused or expired code, wrong environment, failed client authentication, missing permission, and secret exposure.

### Request Member Data

Use Alex, Blake, and Casey to demonstrate available, optional-missing, and required-missing data.
Transfer every standard, Citizen iD, Roberts Space Industries, consent, claim-placement, role-scope, and unavailable group-scope item.
Resolve `roles` scope versus `role` claim naming against current implementation evidence.
Explain minimization, optional and required variants, missing-value handling, authorization policy, and retention.

### Protect An API

Asteria API accepts a valid Dispatch access token and rejects tokens with the wrong purpose or validation properties.
Transfer the ASP.NET Core bearer example, Bearer header rules, and complete access-token properties.
Expand the proof with trusted discovery, signature, exact issuer, intended audience, lifetime, token purpose, required scope, and authorization policy.
Cover an ID token used as an API token, bad signature, wrong issuer or audience, expiry, missing scope, missing header, and revocation latency.

### Call APIs

Dispatch calls an approved Citizen iD operation for Alex.
Asteria Sync obtains a client-credentials token and calls only an operation that permits application identity.
Transfer the REST and JSON overview, OpenAPI link, base URLs, content types, Bearer calls, user context, application context, and complete client-credentials exchange.
Separate token acquisition from resource calls.
Teach operation-specific authentication and the practical difference between `401` and `403`.

### Delegate Access

Dispatch exchanges Alex's token for a scope-reduced, audience-bound token delegated to Sync for Asteria API.
Transfer every token-exchange parameter, error response, actor claim, lookup behavior, management endpoint, and revocation rule.
Explain subject, actor, audience, resource, scope attenuation, required permissions, and why delegation is not impersonation.
Cover `unauthorized_client`, `invalid_scope`, invalid audience or actor, missing subject token, privilege escalation, wrong recipient, and delegated revocation.

### Manage Sessions

Dispatch renews Alex's session, handles rotation, and expires cleanly.
Transfer complete access, ID, refresh, and opaque-token properties together with the refresh request and response sequence.
Explain token custody, server-side storage, concurrency, bounded retry, clock handling, logout, compromise detection, and member-session versus service identity.
Treat every lifetime, rotation, and grace-period statement as versioned behavior that requires current evidence.

### Revoke Access

Cover member authorization removal, standard access or refresh token revocation, delegated credential lookup, and delegated revocation.
Transfer the complete revocation requests and the security rationale from both legacy revocation locations.
Explain cascade boundaries, self-contained access-token latency, reauthorization, invalid-token success semantics, client ownership, and compromise containment.

### Go To Production

Use a two-environment promotion scenario rather than suggesting that staging records or credentials move to production.
Require separate records, secrets, redirects, permissions, discovery snapshots, consent, sign-in, token, API, refresh, revocation, support, and brand checks.
Transfer production environment and production-versus-unstable brand guidance.
Keep public-client and Pushed Authorization Request features capability-gated.

### Troubleshoot

Organize diagnosis by authorization, callback, token, validation, API, refresh, delegation, and revocation boundary.
At each boundary, separate authorization-server capability, stored client configuration, assigned permission, runtime behavior, and member state.
Use a privacy-safe evidence packet with environment, client identifier, coordinated-universal-time timestamp, correlation identifier, expected result, and exact visible error.
Do not recommend a production OAuth debugger, third-party token decoder, copied live token, or unbounded retry loop.

## Reference Page Design

### OAuth And OpenID Connect

Document protocol actors, exact issuers, discovery fields, endpoints, grants, response types, client-authentication methods, and dated environment capability status.
Separate a server-advertised feature from a stored client permission and from a proven end-to-end path.
Link every flow to its complete task proof instead of duplicating long procedural instruction.

### Scopes And Claims

Restore every legacy scope and claim table after verifying the current source.
For each scope, record purpose, family, sensitivity, consent, optionality, required variant, and member-data effect.
For each claim, record canonical name, value type, token or user-info location, absence semantics, and retention guidance.

### Tokens And Revocation

Restore complete access, ID, refresh, and delegated-token properties and examples.
For each token, record purpose, intended consumer, custodian, format, inspectability, validation, lifetime source, rotation, and revocation behavior.
Prevent the reference from implying that a JSON Web Token is encrypted or that an ID token can authorize an API.

### Roles

Restore account status, account type, privileged, internal, unavailable application, and unavailable group role material.
Label which values are a stable public contract, which are contextual account data, and which must not become an application authorization dependency.
Do not publish an internal value as stable merely because it existed in the legacy page.
Preserve the teaching point through a verified classification and recorded migration disposition.

### API Reference

Restore base URLs, JSON content types, OpenAPI access, and authentication context.
For each operation, expose environment, request and response schema, member-token or application-token requirement, minimum scopes, and implementation status.
Retain encrypted HTTP-only cookie material only as a clearly labelled first-party Citizen iD boundary, not as a third-party developer authentication instruction.
Generated OpenAPI reference may supplement this page, but task pages remain the source for end-to-end calls and failure handling.

### SDKs And Libraries

Restore the .NET package, Passport strategy, package links, contribution note, and framework examples after verifying current package names, imports, maintenance status, and supported versions.
State what the library performs and what the application must still validate, store, authorize, or protect.
Pin example versions or record the version tested with the documentation.
Every framework example must compile or execute in a checked fixture and must not rely on undeclared variables such as `services` or `environment`.
The Passport package named in prose, installation, and imports must be the same verified package.

### Brand Guidelines

Move the complete 483-line brand policy into `docs/reference/brand-guidelines.md`.
Preserve brand statements, naming, palette, production and unstable assets, clear space, minimum size, contrast, prohibited changes, sign-in buttons, co-branding, status language, affiliation, approvals, do-and-don't guidance, press, legal terms, and the implementation checklist.
Reorganize those facts around the tasks `Choose an environment`, `Choose a placement`, `Build sign-in UI`, `Describe Citizen iD`, and `Request approval`.
Follow the task packs with canonical asset and rule tables.
Prefer versioned local copies of approved public assets over runtime dependence on remote assets when ownership and licensing permit it.
Record a keep, replace, localize, or retire decision for every one of the 16 legacy remote asset URLs and every rendered button example.

### Terms

Extend the existing glossary with actor, subject token, delegated token, relying party, authorization server, resource server, and token purpose.
Keep the canonical distinctions among community tool, application record, OAuth client, protected resource, token custodian, and member context.
Link definitions reciprocally from first meaningful use.

## Canonical Cross-Audience Ownership

| Legacy material | Canonical destination | Developer-guide treatment |
| --- | --- | --- |
| Bot invitation, server selection, permissions, and role hierarchy | `/community-admins/discord-bot` | One Admin Duties handoff from Developer Guide and relevant troubleshooting links. |
| Linked-role provider setup and role conditions | `/community-admins/discord-bot#configure-linked-roles` | Link when explaining official community operations. |
| Member authorization and linked-role claim journey | `/players/discord-integrations` | Link when explaining member-visible effects. |
| Automated verification, organization, rank, removal, and role update | `/community-admins/role-assignments` | Link rather than repeat operator steps. |
| Nickname synchronization, templates, enforcement, hierarchy, and protected users | `/community-admins/nickname-management` | Link rather than repeat operator steps. |
| Shared name, logo, asset, sign-in, affiliation, press, legal, and approval policy | `/reference/brand-guidelines` | Link from Sign In Members, Go To Production, and the Reference sidebar. |

One canonical owner prevents the old Integrator Guide's developer/admin mixture from returning under a new path.
Cross-audience links must state why the reader is leaving the developer journey and what outcome the destination provides.
A `canonical-handoff` closes only the developer-navigation treatment.
It cannot close a substantive legacy heading until the destination Community Admin, Player, or Reference page contains and verifies the complete source outcome.

The Discord destinations have these additional migration contracts:

- Community Admin Discord Bot must preserve and expand installation, authorization, server choice, portal ownership, bot permissions, role hierarchy, linked-role provider setup, condition configuration, publication, and verification.
- The direct fixed-invite instruction must become the currently verified portal-sourced installation journey while preserving the original install outcome.
- Player Discord Integrations must preserve and expand the member authorization, redirect, linked-role selection, claim, refresh, and visible failure journey.
- Community Admin Role Assignments must preserve verification, organization, rank, automatic removal, command behavior, permission, hierarchy, preview, audit, resync, and failure outcomes.
- Community Admin Nickname Management must preserve synchronization, Roberts Space Industries handle, custom display name, enforcement, permissions, hierarchy, protected users, fallback, truncation, preview, resync, and failure outcomes.
- Every one of the 11 legacy Discord screenshot references requires a keep, reuse, replace, or retire decision tied to a verified destination outcome.
- Existing deeper content counts as transferred only after the heading-level manifest confirms that no source command, condition, image decision, member effect, or operator result is missing.

## Legacy Content-Equivalence Matrix

The implementation must capture the following mapping in a durable migration manifest before editing or deleting a legacy page.
The manifest must contain one row per source heading, not merely one row per file.

| Legacy source | Required canonical coverage |
| --- | --- |
| `integrator-guide/index.md` | Developer Guide journey map, OAuth and API destinations, Discord Admin Duties handoff, and brand handoff. |
| `integrator-guide/registration.md` | Get Access account, verification, Discord, terms, support, staging, and production packs. |
| `integrator-guide/oauth2/index.md` | Get Access, Choose Client, Register App, Go To Production, and OAuth reference coverage for roles, applications, client types, credentials, reset, and environments. |
| `integrator-guide/oauth2/flows-grants.md` | Sign In Members, Call APIs, Delegate Access, Manage Sessions, Revoke Access, and OAuth reference coverage for all requests, responses, errors, PKCE, rotation, exchange, audience, actor, and revocation behavior. |
| `integrator-guide/oauth2/oidc.md` | Sign In Members, Protect An API, SDKs And Libraries, and OAuth reference coverage for discovery, issuer, authority, audience, ASP.NET Core, and Passport. |
| `integrator-guide/oauth2/scopes-claims.md` | Request Member Data and Scopes And Claims reference coverage for consent, standard scopes, Citizen iD scopes, Roberts Space Industries scopes, claims, placement, and unavailable group scopes. |
| `integrator-guide/oauth2/roles.md` | Request Member Data and Roles reference coverage for status, account types, partner or Integrator roles, internal values, and unavailable application or group roles. |
| `integrator-guide/oauth2/tokens.md` | Manage Sessions and Tokens And Revocation reference coverage for complete encoded access and ID tokens, matching decoded claims, opaque refresh token, properties, validation, and custody. |
| `integrator-guide/oauth2/revocation.md` | Revoke Access coverage for purpose and standard revocation. |
| `integrator-guide/oauth2/delegation.md` | Delegate Access and Revoke Access coverage for scope reduction, target client, actor claim, lookup, ownership, and invalidation. |
| `integrator-guide/oauth2/sdks.md` | SDKs And Libraries coverage for the .NET package, Passport package, package links, status, and contributions. |
| `integrator-guide/api/index.md` | Call APIs and API Reference coverage for REST, JSON, OpenAPI, base URLs, and content types. |
| `integrator-guide/api/auth.md` | Protect An API, Call APIs, and API Reference coverage for first-party cookies, Bearer tokens, member context, and application context. |
| `integrator-guide/discord/index.md` | Community Admin Discord Bot coverage for installation, authorization, server choice, permissions, hierarchy, and all three image decisions. |
| `integrator-guide/discord/linked-roles.md` | Community Admin linked-role setup and Player claim-journey coverage for provider setup, conditions, instructions, authorization, claiming, and all eight image decisions. |
| `integrator-guide/discord/role-management.md` | Community Admin Role Assignments coverage for verification, organization, rank, removal, command behavior, permissions, and hierarchy. |
| `integrator-guide/discord/nickname-management.md` | Community Admin Nickname Management and Player command coverage for sync, display name, enforcement, permissions, hierarchy, and protected users. |
| `integrator-guide/other/brand-guidelines.md` | Reference Brand Guidelines coverage for every brand section, asset, rendered button, approval condition, legal term, and checklist item. |

The manifest records:

- Source path, source heading, and source anchor.
- Source-file content hash captured before migration.
- Canonical destination path, heading, and anchor.
- Disposition of `migrated`, `expanded`, `corrected`, `canonical-handoff`, or `navigation-only`.
- Correction rationale and current evidence when the old statement is not retained literally.
- Proof-example identifiers.
- Screenshot and asset identifiers.
- Reviewer and verification status.

Every substantive source heading requires a destination.
`Navigation-only` is valid only for a heading whose complete function was linking to content now represented by the new journey.
No heading may disappear because it was inconvenient to place.

The executable closure gate must assert:

- Exactly 18 unique source-file records.
- Exactly 110 unique source-heading records.
- Exactly 23 unique proof-example identifiers.
- Exactly 11 unique screenshot-reference records.
- Exactly 16 unique remote-brand-asset records.
- No duplicate source key, destination key, example identifier, screenshot identifier, or asset identifier.
- No missing destination, unresolved disposition, unreviewed correction, or unverified proof hash.
- No unresolved credential-provenance decision.
- Every destination file and heading anchor exists in the built public output.
- Every `canonical-handoff` row also points to a completed substantive destination row.

## Complete Credential Proof Contract

All 23 legacy fenced examples require destination identifiers and complete proof-equivalence review.

The required inventory is:

- Twelve flow blocks covering authorization request, code exchange, token response, refresh request and response, client-credentials request and response, token-exchange request and response, unauthorized-client error, refresh-token revocation, and access-token revocation.
- Five token-reference blocks covering a complete encoded access token with matching decoded claims, a complete encoded ID token with matching decoded claims, and a complete opaque refresh token.
- Three framework blocks covering ASP.NET Core Bearer validation, ASP.NET Core OpenID Connect sign-in, and Passport sign-in.
- Three utility blocks covering an API base URL, Bearer header, and role-update command.

Credential shape is not a deletion criterion.
Do not replace a complete proof with `REDACTED`, `REPLACE_WITH_TOKEN`, an ellipsis, an omitted-field comment, a shortened prefix and suffix, or a line-clamped view.

For each credential-shaped proof:

- Record its source example identifier, fixture owner, generation source, environment, production or non-production status, provenance decision, and sensitivity review.
- Retain the current value byte-for-byte unless positive evidence proves that publishing it would expose an operable credential, real personal data, or another sensitive value.
- Treat unknown provenance as an investigation item, not an automatic replacement reason.
- Block proof closure and request an explicit user decision if provenance remains unresolved after the defined investigation.
- If positive evidence requires removal, rotate or revoke an operable value where applicable, record the incident response, and replace it with a complete synthetic, non-operational equivalent.
- Preserve parameter names, response keys, claim names, value types, arrays, nesting, cross-field relationships, and demonstrated success or error behavior.
- Preserve byte-identical encoded-to-decoded parity for token pairs.
- Label the artifact visibly with its verified status, such as synthetic or historical non-operational, and state that it is not a secret and is unusable in Citizen iD staging or production.
- Keep raw credentials on one logical line so copying returns the exact fixture.
- Put decoded headers and claims in adjacent, fully pretty-printed blocks with deterministic ordering.
- Include validation checks for signature or fixture integrity, issuer, audience, expiry, token purpose, and scopes where applicable.
- Add `state`, `nonce`, and S256 challenge and verifier to authorization-code proofs while preserving every valid legacy field.
- Keep browser and native proofs free of a distributable client secret.

Configuration templates are distinct from proof transcripts.
Templates may use obvious placeholders.
Proof transcripts must remain complete.
Do not use a live token against a third-party decoder to establish provenance or correctness.

## Scenario Context Rework

The current ten-column table inside a two-column component is rejected.
Moving the same approximately 90-rem table into a larger scroll region would improve discoverability but would preserve the core usability failure.

Keep `ScenarioContext.vue` as the globally registered facade with its current `fixture`, `focus`, and `view` props.
Split the rendering into focused internal components:

- `ScenarioApplicationSummary.vue` renders the small set of application facts needed to understand the current page.
- `ScenarioApplicationWorksheet.vue` renders the complete registration data as grouped application records.
- `ScenarioSupportingContext.vue` renders people, member states, and responsibility boundaries.
- Existing Mermaid and legend components remain optional visual enhancements.

Use this order:

1. Visible `Synthetic scenario` heading and goal.
2. Environment and community metadata.
3. Compact application summary.
4. People and responsibility boundaries.
5. Synthetic-data warning.
6. Optional contained diagram and legend.

The default Scenario Context must not contain the complete ten-field worksheet.
The compact application summary shows only application, runtime, member presence, token custodian, client type, and intended grant.
Detailed redirect records, secret result, staff permissions, and protocol notes belong in `ScenarioApplicationWorksheet` on Choose Client and Register App.

The worksheet renders one named application record at a time.
Each record uses grouped description lists for Runtime Context, Portal Record, and Protocol Outcome.
At sufficiently wide container widths, records form a two-column card grid.
At narrower widths, records stack.
No worksheet field is hidden behind horizontal scrolling.
Use a separate compact comparison table only when a page asks the reader to compare applications.
That table must contain no more than five short columns and must switch to labelled records before it needs horizontal scrolling.

Use Vue's server-rendering-stable `useId()` for accessible region identifiers.
Do not derive an identifier only from fixture and focus because the same focus can appear twice.
The semantic context must remain complete if Mermaid or client-side JavaScript fails.

Acceptance criteria:

- Existing Markdown calls to `ScenarioContext` remain valid.
- The default context contains no ten-column worksheet.
- Every application field remains available in the dedicated worksheet.
- No Scenario Context or worksheet requires horizontal scrolling at 390, 768, 960, 1024, 1280, or 1440 pixels.
- At desktop width, application records use the added width rather than wrapping inside one half of a two-column grid.
- Long URIs break at safe path or punctuation boundaries without altering copied text.
- People and responsibilities appear below, not beside, the full application worksheet.
- The component has a programmatic name and a logical reading order.

## Shared Wide-Content Primitive

Replace duplicated Mermaid and legend breakpoint margins with one CSS primitive.

- `.vp-doc` owns `--cid-wide-content-outset`.
- The value is `0px` below 768 pixels.
- The value is `24px` from 768 pixels.
- The value is `48px` from 960 pixels.
- `.cid-wide-content` applies the logical inline outset.
- `.cid-wide-content--contained` suppresses a second outset inside an already wide surface.

Apply the primitive to top-level Mermaid diagrams, Scenario Context, Scenario Application Worksheet, diagram legends, VitePress code groups, and complete proof surfaces where their existing layout does not already provide an equivalent outset.
Do not apply it twice to nested Mermaid, legend, code, or worksheet content.
Keep custom-detail padding compensation separate from the document-width token.

Acceptance criteria:

- At 1440 pixels, each top-level wide surface is the normal content width plus 96 pixels within a two-pixel tolerance.
- From 768 through 959 pixels, each top-level wide surface is the normal content width plus 48 pixels.
- Below 768 pixels, no wide surface uses a negative inline margin.
- The document element never gains page-level horizontal overflow.
- Any necessary overflow belongs to the exact Mermaid or raw-code scroll owner and is keyboard accessible.

## Mermaid Theme And Scroll Ownership

Keep the established light semantic fills in both themes.
Split the overloaded text token into `--cid-mermaid-canvas-text` and `--cid-mermaid-node-text`.
Use theme-aware canvas, cluster, edge, and TreeView text.
Keep boxed semantic-node text dark in both modes while those node fills remain light.
Give edge labels their own verified foreground and background pair.

Apply both CSS `color` and SVG `fill` to generated HTML labels and text labels.
Linked nodes use the node foreground rather than the canvas foreground.
Mermaid theme variables must provide safe defaults before shared semantic CSS is applied.
Shared semantic class selectors remain authoritative over generated inline presentation.

Make `MermaidDiagram` itself the single horizontal scroll owner.
Do not place the scroll class only on an outer Scenario Context wrapper.
Center the SVG within the element that actually owns `scrollWidth` and `clientWidth`.
Nested TreeView and legend surfaces use the contained wide modifier and never double-expand.

Acceptance criteria:

- Ordinary Mermaid node text has at least 4.5:1 contrast against its computed node fill in desktop light and dark modes.
- Edge-label text has at least 4.5:1 contrast against its label background.
- Meaningful strokes, edges, and focus indicators have at least 3:1 contrast against adjacent colors.
- TreeView canvas labels remain readable in both themes.
- Every diagram renders an SVG and no loading or error state remains at capture time.
- A wide diagram scrolls locally and its initially visible position is intentional.
- The legend uses the same semantic palette and does not add a second document-width outset.

## Terms And Abbreviation Spacing

The abbreviation dictionary already classifies all 19 entries, but the component currently ignores those categories.
Change `AbbreviationGlossary` to require one category and add a tested category lookup that rejects unknown values.
Render one glossary component under each visible category heading.

The expected counts are:

- Protocol: nine.
- Application: five.
- Security: four.
- Citizen iD: one.

Wrap each `dt` and `dd` pair in one glossary-entry element.
At desktop widths, each entry uses a deliberate term column and a flexible description column.
At narrow widths, term and description stack.
Reset inherited `dd` margins.
Use one modest entry gap, one larger group gap, and subtle dividers instead of table-like cell padding.
Keep the abbreviation, expansion, and Citizen iD-specific description visually distinct.
Do not make non-actionable abbreviations keyboard-focusable.

Acceptance criteria:

- Every dictionary entry appears exactly once.
- Entries are alphabetized within their category.
- Every `abbr` exposes the canonical expansion in its `title`.
- A term remains visually paired with its description at every width.
- The four ordinary non-abbreviation definition sections remain authored Markdown.

## VitePress Built-In Components

Target the installed VitePress 1.6.4 behavior and its version-pinned documentation.
Prefer documented built-ins over custom interaction code when their semantics match.

Use `::: code-group` only for equivalent alternatives that perform the same step.
The ASP.NET Core OpenID Connect and Passport interactive sign-in configurations form one valid code group.
The ASP.NET Core Bearer API example is a different task and remains visible outside that group.
Remove `Tabs.vue`, its import, and global registration after no consumer remains.

Do not group sequential evidence.
An authorization request, callback, token response, raw token, decoded claims, validation result, refresh, and revocation are all required stages and remain visible in document order.

Use titled fences consistently:

````markdown
```csharp [Program.cs]
```

```ts [app.ts]
```

```http [token-response.http]
```

```text [raw-access-token.txt]
```

```json [decoded-access-token.json]
```
````

Use VitePress code imports for executable examples where a repository snippet can be compiled, linted, or otherwise validated.
Use line highlighting, focused lines, diffs, warnings, and errors only when they direct attention to a meaningful change or failure.
Use `::: details` for optional background, alternate explanation, or long non-essential payloads.
Do not hide required security instruction or complete proof evidence in `details`.
Use built-in custom containers for important boundaries and failure notes.
Use the default-theme Badge component for concise statuses such as `Capability pending`.
Keep GitHub-style alerts where they already communicate a document-level note clearly.

Acceptance criteria:

- Owned source contains no `<Tabs` use, `Tabs.vue` reference, or Tabs global registration.
- Equivalent sign-in alternatives render in one accessible VitePress code group.
- Required sequential proof stages remain simultaneously discoverable.
- Every fence whose context is not obvious has a visible artifact, operation, or file label.
- Copying a raw credential returns its complete fixture byte-for-byte.
- Built-in component controls, labels, copy buttons, selections, and code text meet contrast requirements in both themes.

## Public-Source Boundary

Configure VitePress `srcExclude` so authoring and agent-control documents do not become public routes.
Because `docs` is the VitePress source root, use source-relative patterns.
At minimum, configure `**/AGENTS.md` and `superpowers/**`.
Keep local search and sitemap generation limited to the public documentation set.
Add a generated-route assertion so an accidental authoring page fails validation rather than relying on manual inspection.

Historical plans and specifications may continue to record the state that existed when they were written.
They must be excluded from public routing and search.
Active instructions, navigation, and current public prose must not direct a contributor to edit or visit the deleted legacy tree.

## Legacy Removal Contract

Perform removal only after migration evidence is complete.

The final removal must:

- Delete all 18 Markdown files under `docs/integrator-guide/**`.
- Remove the `/integrator-guide/` sidebar mapping.
- Replace every public Markdown link to a legacy route.
- Replace `Legacy Details` sections with canonical content or canonical local anchors.
- Replace the Reference brand migration stub with the complete policy.
- Remove current migration-complete notes from public Reference and Community Developer pages.
- Record a migrate, replace, reuse, or retire disposition for all 11 legacy screenshot references.
- Preserve screenshots already reused by Player or Community Admin pages.
- Remove only assets proven orphaned after all canonical destinations build.
- Remove custom Tabs only after the OIDC examples use the built-in structure.

No redirect configuration may be added for the obsolete tree.
No old page may remain as frontmatter-only, link-only, canonical-tag, or meta-refresh content.

Final repository and built-output checks must prove:

- `rg --files docs/integrator-guide -g "*.md"` returns no files.
- Owned public Markdown and VitePress configuration contain no `/integrator-guide` target.
- Generated HTML, sitemap, and local-search data contain no legacy route or legacy page title.
- A direct request to a representative old URL receives the ordinary not-found response.
- Every new canonical route and cross-audience destination resolves.

## Verification And Visual Review

Turn `pnpm visual:audit` from an observation collector into a failing gate.
Use one shared route inventory for build, link, and visual checks where practical.

The default pull-request visual matrix uses:

- 1440 by 1000 desktop light.
- 1440 by 1000 desktop dark.
- 1280 by 900 desktop light.
- 1280 by 900 desktop dark.

Breakpoint checks additionally cover 1024, 960, 768, and 390 pixels.
The 390-pixel case verifies containment and accessibility rather than driving the desktop composition.
Every public route changed by the migration receives a 1440 by 1000 capture and review in both light and dark modes.
The smaller representative matrix covers every distinct complex layout at the additional widths without multiplying identical reference-page captures.

Required route states include:

- Developer Guide TreeView.
- Choose Client Scenario Context and complete worksheet.
- Sign In Members code group and authorization sequence.
- Protect An API complete raw and decoded token proof.
- Manage Sessions refresh and rotation proof.
- Terms category layout.
- Brand Guidelines assets and sign-in controls.
- Community Admin Discord Bot handoff destination.
- A representative ordinary Mermaid flowchart.
- Search.
- Not-found.

The audit must:

- Set the persisted VitePress appearance before navigation and assert the resulting theme class.
- Assert that theme styles loaded by checking a Citizen iD custom property and normal layout bounds.
- Wait with bounded timeouts for document readiness, fonts, diagrams, and route-specific content.
- Record page errors, console errors, and failed owned-resource requests.
- Fail rather than swallow Mermaid readiness errors.
- Disable animation before capture.
- Produce a full-page image and structured JSON result for every route, viewport, and theme.
- Aggregate failures, write the report, and exit non-zero.
- Assert one visible `h1`, one `main`, a non-empty title, and valid primary landmarks.
- Assert no document-level horizontal overflow.
- Assert the expected wide-content outsets.
- Assert Scenario Context contains no horizontally scrolling worksheet.
- Assert every Mermaid diagram rendered and meets computed contrast thresholds.
- Assert code-group keyboard selection and complete credential copying.
- Assert glossary category counts and term-description pairing.
- Assert all owned links and fragments resolve.
- Assert no excluded authoring route is generated.

Manual visual review supplements the automated gate.
Reviewers inspect every required desktop light and dark capture for reading order, density, line length, clipping, focus visibility, theme consistency, code-label clarity, diagram balance, table or card scanning, and professional polish.
Do not accept equal-size or unstyled screenshots as evidence without first proving the expected theme class and Citizen iD stylesheet are active.

## Comprehensibility Review

Run four role-based reviews after the complete draft:

- A newcomer must complete access, client choice, registration, sign-in, API protection or calling, session operation, and production readiness without a legacy page.
- An identity specialist must verify exact issuers, client boundaries, S256 Proof Key for Code Exchange, token purpose, claims, delegation, rotation, revocation, and capability statements.
- A documentation reviewer must verify narrative consistency, canonical ownership, terminology, complete proof preservation, asset provenance, and source-line readability.
- A Community Admin or Player reviewer must verify that Discord handoffs land at the correct canonical task without duplicated or missing operator/member instruction.

Resolve every Critical and Important finding before legacy removal.

## Migration And Delivery Sequence

The implementation plan should preserve this dependency order:

1. Capture the 18-page, 110-heading, 23-example, 11-screenshot, and 16-brand-asset baseline with hashes and identifiers.
2. Investigate example provenance, retain every current proof byte-for-byte by default, and replace only a positively identified sensitive or operable value through the recorded exception process.
3. Implement shared wide-content, Mermaid, Scenario Context, glossary, built-in component, source-exclusion, and visual-gate foundations.
4. Write and verify Start, Build, Operate, and developer Reference pages.
5. Complete and verify the Community Admin, Player, and Brand canonical destinations.
6. Close every migration-manifest row and example, screenshot, and asset disposition.
7. Remove links, migration stubs, sidebar mapping, custom Tabs, and the complete legacy tree.
8. Run lint, build, unit, migration, link, generated-route, credential-proof, visual, accessibility, and role-based review gates.

Do not combine legacy deletion with the first content-transfer change.
Keeping the tree until the manifest is closed preserves a direct comparison source throughout review.

## Documentation Maintenance

Update `docs/AGENTS.md` with the final authoring contracts for scenario packs, complete proof examples, VitePress built-ins, wide surfaces, diagrams, and cross-audience canonical ownership.
Update the repository README with public information architecture, local validation commands, visual evidence location, and the no-legacy-route state.
Keep source-level comments focused on why a rendering or validation boundary exists.

## Evidence Sources

The design is based on:

- The current VitePress configuration, theme components, shared styles, Mermaid configuration, scenario fixtures, abbreviation dictionary, and visual-audit script.
- All 18 pages under `docs/integrator-guide/**` and their current Community Developer, Community Admin, Player, and Reference destinations.
- [VitePress 1.6.4 Markdown documentation](https://github.com/vuejs/vitepress/blob/v1.6.4/docs/en/guide/markdown.md) for code groups, titled fences, code imports, line highlighting, focused lines, diffs, and custom containers.
- [VitePress default-theme Badge documentation](https://vuejs.github.io/vitepress/v1/reference/default-theme-badge) for concise status notation.
- [Mermaid theming guidance](https://mermaid.js.org/config/theming.html) for base themes and theme variables.
- [WCAG 2.2 contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) for normal text and meaningful graphics.
- [RFC 9700](https://www.rfc-editor.org/rfc/rfc9700.html), [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0-18.html), [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html), and [RFC 7009](https://www.rfc-editor.org/rfc/rfc7009.html) for security, sign-in, delegation, and revocation baselines.

Citizen iD capability, claim, token, client, permission, API, Discord-command, and reset statements must be pinned to current source and dated environment evidence during implementation.
Live discovery is environment evidence, not proof that a particular application has permission to use every advertised feature.
