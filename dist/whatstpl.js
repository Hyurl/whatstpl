(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["whatstpl"] = factory();
	else
		root["whatstpl"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/whatstpl-toolkit/dist/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/whatstpl-toolkit/dist/errors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class UnclosedTagError extends SyntaxError {
    constructor(message, filename, line, column) {
        super(message);
        this.filename = filename;
        this.line = line;
        this.column = column;
    }
}
exports.UnclosedTagError = UnclosedTagError;
//# sourceMappingURL=errors.js.map

/***/ }),

/***/ "./node_modules/whatstpl-toolkit/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/whatstpl-toolkit/dist/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./errors */ "./node_modules/whatstpl-toolkit/dist/errors.js"));
__export(__webpack_require__(/*! ./parser */ "./node_modules/whatstpl-toolkit/dist/parser.js"));
__export(__webpack_require__(/*! ./utils */ "./node_modules/whatstpl-toolkit/dist/utils.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/whatstpl-toolkit/dist/parser.js":
/*!******************************************************!*\
  !*** ./node_modules/whatstpl-toolkit/dist/parser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/whatstpl-toolkit/dist/errors.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/whatstpl-toolkit/dist/utils.js");
const AttrRe = /([0-9a-zA-Z:\-]+)\s*=\s*|([0-9a-zA-Z:\-]+)\s*/;
class Parser {
    constructor(filename = "") {
        this.listeners = {};
        this.outputTags = Parser.OutputTags;
        this.blockTags = Parser.BlockTags;
        if (filename)
            this.filename = utils_1.getAbsPath(filename);
        else
            this.filename = "undefined";
        this.renewRegExp();
        this.on("block", (node) => {
            let attrs = node.attributes;
            if (node.tag == "block") {
                this.blockTags.push(attrs.name.value);
                this.renewRegExp();
            }
            else if (node.tag == "import" && attrs.target && attrs.target.value) {
                let tags = attrs.target.value.split(/,\s*/);
                for (let i in tags) {
                    let pair = tags[i].split(/\s+as\s+/);
                    tags[i] = pair[1] || pair[0];
                }
                this.blockTags = this.blockTags.concat(tags);
                this.renewRegExp();
            }
        });
    }
    renewRegExp() {
        let tagStr = this.blockTags.join("|");
        let pattern = "<!--(.*?)-->|<!--(.*)|("
            + this.outputTags.join("|")
            + ")\{(.+?)\}|<("
            + tagStr
            + ")[\\s|\\/|>]|<\\/("
            + tagStr
            + ")>";
        this.regexp = new RegExp(pattern);
    }
    on(event, listener) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(listener);
    }
    emit(event, ...args) {
        if (!this.listeners[event] || !this.listeners[event].length)
            return false;
        for (let listener of this.listeners[event]) {
            listener(...args);
        }
        return true;
    }
    parse(html) {
        let root = {
            tag: "root",
            type: "root",
            line: 1,
            column: 1,
            contents: [],
            closed: false
        };
        this.html = html.trimRight().replace(/\r\n|\r/g, "\n");
        this.parseHtml(this.html, 1, 1, root);
        return root;
    }
    getLine(html, line) {
        let lineStr, left;
        while (true) {
            let end = html.indexOf("\n");
            lineStr = (end >= 0 ? html.substring(0, end) : html).trimRight();
            left = end >= 0 ? html.substring(end + 1) : "";
            if (lineStr || !left) {
                break;
            }
            else {
                line += 1;
                html = left;
            }
        }
        return { lineStr, left, line };
    }
    attachTextNode(lineStr, line, column, endIndex, nodes, keepPureSpaces = false) {
        let textNode = {
            type: "text",
            line,
            column,
            contents: endIndex ? lineStr.substring(0, endIndex) : lineStr + "\n",
            closed: true,
        };
        if (keepPureSpaces || textNode.contents.trimLeft()) {
            nodes.push(textNode);
            this.emit("text", textNode);
        }
    }
    parseHtml(html, line, column = 1, parent) {
        let LineInfo = this.getLine(html, line), lineStr = LineInfo.lineStr, matches = lineStr.match(this.regexp), nodes = parent.contents;
        html = LineInfo.left;
        line = LineInfo.line;
        if (!matches) {
            if (parent.tag == "script"
                && parent.attributes.engine
                && parent.attributes.engine.value == Parser.EngineName) {
                let snippetNode = {
                    type: "snippet",
                    line,
                    column,
                    contents: lineStr + "\n",
                    closed: true,
                };
                nodes.push(snippetNode);
                this.emit("snippet", snippetNode);
            }
            else {
                this.attachTextNode(lineStr, line, column, NaN, nodes);
            }
            line += 1;
            column = 1;
        }
        else if (matches[1] && parent.tag != "script") {
            if (matches.index) {
                this.attachTextNode(lineStr, line, column, matches.index, nodes);
                column += matches.index;
            }
            let left = lineStr.substring(matches.index + matches[0].length), commentNode = {
                type: "comment",
                line,
                column,
                contents: matches[0],
                closed: false
            };
            nodes.push(commentNode);
            this.emit("comment", commentNode);
            if (left) {
                html = left + "\n" + html;
                column += matches[0].length;
            }
            else {
                commentNode.contents += "\n";
                line += 1;
                column = 1;
            }
        }
        else if (matches[2] && parent.tag != "script") {
            if (matches.index) {
                this.attachTextNode(lineStr, line, column, matches.index, nodes);
                column += matches.index;
            }
            let commentNode = {
                type: "comment",
                line,
                column,
                contents: lineStr.substring(matches.index),
                closed: false
            };
            line += 1;
            column = 1;
            let res = this.parseComment(html, line, column, commentNode);
            nodes.push(commentNode);
            this.emit("comment", commentNode);
            html = res.left;
            line = res.line;
            column = res.column;
        }
        else if (matches[3] && matches[4]) {
            if (matches.index) {
                this.attachTextNode(lineStr, line, column, matches.index, nodes, matches[3] != "!");
                column += matches.index;
            }
            column += 2;
            let varNode = {
                tag: matches[3],
                type: "var",
                line,
                column,
                contents: matches[4],
                closed: true,
            };
            nodes.push(varNode);
            this.emit("var", varNode);
            let endColumn = matches.index + matches[4].length + 3, left = lineStr.substring(endColumn);
            if (left.trimRight()) {
                html = left + (html ? "\n" + html : "");
                column += matches[4].length + 1;
            }
            else {
                line += 1;
                column = 1;
            }
        }
        else if (matches[5] && parent.tag != "script") {
            if (matches.index) {
                this.attachTextNode(lineStr, line, column, matches.index, nodes);
                column += matches.index;
            }
            let endColumn = matches.index + matches[0].length, ending = lineStr[endColumn - 1], blockNode = {
                tag: matches[5],
                type: "block",
                line,
                column,
                attributes: {},
                contents: [],
                closed: false,
            };
            if (ending == "/" || ending == ">")
                endColumn -= 1;
            let left = lineStr.substring(endColumn);
            if (!left && html) {
                column = 1;
                let LineInfo = this.getLine(html, line);
                if (LineInfo.lineStr) {
                    left = LineInfo.lineStr;
                    html = LineInfo.left;
                }
            }
            if (left) {
                html = left + (html ? "\n" + html : "");
                column += matches[0].length;
            }
            else {
                throw new errors_1.UnclosedTagError("unclosed tag", this.filename, line, column);
            }
            let res = this.applyAttr(html, line, column, blockNode.attributes);
            blockNode.closed = res.blockClosed;
            if (res.left && !blockNode.closed) {
                res = this.parseHtml(res.left, res.line, res.column, blockNode);
            }
            nodes.push(blockNode);
            this.emit("block", blockNode);
            html = res.left;
            line = res.line;
            column = res.column;
        }
        else if (matches[6] && matches[6] == parent.tag) {
            if (matches.index && parent.tag != "script") {
                this.attachTextNode(lineStr, line, column, matches.index, nodes);
            }
            parent.closed = true;
            let endColumn = matches.index + matches[0].length, left = lineStr.substring(endColumn);
            if (left) {
                html = left + (html ? "\n" + html : "");
                column += endColumn;
            }
            else {
                line += 1;
                column = 1;
            }
        }
        else {
            this.attachTextNode(lineStr, line, column, NaN, nodes);
            line += 1;
            column = 1;
        }
        if (html && !parent.closed) {
            return this.parseHtml(html, line, column, parent);
        }
        else {
            parent.closed = true;
            return { line, column, left: html };
        }
    }
    applyAttr(html, line, column, attrs) {
        let LineInfo = this.getLine(html, line), lineStr = LineInfo.lineStr, matches = lineStr.match(AttrRe);
        line = LineInfo.line;
        html = LineInfo.left;
        if (!matches) {
            let i = lineStr.indexOf(">");
            if (i === -1) {
                throw new errors_1.UnclosedTagError("unclosed tag", this.filename, line, column);
            }
            else {
                column += i + 1;
                let left = lineStr.substring(i + 1);
                if (left) {
                    html = left + "\n" + html;
                }
                else {
                    line += 1;
                    column = 1;
                }
            }
            return {
                line,
                column,
                left: html,
                blockClosed: lineStr[i - 1] == "/"
            };
        }
        let name;
        let value;
        let noQuote = true;
        let ending;
        let blockClosed;
        let left;
        let leftIndex = 0;
        if (matches[1]) {
            let pos = matches.index + matches[0].length, quote = lineStr[pos], end;
            noQuote = quote != "'" && quote != '"';
            if (!noQuote)
                pos += 1;
            if (!noQuote) {
                end = lineStr.indexOf(quote, pos);
            }
            else {
                end = lineStr.indexOf("/", pos);
                if (end === -1)
                    end = lineStr.indexOf(">", pos);
            }
            name = matches[1],
                value = end === -1 ? "" : lineStr.substring(pos, end);
            left = lineStr.substring(end + 1);
            column += pos;
        }
        else if (matches[2]) {
            name = value = matches[2].trim();
            left = lineStr.substring(matches.index + matches[0].length);
            column += matches.index;
        }
        ending = left ? left.trimLeft()[0] : "";
        blockClosed = ending == "/";
        attrs[name] = { name, value, line, column };
        if (ending == "/")
            leftIndex = left.indexOf("/>") + 2;
        else if (ending == ">")
            leftIndex = left.indexOf(">") + 1;
        if (leftIndex)
            left = left.substring(leftIndex);
        if (left) {
            html = left + "\n" + html;
            column += (matches[1] ? value.length : matches[0].length)
                + (noQuote ? 0 : 1);
        }
        else {
            line += 1;
            column = 1;
        }
        if (!ending || (ending != ">" && ending != "/")) {
            return this.applyAttr(html, line, column, attrs);
        }
        else {
            if (left)
                column += leftIndex;
            return { line, column, left: html, blockClosed };
        }
    }
    parseComment(html, line, column, commentNode) {
        let LineInfo = this.getLine(html, line), lineStr = LineInfo.lineStr, matches = lineStr && lineStr.match(/-->/);
        line = LineInfo.line;
        html = LineInfo.left;
        if (lineStr)
            commentNode.contents += "\n";
        if (!matches) {
            commentNode.contents += lineStr;
            line += 1;
            column = 1;
            if (html) {
                return this.parseComment(html, line, column, commentNode);
            }
            else {
                return { line, column, left: html };
            }
        }
        else {
            if (matches.index) {
                commentNode.contents += lineStr.substring(0, matches.index);
            }
            commentNode.contents += matches[0];
            commentNode.closed = true;
            column += matches.index + 3;
            let left = lineStr.substring(column);
            if (left) {
                html = left + "\n" + html;
            }
            else {
                line += 1;
                column = 1;
            }
        }
        return { line, column, left: html };
    }
}
Parser.EngineName = "whatstpl";
Parser.BlockTags = [
    "layout",
    "import",
    "export",
    "block",
    "if",
    "else-if",
    "else",
    "switch",
    "case",
    "default",
    "for",
    "while",
    "do",
    "continue",
    "break",
    "script",
];
Parser.OutputTags = [
    "!",
    "@",
    "#",
];
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./node_modules/whatstpl-toolkit/dist/utils.js":
/*!*****************************************************!*\
  !*** ./node_modules/whatstpl-toolkit/dist/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBrowser = typeof window == "object"
    && typeof XMLHttpRequest == "function";
exports.Separator = exports.IsBrowser ? "/" :
    (process.platform == "win32" ? "\\" : "/");
function escape(html) {
    return String(html).replace(/<\/?[^>]*>/g, "");
}
exports.escape = escape;
function dirname(path) {
    if (path == "/")
        return path;
    let i = path.replace(/\\/g, "/").lastIndexOf("/");
    if (i < 0 || path == "/")
        return ".";
    else if (i == path.length - 1)
        return dirname(path.substring(0, i));
    else
        return path.substring(0, i).replace(/\/|\\/g, exports.Separator);
}
exports.dirname = dirname;
function basename(filename, extname = "") {
    let dir = dirname(filename), basename = (dir == "./" && filename.match(/^\.[\/\\]/) == null)
        ? filename : filename.substring(dir.length + 1);
    if (extname) {
        let i = basename.lastIndexOf(extname);
        basename = i >= 0 ? basename.substring(0, i) : basename;
    }
    return basename;
}
exports.basename = basename;
function extname(filename) {
    let baseName = basename(filename), i = baseName.lastIndexOf(".");
    return i >= 0 ? baseName.substring(i) : "";
}
exports.extname = extname;
function normalizePath(path) {
    let parts = path.split(/\/|\\/);
    for (let i = 0; i < parts.length; i++) {
        if (parts[i] == "..") {
            parts.splice(i - 1, 2);
            i -= 2;
        }
        else if (parts[i] == ".") {
            parts.splice(i, 1);
            i -= 1;
        }
    }
    return parts.join(exports.Separator);
}
exports.normalizePath = normalizePath;
function getCwd() {
    if (exports.IsBrowser) {
        return location.protocol + "//" + location.host
            + dirname(location.pathname);
    }
    else {
        return process.cwd();
    }
}
exports.getCwd = getCwd;
function isAbsPath(path) {
    return path[0] == "/" || path.match(/^[a-zA-Z0-9]+:[\/\\]/) != null;
}
exports.isAbsPath = isAbsPath;
function getAbsPath(filename) {
    if (!isAbsPath(filename)) {
        let dir = getCwd(), noSep = dir[dir.length - 1] == "/";
        filename = dir + (noSep ? "" : exports.Separator) + filename;
    }
    return normalizePath(filename);
}
exports.getAbsPath = getAbsPath;
function getObjectValues(obj) {
    let res = [];
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop))
            res.push(obj[prop]);
    }
    return res;
}
exports.getObjectValues = getObjectValues;
function getFunctionBodyOffset(fn) {
    let fnStr = fn.toString(), i = fnStr.indexOf("{") + 1, defArr = fnStr.slice(0, i).split("\n"), inNewLine = fnStr[i] == "\n", column = inNewLine ? 0 : defArr[defArr.length - 1].indexOf("{") + 2, line = inNewLine ? defArr.length : defArr.length - 1;
    return { line, column };
}
exports.getFunctionBodyOffset = getFunctionBodyOffset;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatstpl_toolkit_1 = __webpack_require__(/*! whatstpl-toolkit */ "./node_modules/whatstpl-toolkit/dist/index.js");
const module_1 = __webpack_require__(/*! ./module */ "./src/module.ts");
var fs = null;
if (!whatstpl_toolkit_1.IsBrowser) {
    fs = __webpack_require__(/*! fs */ "fs");
}
exports.CompileOption = {
    encoding: "utf8",
    cache: false,
    removeComments: false,
    timeout: 5000,
    withCredentials: false,
    headers: null
};
class Template {
    constructor(filename = "", options = "utf8") {
        this.currentLine = 0;
        this.importedModuleCount = 0;
        this.layouts = [];
        if (filename)
            this.filename = whatstpl_toolkit_1.getAbsPath(filename);
        else
            this.filename = "undefined";
        if (typeof options == "string")
            options = { encoding: options };
        this.options = Object.assign({}, exports.CompileOption, options);
    }
    /** Renders the given template contents. */
    render(tpl, locals = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let render = yield this.compile(tpl);
            return render(locals);
        });
    }
    static renderFile(filename, locals = null, options = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let render = yield this.compileFile(filename, options);
            return render(locals || {});
        });
    }
    /** Compiles the given template contents. */
    compile(tpl) {
        return __awaiter(this, void 0, void 0, function* () {
            // If the function is already cached, retrieve it instead.
            if (this.options.cache && Template.cache[this.filename]) {
                return Template.cache[this.filename];
            }
            let parser = new whatstpl_toolkit_1.Parser(this.filename), node = parser.parse(tpl), _module = yield this.createModule(node);
            // Wrap the function in a render function, so when it is  called, the 
            // program can catch and re-throw any errors, and only  return the 
            // `default` property (HTML) from the module.
            let render = (locals = {}) => {
                try {
                    return _module.require(this.filename, locals).default.trimRight();
                }
                catch (err) { // replace and re-throw the error.
                    throw module_1.replaceError(err, this.filename);
                }
            };
            if (this.options.cache)
                Template.cache[this.filename] = render;
            return render;
        });
    }
    static compileFile(filename, options = null) {
        return __awaiter(this, void 0, void 0, function* () {
            filename = whatstpl_toolkit_1.getAbsPath(filename);
            // If the function is already cached, retrieve it instead.
            if (options && options.cache && Template.cache[filename]) {
                return Template.cache[filename];
            }
            let tpl = new this(filename, options), html = yield tpl.loadTemplate();
            return tpl.compile(html);
        });
    }
    /**
     * Registers the given template string as a template, and set a temporary
     * filename for importing usage.
     */
    static register(filename, tpl) {
        let tplObj = new this(filename, {
            cache: true
        });
        return tplObj.compile(tpl);
    }
    /** Loads the template contents from the file. */
    loadTemplate() {
        if (!whatstpl_toolkit_1.IsBrowser) {
            return new Promise((resolve, reject) => {
                fs.readFile(this.filename, this.options.encoding, (err, data) => {
                    err ? reject(err) : resolve(data);
                });
            });
        }
        else {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.timeout = this.options.timeout;
                xhr.withCredentials = this.options.withCredentials;
                xhr.open("GET", this.filename, true);
                if (this.options.headers) {
                    for (let name in this.options.headers) {
                        let value = this.options.headers[name];
                        if (Array.isArray(value)) {
                            value = value.join(", ");
                        }
                        else if (typeof value != "string") {
                            if (typeof value.toString == "function")
                                value = value.toString();
                            else
                                value = String(value);
                        }
                        xhr.setRequestHeader(name, value);
                    }
                }
                xhr.onload = () => {
                    resolve(xhr.responseText);
                };
                xhr.onabort = xhr.onerror = xhr.ontimeout = () => {
                    reject(new Error("failed to load remote module."));
                };
                xhr.send();
            });
        }
    }
    /** Gets the absolute path of the filename, if it is relative.  */
    getAbsPath(filename) {
        if (!whatstpl_toolkit_1.isAbsPath(filename)) {
            let dir = this.filename && this.filename != "undefined"
                ? whatstpl_toolkit_1.dirname(this.filename)
                : whatstpl_toolkit_1.getCwd();
            filename = whatstpl_toolkit_1.normalizePath(dir + whatstpl_toolkit_1.Separator + filename);
        }
        // If the extension name is omitted, use the one of the parent file.
        if (!whatstpl_toolkit_1.extname(filename)) {
            filename += whatstpl_toolkit_1.extname(this.filename);
        }
        return filename;
    }
    /** Adds a line of source map to the internal `sourceMap` property.  */
    addSourceMap(column, node) {
        this.currentLine += 1;
        this.module.sourceMap[this.currentLine] = { column, node };
    }
    /** Pushes a line of code to the internal `code` object. */
    pushCode(before, contents, after, node, lineEnding = true) {
        this.module.code += before + contents + after + (lineEnding ? "\n" : "");
        // `length` of a string starts from 0, but column number starts from 1,
        // so here it should add 1. 
        this.addSourceMap(before.length + 1, node);
    }
    /** Imports a module from the given file. */
    importModule(parent = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (module_1.Module.cache[this.filename]) {
                return module_1.Module.cache[this.filename];
            }
            let tpl = yield this.loadTemplate(), parser = new whatstpl_toolkit_1.Parser(this.filename), node = parser.parse(tpl);
            return this.createModule(node, parent);
        });
    }
    /** Creates a new module according to the given filename and node tree. */
    createModule(node, parent = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let _module = new module_1.Module(this.filename);
            this.module = _module;
            yield this.attachBlockContents(node);
            // If there is any layouts, push then to the very bottom of the 
            // compiled code, and in the layout module, use variable `__contents` 
            // to  attach the inner contents.
            if (this.layouts.length) {
                for (let { filename, node } of this.layouts) {
                    this.importedModuleCount += 1;
                    let moduleId = "__module_" + this.importedModuleCount;
                    filename = filename.replace(/\\/g, "\\\\");
                    // When dealing with layout, only import the `default` property,
                    // and reassign the `default` in the current module.
                    this.pushCode(`const ${moduleId} = `, `require('${filename}', __locals, this.default)`, ";", node);
                    this.pushCode("this.default = ", `${moduleId}.default`, ";", node);
                }
            }
            _module.parent = parent;
            module_1.Module.cache[this.filename] = _module; // cache the module.
            module_1.Module.sourceMaps[this.filename] = _module.sourceMap; // cache the source map.
            return _module;
        });
    }
    /** Attaches block contents to the internal `code` object. */
    attachBlockContents(parent, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let cutSpace = NaN;
            for (let node of parent.contents) {
                if (node.type == "text"
                    || (node.type == "comment" && !this.options.removeComments)) {
                    let contents = node.contents.replace(/\n/g, "\\n")
                        .replace(/'/g, "\\'");
                    this.pushCode(indent + "this.default += '", contents, "';", node);
                }
                else if (node.type == "var") {
                    if (node.tag == "!") { // !{statement}
                        this.pushCode(indent, node.contents, ";", node);
                    }
                    else if (node.tag == "@") { // @{statement}
                        this.pushCode(indent + "this.default += ", node.contents, ";", node);
                    }
                    else { // #{statement}
                        this.pushCode(indent + "this.default += __escape(", node.contents, ");", node);
                    }
                }
                else if (node.type == "snippet") { // <script engine="whatstpl"></script>
                    // if (isNaN(cutSpace)) {
                    //     let match = (<string>node.contents).match(/\S/);
                    //     if (match)
                    //         cutSpace = match.index;
                    // }
                    let contents = cutSpace
                        ? node.contents.substring(cutSpace)
                        : node.contents;
                    this.pushCode(indent.substring(4), contents, "", node, false);
                }
                else if (node.type == "block") {
                    if (node.tag == "import") { // <import/>
                        yield this.attachImport(node, indent);
                    }
                    else if (node.tag == "export") { // <export/>
                        yield this.attachExport(node, indent);
                    }
                    else if (node.tag == "block") { // <block></block>
                        yield this.attackBlock(node, indent);
                    }
                    else if (node.tag == "if") { // <if></if>
                        yield this.attachIf(node, indent);
                    }
                    else if (node.tag == "else-if") { // <else-if></else-if>
                        yield this.attachElseIf(node, indent.substring(4));
                    }
                    else if (node.tag == "else") { // <else></else>
                        yield this.attachElse(node, indent.substring(4));
                    }
                    else if (node.tag == "switch") { // <switch></switch>
                        yield this.attachSwitch(node, indent);
                    }
                    else if (node.tag == "case") { // <case></case>
                        yield this.attachCase(node, indent);
                    }
                    else if (node.tag == "default") { // <default></default>
                        yield this.attachDefault(node, indent);
                    }
                    else if (node.tag == "for") { // <for></for>
                        yield this.attachFor(node, indent);
                    }
                    else if (node.tag == "while") { // <while></while>
                        yield this.attachWhile(node, indent);
                    }
                    else if (node.tag == "do") { // <do></do>
                        yield this.attachDoWhile(node, indent);
                    }
                    else if (node.tag == "continue" || node.tag == "break") {
                        // <continue/> and <break/>
                        this.pushCode(indent, node.tag, ";", node);
                    }
                    else if (node.tag == "layout") { // <layout></layout>
                        yield this.attachLayout(node, indent);
                    }
                    else if (node.tag == "script") { // <script></script>
                        let attrs = node.attributes;
                        let shouldCompile = !attrs.engine
                            || attrs.engine.value != whatstpl_toolkit_1.Parser.EngineName;
                        if (shouldCompile) { // JavaScript of the HTML.
                            let contents = "<script";
                            // attach attributes.
                            for (let name in attrs) {
                                contents += ` ${name}="${attrs[name].value}"`;
                            }
                            contents += ">\\n";
                            this.pushCode(indent + "this.default += '", contents, "';", node);
                        }
                        // Attaches the contents in the <script> element.
                        yield this.attachBlockContents(node, indent + "    ");
                        if (shouldCompile) {
                            this.pushCode(indent + "this.default += '", "</script>\\n", "';", node);
                        }
                    }
                    else { // user-defined block tags.
                        let name = node.tag.replace(/-/g, "_"), attrs = node.attributes;
                        if (attrs.await && attrs.await.value != "false")
                            name = "await " + name;
                        let contents = "call(this";
                        // User-defined block tags are treated as function, when 
                        // called, the attribute `data` will be used as arguments
                        // and passed to the function.
                        if (attrs.data && attrs.data.value)
                            contents += ", " + attrs.data.value;
                        contents += ")";
                        this.pushCode(indent + name + ".", contents, ";", node);
                    }
                }
            }
        });
    }
    /** <layout file="<filename>"/> */
    attachLayout(node, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let filename = this.getAbsPath(node.attributes.file.value), tpl = new this.constructor(filename, this.options);
            yield tpl.importModule(this.module);
            // The layouts are not attached immediately, they will be stored in 
            // an array, when the current module is compiled, layouts will be 
            // added to the very end of the compiled code.
            this.layouts.push({ filename, node });
        });
    }
    /** <import[ target="<block-name>"] file|from="<filename>"/> */
    attachImport(node, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let attrs = node.attributes, filename = this.getAbsPath(attrs.from ? attrs.from.value : attrs.file.value), tpl = new this.constructor(filename, this.options);
            yield tpl.importModule(this.module);
            this.importedModuleCount += 1;
            let moduleId = "__module_" + this.importedModuleCount;
            filename = filename.replace(/\\/g, "\\\\");
            this.pushCode(`${indent}const ${moduleId} = `, `require('${filename}', __locals)`, ";", node);
            // The 'target' attribute in a <import/> elements sets which names 
            // should be imported.
            if (attrs.target && attrs.target.value) {
                let tags = attrs.target.value.replace(/-/g, "_").split(/\s*,\s*/);
                for (let tag of tags) {
                    // parse as syntax.
                    let pair = tag.split(/\s*as\s*/), oldName = pair[0], newName = pair[1] || oldName;
                    this.pushCode(indent, `const ${newName} = ${moduleId}.${oldName}`, ";", node);
                }
            }
            else { // If no 'target', then import the `default` property.
                this.pushCode(indent, `this.default += ${moduleId}.default`, ";", node);
            }
        });
    }
    /** <export target="<block-names>"/> */
    attachExport(node, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            // The 'target' attribute in a <export/> elements sets which names 
            // should be exported and can be imported by other modules.
            if (node.attributes.target && node.attributes.target.value) {
                let tags = node.attributes.target.value.split(/,\s*/);
                for (let i in tags) {
                    // parse `as` syntax
                    let pair = tags[i].split(/\s+as\s+/), oldName = pair[0].replace(/-/g, "_"), newName = pair[1] ? pair[1].replace(/-/g, "_") : oldName;
                    this.pushCode(indent, `this.${newName} = ${oldName}`, ";", node);
                }
            }
        });
    }
    /** <block name="<name>"[ export][ async][ params="<params>"]></block> */
    attackBlock(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            let attrs = block.attributes, name = attrs.name.value.replace(/-/g, "_"), contents = `function ${name}(`;
            // 'async' attribute means the function is an async function.
            if (attrs.async && attrs.async.value != "false")
                contents = `async ` + contents;
            // 'params' attribute sets function parameters.
            if (attrs.params && attrs.params.value)
                contents += attrs.params.value;
            contents += ")";
            this.pushCode(indent, contents, " {", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent, "", "}", block);
            // The block can be exported by setting an 'export' attribute.
            if (attrs.export && attrs.export.value != "false")
                this.pushCode(indent, `this.${name} = ${name}`, ";", block);
        });
    }
    /** <if condition="<condition>"></if> */
    attachIf(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "if (", block.attributes.condition.value, ") {", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent, "", "}", block);
        });
    }
    /** <else-if condition="<condition>"></else-if> */
    attachElseIf(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "} else if (", block.attributes.condition.value, ") {", block);
            yield this.attachBlockContents(block, indent + "    ");
        });
    }
    /** <else></else> */
    attachElse(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "} else {", "", "", block);
            yield this.attachBlockContents(block, indent + "    ");
        });
    }
    /** <switch target="<target>"></switch> */
    attachSwitch(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "switch (", block.attributes.target.value, ") {", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent, "", "}", block);
        });
    }
    /** <case data="<data>"></case> */
    attachCase(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "case ", block.attributes.data.value, ":", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent + "    ", "break", ";", block);
        });
    }
    /** <default></default> */
    attachDefault(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "default", "", ":", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent + "    ", "break", ";", block);
        });
    }
    /** <for statement="<statement>"></for> */
    attachFor(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "for (", block.attributes.statement.value, ") {", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent, "", "}", block);
        });
    }
    /** <while condition="<condition>"></while> */
    attachWhile(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "while (", block.attributes.condition.value, ") {", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent, "", "}", block);
        });
    }
    /** <do while="<condition>"></do> */
    attachDoWhile(block, indent = "") {
        return __awaiter(this, void 0, void 0, function* () {
            this.pushCode(indent + "do ", "", " {", block);
            yield this.attachBlockContents(block, indent + "    ");
            this.pushCode(indent + "} while (", block.attributes.while.value, ");", block);
        });
    }
}
Template.cache = {};
exports.Template = Template;
exports.default = Template;


/***/ }),

/***/ "./src/module.ts":
/*!***********************!*\
  !*** ./src/module.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const whatstpl_toolkit_1 = __webpack_require__(/*! whatstpl-toolkit */ "./node_modules/whatstpl-toolkit/dist/index.js");
class Module {
    constructor(filename) {
        this.children = {};
        this.sourceMap = {};
        this.id = this.filename = whatstpl_toolkit_1.normalizePath(filename);
        this.dirname = whatstpl_toolkit_1.dirname(filename);
        this.code = "";
    }
    /**
     *
     * @param id Module id, usually it's the module filename.
     * @param locals Local variables passed to the module.
     * @param contents Layout contents, used when the current module is a
     *  layout module.
     */
    require(id, locals = {}, contents = "") {
        let filename = whatstpl_toolkit_1.isAbsPath(id) || this.dirname == "."
            ? id
            : whatstpl_toolkit_1.normalizePath(this.dirname + "/" + id);
        let dir = whatstpl_toolkit_1.dirname(filename);
        if (Module.cache[filename]) {
            let _module = Module.cache[filename], _exports = { default: "" }, _require = (id, locals = {}, contents = "") => {
                return _module.require(id, locals, contents);
            };
            this.children[filename] = _module;
            let fn = createFunction(this.filename, _module.code, locals);
            fn.call(_exports, _require, filename, dir, contents, locals, whatstpl_toolkit_1.escape, ...whatstpl_toolkit_1.getObjectValues(locals));
            return _exports;
        }
        else {
            throw new Error("the request module hasn't been imported!");
        }
    }
}
Module.cache = {};
Module.sourceMaps = {};
exports.Module = Module;
const Params = "require, __filename, __dirname, __contents, __locals, __escape";
const EvalRE = /at ([a-zA-Z0-9_\.]+) \(eval at.+<anonymous>:(\d+:\d+)\)/;
const RequireRE = /const __module_\d+ = require\('(.+?)'/;
const FnCallRE = /([a-zA-Z0-9_]+).call\(this.*\)/;
// The `new Function()` will generate a function which it's string 
// representation is different in different JavaScript engines, so here I 
// calculate out the function body offset from a test function, so that when 
// replacing the error, the program can calculate the accurate position of the
// function body.
const FnBodyOffset = whatstpl_toolkit_1.getFunctionBodyOffset(new Function("a, b", "a + b"));
function createFunction(filename, code, locals) {
    let props = Object.keys(locals).join(", ");
    try {
        return new Function(Params + (props ? ", " + props : ""), code);
    }
    catch (err) {
        if (err instanceof SyntaxError) { // replace the error stack.
            err.message = "Unexpected token found";
            let stacks = err.stack.split("\n");
            stacks[1] = stacks[1].replace("<anonymous>", filename);
            err.stack = stacks.join("\n");
            throw err;
        }
        else {
            throw replaceError(err, filename);
        }
    }
}
/** Gets the function name from a line of code. */
function getFuncName(lineCode) {
    let matches = lineCode.match(FnCallRE);
    return matches ? matches[1] : "";
}
/** Gets the imported filename from a `require()` statement. */
function getImportFilename(code, line) {
    let codeArr = code.split("\n"), funcName = getFuncName(codeArr[line - 1]), lineCode, matches;
    if (funcName) {
        let re = new RegExp(`const ${funcName} = (__module_\\d+)\.`), _codeArr, moduleId;
        for (let i in codeArr) {
            matches = codeArr[i].match(re);
            if (matches) {
                _codeArr = codeArr.slice(0, parseInt(i));
                moduleId = matches[1];
                break;
            }
        }
        if (moduleId && _codeArr && _codeArr.length) {
            _codeArr.reverse();
            let re = new RegExp(`const ${moduleId} = require\\('(.+?)'`);
            for (let code of _codeArr) {
                matches = code.match(re);
                if (matches)
                    return matches[1].replace(/\\\\/g, "\\");
            }
        }
        else {
            return "";
        }
    }
    else {
        // line number starts from 1, while array index starts from 0, so here 
        // must decrease 1.
        lineCode = codeArr[line - 1];
        matches = lineCode && lineCode.match(RequireRE);
        return matches ? matches[1].replace(/\\\\/g, "\\") : "";
    }
}
/**
 * Replaces error stack according to the source map.
 * @param filename The main module filename.
 */
function replaceError(err, filename) {
    let stacks = err.stack.split("\n").reverse();
    for (let i in stacks) {
        // first line the the stack or failed to parse the filename.
        if (stacks[i][0] != " " || !filename)
            continue;
        let matches = stacks[i].match(EvalRE);
        if (matches) {
            let funcName = matches[1], pair = matches[2].split(":"), line = parseInt(pair[0]), column = parseInt(pair[1]), 
            // The running code will be wrapped in a function which the 
            // definition takes at least one line, so here the line number 
            // should decrease according to the function body offset.
            source = {
                funcName,
                filename,
                line: line - FnBodyOffset.line,
                column
            }, 
            /** The source map of one line of code. */
            map = Module.sourceMaps[filename][source.line], code = Module.cache[filename].code;
            // If the source line is 1 (the first line), then the column 
            // should be calculated as well.
            if (source.line == 1)
                source.column = column - FnBodyOffset.column;
            // recalculate the filename, move to the next import file.
            filename = getImportFilename(code, source.line);
            // Replace the line number to the line number in the source file.
            source.line = map.node.line;
            // Calculate and replace the column number.
            source.column = (column - map.column) + map.node.column;
            stacks[i] = `    at ${source.funcName} (${source.filename}`
                + `:${source.line}:${source.column})`;
        }
    }
    // Regenerate the error stack.
    stacks.reverse();
    err.stack = stacks.join("\n");
    return err;
}
exports.replaceError = replaceError;


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ })

/******/ });
});
//# sourceMappingURL=whatstpl.js.map