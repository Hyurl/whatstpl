const { Template } = require("../");

var tpl = new Template().render(`
<if condition="typeof abc == 'number'">
    '@{abc}' is a number.
    <else>
        '@{abc}' is not a number.
    </else>
</if>
`, {
    abc: "<p>Hello, World!</p>"
}).then(html => {
    console.log(html);
}).catch(err => {
    console.log(err);
});