// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://demezhan-kazhkenov.dev/',
    trailingSlash: true,
  },

  // Single-page site: declare the one URL rather than letting the module
  // crawl for sources at build time.
  sitemap: {
    excludeAppSources: true,
    urls: ['/'],
  },

  app: {
    rootAttrs: {
      lang: 'en',
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Demezhan Kazhkenov — Frontend Team Lead (Vue / Nuxt / TypeScript)',
      htmlAttrs: { lang: 'en', class: 'dark' },
      meta: [
        {
          name: 'description',
          content:
            'Demezhan Kazhkenov — Frontend Team Lead with 5 years building and scaling Vue/Nuxt applications: CRMs, marketplaces and geospatial products. Nuxt 4, TypeScript, GraphQL, Tailwind CSS.',
        },
        { name: 'theme-color', content: '#08080a' },
        { name: 'author', content: 'Demezhan Kazhkenov' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Demezhan Kazhkenov — Frontend Team Lead' },
        {
          property: 'og:description',
          content:
            'Frontend lead with 5 years building and scaling Vue/Nuxt applications — CRMs, marketplaces and geospatial products.',
        },
        { property: 'og:url', content: 'https://demezhan-kazhkenov.dev/' },
        { property: 'og:image', content: 'https://demezhan-kazhkenov.dev/opt/hero-photo.webp' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'google-site-verification',
          content: 'jJ7boRaJW-oAI7AaI16fGCbGNKRuj2TmE4IUrgy3i8M',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap',
        },
      ],
      script: [
        {
          // Set the stored theme before first paint so there is no flash.
          innerHTML: `try{var t=localStorage.getItem('dk-theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}`,
          tagPosition: 'head',
        },
      ],
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  gtag: {
    enabled: process.env.NODE_ENV !== 'development',
    id: 'G-070R6E0P3J',
  },

  modules: [
    'nuxt-gtag',
    '@vueuse/nuxt',
    '@nuxtjs/sitemap',
  ],

  compatibilityDate: '2024-07-19',
})
