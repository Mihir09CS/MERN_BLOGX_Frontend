

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { USER_ENDPOINTS } from "../../api/endpoints";

export default function UserBlogs() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | popular | recent

  const currentUserId = localStorage.getItem("userId");
  const isOwnBlogs = currentUserId === id;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await userAPI.get(USER_ENDPOINTS.USER_BLOGS(id));
        setBlogs(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [id]);

  const getFilteredBlogs = () => {
    let filtered = [...blogs];

    if (filter === "popular") {
      filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else if (filter === "recent") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const filteredBlogs = getFilteredBlogs();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-600 font-medium">Loading articles...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(isOwnBlogs ? "/me/profile" : `/user/${id}`)}
            className="text-slate-600 hover:text-slate-900 mb-4"
          >
            ← Back to Profile
          </button>

          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">
                {isOwnBlogs ? "My Articles" : "Articles"}
              </h1>
              <p className="text-slate-600">
                {filteredBlogs.length} articles published
              </p>
            </div>

            {isOwnBlogs && (
              <Link
                to="/editor/new"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                + New Article
              </Link>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["all", "popular", "recent"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg ${
                filter === type ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {filteredBlogs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border">
            <h3 className="text-xl font-bold mb-2">No Articles Found</h3>
            <p className="text-slate-600 mb-4">
              {isOwnBlogs
                ? "You haven't published any articles yet."
                : "This user hasn't published any articles."}
            </p>
            {isOwnBlogs && (
              <Link
                to="/editor/new"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Create Your First Article
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} isOwner={isOwnBlogs} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ blog, isOwner }) {
  return (
    <div className="bg-white rounded-xl border shadow hover:shadow-lg transition overflow-hidden">
      <Link to={`/blog/${blog._id}`}>
        {blog.coverImage?.url ? (
          <img
            src={blog.coverImage.url}
            alt={blog.title}
            className="h-48 w-full object-cover"
          />
        ) : (
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600" />
        )}
      </Link>

      <div className="p-5">
        <Link to={`/blog/${blog._id}`}>
          <h3 className="text-xl font-bold mb-2 hover:text-blue-600">
            {blog.title}
          </h3>
        </Link>

        {blog.excerpt && (
          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
            {blog.excerpt}
          </p>
        )}

        <div className="flex justify-between text-sm text-slate-600">
          <div className="flex gap-4">
            <span>👁 {blog.views || 0}</span>
            <span>❤️ {blog.likes?.length || 0}</span>
            <span>💬 {blog.comments?.length || 0}</span>
          </div>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>

        {isOwner && (
          <Link
            to={`/editor/${blog._id}`}
            className="block mt-4 text-sm text-blue-600 font-semibold"
          >
            Edit Article
          </Link>
        )}
      </div>
    </div>
  );
}


