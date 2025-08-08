import { useBlogContext } from '../context/BlogContext';
import { CreatePostData } from '../types';

export function useCreatePost() {
  const { supabaseClient, isAdmin } = useBlogContext();

  const createPost = async (postData: CreatePostData) => {
    if (!isAdmin) {
      throw new Error('Admin access required');
    }

    try {
      const { data, error } = await supabaseClient
        .from('posts')
        .insert(postData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  };

  const updatePost = async (id: string, postData: Partial<CreatePostData>) => {
    if (!isAdmin) {
      throw new Error('Admin access required');
    }

    try {
      const { data, error } = await supabaseClient
        .from('posts')
        .update(postData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  };

  const deletePost = async (id: string) => {
    if (!isAdmin) {
      throw new Error('Admin access required');
    }

    try {
      const { error } = await supabaseClient
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  return {
    createPost,
    updatePost,
    deletePost,
    isAdmin
  };
}
