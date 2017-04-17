# @quoin/node-rc

This is a wrapper library for the [rc](https://www.npmjs.com/package/rc) because
it doesn't handle properly scoped modules.

This library apply the same logic as `npm pack` is doing.

## Usage

    npm install --save @quoin/node-rc

    const rc = require('@quoin/node-rc');
    const packageJson = require('./package.json');
    const config = rc(packageJson.name, {});

## Debugging

This library is using [debug](https://www.npmjs.com/package/debug) with the key
`QI:rc`.
