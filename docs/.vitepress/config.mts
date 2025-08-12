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
      '/developer-guide/': sidebarDeveloperGuid(),
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
      text: 'Developer Guide',
      link: '/developer-guide/',
      activeMatch: '/developer-guide/',
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
          link: 'https://discord.gg/kzF3Vbn5Kg',
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
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is this?', link: '/user-guide/' },
      ],
    },
  ]
}

function sidebarDeveloperGuid() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is this?', link: '/developer-guide/' },
        { text: 'Getting started', link: '/developer-guide/getting-started' },
      ],
    },
  ]
}
