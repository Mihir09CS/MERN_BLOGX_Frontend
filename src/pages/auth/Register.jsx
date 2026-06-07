import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { authAPI } from "../../api/axios";
import { AUTH_ENDPOINTS } from "../../api/endpoints";
import { getGoogleAuthProps } from "../../utils/googleAuth";

const inputClassName =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const passwordInputClassName = `${inputClassName} pr-12`;

const EyeOpenIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="m3 3 18 18"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M10.585 10.587A2 2 0 0 0 13.413 13.415"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M9.364 5.365A9.954 9.954 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a9.954 9.954 0 0 1-4.166 5.167"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="M6.228 6.228A9.955 9.955 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19a9.95 9.95 0 0 0 5.772-1.772"
    />
  </svg>
);

const TerminalLogo = () => (
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
);

const GitHubIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.071c.575.106.785-.25.785-.556 0-.274-.01-1-.015-1.962-3.192.694-3.866-1.54-3.866-1.54-.522-1.326-1.276-1.679-1.276-1.679-1.043-.713.079-.699.079-.699 1.153.08 1.76 1.184 1.76 1.184 1.024 1.754 2.687 1.248 3.342.954.104-.742.401-1.248.729-1.535-2.548-.289-5.226-1.274-5.226-5.67 0-1.252.447-2.275 1.181-3.077-.118-.289-.512-1.453.112-3.029 0 0 .963-.308 3.154 1.176A10.98 10.98 0 0 1 12 6.018c.98.005 1.968.132 2.89.387 2.19-1.484 3.151-1.176 3.151-1.176.626 1.576.232 2.74.114 3.029.736.802 1.179 1.825 1.179 3.077 0 4.407-2.682 5.377-5.238 5.66.412.355.779 1.055.779 2.126 0 1.535-.014 2.772-.014 3.15 0 .31.207.668.79.554A11.503 11.503 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z" />
  </svg>
);

const PasswordRequirement = ({ complete, label }) => (
  <span
    className={`text-xs ${
      complete ? "text-emerald-600" : "text-slate-400"
    }`}
  >
    ✓ {label}
  </span>
);

const getPasswordChecks = (password) => ({
  minLength: password.length >= 8,
  uppercase: /[A-Z]/.test(password),
  lowercase: /[a-z]/.test(password),
  number: /\d/.test(password),
  special: /[^A-Za-z0-9]/.test(password),
});

const getPasswordStrength = (password) => {
  const checks = getPasswordChecks(password);
  const score = Object.values(checks).filter(Boolean).length;

  if (score === 5) {
    return { label: "Strong", color: "text-emerald-600", checks };
  }

  if (score >= 3) {
    return { label: "Medium", color: "text-amber-600", checks };
  }

  return { label: "Weak", color: "text-rose-600", checks };
};

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const passwordState = getPasswordStrength(formData.password);
  const passwordsMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;
  const googleAuthProps = getGoogleAuthProps({
    navigate,
    setError,
    setLoading,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!strongPassword.test(formData.password)) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
      );
      setLoading(false);
      return;
    }

    try {
      const { data } = await authAPI.post(AUTH_ENDPOINTS.REGISTER, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/auth/verify-email", {
        state: {
          email: formData.email,
          message: data.message,
        },
      });
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "User already exists") {
        setError(
          "An account with this email already exists. Please sign in instead.",
        );
      } else {
        setError(message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

    const redirectUri = import.meta.env.VITE_GITHUB_REDIRECT_URI;

    window.location.href =
      `https://github.com/login/oauth/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=user:email`;
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_30px_80px_-32px_rgba(15,23,42,0.32)]">
        <div className="border-b border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 pb-7 pt-6 text-white sm:px-8">
          <TerminalLogo />
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
              DevScribe
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Start publishing developer stories, project notes, and sharp ideas
              in one clean workspace.
            </p>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8">
          {error && (
            <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClassName}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClassName}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={passwordInputClassName}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                  aria-label={
                    showPassword
                      ? "Hide password fields"
                      : "Show password fields"
                  }
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>

              {formData.password && (
                <p
                  className={`mt-2 text-xs font-medium ${passwordState.color}`}
                >
                  {passwordState.label === "Strong"
                    ? "✓ Strong Password"
                    : `${passwordState.label} password`}
                </p>
              )}

              {formData.password && passwordState.label !== "Strong" && (
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                  <PasswordRequirement
                    complete={passwordState.checks.minLength}
                    label="8+ characters"
                  />
                  <PasswordRequirement
                    complete={passwordState.checks.uppercase}
                    label="Uppercase"
                  />
                  <PasswordRequirement
                    complete={passwordState.checks.lowercase}
                    label="Lowercase"
                  />
                  <PasswordRequirement
                    complete={passwordState.checks.number}
                    label="Number"
                  />
                  <PasswordRequirement
                    complete={passwordState.checks.special}
                    label="Special character"
                  />
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={passwordInputClassName}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
                  aria-label={
                    showPassword
                      ? "Hide password fields"
                      : "Show password fields"
                  }
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>

              {formData.confirmPassword && (
                <p
                  className={`mt-2 text-xs font-medium ${
                    passwordsMatch ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {passwordsMatch
                    ? "✓ Passwords match"
                    : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {loading ? (
                <>
                  <svg
                    className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              Continue with
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <GoogleLogin
                {...googleAuthProps}
                text="continue_with"
                theme="outline"
                shape="pill"
                size="large"
              />
            </div>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50"
            >
              <GitHubIcon />
              Continue with GitHub
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
