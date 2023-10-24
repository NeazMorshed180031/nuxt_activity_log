// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      BASE_URL: process.env.IMAGE_BASE_URL, // can be overridden by NUXT_PUBLIC_API_BASE environment variable

      BASE_URLS: process.env.BASE_URL,
    },
  },
  // css: ["bootstrap/dist/css/bootstrap.min.css"],
  css: ["~/assets/css/tailwind.css"],
  modules: ["@nuxtjs/tailwindcss", "@samk-dev/nuxt-vcalendar"],

  app: {
    head: {
      title: "Nuxt Dojo",
      meta: [
        {
          name: "description",
          content: "Everything about Nuxt",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
});
