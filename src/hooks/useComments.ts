import useSWR from 'swr';
import { useBlogContext } from '../context/BlogContext';
import { Comment, CreateCommentData } from '../types';

export function useComments(postId: string) {
  const { supabaseClient } = useBlogContext();

  const fetcher = async () => {
    const { data, error } = await supabaseClient
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data as Comment[];
  };

  const { data, error, isLoading, mutate } = useSWR(
    `comments-${postId}`,
    fetcher
  );

  const addComment = async (commentData: Omit<CreateCommentData, 'post_id'>) => {
    try {
      const { error } = await supabaseClient
        .from('comments')
        .insert({
          ...commentData,
          post_id: postId,
          author_name: commentData.author_name || 'Anonymous'
        });

      if (error) throw error;
      mutate();
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  };

  return {
    comments: data || [],
    isLoading,
    error,
    addComment,
    mutate
  };
}
