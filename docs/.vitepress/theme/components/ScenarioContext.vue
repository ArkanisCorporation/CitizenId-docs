<script setup lang="ts">
import { computed } from 'vue'
import { createScenarioTreeGraph, getScenarioFixture, getScenarioFocus } from '../data/scenarioFixtures'
import DiagramLegend from './DiagramLegend.vue'
import MermaidDiagram from './MermaidDiagram.vue'

const props = withDefaults(defineProps<{
  fixture: string
  focus: string
  view?: 'compact' | 'tree'
}>(), {
  view: 'compact',
})

const scenario = computed(() => getScenarioFixture(props.fixture))
const selectedFocus = computed(() => getScenarioFocus(props.fixture, props.focus))
const applications = computed(() => selectedFocus.value.applicationKeys.map(key => scenario.value.applications[key]))
const people = computed(() => selectedFocus.value.personKeys.map(key => scenario.value.people[key]))
const responsibilities = computed(() => selectedFocus.value.responsibilityKeys.map(key => ({
  role: key,
  boundary: scenario.value.responsibilities[key],
})))
const treeGraph = computed(() => encodeURIComponent(createScenarioTreeGraph(scenario.value)))
</script>

<template>
  <section
    class="cid-scenario-context"
    :class="{ 'cid-scenario-context--tree': view === 'tree' }"
    :aria-labelledby="`cid-scenario-context-${fixture}-${focus}`"
  >
    <p
      :id="`cid-scenario-context-${fixture}-${focus}`"
      class="cid-scenario-context__label"
    >
      Synthetic scenario
    </p>
    <p class="cid-scenario-context__goal">
      {{ selectedFocus.goal }}
    </p>

    <dl class="cid-scenario-context__metadata">
      <dt>Community</dt>
      <dd>
        {{ scenario.community.name }} ({{ scenario.community.identifier }}) — {{ scenario.community.purpose }}
      </dd>
      <dt>Environment</dt>
      <dd>{{ scenario.environment.name }} — issuer {{ scenario.environment.issuer }}; portal {{ scenario.environment.portalOrigin }}</dd>
      <dt>Protected resource</dt>
      <dd>{{ scenario.api.name }} — {{ scenario.api.purpose }}</dd>
    </dl>

    <div class="cid-scenario-context__grid">
      <div>
        <p class="cid-scenario-context__subheading">
          Application worksheet
        </p>
        <div class="cid-scenario-context__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Application</th>
                <th>Runtime</th>
                <th>Member present</th>
                <th>Token custodian</th>
                <th>Client</th>
                <th>Redirect records</th>
                <th>Secret result</th>
                <th>Grant</th>
                <th>Minimum permissions</th>
                <th>Expected result</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="application in applications"
                :key="application.name"
              >
                <th scope="row">
                  {{ application.name }}
                </th>
                <td>{{ application.runtime }}</td>
                <td>{{ application.memberPresent ? 'Yes' : 'No' }}</td>
                <td>{{ application.tokenCustodian }}</td>
                <td>{{ application.applicationType }} / {{ application.clientType }}</td>
                <td>
                  <ul class="cid-scenario-context__cell-list">
                    <li
                      v-for="redirect in application.redirects"
                      :key="redirect"
                    >
                      {{ redirect }}
                    </li>
                    <li
                      v-for="postLogoutRedirect in application.postLogoutRedirects"
                      :key="postLogoutRedirect"
                    >
                      Post-logout: {{ postLogoutRedirect }}
                    </li>
                    <li v-if="!application.redirects.length && !application.postLogoutRedirects.length">
                      No redirect or post-logout redirect
                    </li>
                  </ul>
                </td>
                <td>{{ application.secretResult }}</td>
                <td>{{ application.intendedGrant }}</td>
                <td>
                  <ul class="cid-scenario-context__cell-list">
                    <li>Endpoints: {{ application.intendedPermissions.endpoints.join(', ') || 'None' }}</li>
                    <li>Grants: {{ application.intendedPermissions.grants.join(', ') || 'None' }}</li>
                    <li>Response types: {{ application.intendedPermissions.responseTypes.join(', ') || 'None' }}</li>
                    <li>Scopes: {{ application.intendedPermissions.scopes.join(', ') || 'None' }}</li>
                  </ul>
                </td>
                <td>{{ application.expectedPostSave.join(' ') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p class="cid-scenario-context__subheading">
          People and states
        </p>
        <ul class="cid-scenario-context__states">
          <li
            v-for="person in people"
            :key="person.name"
          >
            <strong>{{ person.name }}</strong> — {{ person.role }}: {{ person.state }}
          </li>
        </ul>

        <p class="cid-scenario-context__subheading">
          Responsibility boundaries
        </p>
        <dl class="cid-scenario-context__responsibilities">
          <template
            v-for="responsibility in responsibilities"
            :key="responsibility.role"
          >
            <dt>{{ responsibility.role }}</dt>
            <dd>{{ responsibility.boundary }}</dd>
          </template>
        </dl>
      </div>
    </div>

    <p class="cid-scenario-context__warning">
      Replace every synthetic value before use.
      The .invalid domains cannot receive production traffic.
    </p>

    <template v-if="view === 'tree'">
      <p class="cid-scenario-context__tree-introduction">
        This overview groups reusable example data.
        It does not assert ownership or community membership beyond the scenario.
      </p>
      <div class="cid-mermaid cid-scenario-context__tree-view">
        <MermaidDiagram
          :id="`scenario-tree-${fixture}`"
          :graph="treeGraph"
        />
      </div>
      <DiagramLegend />
    </template>
  </section>
</template>
