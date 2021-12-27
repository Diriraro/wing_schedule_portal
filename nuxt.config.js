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
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  mode: "universal",

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["swiper/css/swiper.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/polyfill.js",
    "~/plugins/utils.js",
    "~/plugins/vue-cookies.js",
    { src: "~/plugins/smooth-scroll.js", ssr: false },
    { src: "~/plugins/vue-awesome-swiper.js", ssr: false },
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
    ["vue-social-sharing/nuxt"],
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
    babel: {
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
