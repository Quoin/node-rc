# @quoin/node-rc

This is a wrapper library for the [rc](https://www.npmjs.com/package/rc) because
it doesn't handle properly scoped modules.

This library apply the same logic as `npm pack` is doing for the name of the
file.

## Usage

    npm install --save @quoin/node-rc

    const rc = require('@quoin/node-rc');
    const packageJson = require('./package.json');
    const config = rc(packageJson.name, {});

You can also add values to be merged after the config file has been loaded:

    const config = rc(packageJson.name, {original: 'value'}, {version: '1.0'});

This would allow `version` not to be overwritten by a value set in the config
file.

This module, unlike the `rc` module, will not mutate neither `baseConfig`, nor
`postConfig`.


## Debugging

This library is using [debug](https://www.npmjs.com/package/debug) with the key
`QI:rc`.
