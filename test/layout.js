var assert = require("assert");
var Template = require("../").Template;
var fs = require("fs");

var content = '<p>This is the content of the body.</p>';
var tpl = [
    `<layout file="./layout"/>`,
    content
].join("\n");

var locals = {
    title: "WhatsTPL Test"
};

var html = fs.readFileSync(__dirname + "/layout.html", "utf8")
    .replace("@{ __contents }", content).replace(/\r\n|\r/g, "\n");

describe('Handle <layout file="<filename>"/> tag', function () {
    it("should render HTML as expected", function (done) {
        new Template(__dirname + "/test.html").render(tpl, locals).then(function (result) {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});