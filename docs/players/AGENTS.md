# Player Documentation Guide

This guide applies to player-facing pages under `docs/players/`.
Use it together with the parent `docs/AGENTS.md`.

## Reader Model

Assume the reader wants to complete a task, recover from confusion, or understand what data is shared.
Explain what happens in plain language before naming implementation concepts.
Keep protocol, token, and database details out of the main path unless the player needs them to make a safe choice.

## Player Diagrams

Use diagrams to answer practical questions such as where sign-in happens, who receives data, why a role changes, or what revocation does.
Use `Citizen iD` for Citizen iD inside diagrams unless the full name makes the diagram meaningfully harder to read.
Prefer branch labels that read like player choices or observable events.
Explain branches immediately below the diagram in prose.

When a player diagram has both immediate and later effects, show the later effect as a dotted branch.
When a player can deny, revoke, retry, or get blocked, show that as an explicit branch instead of hiding it in prose.
Use `blocked` for no-access and do-not-share outcomes.
Use `success` for completed player states such as verified status.
Use `caution` for retained copies, later support work, or third-party boundaries.

## Player Index

The player guide index may use clickable Mermaid nodes because it is a navigation map.
Every clickable node should also have an ordinary Markdown link nearby so keyboard, screen-reader, and non-script paths stay clear.
The index diagram is a good place for a compact legend if the page includes several semantic node types.
