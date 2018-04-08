# WhatsTPL

**一个扩展 HTML 的模板编程语言。** ([English](./README.md))

## 简介

WhatsTPL 是一个 HTML 预处理模板引擎，这个包是它的一个 JavaScript 实现。

## WhatsTPL 长什么样？

WhatsTPL 扩展了原生的 HTML，它并不改变人们编写 HTML 文档的方式，但是在 HTML 的基础
上，WhatsTPL 为语言增加了更多有实际含义的标签，它们可以被用来实现编程目的。

一个 WhatsTPL 文件应该以 `.html`、`.htm`、`.xhtml` 或 `.tpl` 作为其文件扩展名。

### 新引进的标签

下面的表格列出了默认添加到 WhatsTPL 的标签列表：

名称 | 形式 
-----|--------
`layout` | `<layout file="<filename>"/>`
`import` | `<import[ target="<block-name>"] file|from="<filename>"/>`
`export` | `<export target="<block-names>"/>`
`block` | `<block name="<name>"[ export][ async][ params="<params>"]></block>`
`if` | `<if condition="<condition>"></if>`
`else-if` | `<else-if condition="<condition>"></else-if>`
`else` | `<else></else>`
`switch` | `<switch target="<target>"></switch>`
`case` | `<case data="<data>"></case>`
`default` | `<default></default>`
`for` | `<for statement="<statement>"></for>`
`while` | `<while condition="<condition>"></while>`
`do` | `<do while="<condition>"></do>`
`break` | `<break/>`
`continue` | `<continue/>`

除此之外，WhatsTPL 同时增强了 `<script>` 标签的功能，当该元素和一个 `engine` 属性
且其值为 `whatstpl` 同时出现时，例如 
`<script engine="whatstpl"> console.log(abc) </script>`，在脚本中的代码段，并
不会在浏览器中运行，而是会被当作原生代码编译到程序中，然后在编译出来的函数被调用时被
执行。

同时，你也可以定义你自己特制的标签，使用一个 `<block></block>` 元素即可做到。你可以
在块中嵌套任何深度、任何合法的标签和代码，它将会被编译成一个函数，然后可以在你使用
`name` 属性中所设置的值作为标签时被调用。请看下面这个例子：

```html
<block name="my-block" params="abc">
    <if condition="typeof abd == 'string'">
        The argument passed is string: @{abc}.
        <else>
            The argument passed is a @{typeof abc}.
        </else>
    </if>
</block>

<my-block data="'Hello, World!'"/>
```

### 输出表达式

总共有三种用于输出表达式的形式，`@{var}` (正常输出)、`#{var}` (过滤后输出)，以及 
`!{var}` (不输出，通常用于简单计算)。

`@{var}` 会输出所指定变量的原始字符串表示，而 `#{var}` 则会在输出之前去掉任何 HTML 
标记。

在下面的例子中，`abc` 被赋值为 `<p>Hello, World!</p>`：

```html
@{abc} <!-- => <p>Hello, World!</p> -->
#{abc} <!-- => Hello, World! -->
!{abc} <!-- nothing will be outputed -->
```

需要注意的是，你只可以在普通 HTML 元素中使用这些语法，你不该也不能将它们使用在用于
执行的代码块标签的属性中。`<p id="${id}">...</p>` 是可正确的姿势，而 
`<if condition="${id}">...</if>` 则是错误的，请始终使用 
`<if condition="id">...</if>` 的方式。

### 导入和导出

你可以导入和导出组件，从一个模板到另一个模板中，这里有亮总方式来进行导入，一种是仅导入
指定的用户自定义的块组件，而另一种则是导入模板中全部输出的内容。

这个示例仅 从 `component.html` 中导入 `<my-block></my-block>`：

```html
<import target="my-block" from="./component" />
```

而这个示例则导入 `header.html` 中所有输出的内容：

```html
<import file="./header" />
```

导出组件也是非常简单的，你只需要在定义新的块元素时设置 `export` 属性，就像下面这样：

```html
<block name="my-block" params="abc" export> ... </block>
```

或者如果你不设置这个属性，你也可以使用 `<export>` 标签来一次性导出一个或多个块的名称。

```html
<export target="my-block" />
```

`<import>` 和 `<export>` 是非常类似于 JavaScript 中的 `import` 和 `export` 的，
因此你也可以使用 `as` 语法来设置新的名字。

### 布局

在 TPL 中的布局，和编程语言中的 `extends` 非常相似，但它们却在表现上有所不同，布局
更像是嵌套的组件。WhatsTPL 使用 `<layout>` 标签来允许你嵌套当前模板的输出内容到另
一个父膜板中，就像这样：

```html
<layout file="./layout" />
```

然后在 `layout.html` 中，使用魔术变量 `__contents` 来附上内部的内容（使用 `@{}` 而
非 `#{}`），就像这样：

```html
<body>
    @{ __contents }
</body>
```

`<layout>` 和 `<import>` (设置了 `target`) 都应该放在模板内容的最顶端，虽然这不是
必需的。与 JavaScript 的 `extends` 只允许你继承一个父类不同，`<layout>` 标签允许你
粘附多个父模板，只需要使用改标签多次即可，所有父模板都将会按照设置顺序依次附上。

### 注释

WhatsTPL 似乎用原生的 HTML 注释，也就是 `<!-- -->`，一旦某段内容被这个标记所包裹，
那当编译时，它们将会被忽略或者被移除。

### 错误栈追踪

WhatsTPL 在内部使用了 Source Map，因此当任何错误发生时，它将能够提供关于模板的正确
信息。

## 环境支持

WhatsTPL 同时可以被运行在 NodeJS 和浏览器上，当在浏览器中，导入的模板将会通过 Ajax 
被自动下载。

在 NodeJS 中，像下面这样导入 WhatsTPL：

```javascript
const whatstpl = require("whatstpl");

var locals = { abc: "Hello, World!" };

whatstpl.Template.renderFile("index.html", locals).then(html => {
    console.log(html);
});
```

而在浏览器中，则使用全局变量 `whatstpl`：

```javascript
var locals = { abc: "Hello, World!" };

whatstpl.Template.renderFile("index.html", locals).then(html => {
    document.write(html);
});
```

## API

这个包仅包含了一个类：`Template`。

### `Template`

- `new Template(filename?: string, encoding?: string)` `encoding` 用于 
    NodeJS `fs.readFile()` 来读取文件，`utf8` 为默认值。
- `new Template(filename?: string, options?: CompileOption)` `CompileOption` 
    是一个 TypeScript 接口，它包含:
    - ` encoding?: string`
    - `cache?: boolean` 编译后的函数是否应该被缓存到内存中，默认为 `false`。
    - `removeComments?: boolean` 是否应该在编译时移除注释。
    - `timeout?: number` 当程序运行在浏览器并通过 Ajax 加载远程模块时中时使用，
        默认值为 `5000` 毫秒。
- `Template.prototype.render(tpl: string, locals?: Variables): Promise<string>`
    渲染给定的模板内容 `Variables` 相当于 `{ [name: string]: any }`.
- `Template.renderFile(filename?: string, locals?: Variables, encoding?: string): Promise<string>`
- `Template.renderFile(filename?: string, locals?: Variables, options?: CompileOption): Promise<string>`
    渲染指定文件的静态版本方法。
- `Template.prototype.compile(tpl: string): Promise<Renderer>` 编译给定的模板
    内容。 `Renderer` 是一个函数 `(locals?: { [name: string]: any }) => string`.
- `Template.compileFile(filename: string, encoding?: string): Promise<Renderer>`
- `Template.compileFile(filename: string, options: CompileOption): Promise<Renderer>`
    编译指定文件的静态版本方法。

### Example

```javascript
const fs = require("fs");

var filename = "index.html";
var locals = { abc: "Hello, World!" };
var options = { cache: true };

var template = new Template(filename, options);

// since `cache` is set to true, no matter how many time you compile, 
// the template won't be re-parsed again once it's been parsed.
fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        template.render(data, locals).then(html => {
            console.log(html);
        });
    }
});

// This example acts the same:
Template.renderFile(filename, locals, options).then(html => {
    console.log(html);
}).catch(err => {
    console.log(err);
});
```

传递到构造函数或者静态方法中的文件名必须包含文件扩展名，而在模板中，`<import>` 和 
`<layout>` 则可以将其忽略，程序会自动地加上它。

建议在传入文件名到构造函数或者静态方法中时使用绝对路径，否则程序会尝试根据当前工作
目录来处理路径。

### 模板中被保留的变量名

当编译模板时，程序会自动地设置一些变量以供编译时使用，或者提高用户体验，这些变量名是
被保留地，当传递 `locals` 对象时，请确保你没有将它们作为属性设置。

- `require` 用于导入文件的函数。
- `__filename` 当前的模板文件名。
- `__dirname` 当前文件的所在目录。
- `__locals` 一个指向 `locals` 的引用。
- `__escape` 一个用于过滤 HTML 标签的函数，当使用 `#{}` 时调用。
- `__contents` 携带着内部模板的输出内容，在当前模板被当作布局模板使用时。

#### 更多关于 `require()` 的细节

虽然编译后的函数使用 `require()` 函数，像 NodeJS 那样，但它却不真的进行文件加载，而
仅仅只是在缓存数据中查找内容，文件将会在编译器执行到任何 `<import>` 和 `<layout>` 
标签时被提前加载进来。

WhatsTPL 在内部中也将模板当作模块来处理，如同 NodeJS，但它们实际上的行为是不一样的，
因此出于避免冲突的考虑，`module` 和 `exports` 对象是不传递到模板中的（但 `this`，
其值和 `exports` 相等，则会）。

## 编辑器语法高亮和类型提示

WhatsTPL 使用 HTML 语法，因此它默认已经被现代编辑器所支持，但在一些细节上，例如 
`@{}` 和属性值，现在还没有能够正确的高亮，一个特定的编辑器工具正在路上。