import React from "react";

export default function ProfileBio({ bio }) {
  if (!bio) return null;

  return (
    <div className="px-4 sm:px-6 mb-4 pb-2">
      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
        {bio}
      </p>
    </div>
  );
}
