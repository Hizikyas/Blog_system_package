import useSWR from 'swr';
import { useBlogContext } from '../context/BlogContext';
import { Post } from '../types';

export function usePosts(page = 1, limit = 10) {
  const { supabaseClient } = useBlogContext();

  const fetcher = async () => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabaseClient
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) throw error;
    return { posts: data as Post[], total: count };
  };

  const { data, error, isLoading, mutate } = useSWR(
    `posts-${page}-${limit}`,
    fetcher
  );

  return {
    posts: data?.posts || [],
    total: data?.total || 0,
    isLoading,
    error,
    mutate
  };
}
