const { Template } = require("../");

var tpl = new Template().render(`
<block name="my-block" params="arr">
    <for statement="let item of arr">
        <p>@{item}</p>
    </for>
</block>

<my-block data="arr"></my-block>
`, {
        arr: ["Hello, World!", "Hi, WhatsTPL"]
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });