// // src/pages/profile/ProfileFollowers.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { userAPI } from "../../api/axios";
// import { PROFILE_ENDPOINTS } from "../../api/endpoints";

// export default function ProfileFollowers() {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [followers, setFollowers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const currentUserId = localStorage.getItem("userId");
//   const isOwnProfile = currentUserId === userId;

//   useEffect(() => {
//     if (isOwnProfile) {
//       navigate("/me/profile/followers");
//       return;
//     }
//     fetchFollowers();
//   }, [userId, isOwnProfile]);

//   const fetchFollowers = async () => {
//     try {
//       // Fetch user's profile for name
//       const profileRes = await userAPI.get(
//         PROFILE_ENDPOINTS.PUBLIC_PROFILE(userId)
//       );
//       setProfile(profileRes.data.data);

//       // Fetch followers
//       const followersRes = await userAPI.get(
//         PROFILE_ENDPOINTS.PROFILE_FOLLOWERS(userId)
//       );
//       setFollowers(followersRes.data.data || []);
//     } catch (err) {
//       toast.error("Failed to load followers");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredFollowers = followers.filter(
//     (user) =>
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative w-16 h-16 mx-auto">
//             <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-4 text-slate-600 font-medium">
//             Loading followers...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
//       <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <button
//             onClick={() => navigate(`/profile/${userId}`)}
//             className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4 transition"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 19l-7-7 7-7"
//               />
//             </svg>
//             <span className="font-medium">Back</span>
//           </button>

//           <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
//             {profile?.user?.name}'s Followers
//           </h1>
//           <p className="text-slate-600">
//             {filteredFollowers.length}{" "}
//             {filteredFollowers.length === 1 ? "follower" : "followers"}
//           </p>
//         </div>

//         {/* Search */}
//         {followers.length > 0 && (
//           <div className="mb-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search followers..."
//                 className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
//               />
//               <svg
//                 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//           </div>
//         )}

//         {/* Followers List */}
//         {filteredFollowers.length === 0 ? (
//           <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
//             <svg
//               className="w-16 h-16 text-slate-300 mx-auto mb-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//               />
//             </svg>
//             <h3 className="text-xl font-bold text-slate-900 mb-2">
//               {searchTerm ? "No Results" : "No Followers Yet"}
//             </h3>
//             <p className="text-slate-600">
//               {searchTerm
//                 ? "Try a different search term"
//                 : `${profile?.user?.name} has no followers yet`}
//             </p>
//           </div>
//         ) : (
//           <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
//             <div className="divide-y divide-slate-200">
//               {filteredFollowers.map((user) => (
//                 <FollowerCard key={user._id} user={user} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function FollowerCard({ user }) {
//   const currentUserId = localStorage.getItem("userId");
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkFollowStatus();
//   }, []);

//   const checkFollowStatus = async () => {
//     if (!currentUserId) return;
//     try {
//       const { data } = await userAPI.get(PROFILE_ENDPOINTS.MY_PROFILE);
//       const myFollowing = data.data.following || [];
//       setIsFollowing(
//         myFollowing.some((id) => id._id === user._id || id === user._id)
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleFollowToggle = async () => {
//     if (!currentUserId) {
//       toast.error("Please login to follow");
//       return;
//     }

//     setLoading(true);
//     try {
//       await userAPI.put(PROFILE_ENDPOINTS.TOGGLE_FOLLOW(user._id));
//       setIsFollowing(!isFollowing);
//       toast.success(isFollowing ? "Unfollowed" : "Following");
//     } catch (err) {
//       toast.error("Failed to update");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isOwnProfile = currentUserId === user._id;

//   return (
//     <div className="p-4 hover:bg-slate-50 transition">
//       <div className="flex items-center justify-between">
//         <Link
//           to={`/profile/${user._id}`}
//           className="flex items-center space-x-3 flex-1"
//         >
//           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
//             {user.name?.charAt(0).toUpperCase()}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="font-semibold text-slate-900 truncate">{user.name}</p>
//             <p className="text-sm text-slate-600 truncate">{user.email}</p>
//           </div>
//         </Link>

//         {!isOwnProfile && currentUserId && (
//           <button
//             onClick={handleFollowToggle}
//             disabled={loading}
//             className={`px-4 py-2 rounded-lg font-medium transition text-sm disabled:opacity-50 ${
//               isFollowing
//                 ? "bg-slate-200 hover:bg-slate-300 text-slate-700"
//                 : "bg-blue-600 hover:bg-blue-700 text-white"
//             }`}
//           >
//             {loading ? "..." : isFollowing ? "Following" : "Follow"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import FollowersList from "../../components/profile/FollowersList";
import LoadingSpinner from "../../components/profile/LoadingSpinner";

export default function ProfileFollowers() {
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFollowers();
  }, [userId]);

  const fetchFollowers = async () => {
    try {
      setLoading(true);
      const { data } = await userAPI.get(`/profile/${userId}/followers`);
      setFollowers(data.data || []);
    } catch (err) {
      toast.error("Failed to load followers");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <LoadingSpinner size="lg" message="Loading followers..." />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <FollowersList
          users={followers}
          title={`${followers.length || 0} Followers`}
        />
      </div>
    </div>
  );
}
