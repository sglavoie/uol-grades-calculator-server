const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require('@craco/craco');

module.exports = {
  reactScriptsVersion: 'react-scripts' /* (default value) */,
  eslint: {
    enable: true /* (default value) */,
    mode: 'extends' /* (default value) */ || 'file',
  },
  babel: {
    presets: [],
    plugins: [],
  },
  typescript: {
    enableTypeChecking: true /* (default value)  */,
  },
  webpack: {
    alias: {},
    plugins: {},
  },
  jest: {
    babel: {
      addPresets: true /* (default value) */,
      addPlugins: true /* (default value) */,
    },
  },
  plugins: [
    {
      plugin: {
        overrideCracoConfig: ({
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          return cracoConfig;
        },
        overrideWebpackConfig: ({
          webpackConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths },
        }) => {
          return webpackConfig;
        },
        overrideDevServerConfig: ({
          devServerConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, proxy, allowedHost },
        }) => {
          return devServerConfig;
        },
        overrideJestConfig: ({
          jestConfig,
          cracoConfig,
          pluginOptions,
          context: { env, paths, resolve, rootDir },
        }) => {
          return jestConfig;
        },
      },
      options: {},
    },
  ],
};
