import NuxtConfiguration from '@nuxt/config'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin';

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
  ],
  styleResources: {
    // your settings here
    sass: ['~/assets/scss/main.scss'],
  },
  build: {
    plugins:   [
      new VuetifyLoaderPlugin()
    ],
    transpile: [ /^vuetify/ ],
  },
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/style-resources',
      ['@nuxtjs/moment', ['ja']]
  ],
  plugins: [
    "@/plugins/vuetify.js",
    "@/plugins/material-design-icons-iconfont.js"
  ],
  axios: {}
};

export default config
