// src/api/axios.js
import axios from "axios";

// Base URL from environment variable (defaults to your deployed backend)
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://mern-blogx.vercel.app";

// ==================== USER API INSTANCE ====================
// Used for: /api/auth, /api/blogs, /api/comments, /api/profile, /api/users, /api/upload
// Protected routes use JWT from localStorage("token") [file:9][file:8][file:10]
export const userAPI = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If backend uses cookies (your CORS enables credentials) [file:22]
});

// Request interceptor - automatically add user JWT token
userAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle common errors
userAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Token expired or invalid
      if (status === 401) {
        localStorage.removeItem("token");
        if (window.location.pathname !== "/auth/login") {
          window.location.href = "/auth/login";
        }
      }

      // Banned user [file:15]
      if (status === 403 && data.message?.includes("banned")) {
        localStorage.removeItem("token");
        alert("Your account has been banned. Please contact support.");
        window.location.href = "/";
      }

      // Rate limit error
      if (status === 429) {
        alert("Too many requests. Please try again later.");
      }

      console.error("API Error:", data.message || error.message);
    } else if (error.request) {
      console.error("Network Error: No response from server");
    }

    return Promise.reject(error);
  }
);



// ==================== ADMIN API INSTANCE ====================
// Used for: /api/admin/* (all admin routes protected by protectAdmin) [file:11]
// Uses separate adminToken from localStorage
export const adminAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - automatically add admin JWT token
adminAPI.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle admin errors
adminAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Admin token expired or invalid
      if (status === 401) {
        localStorage.removeItem("adminToken");
        if (window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }

      // Permission denied (admin lacks required permission) [file:11]
      if (status === 403) {
        alert("Permission denied. Contact super admin.");
      }

      console.error("Admin API Error:", data.message || error.message);
    }

    return Promise.reject(error);
  }
);

// ==================== AUTH API (NO TOKEN) ====================
// Used for login/register endpoints that don't need auth [file:6]
export const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);


// ==================== HELPER FUNCTIONS ====================

// Store tokens after login
export const setUserToken = (token) => {
  localStorage.setItem("token", token);
};

export const setAdminToken = (token) => {
  localStorage.setItem("adminToken", token);
};

// Clear tokens on logout
export const clearUserAuth = () => {
  localStorage.removeItem("token");
};

export const clearAdminAuth = () => {
  localStorage.removeItem("adminToken");
};

// Check if user is logged in
export const isUserAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const isAdminAuthenticated = () => {
  return !!localStorage.getItem("adminToken");
};

export default userAPI;

