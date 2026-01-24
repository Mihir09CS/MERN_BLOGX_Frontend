import React from "react";

export default function LoadingSpinner({
  size = "md",
  message = "Loading...",
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-20 h-20",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative ${sizeClasses[size]} mx-auto mb-4">
        <div
          className={`w-full h-full border-4 border-slate-200 rounded-full`}
        ></div>
        <div
          className={`w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0`}
        ></div>
      </div>
      <p className="text-slate-600 font-medium">{message}</p>
    </div>
  );
}
