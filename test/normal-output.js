const assert = require("assert");
const { Template } = require("../");

var tpl = "@{abc}";
var locals = {
    abc: "<p>Hello, World!</p>"
};
var html = "<p>Hello, World!</p>";

describe("Handle normal output", () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});