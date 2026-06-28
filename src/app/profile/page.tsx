"use client";

import { useState, useEffect } from "react";
import { mockUsers } from "../../data/users";
import { usePosts } from "@/hooks/usePosts"; 
import TabSwitcher from "@/components/TabSwitcher";
import Card from "@/components/Card";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Bookmark, Heart, MessageCircle } from "lucide-react";

export default function ProfilePage() {
  const currentUser = {
    id: "2",
    username: "sophi_brown",
    name: "Sophia Brown",
    avatarUrl: "avatar1.jpeg",
    bio: "Building responsive UI experiences | Next.js enthusiast 🚀",
    followersCount: 12500,
    followingCount: 348,
    likesCount: 89200
  };

  const { posts, toggleLikePost, toggleSavePost } = usePosts(); // Get globally shared hooks
  const [activeTab, setActiveTab] = useState("Posts");
  const [isTabLoading, setIsTabLoading] = useState(false);
  const tabs = ["Posts", "Saved"];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsTabLoading(true);
      const timer = setTimeout(() => setIsTabLoading(false), 450);
      return () => clearTimeout(timer);
    }
  }, [activeTab, isLoading]);

  const displayedPosts = posts.filter((post) => {
    if (activeTab === "Posts") {
      return post.username === currentUser.username || post.userId === currentUser.id;
    } else {
      return post.isSaved;
    }
  });

  
  const getCleanAvatar = (post: any) => {
    if (post.username === "sophi_brown") return currentUser.avatarUrl;
    if (post.username === "emma_w") return "/avatar2.jpg";
    return post.avatar || post.avatarUrl;
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6">
      
      {/* Profile Details Header Block */}
      <div className="flex flex-col items-center text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        {isLoading ? (
          <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse" />
        ) : (
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/30"
          />
        )}
        
        <div className="w-full flex flex-col items-center">
          {isLoading ? (
            <div className="space-y-2 flex flex-col items-center animate-pulse">
              <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">{currentUser.name}</h1>
              <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">@{currentUser.username}</p>
            </>
          )}
        </div>

        {isLoading ? (
          <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
        ) : (
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-sm">{currentUser.bio}</p>
        )}

        <div className="flex items-center justify-center gap-8 w-full border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2">
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-slate-50">
              {isLoading ? <div className="h-5 w-10 bg-slate-200 dark:bg-slate-800 rounded mx-auto animate-pulse" /> : currentUser.followingCount.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Following</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-slate-50">
              {isLoading ? <div className="h-5 w-10 bg-slate-200 dark:bg-slate-800 rounded mx-auto animate-pulse" /> : currentUser.followersCount.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-slate-50">
              {isLoading ? <div className="h-5 w-10 bg-slate-200 dark:bg-slate-800 rounded mx-auto animate-pulse" /> : currentUser.likesCount.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Likes</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dynamic Tab Content Feed Display */}
      {isLoading || isTabLoading ? (
        <div className="space-y-4">
          <SkeletonLoader />
        </div>
      ) : displayedPosts.length > 0 ? (
        <div className="space-y-4">
          {displayedPosts.map((post: any) => (
            <Card key={post.id}>
              {/* Top Row Feed Header Details Block */}
              <div className="flex items-center gap-3 mb-3">
                <img
                 
                  src={getCleanAvatar(post)}
                  alt={post.username}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/10"
                />
                <div className="flex flex-col text-left">
                  <span className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:underline cursor-pointer block">
                    {post.name || (post.username === "sophi_brown" ? "Sophia Brown" : "Creator")}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block">
                    @{post.username}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 mb-4">{post.caption}</p>

              {/* Media Placeholder Container */}
              <div className="w-full h-48 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-4 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 transition-colors p-4 text-center">
                <div className="flex flex-col items-center gap-1.5 text-slate-400 dark:text-slate-500">
                  <span className="text-xl">{activeTab === "Posts" ? "📷" : "🔖"}</span>
                  <span className="text-[11px] font-medium tracking-wide">
                    {activeTab === "Posts" ? "Media Preview" : "Saved Item"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-slate-500">
                <div className="flex items-center gap-6">
                  <button onClick={() => toggleLikePost(post.id)} className="flex items-center gap-2 text-sm font-medium group">
                    <Heart className={`w-5 h-5 transition-transform group-active:scale-125 ${post.isLiked ? "fill-orange-500 text-orange-500" : "hover:text-orange-500"}`} />
                    <span className={post.isLiked ? "text-orange-500 font-bold" : ""}>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments ?? post.commentsCount ?? 0}</span>
                  </div>
                </div>

                <button onClick={() => toggleSavePost(post.id)} className="flex items-center gap-2 text-sm font-medium group pr-2">
                  <Bookmark className={`w-5 h-5 transition-transform group-active:scale-125 ${post.isSaved ? "fill-purple-600 text-purple-600" : "hover:text-purple-600"}`} />
                  <span className={post.isSaved ? "text-purple-600 font-semibold" : ""}>
                    {post.isSaved ? "Saved" : "Save"}
                  </span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <Bookmark className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">No saved items yet</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
            Toggle the save button on your posts to add or remove them from this tab view.
          </p>
        </div>
      )}
    </div>
  );
}