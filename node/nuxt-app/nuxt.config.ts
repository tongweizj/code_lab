// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  content: {
    highlight: {
      preload: [
        'javascript',
        'typescript',
        'vue',
        'vue-html'
      ],
    },},
  postcss: {
    plugins: {
      tailwindcss: {},
    }
  },
})
