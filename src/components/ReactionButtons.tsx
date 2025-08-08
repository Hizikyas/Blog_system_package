'use client';

import React from 'react';
import { useReactions } from '../hooks/useReactions';

interface ReactionButtonsProps {
  postId: string;
  className?: string;
}

export function ReactionButtons({ postId, className = '' }: ReactionButtonsProps) {
  const { reactions, isLoading, addReaction } = useReactions(postId);

  if (isLoading) {
    return (
      <div className={`flex space-x-4 ${className}`}>
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="animate-pulse flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded"></div>
          <div className="w-6 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-6 ${className}`}>
      <button
        onClick={() => addReaction('like')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          reactions.userReaction === 'like'
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{reactions.likes}</span>
      </button>

      <button
        onClick={() => addReaction('dislike')}
        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
          reactions.userReaction === 'dislike'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
        }`}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" transform="rotate(180)">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">{reactions.dislikes}</span>
      </button>
    </div>
  );
}
