import useSWR from 'swr';
import { useBlogContext } from '../context/BlogContext';
import { ReactionCounts } from '../types';

export function useReactions(postId: string) {
  const { supabaseClient } = useBlogContext();

  const fetcher = async (): Promise<ReactionCounts> => {
    // Get reaction counts
    const { data: reactions, error } = await supabaseClient
      .from('reactions')
      .select('type')
      .eq('post_id', postId);

    if (error) throw error;

    const likes = reactions.filter((r: any) => r.type === 'like').length;
    const dislikes = reactions.filter((r: any) => r.type === 'dislike').length;

    // Check user's reaction (by IP)
    const userIP = await fetch('/api/get-ip').then(res => res.json()).catch(() => null);
    let userReaction = null;

    if (userIP?.ip) {
      const { data: userReactionData } = await supabaseClient
        .from('reactions')
        .select('type')
        .eq('post_id', postId)
        .eq('user_ip', userIP.ip)
        .single();

      userReaction = userReactionData?.type || null;
    }

    return { likes, dislikes, userReaction };
  };

  const { data, error, isLoading, mutate } = useSWR(
    `reactions-${postId}`,
    fetcher
  );

  const addReaction = async (type: 'like' | 'dislike') => {
    try {
      const userIP = await fetch('/api/get-ip').then(res => res.json());
      
      // Remove existing reaction first
      await supabaseClient
        .from('reactions')
        .delete()
        .eq('post_id', postId)
        .eq('user_ip', userIP.ip);

      // Add new reaction if different from current
      if (data?.userReaction !== type) {
        await supabaseClient
          .from('reactions')
          .insert({
            post_id: postId,
            type,
            user_ip: userIP.ip
          });
      }

      mutate();
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  return {
    reactions: data || { likes: 0, dislikes: 0, userReaction: null },
    isLoading,
    error,
    addReaction,
    mutate
  };
}
