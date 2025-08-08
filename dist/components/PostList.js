'use client';
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
import Link from 'next/link';
import { usePosts } from '../hooks/usePosts';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
export function PostList(_a) {
    var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c, _d = _a.className, className = _d === void 0 ? '' : _d;
    var _e = usePosts(page, limit), posts = _e.posts, total = _e.total, isLoading = _e.isLoading, error = _e.error;
    if (isLoading) {
        return (_jsx("div", { className: "space-y-6 ".concat(className), children: __spreadArray([], Array(3), true).map(function (_, i) { return (_jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "h-6 bg-gray-200 rounded mb-2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded mb-4 w-3/4" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 bg-gray-200 rounded" }), _jsx("div", { className: "h-3 bg-gray-200 rounded w-5/6" })] })] }, i)); }) }));
    }
    if (error) {
        return (_jsxs("div", { className: "text-red-600 p-4 border border-red-200 rounded ".concat(className), children: ["Error loading posts: ", error.message] }));
    }
    var totalPages = Math.ceil(total / limit);
    return (_jsxs("div", { className: className, children: [_jsx("div", { className: "space-y-8", children: posts.map(function (post) { return (_jsxs("article", { className: "border-b border-gray-200 pb-8", children: [_jsx(Link, { href: "/blog/".concat(post.slug), className: "group", children: _jsx("h2", { className: "text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2", children: post.title }) }), _jsx("div", { className: "text-sm text-gray-500 mb-4", children: new Date(post.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) }), _jsx("div", { className: "prose prose-gray max-w-none", children: post.excerpt ? (_jsx("p", { children: post.excerpt })) : (_jsx("div", { dangerouslySetInnerHTML: {
                                    __html: DOMPurify.sanitize(marked(post.content.substring(0, 300) + '...'))
                                } })) }), _jsx(Link, { href: "/blog/".concat(post.slug), className: "inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium", children: "Read more \u2192" })] }, post.id)); }) }), totalPages > 1 && (_jsxs("div", { className: "flex justify-center items-center space-x-4 mt-12", children: [page > 1 && (_jsx(Link, { href: "?page=".concat(page - 1), className: "px-4 py-2 border border-gray-300 rounded hover:bg-gray-50", children: "Previous" })), _jsxs("span", { className: "text-gray-600", children: ["Page ", page, " of ", totalPages] }), page < totalPages && (_jsx(Link, { href: "?page=".concat(page + 1), className: "px-4 py-2 border border-gray-300 rounded hover:bg-gray-50", children: "Next" }))] }))] }));
}
