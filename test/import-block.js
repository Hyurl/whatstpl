const { Template } = require("../");

var tpl = new Template(__dirname + "/test.html").render(`
<import target="my-block" from="./my-block"/>
<my-block data="arr"/>
`, {
        arr: ["Hello, World!", "Hi, WhatsTPL"]
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });