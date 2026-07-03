# Citizen iD App Screenshot Capture Design

## Context

CID-25 should prepare automated screenshot capture for Citizen iD app pages so those screenshots can be embedded in the Citizen iD documentation site.

The screenshot automation belongs in the `CitizenId-docs` repository because the outputs are documentation assets.

The target application is a locally running Citizen iD app from the sibling `CitizenId` Aspire project.

The first implementation should use a provided `--base-url` and should not start, stop, or mutate any Aspire resources.

Future work can add an optional `--citizenid-path` wrapper that starts the local Aspire AppHost and discovers resource endpoints.

The current project already has VitePress docs, PNPM scripts, and Playwright visual audit scripts.

This new capture infrastructure should use TypeScript, Puppeteer, and `microlinkhq/browserless` rather than extending the existing Playwright audit directly.

Browserless documentation confirms support for screenshot options including element capture, injected styles, overlay backgrounds, click steps, selector waits, viewport settings, and animation disabling.

Puppeteer documentation confirms the baseline browser, page navigation, viewport, and screenshot APIs used underneath Browserless.

## Goals

Provide a working TypeScript screenshot capture script that can be run against a local Citizen iD base URL.

Write PNG files under `docs/public/images/app-screenshots`.

Support full viewport screenshots.

Support full page screenshots where a target explicitly opts in.

Support selected HTML node screenshots through CSS selectors.

Support pre-capture page styling for deterministic screenshots.

Support image post-processing for documentation polish such as padding, background, rounded corners, and drop shadow.

Keep capture targets described directly in TypeScript code instead of adding an intermediate JSON or YAML target format.

Start with public and anonymous pages.

Include public privacy surfaces such as the analytics banner, Privacy Preferences dialog, Cookie Notice, Privacy Policy, and provider/legal context.

## Non-Goals

The first implementation will not automate sign-in.

The first implementation will not capture authenticated account, admin, developer, or community workflows.

The first implementation will not start Aspire automatically.

The first implementation will not deploy, publish, or touch any existing deployment.

The first implementation will not embed the generated screenshots into documentation pages automatically.

## Architecture

The script should live in `scripts/capture-app-screenshots.ts`.

Reusable capture helpers can live under `scripts/app-screenshots/` when they make the main script easier to read.

The PNPM script should be named `screenshots:app`.

The implementation should add `browserless`, `puppeteer`, `tsx`, and `sharp` as development dependencies unless an equivalent dependency already exists.

The CLI should require `--base-url`.

The CLI should accept `--output-dir`, `--target`, `--viewport`, `--list-targets`, and `--full-page` overrides.

The default output directory should be `docs/public/images/app-screenshots`.

Each target should produce deterministic filenames derived from target id, viewport id, and capture scope.

The runner should create one isolated browser context per target run so local storage and cookies do not leak between captures.

The runner should fail fast when the base URL is unreachable.

The runner should print a concise result table with target ids, output paths, dimensions, and failures.

## Capture Targets

Targets should be ordinary TypeScript objects.

There should be no intermediate config file for v1.

The target object should describe the page path, viewport ids, capture scope, selector, steps, styles, post-processing frame, and output name.

The initial target set should include `/`, `/sign-in`, and `/sign-up`.

The initial target set should include `/legal/cookies`, `/legal/privacy-policy`, and `/legal/providers`.

The initial target set should include an analytics banner element capture.

The analytics banner target should clear the privacy preference local storage key before navigation so the banner is visible.

The initial target set should include a Privacy Preferences dialog element capture.

The Privacy Preferences dialog target should open the dialog from the analytics banner or footer before capture.

Targets should be easy to add or remove by editing the TypeScript target list.

Public audience landing pages can be added as ordinary TypeScript target entries after the first infrastructure smoke captures work.

## Capture Modes

`viewport` mode should capture the current viewport after navigation, waits, steps, and style injection.

`fullPage` mode should capture the full page after navigation, waits, steps, and style injection.

`element` mode should wait for a configured selector and capture only the matching element.

`element` mode should fail with a clear error if the selector never appears.

`element` mode should optionally scroll the element into view before capture.

## Browserless Use

Browserless should own browser-side capture behavior where its options fit.

Browserless `styles` should inject deterministic page CSS.

Browserless `animations: false` should be used by default to reduce motion and transition variance.

Browserless `element` should be used when a target can be captured directly from one selector.

Browserless `overlay` should be available when a target wants a backdrop or browser-style presentation.

Browserless `click` and selector wait support should be used for simple page setup steps when it keeps the target definition readable.

Custom Puppeteer page steps should still be available for flows that need local storage, conditional checks, or multi-step interaction.

## Post-Processing

Image post-processing should apply documentation asset polish after the raw screenshot buffer is produced.

Post-processing should support padding.

Post-processing should support solid or transparent backgrounds.

Post-processing should support rounded-corner masks.

Post-processing should support drop shadows.

Post-processing should support output format metadata and dimensions in the result table.

Post-processing should be local and deterministic.

This keeps polish independent from the live app layout and avoids using injected CSS to fake documentation framing.

Post-processing should use `sharp`.

Sharp documentation supports PNG buffer output, generated background images, and returned output metadata such as width and height.

## Styling Defaults

The default pre-capture CSS should hide transient or external widgets when they would make screenshots unstable.

The default pre-capture CSS should freeze caret, selection, animation, and transition noise where possible.

Targets should be able to add extra per-target CSS.

Privacy targets should not hide the banner or dialog being captured.

Post-processing defaults should be restrained enough for documentation pages.

Per-target frame settings should override global frame defaults.

## Verification

The implementation should add a smoke path that can list targets without launching a browser.

The implementation should validate required target fields before running captures.

The implementation should run at least one lightweight capture against a known local or fixture HTML page in tests or smoke verification.

Manual verification should run the capture script against a locally running Citizen iD app with a provided base URL.

Repository verification should run `pnpm lint`.

Repository verification should run `pnpm build` if generated screenshots are embedded or documentation content changes.

Generated screenshots should not be committed unless the specific documentation change needs them.

## Future Extensions

Add `--citizenid-path` to start the local Aspire AppHost when the user wants the script to manage local orchestration.

The Aspire extension should use `aspire start --non-interactive` and `aspire wait` before endpoint discovery.

The Aspire extension should never target staging or production deployments.

Add authenticated capture states after a separate design covers test accounts, local seed data, and privacy boundaries.

Add docs embedding helpers after the first screenshot assets are validated.

Add CI-friendly fixtures after local capture behavior is stable.

## Risks

The local Citizen iD app may need secrets or local configuration before anonymous pages render reliably.

The analytics banner depends on stored browser state, so capture targets must isolate storage between runs.

Legal pages can be long, so full page captures may become large.

Element screenshots can look visually cramped without post-processing.

Browserless defaults can block requests through adblock behavior, so targets should allow overriding request behavior when the local app requires it.
