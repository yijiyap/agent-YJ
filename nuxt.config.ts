// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  modules: [
    'nuxt-icon',
    '@nuxtjs/tailwindcss',
    'nuxt-vuefire',
  ],
  ssr: false,
  css: [
    '~/assets/main.css',
    '~/assets/styles.css',
    'bootstrap/dist/css/bootstrap.css',
  ],
  vuefire: {
    auth: true,
    config: {
      // replace with your own credentials from the Firebase console
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    },
  }
})
