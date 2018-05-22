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

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/whatstpl-toolkit/dist/errors.js":
/*!******************************************************!*\
  !*** ./node_modules/whatstpl-toolkit/dist/errors.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UnclosedTagError = (function (_super) {
    __extends(UnclosedTagError, _super);
    function UnclosedTagError(message, filename, line, column) {
        var _this = _super.call(this, message) || this;
        _this.filename = filename;
        _this.line = line;
        _this.column = column;
        return _this;
    }
    return UnclosedTagError;
}(SyntaxError));
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
__export(__webpack_require__(/*! ./util */ "./node_modules/whatstpl-toolkit/dist/util.js"));
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
var errors_1 = __webpack_require__(/*! ./errors */ "./node_modules/whatstpl-toolkit/dist/errors.js");
var util_1 = __webpack_require__(/*! ./util */ "./node_modules/whatstpl-toolkit/dist/util.js");
var AttrRe = /([0-9a-zA-Z:\-]+)\s*=\s*|([0-9a-zA-Z:\-]+)\s*/;
var Parser = (function () {
    function Parser(filename) {
        if (filename === void 0) { filename = ""; }
        var _this = this;
        this.listeners = {};
        this.outputTags = Parser.OutputTags;
        this.blockTags = Parser.BlockTags;
        if (filename)
            this.filename = util_1.getAbsPath(filename);
        else
            this.filename = "undefined";
        this.renewRegExp();
        this.on("block", function (node) {
            var attrs = node.attributes;
            if (node.tag == "block") {
                _this.blockTags.push(attrs.name.value);
                _this.renewRegExp();
            }
            else if (node.tag == "import" && attrs.target && attrs.target.value) {
                var tags = attrs.target.value.split(/,\s*/);
                for (var i in tags) {
                    var pair = tags[i].split(/\s+as\s+/);
                    tags[i] = pair[1] || pair[0];
                }
                _this.blockTags = _this.blockTags.concat(tags);
                _this.renewRegExp();
            }
        });
    }
    Parser.prototype.renewRegExp = function () {
        var tagStr = this.blockTags.join("|");
        var pattern = "<!--(.*?)-->|<!--(.*)|("
            + this.outputTags.join("|")
            + ")\{(.+?)\}|<("
            + tagStr
            + ")[\\s|\\/|>]|<\\/("
            + tagStr
            + ")>";
        this.regexp = new RegExp(pattern);
    };
    Parser.prototype.on = function (event, listener) {
        if (!this.listeners[event])
            this.listeners[event] = [];
        this.listeners[event].push(listener);
    };
    Parser.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.listeners[event] || !this.listeners[event].length)
            return false;
        for (var _a = 0, _b = this.listeners[event]; _a < _b.length; _a++) {
            var listener = _b[_a];
            listener.apply(void 0, args);
        }
        return true;
    };
    Parser.prototype.parse = function (html) {
        var root = {
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
    };
    Parser.prototype.getLine = function (html, line) {
        var lineStr, left;
        while (true) {
            var end = html.indexOf("\n");
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
        return { lineStr: lineStr, left: left, line: line };
    };
    Parser.prototype.attachTextNode = function (lineStr, line, column, endIndex, nodes, keepPureSpaces) {
        if (keepPureSpaces === void 0) { keepPureSpaces = false; }
        var textNode = {
            type: "text",
            line: line,
            column: column,
            contents: endIndex ? lineStr.substring(0, endIndex) : lineStr + "\n",
            closed: true,
        };
        if (keepPureSpaces || textNode.contents.trimLeft()) {
            nodes.push(textNode);
            this.emit("text", textNode);
        }
    };
    Parser.prototype.parseHtml = function (html, line, column, parent) {
        if (column === void 0) { column = 1; }
        var LineInfo = this.getLine(html, line), lineStr = LineInfo.lineStr, matches = lineStr.match(this.regexp), nodes = parent.contents;
        html = LineInfo.left;
        line = LineInfo.line;
        if (!matches) {
            if (parent.tag == "script"
                && parent.attributes.engine
                && parent.attributes.engine.value == Parser.EngineName) {
                var snippetNode = {
                    type: "snippet",
                    line: line,
                    column: column,
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
            var left = lineStr.substring(matches.index + matches[0].length), commentNode = {
                type: "comment",
                line: line,
                column: column,
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
            var commentNode = {
                type: "comment",
                line: line,
                column: column,
                contents: lineStr.substring(matches.index),
                closed: false
            };
            line += 1;
            column = 1;
            var res = this.parseComment(html, line, column, commentNode);
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
            var varNode = {
                tag: matches[3],
                type: "var",
                line: line,
                column: column,
                contents: matches[4],
                closed: true,
            };
            nodes.push(varNode);
            this.emit("var", varNode);
            var endColumn = matches.index + matches[4].length + 3, left = lineStr.substring(endColumn);
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
            var endColumn = matches.index + matches[0].length, ending = lineStr[endColumn - 1], tagClosed = ending == "/" || ending == ">", blockNode = {
                tag: matches[5],
                type: "block",
                line: line,
                column: column,
                attributes: {},
                contents: [],
                closed: false,
            };
            if (tagClosed)
                endColumn -= 1;
            var left = lineStr.substring(endColumn);
            if (!left && html) {
                column = 1;
                var LineInfo_1 = this.getLine(html, line);
                if (LineInfo_1.lineStr) {
                    left = LineInfo_1.lineStr;
                    html = LineInfo_1.left;
                }
            }
            if (left) {
                html = left + (html ? "\n" + html : "");
                column += matches[0].length;
                if (tagClosed)
                    column -= 1;
            }
            else {
                throw new errors_1.UnclosedTagError("unclosed tag", this.filename, line, column);
            }
            var res = this.applyAttr(html, line, column, blockNode.attributes);
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
            var endColumn = matches.index + matches[0].length, left = lineStr.substring(endColumn);
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
            return { line: line, column: column, left: html };
        }
    };
    Parser.prototype.applyAttr = function (html, line, column, attrs) {
        var LineInfo = this.getLine(html, line), lineStr = LineInfo.lineStr, leading = lineStr.trimLeft()[0], tagClosed = leading == "/" || leading == ">", matches = tagClosed ? null : lineStr.match(AttrRe);
        line = LineInfo.line;
        html = LineInfo.left;
        if (!matches) {
            var i = lineStr.indexOf(">");
            if (i === -1) {
                throw new errors_1.UnclosedTagError("unclosed tag", this.filename, line, column);
            }
            else {
                column += i + 1;
                var left_1 = lineStr.substring(i + 1);
                if (left_1) {
                    html = left_1 + "\n" + html;
                }
                else {
                    line += 1;
                    column = 1;
                }
            }
            return {
                line: line,
                column: column,
                left: html,
                blockClosed: leading == "/"
            };
        }
        var name;
        var value;
        var quoted = true;
        var left;
        if (matches[1]) {
            var pos = matches.index + matches[0].length, quote = lineStr[pos], end = void 0;
            quoted = quote == "'" || quote == '"';
            if (quoted)
                pos += 1;
            if (quoted) {
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
        attrs[name] = { name: name, value: value, line: line, column: column };
        if (left) {
            html = left + "\n" + html;
            column += (matches[1] ? value.length : matches[0].length);
            column += (quoted ? 1 : 0);
        }
        else {
            line += 1;
            column = 1;
        }
        return this.applyAttr(html, line, column, attrs);
    };
    Parser.prototype.parseComment = function (html, line, column, commentNode) {
        var LineInfo = this.getLine(html, line), lineStr = LineInfo.lineStr, matches = lineStr && lineStr.match(/-->/);
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
                return { line: line, column: column, left: html };
            }
        }
        else {
            if (matches.index) {
                commentNode.contents += lineStr.substring(0, matches.index);
            }
            commentNode.contents += matches[0];
            commentNode.closed = true;
            column += matches.index + 3;
            var left = lineStr.substring(column);
            if (left) {
                html = left + "\n" + html;
            }
            else {
                line += 1;
                column = 1;
            }
        }
        return { line: line, column: column, left: html };
    };
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
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./node_modules/whatstpl-toolkit/dist/util.js":
/*!****************************************************!*\
  !*** ./node_modules/whatstpl-toolkit/dist/util.js ***!
  \****************************************************/
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
    var i = path.replace(/\\/g, "/").lastIndexOf("/");
    if (i < 0 || path == "/")
        return ".";
    else if (i == path.length - 1)
        return dirname(path.substring(0, i));
    else
        return path.substring(0, i).replace(/\/|\\/g, exports.Separator);
}
exports.dirname = dirname;
function basename(filename, extname) {
    if (extname === void 0) { extname = ""; }
    var dir = dirname(filename), basename = (dir == "." && filename.match(/^\.[\/\\]/) == null)
        ? filename : filename.substring(dir.length + 1);
    if (extname) {
        var i = basename.lastIndexOf(extname);
        basename = i >= 0 ? basename.substring(0, i) : basename;
    }
    return basename;
}
exports.basename = basename;
function extname(filename) {
    var baseName = basename(filename), i = baseName.lastIndexOf(".");
    return i >= 0 ? baseName.substring(i) : "";
}
exports.extname = extname;
function normalizePath(path) {
    var parts = path.split(/\/|\\/);
    for (var i = 0; i < parts.length; i++) {
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
    return path[0] == "/" || /^[a-zA-Z]:[\/\\]/.test(path);
}
exports.isAbsPath = isAbsPath;
function getAbsPath(filename) {
    if (!isAbsPath(filename)) {
        var dir = getCwd(), noSep = dir[dir.length - 1] == "/";
        filename = dir + (noSep ? "" : exports.Separator) + filename;
    }
    return normalizePath(filename);
}
exports.getAbsPath = getAbsPath;
function getObjectValues(obj) {
    var res = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
            res.push(obj[prop]);
    }
    return res;
}
exports.getObjectValues = getObjectValues;
function getFunctionBodyOffset(fn) {
    var fnStr = fn.toString(), i = fnStr.indexOf("{") + 1, defArr = fnStr.slice(0, i).split("\n"), inNewLine = fnStr[i] == "\n", column = inNewLine ? 0 : defArr[defArr.length - 1].indexOf("{") + 2, line = inNewLine ? defArr.length : defArr.length - 1;
    return { line: line, column: column };
}
exports.getFunctionBodyOffset = getFunctionBodyOffset;
//# sourceMappingURL=util.js.map

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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var whatstpl_toolkit_1 = __webpack_require__(/*! whatstpl-toolkit */ "./node_modules/whatstpl-toolkit/dist/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var module_1 = __webpack_require__(/*! ./module */ "./src/module.ts");
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
var Template = /** @class */ (function () {
    function Template(filename, options) {
        if (filename === void 0) { filename = ""; }
        if (options === void 0) { options = "utf8"; }
        this.currentLine = 0;
        this.importedModuleCount = 0;
        this.layouts = [];
        if (filename)
            this.filename = whatstpl_toolkit_1.getAbsPath(filename);
        else
            this.filename = "undefined";
        if (typeof options == "string")
            options = { encoding: options };
        this.options = assign({}, exports.CompileOption, options);
    }
    /** Renders the given template contents. */
    Template.prototype.render = function (tpl, locals) {
        if (locals === void 0) { locals = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var render;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.compile(tpl)];
                    case 1:
                        render = _a.sent();
                        return [2 /*return*/, render(locals)];
                }
            });
        });
    };
    Template.renderFile = function (filename, locals, options) {
        if (locals === void 0) { locals = null; }
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var render;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.compileFile(filename, options)];
                    case 1:
                        render = _a.sent();
                        return [2 /*return*/, render(locals || {})];
                }
            });
        });
    };
    /** Compiles the given template contents. */
    Template.prototype.compile = function (tpl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var parser, node, _module, render;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // If the function is already cached, retrieve it instead.
                        if (this.options.cache && Template.cache[this.filename]) {
                            return [2 /*return*/, Template.cache[this.filename]];
                        }
                        parser = new whatstpl_toolkit_1.Parser(this.filename), node = parser.parse(tpl);
                        return [4 /*yield*/, this.createModule(node)];
                    case 1:
                        _module = _a.sent();
                        render = function (locals) {
                            if (locals === void 0) { locals = {}; }
                            try {
                                return _module.require(_this.filename, locals).default.trimRight();
                            }
                            catch (err) { // replace and re-throw the error.
                                throw module_1.replaceError(err, _this.filename);
                            }
                        };
                        if (this.options.cache)
                            Template.cache[this.filename] = render;
                        return [2 /*return*/, render];
                }
            });
        });
    };
    Template.compileFile = function (filename, options) {
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var tpl, html;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = whatstpl_toolkit_1.getAbsPath(filename);
                        // If the function is already cached, retrieve it instead.
                        if (options && options.cache && Template.cache[filename]) {
                            return [2 /*return*/, Template.cache[filename]];
                        }
                        tpl = new this(filename, options);
                        return [4 /*yield*/, tpl.loadTemplate()];
                    case 1:
                        html = _a.sent();
                        return [2 /*return*/, tpl.compile(html)];
                }
            });
        });
    };
    /**
     * Registers the given template string as a template, and set a temporary
     * filename for importing usage.
     */
    Template.register = function (filename, tpl) {
        var tplObj = new this(filename, {
            cache: true
        });
        return tplObj.compile(tpl);
    };
    /** Loads the template contents from the file. */
    Template.prototype.loadTemplate = function () {
        var _this = this;
        if (!whatstpl_toolkit_1.IsBrowser) {
            return new Promise(function (resolve, reject) {
                fs.readFile(_this.filename, _this.options.encoding, function (err, data) {
                    err ? reject(err) : resolve(data);
                });
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.timeout = _this.options.timeout;
                xhr.withCredentials = _this.options.withCredentials;
                xhr.open("GET", _this.filename, true);
                if (_this.options.headers) {
                    for (var name_1 in _this.options.headers) {
                        var value = _this.options.headers[name_1];
                        if (Array.isArray(value)) {
                            value = value.join(", ");
                        }
                        else if (typeof value != "string") {
                            if (typeof value.toString == "function")
                                value = value.toString();
                            else
                                value = String(value);
                        }
                        xhr.setRequestHeader(name_1, value);
                    }
                }
                xhr.onload = function () {
                    resolve(xhr.responseText);
                };
                xhr.onabort = xhr.onerror = xhr.ontimeout = function () {
                    reject(new Error("failed to load remote module."));
                };
                xhr.send();
            });
        }
    };
    /** Gets the absolute path of the filename, if it is relative.  */
    Template.prototype.getAbsPath = function (filename) {
        if (!whatstpl_toolkit_1.isAbsPath(filename)) {
            var dir = this.filename && this.filename != "undefined"
                ? whatstpl_toolkit_1.dirname(this.filename)
                : whatstpl_toolkit_1.getCwd();
            filename = whatstpl_toolkit_1.normalizePath(dir + whatstpl_toolkit_1.Separator + filename);
        }
        // If the extension name is omitted, use the one of the parent file.
        if (!whatstpl_toolkit_1.extname(filename)) {
            filename += whatstpl_toolkit_1.extname(this.filename);
        }
        return filename;
    };
    /** Adds a line of source map to the internal `sourceMap` property.  */
    Template.prototype.addSourceMap = function (column, node) {
        this.currentLine += 1;
        this.module.sourceMap[this.currentLine] = { column: column, node: node };
    };
    /** Pushes a line of code to the internal `code` object. */
    Template.prototype.pushCode = function (before, contents, after, node, lineEnding) {
        if (lineEnding === void 0) { lineEnding = true; }
        this.module.code += before + contents + after + (lineEnding ? "\n" : "");
        // `length` of a string starts from 0, but column number starts from 1,
        // so here it should add 1. 
        this.addSourceMap(before.length + 1, node);
    };
    /** Imports a module from the given file. */
    Template.prototype.importModule = function (parent) {
        if (parent === void 0) { parent = null; }
        return __awaiter(this, void 0, void 0, function () {
            var tpl, parser, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (module_1.Module.cache[this.filename]) {
                            return [2 /*return*/, module_1.Module.cache[this.filename]];
                        }
                        return [4 /*yield*/, this.loadTemplate()];
                    case 1:
                        tpl = _a.sent(), parser = new whatstpl_toolkit_1.Parser(this.filename), node = parser.parse(tpl);
                        return [2 /*return*/, this.createModule(node, parent)];
                }
            });
        });
    };
    /** Creates a new module according to the given filename and node tree. */
    Template.prototype.createModule = function (node, parent) {
        if (parent === void 0) { parent = null; }
        return __awaiter(this, void 0, void 0, function () {
            var _module, _i, _a, _b, filename, node_1, moduleId;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _module = new module_1.Module(this.filename);
                        this.module = _module;
                        return [4 /*yield*/, this.attachBlockContents(node)];
                    case 1:
                        _c.sent();
                        // If there is any layouts, push then to the very bottom of the 
                        // compiled code, and in the layout module, use variable `__contents` 
                        // to  attach the inner contents.
                        if (this.layouts.length) {
                            for (_i = 0, _a = this.layouts; _i < _a.length; _i++) {
                                _b = _a[_i], filename = _b.filename, node_1 = _b.node;
                                this.importedModuleCount += 1;
                                moduleId = "__module_" + this.importedModuleCount;
                                filename = filename.replace(/\\/g, "\\\\");
                                // When dealing with layout, only import the `default` property,
                                // and reassign the `default` in the current module.
                                this.pushCode("const " + moduleId + " = ", "require('" + filename + "', __locals, this.default)", ";", node_1);
                                this.pushCode("this.default = ", moduleId + ".default", ";", node_1);
                            }
                        }
                        _module.parent = parent;
                        module_1.Module.cache[this.filename] = _module; // cache the module.
                        module_1.Module.sourceMaps[this.filename] = _module.sourceMap; // cache the source map.
                        return [2 /*return*/, _module];
                }
            });
        });
    };
    /** Attaches block contents to the internal `code` object. */
    Template.prototype.attachBlockContents = function (parent, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var cutSpace, _i, _a, node, contents, contents, attrs, shouldCompile, contents, name_2, name_3, attrs, contents;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cutSpace = NaN;
                        _i = 0, _a = parent.contents;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 35];
                        node = _a[_i];
                        if (!(node.type == "text"
                            || (node.type == "comment" && !this.options.removeComments))) return [3 /*break*/, 2];
                        contents = node.contents.replace(/\n/g, "\\n")
                            .replace(/'/g, "\\'");
                        this.pushCode(indent + "this.default += '", contents, "';", node);
                        return [3 /*break*/, 34];
                    case 2:
                        if (!(node.type == "var")) return [3 /*break*/, 3];
                        if (node.tag == "!") { // !{statement}
                            this.pushCode(indent, node.contents, ";", node);
                        }
                        else if (node.tag == "@") { // @{statement}
                            this.pushCode(indent + "this.default += ", node.contents, ";", node);
                        }
                        else { // #{statement}
                            this.pushCode(indent + "this.default += __escape(", node.contents, ");", node);
                        }
                        return [3 /*break*/, 34];
                    case 3:
                        if (!(node.type == "snippet")) return [3 /*break*/, 4];
                        contents = cutSpace
                            ? node.contents.substring(cutSpace)
                            : node.contents;
                        this.pushCode(indent.substring(4), contents, "", node, false);
                        return [3 /*break*/, 34];
                    case 4:
                        if (!(node.type == "block")) return [3 /*break*/, 34];
                        if (!(node.tag == "import")) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.attachImport(node, indent)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 6:
                        if (!(node.tag == "export")) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.attachExport(node, indent)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 8:
                        if (!(node.tag == "block")) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.attackBlock(node, indent)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 10:
                        if (!(node.tag == "if")) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.attachIf(node, indent)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 12:
                        if (!(node.tag == "else-if")) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.attachElseIf(node, indent.substring(4))];
                    case 13:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 14:
                        if (!(node.tag == "else")) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.attachElse(node, indent.substring(4))];
                    case 15:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 16:
                        if (!(node.tag == "switch")) return [3 /*break*/, 18];
                        return [4 /*yield*/, this.attachSwitch(node, indent)];
                    case 17:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 18:
                        if (!(node.tag == "case")) return [3 /*break*/, 20];
                        return [4 /*yield*/, this.attachCase(node, indent)];
                    case 19:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 20:
                        if (!(node.tag == "default")) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.attachDefault(node, indent)];
                    case 21:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 22:
                        if (!(node.tag == "for")) return [3 /*break*/, 24];
                        return [4 /*yield*/, this.attachFor(node, indent)];
                    case 23:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 24:
                        if (!(node.tag == "while")) return [3 /*break*/, 26];
                        return [4 /*yield*/, this.attachWhile(node, indent)];
                    case 25:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 26:
                        if (!(node.tag == "do")) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.attachDoWhile(node, indent)];
                    case 27:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 28:
                        if (!(node.tag == "continue" || node.tag == "break")) return [3 /*break*/, 29];
                        // <continue/> and <break/>
                        this.pushCode(indent, node.tag, ";", node);
                        return [3 /*break*/, 34];
                    case 29:
                        if (!(node.tag == "layout")) return [3 /*break*/, 31];
                        return [4 /*yield*/, this.attachLayout(node)];
                    case 30:
                        _b.sent();
                        return [3 /*break*/, 34];
                    case 31:
                        if (!(node.tag == "script")) return [3 /*break*/, 33];
                        attrs = node.attributes;
                        shouldCompile = !attrs.engine
                            || attrs.engine.value != whatstpl_toolkit_1.Parser.EngineName;
                        if (shouldCompile) { // JavaScript of the HTML.
                            contents = "<script";
                            // attach attributes.
                            for (name_2 in attrs) {
                                contents += " " + name_2 + "=\"" + attrs[name_2].value + "\"";
                            }
                            contents += ">\\n";
                            this.pushCode(indent + "this.default += '", contents, "';", node);
                        }
                        // Attaches the contents in the <script> element.
                        return [4 /*yield*/, this.attachBlockContents(node, indent + "    ")];
                    case 32:
                        // Attaches the contents in the <script> element.
                        _b.sent();
                        if (shouldCompile) {
                            this.pushCode(indent + "this.default += '", "</script>\\n", "';", node);
                        }
                        return [3 /*break*/, 34];
                    case 33:
                        name_3 = node.tag.replace(/-/g, "_"), attrs = node.attributes;
                        if (attrs.await && attrs.await.value != "false")
                            name_3 = "await " + name_3;
                        contents = "call(this";
                        // User-defined block tags are treated as function, when 
                        // called, the attribute `data` will be used as arguments
                        // and passed to the function.
                        if (attrs.data && attrs.data.value)
                            contents += ", " + attrs.data.value;
                        contents += ")";
                        this.pushCode(indent + name_3 + ".", contents, ";", node);
                        _b.label = 34;
                    case 34:
                        _i++;
                        return [3 /*break*/, 1];
                    case 35: return [2 /*return*/];
                }
            });
        });
    };
    /** <layout file="<filename>"/> */
    Template.prototype.attachLayout = function (node) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, tpl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = this.getAbsPath(node.attributes.file.value), tpl = new this.constructor(filename, this.options);
                        return [4 /*yield*/, tpl.importModule(this.module)];
                    case 1:
                        _a.sent();
                        // The layouts are not attached immediately, they will be stored in 
                        // an array, when the current module is compiled, layouts will be 
                        // added to the very end of the compiled code.
                        this.layouts.push({ filename: filename, node: node });
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <import[ target="<block-name>"] file|from="<filename>"/> */
    Template.prototype.attachImport = function (node, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var attrs, filename, tpl, moduleId, tags, _i, tags_1, tag, pair, oldName, newName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attrs = node.attributes, filename = this.getAbsPath(attrs.from ? attrs.from.value : attrs.file.value), tpl = new this.constructor(filename, this.options);
                        return [4 /*yield*/, tpl.importModule(this.module)];
                    case 1:
                        _a.sent();
                        this.importedModuleCount += 1;
                        moduleId = "__module_" + this.importedModuleCount;
                        filename = filename.replace(/\\/g, "\\\\");
                        this.pushCode(indent + "const " + moduleId + " = ", "require('" + filename + "', __locals)", ";", node);
                        // The 'target' attribute in a <import/> elements sets which names 
                        // should be imported.
                        if (attrs.target && attrs.target.value) {
                            tags = attrs.target.value.replace(/-/g, "_").split(/\s*,\s*/);
                            for (_i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                                tag = tags_1[_i];
                                pair = tag.split(/\s*as\s*/), oldName = pair[0], newName = pair[1] || oldName;
                                this.pushCode(indent, "const " + newName + " = " + moduleId + "." + oldName, ";", node);
                            }
                        }
                        else { // If no 'target', then import the `default` property.
                            this.pushCode(indent, "this.default += " + moduleId + ".default", ";", node);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <export target="<block-names>"/> */
    Template.prototype.attachExport = function (node, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var tags, i, pair, oldName, newName;
            return __generator(this, function (_a) {
                // The 'target' attribute in a <export/> elements sets which names 
                // should be exported and can be imported by other modules.
                if (node.attributes.target && node.attributes.target.value) {
                    tags = node.attributes.target.value.split(/,\s*/);
                    for (i in tags) {
                        pair = tags[i].split(/\s+as\s+/), oldName = pair[0].replace(/-/g, "_"), newName = pair[1] ? pair[1].replace(/-/g, "_") : oldName;
                        this.pushCode(indent, "this." + newName + " = " + oldName, ";", node);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    /** <block name="<name>"[ export][ async][ params="<params>"]></block> */
    Template.prototype.attackBlock = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            var attrs, name, contents;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        attrs = block.attributes, name = attrs.name.value.replace(/-/g, "_"), contents = "function " + name + "(";
                        // 'async' attribute means the function is an async function.
                        if (attrs.async && attrs.async.value != "false")
                            contents = "async " + contents;
                        // 'params' attribute sets function parameters.
                        if (attrs.params && attrs.params.value)
                            contents += attrs.params.value;
                        contents += ")";
                        this.pushCode(indent, contents, " {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent, "", "}", block);
                        // The block can be exported by setting an 'export' attribute.
                        if (attrs.export && attrs.export.value != "false")
                            this.pushCode(indent, "this." + name + " = " + name, ";", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <if condition="<condition>"></if> */
    Template.prototype.attachIf = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "if (", block.attributes.condition.value, ") {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent, "", "}", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <else-if condition="<condition>"></else-if> */
    Template.prototype.attachElseIf = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "} else if (", block.attributes.condition.value, ") {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <else></else> */
    Template.prototype.attachElse = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "} else {", "", "", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <switch target="<target>"></switch> */
    Template.prototype.attachSwitch = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "switch (", block.attributes.target.value, ") {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent, "", "}", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <case data="<data>"></case> */
    Template.prototype.attachCase = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "case ", block.attributes.data.value, ":", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent + "    ", "break", ";", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <default></default> */
    Template.prototype.attachDefault = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "default", "", ":", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent + "    ", "break", ";", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <for statement="<statement>"></for> */
    Template.prototype.attachFor = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "for (", block.attributes.statement.value, ") {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent, "", "}", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <while condition="<condition>"></while> */
    Template.prototype.attachWhile = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "while (", block.attributes.condition.value, ") {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent, "", "}", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    /** <do while="<condition>"></do> */
    Template.prototype.attachDoWhile = function (block, indent) {
        if (indent === void 0) { indent = ""; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.pushCode(indent + "do ", "", " {", block);
                        return [4 /*yield*/, this.attachBlockContents(block, indent + "    ")];
                    case 1:
                        _a.sent();
                        this.pushCode(indent + "} while (", block.attributes.while.value, ");", block);
                        return [2 /*return*/];
                }
            });
        });
    };
    Template.cache = {};
    return Template;
}());
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
var whatstpl_toolkit_1 = __webpack_require__(/*! whatstpl-toolkit */ "./node_modules/whatstpl-toolkit/dist/index.js");
var Module = /** @class */ (function () {
    function Module(filename) {
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
    Module.prototype.require = function (id, locals, contents) {
        if (locals === void 0) { locals = {}; }
        if (contents === void 0) { contents = ""; }
        var filename = whatstpl_toolkit_1.isAbsPath(id) || this.dirname == "."
            ? id
            : whatstpl_toolkit_1.normalizePath(this.dirname + "/" + id);
        var dir = whatstpl_toolkit_1.dirname(filename);
        if (Module.cache[filename]) {
            var _module_1 = Module.cache[filename], _exports = { default: "" }, _require = function (id, locals, contents) {
                if (locals === void 0) { locals = {}; }
                if (contents === void 0) { contents = ""; }
                return _module_1.require(id, locals, contents);
            };
            this.children[filename] = _module_1;
            var fn = createFunction(this.filename, _module_1.code, locals);
            fn.call.apply(fn, [_exports,
                _require,
                filename,
                dir,
                contents,
                locals,
                whatstpl_toolkit_1.escape].concat(whatstpl_toolkit_1.getObjectValues(locals)));
            return _exports;
        }
        else {
            throw new Error("the request module hasn't been imported!");
        }
    };
    Module.cache = {};
    Module.sourceMaps = {};
    return Module;
}());
exports.Module = Module;
var Params = "require, __filename, __dirname, __contents, __locals, __escape";
var EvalRE = /at ([a-zA-Z0-9_\.]+) \(eval at.+<anonymous>:(\d+:\d+)\)/;
var RequireRE = /const __module_\d+ = require\('(.+?)'/;
var FnCallRE = /([a-zA-Z0-9_]+).call\(this.*\)/;
// The `new Function()` will generate a function which it's string 
// representation is different in different JavaScript engines, so here I 
// calculate out the function body offset from a test function, so that when 
// replacing the error, the program can calculate the accurate position of the
// function body.
var FnBodyOffset = whatstpl_toolkit_1.getFunctionBodyOffset(new Function("a, b", "a + b"));
function createFunction(filename, code, locals) {
    var props = Object.keys(locals).join(", ");
    try {
        return new Function(Params + (props ? ", " + props : ""), code);
    }
    catch (err) {
        if (err instanceof SyntaxError) { // replace the error stack.
            if (filename && filename !== "undefined") {
                var stacks = err.stack.split("\n");
                stacks[1] = stacks[1].replace(/<anonymous>|Function \(native\)/, filename);
                err.stack = stacks.join("\n");
            }
            throw err;
        }
        else {
            throw replaceError(err, filename);
        }
    }
}
/** Gets the function name from a line of code. */
function getFuncName(lineCode) {
    var matches = lineCode.match(FnCallRE);
    return matches ? matches[1] : "";
}
/** Gets the imported filename from a `require()` statement. */
function getImportFilename(code, line) {
    var codeArr = code.split("\n"), funcName = getFuncName(codeArr[line - 1]), lineCode, matches;
    if (funcName) {
        var re = new RegExp("const " + funcName + " = (__module_\\d+)."), _codeArr = void 0, moduleId = void 0;
        for (var i in codeArr) {
            matches = codeArr[i].match(re);
            if (matches) {
                _codeArr = codeArr.slice(0, parseInt(i));
                moduleId = matches[1];
                break;
            }
        }
        if (moduleId && _codeArr && _codeArr.length) {
            _codeArr.reverse();
            var re_1 = new RegExp("const " + moduleId + " = require\\('(.+?)'");
            for (var _i = 0, _codeArr_1 = _codeArr; _i < _codeArr_1.length; _i++) {
                var code_1 = _codeArr_1[_i];
                matches = code_1.match(re_1);
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
    var stacks = err.stack.split("\n").reverse();
    for (var i in stacks) {
        // first line the the stack or failed to parse the filename.
        if (stacks[i][0] != " " || !filename)
            continue;
        var matches = stacks[i].match(EvalRE);
        if (matches) {
            var funcName = matches[1], pair = matches[2].split(":"), line = parseInt(pair[0]), column = parseInt(pair[1]), 
            // The running code will be wrapped in a function which the 
            // definition takes at least one line, so here the line number 
            // should decrease according to the function body offset.
            source = {
                funcName: funcName,
                filename: filename,
                line: line - FnBodyOffset.line,
                column: column
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
            stacks[i] = "    at " + source.funcName + " (" + source.filename
                + (":" + source.line + ":" + source.column + ")");
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