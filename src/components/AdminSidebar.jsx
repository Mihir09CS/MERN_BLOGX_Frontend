// src/components/AdminSidebar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const LOCAL_API_BASE_URL = "http://localhost:5000";
const PRODUCTION_API_BASE_URL = "https://mern-blogx.vercel.app";
const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  (import.meta.env.DEV ? LOCAL_API_BASE_URL : PRODUCTION_API_BASE_URL);

export default function AdminSidebar() {
  const [admin, setAdmin] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const adminToken = localStorage.getItem("adminToken");

  // Fetch admin info (you might need to add GET /api/admin/me endpoint or decode JWT)
  useEffect(() => {
    if (!adminToken) return;

    // Option 1: If you have GET /api/admin/me endpoint
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/admin/me`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setAdmin(data.data); // Admin model: name, email, permissions [file:24]
      } catch (error) {
        console.error("Failed to fetch admin", error);
      }
    };

    // Option 2: Decode JWT (if backend sends admin info in token)
    // For now, show placeholder
    setAdmin({ name: "Admin", email: "admin@blogx.com" });

    // fetchAdmin(); // Uncomment if backend has GET /api/admin/me
  }, [adminToken]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
    navigate("/admin/login");
  };

  const menuItems = [
    { path: "/admin/dashboard", icon: "📊", label: "Dashboard" },
    { path: "/admin/users", icon: "👥", label: "Users" },
    { path: "/admin/blogs", icon: "📝", label: "Blogs" },
    { path: "/admin/comments", icon: "💬", label: "Comments" },
    { path: "/admin/reports", icon: "⚠️", label: "Reports" },
    { path: "/admin/logs", icon: "📋", label: "Activity Logs" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <div>
            <h1 className="text-lg font-bold">BlogX Admin</h1>
            <p className="text-xs text-slate-400">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Admin Info */}
      {admin && (
        <div className="px-4 py-3 bg-slate-800/50 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
              {admin.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {admin.name}
              </p>
              <p className="text-xs text-slate-400 truncate">{admin.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition ${
              isActive(item.path)
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium transition"
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
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
