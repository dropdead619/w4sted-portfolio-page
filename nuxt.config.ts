// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        name: 'English',
      },
      {
        code: 'ru',
        name: 'Русский',
      },
    ],
    vueI18n: './i18n.config.ts',
    differentDomains: false,
    detectBrowserLanguage: false,
  },

  site: {
    url: 'https://demezhan-kazhkenov.dev/',
    trailingSlash: true,
  },

  app: {
    rootAttrs: {
      lang: 'en',
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Demezhan Kazhkenov | Vue.js Frontend Developer',
      meta: [
        {
          name: 'description',
          content: 'My name is Demezhan, Vue.js Frontend Developer from Astana. GMT +5. My main stack is: Vue 3 / Nuxt 3, Typescript, Pinia, TailwindCSS / UnoCSS, Vite.'
        },
        {
          name: 'google-site-verification',
          content: "jJ7boRaJW-oAI7AaI16fGCbGNKRuj2TmE4IUrgy3i8M"
        },
      ]
    }
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  gtag: {
    // Your primary Google tag ID
    enabled: process.env.NODE_ENV !== 'development',
    id: 'G-070R6E0P3J',
  },

  modules: [
    '@nuxt/image',
    'nuxt-gtag',
    '@vueuse/nuxt',
    "@nuxtjs/sitemap",
    "@nuxtjs/i18n"
  ],

  compatibilityDate: '2024-07-19'
})