import assert from 'node:assert/strict'
// This repository uses tsx to run the focused Node test runner without Vitest.
// eslint-disable-next-line test/no-import-node-test
import test from 'node:test'
import { getScenarioFocus } from './scenarioFixtures.ts'

test('selects the Asteria access focus without leaking unrelated applications', () => {
  const focus = getScenarioFocus('asteria', 'access')

  assert.equal(focus.goal, 'Prepare Jordan to request Integrator access for Asteria Dispatch.')
  assert.deepEqual(focus.applicationKeys, ['dispatch'])
  assert.deepEqual(focus.personKeys, ['jordan'])
})

test('rejects unknown scenario fixture and focus keys with development errors', () => {
  assert.throws(
    () => getScenarioFocus('unknown', 'access'),
    /Unknown scenario fixture "unknown"\. Available fixtures: asteria\./,
  )
  assert.throws(
    () => getScenarioFocus('asteria', 'unknown'),
    /Unknown scenario focus "unknown" for fixture "asteria"\. Available focuses: overview, access, client-types, applications\./,
  )
})
