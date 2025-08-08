'use client';

import React, { useState } from 'react';
import { useReportContent } from '../hooks/useReportContent';

interface ReportButtonProps {
  targetId: string;
  type: 'post' | 'comment';
  className?: string;
}

export function ReportButton({ targetId, type, className = '' }: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { reportContent } = useReportContent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;

    setIsSubmitting(true);
    try {
      await reportContent({
        [type === 'post' ? 'post_id' : 'comment_id']: targetId,
        reason: reason.trim()
      });
      setReason('');
      setIsOpen(false);
      alert('Report submitted successfully');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 text-sm"
        title={`Report this ${type}`}
      >
        Report
      </button>

      {isOpen && (
        <div className="absolute right-0 top-6 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
          <form onSubmit={handleSubmit}>
            <h4 className="font-medium text-gray-900 mb-2">
              Report this {type}
            </h4>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please describe why you're reporting this content..."
              rows={3}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !reason.trim()}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
