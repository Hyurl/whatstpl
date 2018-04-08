const { Template } = require("../");

var tpl = new Template().render(`
!{let i = 0}
<do while="i < arr.length">
    <p>@{ arr[i] }</p>
    !{ i++ }
</do>
`, {
        arr: ["Hello, World!", "Hi, WhatsTPL"]
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });