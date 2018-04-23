const assert = require("assert");
const { Template } = require("../");

var tpl = [
    `<switch target="typeof abc">`,
    `    <case data="'string'">`,
    `        '@{abc}' is a string.`,
    `    </case>`,
    `    <case data="'number'">`,
    `        '@{abc}' is a number.`,
    `    </case>`,
    `    <default>`,
    `        '@{abc}' is not a/an @{typeof abc}.`,
    `    </default>`,
    `</switch>`
].join("\n");

var locals = {
    abc: "<p>Hello, World!</p>"
};

var html = [
    `        '<p>Hello, World!</p>' is a string.`
].join("\n");

describe('Handle <switch target="<target>"></switch> block', () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});