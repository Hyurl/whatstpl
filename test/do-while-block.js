const assert = require("assert");
const { Template } = require("../");

var tpl = [
    '!{let i = 0}',
    '<do while="i < arr.length">',
    '    <p>@{ arr[i] }</p>',
    '    !{ i++ }',
    '</do>'
].join("\n");

var locals = {
    arr: ["Hello, World!", "Hi, WhatsTPL"]
};

var html = [
    '    <p>Hello, World!</p>',
    '    <p>Hi, WhatsTPL</p>'
].join("\n");

describe('Handle <do while="<condition>"></do> block', () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});