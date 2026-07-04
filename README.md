# Citizen iD Docs

Public documentation for Citizen iD players, community admins, and community developers.

The site is built with VitePress and published through GitHub Pages.

## Audience Tracks

- Players use Citizen iD to sign in, verify RSI identity, claim Discord roles, and manage account privacy.
- Community admins configure Discord bot features, role assignments, nickname automation, branding, maintenance, and support workflows.
- Community developers request the Integrator product role and build community tools with OAuth 2.0, OpenID Connect, and Citizen iD APIs.

## Development

### Install

```shell
pnpm i
```

### Develop

```shell
pnpm dev
```

### Build

```shell
pnpm build
```

### Preview

```shell
pnpm serve
```

### App Screenshots

Use the app screenshot workflow against a locally running Citizen iD app base URL.
This does not start, stop, deploy, or modify the Citizen iD Aspire project.

```shell
pnpm screenshots:app -- --list-targets
pnpm screenshots:app
```

Generated screenshots are written to `docs/public/images/app-screenshots/` by default.
The default local app base URL is `http://localhost:5085`.
The default stylized browser address origin is `https://citizenid.space`.
Ordinary page captures set `citizenid.privacy.analytics-consent.v1=rejected` in local storage to keep the privacy banner out of the way.
Use `--base-url`, `--display-origin`, `--target`, `--viewport`, `--output-dir`, and `--full-page` to narrow or reshape a run.
Use `--debug` when selector waits or page steps need more detail.

```shell
pnpm screenshots:app -- --base-url http://localhost:5085 --target analytics-banner --viewport desktop
pnpm screenshots:app -- --display-origin https://staging.citizenid.space
pnpm screenshots:app:smoke
```
