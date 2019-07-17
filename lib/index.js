const cloneDeep = require('lodash/cloneDeep');
const merge = require('lodash/merge');
const rc = require('rc');

const debug = require('./debug')('index');

module.exports = (name, baseConfig, postConfig) => {
    if (name[0] === '@') {
        debug(`scoped name: ${name}`);
        name = name.substr(1).replace(/\//g, '-');
    }
    debug(`name=${name}`);

    const config = rc(name, cloneDeep(baseConfig));

    // Remove extra properties added by `rc` module.
    delete config._;
    delete config.config;
    delete config.configs;

    if (postConfig) {
        return merge(config, postConfig);
    }
    return config;
};
