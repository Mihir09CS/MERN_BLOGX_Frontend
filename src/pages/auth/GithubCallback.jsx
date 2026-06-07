import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authAPI, setUserToken } from "../../api/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center gap-4">
    <div className="relative h-12 w-12">
      <svg
        className="h-full w-full animate-spin text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z"
        />
      </svg>
    </div>
    <p className="text-sm text-slate-600">Completing GitHub sign in...</p>
  </div>
);

export default function GithubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleGithubCallback = async () => {
      try {
        const code = searchParams.get("code");
        const githubError = searchParams.get("error");

        if (githubError) {
          const errorDescription = searchParams.get("error_description");
          throw new Error(
            errorDescription || "GitHub authentication was cancelled.",
          );
        }

        if (!code) {
          throw new Error("No authorization code received from GitHub.");
        }

        const { data } = await authAPI.post(AUTH_ENDPOINTS.GITHUB, { code });

        setUserToken(data.token);
        localStorage.setItem("userId", data._id);

        if (typeof data.hasPassword === "boolean") {
          localStorage.setItem("hasPassword", String(data.hasPassword));
        } else {
          localStorage.removeItem("hasPassword");
        }

        if (data.hasPassword === false) {
          navigate("/auth/set-password");
          return;
        }

        navigate("/");
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.message ||
          "GitHub authentication failed. Please try again.";
        setError(message);
        setIsProcessing(false);
      }
    };

    handleGithubCallback();
  }, [searchParams, navigate]);

  if (isProcessing && !error) {
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-32px_rgba(15,23,42,0.32)]">
          <div className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 pb-7 pt-6 text-white sm:px-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 shadow-[0_18px_40px_-18px_rgba(37,99,235,0.7)]">
              <svg
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 8-4 4 4 4m10-8 4 4-4 4M13 5l-2 14"
                />
              </svg>
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                DevScribe
              </p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                Signing you in
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                Please wait while we complete your authentication with GitHub.
              </p>
            </div>
          </div>

          <div className="px-6 py-12 sm:px-8">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-32px_rgba(15,23,42,0.32)]">
          <div className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 pb-7 pt-6 text-white sm:px-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-400 shadow-[0_18px_40px_-18px_rgba(37,99,235,0.7)]">
              <svg
                className="h-7 w-7 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 8-4 4 4 4m10-8 4 4-4 4M13 5l-2 14"
                />
              </svg>
            </div>
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
                DevScribe
              </p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                Authentication Failed
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                There was an issue signing you in with GitHub.
              </p>
            </div>
          </div>

          <div className="px-6 py-6 sm:px-8">
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>

            <button
              onClick={() => navigate("/auth/login")}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
