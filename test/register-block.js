const assert = require("assert");
const { Template, Module } = require("../");

Template.register(__dirname + "/~whatstpl1.html", `
<block name="my-block" params="arr" export>
    <for statement="let item of arr">
        <p>@{item}</p>
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

describe('Handle Template.register()', () => {
    it("should register template and render HTML as expected", (done) => {
        new Template(__dirname + "/test.html").render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});