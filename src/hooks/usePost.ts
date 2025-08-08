import useSWR from 'swr';
import { useBlogContext } from '../context/BlogContext';
import { Post } from '../types';

export function usePost(slug: string) {
  const { supabaseClient } = useBlogContext();

  const fetcher = async () => {
    const { data, error } = await supabaseClient
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Post;
  };

  const { data, error, isLoading, mutate } = useSWR(
    slug ? `post-${slug}` : null,
    fetcher
  );

  return {
    post: data,
    isLoading,
    error,
    mutate
  };
}
