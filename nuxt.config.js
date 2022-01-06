import bodyParser from "body-parser";
import session from "express-session";
import path from "path";
import fs from "fs";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "행복한 날개 일정관리",
    htmlAttrs: {
      lang: "ko",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover",
      },
      {
        hid: "description",
        name: "description",
        content: "날개 일정관리 시스템",
      },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css",
      },
    ],
    bodyAttrs: {
      class: "white-content", // Add `white-content` class here to enable "white" mode.
    },
  },
  router: {
    linkExactActiveClass: "active",
  },

  mode: "universal",

  loading: { color: "#fff" },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["swiper/css/swiper.css"],

  css: [
    "assets/css/demo.css",
    "assets/css/nucleo-icons.css",
    "assets/sass/black-dashboard.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/polyfill.js",
    "~/plugins/utils.js",
    "~/plugins/vue-cookies.js",
    `~/plugins/dashboard-plugin.js`,
    { src: "~/plugins/smooth-scroll.js", ssr: false },
    // { src: "~/plugins/vue-awesome-swiper.js", ssr: false },
    { src: "~/plugins/vue-infinite-scroll.js", ssr: false },
    { src: "~/plugins/vue-clipboard.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // https://go.nuxtjs.dev/axios
  // "@nuxtjs/axios",
  modules: [
    ["@nuxtjs/style-resources"],
    "@nuxtjs/device",
    "@nuxtjs/pwa",
    "nuxt-i18n",
    // ["vue-social-sharing/nuxt"],
    // ['nuxt-moment', { locale: 'ko' }],
    "nuxt-moment",
  ],

  styleResources: {
    scss: [],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  buildDir: "build",
  build: {
    transpile: [/^element-ui/],
    // extend(config, ctx) {},
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
      presets({ envName }, [preset, options]) {
        options.corejs = { version: 3 };
        if (envName === "modern") {
          options.exclude = ["es.promise"];
        }
      },
    },
  },
  serverMiddleware: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    session({
      secret: "super-secret-key",
      resave: false,
      saveUninitialized: true,
    }),
    { path: "/api", handler: "~/api/index.js" },
    { path: "/sign", handler: "~/api/sign.js" },
  ],
};
