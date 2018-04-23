const assert = require("assert");
const { Template } = require("../");

var tpl = [
    `<if condition="typeof abc == 'number'">`,
    `    '@{abc}' is a number.`,
    `    <else-if condition="typeof abc == 'string'">`,
    `        '@{abc}' is a string.`,
    `    </else-if>`,
    `    <else>`,
    `        '@{abc}' is a/an @{typeof abc}.`,
    `    </else>`,
    `</if>`
].join("\n");

var locals = {
    abc: "<p>Hello, World!</p>"
};

var html = [
    `        '<p>Hello, World!</p>' is a string.`
].join("\n");

describe('Handle <else-if condition="<condition>"></else-if> block', () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});