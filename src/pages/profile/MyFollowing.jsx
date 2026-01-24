// src/pages/profile/MyFollowing.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { PROFILE_ENDPOINTS } from "../../api/endpoints";

export default function MyFollowing() {
  const navigate = useNavigate();
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFollowing();
  }, []);

  const fetchFollowing = async () => {
    try {
      const { data } = await userAPI.get(PROFILE_ENDPOINTS.MY_FOLLOWING);
      setFollowing(data.data || []);
    } catch (err) {
      toast.error("Failed to load following");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await userAPI.put(PROFILE_ENDPOINTS.TOGGLE_FOLLOW(userId));
      toast.success("Unfollowed");
      fetchFollowing();
    } catch (err) {
      toast.error("Failed to unfollow");
    }
  };

  const filteredFollowing = following.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/me/profile")}
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4 transition"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="font-medium">Back</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Following
          </h1>
          <p className="text-slate-600">
            {filteredFollowing.length}{" "}
            {filteredFollowing.length === 1 ? "person" : "people"} you follow
          </p>
        </div>

        {/* Search */}
        {following.length > 0 && (
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search following..."
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              />
              <svg
                className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 transform -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Following List */}
        {filteredFollowing.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {searchTerm ? "No Results" : "Not Following Anyone"}
            </h3>
            <p className="text-slate-600 mb-6">
              {searchTerm
                ? "Try a different search term"
                : "Discover interesting people to follow"}
            </p>
            {!searchTerm && (
              <Link
                to="/"
                className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
              >
                Explore
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="divide-y divide-slate-200">
              {filteredFollowing.map((user) => (
                <FollowingCard
                  key={user._id}
                  user={user}
                  onUnfollow={handleUnfollow}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FollowingCard({ user, onUnfollow }) {
  const [unfollowing, setUnfollowing] = useState(false);

  const handleUnfollow = async () => {
    setUnfollowing(true);
    await onUnfollow(user._id);
    setUnfollowing(false);
  };

  return (
    <div className="p-4 hover:bg-slate-50 transition">
      <div className="flex items-center justify-between">
        <Link
          to={`/profile/${user._id}`}
          className="flex items-center space-x-3 flex-1"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {user.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 truncate">{user.name}</p>
            <p className="text-sm text-slate-600 truncate">{user.email}</p>
          </div>
        </Link>

        <button
          onClick={handleUnfollow}
          disabled={unfollowing}
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-medium transition text-sm disabled:opacity-50"
        >
          {unfollowing ? "..." : "Following"}
        </button>
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { userAPI } from "../../api/axios";
// import { PROFILE_ENDPOINTS } from "../../api/endpoints";
// import FollowersList from "../../components/profile/FollowersList";
// import LoadingSpinner from "../../components/profile/LoadingSpinner";

// export default function MyFollowing() {
//   const [following, setFollowing] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFollowing();
//   }, []);

//   const fetchFollowing = async () => {
//     try {
//       setLoading(true);
//       const { data } = await userAPI.get(PROFILE_ENDPOINTS.MY_FOLLOWING);
//       setFollowing(data.data || []);
//     } catch (err) {
//       toast.error("Failed to load following");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return <LoadingSpinner size="lg" message="Loading following..." />;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <FollowersList
//           users={following}
//           title="Following"
//           emptyMessage="No one followed yet"
//         />
//       </div>
//     </div>
//   );
// }
