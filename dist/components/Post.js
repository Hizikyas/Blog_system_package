"use client";
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
export function Post(_a) {
    var slug = _a.slug, _b = _a.className, className = _b === void 0 ? "" : _b;
    var _c = usePost(slug), post = _c.post, isLoading = _c.isLoading, error = _c.error;
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
                                }) }), _jsx(ReportButton, { targetId: post.id, type: "post" })] })] }), _jsx("div", { className: "prose prose-lg max-w-none mb-8", dangerouslySetInnerHTML: {
                    __html: DOMPurify.sanitize(marked.parse(post.content)),
                } }), _jsx("div", { className: "border-t border-gray-200 pt-8", children: _jsx(ReactionButtons, { postId: post.id }) }), _jsx("div", { className: "mt-12", children: _jsx(CommentSection, { postId: post.id }) })] }));
}
