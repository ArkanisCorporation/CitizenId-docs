import { fileURLToPath } from 'node:url'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  title: 'Citizen iD Documentation',
  description: 'Public documentation for Citizen iD players, community admins, and community developers.',
  lastUpdated: true,
  markdown: {
    headers: {
      level: [2, 3],
    },
  },
  themeConfig: {
    footer: {
      message: 'Citizen iD public documentation',
      copyright: 'Copyright &copy; 2955 Citizen iD',
    },
    outline: {
      level: [2, 3],
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
      '/players/': sidebarPlayers(),
      '/community-admins/': sidebarCommunityAdmins(),
      '/community-developers/': sidebarCommunityDevelopers(),
      '/reference/': sidebarReference(),
      '/user-guide/': sidebarPlayers(),
      '/integrator-guide/': sidebarCommunityDevelopers(),
    },
  },
  sitemap: {
    hostname: 'https://docs.citizenid.space',
  },
  vite: {
    plugins: [
      Unocss({
        configFile: fileURLToPath(new URL('../uno.config.ts', import.meta.url)),
      }),
    ],
  },
})

function nav() {
  return [
    {
      text: 'Players',
      link: '/players/',
      activeMatch: '/players/',
    },
    {
      text: 'Community Admins',
      link: '/community-admins/',
      activeMatch: '/community-admins/',
    },
    {
      text: 'Community Developers',
      link: '/community-developers/',
      activeMatch: '/community-developers/',
    },
    {
      text: 'Reference',
      link: '/reference/',
      activeMatch: '/reference/',
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
        {
          text: 'Citizen iD Docs Source',
          link: 'https://github.com/ArkanisCorporation/CitizenId-docs',
        },
      ],
    },
  ]
}

function sidebarPlayers() {
  return [
    {
      text: 'Website',
      collapsed: false,
      items: [
        { text: 'Player Guide', link: '/players/' },
        { text: 'Website Basics', link: '/players/website-basics' },
        { text: 'RSI Verification', link: '/players/rsi-verification' },
        { text: 'Linked Accounts', link: '/players/linked-accounts' },
      ],
    },
    {
      text: 'Integrations',
      collapsed: false,
      items: [
        { text: 'Discord Integrations', link: '/players/discord-integrations' },
        { text: 'External Apps', link: '/players/external-apps' },
      ],
    },
    {
      text: 'Privacy',
      collapsed: false,
      items: [
        { text: 'Privacy Controls', link: '/players/privacy-controls' },
        { text: 'Data Rights', link: '/players/data-rights' },
      ],
    },
    {
      text: 'Support',
      collapsed: false,
      items: [
        { text: 'Getting Help', link: '/players/getting-help' },
      ],
    },
  ]
}

function sidebarCommunityAdmins() {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Community Admin Guide', link: '/community-admins/' },
        { text: 'Community Setup', link: '/community-admins/community-setup' },
        { text: 'Discord Bot', link: '/community-admins/discord-bot' },
      ],
    },
    {
      text: 'Automation',
      collapsed: false,
      items: [
        { text: 'Role Assignments', link: '/community-admins/role-assignments' },
        { text: 'Nickname Management', link: '/community-admins/nickname-management' },
      ],
    },
    {
      text: 'Operations',
      collapsed: false,
      items: [
        { text: 'Branding Assets', link: '/community-admins/branding-assets' },
        { text: 'Maintenance And Support', link: '/community-admins/maintenance-and-support' },
      ],
    },
  ]
}

function sidebarCommunityDevelopers() {
  return [
    {
      text: 'Getting Started',
      collapsed: false,
      items: [
        { text: 'Community Developer Guide', link: '/community-developers/' },
        { text: 'Request Integrator Access', link: '/community-developers/request-integrator-access' },
        { text: 'Applications', link: '/community-developers/applications' },
      ],
    },
    {
      text: 'OAuth And API',
      collapsed: false,
      items: [
        { text: 'OAuth And OIDC', link: '/community-developers/oauth-and-oidc' },
        { text: 'Scopes And Claims', link: '/community-developers/scopes-and-claims' },
        { text: 'Tokens And Revocation', link: '/community-developers/tokens-and-revocation' },
        { text: 'API Reference', link: '/community-developers/api-reference' },
      ],
    },
  ]
}

function sidebarReference() {
  return [
    {
      text: 'Reference',
      collapsed: false,
      items: [
        { text: 'Reference Overview', link: '/reference/' },
        { text: 'Brand Guidelines', link: '/reference/brand-guidelines' },
        { text: 'Legal And Privacy', link: '/reference/legal-and-privacy' },
        { text: 'Support Evidence', link: '/reference/support-evidence' },
        { text: 'Operations Notes', link: '/reference/operations-notes' },
      ],
    },
  ]
}
