// src/pages/user/PublicUser.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { USER_ENDPOINTS, BLOG_ENDPOINTS } from "../../api/endpoints";

export default function PublicUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [stats, setStats] = useState({
    blogs: 0,
    totalViews: 0,
    totalLikes: 0,
  });
  const [loading, setLoading] = useState(true);

  const currentUserId = localStorage.getItem("userId");
  const isOwnProfile = currentUserId === id;

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      // Fetch user data
      const userRes = await userAPI.get(USER_ENDPOINTS.USER_BY_ID(id));
      setUser(userRes.data.data);

      // Fetch user's blogs
      const blogsRes = await userAPI.get(USER_ENDPOINTS.USER_BLOGS(id));
      const userBlogs = blogsRes.data.data || [];
      setBlogs(userBlogs);

      // Calculate stats
      const totalViews = userBlogs.reduce(
        (sum, blog) => sum + (blog.views || 0),
        0
      );
      const totalLikes = userBlogs.reduce(
        (sum, blog) => sum + (blog.likes?.length || 0),
        0
      );

      setStats({
        blogs: userBlogs.length,
        totalViews,
        totalLikes,
      });
    } catch (err) {
      toast.error("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-20 h-20 text-slate-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            User Not Found
          </h2>
          <p className="text-slate-600 mb-6">
            This user doesn't exist or has been removed
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Redirect to own account page if viewing self
  if (isOwnProfile) {
    navigate("/account");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-6 transition"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          {/* Cover gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              {/* Avatar & Name */}
              <div className="flex items-end space-x-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl border-4 border-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="pb-2">
                  <h1 className="text-3xl font-bold text-slate-900">
                    {user.name}
                  </h1>
                  <p className="text-slate-600">{user.email}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Member since{" "}
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-slate-900">
                  {stats.blogs}
                </p>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  Articles
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalViews}
                </p>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  Total Views
                </p>
              </div>
              <div className="text-center p-4 rounded-xl bg-slate-50">
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalLikes}
                </p>
                <p className="text-sm text-slate-600 font-medium mt-1">
                  Total Likes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User's Articles */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Articles by {user.name} ({blogs.length})
          </h2>

          {blogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
              <svg
                className="w-16 h-16 text-slate-300 mx-auto mb-4"
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                No Articles Yet
              </h3>
              <p className="text-slate-600">
                {user.name} hasn't published any articles
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <article className="group bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Cover Image */}
      <Link to={`/blog/${blog._id}`} className="block relative overflow-hidden">
        {blog.coverImage?.url ? (
          <div className="w-full h-48 overflow-hidden bg-slate-100">
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white/30"
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

        {/* Category Badge */}
        {blog.category && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full shadow-lg">
              {blog.category}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link to={`/blog/${blog._id}`}>
          <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
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
              <span className="font-semibold">{blog.views || 0}</span>
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
              <span className="font-semibold">{blog.likes?.length || 0}</span>
            </span>

            {blog.commentsEnabled !== false && (
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="font-semibold">{blog.commentsCount || 0}</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-500">
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </article>
  );
}
