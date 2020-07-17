const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const rc = require('rc');

const debug = require('./debug')('index');

module.exports = (name, baseConfig, postConfig) => {
  let cleanName = name;

  if (cleanName.startsWith('@')) {
    debug(`scoped name: ${cleanName}`);
    cleanName = cleanName.substr(1);
  }

  cleanName = cleanName.replace(/\//g, '-');
  debug(`cleanName=${cleanName}`);

  const config = rc(cleanName, cloneDeep(baseConfig));

  // Remove extra properties added by `rc` module.
  delete config._;
  delete config.config;
  delete config.configs;

  if (postConfig) {
    return merge(config, postConfig);
  }
  return config;
};
