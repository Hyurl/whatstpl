var assert = require("assert");
var Template = require("../").Template;

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

describe('Handle <if condition="<condition>"></if> block', function () {
    it("should render HTML as expected", function (done) {
        new Template().render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});