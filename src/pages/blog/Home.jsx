

// src/pages/blog/Home.jsx
import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { BLOG_ENDPOINTS } from "../../api/endpoints";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [totalResults, setTotalResults] = useState(0);

  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "-createdAt";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    fetchBlogs();
  }, [category, search, sort, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await userAPI.get(BLOG_ENDPOINTS.GET_ALL, {
        params: { 
          category: category || undefined, 
          search: search || undefined, 
          sort,
          page 
        },
      });
      
      setBlogs(data.blogs || []);
      setTotalResults(data.total || 0);
      
      if (search && data.blogs.length === 0) {
        toast.error(`No results found for "${search}"`);
      } else if (search && data.blogs.length > 0) {
        toast.success(`Found ${data.total} result${data.total > 1 ? 's' : ''}`);
      }
      
    } catch (err) {
      toast.error("Failed to load blogs");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ 
      category, 
      search: searchInput.trim(), 
      sort,
      page: "1"
    });
  };

  const handleCategoryChange = (newCategory) => {
    setSearchParams({ 
      category: newCategory, 
      search, 
      sort,
      page: "1"
    });
  };

  const handleSortChange = (newSort) => {
    setSearchParams({ 
      category, 
      search, 
      sort: newSort,
      page: "1"
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchParams({});
    toast.success("Filters cleared");
  };

  const categories = ["All", "Technology", "Lifestyle", "Health", "Travel", "Food", "Business"];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ✨ STUNNING ANIMATED BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
        
        {/* Noise texture for depth */}
        <div className="absolute inset-0 bg-noise opacity-[0.015]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 🎨 HERO HEADER */}
        <div className="text-center mb-12 pt-8">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-full shadow-lg animate-pulse-slow">
              ✨ Discover Amazing Content
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 animate-gradient-x">
              Stories that Inspire
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-2">
            Join thousands of readers discovering insightful articles and captivating stories
          </p>
          {totalResults > 0 && (
            <p className="text-sm text-slate-500 font-medium">
              📚 {totalResults.toLocaleString()} article{totalResults > 1 ? 's' : ''} available
            </p>
          )}
        </div>

        {/* 🔍 MODERN SEARCH & FILTERS */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
            <form onSubmit={handleSearchSubmit} className="mb-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search for articles, topics, authors..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-14 pr-32 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all duration-200 outline-none"
                />
                <div className="absolute right-2 top-2 flex space-x-2">
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput("");
                        setSearchParams({ category, sort });
                      }}
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>

            {/* Sort Dropdown */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-200">
              <span className="text-sm font-medium text-slate-600">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm font-medium cursor-pointer hover:border-slate-300 transition"
              >
                <option value="-createdAt">🆕 Latest First</option>
                <option value="createdAt">⏰ Oldest First</option>
                <option value="-views">👁️ Most Viewed</option>
                <option value="-likes">❤️ Most Liked</option>
                <option value="title">🔤 A-Z</option>
                <option value="-title">🔤 Z-A</option>
              </select>
            </div>

            {/* Category Pills */}
            <div className="space-y-3">
              <span className="text-sm font-medium text-slate-600">Categories:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat === "All" ? "" : cat)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                      (cat === "All" && !category) || category === cat
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                
                {(search || category) && (
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    ✕ Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Active Filters Badge */}
            {(search || category) && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-slate-600">Active filters:</span>
                  {search && (
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                      🔍 "{search}"
                    </span>
                  )}
                  {category && (
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                      📁 {category}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 📊 LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-slate-600 font-semibold animate-pulse">Loading amazing content...</p>
          </div>
        )}

        {/* 📭 EMPTY STATE */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No articles found</h3>
              <p className="text-slate-600 mb-6">
                {search ? `We couldn't find any results for "${search}"` : "Try adjusting your filters to see more content"}
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* 📰 BLOG GRID */}
        {!loading && blogs.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {category ? `${category} Articles` : "Latest Articles"}
              </h2>
              <span className="text-sm text-slate-500 font-medium">
                Showing {blogs.length} of {totalResults}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog }) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");
  const isAuthor = currentUserId && blog.author?._id?.toString() === currentUserId.toString();

  return (
    <article className="group bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Cover Image - FIXED */}
      <Link to={`/blog/${blog._id}`} className="block relative overflow-hidden">
        {blog.coverImage?.url ? (
          <div className="w-full h-64 md:h-72 overflow-hidden bg-slate-100">
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-64 md:h-72 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
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

        {/* Category Badge - Top Left */}
        {blog.category && (
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-bold rounded-full shadow-lg">
              {blog.category}
            </span>
          </div>
        )}

        {/* Edit Button for Author - Top Right */}
        {isAuthor && (
          <div className="absolute top-4 right-4">
            <Link
              to={`/editor/${blog._id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full font-semibold transition-all shadow-lg flex items-center space-x-2"
              onClick={(e) => e.stopPropagation()}
            >
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span>Edit</span>
            </Link>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <Link to={`/blog/${blog._id}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
            {blog.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-slate-600 text-base mb-4 line-clamp-2 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Author & Meta Info */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            to={`/profile/${blog.author?._id}`}
            className="flex items-center space-x-3 hover:opacity-80 transition"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              {blog.author?.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {blog.author?.name || "Unknown"}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </Link>

          {/* Stats */}
          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <span className="flex items-center space-x-1">
              <svg
                className="w-5 h-5"
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
              <span className="font-semibold">{blog.views || 0}</span>
            </span>

            <span className="flex items-center space-x-1">
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">{blog.likes?.length || 0}</span>
            </span>

            {/* ONLY SHOW COMMENT COUNT IF COMMENTS ENABLED */}
            {blog.commentsEnabled !== false && (
              <button
                onClick={() => navigate(`/blog/${blog._id}#comments`)}
                className="flex items-center space-x-1 hover:text-blue-600 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-semibold">{blog.commentsCount || 0}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
