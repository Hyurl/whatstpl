const assert = require("assert");
const { Template } = require("../");

var tpl = [
    '<for statement="let i in arr">',
    '    <if condition="i == 5">',
    '        <break/>',
    '    </if>',
    '    <p>@{ arr[i] }</p>',
    '</for>',
].join("\n");

var locals = {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
};

var html = [
    '    <p>1</p>',
    '    <p>2</p>',
    '    <p>3</p>',
    '    <p>4</p>',
    '    <p>5</p>',
].join("\n");

describe("Handle <break> tag", () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});