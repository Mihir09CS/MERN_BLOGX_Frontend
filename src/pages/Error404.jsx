import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm sm:p-12">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">
            Error 404
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600">
            The page you requested doesn&apos;t exist or may have moved.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Go back
            </button>

            <Link
              to="/"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Go home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
