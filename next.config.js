const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const DotenvFlow = require('dotenv-flow-webpack');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

// next.config.js
const withOffline = require('next-offline');

require('dotenv').config();

module.exports = withOffline(
  withCSS(
    withSass({
      target: 'serverless',
      workboxOpts: {
        swDest: 'static/service-worker.js',
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 1 * 24 * 60 * 60, // 1 day
              },
            },
          },
        ],
      },
      env: {
        GTM_KEY: process.env.GTM_KEY,
      },
      webpack: config => {
        config.plugins = config.plugins || [];

        config.plugins = [
          ...config.plugins,

          new Dotenv({
            path: path.join(__dirname, '.env'),
            systemvars: true,
          }),

          new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'ru'],
          }),
        ];

        // config.plugins.push(new DotenvFlow());

        config.module.rules.push({
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000000,
            },
          },
        });

        return config;
      },
    })
  )
);
