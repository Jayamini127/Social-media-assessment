"use client";

import { useState } from "react";
import { mockUsers } from "../../data/users";
import { mockPosts as initialPosts } from "../../data/posts";
import TabSwitcher from "@/components/TabSwitcher";
import Card from "@/components/Card";
import { Grid, Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";

export default function ProfilePage() {
  const currentUser = mockUsers[0] || {
    id: "1",
    username: "alex_dev",
    name: "Alex Rivera",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    bio: "Building responsive UI experiences | Next.js enthusiast 🚀",
    followersCount: 12500,
    followingCount: 348,
    likesCount: 89200
  };

  // State array tracking our active posts locally on this page
  const [posts, setPosts] = useState(initialPosts);
  const [activeTab, setActiveTab] = useState("Posts");
  const tabs = ["Posts", "Saved"];

  // Live filter calculation
  const displayedPosts = posts.filter((post) => {
    if (activeTab === "Posts") {
      return post.username === currentUser.username;
    } else {
      return post.isSaved; // If a post has isSaved: true, it shows up here
    }
  });

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  // Real-time Save/Unsave handler
  const handleSaveToggle = (id: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6">
      
      {/* Profile Details Header Block */}
      <div className="flex flex-col items-center text-center space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        {/* Corrected to use currentUser data fields inside the top profile header block */}
        <img 
          src={currentUser.avatarUrl} 
          alt={currentUser.name} 
          className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/30" 
        />
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">{currentUser.name}</h1>
          <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">@{currentUser.username}</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300 max-w-sm">{currentUser.bio}</p>

        <div className="flex items-center justify-center gap-8 w-full border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-2">
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-slate-50">{currentUser.followingCount.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Following</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-slate-50">{currentUser.followersCount.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Followers</span>
          </div>
          <div className="text-center">
            <span className="block text-lg font-bold text-slate-900 dark:text-slate-50">{currentUser.likesCount.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Likes</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dynamic Tab Content Feed Display */}
      {displayedPosts.length > 0 ? (
        <div className="space-y-4">
          {displayedPosts.map((post) => (
            <Card key={post.id}>
              {/* Card Header Row - Correctly referencing post parameters */}
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={post.avatarUrl} 
                  alt={post.username} 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/10" 
                />
                <span className="font-semibold text-sm">@{post.username}</span>
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 mb-4">{post.caption}</p>

              <div className="w-full h-48 bg-gradient-to-br from-purple-100/50 to-orange-50/50 dark:from-slate-800/80 dark:to-slate-800/30 rounded-xl mb-4 flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-slate-700 p-4 text-center">
                <span className="text-xs font-semibold text-purple-600 dark:text-orange-400 tracking-wider uppercase">
                  {activeTab === "Posts" ? "[ Creator Content Asset ]" : "[ Saved Media Reference Container ]"}
                </span>
              </div>

              {/* Enhanced Interactive Footer Bar */}
              <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-slate-500">
                <div className="flex items-center gap-6">
                  {/* Like Button */}
                  <button onClick={() => handleLike(post.id)} className="flex items-center gap-2 text-sm font-medium group">
                    <Heart className={`w-5 h-5 transition-transform group-active:scale-125 ${post.isLiked ? "fill-orange-500 text-orange-500" : "hover:text-orange-500"}`} />
                    <span className={post.isLiked ? "text-orange-500 font-bold" : ""}>{post.likes}</span>
                  </button>

                  {/* Comment Count */}
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.commentsCount}</span>
                  </div>
                </div>

                {/* Live Bookmark Save Action Button */}
                <button onClick={() => handleSaveToggle(post.id)} className="flex items-center gap-2 text-sm font-medium group pr-2">
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
        /* Meaningful Empty State when all items are unsaved */
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