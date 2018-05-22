var assert = require("assert");
var Template = require("../").Template;

var tpl = "!{abc}";
var locals = {
    abc: "<p>Hello, World!</p>"
};
var html = "";

describe("Handle no output", function () {
    it("should render HTML as expected", function (done) {
        new Template().render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});