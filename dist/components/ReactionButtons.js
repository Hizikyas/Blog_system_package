'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useReactions } from '../hooks/useReactions';
export function ReactionButtons(_a) {
    var postId = _a.postId, _b = _a.className, className = _b === void 0 ? '' : _b;
    var _c = useReactions(postId), reactions = _c.reactions, isLoading = _c.isLoading, addReaction = _c.addReaction;
    if (isLoading) {
        return (_jsxs("div", { className: "flex space-x-4 ".concat(className), children: [_jsxs("div", { className: "animate-pulse flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-gray-200 rounded" }), _jsx("div", { className: "w-6 h-4 bg-gray-200 rounded" })] }), _jsxs("div", { className: "animate-pulse flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 bg-gray-200 rounded" }), _jsx("div", { className: "w-6 h-4 bg-gray-200 rounded" })] })] }));
    }
    return (_jsxs("div", { className: "flex items-center space-x-6 ".concat(className), children: [_jsxs("button", { onClick: function () { return addReaction('like'); }, className: "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ".concat(reactions.userReaction === 'like'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'), children: [_jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z", clipRule: "evenodd" }) }), _jsx("span", { className: "font-medium", children: reactions.likes })] }), _jsxs("button", { onClick: function () { return addReaction('dislike'); }, className: "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ".concat(reactions.userReaction === 'dislike'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'), children: [_jsx("svg", { className: "w-5 h-5", fill: "currentColor", viewBox: "0 0 20 20", transform: "rotate(180)", children: _jsx("path", { fillRule: "evenodd", d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z", clipRule: "evenodd" }) }), _jsx("span", { className: "font-medium", children: reactions.dislikes })] })] }));
}
