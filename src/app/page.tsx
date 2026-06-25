"use client";



import { useState } from "react";

import { mockPosts as initialPosts } from "../data/posts";

import { Heart, Bookmark, Share2, MessageCircle } from "lucide-react";



export default function Home() {

  const [posts, setPosts] = useState(initialPosts);



  const handleLike = (id: string) => {

    setPosts((prevPosts) =>

      prevPosts.map((post) =>

        post.id === id

          ? {

              ...post,

              isLiked: !post.isLiked,

              likes: post.isLiked ? post.likes - 1 : post.likes + 1,

            }

          : post

      )

    );

  };



  const handleSave = (id: string) => {

    setPosts((prevPosts) =>

      prevPosts.map((post) =>

        post.id === id ? { ...post, isSaved: !post.isSaved } : post

      )

    );

  };



  const handleShare = (username: string) => {

    alert(`Link copied! Share ${username}'s post with your friends.`);

  };



  return (

    <div className="max-w-lg mx-auto py-6 space-y-6">

      {posts.map((post) => (

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

            <div>

              <span className="font-semibold text-sm hover:underline cursor-pointer block">

                @{post.username}

              </span>

            </div>

          </div>



          {/* Body Caption */}

          <p className="text-sm text-slate-800 dark:text-slate-200 mb-4 whitespace-pre-wrap">

            {post.caption}

          </p>



          {/* Simulated Media/Placeholder Element */}

          <div className="w-full h-72 bg-gradient-to-br from-purple-100 to-orange-50 dark:from-slate-800 dark:to-slate-800/40 rounded-xl mb-4 flex flex-col items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">

            <span className="text-xs font-semibold tracking-wider text-purple-600 dark:text-orange-400 uppercase">

              [ Media Content Feed Display Container ]

            </span>

            <span className="text-[11px] text-slate-400 mt-1">

              (No video playback required per specifications)

            </span>

          </div>



          {/* Dynamic Interactive Action Buttons */}

          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-slate-500 dark:text-slate-400">

            {/* Like Button Trigger */}

            <button

              onClick={() => handleLike(post.id)}

              className={`flex items-center gap-2 text-sm font-medium transition-colors p-1 group`}

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



            {/* Comments Placeholder Counter */}

            <div className="flex items-center gap-2 text-sm font-medium p-1 cursor-default">

              <MessageCircle className="w-5 h-5" />

              <span>{post.commentsCount}</span>

            </div>



            {/* Save Button Trigger */}

            <button

              onClick={() => handleSave(post.id)}

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



            {/* Share Alert Trigger */}

            <button

              onClick={() => handleShare(post.username)}

              className="flex items-center gap-2 text-sm font-medium hover:text-slate-800 dark:hover:text-slate-200 transition-colors p-1"

            >

              <Share2 className="w-5 h-5" />

              <span>Share</span>

            </button>

          </div>

        </div>

      ))}

    </div>

  );

}