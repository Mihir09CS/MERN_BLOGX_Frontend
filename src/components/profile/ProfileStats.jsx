


import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileStats({ userId, stats, isOwnProfile = false }) {
  const navigate = useNavigate();

  const goToPosts = () => {
    if (isOwnProfile) {
      navigate("/me/blogs");
    } else {
      navigate(`/user/${userId}/blogs`);
    }
  };

  const goToFollowers = () => {
    if (isOwnProfile) {
      navigate("/me/profile/followers");
    } else {
      navigate(`/profile/${userId}/followers`);
    }
  };

  const goToFollowing = () => {
    if (isOwnProfile) {
      navigate("/me/profile/following"); // ✅ Frontend route (NOT API)
    } else {
      navigate(`/profile/${userId}/following`);
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-8 pb-6 border-t-2 border-slate-200">
      <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
        <button
          onClick={goToPosts}
          className="text-center p-4 rounded-xl hover:bg-slate-50 transition-all group"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-blue-600 transition">
            {stats.blogs}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Posts
          </p>
        </button>

        <button
          onClick={goToFollowers}
          className="text-center p-4 rounded-xl hover:bg-slate-50 transition-all group"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-pink-600 transition">
            {stats.followers}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Followers
          </p>
        </button>

        <button
          onClick={goToFollowing}
          className="text-center p-4 rounded-xl hover:bg-slate-50 transition-all group"
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 group-hover:text-green-600 transition">
            {stats.following}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Following
          </p>
        </button>
      </div>
    </div>
  );
}
