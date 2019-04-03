import NuxtConfiguration from '@nuxt/config'

const config: NuxtConfiguration = {
  srcDir: 'src/app',
  env: {},
  head: {
    title: "petapeta",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js TypeScript project" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
    ]
  },
  loading: { color: "#3B8070" },
  css: [
    // "~/assets/css/main.css",
    // node.js module but we specify the pre-processor
    { src: '~assets/scss/main.scss', lang: 'scss' },
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css'
  ],
  styleResources: {
    // your settings here
    sass: ['~/assets/scss/main.scss']
  },
  build: {},
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/style-resources'
  ],
  plugins: [],
  axios: {}
};

export default config
