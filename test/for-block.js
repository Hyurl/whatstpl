var assert = require("assert");
var Template = require("../").Template;

var tpl = [
    `<for statement="var i in arr">`,
    `    <p>@{arr[i]}</p>`,
    `</for>`
].join("\n");

var locals = {
    arr: ["Hello, World!", "Hi, WhatsTPL!"]
};

var html = [
    `    <p>Hello, World!</p>`,
    `    <p>Hi, WhatsTPL!</p>`
].join("\n");

describe('Handle <for statement="<statement>"></for> block', function () {
    it("should render HTML as expected", function (done) {
        new Template().render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});