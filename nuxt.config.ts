// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'ru',
        name: 'Русский'
      },
    ]
  },
  site: {
    url: 'https://w4sted-portfolio.netlify.app/',
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
          content: "Gua8rZ2PwIQ1PQgNdsnJZxvZbK9qze1DkM6qi73GUzM"
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
  ]
})