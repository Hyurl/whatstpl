const { Template } = require("../");

var tpl = new Template().render(`
!{let i = 0}
<while condition="i < arr.length">
    <p>@{ arr[i] }</p>
    !{ i++ }
</while>
`, {
        arr: ["Hello, World!", "Hi, WhatsTPL"]
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });