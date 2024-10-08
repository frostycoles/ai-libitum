import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    edenAiApiKey: ''
  },
  primevue: {
    options: {
      theme: {
          preset: Aura
      }
    }
  }
})