import React from "react";
import { Link } from "react-router-dom";

export default function FollowersList({
  users,
  title = "Followers",
  emptyMessage = "No followers yet",
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="px-6 py-6 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      </div>

      {users?.length ? (
        <div className="divide-y divide-slate-100">
          {users.map((user) => (
            <Link
              key={user._id}
              to={`/user/${user._id}`}
              className="flex items-center space-x-4 p-6 hover:bg-slate-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg overflow-hidden">
                {user.profile?.avatar?.url ? (
                  <img
                    src={user.profile.avatar.url}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-slate-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-slate-500 truncate">{user.email}</p>
              </div>
              <div className="text-sm text-slate-500">View Profile</div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
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
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {emptyMessage}
          </h3>
        </div>
      )}
    </div>
  );
}
