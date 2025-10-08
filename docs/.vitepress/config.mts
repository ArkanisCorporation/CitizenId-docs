import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { version } from '../../package.json'

export default defineConfig({
  base: '/',
  title: 'Citizen iD — Documentation',
  description: 'An official user and developer documentation for the Citizen iD project.',
  markdown: {
    headers: {
      level: [0, 0],
    },
  },
  themeConfig: {
    footer: {
      message: 'Citizen iD — User and Developer Documentation',
      copyright: 'Copyright &copy; 2955 Citizen iD',
    },
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArkanisCorporation/CitizenId-docs' },
    ],
    editLink: {
      pattern: 'https://github.com/ArkanisCorporation/CitizenId-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    nav: nav(),
    sidebar: {
      '/user-guide/': sidebarUserGuide(),
      '/integrator-guide/': sidebarIntegratorGuide(),
    },
    blog: {
      title: 'Developer Blog',
      description: 'Articles from the Developer\'s Blog',
    },
  },
  sitemap: {
    hostname: 'https://docs.citizenid.space',
  },
  vite: {
    plugins: [
      Unocss({
        configFile: '../../unocss.config.ts',
      }),
    ],
  },
})

function nav() {
  return [
    {
      text: 'User Guide',
      link: '/user-guide/',
      activeMatch: '/user-guide/',
    },
    {
      text: 'Integrator Guide',
      link: '/integrator-guide/',
      activeMatch: '/integrator-guide/',
    },
    {
      text: 'Blog',
      link: '/blog/',
      activeMatch: '/blog/',
    },
    {
      text: 'External Links',
      items: [
        {
          text: 'Citizen iD',
          link: 'https://citizenid.space',
        },
        {
          text: 'Community Discord',
          link: 'https://discord.citizenid.space',
        },
        {
          text: 'Arkanis Corporation',
          link: 'https://arkanis.cc',
        },
      ],
    },
    {
      text: version,
      link: '#',
    },
  ]
}

function sidebarUserGuide() {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'What is Citizen iD?', link: '/user-guide/' },
        { text: 'Creating Your Account', link: '/user-guide/signing-up' },
        { text: 'RSI Account Verification', link: '/user-guide/rsi-verification' },
        { text: 'RSI Verification Withdrawal', link: '/user-guide/rsi-verification-withdrawal' },
      ],
    },
    {
      text: 'Discord Features',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'Linked Roles', link: '/user-guide/discord/linked-roles' },
        { text: 'Role Revocation', link: '/user-guide/discord/role-revocation' },
      ],
    },
    {
      text: 'Using Citizen iD with Community Tools',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'Signing In with Citizen iD', link: '/user-guide/usage/signing-in' },
        { text: 'Understanding Authorisations', link: '/user-guide/usage/oauth2-authorisations' },
        { text: 'Revoking Authorization', link: '/user-guide/usage/oauth2-revocation' },
      ],
    },
    {
      text: 'Troubleshooting & FAQ',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'Common Issues', link: '/user-guide/support/common-issues' },
        { text: 'Frequently Asked Questions', link: '/user-guide/support/faq' },
        { text: 'Contact & Support', link: '/user-guide/support/contact' },
      ],
    },
  ]
}

function sidebarIntegratorGuide() {
  return [
    {
      text: 'Getting Started',
      collapsible: true,
      items: [
        { text: 'What is this?', link: '/integrator-guide/' },
      ],
    },
    {
      text: 'Discord Integrations',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/integrator-guide/discord/' },
        { text: 'Linked Roles', link: '/integrator-guide/discord/linked-roles' },
        { text: 'Role Management', link: '/integrator-guide/discord/role-management' },
        { text: 'Nickname Management', link: '/integrator-guide/discord/nickname-management' },
      ],
    },
    {
      text: 'OAuth2 Integration',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/integrator-guide/oauth2/' },
        { text: 'Flows & Grants', link: '/integrator-guide/oauth2/flows-grants' },
        { text: 'Token Reference', link: '/integrator-guide/oauth2/tokens' },
        { text: 'Scopes and Claims', link: '/integrator-guide/oauth2/scopes-claims' },
        { text: 'User Roles', link: '/integrator-guide/oauth2/roles' },
        { text: 'Credential Delegation', link: '/integrator-guide/oauth2/delegation' },
        { text: 'Credential Revocation', link: '/integrator-guide/oauth2/revocation' },
        { text: 'OpenID Connect (OIDC)', link: '/integrator-guide/oauth2/oidc' },
      ],
    },
    {
      text: 'Citizen iD API',
      collapsed: false,
      collapsible: true,
      items: [
        { text: 'Getting Started', link: '/integrator-guide/api/' },
        { text: 'Authentication', link: '/integrator-guide/api/auth' },
        { text: 'Documentation', link: '/integrator-guide/api/docs' },
      ],
    },
  ]
}
