const assert = require("assert");
const { Template } = require("../");

var tpl = [
    '<for statement="let i in arr">',
    '    <if condition="i < 5">',
    '        <continue/>',
    '    </if>',
    '    <p>@{ arr[i] }</p>',
    '</for>',
].join("\n");

var locals = {
    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
};

var html = [
    '    <p>6</p>',
    '    <p>7</p>',
    '    <p>8</p>',
    '    <p>9</p>',
    '    <p>0</p>',
].join("\n");

describe("Handler <continue> tag", () => {
    it("should render HTML as expected", (done) => {
        new Template().render(tpl, locals).then(result => {
            assert.equal(result, html);
        }).then(done).catch(done);
    });
});
