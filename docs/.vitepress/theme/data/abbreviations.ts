/**
 * Canonical abbreviations used by the developer guide.
 *
 * Components and the Terms page consume this one dictionary so visible prose and
 * definitions cannot drift apart.
 */
export type AbbreviationCategory = 'Application' | 'Citizen iD' | 'Protocol' | 'Security'

export interface Abbreviation {
  term: string
  expansion: string
  category: AbbreviationCategory
  description: string
}

export const abbreviations = {
  API: {
    term: 'API',
    expansion: 'Application Programming Interface',
    category: 'Application',
    description: 'Citizen iD APIs provide protected application data after the required permissions are granted.',
  },
  BFF: {
    term: 'BFF',
    expansion: 'Backend for Frontend',
    category: 'Application',
    description: 'A Citizen iD browser application can use a Backend for Frontend to keep tokens off the browser.',
  },
  CORS: {
    term: 'CORS',
    expansion: 'Cross-Origin Resource Sharing',
    category: 'Security',
    description: 'Citizen iD browser integrations must account for Cross-Origin Resource Sharing at their own application boundary.',
  },
  CSRF: {
    term: 'CSRF',
    expansion: 'Cross-Site Request Forgery',
    category: 'Security',
    description: 'Citizen iD authorization requests need state handling that protects the application from Cross-Site Request Forgery.',
  },
  HTTP: {
    term: 'HTTP',
    expansion: 'Hypertext Transfer Protocol',
    category: 'Protocol',
    description: 'Citizen iD protocol endpoints use Hypertext Transfer Protocol messages over secure connections.',
  },
  JWKS: {
    term: 'JWKS',
    expansion: 'JSON Web Key Set',
    category: 'Protocol',
    description: 'Citizen iD publishes a JSON Web Key Set so applications can verify signed tokens.',
  },
  JWT: {
    term: 'JWT',
    expansion: 'JSON Web Token',
    category: 'Protocol',
    description: 'Citizen iD may issue JSON Web Tokens that an application validates before trusting claims.',
  },
  M2M: {
    term: 'M2M',
    expansion: 'Machine to Machine',
    category: 'Application',
    description: 'Citizen iD client-credentials integrations identify a machine-to-machine application, not a member.',
  },
  OIDC: {
    term: 'OIDC',
    expansion: 'OpenID Connect',
    category: 'Protocol',
    description: 'Citizen iD uses OpenID Connect for member sign-in and identity claims.',
  },
  PAR: {
    term: 'PAR',
    expansion: 'Pushed Authorization Requests',
    category: 'Protocol',
    description: 'Use Pushed Authorization Requests with Citizen iD only when discovery and the application permission both support it.',
  },
  PKCE: {
    term: 'PKCE',
    expansion: 'Proof Key for Code Exchange',
    category: 'Security',
    description: 'Citizen iD public authorization-code clients use an S256 Proof Key for Code Exchange challenge and verifier.',
  },
  RFC: {
    term: 'RFC',
    expansion: 'Request for Comments',
    category: 'Protocol',
    description: 'Citizen iD protocol behaviour follows relevant Request for Comments specifications.',
  },
  RSI: {
    term: 'RSI',
    expansion: 'Roberts Space Industries',
    category: 'Citizen iD',
    description: 'Citizen iD verification connects an account to the Roberts Space Industries profile system.',
  },
  SDK: {
    term: 'SDK',
    expansion: 'Software Development Kit',
    category: 'Application',
    description: 'A Citizen iD Software Development Kit can reduce integration boilerplate without changing permission requirements.',
  },
  SPA: {
    term: 'SPA',
    expansion: 'Single-Page Application',
    category: 'Application',
    description: 'A Citizen iD Single-Page Application needs a confidential backend before browser code can rely on tokens.',
  },
  URI: {
    term: 'URI',
    expansion: 'Uniform Resource Identifier',
    category: 'Protocol',
    description: 'Citizen iD validates configured redirect Uniform Resource Identifiers exactly.',
  },
  URL: {
    term: 'URL',
    expansion: 'Uniform Resource Locator',
    category: 'Protocol',
    description: 'Citizen iD discovery and application redirects use exact Uniform Resource Locator values.',
  },
  UTC: {
    term: 'UTC',
    expansion: 'Coordinated Universal Time',
    category: 'Protocol',
    description: 'Citizen iD operational evidence records timestamps in Coordinated Universal Time when timing matters.',
  },
  XSS: {
    term: 'XSS',
    expansion: 'Cross-Site Scripting',
    category: 'Security',
    description: 'Citizen iD integrations keep tokens out of browser code to reduce Cross-Site Scripting exposure.',
  },
} as const satisfies Record<string, Abbreviation>

export type AbbreviationTerm = keyof typeof abbreviations

export function getAbbreviation(term: string): Abbreviation {
  const abbreviation = abbreviations[term as AbbreviationTerm]

  if (abbreviation)
    return abbreviation

  throw new Error(`Unknown abbreviation "${term}". Available abbreviations: ${Object.keys(abbreviations).join(', ')}.`)
}
