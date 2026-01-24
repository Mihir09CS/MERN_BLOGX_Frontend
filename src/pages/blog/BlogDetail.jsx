

// // src/pages/blog/BlogDetail.jsx
// import React, { useState, useEffect, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { userAPI } from "../../api/axios";
// import { BLOG_ENDPOINTS, COMMENT_ENDPOINTS } from "../../api/endpoints";
// import { isUserAuthenticated } from "../../api/axios";

// export default function BlogDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
  
//   const [blog, setBlog] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [commentsLoading, setCommentsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [actionLoading, setActionLoading] = useState({
//     like: false,
//     dislike: false,
//     bookmark: false,
//   });
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showReportModal, setShowReportModal] = useState(false);
//   const dropdownRef = useRef(null);

//   const isAuthenticated = isUserAuthenticated();
//   const currentUserId = localStorage.getItem("userId");

//   useEffect(() => {
//     fetchBlog();
//     fetchComments();
//   }, [id]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

  // const fetchBlog = async () => {
  //   try {
  //     const { data } = await userAPI.get(BLOG_ENDPOINTS.GET_BY_ID(id));
  //     setBlog(data.data);
  //     // Check if current user has bookmarked this blog
  //     // Assuming your backend returns bookmarked status or you fetch it separately
  //     checkBookmarkStatus();
  //   } catch (err) {
  //     const message = err.response?.data?.message || "Failed to load blog";
  //     setError(message);
  //     toast.error(message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const checkBookmarkStatus = async () => {
  //   if (!isAuthenticated) return;
  //   try {
  //     // Adjust this endpoint based on your backend
  //     const { data } = await userAPI.get('/blogs/bookmarked');
  //     const bookmarkedBlogs = data.blogs || [];
  //     setIsBookmarked(bookmarkedBlogs.some(b => b._id === id));
  //   } catch (err) {
  //     console.error("Failed to check bookmark status:", err);
  //   }
  // };

//   const fetchComments = async () => {
//     setCommentsLoading(true);
//     try {
//       const { data } = await userAPI.get(COMMENT_ENDPOINTS.GET_ALL(id));
//       setComments(data.data || []);
//     } catch (err) {
//       console.error("Failed to load comments:", err);
//     } finally {
//       setCommentsLoading(false);
//     }
//   };

//   const handleLike = async () => {
//     if (!isAuthenticated) {
//       toast.error("Please login to like this blog");
//       setTimeout(() => navigate("/auth/login"), 1500);
//       return;
//     }

//     setActionLoading({ ...actionLoading, like: true });
//     try {
//       await userAPI.put(BLOG_ENDPOINTS.LIKE(id));
//       const wasLiked = isLiked;
//       await fetchBlog();
//       toast.success(wasLiked ? "Like removed" : "Liked! ❤️", { duration: 2000 });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to like blog");
//     } finally {
//       setActionLoading({ ...actionLoading, like: false });
//     }
//   };

//   const handleDislike = async () => {
//     if (!isAuthenticated) {
//       toast.error("Please login to dislike this blog");
//       setTimeout(() => navigate("/auth/login"), 1500);
//       return;
//     }

//     setActionLoading({ ...actionLoading, dislike: true });
//     try {
//       await userAPI.put(BLOG_ENDPOINTS.DISLIKE(id));
//       const wasDisliked = isDisliked;
//       await fetchBlog();
//       toast.success(wasDisliked ? "Dislike removed" : "Noted 👎", { duration: 2000 });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to dislike blog");
//     } finally {
//       setActionLoading({ ...actionLoading, dislike: false });
//     }
//   };

//   const handleBookmark = async () => {
//     if (!isAuthenticated) {
//       toast.error("Please login to bookmark");
//       setTimeout(() => navigate("/auth/login"), 1500);
//       return;
//     }

//     setActionLoading({ ...actionLoading, bookmark: true });
//     const wasBookmarked = isBookmarked;
    
//     try {
//       await userAPI.put(BLOG_ENDPOINTS.BOOKMARK(id));
//       setIsBookmarked(!wasBookmarked);
      
//       // Clear message based on toggle state
//       if (wasBookmarked) {
//         toast.success("Removed from bookmarks 📕", { duration: 2000 });
//       } else {
//         toast.success("Added to bookmarks! 🔖", { duration: 2000 });
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update bookmark");
//     } finally {
//       setActionLoading({ ...actionLoading, bookmark: false });
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("⚠️ Delete this blog permanently? This cannot be undone!")) return;

//     const deleteToastId = toast.loading("Deleting blog...");

//     try {
//       await userAPI.delete(BLOG_ENDPOINTS.DELETE(id));
//       toast.success("Blog deleted successfully", { id: deleteToastId });
//       setTimeout(() => navigate("/me/blogs"), 1500);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to delete blog", { id: deleteToastId });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative w-16 h-16 mx-auto">
//             <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-4 text-slate-600 font-medium">Loading article...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !blog) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
//         <div className="text-center bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
//           <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//             <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//           </div>
//           <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">Article Not Found</h2>
//           <p className="text-slate-600 mb-6 text-sm md:text-base">{error || "This article doesn't exist."}</p>
//           <Link 
//             to="/" 
//             className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
//           >
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const isAuthor = currentUserId && blog.author?._id && 
//                    currentUserId.toString() === blog.author._id.toString();
  
//   const isLiked = blog.likes?.some(id => id.toString() === currentUserId?.toString());
//   const isDisliked = blog.dislikes?.some(id => id.toString() === currentUserId?.toString());

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Report Modal */}
//       {showReportModal && (
//         <ReportModal 
//           blogId={id} 
//           onClose={() => setShowReportModal(false)} 
//         />
//       )}

//       {/* Main Content Container - Instagram Style */}
//       <div className="max-w-2xl mx-auto bg-white min-h-screen">
//         {/* Header - Author Info */}
//         <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
//           <div className="flex items-center justify-between">
//             <Link
//               to={`/profile/${blog.author?._id}`}
//               className="flex items-center space-x-3 hover:opacity-80 transition"
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
//                 {blog.author?.name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <p className="font-bold text-slate-900 text-sm">{blog.author?.name}</p>
//                 <p className="text-xs text-slate-500">
//                   {new Date(blog.createdAt).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                     year: "numeric",
//                   })}
//                 </p>
//               </div>
//             </Link>

//             {/* Three Dots Menu */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setShowDropdown(!showDropdown)}
//                 className="p-2 hover:bg-slate-100 rounded-full transition"
//               >
//                 <svg className="w-6 h-6 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
//                 </svg>
//               </button>

//               {/* Dropdown Menu */}
//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
//                   {isAuthor ? (
//                     <>
//                       <Link
//                         to={`/editor/${blog._id}`}
//                         className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                         </svg>
//                         <span className="font-medium">Edit Article</span>
//                       </Link>
//                       <button
//                         onClick={() => {
//                           setShowDropdown(false);
//                           handleDelete();
//                         }}
//                         className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition text-red-600 w-full text-left"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                         </svg>
//                         <span className="font-medium">Delete Article</span>
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       {isAuthenticated && (
//                         <button
//                           onClick={() => {
//                             setShowDropdown(false);
//                             setShowReportModal(true);
//                           }}
//                           className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700 w-full text-left"
//                         >
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//                           </svg>
//                           <span className="font-medium">Report Article</span>
//                         </button>
//                       )}
//                       <button
//                         onClick={() => {
//                           setShowDropdown(false);
//                           navigator.clipboard.writeText(window.location.href);
//                           toast.success("Link copied to clipboard!");
//                         }}
//                         className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700 w-full text-left"
//                       >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
//                         </svg>
//                         <span className="font-medium">Share Article</span>
//                       </button>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Cover Image - Instagram Style */}
//         {blog.coverImage?.url && (
//           <div className="w-full bg-black">
//             <img
//               src={blog.coverImage.url}
//               alt={blog.title}
//               className="w-full h-auto max-h-[600px] object-contain"
//             />
//           </div>
//         )}

//         {/* Action Buttons - Instagram Style */}
//         <div className="px-4 py-3 border-b border-slate-200">
//           <div className="flex items-center justify-between mb-3">
//             <div className="flex items-center space-x-4">
//               {/* Like Button */}
//               <button
//                 onClick={handleLike}
//                 disabled={actionLoading.like || !isAuthenticated}
//                 className="group flex items-center space-x-1 disabled:opacity-50 transition-transform active:scale-90"
//               >
//                 <svg 
//                   className={`w-7 h-7 transition-all ${
//                     isLiked 
//                       ? "fill-red-600 text-red-600" 
//                       : "text-slate-900 group-hover:text-slate-600"
//                   }`}
//                   fill={isLiked ? "currentColor" : "none"}
//                   stroke="currentColor"
//                   strokeWidth={isLiked ? "0" : "2"}
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </button>

//               {/* Comment Button */}
//               <button
//                 onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="group transition-transform active:scale-90"
//               >
//                 <svg className="w-7 h-7 text-slate-900 group-hover:text-slate-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                 </svg>
//               </button>

//               {/* Dislike Button */}
//               <button
//                 onClick={handleDislike}
//                 disabled={actionLoading.dislike || !isAuthenticated}
//                 className={`group flex items-center space-x-1 disabled:opacity-50 transition-transform active:scale-90`}
//               >
//                 <svg 
//                   className={`w-7 h-7 transition-all ${
//                     isDisliked 
//                       ? "fill-slate-900 text-slate-900" 
//                       : "text-slate-900 group-hover:text-slate-600"
//                   }`}
//                   fill={isDisliked ? "currentColor" : "none"}
//                   stroke="currentColor"
//                   strokeWidth={isDisliked ? "0" : "2"}
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
//                 </svg>
//               </button>

//               {/* Views */}
//               <div className="flex items-center space-x-1 text-slate-600">
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//                 <span className="text-sm font-medium">{blog.views || 0}</span>
//               </div>
//             </div>

//             {/* Bookmark Button */}
//             <button
//               onClick={handleBookmark}
//               disabled={actionLoading.bookmark || !isAuthenticated}
//               className="group disabled:opacity-50 transition-transform active:scale-90"
//             >
//               <svg 
//                 className={`w-7 h-7 transition-all ${
//                   isBookmarked 
//                     ? "fill-slate-900 text-slate-900" 
//                     : "text-slate-900 group-hover:text-slate-600"
//                 }`}
//                 fill={isBookmarked ? "currentColor" : "none"}
//                 stroke="currentColor" 
//                 strokeWidth={isBookmarked ? "0" : "2"} 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
//               </svg>
//             </button>
//           </div>

//           {/* Likes Count */}
//           <div className="mb-2">
//             <p className="text-sm font-semibold text-slate-900">
//               {blog.likes?.length || 0} {blog.likes?.length === 1 ? 'like' : 'likes'}
//             </p>
//           </div>

//           {/* Category Badge */}
//           {blog.category && (
//             <div className="mb-3">
//               <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
//                 {blog.category}
//               </span>
//             </div>
//           )}
//         </div>

//         {/* Title and Content */}
//         <div className="px-4 py-4">
//           {/* Title */}
//           <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
//             {blog.title}
//           </h1>

//           {/* Blog Content */}
//           <div
//             className="prose prose-slate max-w-none
//             prose-headings:text-slate-900 prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6
//             prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
//             prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
//             prose-strong:text-slate-900 prose-strong:font-bold
//             prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
//             prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
//             prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
//             prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 prose-img:w-full
//             prose-ul:my-4 prose-ol:my-4 prose-li:my-1
//             prose-hr:border-slate-200 prose-hr:my-8"
//             dangerouslySetInnerHTML={{ __html: blog.content }}
//           />

//           {/* Tags */}
//           {blog.tags && blog.tags.length > 0 && (
//             <div className="mt-8 pt-6 border-t border-slate-200">
//               <div className="flex flex-wrap gap-2">
//                 {blog.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-full cursor-pointer transition-colors"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Reading Time */}
//           <div className="mt-6 pt-6 border-t border-slate-200">
//             <p className="text-sm text-slate-500">
//               📖 {Math.ceil((blog.content?.length || 0) / 1000) || 1} min read • 
//               💬 {comments.length} comment{comments.length !== 1 ? 's' : ''}
//             </p>
//           </div>
//         </div>

//         {/* Comments Section */}
//         <div id="comments" className="border-t-8 border-slate-100 px-4 py-6">
//           <CommentsSection 
//             blogId={id} 
//             comments={comments} 
//             commentsLoading={commentsLoading}
//             onCommentAdded={fetchComments}
//             isAuthenticated={isAuthenticated}
//             currentUserId={currentUserId}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// // ✅ REPORT MODAL COMPONENT
// function ReportModal({ blogId, onClose }) {
//   const [reason, setReason] = useState("");
//   const [message, setMessage] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!reason) {
//       toast.error("Please select a reason");
//       return;
//     }

//     setSubmitting(true);
//     const toastId = toast.loading("Submitting report...");

//     try {
//       await userAPI.post(BLOG_ENDPOINTS.REPORT(blogId), { reason, message });
//       toast.success("Report submitted. We'll review it soon.", { id: toastId, duration: 5000 });
//       onClose();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to report", { id: toastId });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-slate-200">
//           <h3 className="text-xl font-bold text-slate-900">Report Article</h3>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-slate-100 rounded-full transition"
//           >
//             <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Reason for reporting *
//             </label>
//             <select
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//               required
//             >
//               <option value="">Select a reason</option>
//               <option value="spam">Spam or misleading</option>
//               <option value="harassment">Harassment or hate speech</option>
//               <option value="violence">Violence or dangerous content</option>
//               <option value="copyright">Copyright violation</option>
//               <option value="inappropriate">Inappropriate content</option>
//               <option value="other">Other</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Additional details (optional)
//             </label>
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Provide more context about why you're reporting this article..."
//               rows="4"
//               className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none outline-none transition"
//             />
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={submitting || !reason}
//               className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {submitting ? "Submitting..." : "Submit Report"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// // ✅ COMMENTS SECTION
// function CommentsSection({ blogId, comments, commentsLoading, onCommentAdded, isAuthenticated, currentUserId }) {
//   const [commentText, setCommentText] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();
    
//     if (!isAuthenticated) {
//       toast.error("Please login to comment");
//       return;
//     }

//     if (!commentText.trim()) {
//       toast.error("Comment cannot be empty");
//       return;
//     }

//     setSubmitting(true);
//     const toastId = toast.loading("Posting comment...");

//     try {
//       await userAPI.post(COMMENT_ENDPOINTS.CREATE(blogId), { 
//         text: commentText.trim() 
//       });
      
//       toast.success("Comment posted! 💬", { id: toastId });
//       setCommentText("");
//       await onCommentAdded();
      
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to post comment", { id: toastId });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <h3 className="text-xl font-bold text-slate-900 mb-6">
//         Comments ({comments.length})
//       </h3>

//       {/* Comment Form */}
//       {isAuthenticated ? (
//         <form onSubmit={handleSubmitComment} className="mb-8">
//           <textarea
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//             placeholder="Add a comment..."
//             rows="3"
//             className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all outline-none text-sm"
//           />
//           <div className="flex justify-end mt-3">
//             <button
//               type="submit"
//               disabled={submitting || !commentText.trim()}
//               className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//             >
//               {submitting ? "Posting..." : "Post"}
//             </button>
//           </div>
//         </form>
//       ) : (
//         <div className="mb-8 text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
//           <p className="text-slate-600 mb-3 text-sm">Sign in to join the conversation</p>
//           <Link
//             to="/auth/login"
//             className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//           >
//             Sign In
//           </Link>
//         </div>
//       )}

//       {/* Comments List */}
//       {commentsLoading ? (
//         <div className="text-center py-8">
//           <div className="relative w-10 h-10 mx-auto">
//             <div className="w-10 h-10 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-10 h-10 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
//           </div>
//         </div>
//       ) : comments.length === 0 ? (
//         <div className="text-center py-12 bg-slate-50 rounded-xl">
//           <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//           </svg>
//           <p className="text-slate-600 font-medium text-sm">No comments yet</p>
//           <p className="text-slate-500 text-xs mt-1">Be the first to comment!</p>
//         </div>
//       ) : (
//         <div className="space-y-6">
//           {comments.map((comment) => (
//             <CommentItem
//               key={comment._id}
//               comment={comment}
//               blogId={blogId}
//               currentUserId={currentUserId}
//               isAuthenticated={isAuthenticated}
//               onUpdate={onCommentAdded}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ✅ COMMENT ITEM
// function CommentItem({ comment, blogId, currentUserId, isAuthenticated, onUpdate }) {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replyText, setReplyText] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editText, setEditText] = useState(comment.text);
//   const [showReplies, setShowReplies] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   const isAuthor = currentUserId === comment.author?._id?.toString();
//   const isLiked = comment.likes?.some(id => id.toString() === currentUserId?.toString());

//   const handleLikeComment = async () => {
//     if (!isAuthenticated) {
//       toast.error("Please login to like");
//       return;
//     }

//     setActionLoading(true);
//     try {
//       await userAPI.put(COMMENT_ENDPOINTS.LIKE(comment._id));
//       toast.success(isLiked ? "Like removed" : "Liked!", { duration: 1500 });
//       onUpdate();
//     } catch (err) {
//       toast.error("Failed to like comment");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReply = async (e) => {
//     e.preventDefault();
//     if (!replyText.trim()) return;

//     setActionLoading(true);
//     const toastId = toast.loading("Posting reply...");

//     try {
//       await userAPI.post(COMMENT_ENDPOINTS.REPLY(comment._id), { text: replyText.trim() });
//       toast.success("Reply posted!", { id: toastId });
//       setReplyText("");
//       setShowReplyForm(false);
//       onUpdate();
//     } catch (err) {
//       toast.error("Failed to post reply", { id: toastId });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!editText.trim()) return;

//     setActionLoading(true);
//     const toastId = toast.loading("Updating...");

//     try {
//       await userAPI.put(COMMENT_ENDPOINTS.UPDATE(comment._id), { text: editText.trim() });
//       toast.success("Comment updated!", { id: toastId });
//       setIsEditing(false);
//       onUpdate();
//     } catch (err) {
//       toast.error("Failed to update", { id: toastId });
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Delete this comment?")) return;

//     const toastId = toast.loading("Deleting...");

//     try {
//       await userAPI.delete(COMMENT_ENDPOINTS.DELETE(comment._id));
//       toast.success("Comment deleted", { id: toastId });
//       onUpdate();
//     } catch (err) {
//       toast.error("Failed to delete", { id: toastId });
//     }
//   };

//   return (
//     <div className={`${comment.parent ? "ml-8 md:ml-12" : ""}`}>
//       <div className="flex items-start space-x-3">
//         {/* Avatar */}
//         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//           {comment.author?.name?.charAt(0).toUpperCase() || "?"}
//         </div>

//         {/* Comment Content */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-slate-50 rounded-2xl px-4 py-3">
//             <div className="flex items-start justify-between mb-1">
//               <div>
//                 <p className="font-semibold text-slate-900 text-sm">{comment.author?.name || "Unknown"}</p>
//                 <p className="text-xs text-slate-500">
//                   {new Date(comment.createdAt).toLocaleDateString()}
//                 </p>
//               </div>

//               {isAuthor && !isEditing && (
//                 <div className="flex space-x-2 ml-2">
//                   <button
//                     onClick={() => setIsEditing(true)}
//                     className="text-blue-600 hover:text-blue-700 text-xs font-medium"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={handleDelete}
//                     className="text-red-600 hover:text-red-700 text-xs font-medium"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>

//             {isEditing ? (
//               <div className="mt-2">
//                 <textarea
//                   value={editText}
//                   onChange={(e) => setEditText(e.target.value)}
//                   className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none"
//                   rows="2"
//                 />
//                 <div className="flex space-x-2 mt-2">
//                   <button
//                     onClick={handleUpdate}
//                     disabled={actionLoading}
//                     className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => {
//                       setIsEditing(false);
//                       setEditText(comment.text);
//                     }}
//                     className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <p className="text-slate-700 text-sm break-words">{comment.text}</p>
//             )}
//           </div>

//           {/* Comment Actions */}
//           <div className="flex items-center space-x-4 mt-2 text-xs">
//             <button
//               onClick={handleLikeComment}
//               disabled={actionLoading || !isAuthenticated}
//               className={`flex items-center space-x-1 font-medium ${
//                 isLiked ? "text-red-600" : "text-slate-600 hover:text-red-600"
//               } disabled:opacity-50 transition`}
//             >
//               <span>{isLiked ? "❤️" : "🤍"}</span>
//               <span>{comment.likesCount || 0}</span>
//             </button>

//             {isAuthenticated && (
//               <button
//                 onClick={() => setShowReplyForm(!showReplyForm)}
//                 className="text-slate-600 hover:text-slate-900 font-medium"
//               >
//                 Reply
//               </button>
//             )}

//             {comment.children?.length > 0 && (
//               <button
//                 onClick={() => setShowReplies(!showReplies)}
//                 className="text-slate-600 hover:text-slate-900 font-medium"
//               >
//                 {showReplies ? "Hide" : "View"} {comment.children.length} {comment.children.length === 1 ? "reply" : "replies"}
//               </button>
//             )}
//           </div>

//           {/* Reply Form */}
//           {showReplyForm && (
//             <form onSubmit={handleReply} className="mt-3">
//               <textarea
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Write a reply..."
//                 rows="2"
//                 className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none"
//               />
//               <div className="flex space-x-2 mt-2">
//                 <button
//                   type="submit"
//                   disabled={actionLoading || !replyText.trim()}
//                   className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   Post
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowReplyForm(false);
//                     setReplyText("");
//                   }}
//                   className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}

//           {/* Nested Replies */}
//           {showReplies && comment.children?.length > 0 && (
//             <div className="mt-4 space-y-4">
//               {comment.children.map((reply) => (
//                 <CommentItem
//                   key={reply._id}
//                   comment={reply}
//                   blogId={blogId}
//                   currentUserId={currentUserId}
//                   isAuthenticated={isAuthenticated}
//                   onUpdate={onUpdate}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }






// src/pages/blog/BlogDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { BLOG_ENDPOINTS, COMMENT_ENDPOINTS } from "../../api/endpoints";
import { isUserAuthenticated } from "../../api/axios";

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [togglingComments, setTogglingComments] = useState(false);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState({
    like: false,
    dislike: false,
    bookmark: false,
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const dropdownRef = useRef(null);

  const isAuthenticated = isUserAuthenticated();
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update fetchBlog to get commentsEnabled status
  const fetchBlog = async () => {
    try {
      const { data } = await userAPI.get(BLOG_ENDPOINTS.GET_BY_ID(id));
      setBlog(data.data);
      setCommentsEnabled(data.data.commentsEnabled ?? true);
      checkBookmarkStatus();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load blog";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Add toggle comments handler
  const handleToggleComments = async () => {
    setTogglingComments(true);
    const toastId = toast.loading(
      commentsEnabled ? "Disabling comments..." : "Enabling comments..."
    );

    try {
      const { data } = await userAPI.put(BLOG_ENDPOINTS.TOGGLE_COMMENTS(id));
      setCommentsEnabled(data.commentsEnabled);
      toast.success(data.message, { id: toastId });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to toggle comments", {
        id: toastId,
      });
    } finally {
      setTogglingComments(false);
    }
  };

  const checkBookmarkStatus = async () => {
    if (!isAuthenticated) return;

    try {
      const { data } = await userAPI.get(BLOG_ENDPOINTS.MY_BOOKMARKS);
      const bookmarkedBlogs = data.blogs || data.data || [];
      setIsBookmarked(bookmarkedBlogs.some((b) => b._id === id));
    } catch (err) {
      console.error("Failed to check bookmark status:", err);
    }
  };


  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const { data } = await userAPI.get(COMMENT_ENDPOINTS.GET_ALL(id));
      setComments(data.data || []);
    } catch (err) {
      console.error("Failed to load comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to like this blog");
      setTimeout(() => navigate("/auth/login"), 1500);
      return;
    }

    setActionLoading({ ...actionLoading, like: true });
    try {
      await userAPI.put(BLOG_ENDPOINTS.LIKE(id));
      const wasLiked = isLiked;
      await fetchBlog();
      toast.success(wasLiked ? "Like removed" : "Liked! ❤️", {
        duration: 2000,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to like blog");
    } finally {
      setActionLoading({ ...actionLoading, like: false });
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to dislike this blog");
      setTimeout(() => navigate("/auth/login"), 1500);
      return;
    }

    setActionLoading({ ...actionLoading, dislike: true });
    try {
      await userAPI.put(BLOG_ENDPOINTS.DISLIKE(id));
      const wasDisliked = isDisliked;
      await fetchBlog();
      toast.success(wasDisliked ? "Dislike removed" : "Noted 👎", {
        duration: 2000,
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to dislike blog");
    } finally {
      setActionLoading({ ...actionLoading, dislike: false });
    }
  };

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to bookmark");
      setTimeout(() => navigate("/auth/login"), 1500);
      return;
    }

    setActionLoading({ ...actionLoading, bookmark: true });
    const wasBookmarked = isBookmarked;

    try {
      await userAPI.put(BLOG_ENDPOINTS.BOOKMARK(id));
      setIsBookmarked(!wasBookmarked);

      // Clear message based on toggle state
      if (wasBookmarked) {
        toast.success("Removed from bookmarks 📕", { duration: 2000 });
      } else {
        toast.success("Added to bookmarks! 🔖", { duration: 2000 });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update bookmark");
    } finally {
      setActionLoading({ ...actionLoading, bookmark: false });
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm("⚠️ Delete this blog permanently? This cannot be undone!")
    )
      return;

    const deleteToastId = toast.loading("Deleting blog...");

    try {
      await userAPI.delete(BLOG_ENDPOINTS.DELETE(id));
      toast.success("Blog deleted successfully", { id: deleteToastId });
      setTimeout(() => navigate("/me/blogs"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete blog", {
        id: deleteToastId,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
            Article Not Found
          </h2>
          <p className="text-slate-600 mb-6 text-sm md:text-base">
            {error || "This article doesn't exist."}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor =
    currentUserId &&
    blog.author?._id &&
    currentUserId.toString() === blog.author._id.toString();

  const isLiked = blog.likes?.some(
    (id) => id.toString() === currentUserId?.toString()
  );
  const isDisliked = blog.dislikes?.some(
    (id) => id.toString() === currentUserId?.toString()
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Report Modal */}
      {showReportModal && (
        <ReportModal blogId={id} onClose={() => setShowReportModal(false)} />
      )}

      {/* Main Content Container - Instagram Style */}
      <div className="max-w-2xl mx-auto bg-white min-h-screen">
        {/* Header - Author Info */}
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <Link
              to={`/profile/${blog.author?._id}`}
              className="flex items-center space-x-3 hover:opacity-80 transition"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                {blog.author?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  {blog.author?.name}
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </Link>

            {/* Three Dots Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <svg
                  className="w-6 h-6 text-slate-700"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                  {isAuthor ? (
                    <>
                      <Link
                        to={`/editor/${blog._id}`}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700"
                        onClick={() => setShowDropdown(false)}
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        <span className="font-medium">Edit Article</span>
                      </Link>

                      {/* NEW: Toggle Comments Button */}
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleToggleComments();
                        }}
                        disabled={togglingComments}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700 w-full text-left disabled:opacity-50"
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
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span className="font-medium">
                          {commentsEnabled
                            ? "Disable Comments"
                            : "Enable Comments"}
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleDelete();
                        }}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition text-red-600 w-full text-left"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        <span className="font-medium">Delete Article</span>
                      </button>
                    </>
                  ) : (
                    <>
                      {isAuthenticated && (
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            setShowReportModal(true);
                          }}
                          className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700 w-full text-left"
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
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <span className="font-medium">Report Article</span>
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          navigator.clipboard.writeText(window.location.href);
                          toast.success("Link copied to clipboard!");
                        }}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-slate-50 transition text-slate-700 w-full text-left"
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
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                          />
                        </svg>
                        <span className="font-medium">Share Article</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cover Image - Instagram Style */}
        {blog.coverImage?.url && (
          <div className="w-full bg-black">
            <img
              src={blog.coverImage.url}
              alt={blog.title}
              className="w-full h-auto max-h-[600px] object-contain"
            />
          </div>
        )}

        {/* Action Buttons - Instagram Style */}
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={actionLoading.like || !isAuthenticated}
                className="group flex items-center space-x-1 disabled:opacity-50 transition-transform active:scale-90"
              >
                <svg
                  className={`w-7 h-7 transition-all ${
                    isLiked
                      ? "fill-red-600 text-red-600"
                      : "text-slate-900 group-hover:text-slate-600"
                  }`}
                  fill={isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={isLiked ? "0" : "2"}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Comment Button - ONLY SHOW IF COMMENTS ENABLED */}
              {commentsEnabled && (
                <button
                  onClick={() =>
                    document
                      .getElementById("comments")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group transition-transform active:scale-90"
                >
                  <svg
                    className="w-7 h-7 text-slate-900 group-hover:text-slate-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </button>
              )}

              {/* Dislike Button */}
              <button
                onClick={handleDislike}
                disabled={actionLoading.dislike || !isAuthenticated}
                className={`group flex items-center space-x-1 disabled:opacity-50 transition-transform active:scale-90`}
              >
                <svg
                  className={`w-7 h-7 transition-all ${
                    isDisliked
                      ? "fill-slate-900 text-slate-900"
                      : "text-slate-900 group-hover:text-slate-600"
                  }`}
                  fill={isDisliked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={isDisliked ? "0" : "2"}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                  />
                </svg>
              </button>

              {/* Views */}
              <div className="flex items-center space-x-1 text-slate-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-sm font-medium">{blog.views || 0}</span>
              </div>
            </div>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              disabled={actionLoading.bookmark || !isAuthenticated}
              className="group disabled:opacity-50 transition-transform active:scale-90"
            >
              <svg
                className={`w-7 h-7 transition-all ${
                  isBookmarked
                    ? "fill-slate-900 text-slate-900"
                    : "text-slate-900 group-hover:text-slate-600"
                }`}
                fill={isBookmarked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={isBookmarked ? "0" : "2"}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>

          {/* Likes Count */}
          <div className="mb-2">
            <p className="text-sm font-semibold text-slate-900">
              {blog.likes?.length || 0}{" "}
              {blog.likes?.length === 1 ? "like" : "likes"}
            </p>
          </div>

          {/* Category Badge */}
          {blog.category && (
            <div className="mb-3">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {blog.category}
              </span>
            </div>
          )}
        </div>

        {/* HIDE COMMENT COUNT IF COMMENTS DISABLED */}
        {commentsEnabled && comments.length > 0 && (
          <button
            onClick={() =>
              document
                .getElementById("comments")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-sm text-slate-500 hover:text-slate-700 transition mb-3"
          >
            View all {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </button>
        )}

        {/* Title and Content */}
        <div className="px-4 py-4">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Blog Content */}
          <div
            className="prose prose-slate max-w-none
            prose-headings:text-slate-900 prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6
            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:p-4 prose-pre:overflow-x-auto
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 prose-img:w-full
            prose-ul:my-4 prose-ol:my-4 prose-li:my-1
            prose-hr:border-slate-200 prose-hr:my-8"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-full cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Reading Time - HIDE COMMENT COUNT IF DISABLED */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              📖 {Math.ceil((blog.content?.length || 0) / 1000) || 1} min read
              {commentsEnabled && (
                <>
                  {" • "}
                  💬 {comments.length} comment{comments.length !== 1 ? "s" : ""}
                </>
              )}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div id="comments" className="border-t-8 border-slate-100 px-4 py-6">
          <CommentsSection
            blogId={id}
            comments={comments}
            commentsLoading={commentsLoading}
            onCommentAdded={fetchComments}
            isAuthenticated={isAuthenticated}
            currentUserId={currentUserId}
            commentsEnabled={commentsEnabled}
            isBlogAuthor={isAuthor}
          />
        </div>
      </div>
    </div>
  );
}

// ✅ REPORT MODAL COMPONENT
function ReportModal({ blogId, onClose }) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason) {
      toast.error("Please select a reason");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Submitting report...");

    try {
      await userAPI.post(BLOG_ENDPOINTS.REPORT(blogId), { reason, message });
      toast.success("Report submitted. We'll review it soon.", { id: toastId, duration: 5000 });
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to report", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-900">Report Article</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition"
          >
            <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Reason for reporting *
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              required
            >
              <option value="">Select a reason</option>
              <option value="spam">Spam or misleading</option>
              <option value="harassment">Harassment or hate speech</option>
              <option value="violence">Violence or dangerous content</option>
              <option value="copyright">Copyright violation</option>
              <option value="inappropriate">Inappropriate content</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Additional details (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide more context about why you're reporting this article..."
              rows="4"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none outline-none transition"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !reason}
              className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


// ✅ COMMENTS SECTION
// function CommentsSection({
//   blogId,
//   comments,
//   commentsLoading,
//   onCommentAdded,
//   isAuthenticated,
//   currentUserId,
//   commentsEnabled,
//   isBlogAuthor,
// }) {
//   const [commentText, setCommentText] = useState("");
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmitComment = async (e) => {
//     e.preventDefault();

//     if (!isAuthenticated) {
//       toast.error("Please login to comment");
//       return;
//     }

//     if (!commentsEnabled) {
//       toast.error("Comments are disabled for this article");
//       return;
//     }

//     if (!commentText.trim()) {
//       toast.error("Comment cannot be empty");
//       return;
//     }

//     setSubmitting(true);
//     const toastId = toast.loading("Posting comment...");

//     try {
//       await userAPI.post(COMMENT_ENDPOINTS.CREATE(blogId), {
//         text: commentText.trim(),
//       });

//       toast.success("Comment posted! 💬", { id: toastId });
//       setCommentText("");
//       await onCommentAdded();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to post comment", {
//         id: toastId,
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-xl font-bold text-slate-900">
//           Comments ({comments.length})
//         </h3>

//         {/* Comments Status Badge */}
//         {!commentsEnabled && (
//           <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
//             Comments Disabled
//           </span>
//         )}
//       </div>

//       {/* Comment Form */}
//       {commentsEnabled ? (
//         isAuthenticated ? (
//           <form onSubmit={handleSubmitComment} className="mb-8">
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Add a comment..."
//               rows="3"
//               className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all outline-none text-sm"
//             />
//             <div className="flex justify-end mt-3">
//               <button
//                 type="submit"
//                 disabled={submitting || !commentText.trim()}
//                 className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//               >
//                 {submitting ? "Posting..." : "Post"}
//               </button>
//             </div>
//           </form>
//         ) : (
//           <div className="mb-8 text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
//             <p className="text-slate-600 mb-3 text-sm">
//               Sign in to join the conversation
//             </p>
//             <Link
//               to="/auth/login"
//               className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
//             >
//               Sign In
//             </Link>
//           </div>
//         )
//       ) : (
//         <div className="mb-8 text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
//           <svg
//             className="w-12 h-12 text-slate-300 mx-auto mb-3"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
//             />
//           </svg>
//           <p className="text-slate-600 font-medium">
//             Comments are disabled for this article
//           </p>
//         </div>
//       )}

//       {/* Comments List */}
//       {commentsLoading ? (
//         <div className="text-center py-8">
//           <div className="relative w-10 h-10 mx-auto">
//             <div className="w-10 h-10 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-10 h-10 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
//           </div>
//         </div>
//       ) : comments.length === 0 ? (
//         commentsEnabled && (
//           <div className="text-center py-12 bg-slate-50 rounded-xl">
//             <svg
//               className="w-12 h-12 text-slate-300 mx-auto mb-3"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
//               />
//             </svg>
//             <p className="text-slate-600 font-medium text-sm">
//               No comments yet
//             </p>
//             <p className="text-slate-500 text-xs mt-1">
//               Be the first to comment!
//             </p>
//           </div>
//         )
//       ) : (
//         <div className="space-y-6">
//           {comments.map((comment) => (
//             <CommentItem
//               key={comment._id}
//               comment={comment}
//               blogId={blogId}
//               currentUserId={currentUserId}
//               isAuthenticated={isAuthenticated}
//               isBlogAuthor={isBlogAuthor}
//               commentsEnabled={commentsEnabled}
//               onUpdate={onCommentAdded}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

function CommentsSection({
  blogId,
  comments,
  commentsLoading,
  onCommentAdded,
  isAuthenticated,
  currentUserId,
  commentsEnabled,
  isBlogAuthor,
}) {
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to comment");
      return;
    }

    if (!commentsEnabled) {
      toast.error("Comments are disabled for this article");
      return;
    }

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Posting comment...");

    try {
      await userAPI.post(COMMENT_ENDPOINTS.CREATE(blogId), {
        text: commentText.trim(),
      });

      toast.success("Comment posted! 💬", { id: toastId });
      setCommentText("");
      await onCommentAdded();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post comment", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header with Comments Count - ONLY SHOW IF ENABLED */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">
          {commentsEnabled ? `Comments (${comments.length})` : "Comments"}
        </h3>

        {/* Comments Status Badge */}
        {!commentsEnabled && (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
            Comments Off
          </span>
        )}
      </div>

      {/* SHOW FORM OR DISABLED MESSAGE */}
      {commentsEnabled ? (
        isAuthenticated ? (
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all outline-none text-sm"
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={submitting || !commentText.trim()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {submitting ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mb-8 text-center py-8 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-slate-600 mb-3 text-sm">
              Sign in to join the conversation
            </p>
            <Link
              to="/auth/login"
              className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        )
      ) : (
        <div className="mb-8 text-center py-12 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300">
          <svg
            className="w-16 h-16 text-slate-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          <p className="text-slate-900 font-bold text-lg mb-2">
            Comments are turned off
          </p>
          <p className="text-slate-600 text-sm">
            The author has disabled comments for this post
          </p>
        </div>
      )}

      {/* HIDE ALL PREVIOUS COMMENTS IF DISABLED */}
      {commentsEnabled &&
        (commentsLoading ? (
          <div className="text-center py-8">
            <div className="relative w-10 h-10 mx-auto">
              <div className="w-10 h-10 border-4 border-slate-200 rounded-full"></div>
              <div className="w-10 h-10 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
            </div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl">
            <svg
              className="w-12 h-12 text-slate-300 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-slate-600 font-medium text-sm">
              No comments yet
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Be the first to comment!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                blogId={blogId}
                currentUserId={currentUserId}
                isAuthenticated={isAuthenticated}
                isBlogAuthor={isBlogAuthor}
                commentsEnabled={commentsEnabled}
                onUpdate={onCommentAdded}
              />
            ))}
          </div>
        ))}
    </div>
  );
}



// ✅ COMMENT ITEM
function CommentItem({
  comment,
  blogId,
  currentUserId,
  isAuthenticated,
  isBlogAuthor,
  commentsEnabled,
  onUpdate,
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [showReplies, setShowReplies] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const isCommentAuthor = currentUserId === comment.author?._id?.toString();
  const canDelete = isCommentAuthor || isBlogAuthor;
  const isLiked = comment.likes?.some(
    (id) => id.toString() === currentUserId?.toString()
  );

  // Like Comment Handler
  const handleLikeComment = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to like");
      return;
    }

    setActionLoading(true);
    try {
      await userAPI.put(COMMENT_ENDPOINTS.LIKE(comment._id));
      toast.success(isLiked ? "Like removed" : "Liked!", { duration: 1500 });
      onUpdate();
    } catch (err) {
      toast.error("Failed to like comment");
    } finally {
      setActionLoading(false);
    }
  };

  // Reply Handler
  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setActionLoading(true);
    const toastId = toast.loading("Posting reply...");

    try {
      await userAPI.post(COMMENT_ENDPOINTS.REPLY(comment._id), {
        text: replyText.trim(),
      });
      toast.success("Reply posted!", { id: toastId });
      setReplyText("");
      setShowReplyForm(false);
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post reply", {
        id: toastId,
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Update Comment Handler
  const handleUpdate = async () => {
    if (!editText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setActionLoading(true);
    const toastId = toast.loading("Updating...");

    try {
      await userAPI.put(COMMENT_ENDPOINTS.UPDATE(comment._id), {
        text: editText.trim(),
      });
      toast.success("Comment updated!", { id: toastId });
      setIsEditing(false);
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update", {
        id: toastId,
      });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ DELETE COMMENT HANDLER - THIS WAS MISSING
  const handleDelete = async () => {
    const confirmMessage =
      isBlogAuthor && !isCommentAuthor
        ? "Delete this comment as blog author? This cannot be undone."
        : "Delete your comment? This cannot be undone.";

    if (!window.confirm(confirmMessage)) return;

    const toastId = toast.loading("Deleting...");

    try {
      await userAPI.delete(COMMENT_ENDPOINTS.DELETE(comment._id));
      toast.success("Comment deleted", { id: toastId });
      onUpdate();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete", {
        id: toastId,
      });
    }
  };

  return (
    <div className={`${comment.parent ? "ml-8 md:ml-12" : ""}`}>
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {comment.author?.name?.charAt(0).toUpperCase() || "?"}
        </div>

        {/* Comment Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-slate-50 rounded-2xl px-4 py-3">
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-semibold text-slate-900 text-sm">
                    {comment.author?.name || "Unknown"}
                  </p>
                  {/* Blog Author Badge */}
                  {isBlogAuthor &&
                    comment.author?._id?.toString() === currentUserId && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                        Author
                      </span>
                    )}
                </div>
                <p className="text-xs text-slate-500">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              {/* Edit & Delete Buttons */}
              {canDelete && !isEditing && (
                <div className="flex space-x-2 ml-2">
                  {isCommentAuthor && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-600 hover:text-blue-700 text-xs font-medium"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-700 text-xs font-medium"
                    title={
                      isBlogAuthor && !isCommentAuthor
                        ? "Delete as blog author"
                        : "Delete"
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="mt-2">
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none"
                  rows="2"
                />
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={handleUpdate}
                    disabled={actionLoading}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditText(comment.text);
                    }}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-700 text-sm break-words">
                {comment.text}
              </p>
            )}
          </div>

          {/* Comment Actions */}
          <div className="flex items-center space-x-4 mt-2 text-xs">
            <button
              onClick={handleLikeComment}
              disabled={actionLoading || !isAuthenticated}
              className={`flex items-center space-x-1 font-medium ${
                isLiked ? "text-red-600" : "text-slate-600 hover:text-red-600"
              } disabled:opacity-50 transition`}
            >
              <span>{isLiked ? "❤️" : "🤍"}</span>
              <span>{comment.likesCount || 0}</span>
            </button>

            {isAuthenticated && commentsEnabled && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                Reply
              </button>
            )}

            {comment.children?.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-slate-600 hover:text-slate-900 font-medium"
              >
                {showReplies ? "Hide" : "View"} {comment.children.length}{" "}
                {comment.children.length === 1 ? "reply" : "replies"}
              </button>
            )}
          </div>

          {/* Reply Form */}
          {showReplyForm && commentsEnabled && (
            <form onSubmit={handleReply} className="mt-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                rows="2"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm outline-none"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  type="submit"
                  disabled={actionLoading || !replyText.trim()}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyText("");
                  }}
                  className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-medium hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Nested Replies */}
          {showReplies && comment.children?.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.children.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  blogId={blogId}
                  currentUserId={currentUserId}
                  isAuthenticated={isAuthenticated}
                  isBlogAuthor={isBlogAuthor}
                  commentsEnabled={commentsEnabled}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

