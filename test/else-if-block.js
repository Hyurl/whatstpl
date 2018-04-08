const { Template } = require("../");

var tpl = new Template().render(`
<if condition="typeof abc == 'number'">
    '@{abc}' is a number.
    <else-if condition="typeof abc == 'string'">
        '@{abc}' is a string.
    </else-if>
    <else>
        '@{abc}' is a/an @{typeof abc}.
    </else>
</if>
`, {
    abc: "<p>Hello, World!</p>"
}).then(html => {
    console.log(html);
}).catch(err => {
    console.log(err);
});