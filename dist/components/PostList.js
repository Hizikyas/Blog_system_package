"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { usePosts } from "../hooks/usePosts";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
function PostExcerpt(_a) {
    var _this = this;
    var content = _a.content, excerpt = _a.excerpt;
    var _b = useState(""), parsedExcerpt = _b[0], setParsedExcerpt = _b[1];
    useEffect(function () {
        var parseExcerpt = function () { return __awaiter(_this, void 0, void 0, function () {
            var textToProcess, html, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        textToProcess = excerpt || content.substring(0, 300) + "...";
                        return [4 /*yield*/, marked.parse(textToProcess)];
                    case 1:
                        html = _a.sent();
                        setParsedExcerpt(DOMPurify.sanitize(html));
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error parsing excerpt:", err_1);
                        setParsedExcerpt(excerpt || content.substring(0, 300) + "...");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        parseExcerpt();
    }, [content, excerpt]);
    if (excerpt) {
        return _jsx("p", { children: excerpt });
    }
    return _jsx("div", { dangerouslySetInnerHTML: { __html: parsedExcerpt } });
}
export function PostList(_a) {
    var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.className, className = _d === void 0 ? "" : _d;
    var _e = usePosts(page, limit), posts = _e.posts, total = _e.total, isLoading = _e.isLoading, error = _e.error;
    if (isLoading) {
        return (_jsx("div", { className: "space-y-6 ".concat(className), children: __spreadArray([], Array(3), true).map(function (_, i) { return (_jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded mb-4 w-3/4" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-5/6" })] })] }, i)); }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-red-600 p-4 border border-red-200 rounded ".concat(className), children: ["Error loading posts: ", error.message] }));
    }
    var totalPages = Math.ceil(total / limit);
    return (_jsxs("div", { className: className, children: [_jsx("div", { className: "space-y-8", children: posts.map(function (post) { return (_jsxs("article", { className: "border-b border-gray-200 pb-8", children: [_jsx(Link, { href: "/blog/".concat(post.slug), className: "group", children: _jsx("h2", { className: "text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2", children: post.title }) }), _jsx("div", { className: "text-sm text-gray-500 mb-4", children: new Date(post.created_at).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }) }), _jsx("div", { className: "prose prose-gray max-w-none", children: _jsx(PostExcerpt, { content: post.content, excerpt: post.excerpt }) }), _jsx(Link, { href: "/blog/".concat(post.slug), className: "inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium", children: "Read more \u2192" })] }, post.id)); }) }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center space-x-4 mt-12", children: [page > 1 && (_jsx(Link, { href: "?page=".concat(page - 1), className: "px-4 py-2 border border-gray-300 rounded hover:bg-gray-50", children: "Previous" })), _jsxs("span", { className: "text-gray-600", children: ["Page ", page, " of ", totalPages] }), page < totalPages && (_jsx(Link, { href: "?page=".concat(page + 1), className: "px-4 py-2 border border-gray-300 rounded hover:bg-gray-50", children: "Next" }))] }))] }));
}
