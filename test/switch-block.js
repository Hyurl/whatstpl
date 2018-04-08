const { Template } = require("../");

var tpl = new Template().render(`
<switch target="typeof abc">
    <case data="'string'">
        '@{abc}' is a string.
    </case>
    <case data="'number'">
        '@{abc}' is a number.
    </case>
    <default>
        '@{abc}' is not a/an @{typeof abc}.
    </default>
</switch>
`, {
        abc: "<p>Hello, World!</p>"
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });