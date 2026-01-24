import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.get(ADMIN_ENDPOINTS.ALL_BLOGS);
      setBlogs(data.blogs || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleRemove = async (blogId) => {
    try {
      await adminAPI.patch(ADMIN_ENDPOINTS.REMOVE_BLOG(blogId));
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove blog");
    }
  };

  const handleRestore = async (blogId) => {
    try {
      await adminAPI.patch(ADMIN_ENDPOINTS.RESTORE_BLOG(blogId));
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to restore blog");
    }
  };

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm(
      "This will permanently delete the blog. Continue?",
    );
    if (!confirmed) return;

    try {
      await adminAPI.delete(ADMIN_ENDPOINTS.DELETE_BLOG(blogId));
      fetchBlogs();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete blog");
    }
  };

  if (loading) {
    return <div className="p-6">Loading blogs…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">{blog.author?.name || "—"}</td>
                <td className="px-4 py-3">
                  {blog.visibility === "removed" ? (
                    <span className="text-red-600 font-medium">Removed</span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  {blog.visibility === "removed" ? (
                    <button
                      onClick={() => handleRestore(blog._id)}
                      className="px-3 py-1 text-xs rounded text-white bg-green-600 hover:bg-green-700"
                    >
                      Restore
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRemove(blog._id)}
                      className="px-3 py-1 text-xs rounded text-white bg-yellow-600 hover:bg-yellow-700"
                    >
                      Remove
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="px-3 py-1 text-xs rounded text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
