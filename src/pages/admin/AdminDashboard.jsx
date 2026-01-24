


import React, { useEffect, useState } from "react";
import { adminAPI } from "../../api/axios";
import { ADMIN_ENDPOINTS } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminAPI.get(ADMIN_ENDPOINTS.STATS);

        // ✅ BACKEND RETURNS { success, stats }
        setStats(data.stats);
      } catch (err) {
        console.error("Failed to load admin stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, onClick }) => (
    <div
      onClick={onClick}
      className="border rounded-lg p-5 bg-white hover:shadow cursor-pointer transition"
    >
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-2xl font-bold mt-2">{loading ? "—" : value}</p>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
      <p className="text-slate-500 mb-6">
        Manage users, blogs, reports, and system activity
      </p>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers}
          onClick={() => navigate("/admin/users")}
        />
        <StatCard
          title="Banned Users"
          value={stats?.bannedUsers}
          onClick={() => navigate("/admin/users")}
        />
        <StatCard
          title="Total Blogs"
          value={stats?.totalBlogs}
          onClick={() => navigate("/admin/blogs")}
        />
        <StatCard
          title="Active Blogs"
          value={stats?.activeBlogs}
          onClick={() => navigate("/admin/blogs")}
        />
        <StatCard
          title="Total Comments"
          value={stats?.totalComments}
          onClick={() => navigate("/admin/comments")}
        />
      </div>

      {/* ===== QUICK ACCESS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardLink
          title="Users"
          subtitle="Manage users"
          onClick={() => navigate("/admin/users")}
        />
        <DashboardLink
          title="Blogs"
          subtitle="Manage blogs"
          onClick={() => navigate("/admin/blogs")}
        />
        <DashboardLink
          title="Reports"
          subtitle="Manage reports"
          onClick={() => navigate("/admin/reports")}
        />
        <DashboardLink
          title="Comments"
          subtitle="Manage comments"
          onClick={() => navigate("/admin/comments")}
        />
        <DashboardLink
          title="Activity Logs"
          subtitle="Audit admin actions"
          onClick={() => navigate("/admin/logs")}
        />
      </div>
    </div>
  );
}

/* =========================
   REUSABLE COMPONENT
========================= */

function DashboardLink({ title, subtitle, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-5 bg-white hover:shadow cursor-pointer transition"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}
