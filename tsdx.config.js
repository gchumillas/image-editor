const alias = require('@rollup/plugin-alias');

// These rollup configurations together support `npm start` and `npm run build`
// with absolute file paths in TSDX

module.exports = {
  rollup(config, options) {
    //Do not treat absolute paths as external modules
    return {
      ...config,
      external: id => !id.startsWith('src/') && config.external(id),
    };
  },
};
