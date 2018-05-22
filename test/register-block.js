var assert = require("assert");
var Template = require("../").Template;

Template.register(__dirname + "/~whatstpl1.html", `
<block name="my-block" params="arr" export>
    <for statement="var i in arr">
        <p>@{arr[i]}</p>
    </for>
</block>
`);

var tpl = [
    `<import target="my-block" from="~whatstpl1.html"/>`,
    `<my-block data="arr" />`
].join("\n");

var locals = {
    arr: ["Hello, World!", "Hi, WhatsTPL!"]
};

var html = [
    `        <p>Hello, World!</p>`,
    `        <p>Hi, WhatsTPL!</p>`
].join("\n");

describe('Handle Template.register()', function () {
    it("should register template and render HTML as expected", function (done) {
        new Template(__dirname + "/test.html").render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});