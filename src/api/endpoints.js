// src/api/endpoints.js
// Centralized API endpoints matching your backend routes [file:22]

export const AUTH_ENDPOINTS = {
  // User auth [file:6]
  REGISTER: "/register",
  LOGIN: "/login",
  GOOGLE: "/google",
  VERIFY_EMAIL: "/verify-email",
  RESEND_OTP: "/resend-otp",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: (token) => `/reset-password/${token}`,
  SET_PASSWORD: "/set-password",

  // Admin auth [file:6]
  ADMIN_LOGIN: "/admin-login",
};

export const BLOG_ENDPOINTS = {
  // Public [file:9]
  GET_ALL: "/blogs",
  GET_POPULAR: "/blogs/popular",
  GET_BY_ID: (id) => `/blogs/${id}`,

  // Protected [file:9]
  CREATE: "/blogs",
  UPDATE: (id) => `/blogs/${id}`,
  DELETE: (id) => `/blogs/${id}`,
  LIKE: (id) => `/blogs/${id}/like`,
  DISLIKE: (id) => `/blogs/${id}/dislike`,
  BOOKMARK: (id) => `/blogs/${id}/bookmark`,
  TOGGLE_COMMENTS: (id) => `/blogs/${id}/toggle-comments`,
  REPORT: (id) => `/blogs/${id}/report`,
  MY_BLOGS: "/blogs/me/blogs",
  MY_BOOKMARKS: "/blogs/me/bookmarks",
};


export const COMMENT_ENDPOINTS = {
  GET_ALL: (blogId) => `/comments/${blogId}`,           // GET all comments for blog
  CREATE: (blogId) => `/comments/${blogId}`,            // POST new comment
  UPDATE: (commentId) => `/comments/${commentId}`,      // PUT update comment
  DELETE: (commentId) => `/comments/${commentId}`,      // DELETE comment
  LIKE: (commentId) => `/comments/${commentId}/like`,   // PUT like/unlike comment
  REPLY: (commentId) => `/comments/${commentId}/reply`, // POST reply to comment
};


export const PROFILE_ENDPOINTS = {
  // [file:8]
  MY_PROFILE: "/profile/me",
  UPDATE_MY_PROFILE: "/profile/me",
  MY_FOLLOWERS: "/profile/me/followers",
  MY_FOLLOWING: "/profile/me/following",
  PUBLIC_PROFILE: (userId) => `/profile/${userId}`,
  PROFILE_FOLLOWERS: (userId) => `/profile/${userId}/followers`,
  PROFILE_FOLLOWING: (userId) => `/profile/${userId}/following`,
  TOGGLE_FOLLOW: (userId) => `/profile/${userId}/follow`,
};


export const USER_ENDPOINTS = {
  // [file:10]
  ME: "/users/me",
  UPDATE_ME: "/users/me",
  DELETE_ME: "/users/me",
  USER_BY_ID: (id) => `/users/${id}`,
  USER_BLOGS: (id) => `/users/${id}/blogs`,
  MY_BOOKMARKS: "/users/me/bookmarks",
};

export const UPLOAD_ENDPOINTS = {
  // [file:21]
  UPLOAD_FILE: "/upload",
};

export const ADMIN_ENDPOINTS = {
  // [file:11]
  STATS: "/stats",

  // Users
  ALL_USERS: "/users",
  USER_DETAILS: (id) => `/users/${id}`,
  BAN_USER: (id) => `/users/${id}/ban`,
  UNBAN_USER: (id) => `/users/${id}/unban`,
  DELETE_USER: (id) => `/users/${id}`,

  // Blogs
  ALL_BLOGS: "/blogs",
  REMOVE_BLOG: (id) => `/blogs/${id}/remove`,
  RESTORE_BLOG: (id) => `/blogs/${id}/restore`,
  DELETE_BLOG: (id) => `/blogs/${id}`,

  // Comments
  ALL_COMMENTS: "/comments",
  DELETE_COMMENT: (id) => `/comments/${id}`,

  // Reports
  REPORTS: "/reports",
  REVIEW_REPORT: (id) => `/reports/${id}/review`,

  // Logs
  LOGS: "/logs",
};
