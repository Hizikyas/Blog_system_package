'use client';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { useState, useEffect } from 'react';
import { useCreatePost } from '../../hooks/useCreatePost';
import { usePost } from '../../hooks/usePost';
import { useBlogContext } from '../../context/BlogContext';
export function EditPostForm(_a) {
    var _this = this;
    var postId = _a.postId, onSuccess = _a.onSuccess, _b = _a.className, className = _b === void 0 ? '' : _b;
    var isAdmin = useBlogContext().isAdmin;
    var _c = useCreatePost(), updatePost = _c.updatePost, deletePost = _c.deletePost;
    var _d = usePost(postId), post = _d.post, isLoading = _d.isLoading;
    var _e = useState({
        title: '',
        content: '',
        slug: '',
        excerpt: ''
    }), formData = _e[0], setFormData = _e[1];
    var _f = useState(false), isSubmitting = _f[0], setIsSubmitting = _f[1];
    useEffect(function () {
        if (post) {
            setFormData({
                title: post.title,
                content: post.content,
                slug: post.slug,
                excerpt: post.excerpt || ''
            });
        }
    }, [post]);
    if (!isAdmin) {
        return (_jsx("div", { className: "text-red-600 p-4 border border-red-200 rounded ".concat(className), children: "Admin access required" }));
    }
    if (isLoading) {
        return (_jsxs("div", { className: "animate-pulse ".concat(className), children: [_jsx("div", { className: "h-8 bg-gray-200 rounded mb-6" }), _jsx("div", { className: "space-y-4", children: __spreadArray([], Array(4), true).map(function (_, i) { return (_jsx("div", { className: "h-10 bg-gray-200 rounded" }, i)); }) })] }));
    }
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!formData.title.trim() || !formData.content.trim() || !formData.slug.trim()) {
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, updatePost(postId, {
                            title: formData.title.trim(),
                            content: formData.content.trim(),
                            slug: formData.slug.trim(),
                            excerpt: formData.excerpt.trim() || undefined
                        })];
                case 2:
                    _a.sent();
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error updating post:', error_1);
                    alert('Error updating post');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function () { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, deletePost(postId)];
                case 2:
                    _a.sent();
                    onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error deleting post:', error_2);
                    alert('Error deleting post');
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900", children: "Edit Post" }), _jsx("button", { onClick: handleDelete, disabled: isSubmitting, className: "px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50", children: "Delete Post" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "title", className: "block text-sm font-medium text-gray-700 mb-2", children: "Title *" }), _jsx("input", { id: "title", type: "text", value: formData.title, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { title: e.target.value })); }); }, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "slug", className: "block text-sm font-medium text-gray-700 mb-2", children: "Slug *" }), _jsx("input", { id: "slug", type: "text", value: formData.slug, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { slug: e.target.value })); }); }, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "excerpt", className: "block text-sm font-medium text-gray-700 mb-2", children: "Excerpt (optional)" }), _jsx("textarea", { id: "excerpt", value: formData.excerpt, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { excerpt: e.target.value })); }); }, rows: 3, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "content", className: "block text-sm font-medium text-gray-700 mb-2", children: "Content (Markdown) *" }), _jsx("textarea", { id: "content", value: formData.content, onChange: function (e) { return setFormData(function (prev) { return (__assign(__assign({}, prev), { content: e.target.value })); }); }, rows: 15, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono" })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: "w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? 'Updating...' : 'Update Post' })] })] }));
}
