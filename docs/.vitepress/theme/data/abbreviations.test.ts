import assert from 'node:assert/strict'
// This repository uses tsx to run the focused Node test runner without Vitest.
// eslint-disable-next-line test/no-import-node-test
import test from 'node:test'
import { getAbbreviation } from './abbreviations.ts'

test('looks up the canonical OpenID Connect abbreviation entry', () => {
  assert.deepEqual(getAbbreviation('OIDC'), {
    term: 'OIDC',
    expansion: 'OpenID Connect',
    category: 'Protocol',
    description: 'Citizen iD uses OpenID Connect for member sign-in and identity claims.',
  })
})

test('rejects unknown abbreviation keys with a development error', () => {
  assert.throws(
    () => getAbbreviation('UNKNOWN'),
    /Unknown abbreviation "UNKNOWN"\. Available abbreviations: API, BFF, CORS, CSRF, HTTP, JWKS, JWT, M2M, OIDC, PAR, PKCE, RFC, RSI, SDK, SPA, URI, URL, UTC, XSS\./,
  )
})
