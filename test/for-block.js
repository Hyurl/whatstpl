const { Template } = require("../");

var tpl = new Template().render(`
<for statement="let item of arr">
    <p>@{item}</p>
</for>
`, {
        arr: ["Hello, World!", "Hi, WhatsTPL"]
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });