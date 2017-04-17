const testHelpers = require('@quoin/node-test-helpers');

const index = require('./index');

const expect = testHelpers.expect;

describe("lib/index", () => {
    it("should be a function with 2 params", () => {
        expect(index).to.be.a('function').to.have.lengthOf(2);
    });

    it("should find normal file", () => {
        const config = index('foo-bar', {});
        expect(config).to.deep.equal({
            found: '.foo-barrc'
        });
    });

    it("should find scoped file", () => {
        const config = index('@foo/bar', {});
        expect(config).to.deep.equal({
            found: '.foo-barrc'
        });
    });

    it("should append", () => {
        const config = index('@foo/bar', {some: 'config'});
        expect(config).to.deep.equal({
            found: '.foo-barrc',
            some: 'config'
        });
    });

    it("should overwrite", () => {
        const config = index('@foo/bar', {found: 'it'});
        expect(config).to.deep.equal({
            found: '.foo-barrc'
        });
    });
});
