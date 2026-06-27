"use client";

import React, { createContext, useState } from "react";
import { mockUsers } from "../data/users";
import { mockPosts } from "../data/posts";

export { mockUsers };

export interface Post {
  id: string;
  username: string;
  avatarUrl: string; 
  caption: string;
  likes: number;
  commentsCount: number; 
  sharesCount?: number;
  isLiked: boolean;
  isSaved: boolean;
  name?: string;    
  userId?: string;   
  thumbnailUrl?: string;
}

interface PostsContextType {
  posts: Post[];
  toggleSavePost: (id: string) => void;
  toggleLikePost: (id: string) => void;
}

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(() => 
    mockPosts.map((post) => {
      const userMatch = mockUsers.find((u) => u.username.toLowerCase() === post.username.toLowerCase());
      return {
        ...post,
        name: userMatch ? userMatch.name : post.username,
        // Fallback safely to post asset fields if profile image paths aren't fully resolved
        avatarUrl: userMatch ? userMatch.avatarUrl : post.avatarUrl,
        // Strict mapping normalization for properties like likes & comments
        likes: post.likes ?? 0,
        commentsCount: post.commentsCount ?? (post as any).comments ?? 0,
        isLiked: post.isLiked ?? false,
        isSaved: post.isSaved ?? false,
      };
    })
  );

  const toggleSavePost = (id: string) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, isSaved: !post.isSaved } : post))
    );
  };

  const toggleLikePost = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  return (
    <PostsContext.Provider value={{ posts, toggleSavePost, toggleLikePost }}>
      {children}
    </PostsContext.Provider>
  );
}