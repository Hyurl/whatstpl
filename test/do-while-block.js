var assert = require("assert");
var Template = require("../").Template;

var tpl = [
    '!{var i = 0}',
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

describe('Handle <do while="<condition>"></do> block', function () {
    it("should render HTML as expected", function (done) {
        new Template().render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});