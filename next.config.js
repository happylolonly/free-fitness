const withSass = require("@zeit/next-sass");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const DotenvFlow = require("dotenv-flow-webpack");

require("dotenv").config();

module.exports = withSass({
  env: {
    GTM_KEY: process.env.GTM_KEY
  },
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    // config.plugins.push(new DotenvFlow());

    return config;
  }
});
