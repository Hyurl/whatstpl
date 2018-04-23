const assert = require("assert");
const { Template } = require("../");

var tpl = [
    `<block name="my-block" params="arr">`,
    `    <for statement="let item of arr">`,
    `        <p>@{item}</p>`,
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

describe('Handle user-defined block', () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});