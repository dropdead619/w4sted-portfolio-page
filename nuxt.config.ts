// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  app: {
    rootAttrs: {
      lang: 'en',
    },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'My Frontend Portfolio',
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

  modules: ['@nuxt/image', 'nuxt-gtag', '@vueuse/nuxt',]
})