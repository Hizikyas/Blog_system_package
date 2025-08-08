import { ReactionCounts } from '../types';
export declare function useReactions(postId: string): {
    reactions: ReactionCounts;
    isLoading: boolean;
    error: any;
    addReaction: (type: "like" | "dislike") => Promise<void>;
    mutate: import("swr").KeyedMutator<ReactionCounts>;
};
