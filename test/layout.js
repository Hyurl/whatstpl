const { Template } = require("../");

var tpl = new Template(__dirname + "/test.html").render(`
<layout file="./layout"/>
<p>This is the content of the body.</p>
`, {
        title: "WhatsTPL Test"
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });