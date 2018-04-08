# WhatsTPL

**A template programing language extends HTML.** ([中文](./README.zh-CN.md))

## Intro

WhatsTPL is an HTML preprocessing engine, this package is a JavaScript 
implementation of it.

## What does it look like of WhatsTPL?

WhatsTPL extends the native HTML, it doesn't change the way of how people 
writing HTML documents, but base on HTML, WhatsTPL adds more meaningful tags 
to the language， which can be used for programming.

A WhatsTPL file should be suffixed with `.html`, `.htm`, `.xhtml` or `.tpl` as
its extension name.

### New tags introduced

Bellow is the table lists the default tags added to WhatsTPL:

Name | Format 
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

Apart from these, WhatsTPL also enhances the ability of the `<script>` tag, 
when the element is with an `engine` attribute which the value is `whatstpl`, 
e.g. `<script engine="whatstpl"> console.log(abc) </script>`, the snippet in 
this script, instead of running in the browser, it will be compiled as native 
code in the program, and run when the compiled function is called.

Also, you can define your own specific tags, using a `<block></block>` element
to do so. You can nest any depth, any legal tags and code in it, it will be 
compiled as a function, and can be called when you use the value defined in 
attribute `name` as a new tag. Look at this example:

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

### Output expression

There are three styles of the output expression, `@{var}` (normal output), 
`#{var}` (escaped output), and `!{var}` (no output, usually for simple 
calculation).

`@{var}` will output the raw string representation of the given variable or 
statement, while `#{var}` will strip any HTML tags before output.

In the following example, `abc` is assigned to value `<p>Hello, World!</p>`:

```html
@{abc} <!-- => <p>Hello, World!</p> -->
#{abc} <!-- => Hello, World! -->
!{abc} <!-- nothing will be outputed -->
```

Be aware, you can only use these syntax in ordinary HTML elements, you 
shouldn't and couldn't use them in the attributes of the code block tags。 
`<p id="${id}">...</p>` is acceptable, but `<if condition="${id}">...</if>` 
is incorrect, always use `<if condition="id">...</if>` instead.

### Import and Export

You can import and export components from one template to another, there are 
two way to import, one is to import only specific user-defined blocks, and 
the other is to import all the output contents.

This example will only import `<my-block></my-block>` from `component.html`:

```html
<import target="my-block" from="./component" />
```

And this example will input all output contents from `header.html`:

```html
<import file="./header" />
```

Exports components is simple too, just set the attribute `export` when you 
define a new block, just like this:

```html
<block name="my-block" params="abc" export> ... </block>
```

Or if you don't set this attribute, you can use the `<export>` tag to export 
one or several block names all at once.

```html
<export target="my-block" />
```

`<import>` and `<export>` are very similar to JavaScript `import` and `export`,
so you could use `as` syntax to set a new names as well.

### Layout

Layout in TPL, is very similar to `extends` in programing language, but they 
somehow act differently, layout is much like nested components. WhatsTPL 
uses `<layout>` tag to let you nest the output contents of the current 
template to another parent template, just like this:

```html
<layout file="./layout" />
```

And in `layout.html`, uses the magic variable `__contents` to attach the 
inner contents (uses `@{}`, not `#{}`), just like this:

```html
<body>
    @{ __contents }
</body>
```

Both `<layout>` and `<import>` (with `target`) should be put at the very top 
of the template contents, though they're not necessary. Unlike JavaScript 
`extends` that only allows you inheriting from one parent class, the `<layout>`
tag allows you attach several parent templates, just use the tag multiple 
times, and the parents will be attached accordingly.

### Comments

WhatsTPL uses native HTML comments, that is `<!-- -->`, once the content is 
wrapped by this tag, they will ignored when compiling, or being stripped.

### Error stack trace

WhatsTPL uses source map internally, so when any error occurs, it should provide the correct information of the template.

## Environment supports

WhatsTPL can be run both in NodeJS and browsers, when in browsers, imported 
files are auto-downloaded via Ajax.

In NodeJS, import WhatsTPL as the following:

```javascript
const whatstpl = require("whatstpl");

var locals = { abc: "Hello, World!" };

whatstpl.Template.renderFile("index.html", locals).then(html => {
    console.log(html);
});
```

And in the browser, uses the global variable `whatstpl` instead:

```javascript
var locals = { abc: "Hello, World!" };

whatstpl.Template.renderFile("index.html", locals).then(html => {
    document.write(html);
});
```

## API

This package only contains one class, the `Template`.

### `Template`

- `new Template(filename?: string, encoding?: string)` the `encoding` is for 
    NodeJS `fs.readFile()` to read files, `utf8` by default.
- `new Template(filename?: string, options?: CompileOption)` `CompileOption` 
    is a TypeScript interface that contains:
    - ` encoding?: string`
    - `cache?: boolean` Whether the compiled function should be cached in 
        memory, `false` by default.
    - `removeComments?: boolean` Whether or not to remove the comments when 
        compiling.
    - `timeout?: number` Used when the program is run in a browser and load 
        remote template via Ajax, `5000` ms by default.
- `Template.prototype.render(tpl: string, locals?: Variables): Promise<string>`
    Renders the given template contents. `Variables` is equal to 
    `{ [name: string]: any }`.
- `Template.renderFile(filename?: string, locals?: Variables, encoding?: string): Promise<string>`
- `Template.renderFile(filename?: string, locals?: Variables, options?: CompileOption): Promise<string>`
    Static version to render a given file.
- `Template.prototype.compile(tpl: string): Promise<Renderer>` Compiles the 
    given template contents. The `Renderer` is a function 
    `(locals?: { [name: string]: any }) => string`.
- `Template.compileFile(filename: string, encoding?: string): Promise<Renderer>`
- `Template.compileFile(filename: string, options: CompileOption): Promise<Renderer>`
    Static version to compile a given file.

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

The filename passed to the constructor or static methods must contains the 
extension name, while in templates, `<import>` and `<layout>` could omit it, 
the program will automatically add it.

It is recommended to pass the filename to the constructor or static methods an 
absolute path, or the program will try to resolve the path according to the 
current working directory.

### Reserved variables in the template

When compiling the template, the program automatically sets several variables 
for compiling needs and user experience, these variables are reserved, when 
passing the `locals` object, make sure you don't set them as properties.

- `require` a function used to import files.
- `__filename` The current template filename.
- `__dirname` The current directory path of the file.
- `__locals` A reference to `locals`.
- `__escape` A function to escape HTML tags when using `#{}` syntax.
- `__contents` Carries the inner contents when the current template is used 
    as a layout template.

#### More details about `require()`

Though the compiled function uses `require()`, like NodeJS, but it doesn't do 
file importing actually, it just searches for cached data, files will be 
pre-imported when compiler walks to any `<import>` or `<layout>` tags.

WhatsTPL also treats templates as modules like NodeJS internally, but they act
very differently, so for conflict concerns, `module` and `exports` are not 
passed to the template (but the `this`, which equals to `exports`, is).

## Editor syntax highlight and type lint

WhatsTPL uses HTML syntax, so it's already supported by modern editors, but in
some details like `@{}` and attribute values are not highlighted for now, a 
specific editor tool is on the route.