var assert = require("assert");
var Template = require("../").Template;

var tpl = [
    `<block name="my-block" params="arr">`,
    `    <for statement="var i in arr">`,
    `        <p>@{arr[i]}</p>`,
    `    </for>`,
    `</block>`,
    '',
    `<my-block data="arr"></my-block>`
].join("\n");

var locals = {
    arr: ["Hello, World!", "Hi, WhatsTPL!"]
};

var html = [
    `        <p>Hello, World!</p>`,
    `        <p>Hi, WhatsTPL!</p>`
].join("\n");

describe('Handle user-defined block', function () {
    it("should render HTML as expected", function (done) {
        new Template().render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});