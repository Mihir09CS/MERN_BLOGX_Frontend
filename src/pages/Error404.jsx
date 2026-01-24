// src/pages/Error404.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-xl border shadow p-10 text-center">
        <h1 className="text-4xl font-bold mb-3">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
        <p className="text-slate-600 mb-6">
          The page you requested doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border bg-white hover:bg-slate-50"
          >
            Go back
          </button>

          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
