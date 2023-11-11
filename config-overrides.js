/* config-overrides.js */

module.exports = function override(config, env) {
  config.resolve.fallback = {
    path: false,
    stream: false,
    fs: false,
    os: false,
  };
  return config;
};
