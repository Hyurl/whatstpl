const assert = require("assert");
const { Template } = require("../");

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

describe('Handle <import target="<block-name>" from="<filename>"/> tag', () => {
    it("should render HTML as expected", (done) => {
        new Template(__dirname + "/test.html").render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});