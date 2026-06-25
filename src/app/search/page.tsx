"use client";

import { useState } from "react";
import Link from "next/link";
import { mockUsers } from "../../data/users";
import SearchInput from "@/components/SearchInput";
import Card from "@/components/Card";
import { User, ChevronRight } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Real-time filtering based on username or display name
  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
          Search
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Find and discover creators
        </p>
      </div>

      {/* Reusable Search Input Component */}
      <SearchInput 
        value={searchQuery} 
        onChange={setSearchQuery} 
        placeholder="Search by name or @username..."
      />

      {/* Filtered User Results Grid/Stack */}
      {filteredUsers.length > 0 ? (
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <Link key={user.id} href={`/profile`}>
              <div className="block cursor-pointer transform active:scale-[0.99] transition-transform mb-3">
                <Card>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                      {/* User Profile Avatar Frame */}
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/20"
                      />
                      <div className="text-left">
                        <h2 className="font-semibold text-slate-900 dark:text-slate-50 text-sm">
                          {user.name}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          @{user.username}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5 max-w-[250px] sm:max-w-[350px]">
                          {user.bio}
                        </p>
                      </div>
                    </div>
                    
                    {/* Visual Indicator showing row is clickable/navigable */}
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                </Card>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* Meaningful Empty State required by PDF */
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 p-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            No users found
          </h3>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
            We couldn't find any creators matching "{searchQuery}". Check the spelling or try another name.
          </p>
        </div>
      )}
    </div>
  );
}