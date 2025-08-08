import { Comment, CreateCommentData } from '../types';
export declare function useComments(postId: string): {
    comments: Comment[];
    isLoading: boolean;
    error: any;
    addComment: (commentData: Omit<CreateCommentData, "post_id">) => Promise<void>;
    mutate: import("swr").KeyedMutator<Comment[]>;
};
