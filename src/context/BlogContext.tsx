'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BlogContextType } from '../types';

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: React.ReactNode;
  supabaseClient: any;
}

export function BlogProvider({ children, supabaseClient }: BlogProviderProps) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user) {
          const { data } = await supabaseClient
            .from('auth.users')
            .select('is_admin')
            .eq('id', user.id)
            .single();
          
          setIsAdmin(data?.is_admin || false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };

    checkAdminStatus();

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (event: string) => {
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
          checkAdminStatus();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabaseClient]);

  return (
    <BlogContext.Provider value={{ supabaseClient, isAdmin }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
}
