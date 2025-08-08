import { Post } from '../types';
export declare function usePosts(page?: number, limit?: number): {
    posts: Post[];
    total: any;
    isLoading: boolean;
    error: any;
    mutate: import("swr").KeyedMutator<{
        posts: Post[];
        total: any;
    }>;
};
