const { Template } = require("../");

var tpl = new Template().render(`
<if condition="typeof abc == 'string'">
    @{abc}
</if>
`, {
    abc: "<p>Hello, World!</p>"
}).then(html => {
    console.log(html);
}).catch(err => {
    console.log(err);
});