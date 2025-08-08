export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  created_at: string;
  updated_at: string;
}

export interface Reaction {
  id: string;
  post_id: string;
  type: 'like' | 'dislike';
  user_ip: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  content: string;
  author_name: string;
  created_at: string;
}

export interface Report {
  id: string;
  post_id?: string;
  comment_id?: string;
  reason: string;
  reporter_ip?: string;
  created_at: string;
}

export interface ReactionCounts {
  likes: number;
  dislikes: number;
  userReaction?: 'like' | 'dislike' | null;
}

export interface BlogContextType {
  supabaseClient: any;
  isAdmin: boolean;
}

export interface CreatePostData {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
}

export interface CreateCommentData {
  post_id: string;
  content: string;
  author_name?: string;
}

export interface CreateReportData {
  post_id?: string;
  comment_id?: string;
  reason: string;
}
