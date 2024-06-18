// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-scheduler'
  ],
  runtimeConfig: {
    scriptPath: '/app/story-book.gpt', // NUXT_SCRIPT_PATH
    storiesVolumePath: 'stories', // NUXT_STORIES_VOLUME_PATH
    gptscriptCachePath: '', // NUXT_GPTSCRIPT_CACHE_PATH
    public: {
      googleAnalytics: '' // NUXT_PUBLIC_GOOGLE_ANALYTICS
    }
  },
})
