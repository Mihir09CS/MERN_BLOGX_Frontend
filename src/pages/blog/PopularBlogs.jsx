// // src/pages/blog/PopularBlogs.jsx
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { userAPI } from "../../api/axios";
// import { BLOG_ENDPOINTS } from "../../api/endpoints";

// export default function PopularBlogs() {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPopularBlogs();
//   }, []);

//   const fetchPopularBlogs = async () => {
//     try {
//       const { data } = await userAPI.get(BLOG_ENDPOINTS.GET_POPULAR);

//       // ✅ FIXED: Backend returns { blogs: [...] } not { data: [...] }
//       console.log("Popular Blogs Response:", data); // Debug log
//       setBlogs(data.blogs || []); // Changed from data.data to data.blogs
//     } catch (err) {
//       toast.error("Failed to load popular blogs");
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mx-auto"></div>
//           <p className="mt-4 text-slate-600 font-medium">
//             Loading trending blogs...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Attractive Header */}
//         <div className="text-center mb-10">
//           <div className="inline-block animate-bounce mb-4">
//             <span className="text-6xl">🔥</span>
//           </div>
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
//             Trending Now
//           </h1>
//           <p className="text-lg text-slate-600">
//             Most viewed and loved stories this week
//           </p>
//         </div>

//         {blogs.length === 0 ? (
//           <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-slate-200">
//             <p className="text-slate-600 text-xl">No trending blogs yet</p>
//             <p className="text-slate-500 mt-2">
//               Be the first to create viral content!
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {blogs.map((blog, index) => (
//               <PopularBlogCard key={blog._id} blog={blog} rank={index + 1} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function PopularBlogCard({ blog, rank }) {
//   const currentUserId = localStorage.getItem("userId");
//   const isAuthor =
//     currentUserId && blog.author?._id?.toString() === currentUserId.toString();

//   const getRankGradient = (rank) => {
//     if (rank === 1) return "from-yellow-400 to-orange-500";
//     if (rank === 2) return "from-slate-300 to-slate-400";
//     if (rank === 3) return "from-amber-600 to-amber-700";
//     return "from-blue-500 to-purple-600";
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
//       <div className="flex flex-col md:flex-row relative">
//         {/* Rank Badge */}
//         <div
//           className={`absolute md:relative top-4 left-4 md:top-0 md:left-0 z-10 w-14 h-14 md:w-20 md:h-20 bg-gradient-to-br ${getRankGradient(
//             rank
//           )} rounded-full md:rounded-none md:rounded-l-2xl flex items-center justify-center shadow-2xl`}
//         >
//           <span className="text-white font-bold text-2xl md:text-3xl">
//             #{rank}
//           </span>
//         </div>

//         {/* Cover Image */}
//         <Link to={`/blog/${blog._id}`} className="w-full md:w-80 flex-shrink-0">
//           {blog.coverImage?.url ? (
//             <div className="h-56 md:h-full bg-slate-200">
//               <img
//                 src={blog.coverImage.url}
//                 alt={blog.title}
//                 className="w-full h-full object-cover hover:scale-105 transition duration-300"
//               />
//             </div>
//           ) : (
//             <div className="h-56 md:h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
//               <svg
//                 className="w-20 h-20 text-white/30"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//           )}
//         </Link>

//         {/* Content */}
//         <div className="flex-1 p-6 md:p-8">
//           <div className="flex items-start justify-between mb-3">
//             {blog.category && (
//               <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-md">
//                 {blog.category}
//               </span>
//             )}

//             {/* ✅ Show edit button ONLY for author */}
//             {isAuthor && (
//               <Link
//                 to={`/editor/${blog._id}`}
//                 className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-full font-medium transition"
//               >
//                 ✏️ Edit
//               </Link>
//             )}
//           </div>

//           <Link to={`/blog/${blog._id}`}>
//             <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition line-clamp-2">
//               {blog.title}
//             </h2>
//           </Link>

//           {blog.excerpt && (
//             <p className="text-slate-600 mb-4 line-clamp-3">{blog.excerpt}</p>
//           )}

//           {/* Author & Stats */}
//           <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//             <Link
//               to={`/profile/${blog.author?._id}`}
//               className="flex items-center space-x-3 hover:opacity-80"
//             >
//               <img
//                 src={
//                   blog.author?.avatar ||
//                   `https://ui-avatars.com/api/?name=${blog.author?.name}&background=random`
//                 }
//                 alt={blog.author?.name}
//                 className="w-10 h-10 rounded-full border-2 border-slate-200"
//               />
//               <div>
//                 <p className="text-sm font-semibold text-slate-900">
//                   {blog.author?.name}
//                 </p>
//                 <p className="text-xs text-slate-500">
//                   {new Date(blog.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </Link>

//             <div className="flex items-center space-x-4 text-sm">
//               <span className="flex items-center space-x-1 text-slate-500">
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 <span className="font-semibold">{blog.views || 0}</span>
//               </span>
//               <span className="flex items-center space-x-1">
//                 <span>❤️</span>
//                 <span className="font-semibold">{blog.likes?.length || 0}</span>
//               </span>
//               <span className="flex items-center space-x-1">
//                 <span>💬</span>
//                 <span className="font-semibold">{blog.commentsCount || 0}</span>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/blog/PopularBlogs.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { BLOG_ENDPOINTS } from "../../api/endpoints";

export default function PopularBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularBlogs();
  }, []);

  const fetchPopularBlogs = async () => {
    try {
      const { data } = await userAPI.get(BLOG_ENDPOINTS.GET_POPULAR);
      setBlogs(data.blogs || []);
    } catch (err) {
      toast.error("Failed to load popular blogs");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-slate-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-orange-500 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-slate-600 font-semibold animate-pulse">Loading trending blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50"></div>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="text-center mb-16 pt-8">
          <div className="inline-block mb-6 animate-bounce">
            <div className="text-7xl">🔥</div>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 animate-gradient-x">
              Trending Now
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            The hottest articles everyone's reading this week
          </p>
          {blogs.length > 0 && (
            <div className="mt-6 inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full shadow-lg border border-white/20">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">{blogs.length} Trending Articles</span>
            </div>
          )}
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">No Trending Articles Yet</h3>
              <p className="text-slate-600 mb-6">Be the first to create viral content!</p>
              <Link
                to="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Explore All Articles
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog, index) => (
              <TrendingBlogCard key={blog._id} blog={blog} rank={index + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TrendingBlogCard({ blog, rank }) {
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");
  const isAuthor = currentUserId && blog.author?._id?.toString() === currentUserId.toString();

  const getRankStyle = (rank) => {
    if (rank === 1) return {
      gradient: "from-yellow-400 via-yellow-500 to-orange-500",
      border: "border-yellow-400",
      shadow: "shadow-yellow-200",
      icon: "🥇"
    };
    if (rank === 2) return {
      gradient: "from-slate-300 via-slate-400 to-slate-500",
      border: "border-slate-400",
      shadow: "shadow-slate-200",
      icon: "🥈"
    };
    if (rank === 3) return {
      gradient: "from-amber-600 via-amber-700 to-orange-700",
      border: "border-amber-600",
      shadow: "shadow-amber-200",
      icon: "🥉"
    };
    return {
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      border: "border-purple-500",
      shadow: "shadow-purple-200",
      icon: `#${rank}`
    };
  };

  const style = getRankStyle(rank);

  return (
    <article className={`group bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 ${style.border} overflow-hidden hover:shadow-2xl ${style.shadow} transition-all duration-300 hover:-translate-y-1`}>
      <div className="flex flex-col lg:flex-row">
        {/* Rank Badge */}
        <div className={`relative lg:w-24 flex-shrink-0 bg-gradient-to-br ${style.gradient} flex items-center justify-center p-6 lg:p-0`}>
          <div className="text-center">
            <div className="text-4xl lg:text-5xl font-black text-white drop-shadow-lg">
              {style.icon}
            </div>
            <div className="text-white/90 text-sm font-bold mt-2 lg:hidden">Rank #{rank}</div>
          </div>
        </div>

        {/* Cover Image */}
        <Link to={`/blog/${blog._id}`} className="w-full lg:w-80 flex-shrink-0">
          {blog.coverImage?.url ? (
            <div className="h-64 lg:h-full bg-slate-200 overflow-hidden">
              <img
                src={blog.coverImage.url}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ) : (
            <div className="h-64 lg:h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex items-start justify-between mb-4">
            {blog.category && (
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-bold rounded-full border border-blue-200">
                {blog.category}
              </span>
            )}
            
            {isAuthor && (
              <Link
                to={`/editor/${blog._id}`}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
              >
                ✏️ Edit
              </Link>
            )}
          </div>

          <Link to={`/blog/${blog._id}`}>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-red-600 transition-all line-clamp-2 leading-tight">
              {blog.title}
            </h2>
          </Link>

          {blog.excerpt && (
            <p className="text-slate-600 text-lg mb-6 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
          )}

          {/* Author & Stats */}
          <div className="flex items-center justify-between pt-6 border-t-2 border-slate-100">
            <Link to={`/profile/${blog.author?._id}`} className="flex items-center space-x-3 hover:opacity-80 transition">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {blog.author?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{blog.author?.name}</p>
                <p className="text-xs text-slate-500">
                  {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="font-bold text-lg">{blog.views || 0}</span>
              </div>

              <div className="flex items-center space-x-2 text-red-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="font-bold text-lg">{blog.likes?.length || 0}</span>
              </div>

              <button
                onClick={() => navigate(`/blog/${blog._id}#comments`)}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="font-bold text-lg">{blog.comments?.length || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
