const { Template } = require("../");

var tpl = new Template(__dirname + "/test.html").render(`
<import file="./header"/>
<p>This is the content of the body.</p>
<import file="./footer"/>
`, {
        title: "WhatsTPL Test"
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });