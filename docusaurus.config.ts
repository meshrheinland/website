import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Mesh Rheinland',
  tagline: 'Meshtastic und MeshCore Community im Rheinland',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://meshrheinland.de',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'meshrheinland',
  projectName: 'website',

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'de',
    locales: ['de'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/meshrheinland/website/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Mesh Rheinland',
      logo: {
        alt: 'Mesh Rheinland Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/meshtastic/intro',
          label: 'Meshtastic',
          position: 'left',
        },
        {
          to: '/meshcore/intro',
          label: 'MeshCore',
          position: 'left',
        },
        {
          href: 'https://github.com/meshrheinland/website/',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Meshtastic',
          items: [
            {
              label: 'Web-Flasher',
              href: 'https://flasher.meshtastic.org',
            },
            {
              label: 'Web-Client',
              href: 'https://client.meshtastic.org',
            },
            {
              label: 'Mesh Rheinland Karte',
              href: 'https://map.meshrheinland.de',
            },
            {
              label: 'WhatsApp Community',
              href: 'https://chat.whatsapp.com/CRYnRrAzhYeDlQEJQZQpKi?mode=wwt',
            },
          ],
        },
        {
          title: 'MeshCore',
          items: [
            {
              label: 'Web-Flasher',
              href: 'https://flasher.meshcore.dev',
            },
            {
              label: 'Letsmesh-Karte',
              href: 'https://analyzer.letsme.sh/map?last_heard_days=1&lat=50.88376&long=7.23022&zoom=10',
            },
            {
              label: 'Traffic-Analyzer',
              href: 'https://analyzer.letsme.sh/packets?region=CGN',
            },
            {
              label: 'WhatsApp Community',
              href: 'https://chat.whatsapp.com/GKnoM4NDHQD9crIZpvv0Q1?mode=wwt',
            },
          ],
        },
        {
          title: 'Rechtliches',
          items: [
            {
              label: 'Impressum',
              to: '/impressum',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mesh Rheinland Community. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
