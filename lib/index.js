const _ = require('lodash');
const debug = require('debug')('QI:rc');
const rc = require('rc');

module.exports = (name, baseConfig, postConfig) => {
    if (name[0] === '@') {
        debug(`scoped name: ${name}`);
        name = name.substr(1).replace(/\//g, '-');
    }

    debug(`name=${name}`);

    const config = rc(name, _.cloneDeep(baseConfig));

    // Remove extra properties added by `rc` module.
    delete config._;
    delete config.config;
    delete config.configs;

    if (postConfig) {
        return _.merge(config, postConfig);
    }
    return config;
};
