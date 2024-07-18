// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "nuxt-primevue",
  ],

  css: ["@/assets/scss/global.scss"],

  typescript: {
    typeCheck: true,
  },

  colorMode: {
    preference: "dark",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },

  compatibilityDate: "2024-07-11",

  alias: {
    "@widgets": "/widgets",
  },
});
