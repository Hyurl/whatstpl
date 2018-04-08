const { Template } = require("../");

var tpl = new Template().render(`
<for statement="let i in arr">
    <if condition="i == 5">
        <break/>
    </if>
    <p>@{ arr[i] }</p>
</for>
`, {
        arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    }).then(html => {
        console.log(html);
    }).catch(err => {
        console.log(err);
    });