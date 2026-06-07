// src/components/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LOCAL_API_BASE_URL = "http://localhost:5000";
const PRODUCTION_API_BASE_URL = "https://mern-blogx.vercel.app";
const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.trim() ||
  (import.meta.env.DEV ? LOCAL_API_BASE_URL : PRODUCTION_API_BASE_URL);

export default function Header() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch user data (GET /api/users/me)
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(data.data); // User model: name, email, _id
      } catch (error) {
        console.error("Failed to fetch user", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data.data); // Profile model: avatar, bio
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchUser();
    fetchProfile();
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setProfile(null);
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-slate-900 hidden sm:block">
              DevScribe
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
            >
              Home
            </Link>
            <Link
              to="/popular"
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition"
            >
              Popular
            </Link>

            {token && (
              <Link
                to="/editor/new"
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
              >
                Write
              </Link>
            )}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {token && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-slate-100 rounded-full p-1 pr-3 transition"
                >
                  <img
                    src={
                      profile?.avatar?.url ||
                      `https://ui-avatars.com/api/?name=${user.name}&background=random`
                    }
                    alt={user.name}
                    className="w-9 h-9 rounded-full border-2 border-slate-200 object-cover"
                  />
                  <span className="text-sm font-medium text-slate-700 hidden md:block">
                    {user.name}
                  </span>
                  <svg
                    className={`w-4 h-4 text-slate-600 transition-transform ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/me/profile"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/me/blogs"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Blogs
                    </Link>
                    <Link
                      to="/me/bookmarked-blogs"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Bookmarks
                    </Link>
                    <Link
                      to="/me/profile/followers"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Followers
                    </Link>
                    <Link
                      to="/me/account/edit"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200">
            <Link
              to="/"
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/popular"
              className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Popular
            </Link>
            {token && (
              <Link
                to="/editor/new"
                className="block px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Write Blog
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
