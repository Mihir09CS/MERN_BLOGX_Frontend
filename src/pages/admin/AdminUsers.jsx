
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL-driven state
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const banned = searchParams.get("banned") || "";

  // Local state
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const query = new URLSearchParams({
        page,
        limit: 10,
        ...(search && { search }),
        ...(banned && { banned }),
      }).toString();

      const { data } = await adminAPI.get(
        `${ADMIN_ENDPOINTS.ALL_USERS}?${query}`,
      );

      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, banned]);

  const updateParam = (key, value) => {
    const params = Object.fromEntries(searchParams.entries());
    if (!value) delete params[key];
    else params[key] = value;

    params.page = 1; // reset page on filter change
    setSearchParams(params);
  };

  const handleBanToggle = async (userId, isBanned) => {
    try {
      await adminAPI.patch(
        isBanned
          ? ADMIN_ENDPOINTS.UNBAN_USER(userId)
          : ADMIN_ENDPOINTS.BAN_USER(userId),
      );
      fetchUsers();
    } catch {
      alert("Action failed");
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Delete this user permanently?")) return;
    await adminAPI.delete(ADMIN_ENDPOINTS.DELETE_USER(userId));
    fetchUsers();
  };

  if (loading) return <div className="p-6">Loading users…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => updateParam("search", e.target.value)}
          placeholder="Search name or email"
          className="border px-3 py-2 rounded text-sm"
        />

        <select
          value={banned}
          onChange={(e) => updateParam("banned", e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        >
          <option value="">All Status</option>
          <option value="false">Active</option>
          <option value="true">Banned</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  {u.isBanned ? (
                    <span className="text-red-600">Banned</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => handleBanToggle(u._id, u.isBanned)}
                    className="px-3 py-1 text-xs rounded bg-yellow-600 text-white"
                  >
                    {u.isBanned ? "Unban" : "Ban"}
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="px-3 py-1 text-xs rounded bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-4">
        <button
          disabled={page === 1}
          onClick={() =>
            setSearchParams({
              ...Object.fromEntries(searchParams),
              page: page - 1,
            })
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setSearchParams({
              ...Object.fromEntries(searchParams),
              page: page + 1,
            })
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
