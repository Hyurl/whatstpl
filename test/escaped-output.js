const { Template } = require("../");

var tpl = new Template().render(`#{abc}`, {
    abc: "<p>Hello, World!</p>"
}).then(html => {
    console.log(html);
}).catch(err => {
    console.log(err);
});