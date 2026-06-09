// @ts-check

/** @type {import('@docusaurus/types').Config} */
require('dotenv').config();

const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

const config = {
  title: 'Cours',
  tagline: 'Plateforme de cours en ligne',
  favicon: 'favicon.ico',

  url: SITE_URL,
  baseUrl: '/cours/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: undefined,
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },

      navbar: {
        title: 'Cours',
        logo: {
          alt: 'Logo',
          // Bundlé depuis cours/static/logo.svg → servi à /cours/logo.svg
          src: 'logo.svg',
          // Lien logo → page d'accueil Express. On utilise /../../ pour "sortir" de /cours/
          // Docusaurus normalise les href absoluts tels quels sans préfixer baseUrl
          href: '/',
          target: '_self',
        },
        items: [
          {
            // href = lien HTML pur (pas géré par le router Docusaurus)
            // Docusaurus NE préfixe PAS baseUrl sur les href absolus
            href: '/',
            label: 'Accueil',
            position: 'left',
            target: '_self',
          },
          {
            type: 'docSidebar',
            sidebarId: 'coursSidebar',
            label: 'Cours',
            position: 'left',
          },
          {
            href: SITE_URL + '/eleve',
            label: 'Espace Élève',
            position: 'left',
            target: '_blank',
          },
          {
            href: SITE_URL + '/prof',
            label: 'Espace Prof',
            position: 'left',
            target: '_blank',
          },
        ],
      },

      footer: undefined,

      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },

      // prism: {
      //   theme: require('prism-react-renderer').themes.github,
      //   darkTheme: require('prism-react-renderer').themes.dracula,
      // },
    }),
};

module.exports = config;
