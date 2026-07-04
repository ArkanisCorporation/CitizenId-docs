import type { Context } from 'browserless'
import type { BrowserContext, Cookie, CookieData, HTTPResponse, Page } from 'puppeteer'
import type { AuthScope, CaptureTarget, CaptureViewport } from './types.js'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { createInterface } from 'node:readline/promises'
import { setTimeout as delay } from 'node:timers/promises'
import puppeteer from 'puppeteer'

export interface AuthState {
  version: 1
  scope: AuthScope
  savedAt: string
  cookies: Cookie[]
  localStorage: Record<string, string>
}

interface EnsureAuthStateOptions {
  scope: AuthScope
  target: CaptureTarget
  viewport: CaptureViewport
  baseUrl: URL
  authStateDir: string
  debugLog: (message: string) => void
}

export async function ensureAuthState(options: EnsureAuthStateOptions): Promise<AuthState> {
  let state = await readAuthState(options.authStateDir, options.scope)
  const statePath = authStatePath(options.authStateDir, options.scope)
  const targetUrl = new URL(options.target.path, options.baseUrl)

  if (!state) {
    console.error(`[screenshots:auth] no ${options.scope} auth state at ${statePath}`)
    state = await saveManualAuthState(options, state)
  }
  else if (await isStoredStateStale(state, targetUrl, options.target, options.viewport, options.debugLog)) {
    console.error(`[screenshots:auth] ${options.scope} auth state is stale`)
    state = await saveManualAuthState(options, state)
  }

  return state
}

export async function applyAuthState(context: Context, state: AuthState) {
  const browserContext = await context.context()

  await applyCookies(browserContext, state.cookies)
}

export function authLocalStorage(state?: AuthState) {
  return state?.localStorage ?? {}
}

export function authStatePath(authStateDir: string, scope: AuthScope) {
  return path.join(authStateDir, `${scope}.json`)
}

async function readAuthState(authStateDir: string, scope: AuthScope) {
  try {
    return JSON.parse(await fs.readFile(authStatePath(authStateDir, scope), 'utf8')) as AuthState
  }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return undefined
    }

    throw error
  }
}

async function saveManualAuthState(options: EnsureAuthStateOptions, state: AuthState | undefined) {
  if (!process.stdin.isTTY) {
    throw new Error(`Missing or stale '${options.scope}' auth state, and stdin is not interactive.`)
  }

  const targetUrl = new URL(options.target.path, options.baseUrl)
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: options.viewport.width,
      height: options.viewport.height,
      deviceScaleFactor: options.viewport.deviceScaleFactor ?? 1,
      isMobile: options.viewport.isMobile ?? false,
    },
  })

  try {
    const context = browser.defaultBrowserContext()
    const page = await browser.newPage()

    if (state) {
      await restorePageState(context, page, targetUrl, state)
    }

    console.error(`[screenshots:auth] sign in as '${options.scope}' at ${targetUrl.href}`)
    console.error('[screenshots:auth] press Enter here after sign-in, or navigate back to the target page')

    await page.goto(targetUrl.href, { waitUntil: options.target.waitUntil ?? 'networkidle2' })

    const enter = waitForEnter()

    await Promise.race([
      enter.promise,
      waitForReadyPage(page, targetUrl, options.target),
    ]).finally(() => enter.close())

    const response = await page.goto(targetUrl.href, { waitUntil: options.target.waitUntil ?? 'networkidle2' })

    if (await isPageStale(page, response, targetUrl, options.target)) {
      throw new Error(`Manual sign-in did not produce a usable '${options.scope}' session.`)
    }

    const savedState: AuthState = {
      version: 1,
      scope: options.scope,
      savedAt: new Date().toISOString(),
      cookies: await context.cookies(),
      localStorage: await readLocalStorage(page),
    }

    await fs.mkdir(options.authStateDir, { recursive: true })
    await fs.writeFile(authStatePath(options.authStateDir, options.scope), JSON.stringify(savedState, null, 2))
    console.error(`[screenshots:auth] saved ${authStatePath(options.authStateDir, options.scope)}`)

    return savedState
  }
  finally {
    await browser.close()
  }
}

async function isStoredStateStale(
  state: AuthState,
  targetUrl: URL,
  target: CaptureTarget,
  viewport: CaptureViewport,
  debugLog: (message: string) => void,
) {
  const browser = await puppeteer.launch({
    headless: 'shell',
    defaultViewport: {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
      isMobile: viewport.isMobile ?? false,
    },
  })

  try {
    const context = browser.defaultBrowserContext()
    const page = await browser.newPage()

    await restorePageState(context, page, targetUrl, state)
    debugLog(`auth check ${targetUrl.href}`)

    const response = await page.goto(targetUrl.href, { waitUntil: target.waitUntil ?? 'networkidle2' })

    return await isPageStale(page, response, targetUrl, target)
  }
  finally {
    await browser.close()
  }
}

async function restorePageState(context: BrowserContext, page: Page, targetUrl: URL, state: AuthState) {
  await applyCookies(context, state.cookies)
  await page.evaluateOnNewDocument((entries) => {
    for (const [key, value] of Object.entries(entries)) {
      window.localStorage.setItem(key, value)
    }
  }, state.localStorage)
  await page.goto(targetUrl.origin, { waitUntil: 'domcontentloaded' }).catch(() => undefined)
}

async function applyCookies(context: BrowserContext, cookies: CookieData[]) {
  if (cookies.length > 0) {
    await context.setCookie(...cookies)
  }
}

async function isPageStale(page: Page, response: HTTPResponse | null, targetUrl: URL, target: CaptureTarget) {
  const status = response?.status() ?? 0

  if (status === 401 || status === 403) {
    return true
  }

  if (isAuthRedirect(new URL(page.url()), targetUrl)) {
    return true
  }

  if (target.authenticatedSelector) {
    return !await page.$(target.authenticatedSelector)
  }

  return false
}

function isAuthRedirect(currentUrl: URL, targetUrl: URL) {
  if (currentUrl.origin !== targetUrl.origin) {
    return true
  }

  return /sign-?in|login|forbidden|unauthorized|access-denied/i.test(currentUrl.pathname)
}

async function waitForReadyPage(page: Page, targetUrl: URL, target: CaptureTarget) {
  const deadline = Date.now() + 10 * 60 * 1000

  while (Date.now() < deadline) {
    if (!await isPageStale(page, null, targetUrl, target)) {
      return
    }

    await delay(1000)
  }
}

function waitForEnter() {
  const readline = createInterface({ input: process.stdin, output: process.stdout })

  return {
    promise: readline.question(''),
    close: () => readline.close(),
  }
}

function readLocalStorage(page: Page) {
  return page.evaluate(() => ({ ...window.localStorage }))
}
