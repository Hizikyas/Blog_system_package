'use client';
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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useComments } from '../hooks/useComments';
import { ReportButton } from './ReportButton';
export function CommentSection(_a) {
    var _this = this;
    var postId = _a.postId, _b = _a.className, className = _b === void 0 ? '' : _b;
    var _c = useComments(postId), comments = _c.comments, isLoading = _c.isLoading, addComment = _c.addComment;
    var _d = useState(''), newComment = _d[0], setNewComment = _d[1];
    var _e = useState(''), authorName = _e[0], setAuthorName = _e[1];
    var _f = useState(false), isSubmitting = _f[0], setIsSubmitting = _f[1];
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    if (!newComment.trim())
                        return [2 /*return*/];
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, addComment({
                            content: newComment.trim(),
                            author_name: authorName.trim() || 'Anonymous'
                        })];
                case 2:
                    _a.sent();
                    setNewComment('');
                    setAuthorName('');
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error adding comment:', error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: className, children: [_jsxs("h3", { className: "text-xl font-semibold text-gray-900 mb-6", children: ["Comments (", comments.length, ")"] }), _jsxs("form", { onSubmit: handleSubmit, className: "mb-8 p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "author-name", className: "block text-sm font-medium text-gray-700 mb-2", children: "Name (optional)" }), _jsx("input", { id: "author-name", type: "text", value: authorName, onChange: function (e) { return setAuthorName(e.target.value); }, placeholder: "Your name", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "comment-content", className: "block text-sm font-medium text-gray-700 mb-2", children: "Comment *" }), _jsx("textarea", { id: "comment-content", value: newComment, onChange: function (e) { return setNewComment(e.target.value); }, placeholder: "Write your comment...", rows: 4, required: true, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" })] }), _jsx("button", { type: "submit", disabled: isSubmitting || !newComment.trim(), className: "px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed", children: isSubmitting ? 'Posting...' : 'Post Comment' })] }), isLoading ? (_jsx("div", { className: "space-y-4", children: __spreadArray([], Array(3), true).map(function (_, i) { return (_jsxs("div", { className: "animate-pulse p-4 border border-gray-200 rounded-lg", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [_jsx("div", { className: "w-16 h-4 bg-gray-200 rounded" }), _jsx("div", { className: "w-20 h-3 bg-gray-200 rounded" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-gray-200 rounded" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" })] })] }, i)); }) })) : comments.length === 0 ? (_jsx("p", { className: "text-gray-500 text-center py-8", children: "No comments yet. Be the first to comment!" })) : (_jsx("div", { className: "space-y-4", children: comments.map(function (comment) { return (_jsxs("div", { className: "p-4 border border-gray-200 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium text-gray-900", children: comment.author_name }), _jsx("span", { className: "text-sm text-gray-500", children: new Date(comment.created_at).toLocaleDateString() })] }), _jsx(ReportButton, { targetId: comment.id, type: "comment" })] }), _jsx("p", { className: "text-gray-700 whitespace-pre-wrap", children: comment.content })] }, comment.id)); }) }))] }));
}
