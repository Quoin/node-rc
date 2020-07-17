const testHelpers = require('@quoin/node-test-helpers');

const moduleToTest = require('./index');

const { expect } = testHelpers;

const index = (name, baseConfig, postConfig) => {
  // Some how, mocha injects some variables, so let's take them out.
  const config = moduleToTest(name, baseConfig, postConfig);

  if (global.it) {
    // This seems to be added by mocha with a bunch of others.
    delete config.diff;
    delete config.extension;
    delete config.opts;
    delete config.package;
    delete config.reporter;
    delete config.slow;
    delete config.timeout;
    delete config.ui;
  }

  return config;
};

describe('lib/index', () => {
  it('should be a function with 3 params', () => {
    expect(index).to.be.a('function').to.have.lengthOf(3);
  });

  describe('baseConfig', () => {
    it('should not mutate `baseConfig`', () => {
      const baseConfig = { a: 'b' };
      index('@foo/bar', baseConfig);
      expect(baseConfig).to.deep.equal({ a: 'b' });
    });

    it('should find normal file', () => {
      const config = index('foo-bar', {});
      expect(config).to.deep.equal({
        found: '.foo-barrc',
        sub: {
          subFoo: 'subBar',
        },
      });
    });

    it('should find scoped file', () => {
      const config = index('@foo/bar', {});
      expect(config).to.deep.equal({
        found: '.foo-barrc',
        sub: {
          subFoo: 'subBar',
        },
      });
    });

    it('should append', () => {
      const config = index('@foo/bar', { some: 'config' });
      expect(config).to.deep.equal({
        found: '.foo-barrc',
        some: 'config',
        sub: {
          subFoo: 'subBar',
        },
      });
    });

    it('should overwrite', () => {
      const config = index('@foo/bar', { found: 'it' });
      expect(config).to.deep.equal({
        found: '.foo-barrc',
        sub: {
          subFoo: 'subBar',
        },
      });
    });
  });

  describe('postConfig', () => {
    it('should not mutate `postConfig`', () => {
      const postConfig = { abc: 'def' };
      index('@foo/bar', { found: 'it' }, postConfig);
      expect(postConfig).to.deep.equal({ abc: 'def' });
    });

    it('should keep old keys when undefined', () => {
      const config = index('@foo/bar', { found: 'it' }, { sub: undefined });
      expect(config).to.deep.equal({
        found: '.foo-barrc',
        sub: {
          subFoo: 'subBar',
        },
      });
    });

    it('should add to sub', () => {
      const config = index('@foo/bar', { found: 'it' }, {
        sub: {
          foo: 'bar',
        },
      });
      expect(config).to.deep.equal({
        found: '.foo-barrc',
        sub: {
          subFoo: 'subBar',
          foo: 'bar',
        },
      });
    });

    it('should replace sub.subFoo', () => {
      const config = index('@foo/bar', { another: 'thing' }, {
        sub: {
          subFoo: 'new-value',
        },
      });
      expect(config).to.deep.equal({
        another: 'thing',
        found: '.foo-barrc',
        sub: {
          subFoo: 'new-value',
        },
      });
    });
  });
});
