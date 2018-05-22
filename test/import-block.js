var assert = require("assert");
var Template = require("../").Template;

var tpl = [
    `<import target="my-block" from="./my-block"/>`,
    `<my-block data="arr"/>`
].join("\n");

var locals = {
    arr: ["Hello, World!", "Hi, WhatsTPL!"]
};

var html = [
    `        <p>Hello, World!</p>`,
    `        <p>Hi, WhatsTPL!</p>`
].join("\n");

describe('Handle <import target="<block-name>" from="<filename>"/> tag', function () {
    it("should render HTML as expected", function (done) {
        new Template(__dirname + "/test.html").render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});