

import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function ProfilePostsGrid({ blogs, userId, loading = false }) {
  if (loading) {
    return <LoadingSpinner message="Loading posts..." />;
  }

  if (!blogs?.length) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Posts Yet</h3>
        <p className="text-slate-600 mb-6">Get started by creating your first post</p>
        <Link to="/create" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">
          Create Post
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Recent Posts</h2>
          <Link to={`/user/${userId}/blogs`} className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
            View All →
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-6">
        {blogs.slice(0, 6).map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`} className="group relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all">
            <img
              src={blog.coverImage?.url || "/api/placeholder/400/300"}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all p-4 flex flex-col justify-end">
              <h3 className="text-white font-semibold text-sm truncate">{blog.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}



