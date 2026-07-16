# Community Developers 3A Design

## Goal

Replace the Community Developers entry path with a journey-first Start category.
Introduce one reusable synthetic scenario fixture, an accessible scenario-context component, systematic abbreviation expansion, and four task-oriented pages.
Use Mermaid TreeView beta on the landing page to present the complete scenario hierarchy while retaining a semantic HTML representation for accessibility, search, printing, and render failure.

## Scope

This slice implements:

- `Developer Guide` at `/community-developers/`.
- `Get Access` at `/community-developers/access`.
- `Choose Client` at `/community-developers/client-types`.
- `Register App` at `/community-developers/applications`.
- A reusable `ScenarioContext` component backed by typed fixture data.
- A reusable `Abbr` component backed by a typed abbreviation dictionary.
- A reusable `AbbreviationGlossary` component backed by that dictionary.
- A compact `Terms` reference generated from the same abbreviation dictionary.
- Start-category navigation with short labels.

The existing OAuth and API pages remain temporarily available in their current sidebar group until later migration slices replace them.
This temporary availability is sequencing, not a compatibility requirement.
The old `/community-developers/request-integrator-access` page is removed after repository links move to `/community-developers/access`.
No redirect or legacy-content preservation is required because this is a green-field migration.
This intentionally accepts that old external bookmarks and search results may stop resolving, following the user's explicit green-field migration decision.

## Reader Outcome

After completing the Start category, a developer can:

- Determine whether they are eligible to request the Integrator product role.
- Predict whether they can submit and recognize automatic approval, manual review, rejection, and blocked-submission outcomes without assuming an invisible policy result.
- Choose a confidential web, browser with a confidential Backend for Frontend, capability-gated public native, or confidential service client without guessing where tokens and secrets belong.
- Prepare safe synthetic registration values.
- Register an application and verify the stored client record.
- Understand which application settings the developer controls and which require Citizen iD staff.
- Recognize every abbreviation used in the pages without relying on prior protocol knowledge.

## Design Direction

Lead every page with `When complete, ...` and the relevant Asteria scenario context.
Organize substantive tasks as scenario packs rather than flat feature descriptions.
Each pack uses the applicable subset of Goal, Configuration, Applicant or Member State, Protocol Flow, Working Example, Expected Result, Member Effect, Verify It, Failure Branches, and Support Evidence.
Do not add empty headings merely to satisfy the shared pack vocabulary.

Use Stripe's build-guide progression as inspiration for the build outcome, setup, testing, and monitoring rhythm.
Use Kubernetes tutorial objectives and ordered modules as inspiration for the Start journey.
Use Discord's linked-role tutorial as inspiration for separating operator setup from member-visible acquisition.
Use GitHub's permissions guidance as inspiration for naming who can perform each task.
Use Slack's quickstart completion framing as inspiration for the page introductions.

## Synthetic Fixture

All scenario data is fictional and reusable.
Use reserved `.invalid` domains and obvious placeholders only.
Never migrate realistic tokens, authorization codes, client secrets, personal identifiers, or internal role names from the legacy guide.

The fixture is named `asteria` and contains:

| Kind | Name | Synthetic value | Purpose |
| --- | --- | --- | --- |
| Community | Asteria Rescue | `asteria-rescue` | Community that owns the example applications. |
| Web app | Asteria Dispatch | `https://dispatch.example.invalid` | Confidential server-rendered website. |
| Browser app | Asteria Console | `https://console.example.invalid` | Browser user interface backed by a confidential Backend for Frontend. |
| Native app | Asteria Mobile | `com.example.invalid.asteria.mobile:/oauth/callback` | Public native application whose protocol availability must be verified before use. |
| Service | Asteria Sync | `https://sync.example.invalid` | Confidential background service. |
| API | Asteria API | `https://api.example.invalid` | Protected application programming interface. |
| Operator | Jordan | `developer@example.invalid` | Integrator applicant and application operator. |
| Member | Alex | Synthetic member | Verified, linked accounts available, verified email available. |
| Member | Blake | Synthetic member | Verified and linked, but verified email unavailable. |
| Member | Casey | Synthetic member | Required Roberts Space Industries verification unavailable. |
| Member | Devon | Synthetic member | Previously authorized, then revoked authorization. |

The fixture stores this complete registration worksheet:

| Application | Runtime | Member present | Token custodian | Application Type | Client Type | Redirect records | Secret result | Intended grant |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Asteria Dispatch | Server website | Yes | Dispatch server | `Web` | `Confidential` | `https://dispatch.example.invalid/auth/citizenid/callback`; post-logout `https://dispatch.example.invalid/auth/citizenid/signed-out` | Generated once | Authorization code. |
| Asteria Console | Browser plus Backend for Frontend | Yes | Console backend | `Web` | `Confidential` | `https://console.example.invalid/auth/citizenid/callback`; post-logout `https://console.example.invalid/auth/citizenid/signed-out` | Generated once | Authorization code. |
| Asteria Mobile | Installed native application | Yes | Native application secure storage | `Native` | `Public` | `com.example.invalid.asteria.mobile:/oauth/callback`; no post-logout redirect in this scenario | No secret | Authorization code with S256 Proof Key for Code Exchange, capability pending until verified. |
| Asteria Sync | Server background job | No | Sync service secret manager | `Web` | `Confidential` | No redirect or post-logout redirect | Generated once | Client credentials. |

Every application focus also stores its environment, owning community, intended endpoint and grant permissions, and expected post-save values.
The initial walkthrough uses staging.

The fixture holds page-focus definitions so pages select shared data instead of redefining it.
Start focus keys are `overview`, `access`, `client-types`, and `applications`.
Later migration slices may add focus keys without changing existing page markup.

## Scenario Component

Add `ScenarioContext.vue` and a typed `scenarioFixtures.ts` module under the VitePress theme.
Register `ScenarioContext` globally so Markdown pages can use it without imports.

The component API is:

```vue
<ScenarioContext fixture="asteria" focus="overview" view="tree" />

<ScenarioContext fixture="asteria" focus="access" />
```

`fixture` and `focus` select centrally defined data.
`view` accepts `compact` or `tree` and defaults to `compact`.
Each focus definition selects the exact applications and people that appear.
Pages may not override names, states, URLs, identifiers, goals, or subsets inline.

Every rendering contains:

- A visible `Synthetic scenario` label.
- The page-specific build goal.
- Relevant community and application records.
- Relevant operator, applicant, or member states.
- Developer, Citizen iD, community-admin, and member responsibility boundaries when applicable.
- A warning that values must be replaced and that `.invalid` domains cannot receive production traffic.

Render these details as a named `<section>`, visible labels, description lists, lists, and tables before any diagram.
Do not emit `h1`, `h2`, or `h3` elements from the component because the Markdown page owns the document outline.
Do not hide essential context behind disclosure controls, hover, focus, JavaScript, or the Mermaid rendering.

### Tree View

The landing page uses `view="tree"`.
Tree mode passes a fixture-derived `treeView-beta` graph to the existing `MermaidDiagram` component after rendering the semantic context.
The installed Mermaid version is 11.16.0, and TreeView beta is supported from Mermaid 11.14.0.

The hierarchy uses this TreeView beta structure:

```mermaid
treeView-beta
    "Asteria Rescue scenario" :::context
        "Example applications" :::context
            "Asteria Dispatch" :::context ## confidential web application
            "Asteria Console" :::context ## browser with a confidential backend
            "Asteria Mobile" :::caution ## public native capability pending
            "Asteria Sync" :::context ## confidential background service
        "External protected resource" :::data
            "Asteria API" :::data ## used in later Build guides
        "Example operator" :::actor
            "Jordan" :::actor ## applicant and application operator
        "Example member states" :::actor
            "Alex" :::success ## required data available
            "Blake" :::caution ## verified email unavailable
            "Casey" :::blocked ## required verification unavailable
            "Devon" :::blocked ## authorization later revoked
```

Use TreeView `##` descriptions for concise states.
Use the existing shared semantic classes through TreeView `:::class` annotations where the renderer supports them.
Use full terms in labels instead of abbreviations.
Do not register an icon pack or add decorative icons in this slice.
Generate Mermaid `accTitle` and `accDescr` statements for an accessible diagram title and description.
State immediately before the tree that it groups reusable example data rather than asserting ownership or community membership.
Mark Asteria API as an application-owned resource used by later Build guides and not registered during Start.

TreeView is a desktop-oriented overview and may scroll inside the existing centered Mermaid container when necessary.
It must not create page-level horizontal overflow.
Compact context mode remains the primary layout on task pages and smaller screens.
Add TreeView-specific shared-class selectors because the existing flowchart selectors do not style TreeView labels.
Render `DiagramLegend` directly after the TreeView because direct component use bypasses the Markdown-fence legend injection.
Configure the wrapper and SVG sizing so wide descriptions retain a readable intrinsic width and scroll inside the component instead of shrinking or overflowing the page.

## Abbreviation System

Add `Abbr.vue`, `AbbreviationGlossary.vue`, and a typed `abbreviations.ts` dictionary under the VitePress theme.
Register both components globally.

Usage is:

```vue
<Abbr term="OIDC" />
```

The component renders semantic `<abbr>` markup with:

- The abbreviation as visible text.
- The full term in `title`.

Do not add mandatory `tabindex` values or custom tooltip-only interaction to repeated abbreviations.
Native hover behavior supplements visible prose and never carries unique instructions.
Spell out a term on first meaningful use in each page, then use `Abbr` for later occurrences.
Avoid abbreviations in headings when the full term remains concise.
Keep literal protocol parameters and claim names in code formatting and explain them in adjacent prose.
Use full terms in Mermaid diagrams where space permits.
Do not abbreviate Citizen iD in prose.

Every typed dictionary entry contains `term`, `expansion`, `category`, and a concise Citizen iD-specific `description`.
Unknown abbreviation keys fail clearly during development.
The initial dictionary contains:

| Term | Expansion |
| --- | --- |
| API | Application Programming Interface |
| BFF | Backend for Frontend |
| CORS | Cross-Origin Resource Sharing |
| CSRF | Cross-Site Request Forgery |
| HTTP | Hypertext Transfer Protocol |
| JWKS | JSON Web Key Set |
| JWT | JSON Web Token |
| M2M | Machine to Machine |
| OIDC | OpenID Connect |
| PAR | Pushed Authorization Requests |
| PKCE | Proof Key for Code Exchange |
| RFC | Request for Comments |
| RSI | Roberts Space Industries |
| SDK | Software Development Kit |
| SPA | Single-Page Application |
| URI | Uniform Resource Identifier |
| URL | Uniform Resource Locator |
| UTC | Coordinated Universal Time |
| XSS | Cross-Site Scripting |

OAuth 2.0 remains a proper protocol name and is not assigned a speculative expansion.
The Terms page renders the canonical visible glossary from the same dictionary to prevent drift.

## Developer Guide

Use this heading structure:

```markdown
# Developer Guide

## What You Will Build

## Scenario Map

## Start The Journey

### Get Access
### Choose Client
### Register App

## Know The Boundary

### Developer Duties
### Admin Duties
### Member Control

## Check Capabilities

### Start In Staging
### Read Discovery
### Confirm Production

## Get Support
```

Place `ScenarioContext` using the `overview` focus and `tree` view under `## Scenario Map`.
The scenario map introduces the complete synthetic fixture once so later pages can show only the relevant branches.
The Start journey links only to pages present in this slice.
The page previews later Build and Operate outcomes in prose without creating dead links.

Use a left-to-right flowchart after the TreeView only if it adds the distinct dependency sequence `Get access → Choose client → Register app → Build → Operate`.
Do not add it if the surrounding ordered journey already makes that relationship unambiguous.

## Get Access

Use this heading structure:

```markdown
# Get Access

## Scenario Context

## Before You Start

### Who Can Apply
### Required Accounts
### Developer Terms

## Submit Request

### Goal
### Configuration
### Applicant State
### Working Example
### Expected Result
### Member Effect
### Verify It
### Failure Branches
### Support Evidence

## Automatic Approval

### Applicant State
### Expected Result
### Verify It
### Failure Branches

## Manual Review

### Applicant State
### Expected Result
### Verify It
### Failure Branches
### Support Evidence

## Next Step
```

Place compact `ScenarioContext` using the `access` focus under `## Scenario Context`.
Jordan is signed in, verified, linked to Discord, a member of the official Citizen iD Discord server, not already an Integrator, and has no pending request.
Jordan accepts the current Developer Terms of Use and submits a synthetic description of Asteria Dispatch.

Require this submission-decision table:

| Input | Ready value | Blocked result | Recovery |
| --- | --- | --- | --- |
| Signed-in Citizen iD account | Present | Application dialog cannot establish an applicant. | Sign in. |
| Roberts Space Industries verification | Complete | `Verify Citizen iD account` remains incomplete. | Complete account verification. |
| Linked Discord account | Present | `Link Discord account` remains incomplete. | Link Discord and return to the dialog. |
| Official Discord membership | Present | `Join the official Discord server` remains incomplete. | Join, wait for propagation, and use the bounded refresh action. |
| Existing Integrator role | Absent | `This account already has integrator access.` | Continue to the developer portal instead of submitting. |
| Pending request | Absent | `This account already has a pending integrator application.` | Wait for review instead of submitting another request. |
| Required form fields | Valid | Exact validation message appears and no request is stored. | Correct the named field and resubmit. |
| Developer Terms notice | Accepted | `The Developer Terms of Use notice must be accepted.` | Review and accept the current notice. |

Explain that Roberts Space Industries operates the Star Citizen account and profile system and that Citizen iD verification connects the applicant to that profile.

Require this exact current form schema with synthetic Asteria values:

| Portal field | Requirement | Limit or choices | Asteria example |
| --- | --- | --- | --- |
| `What kind of tools and applications do you want to build?` | Required | 2,000 characters | `Asteria Dispatch is a community website that lets members sign in and view dispatch tools.` |
| `Which features of CiD are you going to use and how?` | Required | 2,000 characters | `Use Citizen iD sign-in and the REST API with minimal scopes, server-side token storage, and member-controlled revocation.` |
| `Intended use` | At least one | `public`, `organization-internal`, `personal` | `public`. |
| `Citizen iD feature targets` | At least one | Sign-in, account linking, REST API, or other | Sign-in and REST API. |
| `Describe the other feature target(s)` | Required only when `Other` is selected | 400 characters | Not shown. |
| Developer Terms notice | Required | Accepted or not accepted | Accepted after Jordan reviews the linked terms. |

The guide may quote `CiD` only when reproducing the current portal label and otherwise uses `Citizen iD`.
It must explain target audiences, concrete features, relevant site links, covered use cases, and privacy considerations because the form requests that context.

Explain exact eligibility and single-pending-request boundaries.
Document only user-visible prerequisites and blockers, not internal allowlists, thresholds, scoring, or review policy.
Distinguish configured automatic approval from staff review without promising the same behavior in every environment.
If the portal does not display the approval mode, say that eligibility is predictable but the approval path is only observable after submission.
State that the server-side policy at submission time is authoritative and that production may require review.
The member-visible effect is that no community member sees a change when Jordan receives developer access.

Use `stateDiagram-v2` for `Not eligible`, `Ready`, `Submitted`, `Pending review`, `Approved`, `Rejected`, `Already Integrator`, and `Submission blocked by pending request` states.
Show a return from rejected to ready only when a new submission is allowed by current product behavior.
Verify rejection, resubmission, terms-version, Discord-membership propagation, pending-request, and existing-role behavior against the pinned implementation before documenting a recovery path.

## Choose Client

Use this heading structure:

```markdown
# Choose Client

## Scenario Context

## Before You Choose

### Identify The Runtime
### Locate The Secret Boundary
### List Required Flows

## Server Website

### Goal
### Configuration
### Expected Result
### Failure Branches

## Browser App

### Goal
### Configuration
### Expected Result
### Failure Branches

## Native App

### Goal
### Configuration
### Expected Result
### Failure Branches

## Background Service

### Goal
### Configuration
### Expected Result
### Failure Branches

## Compare Choices

## Register Next
```

Place compact `ScenarioContext` using the `client-types` focus under `## Scenario Context` and show the four Asteria applications.
The first decision is where the OAuth client and authorization-code exchange execute.
Ask observable questions instead of relying on specialist shorthand:

1. Does all token-exchange code run only on a server the operator controls?
2. Which component stores access and refresh tokens?
3. Must the job run when no member is signed in?
4. Does the application need an interactive browser redirect?
5. Which authorization grant must Citizen iD permit for this client?

The page then records whether the chosen runtime can protect a secret, whether a member is present, the redirect form, token-endpoint authentication, refresh-token storage, and staff-controlled permissions.

Recommend:

- Confidential web client for Asteria Dispatch.
- Confidential web client for the Backend for Frontend behind Asteria Console, with tokens unavailable to browser JavaScript.
- Public native client for Asteria Mobile only after an end-to-end staging test proves secretless authorization-code redemption with S256 Proof Key for Code Exchange.
- Confidential service client for Asteria Sync.

`Service` describes Asteria Sync's runtime purpose rather than a third portal application-type value.
In the current portal, Asteria Sync uses `Web` as Application Type and `Confidential` as Client Type, needs no interactive redirect for a client-credentials-only configuration, and depends on staff-assigned endpoint and grant permissions.

Discovery currently omits the `none` token-endpoint authentication method, so it does not prove that a public client can redeem a code without a secret.
Until discovery correctly advertises secretless client authentication and a bounded staging smoke test proves that path, present Asteria Mobile as `Capability pending` rather than usable.
Repeat both checks against production before labeling the production path usable.
Never suggest embedding a secret in browser, mobile, desktop, command-line, or other distributable code as a workaround.
Client credentials represent Asteria Sync itself and never prove member presence or permit member impersonation.

Use a desktop left-to-right decision flowchart and a compact comparison table.
Introduce Backend for Frontend before `<Abbr term="BFF" />` and Single-Page Application before `<Abbr term="SPA" />`.
Do not promise Pushed Authorization Requests because current discovery does not advertise an endpoint.
End with a `Carry This Forward` worksheet containing environment, owning community, runtime, token custodian, Application Type, Client Type, redirect records, secret expectation, intended grants, and required staff permissions.
The Register App page starts from the same fixture-backed worksheet.

## Register App

Use this heading structure:

```markdown
# Register App

## Scenario Context

## Before You Start

### Confirm Access
### Confirm Community
### Choose Environment
### Prepare Values
### Know Staff Controls

## Register Web App

### Goal
### Configuration
### Working Example
### Expected Result
### Member Effect
### Verify It
### Failure Branches
### Support Evidence

## Register Browser App

### Goal
### Configuration
### Working Example
### Expected Result
### Verify It
### Failure Branches

## Register Native App

### Goal
### Configuration
### Working Example
### Expected Result
### Verify It
### Failure Branches

## Register Service

### Goal
### Configuration
### Working Example
### Expected Result
### Verify It
### Failure Branches

## Reset Secret

### Goal
### Expected Result
### Verify It
### Failure Branches

## Next Step
```

Place compact `ScenarioContext` using the `applications` focus under `## Scenario Context`.
The primary walkthrough registers Asteria Dispatch as a confidential web application.
Secondary packs register Asteria Console as a browser interface with a confidential Backend for Frontend, Asteria Mobile as a capability-gated public native application, and Asteria Sync as a confidential service.

Asteria Rescue must already exist and be selectable in Jordan's developer portal context.
The guide does not teach community creation.
If the community is absent, Jordan stops, follows the [Community Setup](/community-admins/community-setup) handoff with the community administrator, and resumes only after Asteria Rescue becomes selectable.
Citizen iD support remains the recovery path when the existing community should be selectable but is not.
Do not claim a more specific ownership or membership rule until it is verified against the developer-portal community-selection implementation.

Require this environment contract:

| Contract | Staging | Production |
| --- | --- | --- |
| Exact issuer | `https://citizenid.dev/` | `https://citizenid.space/` |
| Portal origin | `https://citizenid.dev` | `https://citizenid.space` |
| Integrator eligibility and approval | Evaluated in staging | Evaluated separately in production |
| Client records and credentials | Staging-only | Production-only |
| Redirect records | Explicit staging application values | Recreated and rechecked for production |
| Wrong-environment result | Issuer, client, redirect, or credential validation fails | Issuer, client, redirect, or credential validation fails |

Use the exact slash-bearing issuer and never normalize it.
Do not reuse a client identifier or secret across environments.
Treat discovery as authorization-server capability metadata, not proof that a particular application is permitted to use every advertised feature.

Before a scenario calls a feature usable, require all four checks:

1. The environment discovery document advertises the server capability.
2. The stored application has the required client type and exact redirect configuration.
3. Citizen iD has assigned the required endpoint, grant, response-type, scope, and requirement permissions.
4. A bounded staging smoke test succeeds.

Use exact synthetic values based on the current portal fields.
Use placeholders such as `REPLACE_WITH_GENERATED_CLIENT_ID` and `STORE_IN_SECRET_MANAGER` instead of client-secret-shaped examples.
State that a confidential secret is displayed only when created or reset and must be stored before closing the dialog.

Separate settings into two tables:

- Developer-configurable fields such as name, application type, client type, redirect URIs, and post-logout redirect URIs.
- System-generated or staff-controlled fields such as client identifier, consent type, permissions, and Proof Key for Code Exchange or Pushed Authorization Request requirements that appear disabled or read-only to an ordinary Integrator.

Every Asteria scenario identifies the minimum endpoint, grant, response-type, and scope permissions required for its intended flow.
The guide tells the reader to verify that staff-assigned permissions match that minimum and to report broader or missing defaults rather than implying that an ordinary Integrator can change them.
Do not recommend unrelated permissions merely because the portal displays them.

Do not tell readers to enable Pushed Authorization Requests until discovery exposes a usable endpoint.
Do not describe a read-only portal setting as a developer-controlled switch.
Require both a `pushed_authorization_request_endpoint` and applicable client permission before presenting Pushed Authorization Requests as usable.
Keep the existence of a portal requirement field distinct from an operational protocol endpoint.

Separate application security duties from portal enforcement.
Every public authorization-code client must send `code_challenge_method=S256` and later present the matching `code_verifier`, even when the staff-controlled requirement flag is not enabled.
Recommend S256 Proof Key for Code Exchange for confidential authorization-code clients as well.
Never publish an example using the `plain` challenge method.

Require these redirect rules:

- Match registered redirect URIs exactly.
- Use HTTPS for web callbacks.
- Keep staging and production registrations separate.
- Prohibit wildcards, fragments, user-information components, and application-controlled open redirectors.
- Explain native claimed-HTTPS, loopback, and private-use schemes separately before recommending any of them.
- Treat a stored post-logout redirect as configuration only when discovery also advertises a usable end-session endpoint.

Use an entity-relationship diagram to show community ownership, application record, client identity, redirect records, secret existence, and permissions.
Do not put the secret value in the diagram.
Place a current portal screenshot after the Asteria Dispatch working example when the local authenticated screenshot workflow can populate only synthetic values.
If that safe local state is unavailable, use a rendered screenshot-specification callout that states the required fields, crop, annotations, caption, and alt-text intent without capturing a real account or realistic credential.

Every `Verify It` section distinguishes stored settings from granted and tested capabilities.
Require a post-save table covering environment, owning community, application name, Application Type, Client Type, exact redirect and post-logout records, secret existence without its value, granted endpoints, grants, response types, scopes, Proof Key for Code Exchange policy, delegation permissions, and the next bounded protocol test.

Every failure branch records the trigger, exact visible result where known, whether a record was saved, the safe retry point, the member-visible effect, and privacy-safe evidence.
Minimum branches are invalid fields, unsafe or duplicate redirects, missing community context, lost one-time secret, staff-permission mismatch, capability-pending public client, and wrong-environment credentials.

The secret-reset pack warns before the action that the current implementation replaces the one stored secret immediately and provides no documented overlap period.
Verify that behavior before publication.
Tell operators to update the secret manager and deployments, verify token acquisition, and remove the previous value without promising zero downtime.
The compromise branch also audits usage, revokes affected grants or tokens where appropriate, and contacts support privately.
Never place secrets in source, browser code, screenshots, logs, issues, tickets, chat, or command history.

## Terms Reference

Use this heading structure:

```markdown
# Terms

## Protocol Terms

## Application Terms

## Security Terms

## Citizen iD Terms
```

Render entries with `AbbreviationGlossary` from the central dictionary rather than maintaining a second handwritten expansion list.
Each entry includes the abbreviation, full term, and one concise Citizen iD-specific explanation.
Require ordinary definitions for application record, OAuth client, client identifier, client secret, redirect URI, issuer, discovery document, grant, flow, scope, permission, member context, staff-controlled setting, community ownership, protected resource, and token custodian.
Explicitly distinguish a community tool, its registered application record, its OAuth client identity, and its protected resource.
Terms without abbreviations remain canonical Markdown definitions on this page and are linked from the Start pages when first introduced.

## Navigation

Rename the developer sidebar's first group to `Start`.
Use these compact labels:

- `Developer Guide`.
- `Get Access`.
- `Choose Client`.
- `Register App`.

Keep the existing OAuth and API group during 3A so every visible link resolves.
Add a temporary `Reference` group containing `Terms` instead of placing it under OAuth and API.
Later slices replace the temporary group with the approved Build, Operate, and Reference categories.

## Component Styling

Add shared styles to `docs/.vitepress/theme/styles.css` rather than page-local styles.
Scenario context should read as a technical briefing rather than a marketing card.
Use a two-column desktop layout for compact metadata and member or applicant state where space permits.
Use one column when the content area is narrow.
Maintain light and dark theme contrast.

Abbreviations use a dotted underline and inherit surrounding typography.
Native title behavior is supplementary because the full term is already visible on first use and on the Terms page.
Do not add pseudo-element tooltips that can obscure text or overflow the content area.

## Error Handling

Unknown fixture or focus keys fail clearly during development instead of silently rendering unrelated data.
Missing optional fixture sections are omitted without empty labels.
If Mermaid fails, the semantic scenario context remains complete and the existing Mermaid component displays its render error.
If JavaScript is unavailable, server-rendered context remains readable and the TreeView is treated as an enhancement.

## Comprehensibility Review

Run role-play reviews after the first complete draft.
The developer newcomer review must determine the exact portal Application Type and Client Type for all four Asteria applications, carry the choice worksheet into registration, identify the next action, and predict each stored result without consulting legacy pages.
The identity specialist review must verify that client secrecy, redirect handling, S256 Proof Key for Code Exchange, capability checks, staff-controlled settings, applicant eligibility, public-client availability, and secret reset are not overstated.
The documentation review must verify that synthetic data, abbreviations, scenario boundaries, and support evidence are consistent across all four pages.
Resolve Critical and Important findings before completion.

The available collaboration interface does not expose subagent model selection.
Use the requested consumer-role review assignments with the strongest available review agents and record that limitation rather than claiming a Terra or Luna model was selected.

## Verification

Run the documentation lint and production build.
Confirm every Mermaid diagram renders as an SVG.
Confirm TreeView beta renders in desktop light and dark themes.
Confirm the TreeView stays centered or internally scrollable without page-level horizontal overflow.
Confirm compact scenario context is readable at desktop and narrow widths.
Confirm semantic `<abbr>` markup and full `title` expansions exist in rendered output.
Confirm repeated abbreviations do not add non-actionable keyboard stops.
Confirm the Terms page and component use one dictionary.
Confirm all Start navigation links resolve and the removed request-access route is no longer referenced.
Confirm every Markdown sentence occupies its own source line.
Confirm `.invalid` domains and obvious placeholders are used throughout.
Scan Markdown, fixture modules, generated HTML, screenshots, and other public assets for realistic bearer tokens, JSON Web Tokens, authorization codes, client secrets, cookies, private identifiers, and copied legacy personal data.
Use isolated staging fixture accounts and applications for any runtime capture.
Confirm screenshots exclude address-bar callback parameters, authorization codes, cookies, tokens, secrets, personal email addresses, and private identifiers.
Do not publish actual signed JSON Web Tokens even when expired.
Confirm no page promises Pushed Authorization Request support without discovery evidence.
Confirm browser and native examples contain no client secret.
Confirm every public-client example uses S256 Proof Key for Code Exchange end to end.
Confirm discovery advertises secretless token-endpoint authentication and a secretless public-client code exchange succeeds in a bounded staging test before the guide labels that path usable.
Repeat both checks in production before labeling the production path usable.
If the test cannot run or fails, retain the visible `Capability pending` state.
Confirm redirect examples obey the exact-match and safe-scheme rules.
Confirm discovery issuers are compared exactly, including their trailing slash.
Confirm the discovery document advertises S256 before documenting it as available.
Confirm Pushed Authorization Requests remain unavailable unless both environment metadata and client permission support them.
Confirm service examples never imply member identity or impersonation.
Confirm no production OAuth debugger or third-party token decoder is recommended.
Confirm secret-reset behavior and permission claims against the pinned source and current environment evidence.
Record a dated staging and production capability snapshot for review, but do not make the documentation build depend on live network access.

## Evidence Sources

Documentation implementation patterns come from:

- `docs/.vitepress/theme/components/MermaidDiagram.vue` for client-side Mermaid rendering and failure display.
- `docs/.vitepress/config.mts` for Mermaid fence transformation, navigation, and installed theme behavior.
- `docs/.vitepress/mermaidConfig.ts` and `docs/.vitepress/theme/styles.css` for shared diagram and theme styling.
- `package.json` and `pnpm-lock.yaml` for Mermaid 11.16.0.

Citizen iD behavior is pinned to sibling source commit `330f1477ad58f0afee38be62652acc94707a2a38`.
Key files include:

- `src/CitizenId.Host.Web/Components/Dialogs/IntegratorApplicationDialog.razor` for submission fields and applicant interaction.
- `src/CitizenId.Host.Web/Services/IntegratorApplicationService.cs` for eligibility, pending-request, approval, and rejection behavior.
- `src/CitizenId.Host.Web/Services/IntegratorApplicationDiscordMembershipService.cs` for official Discord membership checks.
- `src/CitizenId.Domain/Validation/IntegratorApplicationSubmissionValidator.cs` for validation and Developer Terms acceptance.
- `src/CitizenId.Infrastructure/Options/IntegratorApplicationOptions.cs` and environment configuration for automatic approval behavior.
- `src/CitizenId.Host.Web/Components/Dialogs/ApplicationDialog.razor` for application type, client type, redirect URI, post-logout URI, and permission controls.
- `src/CitizenId.Host.Web/Components/Dialogs/ApplicationSecretDialog.razor` for one-time secret presentation and reset behavior.
- `src/CitizenId.Host.Web/Components/Shared/ApplicationsDataGrid.razor` for stored application verification.
- `src/CitizenId.Domain/Models/OpenIdApplicationPermissionGroup.cs` for grouped endpoint, grant, response-type, and scope permissions.

Live OpenID Connect discovery is the source of truth for environment capabilities.
At design time, staging uses issuer `https://citizenid.dev/` and production uses issuer `https://citizenid.space/`.
Current discovery advertises authorization code, refresh token, client credentials, and token exchange grants, but no Pushed Authorization Request endpoint.
