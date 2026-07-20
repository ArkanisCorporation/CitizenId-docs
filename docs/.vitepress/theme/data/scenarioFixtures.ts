/**
 * Synthetic scenario data shared by the Community Developers Start journey.
 *
 * Keeping names, client records, and eligibility states here prevents pages from
 * accidentally diverging from the Asteria worksheet.
 */
export type ScenarioFixtureKey = 'asteria'
export type ScenarioFocusKey = 'overview' | 'access' | 'client-types' | 'applications'
export type ScenarioApplicationKey = 'dispatch' | 'console' | 'mobile' | 'sync'
export type ScenarioPersonKey = 'jordan' | 'alex' | 'blake' | 'casey' | 'devon'

export interface ScenarioApplication {
  name: string
  runtime: string
  memberPresent: boolean
  tokenCustodian: string
  applicationType: 'Web' | 'Native'
  clientType: 'Confidential' | 'Public'
  redirects: string[]
  postLogoutRedirects: string[]
  secretResult: string
  intendedGrant: string
  environment: string
  owningCommunity: string
  intendedPermissions: {
    endpoints: string[]
    grants: string[]
    responseTypes: string[]
    scopes: string[]
  }
  expectedPostSave: string[]
  capability: 'Ready' | 'Capability pending'
}

export interface ScenarioPerson {
  name: string
  role: string
  state: string
}

export interface ScenarioFocus {
  goal: string
  applicationKeys: ScenarioApplicationKey[]
  personKeys: ScenarioPersonKey[]
  responsibilityKeys: Array<'Developer' | 'Citizen iD staff' | 'Community administrator' | 'Member'>
}

export interface ScenarioFixture {
  name: string
  community: {
    name: string
    identifier: string
    purpose: string
  }
  environment: {
    name: string
    issuer: string
    portalOrigin: string
  }
  api: {
    name: string
    url: string
    purpose: string
  }
  applications: Record<ScenarioApplicationKey, ScenarioApplication>
  people: Record<ScenarioPersonKey, ScenarioPerson>
  responsibilities: Record<ScenarioFocus['responsibilityKeys'][number], string>
  focuses: Record<ScenarioFocusKey, ScenarioFocus>
}

const authorizationCodePermissions = {
  endpoints: ['authorization', 'token'],
  grants: ['authorization_code'],
  responseTypes: ['code'],
  scopes: ['openid', 'profile'],
}

export const scenarioFixtures = {
  asteria: {
    name: 'Asteria Rescue scenario',
    community: {
      name: 'Asteria Rescue',
      identifier: 'asteria-rescue',
      purpose: 'Community that owns the example applications.',
    },
    environment: {
      name: 'Staging',
      issuer: 'https://citizenid.dev/',
      portalOrigin: 'https://citizenid.dev',
    },
    api: {
      name: 'Asteria API',
      url: 'https://api.example.invalid',
      purpose: 'Application-owned protected resource used in later Build guides and not registered during Start.',
    },
    applications: {
      dispatch: {
        name: 'Asteria Dispatch',
        runtime: 'Server website',
        memberPresent: true,
        tokenCustodian: 'Dispatch server',
        applicationType: 'Web',
        clientType: 'Confidential',
        redirects: ['https://dispatch.example.invalid/auth/citizenid/callback'],
        postLogoutRedirects: ['https://dispatch.example.invalid/auth/citizenid/signed-out'],
        secretResult: 'Generated once',
        intendedGrant: 'Authorization code',
        environment: 'Staging',
        owningCommunity: 'Asteria Rescue',
        intendedPermissions: authorizationCodePermissions,
        expectedPostSave: ['Confidential Web client record.', 'One-time secret displayed when created.', 'Exact callback and post-logout records saved.'],
        capability: 'Ready',
      },
      console: {
        name: 'Asteria Console',
        runtime: 'Browser plus Backend for Frontend',
        memberPresent: true,
        tokenCustodian: 'Console backend',
        applicationType: 'Web',
        clientType: 'Confidential',
        redirects: ['https://console.example.invalid/auth/citizenid/callback'],
        postLogoutRedirects: ['https://console.example.invalid/auth/citizenid/signed-out'],
        secretResult: 'Generated once',
        intendedGrant: 'Authorization code',
        environment: 'Staging',
        owningCommunity: 'Asteria Rescue',
        intendedPermissions: authorizationCodePermissions,
        expectedPostSave: ['Confidential Web client record for the backend.', 'Tokens unavailable to browser JavaScript.', 'Exact callback and post-logout records saved.'],
        capability: 'Ready',
      },
      mobile: {
        name: 'Asteria Mobile',
        runtime: 'Installed native application',
        memberPresent: true,
        tokenCustodian: 'Native application secure storage',
        applicationType: 'Native',
        clientType: 'Public',
        redirects: ['com.example.invalid.asteria.mobile:/oauth/callback'],
        postLogoutRedirects: [],
        secretResult: 'No secret',
        intendedGrant: 'Authorization code with S256 Proof Key for Code Exchange',
        environment: 'Staging',
        owningCommunity: 'Asteria Rescue',
        intendedPermissions: authorizationCodePermissions,
        expectedPostSave: ['Public Native client record.', 'No secret is created.', 'Capability remains pending until discovery and a bounded staging smoke test prove secretless redemption.'],
        capability: 'Capability pending',
      },
      sync: {
        name: 'Asteria Sync',
        runtime: 'Server background job',
        memberPresent: false,
        tokenCustodian: 'Sync service secret manager',
        applicationType: 'Web',
        clientType: 'Confidential',
        redirects: [],
        postLogoutRedirects: [],
        secretResult: 'Generated once',
        intendedGrant: 'Client credentials',
        environment: 'Staging',
        owningCommunity: 'Asteria Rescue',
        intendedPermissions: {
          endpoints: ['token'],
          grants: ['client_credentials'],
          responseTypes: [],
          scopes: [],
        },
        expectedPostSave: ['Confidential Web client record.', 'No interactive redirect record.', 'Client credentials identify the service, not a member.'],
        capability: 'Ready',
      },
    },
    people: {
      jordan: {
        name: 'Jordan',
        role: 'Integrator applicant and application operator',
        state: 'Signed in with developer@example.invalid, verified, linked to Discord, an official Discord member, not already an Integrator, and without a pending request.',
      },
      alex: {
        name: 'Alex',
        role: 'Synthetic member',
        state: 'Verified with linked accounts and verified email available.',
      },
      blake: {
        name: 'Blake',
        role: 'Synthetic member',
        state: 'Verified and linked, but verified email is unavailable.',
      },
      casey: {
        name: 'Casey',
        role: 'Synthetic member',
        state: 'Required Roberts Space Industries verification is unavailable.',
      },
      devon: {
        name: 'Devon',
        role: 'Synthetic member',
        state: 'Previously authorized, then revoked authorization.',
      },
    },
    responsibilities: {
      'Developer': 'Chooses the runtime, protects confidential secrets, enters exact redirect records, and performs bounded protocol tests.',
      'Citizen iD staff': 'Assigns endpoint, grant, response-type, scope, and requirement permissions that an ordinary Integrator cannot change.',
      'Community administrator': 'Makes the existing Asteria Rescue community available for the operator to select.',
      'Member': 'Controls consent and authorization, and can revoke authorization later.',
    },
    focuses: {
      'overview': {
        goal: 'Understand the reusable Asteria Rescue scenario before starting the developer journey.',
        applicationKeys: ['dispatch', 'console', 'mobile', 'sync'],
        personKeys: ['jordan', 'alex', 'blake', 'casey', 'devon'],
        responsibilityKeys: ['Developer', 'Citizen iD staff', 'Community administrator', 'Member'],
      },
      'access': {
        goal: 'Prepare Jordan to request Integrator access for Asteria Dispatch.',
        applicationKeys: ['dispatch'],
        personKeys: ['jordan'],
        responsibilityKeys: ['Developer', 'Citizen iD staff', 'Community administrator', 'Member'],
      },
      'client-types': {
        goal: 'Choose the correct Asteria client type by locating the token exchange and token custodian.',
        applicationKeys: ['dispatch', 'console', 'mobile', 'sync'],
        personKeys: ['jordan'],
        responsibilityKeys: ['Developer', 'Citizen iD staff', 'Member'],
      },
      'applications': {
        goal: 'Register the Asteria applications from one staging worksheet and verify their stored records.',
        applicationKeys: ['dispatch', 'console', 'mobile', 'sync'],
        personKeys: ['jordan'],
        responsibilityKeys: ['Developer', 'Citizen iD staff', 'Community administrator', 'Member'],
      },
    },
  },
} as const satisfies Record<ScenarioFixtureKey, ScenarioFixture>

export function getScenarioFixture(fixture: string): ScenarioFixture {
  const selectedFixture = scenarioFixtures[fixture as ScenarioFixtureKey]

  if (selectedFixture)
    return selectedFixture

  throw new Error(`Unknown scenario fixture "${fixture}". Available fixtures: ${Object.keys(scenarioFixtures).join(', ')}.`)
}

export function getScenarioFocus(fixture: string, focus: string): ScenarioFocus {
  const selectedFixture = getScenarioFixture(fixture)
  const selectedFocus = selectedFixture.focuses[focus as ScenarioFocusKey]

  if (selectedFocus)
    return selectedFocus

  throw new Error(`Unknown scenario focus "${focus}" for fixture "${fixture}". Available focuses: ${Object.keys(selectedFixture.focuses).join(', ')}.`)
}

export function createScenarioTreeGraph(fixture: ScenarioFixture): string {
  return `treeView-beta
accTitle: ${fixture.name} hierarchy
accDescr: Reusable synthetic Asteria Rescue applications, protected resource, operator, and member states for the Citizen iD developer guide.
    "${fixture.name}" :::context
        "Example applications" :::context
            "${fixture.applications.dispatch.name}" :::context ## confidential web application
            "${fixture.applications.console.name}" :::context ## browser with a confidential backend
            "${fixture.applications.mobile.name}" :::caution ## public native capability pending
            "${fixture.applications.sync.name}" :::context ## confidential background service
        "External protected resource" :::data
            "${fixture.api.name}" :::data ## used in later Build guides
        "Example operator" :::actor
            "${fixture.people.jordan.name}" :::actor ## applicant and application operator
        "Example member states" :::actor
            "${fixture.people.alex.name}" :::success ## required data available
            "${fixture.people.blake.name}" :::caution ## verified email unavailable
            "${fixture.people.casey.name}" :::blocked ## required verification unavailable
            "${fixture.people.devon.name}" :::blocked ## authorization later revoked`
}
