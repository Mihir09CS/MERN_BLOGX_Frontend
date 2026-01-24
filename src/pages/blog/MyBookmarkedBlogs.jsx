// src/pages/blog/MyBookmarkedBlogs.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { BLOG_ENDPOINTS } from "../../api/endpoints";

export default function MyBookmarkedBlogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarkedBlogs();
  }, []);

  const fetchBookmarkedBlogs = async () => {
    try {
      const { data } = await userAPI.get(BLOG_ENDPOINTS.MY_BOOKMARKS);
      setBlogs(data.bookmarks || []);

    } catch (err) {
      toast.error("Failed to load bookmarked articles");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = async (blogId) => {
    const toastId = toast.loading("Removing bookmark...");

    try {
      await userAPI.put(BLOG_ENDPOINTS.BOOKMARK(blogId));
      toast.success("Removed from bookmarks", { id: toastId });
      fetchBookmarkedBlogs(); // Refresh list
    } catch (err) {
      toast.error("Failed to remove bookmark", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-amber-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">
            Loading bookmarks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-3 bg-amber-100 rounded-xl">
              <svg
                className="w-8 h-8 text-amber-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                My Bookmarks
              </h1>
              <p className="text-lg text-slate-600 mt-1">
                {blogs.length} saved{" "}
                {blogs.length === 1 ? "article" : "articles"}
              </p>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              No bookmarks yet
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Save articles to read later. Tap the bookmark icon on any article
              to add it here.
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Explore Articles
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BookmarkedBlogCard
                key={blog._id}
                blog={blog}
                onRemoveBookmark={() => handleRemoveBookmark(blog._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BookmarkedBlogCard({ blog, onRemoveBookmark }) {
  const navigate = useNavigate();

  return (
    <article className="group bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Cover Image */}
      <Link to={`/blog/${blog._id}`} className="block relative overflow-hidden">
        {blog.coverImage?.url ? (
          <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        ) : (
          <div className="aspect-[16/10] bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        )}

        {/* Bookmark Badge */}
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemoveBookmark();
            }}
            className="p-2 bg-white/95 hover:bg-red-50 rounded-full shadow-lg transition-colors group/btn"
            title="Remove bookmark"
          >
            <svg
              className="w-5 h-5 text-amber-600 group-hover/btn:text-red-600 transition"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
        </div>

        {/* Category Badge */}
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full shadow-lg">
              {blog.category}
            </span>
          </div>
        )}
      </Link>

      <div className="p-6">
        {/* Title */}
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Author & Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            to={`/profile/${blog.author?._id}`}
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {blog.author?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {blog.author?.name}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </Link>

          {/* Stats */}
          <div className="flex items-center space-x-3 text-xs text-slate-500">
            <span className="flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="font-medium">{blog.views || 0}</span>
            </span>

            <span className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">{blog.likes?.length || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
