import type { CaptureFrame, CaptureTarget, CaptureViewport } from './types.js'

export const viewports: CaptureViewport[] = [
  { id: 'desktop', width: 1440, height: 1000, deviceScaleFactor: 1 },
  { id: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
]

export const defaultFrame: CaptureFrame = {
  padding: 32,
  background: '#101114',
  borderRadius: 16,
  shadow: {
    blur: 42,
    offsetY: 18,
    color: 'rgba(0,0,0,0.35)',
  },
}

function desktopBrowserFrame(title: string): CaptureFrame {
  return {
    padding: 44,
    background: '#050505',
    borderRadius: 14,
    shadow: {
      blur: 34,
      offsetY: 18,
      color: 'rgba(0,0,0,0.42)',
    },
    browserChrome: { title },
  }
}

export const deterministicStyles = [
  `*, *::before, *::after {
    caret-color: transparent !important;
    transition-duration: 0s !important;
    animation-duration: 0s !important;
    animation-delay: 0s !important;
  }`,
  `.crisp-client, #quackback-widget, .posthog-capture-status {
    display: none !important;
  }`,
]

export const targets: CaptureTarget[] = [
  {
    id: 'home',
    path: '/',
    scope: 'viewport',
    frames: { desktop: desktopBrowserFrame('Citizen iD') },
    styles: deterministicStyles,
  },
  {
    id: 'sign-in',
    path: '/sign-in',
    scope: 'viewport',
    frames: { desktop: desktopBrowserFrame('Citizen iD - Sign in') },
    styles: deterministicStyles,
  },
  {
    id: 'sign-up',
    path: '/sign-up',
    scope: 'viewport',
    frames: { desktop: desktopBrowserFrame('Citizen iD - Sign up') },
    styles: deterministicStyles,
  },
  {
    id: 'legal-cookies',
    path: '/legal/cookies',
    scope: 'fullPage',
    styles: deterministicStyles,
  },
  {
    id: 'legal-privacy-policy',
    path: '/legal/privacy-policy',
    scope: 'fullPage',
    styles: deterministicStyles,
  },
  {
    id: 'legal-providers',
    path: '/legal/providers',
    scope: 'fullPage',
    styles: deterministicStyles,
  },
  {
    id: 'analytics-banner',
    path: '/',
    scope: 'element',
    selector: '.privacy-preferences-banner__surface',
    steps: [
      { type: 'clearLocalStorage' },
      { type: 'waitForSelector', selector: '.privacy-preferences-banner__surface', visible: true },
    ],
    styles: deterministicStyles,
    frame: defaultFrame,
  },
  {
    id: 'privacy-preferences-dialog',
    path: '/',
    scope: 'element',
    selector: '.mud-dialog',
    steps: [
      { type: 'clearLocalStorage' },
      { type: 'waitForSelector', selector: '.privacy-preferences-banner__surface', visible: true },
      { type: 'click', selector: '.privacy-preferences-banner__actions button:nth-of-type(3)' },
      { type: 'waitForSelector', selector: '.mud-dialog', visible: true },
    ],
    styles: deterministicStyles,
    frame: defaultFrame,
  },
]
