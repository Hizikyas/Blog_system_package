import { Post } from '../types';
export declare function usePost(slug: string): {
    post: Post | undefined;
    isLoading: boolean;
    error: any;
    mutate: import("swr").KeyedMutator<Post>;
};
