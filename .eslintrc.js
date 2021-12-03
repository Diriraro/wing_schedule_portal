module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false,
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "linebreak-style": 0,
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "max-len": "off",
    "import/no-unresolved": "off",
    "import/extensions": [
      "error",
      "always",
      {
        js: "always",
        vue: "always",
      },
    ],
    "template-curly-spacing": "off",
    indent: "off",
  },
};
