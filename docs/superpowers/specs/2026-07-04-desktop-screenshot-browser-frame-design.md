# Desktop Screenshot Browser Frame Design

## Goal

Desktop viewport screenshots should look like a real browser window on a dark stage, matching the provided reference image.
The frame should include rounded browser chrome, traffic-light controls, a tab, an address bar, and a drop shadow.

## Scope

Apply this frame only to desktop viewport targets.
Leave mobile viewport, full-page legal, and selected-element screenshots unchanged.
This avoids fake tall browser windows around legal pages and avoids nesting modals inside another browser frame.

## Implementation

Reuse the existing Sharp post-processing path.
Extend the existing frame metadata with an optional browser chrome mode and viewport-specific frame overrides.
Resolve the displayed URL from the provided local base URL and the target path during capture.

## Verification

Run the smoke capture to prove the framing path still writes valid PNG files.
Run one local desktop viewport capture against the Citizen iD app and inspect the generated PNG.
Run lint before committing.
