# Documentation Authoring Guide

This guide applies to everything under `docs/`.
Follow it when creating or editing documentation pages, diagrams, navigation, and reusable documentation structures.

## Writing Style

Write Markdown with one sentence per line.
Use prose first, then lists, tables, details blocks, and diagrams where they reduce confusion.
Keep page titles and section titles short, usually two or three words.
Prefer actionable headings that tell the reader what question the section answers.

Use `Citizen iD` in prose.
Use `Citizen iD` inside diagrams unless the label is genuinely cramped.
Use `CiD` only when a diagram cannot stay readable with the full name.
Do not use `CitizenID` in diagrams or prose.

## Audience Fit

Write for three first-class audiences: players, community admins, and community developers.
Player pages should explain the user-facing consequence first and keep implementation detail behind prose or details blocks.
Community admin pages should emphasize setup decisions, operational effects, permissions, and support boundaries.
Community developer pages should be precise about protocols, scopes, claims, tokens, endpoints, and data ownership.

## Diagram Rules

Use Mermaid for process maps, data-boundary explanations, and multi-branch decision flows.
Do not add local `classDef`, `style`, or `linkStyle` declarations to ordinary page diagrams.
Shared diagram styling lives in `docs/.vitepress/theme/styles.css` and Mermaid layout defaults live in `docs/.vitepress/config.mts`.

Assign node semantics with Mermaid `class` statements.
Use only the shared semantic classes unless a new meaning is needed across several pages.
The current shared classes are `actor`, `service`, `context`, `action`, `data`, `success`, `decision`, `caution`, and `blocked`.

Use `actor` for people, communities, admins, app operators, and external organizations.
Use `service` for Citizen iD-owned identity, verification, consent, and support flows.
Use `context` for surfaces and locations such as the website, Discord server, RSI profile field, browser, or dashboard.
Use slanted context nodes for external or public surfaces where a value is placed or read.
Use rectangular or rounded context nodes for broader surfaces such as websites, dashboards, browsers, and servers.
Use `action` for ordinary steps, commands, settings, and configured features.
Use `data` for records, approved facts, exports, claims, and transmitted values.
Use `success` for completed states such as verified, linked, approved, or finished outcomes.
Use `decision` for consent, control, approval, ownership, or branching questions.
Use `caution` for delayed, retained, optional, boundary, or support-review states.
Use `blocked` for rejection, no-access, unsafe, denied, or do-not-share states.

Use shape as a second signal, not as decoration.
Prefer rounded actor nodes, double-bordered service nodes, diamonds for decisions, slanted nodes for data moving out of a system, circles for success and blocked states, cylinders for stored records, and asymmetric nodes for caution or follow-up work.
Keep diagrams vertically readable where possible.
Let complex diagrams branch naturally instead of forcing unrealistic linear flows.
Use subgraphs only when a visible bounded context, actor lane, or grouped check improves understanding.
Do not use subgraphs as invisible alignment hacks when edges need to cross the group boundary.
Mermaid may route those edges through the subgraph boundary even when the source references an inner node ID.
When a subgraph contains the actual action nodes, keep the important edges inside the subgraph or accept that external edges may visually attach to the wrapper.

## Edge Rules

Use `==>` for the primary user journey or happy path.
Use `-->` for normal causal or sequential relationships.
Use dotted edges such as `-. "Later" .->` for optional, delayed, retained, boundary, retry, or out-of-band paths.
Use `~~~` only as an invisible layout aid, most commonly inside a legend.
Keep edge labels short enough to remain readable on mobile.

## Diagram Legends

The site injects the shared `<DiagramLegend />` component after each Markdown Mermaid fence.
Do not paste a separate legend into page content.
Update `docs/.vitepress/theme/components/DiagramLegend.vue` when the shared node or edge vocabulary changes.

## Diagram Links

Clickable Mermaid nodes are allowed when they improve navigation.
Prefer them on audience index pages and overview maps.
Use links only for nodes that represent a documentation page, a cross-audience handoff, or a clearly related deeper manual page.
Use internal root-relative links such as `/players/rsi-verification`.
Use `_self` for documentation links.
Place `click` statements after node class statements so the diagram stays easy to scan.
Do not use JavaScript callbacks, `javascript:` URLs, or external clickable diagram links without a deliberate security review.

## Visual Checks

After changing diagrams or theme CSS, run lint and build.
Also run the visual audit when the change can affect layout, dark mode, mobile rendering, or scroll behavior.
Confirm that diagrams render as SVG, have no page-level horizontal overflow, and remain readable in light and dark themes.

## App Screenshots

Generate app screenshots from a local Citizen iD base URL with `pnpm screenshots:app`.
Use `--base-url <url>` only when the local app is not running at `http://localhost:5085`.
Use `--display-origin <origin>` when stylized desktop browser frames should show a non-default origin.
Ordinary page captures seed `citizenid.privacy.analytics-consent.v1=rejected`; banner targets clear local storage in their capture steps.
Generated app screenshots belong under `docs/public/images/app-screenshots/` unless a task gives a narrower output path.
Use `pnpm screenshots:app -- --list-targets` to inspect the code-defined capture targets before changing them.
Run `pnpm screenshots:app:smoke` after changing the capture workflow.
