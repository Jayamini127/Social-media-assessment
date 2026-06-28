"use client";

import { useState, useEffect } from "react";
import { usePosts } from "@/hooks/usePosts"; 
import { Heart, Bookmark, Share2, MessageCircle } from "lucide-react";
import SkeletonLoader from "@/components/SkeletonLoader";
import toast from "react-hot-toast";

export default function Home() {
  const { posts, toggleLikePost, toggleSavePost } = usePosts(); 
  const [isLoading, setIsLoading] = useState(true);

  // Simulate asset fetching timeline safely
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = (username: string) => {
    toast.success(`Link copied! Share ${username}'s post with your friends.`);
  };

  const handleSaveToggle = (id: string, currentlySaved: boolean) => {
    toggleSavePost(id);
    toast.success(currentlySaved ? "Post unsaved" : "Post saved!");
  };

  const handleLikeToggle = (id: string, currentlyLiked: boolean) => {
    toggleLikePost(id);
    if (!currentlyLiked) {
      toast.success("Post liked!");
    }
  };

  return (
    <div className="max-w-lg mx-auto py-6 space-y-6">
      {isLoading ? (
        <>
          <SkeletonLoader />
          <SkeletonLoader />
        </>
      ) : (
        posts.map((post: any) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
          >
            {/* Top Header Row: User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={post.avatarUrl}
                alt={post.username}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/20"
              />
              <div className="flex flex-col text-left">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:underline cursor-pointer block">
                  {post.name || (post.username === "sophi_brown" ? "Sophia Brown" : "Emma Wilson")}
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500 block">
                  @{post.username}
                </span>
              </div>
            </div>

            {/* Body Caption */}
            <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 whitespace-pre-wrap">
              {post.caption}
            </p>

            {/* Media Placeholder Element */}
            <div className="w-full h-44 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 transition-colors">
              <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500">
                <span className="text-2xl">📷</span>
                <span className="text-xs font-medium tracking-wide">Media Preview</span>
              </div>
            </div>

            {/* Dynamic Interactive Action Buttons */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-slate-500 dark:text-slate-400">
              {/* Like Button Trigger */}
              <button
                onClick={() => handleLikeToggle(post.id, post.isLiked)}
                className="flex items-center gap-2 text-sm font-medium transition-colors p-1 group"
              >
                <Heart
                  className={`w-5 h-5 transition-transform group-active:scale-125 ${
                    post.isLiked
                      ? "fill-orange-500 text-orange-500"
                      : "hover:text-orange-500"
                  }`}
                />
                <span className={post.isLiked ? "text-orange-500 font-bold" : ""}>
                  {post.likes}
                </span>
              </button>

              {/* Comments Counter */}
              <div className="flex items-center gap-2 text-sm font-medium p-1 cursor-default">
                <MessageCircle className="w-5 h-5" />
                <span>{post.commentsCount ?? post.comments ?? 0}</span>
              </div>

              {/* Save Button Trigger */}
              <button
                onClick={() => handleSaveToggle(post.id, post.isSaved)}
                className="flex items-center gap-2 text-sm font-medium transition-colors p-1 group"
              >
                <Bookmark
                  className={`w-5 h-5 transition-transform group-active:scale-125 ${
                    post.isSaved
                      ? "fill-purple-600 text-purple-600"
                      : "hover:text-purple-600"
                  }`}
                />
                <span className={post.isSaved ? "text-purple-600 font-bold" : ""}>
                  {post.isSaved ? "Saved" : "Save"}
                </span>
              </button>

              {/* Share Trigger */}
              <button
                onClick={() => handleShare(post.username)}
                className="flex items-center gap-2 text-sm font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-1"
              >
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}