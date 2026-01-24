
// // src/pages/profile/MyProfile.jsx
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { userAPI } from "../../api/axios";
// import { PROFILE_ENDPOINTS, USER_ENDPOINTS } from "../../api/endpoints";

// export default function MyProfile() {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [blogs, setBlogs] = useState([]);
//   const [stats, setStats] = useState({
//     blogs: 0,
//     followers: 0,
//     following: 0,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchProfileData();
//   }, []);

//   const fetchProfileData = async () => {
//     try {
//       const profileRes = await userAPI.get(PROFILE_ENDPOINTS.MY_PROFILE);
//       setProfile(profileRes.data.data);

//       const blogsRes = await userAPI.get(USER_ENDPOINTS.USER_BLOGS(profileRes.data.data.user._id));
//       setBlogs(blogsRes.data.data || []);

//       setStats({
//         blogs: blogsRes.data.data?.length || 0,
//         followers: profileRes.data.data.followers?.length || 0,
//         following: profileRes.data.data.following?.length || 0,
//       });
//     } catch (err) {
//       toast.error("Failed to load profile");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative w-16 h-16 mx-auto">
//             <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Profile Card */}
//         <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
//           {/* Cover Image */}
//           <div className="h-32 md:h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
//             {profile?.coverImage?.url && (
//               <img
//                 src={profile.coverImage.url}
//                 alt="Cover"
//                 className="w-full h-full object-cover"
//               />
//             )}
//           </div>

//           {/* Profile Content */}
//           <div className="px-4 sm:px-6">
//             {/* Top Section: Avatar + Name + Buttons */}
//             <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6">
//               {/* Left: Avatar + Name */}
//               <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4">
//                 {/* Avatar */}
//                 <div className="-mt-16 sm:-mt-20 mb-4 sm:mb-0">
//                   {profile?.avatar?.url ? (
//                     <img
//                       src={profile.avatar.url}
//                       alt={profile.user?.name}
//                       className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-4 border-white"
//                     />
//                   ) : (
//                     <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl border-4 border-white">
//                       {profile?.user?.name?.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                 </div>
                
//                 {/* Name (Desktop) */}
//                 <div className="hidden sm:block pt-4">
//                   <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
//                     {profile?.user?.name}
//                   </h1>
//                   <p className="text-slate-600 mt-1 text-sm md:text-base">{profile?.user?.email}</p>
//                 </div>
//               </div>

//               {/* Right: Action Buttons */}
//               <div className="flex space-x-3 mt-4 sm:mt-0 sm:pt-4">
//                 <Link
//                   to="/me/profile/edit"
//                   className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base"
//                 >
//                   <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                   </svg>
//                   <span>Edit</span>
//                 </Link>
//                 <Link
//                   to="/account"
//                   className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all duration-200 text-sm sm:text-base"
//                 >
//                   Settings
//                 </Link>
//               </div>
//             </div>

//             {/* Name (Mobile - Centered) */}
//             <div className="sm:hidden text-center mb-6">
//               <h1 className="text-2xl font-bold text-slate-900">
//                 {profile?.user?.name}
//               </h1>
//               <p className="text-slate-600 text-sm mt-1">{profile?.user?.email}</p>
//             </div>

//             {/* Bio Section - CRITICAL: Add bottom padding */}
//             {profile?.bio && (
//               <div className="mb-4 pb-2">
//                 <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
//                   {profile.bio}
//                 </p>
//               </div>
//             )}

//             {/* Social Links Section - CRITICAL: Add bottom padding before stats */}
//             <div className="pb-6 mb-2">
//               {profile?.socialLinks && Object.values(profile.socialLinks).some(link => link) && (
//                 <div className="flex flex-wrap gap-2 sm:gap-3">
//                   {/* Instagram */}
//                   {profile.socialLinks.instagram && (
//                     <a
//                       href={profile.socialLinks.instagram}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                       </svg>
//                       <span>Instagram</span>
//                     </a>
//                   )}

//                   {/* Facebook */}
//                   {profile.socialLinks.facebook && (
//                     <a
//                       href={profile.socialLinks.facebook}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
//                       </svg>
//                       <span>Facebook</span>
//                     </a>
//                   )}

//                   {/* Twitter */}
//                   {profile.socialLinks.twitter && (
//                     <a
//                       href={profile.socialLinks.twitter}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg font-medium transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                       </svg>
//                       <span>Twitter</span>
//                     </a>
//                   )}

//                   {/* GitHub */}
//                   {profile.socialLinks.github && (
//                     <a
//                       href={profile.socialLinks.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
//                       </svg>
//                       <span>GitHub</span>
//                     </a>
//                   )}

//                   {/* LinkedIn */}
//                   {profile.socialLinks.linkedin && (
//                     <a
//                       href={profile.socialLinks.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
//                       </svg>
//                       <span>LinkedIn</span>
//                     </a>
//                   )}

//                   {/* Website */}
//                   {profile.socialLinks.website && (
//                     <a
//                       href={profile.socialLinks.website}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-md text-xs sm:text-sm"
//                     >
//                       <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
//                       </svg>
//                       <span>Website</span>
//                     </a>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Stats Section - CRITICAL: Add top padding and border */}
//             <div className="grid grid-cols-3 gap-1 pt-8 pb-6 border-t-2 border-slate-200">
//               <button
//                 onClick={() => navigate(`/user/${profile?.user?._id}/blogs`)}
//                 className="text-center p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition"
//               >
//                 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.blogs}</p>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Posts</p>
//               </button>
              
//               <Link
//                 to="/me/profile/followers"
//                 className="text-center p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition"
//               >
//                 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.followers}</p>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Followers</p>
//               </Link>
              
//               <Link
//                 to="/me/profile/following"
//                 className="text-center p-3 sm:p-4 rounded-xl hover:bg-slate-50 transition"
//               >
//                 <p className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900">{stats.following}</p>
//                 <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">Following</p>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Recent Posts Section - Same as before */}
//         <div>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Recent Posts</h2>
//             {blogs.length > 0 && (
//               <Link
//                 to={`/user/${profile?.user?._id}/blogs`}
//                 className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm"
//               >
//                 View All →
//               </Link>
//             )}
//           </div>

//           {blogs.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 sm:p-12 text-center">
//               <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//               </svg>
//               <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">No Posts Yet</h3>
//               <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6">Share your first story with the world</p>
//               <Link
//                 to="/create"
//                 className="inline-block px-5 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition text-sm sm:text-base"
//               >
//                 Create Post
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
//               {blogs.slice(0, 6).map((blog) => (
//                 <Link
//                   key={blog._id}
//                   to={`/blog/${blog._id}`}
//                   className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   {blog.coverImage?.url ? (
//                     <img
//                       src={blog.coverImage.url}
//                       alt={blog.title}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
//                   )}
                  
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                     <div className="text-white text-center px-4">
//                       <div className="flex items-center justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm font-semibold">
//                         <span className="flex items-center space-x-1">
//                           <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
//                           </svg>
//                           <span>{blog.likes?.length || 0}</span>
//                         </span>
//                         {blog.commentsEnabled !== false && (
//                           <span className="flex items-center space-x-1">
//                             <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//                             </svg>
//                             <span>{blog.commentsCount || 0}</span>
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { PROFILE_ENDPOINTS, USER_ENDPOINTS } from "../../api/endpoints";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileBio from "../../components/profile/ProfileBio";
import ProfileSocialLinks from "../../components/profile/ProfileSocialLinks";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfilePostsGrid from "../../components/profile/ProfilePostsGrid";

export default function MyProfile() {
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blogsLoading, setBlogsLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // API call: GET /api/profile/me
      const profileRes = await userAPI.get(PROFILE_ENDPOINTS.MY_PROFILE);
      setProfile(profileRes.data.data);

      // API call: GET /api/users/:id/blogs
      setBlogsLoading(true);
      const blogsRes = await userAPI.get(
        USER_ENDPOINTS.USER_BLOGS(profileRes.data.data.user._id)
      );
      setBlogs(blogsRes.data.data || []);
      setBlogsLoading(false);
    } catch (err) {
      toast.error("Failed to load profile");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Right after profile loads
  if (profile?.socialLinks) {
    console.log("✅ Backend saved socialLinks:", profile.socialLinks);
  }

  const stats = {
    blogs: blogs.length,
    followers: profile?.followers?.length || 0,
    following: profile?.following?.length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden mb-8">
          <ProfileHeader profile={profile} isOwnProfile={true} />
          <ProfileBio bio={profile?.bio} />
          <ProfileSocialLinks socialLinks={profile?.socialLinks} />
          <ProfileStats
            userId={profile?.user?._id}
            stats={stats}
            isOwnProfile={true}
          />
        </div>

        {/* Recent Posts */}
        <ProfilePostsGrid
          blogs={blogs}
          userId={profile?.user?._id}
          loading={blogsLoading}
        />
      </div>
    </div>
  );
}


