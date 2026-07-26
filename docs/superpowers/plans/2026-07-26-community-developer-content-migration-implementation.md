# Community Developer Content Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transfer and expand the complete developer-owned Integrator Guide narrative into the Start, Build, Operate, and Reference journeys while preserving every credential-shaped proof and keeping the legacy source available for comparison until closure.

**Architecture:** Capture the legacy tree into immutable hashed baseline data before editing canonical pages, store complete proof bodies as validated repository fixtures, and drive every Community Developer page from a typed route contract.
Task pages follow the Asteria journey, reference pages stay lookup-first, and generated OpenAPI schemas supplement rather than replace end-to-end guidance.

**Tech Stack:** VitePress Markdown extensions, Vue scenario components, TypeScript and Node test runner, ASP.NET Core sample projects, TypeScript compiler, Playwright, checked-in OpenAPI snapshot.

## Global Constraints

- Complete the platform prerequisites in `2026-07-26-documentation-platform-openapi-readability-implementation.md` before visually accepting this plan.
- Do not edit or delete `docs/integrator-guide/**` until the immutable baseline is captured and the closure plan authorizes removal.
- Preserve the exact body and SHA-256 of all 23 current fenced examples.
- Preserve actual credential-shaped samples as complete proof evidence.
- Replace a proof only after positive sensitivity evidence, explicit user approval, and a recorded exception.
- Never infer capability, permission, lifetime, rotation, or production behavior from prose alone.
- Separate advertised server capability, stored client configuration, assigned permission, runtime proof, and member state.
- Write every Markdown sentence on its own source line.
- Use `::: code-group` only for equivalent implementations of the same step.
- Keep sequential protocol evidence visible in document order.

## July 20 Baseline

The typed Asteria fixture, abbreviation dictionary, `ScenarioContext`, four Start pages, Terms page, developer sidebar foundation, and initial visual coverage from July 20 Tasks 5 and 6 already exist.
Extend those files instead of recreating them.

The July 20 OpenAPI Tasks 3 and 4 remain unimplemented and are now owned by the platform plan.
The old placeholder-token instruction is superseded by the proof-preservation contract below.

## Shared Data Contracts

Create `scripts/community-developers/contracts.ts` with this public shape:

```ts
export type DeveloperPageKind = 'start' | 'task' | 'reference'

export type DeveloperLayout
  = 'mermaid'
    | 'scenario-context'
    | 'scenario-worksheet'
    | 'code-group'
    | 'sequential-proof'
    | 'token-proof'
    | 'refresh-proof'
    | 'glossary'
    | 'openapi'

export interface DeveloperPageContract {
  source: `docs/community-developers/${string}.md`
  route: `/community-developers/${string}` | '/community-developers/'
  title: string
  kind: DeveloperPageKind
  requiredSections: readonly string[]
  proofIds: readonly string[]
  requiredLinks: readonly string[]
  nextRoute?: string
  layouts: readonly DeveloperLayout[]
}
```

Keep immutable discovery separate from reviewable decisions:

```ts
export interface SourceFileRecord {
  id: string
  path: string
  sha256: string
}

export interface SourceHeadingRecord {
  id: string
  sourcePath: string
  sourceFileSha256: string
  level: number
  text: string
  anchor: string
  ordinal: number
}

export interface SourceProofRecord {
  id: string
  sourcePath: string
  sourceFileSha256: string
  ordinal: number
  language: string
  utf8ByteStart: number
  utf8ByteEnd: number
  rawSha256: string
}

export interface SourceAssetRecord {
  id: string
  kind: 'screenshot' | 'remote-brand'
  sourcePath: string
  sourceFileSha256: string
  sourceAnchor: string
  ordinal: number
  rawReference: string
  target: string
}

export interface LegacyBaseline {
  schemaVersion: 1
  snapshotCommit: string
  capturedAt: string
  expectedCounts: {
    files: 18
    headings: 110
    proofs: 23
    screenshots: 11
    remoteAssets: 16
  }
  sourceFiles: SourceFileRecord[]
  headings: SourceHeadingRecord[]
  proofs: SourceProofRecord[]
  screenshots: SourceAssetRecord[]
  remoteAssets: SourceAssetRecord[]
}

export type MigrationDisposition
  = 'migrated'
    | 'expanded'
    | 'corrected'
    | 'canonical-handoff'
    | 'navigation-only'

export type MigrationOwner
  = 'community-developers'
    | 'community-admins'
    | 'players'
    | 'reference'

export interface DestinationRef {
  path: string
  heading: string
  anchor: string
  treatment: 'substantive' | 'canonical-handoff'
  purpose?: string
  expectedOutcome?: string
}

export interface HeadingDisposition {
  sourceKey: string
  subsystem: 'developer' | 'cross-audience'
  owner: MigrationOwner
  destinations: DestinationRef[]
  disposition: MigrationDisposition
  rationale?: string
  evidence: string[]
  proofIds: string[]
  screenshotIds: string[]
  assetIds: string[]
  review: 'pending' | 'approved' | 'changes-requested'
  reviewer?: string
  reviewedAt?: string
  verification: 'pending' | 'verified' | 'failed'
}

export type ProofEquivalence
  = 'byte-identical'
    | 'line-preserving-superset'
    | 'corrected-executable'
    | 'approved-synthetic-replacement'

export interface ProofDispositionBase {
  id: string
  sourceSha256: string
  fixturePath: string
  primaryDestination: DestinationRef
  reuseDestinations: DestinationRef[]
  fixtureOwner: 'asteria'
  generationSource: string
  environment: 'staging' | 'production' | 'historical' | 'synthetic'
  sensitivityReview: 'pending' | 'verified'
  equivalence: ProofEquivalence
  destinationSha256?: string
  reviewer?: string
  status: 'pending' | 'verified'
}

export interface RetainedProofDisposition extends ProofDispositionBase {
  provenanceDecision: 'historical-non-operational' | 'synthetic' | 'unresolved'
  equivalence: 'byte-identical'
  replacementException?: never
}

export interface ReplacementException {
  positiveEvidence: string[]
  sensitivityFinding: string
  explicitUserApproval: {
    approvedBy: string
    approvedAt: string
    decisionReference: string
  }
  incidentResponse: {
    status: 'rotated' | 'revoked' | 'not-required'
    evidence: string[]
  }
  replacementRationale: string
  replacementSha256: string
  structuralEquivalence: {
    preservedFields: string[]
    preservedRelationships: string[]
    reviewer: string
    status: 'approved'
  }
}

export interface ReplacedProofDisposition extends ProofDispositionBase {
  provenanceDecision: 'sensitive-approved-replacement'
  equivalence: 'approved-synthetic-replacement'
  replacementException: ReplacementException
}

export type ProofDisposition
  = RetainedProofDisposition
    | ReplacedProofDisposition

export interface DerivedProofVariant {
  id: string
  derivedFrom: string
  fixturePath: string
  sha256: string
  purpose: string
  equivalence: 'line-preserving-superset' | 'corrected-executable'
  destinations: DestinationRef[]
  compilation: 'not-applicable' | 'required'
  reviewer?: string
  status: 'pending' | 'verified'
}
```

Store the records in:

- `migration/integrator-guide/baseline.json`
- `migration/integrator-guide/manifest.json`
- `migration/integrator-guide/proofs.json`

Store exactly 23 source dispositions and a separately counted `derivedVariants` collection in `proofs.json`.

Do not store a mutable `closed` flag.
Derive closure from destination, evidence, review, proof, screenshot, asset, and verification state.

## Task 1: Capture The Immutable Legacy Baseline

**Files:**

- Create: `migration/integrator-guide/baseline.json`
- Create: `migration/integrator-guide/manifest.json`
- Create: `migration/integrator-guide/proofs.json`
- Create: `scripts/migration/capture-integrator-guide.mjs`
- Create: `scripts/migration/manifest.ts`
- Create: `scripts/migration/manifest.test.ts`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Write the failing baseline tests**

Test exact counts, stable IDs, source file hashes, heading levels and ordinals, exact fence-body hashes, UTF-8 byte offsets, screenshot references, and unique remote asset URLs.
Capture the same clean snapshot twice and assert byte-identical JSON output, including key order and the final newline.
The first failure must state that the baseline artifacts are absent, not silently generate them during the test.

- [ ] **Step 2: Prove the baseline is not captured**

Run:

```powershell
rtk pnpm exec tsx --test scripts/migration/manifest.test.ts
```

Expected: failure because the three migration records do not exist.

- [ ] **Step 3: Implement deterministic capture**

The capture script must read only `docs/integrator-guide/**/*.md`, normalize path separators for stable IDs, and use Node `crypto` for SHA-256.
Install exact `markdown-it@14.3.0` and `github-slugger@2.0.0` as direct development dependencies so capture does not rely on VitePress internals.
Require `--snapshot-commit`, fail when any legacy source byte differs from that commit, and store the full commit hash as `snapshotCommit`.
Derive `capturedAt` from that commit's ISO-8601 commit timestamp rather than the wall clock.
Sort every record by normalized source path and source ordinal, serialize keys in a fixed order, and emit UTF-8 with LF and one final newline.
It must produce exactly:

- 18 source files;
- 110 heading rows;
- 23 fenced proof records;
- 11 screenshot references;
- 16 unique remote brand asset records.

Reject duplicate IDs and do not assign destinations automatically.

- [ ] **Step 4: Add explicit package commands**

```json
{
  "scripts": {
    "migration:capture": "node scripts/migration/capture-integrator-guide.mjs",
    "migration:verify": "tsx scripts/migration/manifest.ts"
  }
}
```

Give the verifier explicit lifecycle modes:

- `baseline` and scoped content phases require the live legacy tree and compare its file and proof hashes to `baseline.json`;
- `migration` requires the live tree and valid hashes, destinations, and evidence shapes, but permits explicitly pending review records so intermediate quality commits remain testable;
- `pre-removal --require-complete` requires the live tree, all 110 closed heading rows, all proof and asset reviews, and every canonical destination;
- `final --require-complete` requires the legacy tree to be absent and validates the retained immutable baseline, canonical destinations, proof fixtures, built output, and no-legacy assertions without trying to reopen deleted source files.

Use one documented CLI grammar everywhere:

```text
migration:verify -- --phase <baseline|migration|proofs|content|pre-removal|final>
  [--scope <developer|cross-audience|all>]
  [--owner <community-developers|community-admins|players|reference>]
  [--routes <comma-separated-route-ids>]
  [--asset-kind <screenshots|brand-assets>]
  [--require-complete]
```

Reject unknown phases, filters, route IDs, owners, or asset kinds with a usage error.
`proofs` validates the complete source and derived proof graph.
`content` applies optional scope, owner, route, and asset filters while still enforcing shared record integrity.

- [ ] **Step 5: Capture, inspect, and verify the baseline**

Run:

```powershell
rtk pnpm migration:capture -- --snapshot-commit HEAD
rtk pnpm migration:verify -- --phase baseline
rtk pnpm exec tsx --test scripts/migration/manifest.test.ts
rtk git diff --check
```

Run the capture command a second time before inspection and require an empty diff for all three generated records.
Manually compare a sample from every legacy subdirectory and all 23 proof hashes before accepting the generated data.

- [ ] **Step 6: Commit the immutable baseline**

```powershell
rtk git add migration scripts/migration package.json pnpm-lock.yaml
rtk git commit -m "test(docs): capture integrator guide migration baseline"
```

## Task 2: Preserve And Validate The Complete Proof Corpus

**Files:**

- Create: `examples/community-developers/proofs/flows/authorization-request.http`
- Create: `examples/community-developers/proofs/flows/authorization-code-exchange.http`
- Create: `examples/community-developers/proofs/flows/authorization-code-token-response.json`
- Create: `examples/community-developers/proofs/flows/refresh-request.http`
- Create: `examples/community-developers/proofs/flows/refresh-response.json`
- Create: `examples/community-developers/proofs/flows/client-credentials-request.http`
- Create: `examples/community-developers/proofs/flows/client-credentials-response.json`
- Create: `examples/community-developers/proofs/flows/token-exchange-request.http`
- Create: `examples/community-developers/proofs/flows/token-exchange-response.json`
- Create: `examples/community-developers/proofs/flows/token-exchange-unauthorized-client.json`
- Create: `examples/community-developers/proofs/flows/refresh-token-revocation.http`
- Create: `examples/community-developers/proofs/flows/access-token-revocation.http`
- Create: `examples/community-developers/proofs/tokens/access-token.raw.txt`
- Create: `examples/community-developers/proofs/tokens/access-token.decoded.json`
- Create: `examples/community-developers/proofs/tokens/id-token.raw.txt`
- Create: `examples/community-developers/proofs/tokens/id-token.decoded.json`
- Create: `examples/community-developers/proofs/tokens/refresh-token.raw.txt`
- Create: `examples/community-developers/proofs/utility/api-base-url.txt`
- Create: `examples/community-developers/proofs/utility/bearer-header.http`
- Create: `examples/community-developers/proofs/frameworks/aspnet-api.legacy.cs`
- Create: `examples/community-developers/proofs/frameworks/aspnet-oidc.legacy.cs`
- Create: `examples/community-developers/proofs/frameworks/passport-sign-in.legacy.ts`
- Create: `examples/community-developers/proofs/expanded/authorization-request-with-pkce.http`
- Create: `examples/community-developers/proofs/expanded/authorization-callback.http`
- Create: `examples/community-developers/proofs/expanded/authorization-code-exchange-with-verifier.http`
- Create: `examples/community-developers/dotnet/Asteria.Api/Asteria.Api.csproj`
- Create: `examples/community-developers/dotnet/Asteria.Api/Program.cs`
- Create: `examples/community-developers/dotnet/Asteria.Dispatch/Asteria.Dispatch.csproj`
- Create: `examples/community-developers/dotnet/Asteria.Dispatch/Program.cs`
- Create: `examples/community-developers/dotnet/Asteria.Examples.slnx`
- Create: `examples/community-developers/typescript/passport-sign-in.ts`
- Create: `examples/community-developers/typescript/package.json`
- Create: `examples/community-developers/typescript/pnpm-lock.yaml`
- Create: `examples/community-developers/typescript/tsconfig.json`
- Create: `examples/community-admins/proofs/discord-role-update.txt`
- Create: `scripts/migration/proof-equivalence.test.ts`
- Create: `scripts/migration/compile-proofs.mjs`
- Create: `scripts/migration/proofs.ts`
- Create: `scripts/migration/content-hygiene.ts`
- Create: `scripts/migration/content-hygiene.test.ts`
- Modify: `migration/integrator-guide/proofs.json`
- Modify: `package.json`
- Modify: `pnpm-lock.yaml`

- [ ] **Step 1: Write failing proof-integrity tests**

The tests must assert:

- exactly 23 unique legacy proof IDs are represented;
- every original fence body is retrievable byte-for-byte by SHA-256;
- exactly 23 immutable source fixtures are distinct from any corrected or expanded executable variant;
- raw credentials remain one logical line;
- the access-token and ID-token payload segments decode to the adjacent JSON fixtures;
- issuer, audience, expiry, token purpose, token type, and scope relationships are internally consistent;
- browser and native examples contain no distributable client secret;
- an unresolved provenance decision fails instead of triggering automatic placeholder replacement;
- any approved expanded proof preserves every valid source line in source order;
- every expanded or corrected fixture declares `derivedFrom`, and every derived edge resolves to one of the 23 immutable source proof IDs;
- a replacement fails without positive evidence, explicit user approval, incident-response disposition, rationale, replacement hash, and approved structural-equivalence review.

Every rendered proof import must have one stable marker immediately before it:

```markdown
<!-- cid-proof: oauth.authorization-request -->
<<< ../../examples/community-developers/proofs/flows/authorization-request.http
```

Hash the exact UTF-8 and LF fixture bytes, including the final newline.
The validator must require exactly one primary destination marker for every proof and may allow separately recorded reuse destinations.

- [ ] **Step 2: Copy exact source proof bodies before expanding examples**

Use the captured source offsets to populate the 23 fixture records.
Do not retype credential-shaped values.
Record whether each fixture is historical non-operational, synthetic, or unresolved.

If positive evidence identifies an active or sensitive value, stop and request explicit approval before replacing it.

- [ ] **Step 3: Add separate security-complete executable variants**

Where an old proof omits `state`, `nonce`, or S256 challenge and verifier, retain the byte-identical source fixture and create a separately identified line-preserving or corrected executable fixture.
Do not overwrite the source proof merely to improve it.
Use the three explicit files under `proofs/expanded/` for the S256 request, callback, and verifier-bearing exchange.
Keep the three exact legacy framework blocks under `proofs/frameworks/`, and map the compilable .NET and TypeScript projects to those source IDs as corrected executable variants.

- [ ] **Step 4: Make framework fixtures buildable**

Pin `CitizenId.Domain.Shared` to `1.10.2` where the .NET fixtures use it.
Pin the TypeScript fixture to `@citizenid/passport-citizenid@1.0.0`, `passport@0.7.0`, `@types/passport@1.0.17`, `@types/node@26.1.1`, and `typescript@7.0.2`, which were verified from their registries on 2026-07-26.
Give the TypeScript fixture its own `package.json` and frozen `pnpm-lock.yaml` so imports never resolve accidentally through repository-root transitive dependencies.
Ensure the library named in prose, install commands, and imports is identical.
Examples must not depend on undeclared variables such as `services` or `environment`.
Make `compile-proofs.mjs` run the .NET solution build, the nested frozen pnpm install, and nested `tsc --noEmit` with explicit working directories, inherited output, no shell interpolation, and a bounded timeout per command.

Add these package commands:

```json
{
  "scripts": {
    "proofs:compile": "node scripts/migration/compile-proofs.mjs",
    "proofs:verify": "tsx scripts/migration/proofs.ts",
    "content:hygiene:source": "tsx scripts/migration/content-hygiene.ts --source-only",
    "content:hygiene:generated": "tsx scripts/migration/content-hygiene.ts --generated-only docs/.vitepress/dist",
    "content:hygiene": "pnpm content:hygiene:source && pnpm content:hygiene:generated"
  }
}
```

Make the hygiene scanner manifest-aware.
It must permit credential-shaped content only when the exact file, proof marker, and SHA-256 are registered in `proofs.json`.
The source mode must reject unregistered credential-like values in public Markdown, Vue and script source, JSON, and image metadata without printing the candidate value in its error output.
The generated mode must fail when the built output is missing and scan current HTML, page-data, search, and copied asset metadata.
Treat obvious configuration placeholders separately from complete proof transcripts.
Test allowed registered JWT, Bearer, cookie, authorization-code, and refresh-token fixtures together with rejected unregistered variants and stale hashes.

- [ ] **Step 5: Verify proof integrity and compilation**

Run:

```powershell
rtk pnpm exec tsx --test scripts/migration/proof-equivalence.test.ts
rtk pnpm exec tsx --test scripts/migration/content-hygiene.test.ts
rtk pnpm content:hygiene:source
rtk pnpm proofs:compile
rtk pnpm build
rtk pnpm content:hygiene:generated
rtk pnpm migration:verify -- --phase proofs
```

- [ ] **Step 6: Commit the proof corpus**

```powershell
rtk git add examples migration/integrator-guide/proofs.json scripts/migration/proof-equivalence.test.ts scripts/migration/compile-proofs.mjs scripts/migration/proofs.ts scripts/migration/content-hygiene.ts scripts/migration/content-hygiene.test.ts package.json pnpm-lock.yaml
rtk git commit -m "test(docs): preserve integrator proof fixtures"
```

## Task 3: Extend The Asteria Scenario And Page Contracts

**Files:**

- Modify: `docs/.vitepress/theme/data/scenarioFixtures.ts`
- Modify: `docs/.vitepress/theme/data/scenarioFixtures.test.ts`
- Create: `scripts/community-developers/contracts.ts`
- Create: `scripts/community-developers/contracts.test.ts`
- Create: `scripts/community-developers/content-smoke.mjs`
- Modify: `scripts/audit-routes.mjs`
- Modify: `scripts/audit-routes.test.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add failing focus and route tests**

Add these focus keys:

```ts
type NewScenarioFocusKey
  = 'sign-in-members'
    | 'request-member-data'
    | 'protect-an-api'
    | 'call-apis'
    | 'delegate-access'
    | 'manage-sessions'
    | 'revoke-access'
    | 'go-to-production'
    | 'troubleshoot'
```

Add `ScenarioEnvironmentKey = 'staging' | 'production'` and environment selection to the returned scenario selection.
Default existing focuses to staging and select both environments only for `go-to-production`.

Test all 13 focus keys, every referenced person and application, `.invalid` example domains, and every route contract's required section order.

- [ ] **Step 2: Implement the typed contracts**

Add all 20 canonical Community Developer routes to the page contract.
Add the same routes to the shared audit inventory, using `public` for existing source files and `planned` for pages not created yet.
Use only layout strings from the shared `AuditLayout` vocabulary and reject a route whose content contract and audit record disagree.
Make `test:developer-content` validate source headings, imported proof IDs, required internal links, `Next Step`, and prohibited legacy links.
Require every reference contract to place a compact `Asteria Example` immediately after its introduction and before lookup tables or long artifacts.
That example must state when the reader uses the reference and link to the owning task guide.

Add this package command:

```json
{
  "scripts": {
    "test:developer-content": "node scripts/community-developers/content-smoke.mjs"
  }
}
```

- [ ] **Step 3: Verify the scenario and content foundation**

Run:

```powershell
rtk pnpm exec tsx --test docs/.vitepress/theme/data/scenarioFixtures.test.ts scripts/community-developers/contracts.test.ts
rtk pnpm test:developer-content -- --routes start
```

- [ ] **Step 4: Commit the expanded data model**

```powershell
rtk git add docs/.vitepress/theme/data scripts/community-developers scripts/audit-routes.mjs scripts/audit-routes.test.mjs package.json
rtk git commit -m "feat(docs): extend developer scenario fixtures"
```

## Task 4: Expand The Existing Start Journey

**Files:**

- Modify: `docs/community-developers/index.md`
- Modify: `docs/community-developers/access.md`
- Modify: `docs/community-developers/client-types.md`
- Modify: `docs/community-developers/applications.md`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Mark the required Start coverage pending**

Add each legacy Start-owned heading to the manifest before editing canonical prose.
The failing content test must name its missing destination heading or required outcome.
Mark the four existing Start routes as changed and update their final layout and readiness records in the shared audit inventory.

- [ ] **Step 2: Extend Developer Guide and Get Access**

Map the complete Start, Build, Operate, Reference, Admin Duties, Player effects, and brand journeys.
Retain automatic approval, manual review, rejection, pending request, and already-Integrator outcomes.
Add account creation, verification, Discord membership, terms, support contact, and environment boundaries.

- [ ] **Step 3: Extend Choose Client and Register App**

Retain all four Asteria client and registration scenarios plus secret reset.
Use the platform worksheet for full application records.
Separate developer-controlled settings, generated values, and staff-controlled permissions.
Keep public-client, reset-overlap, redirect, and production claims capability-gated until proven.

- [ ] **Step 4: Verify Start content and manifest coverage**

Run:

```powershell
rtk pnpm test:developer-content -- --routes start
rtk pnpm migration:verify -- --phase content --scope developer --routes index,access,client-types,applications
rtk pnpm build
```

- [ ] **Step 5: Commit the Start expansion**

```powershell
rtk git add docs/community-developers migration/integrator-guide/manifest.json scripts/community-developers/contracts.ts scripts/audit-routes.mjs
rtk git commit -m "docs: extend developer start journey"
```

## Task 5: Add Sign In Members

**Files:**

- Create: `docs/community-developers/sign-in-members.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `migration/integrator-guide/proofs.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add the failing page contract**

Require this task order when applicable: When complete, Scenario Context, Before You Start, Configuration, Protocol Flow, Working Example, Expected Result, Verify It, Failure Branches, Next Step.

- [ ] **Step 2: Write the Asteria sign-in journey**

Cover Dispatch, the Console backend-for-frontend variation, and Mobile as capability-pending until secretless S256 redemption is proven.
Import the authorization request, callback, exchange, response, raw and decoded token, ASP.NET Core, and Passport fixtures.
Show immutable source proofs with their provenance labels and use the separately identified S256 and corrected framework variants for the runnable path.
Group only the two equivalent framework implementations.
Wrap the complete authorization-request-through-token proof sequence in `<ProofSurface label="Asteria member sign-in proof">` so its code group and imported fixtures receive exactly one shared outset.
Promote the Sign In Members audit record from `planned` to `public` and assign code-group, sequential-proof, and token-proof layouts.

Cover exact redirects, `state`, `nonce`, S256, ID-token validation, server session creation, logout, denied consent, mismatch, reuse, expiry, wrong environment, client authentication, permissions, and secret exposure.

- [ ] **Step 3: Verify the task and proof sequence**

Run:

```powershell
rtk pnpm test:developer-content -- --route /community-developers/sign-in-members
rtk pnpm proofs:verify -- --page sign-in-members
rtk pnpm build
```

- [ ] **Step 4: Commit the page**

```powershell
rtk git add docs/community-developers/sign-in-members.md scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: add member sign-in guide"
```

## Task 6: Add Request Member Data

**Files:**

- Create: `docs/community-developers/request-member-data.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing coverage for every legacy scope and claim row**

Require a disposition and destination anchor for standard, Citizen iD, Roberts Space Industries, consent, claim-placement, role-scope, and unavailable group-scope material.

- [ ] **Step 2: Write Alex, Blake, and Casey outcomes**

Demonstrate available, optional-missing, and required-missing member data.
Explain minimization, consent, optional and required variants, absence handling, policy, and retention.
Resolve `roles` scope versus `role` claim naming from current source evidence before marking the row verified.
Promote the Request Member Data audit record from `planned` to `public` with its final layout and readiness selector.

- [ ] **Step 3: Verify and commit**

```powershell
rtk pnpm test:developer-content -- --route /community-developers/request-member-data
rtk pnpm migration:verify -- --phase content --scope developer --routes request-member-data
rtk pnpm build
rtk git add docs/community-developers/request-member-data.md scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide/manifest.json
rtk git commit -m "docs: add member data guide"
```

## Task 7: Add Protect An API And Call APIs

**Files:**

- Create: `docs/community-developers/protect-an-api.md`
- Create: `docs/community-developers/call-apis.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `migration/integrator-guide/proofs.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing contracts for both API tasks**

Require `Protect An API` to own Bearer validation and raw-plus-decoded access-token proof.
Require `Call APIs` to own client credentials, base URLs, Bearer calls, member versus application context, and `401` versus `403`.

- [ ] **Step 2: Write API protection**

Cover discovery, signature, exact issuer, intended audience, lifetime, token purpose, scope, and authorization policy.
Cover ID-token misuse, bad signature, wrong issuer or audience, expiry, missing scope or header, and revocation latency.
Wrap the raw-and-decoded access-token sequence in `<ProofSurface label="Asteria access-token proof">`.

- [ ] **Step 3: Write API calls**

Separate token acquisition from the resource call.
Use only an operation whose checked-in OpenAPI metadata confirms the appropriate member or application authentication context.
Link to API Reference for schemas without duplicating generated operation documentation.
Promote both audit records from `planned` to `public` and assign token-proof or sequential-proof layouts only where those surfaces render.

- [ ] **Step 4: Verify and commit**

```powershell
rtk pnpm test:developer-content -- --routes protect-an-api,call-apis
rtk pnpm proofs:verify -- --pages protect-an-api,call-apis
rtk pnpm openapi:verify
rtk pnpm build
rtk git add docs/community-developers scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: add API protection and call guides"
```

## Task 8: Add Delegate Access

**Files:**

- Create: `docs/community-developers/delegate-access.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `migration/integrator-guide/proofs.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add the failing delegation contract**

Require the exchange request, success, `unauthorized_client`, actor, lookup, ownership, and revocation proof IDs.

- [ ] **Step 2: Write the attenuated Asteria flow**

Explain subject, actor, audience, resource, scope attenuation, permission, and why delegation is not impersonation.
Cover invalid scope, audience or actor, missing subject token, escalation, wrong recipient, and delegated revocation.
Promote the Delegate Access audit record from `planned` to `public` with its sequential-proof layout.

- [ ] **Step 3: Verify and commit**

```powershell
rtk pnpm test:developer-content -- --route /community-developers/delegate-access
rtk pnpm proofs:verify -- --page delegate-access
rtk pnpm build
rtk git add docs/community-developers/delegate-access.md scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: add delegated access guide"
```

## Task 9: Add Manage Sessions And Revoke Access

**Files:**

- Create: `docs/community-developers/manage-sessions.md`
- Create: `docs/community-developers/revoke-access.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `migration/integrator-guide/proofs.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing session and revocation contracts**

Require refresh request and response, rotation, custody, bounded retry, concurrency, clock handling, expiry, logout, compromise detection, member-session versus service-identity boundaries, standard revocation, member authorization removal, delegated lookup and revocation, propagation, and reauthorization outcomes.

- [ ] **Step 2: Write operational guidance**

Treat lifetimes, rotation, and grace periods as versioned claims requiring current evidence.
Explain bounded retry and backoff, clock handling, compromise detection, member-session versus service-identity boundaries, invalid-token success semantics, client ownership, self-contained access-token latency, cascade boundaries, and compromise containment.
Require Revoke Access to cover both token revocation and member authorization removal, including the visible reauthorization outcome.
Wrap the complete refresh sequence and the complete revocation sequence in separately labelled `ProofSurface` components.
Promote both audit records from `planned` to `public` and assign refresh-proof and sequential-proof layouts to their actual owners.

- [ ] **Step 3: Verify and commit**

```powershell
rtk pnpm test:developer-content -- --routes manage-sessions,revoke-access
rtk pnpm proofs:verify -- --pages manage-sessions,revoke-access
rtk pnpm build
rtk git add docs/community-developers scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: add session and revocation guides"
```

## Task 10: Add Go To Production And Troubleshoot

**Files:**

- Create: `docs/community-developers/go-to-production.md`
- Create: `docs/community-developers/troubleshoot.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `scripts/audit-routes.mjs`

- [ ] **Step 1: Add failing production and diagnostic contracts**

Require separate staging and production records, the five diagnostic evidence layers, and explicit prohibitions on production OAuth debuggers, third-party token decoders, copied live tokens, and unbounded retries.

- [ ] **Step 2: Write bounded operational guidance**

Require re-registration, new secrets and redirects, assigned permissions, discovery, consent, sign-in, tokens, API, refresh, revocation, support, and brand checks.
Organize troubleshooting by authorization, callback, token, validation, API, refresh, delegation, and revocation boundary.
Require privacy-safe evidence with environment, client ID, UTC timestamp, correlation ID, expected result, and visible error.
Prohibit production OAuth debuggers, third-party token decoders, copied live tokens, and unbounded retries, and make each prohibition an executable content-contract assertion.
Promote both audit records from `planned` to `public` with their final layout and readiness selectors.

- [ ] **Step 3: Verify and commit**

```powershell
rtk pnpm test:developer-content -- --routes go-to-production,troubleshoot
rtk pnpm migration:verify -- --phase content --scope developer --routes go-to-production,troubleshoot
rtk pnpm build
rtk git add docs/community-developers scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide/manifest.json
rtk git commit -m "docs: add production and troubleshooting guides"
```

## Task 11: Complete Developer Reference Pages

Complete Platform Task 4 before starting this task so the API Reference narrative wraps an existing, tested browser rather than racing edits to the same page.

**Files:**

- Modify: `docs/community-developers/oauth-and-oidc.md`
- Modify: `docs/community-developers/scopes-and-claims.md`
- Modify: `docs/community-developers/tokens-and-revocation.md`
- Modify: `docs/community-developers/terms.md`
- Modify: `docs/community-developers/api-reference.md`
- Create: `docs/community-developers/roles.md`
- Create: `docs/community-developers/sdks-and-libraries.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `migration/integrator-guide/manifest.json`
- Modify: `migration/integrator-guide/proofs.json`
- Modify: `scripts/audit-routes.mjs`
- Verify: `openapi/operation-metadata.json`

- [ ] **Step 1: Add failing lookup contracts**

Require every legacy reference heading, row, example, and warning to have a canonical destination or an evidence-backed correction.
Reject `Legacy Details` and `/integrator-guide` links in owned pages.

- [ ] **Step 2: Expand OAuth, scopes, tokens, and terms**

Restore verified endpoint, grant, response type, authentication, capability, scope, claim, token, rotation, and revocation facts.
Keep task procedures in task pages and link to imported proof fixtures rather than copying them manually.
Add actor, subject token, delegated token, relying party, authorization server, resource server, and token purpose to Terms.
Require reciprocal links from the first meaningful use of each term and test that the linked glossary anchor exists.

- [ ] **Step 3: Add Roles and SDKs And Libraries**

Classify roles as stable public contract, contextual account data, internal, or unavailable.
Verify package names, imports, maintenance status, and tested versions.
State what each library performs and what validation, storage, authorization, and protection remains with the application.

- [ ] **Step 4: Complete API Reference around the lazy browser**

Expose snapshot provenance, environment, schema, authentication context, scopes, and implementation status.
Require every rendered method-and-path operation key to resolve to a reviewed operation-metadata record with environment, authentication context, minimum scopes, implementation status, and evidence.
Keep first-party encrypted HTTP-only cookie material visibly separate from third-party developer authentication guidance.

Every reference page in this task must retain its compact opening Asteria example, even when the page also embeds a large proof or generated browser.
Promote the new Roles and SDK routes from `planned` to `public`, and finalize changed-state, layout, and readiness records for every reference route.

- [ ] **Step 5: Verify and commit in two reviewable units**

```powershell
rtk pnpm test:developer-content -- --routes oauth-and-oidc,scopes-and-claims,terms
rtk pnpm build
rtk git add docs/community-developers/oauth-and-oidc.md docs/community-developers/scopes-and-claims.md docs/community-developers/terms.md scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: expand OAuth and data reference"

rtk pnpm test:developer-content -- --routes tokens-and-revocation,roles,sdks-and-libraries,api-reference
rtk pnpm proofs:verify
rtk pnpm openapi:verify
rtk pnpm build
rtk git add docs/community-developers scripts/community-developers/contracts.ts scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: complete token role SDK and API reference"
```

## Task 12: Finalize Developer Navigation And Handoff Contracts

**Files:**

- Modify: `docs/.vitepress/config.mts`
- Modify: `docs/community-developers/AGENTS.md`
- Modify: `scripts/community-developers/contracts.ts`
- Modify: `scripts/audit-routes.mjs`
- Modify: `migration/integrator-guide/manifest.json`

- [ ] **Step 1: Add Start, Build, Operate, and Reference sidebar groups**

List all 20 canonical routes.
Add Brand Guidelines as a reference link without duplicating its page.
Keep the `/integrator-guide/` sidebar mapping temporarily; the closure plan removes it only after all manifest rows pass.
Assert that every planned Developer route has been promoted to `public` and its final audit layouts match its content contract.

- [ ] **Step 2: Reserve purposeful handoff contracts**

Record the required Admin Duties, Player Discord, and Brand Guidelines handoffs in the developer page contracts and migration manifest without marking their cross-audience destination review complete.
Cross-Audience Task 7 owns the actual edits to Developer Guide, Sign In Members, Go To Production, and Troubleshoot after those destinations are complete.
Each contract must require why the reader is leaving and what outcome the destination supplies.

- [ ] **Step 3: Update contributor contracts**

Require journey-order task pages, lookup-first references, imported proof fixtures, reviewed provenance, five-layer verification, and explicit cross-audience outcomes.

- [ ] **Step 4: Verify the developer-owned migration phase**

Run:

```powershell
rtk pnpm lint
rtk pnpm test:developer-content -- --all
rtk pnpm proofs:verify
rtk pnpm migration:verify -- --phase content --scope developer --require-complete
rtk pnpm openapi:verify
rtk pnpm build
rtk pnpm content:surface
rtk pnpm visual:audit
rtk git diff --check
```

Expected: all developer-owned rows and 22 developer-visible proof destinations pass, while the shared role-update command remains explicitly dependent on cross-audience closure.

- [ ] **Step 5: Commit the canonical developer journey**

```powershell
rtk git add docs/.vitepress/config.mts docs/community-developers/AGENTS.md scripts/community-developers scripts/audit-routes.mjs migration/integrator-guide
rtk git commit -m "docs: finalize developer journey navigation"
```

## Plan Completion Gate

- [ ] Confirm all 20 canonical Community Developer routes build and appear in the intended group.
- [ ] Confirm every task page follows the applicable narrative contract and every reference page remains lookup-first.
- [ ] Confirm all 23 legacy proof bodies still match the immutable baseline.
- [ ] Confirm actual credential-shaped proof samples remain present, complete, copyable, and labelled with provenance.
- [ ] Confirm no developer page links to `/integrator-guide`.
- [ ] Confirm no legacy Markdown file has been edited or deleted.
- [ ] Hand off open Community Admin, Player, brand, and removal rows to the companion plans.
