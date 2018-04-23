const assert = require("assert");
const { Template } = require("../");

var tpl = [
    `<if condition="typeof abc == 'string'">`,
    `    @{abc}`,
    `</if>`
].join("\n");

var locals = {
    abc: "<p>Hello, World!</p>"
};

var html = [
    `    <p>Hello, World!</p>`
].join("\n");

describe('Handle <if condition="<condition>"></if> block', () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});