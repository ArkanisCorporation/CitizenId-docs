import type { HeadConfig, PageData, UserConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const siteUrl = 'https://docs.citizenid.space'
const siteTitle = 'Citizen iD Docs'
const siteDescription = 'Public documentation for Citizen iD players, community admins, and community developers.'
const socialImage = `${siteUrl}/citizenid-logo-dark.png`
const dayjsEsm = fileURLToPath(new URL('../../node_modules/dayjs/esm/index.js', import.meta.url))
const dayjsAdvancedFormat = fileURLToPath(new URL('../../node_modules/dayjs/esm/plugin/advancedFormat/index.js', import.meta.url))
const dayjsCustomParseFormat = fileURLToPath(new URL('../../node_modules/dayjs/esm/plugin/customParseFormat/index.js', import.meta.url))
const dayjsDuration = fileURLToPath(new URL('../../node_modules/dayjs/esm/plugin/duration/index.js', import.meta.url))
const dayjsIsoWeek = fileURLToPath(new URL('../../node_modules/dayjs/esm/plugin/isoWeek/index.js', import.meta.url))
const quackbackWidgetScript = `(function(w,d){if(w.Quackback)return;w.Quackback=function(){
  (w.Quackback.q=w.Quackback.q||[]).push(arguments)};
  var s=d.createElement("script");s.async=true;
  s.src="https://feedback.citizenid.dev/api/widget/sdk.js";
  d.head.appendChild(s)})(window,document);

  Quackback("init");`

export default withPatchedMermaid(defineConfig({
  base: '/',
  lang: 'en-US',
  title: siteTitle,
  description: siteDescription,
  cleanUrls: true,
  metaChunk: true,
  appearance: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/citizenid-icon-dark.png', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/citizenid-icon-light.png', media: '(prefers-color-scheme: dark)' }],
    ['meta', { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#101114', media: '(prefers-color-scheme: dark)' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteTitle }],
    ['meta', { property: 'og:image', content: socialImage }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: socialImage }],
    ['script', { id: 'quackback-widget' }, quackbackWidgetScript],
  ],
  markdown: {
    headers: {
      level: [2, 3],
    },
    config(md) {
      const renderFence = md.renderer.rules.fence?.bind(md.renderer.rules)

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const renderedFence = renderFence?.(tokens, idx, options, env, self)
          ?? self.renderToken(tokens, idx, options)
        const info = tokens[idx]?.info.trim().split(/\s+/)[0]

        if (info !== 'mermaid')
          return renderedFence

        return `${renderedFence}\n<DiagramLegend />`
      }
    },
  },
  mermaid: {
    theme: 'base',
    flowchart: {
      useMaxWidth: false,
      htmlLabels: true,
      curve: 'basis',
      diagramPadding: 12,
      nodeSpacing: 36,
      rankSpacing: 38,
    },
    themeVariables: {
      background: 'transparent',
      primaryColor: '#fff8ec',
      primaryTextColor: '#20242c',
      primaryBorderColor: '#f39c12',
      secondaryColor: '#ffffff',
      secondaryTextColor: '#20242c',
      secondaryBorderColor: '#aeb7c4',
      tertiaryColor: '#ffffff',
      tertiaryTextColor: '#20242c',
      tertiaryBorderColor: '#aeb7c4',
      lineColor: '#b96f06',
      textColor: '#20242c',
      mainBkg: '#fff8ec',
      nodeBorder: '#f39c12',
      edgeLabelBackground: '#fff8ec',
      labelTextColor: '#20242c',
      labelBoxBkgColor: '#fff8ec',
      labelBoxBorderColor: '#f39c12',
      clusterBkg: '#ffffff',
      clusterBorder: '#aeb7c4',
      fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    },
  },
  mermaidPlugin: {
    class: 'cid-mermaid',
  },
  themeConfig: {
    footer: {
      message: 'Citizen iD public documentation',
      copyright: 'Copyright &copy; 2955 Citizen iD',
    },
    logo: {
      light: '/citizenid-icon-dark.png',
      dark: '/citizenid-icon-light.png',
      alt: 'Citizen iD',
    },
    logoLink: '/',
    siteTitle,
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    search: {
      provider: 'local',
      options: {
        detailedView: 'auto',
        translations: {
          button: {
            buttonText: 'Search docs',
            buttonAriaLabel: 'Search Citizen iD documentation',
          },
          modal: {
            displayDetails: 'Display detailed result',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No documentation results found',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close',
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ArkanisCorporation/CitizenId-docs', ariaLabel: 'Citizen iD documentation source on GitHub' },
    ],
    editLink: {
      pattern: 'https://github.com/ArkanisCorporation/CitizenId-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
        forceLocale: true,
      },
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page',
    },
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    sidebarMenuLabel: 'Documentation menu',
    returnToTopLabel: 'Return to top',
    skipToContentLabel: 'Skip to documentation content',
    externalLinkIcon: true,
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
    hostname: siteUrl,
  },
  transformPageData(pageData) {
    if (pageData.relativePath === '404.md') {
      return
    }

    const pageTitle = resolvePageTitle(pageData)
    const pageDescription = pageData.description || siteDescription
    const canonicalUrl = resolveCanonicalUrl(pageData.relativePath)
    const head = pageData.frontmatter.head ??= []

    head.push(...createPageHead(pageTitle, pageDescription, canonicalUrl))
  },
  vite: {
    plugins: [
      Unocss({
        configFile: fileURLToPath(new URL('../uno.config.ts', import.meta.url)),
      }),
    ],
  },
}))

function withPatchedMermaid(config: UserConfig): UserConfig {
  const mermaidConfig = withMermaid(config)
  mermaidConfig.vite ??= {}
  mermaidConfig.vite.resolve ??= {}
  const existingAlias = mermaidConfig.vite.resolve.alias
  const otherAliases = Array.isArray(existingAlias)
    ? existingAlias.filter(alias => typeof alias.find !== 'string' || !alias.find.startsWith('dayjs'))
    : Object.entries(existingAlias ?? {})
        .filter(([find]) => !find.startsWith('dayjs'))
        .map(([find, replacement]) => ({ find, replacement }))

  mermaidConfig.vite.resolve.alias = [
    { find: /^dayjs$/, replacement: dayjsEsm },
    { find: 'dayjs/plugin/advancedFormat.js', replacement: dayjsAdvancedFormat },
    { find: 'dayjs/plugin/customParseFormat.js', replacement: dayjsCustomParseFormat },
    { find: 'dayjs/plugin/duration.js', replacement: dayjsDuration },
    { find: 'dayjs/plugin/isoWeek.js', replacement: dayjsIsoWeek },
    ...otherAliases,
  ]

  return mermaidConfig
}

function createPageHead(title: string, description: string, url: string): HeadConfig[] {
  return [
    ['link', { rel: 'canonical', href: url }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: url }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description }],
  ]
}

function resolvePageTitle(pageData: PageData): string {
  const title = pageData.title || siteTitle

  return title === siteTitle ? siteTitle : `${title} | ${siteTitle}`
}

function resolveCanonicalUrl(relativePath: string): string {
  const routePath = relativePath
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')

  return new URL(routePath ? `/${routePath}` : '/', siteUrl).href
}

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
