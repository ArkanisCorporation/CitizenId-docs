# Community Admin Documentation Guide

This guide applies to community-admin pages under `docs/community-admins/`.
Use it together with the parent `docs/AGENTS.md`.

## Reader Model

Assume the reader is configuring a community, operating a Discord server, or explaining an access decision to players.
Lead with the operational effect, then explain configuration choices, permissions, and support boundaries.
Call out where the community controls rules and where Citizen iD only applies configured rules.

## Admin Diagrams

Use diagrams for setup flows, role-assignment paths, nickname-management paths, bot permission boundaries, and support-escalation decisions.
Use `actor` for community admins, players, moderators, and support operators.
Use `service` for Citizen iD-owned automation and verification checks.
Use `context` for Discord servers, dashboards, community tools, and external systems.
Use `decision` for configuration gates, permission checks, and policy choices.
Use `caution` for sync delays, manual review, Discord hierarchy limits, and maintenance windows.

Admin diagrams should make ownership explicit.
If a rule is configured by the community, show the community admin or community configuration as a separate node.
If Discord permissions can block an action, show that branch as a decision or caution instead of implying Citizen iD can always apply the change.
