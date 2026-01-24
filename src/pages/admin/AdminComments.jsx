import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.get(ADMIN_ENDPOINTS.ALL_COMMENTS);
      setComments(data.comments || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (commentId) => {
    const confirmed = window.confirm("Delete this comment permanently?");
    if (!confirmed) return;

    try {
      await adminAPI.delete(ADMIN_ENDPOINTS.DELETE_COMMENT(commentId));
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  if (loading) {
    return <div className="p-6">Loading comments…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Comments Moderation</h1>

      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 text-left">Comment</th>
              <th className="px-4 py-3 text-left">Author</th>
              <th className="px-4 py-3 text-left">Blog</th>
              <th className="px-4 py-3 text-left">Created</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id} className="border-t hover:bg-slate-50">
                <td className="px-4 py-3 max-w-md">
                  <p className="truncate">{comment.content}</p>
                </td>

                <td className="px-4 py-3">{comment.user?.email || "—"}</td>

                <td className="px-4 py-3">{comment.blog?.title || "—"}</td>

                <td className="px-4 py-3">
                  {new Date(comment.createdAt).toLocaleString()}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="px-3 py-1 text-xs rounded text-white bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {comments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No comments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
