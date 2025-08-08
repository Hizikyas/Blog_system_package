import { CreatePostData } from '../types';
export declare function useCreatePost(): {
    createPost: (postData: CreatePostData) => Promise<any>;
    updatePost: (id: string, postData: Partial<CreatePostData>) => Promise<any>;
    deletePost: (id: string) => Promise<void>;
    isAdmin: boolean;
};
