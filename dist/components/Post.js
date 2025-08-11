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
import { usePost } from "../hooks/usePost";
import { ReactionButtons } from "./ReactionButtons";
import { CommentSection } from "./CommentSection";
import { ReportButton } from "./ReportButton";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
export function Post(_a) {
    var _this = this;
    var slug = _a.slug, _b = _a.className, className = _b === void 0 ? "" : _b;
    var _c = usePost(slug), post = _c.post, isLoading = _c.isLoading, error = _c.error;
    var _d = useState(""), parsedContent = _d[0], setParsedContent = _d[1];
    useEffect(function () {
        if (post === null || post === void 0 ? void 0 : post.content) {
            var parseContent = function () { return __awaiter(_this, void 0, void 0, function () {
                var html, err_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, marked.parse(post.content)];
                        case 1:
                            html = _a.sent();
                            setParsedContent(DOMPurify.sanitize(html));
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _a.sent();
                            console.error("Error parsing markdown:", err_1);
                            setParsedContent(DOMPurify.sanitize(post.content));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            parseContent();
        }
    }, [post === null || post === void 0 ? void 0 : post.content]);
    if (isLoading) {
        return (_jsxs("div", { className: "animate-pulse ".concat(className), children: [_jsx("div", { className: "h-8 bg-gray-200 rounded mb-4" }), _jsx("div", { className: "h-4 bg-gray-200 rounded mb-8 w-1/3" }), _jsx("div", { className: "space-y-4", children: __spreadArray([], Array(5), true).map(function (_, i) { return (_jsx("div", { className: "h-4 bg-gray-200 rounded" }, i)); }) })] }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-red-600 p-4 border border-red-200 rounded ".concat(className), children: ["Error loading post: ", error.message] }));
    }
    if (!post) {
        return _jsx("div", { className: "text-gray-600 p-4 ".concat(className), children: "Post not found" });
    }
    return (_jsxs("article", { className: className, children: [_jsxs("header", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold text-gray-900 mb-4", children: post.title }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-500", children: [_jsx("time", { dateTime: post.created_at, children: new Date(post.created_at).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }) }), _jsx(ReportButton, { targetId: post.id, type: "post" })] })] }), _jsx("div", { className: "prose prose-lg max-w-none mb-8", dangerouslySetInnerHTML: { __html: parsedContent } }), _jsx("div", { className: "border-t border-gray-200 pt-8", children: _jsx(ReactionButtons, { postId: post.id }) }), _jsx("div", { className: "mt-12", children: _jsx(CommentSection, { postId: post.id }) })] }));
}
