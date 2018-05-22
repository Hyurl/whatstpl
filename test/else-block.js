var assert = require("assert");
var Template = require("../").Template;

var tpl = [
    `<if condition="typeof abc == 'number'">`,
    `    '@{abc}' is a number.`,
    `    <else>`,
    `        '@{abc}' is not a number.`,
    `    </else>`,
    '</if>'
].join("\n");

var locals = {
    abc: "<p>Hello, World!</p>"
};

var html = [
    `        '<p>Hello, World!</p>' is not a number.`
].join("\n");

describe("Handle <else></else> block", function () {
    it("should render HTML as expected", function (done) {
        new Template().render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});