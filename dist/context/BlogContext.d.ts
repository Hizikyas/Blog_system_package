import React from 'react';
import { BlogContextType } from '../types';
interface BlogProviderProps {
    children: React.ReactNode;
    supabaseClient: any;
}
export declare function BlogProvider({ children, supabaseClient }: BlogProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useBlogContext(): BlogContextType;
export {};
