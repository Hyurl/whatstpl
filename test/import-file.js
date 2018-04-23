const assert = require("assert");
const { Template } = require("../");
const fs = require("fs");

var content = '<p>This is the content of the body.</p>';
var tpl = [
    `<import file="./header"/>`,
    content,
    `<import file="./footer"/>`
].join("\n");

var locals = {
    title: "WhatsTPL Test",
    year: new Date().getFullYear()
};

var header = fs.readFileSync(__dirname + "/header.html", "utf8")
    .replace(/@\{title\}/g, locals.title);
var footer = fs.readFileSync(__dirname + "/footer.html", "utf8")
    .replace("@{year}", locals.year);
var html = (header + "\n" + content + "\n" + footer)
    .replace(/\r\n|\r|\n\n/g, "\n");

describe('Handle <import file="<filename>"/> tag', () => {
    it("should render HTML as expected", (done) => {
        new Template(__dirname + "/test.html").render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});