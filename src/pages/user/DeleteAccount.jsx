// src/pages/user/DeleteAccount.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { USER_ENDPOINTS } from "../../api/endpoints";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [understanding, setUnderstanding] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirmation !== "DELETE MY ACCOUNT") {
      toast.error("Please type the confirmation text exactly");
      return;
    }

    if (!understanding) {
      toast.error("Please confirm you understand this action");
      return;
    }

    if (
      !window.confirm(
        "⚠️ This is your final warning! Delete account permanently?"
      )
    ) {
      return;
    }

    setDeleting(true);
    const toastId = toast.loading("Deleting account...");

    try {
      await userAPI.delete(USER_ENDPOINTS.DELETE_ME);

      // Clear auth data
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");

      toast.success("Account deleted. We're sad to see you go 😢", {
        id: toastId,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account", {
        id: toastId,
      });
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/account"
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
            <span className="font-medium">Back to Safety</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-red-900 mb-2 flex items-center space-x-3">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Delete Account</span>
          </h1>
          <p className="text-red-700 font-medium">
            This action cannot be undone. Please read carefully.
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-red-100 border-2 border-red-300 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-4">
            ⚠️ What You'll Lose Forever
          </h2>
          <ul className="space-y-3 text-red-800">
            <li className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>All your articles</strong> - Permanently deleted from
                the platform
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Comments & interactions</strong> - All your comments
                will be removed
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Saved bookmarks</strong> - Access to all saved articles
                lost
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Profile & statistics</strong> - All account data erased
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Account recovery impossible</strong> - This email can't
                be used again
              </span>
            </li>
          </ul>
        </div>

        {/* Delete Form */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-200 p-6 md:p-8">
          <form onSubmit={handleDelete} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Type "DELETE MY ACCOUNT" to confirm{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
                placeholder="DELETE MY ACCOUNT"
                className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none font-mono"
                required
              />
              <p className="mt-2 text-xs text-slate-600">
                Type exactly as shown (case sensitive)
              </p>
            </div>

            {/* Checkbox */}
            <div className="flex items-start space-x-3 p-4 bg-red-50 rounded-xl">
              <input
                type="checkbox"
                id="understanding"
                checked={understanding}
                onChange={(e) => setUnderstanding(e.target.checked)}
                className="w-5 h-5 text-red-600 border-red-300 rounded focus:ring-red-500 mt-0.5"
                required
              />
              <label
                htmlFor="understanding"
                className="text-sm text-red-900 font-medium"
              >
                I understand that this action is permanent and irreversible. All
                my data will be permanently deleted and cannot be recovered.
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={
                  deleting ||
                  confirmation !== "DELETE MY ACCOUNT" ||
                  !understanding
                }
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Permanently Delete My Account"}
              </button>
              <Link
                to="/account"
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all duration-200 text-center"
              >
                Cancel & Keep Account
              </Link>
            </div>
          </form>
        </div>

        {/* Alternative Box */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <svg
              className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-green-900">
              <p className="font-semibold mb-1">Not sure?</p>
              <p>
                You can temporarily deactivate your account instead of deleting
                it.{" "}
                <Link to="/account/settings" className="font-bold underline">
                  Go to Settings
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
