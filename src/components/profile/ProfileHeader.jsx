import React from "react";
import { Link } from "react-router-dom";

export default function ProfileHeader({ profile, isOwnProfile = false }) {
  return (
    <>
      {/* Cover Image */}
      <div className="h-32 md:h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {profile?.coverImage?.url && (
          <img
            src={profile.coverImage.url}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Profile Content */}
      <div className="px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            {/* Avatar + Name */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row sm:space-x-4 mb-6 sm:mb-0">
              <div className="relative">
                {profile?.avatar?.url ? (
                  <img
                    src={profile.avatar.url}
                    alt={profile.user?.name}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-4 border-white"
                  />
                ) : (
                  <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl border-4 border-white">
                    {profile?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <div className="hidden sm:block pt-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
                  {profile?.user?.name}
                </h1>
                <p className="text-slate-600 mt-1 text-sm md:text-base">
                  {profile?.user?.email}
                </p>
              </div>
            </div>

            {/* Buttons */}
            {isOwnProfile && (
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Link
                  to="/me/profile/edit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/me/account/edit"
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Settings
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Name */}
          <div className="sm:hidden text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              {profile?.user?.name}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              {profile?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
