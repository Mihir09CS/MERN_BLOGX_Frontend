import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";

export default function AdminUserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await adminAPI.get(ADMIN_ENDPOINTS.USER_DETAILS(id));
      setUser(data.user || data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleBanToggle = async () => {
    try {
      if (user.isBanned) {
        await adminAPI.patch(ADMIN_ENDPOINTS.UNBAN_USER(user._id));
      } else {
        await adminAPI.patch(ADMIN_ENDPOINTS.BAN_USER(user._id));
      }
      fetchUser();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "This will permanently delete the user. Continue?",
    );
    if (!confirmed) return;

    try {
      await adminAPI.delete(ADMIN_ENDPOINTS.DELETE_USER(user._id));
      navigate("/admin/users");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6">Loading user…</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>;
  }

  if (!user) {
    return <div className="p-6 text-slate-500">User not found</div>;
  }

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">User Details</h1>

      <div className="bg-white border rounded-lg p-6 shadow-sm space-y-4">
        <Detail label="Name" value={user.name} />
        <Detail label="Email" value={user.email} />
        <Detail label="Verified" value={user.isVerified ? "Yes" : "No"} />
        <Detail
          label="Status"
          value={user.isBanned ? "Banned" : "Active"}
          valueClass={user.isBanned ? "text-red-600" : "text-green-600"}
        />
        <Detail
          label="Joined"
          value={new Date(user.createdAt).toLocaleString()}
        />

        <div className="pt-4 flex gap-3">
          <button
            onClick={handleBanToggle}
            className={`px-4 py-2 rounded text-white ${
              user.isBanned
                ? "bg-green-600 hover:bg-green-700"
                : "bg-yellow-600 hover:bg-yellow-700"
            }`}
          >
            {user.isBanned ? "Unban User" : "Ban User"}
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700"
          >
            Delete User
          </button>

          <button
            onClick={() => navigate("/admin/users")}
            className="px-4 py-2 rounded border border-slate-300"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helper ---------------- */

function Detail({ label, value, valueClass = "" }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}
