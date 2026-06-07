import React, { useState } from "react";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { CONTACT_ENDPOINTS } from "../../api/endpoints";
import StaticPage from "./StaticPage";

const inputClassName =
  "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "feedback",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must not exceed 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address";
    }

    if (!formData.type) {
      newErrors.type = "Feedback type is required";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.length > 200) {
      newErrors.subject = "Subject must not exceed 200 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > 5000) {
      newErrors.message = "Message must not exceed 5000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const response = await userAPI.post(CONTACT_ENDPOINTS.SUBMIT_FEEDBACK, {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        type: formData.type,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          name: "",
          email: "",
          type: "feedback",
          subject: "",
          message: "",
        });
        setErrors({});
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to submit feedback. Please try again.";

      toast.error(errorMessage);
      console.error("Feedback submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StaticPage
      eyebrow="Contact"
      title="Reach out with feedback, bugs, or product ideas"
      description="DevScribe is still evolving, and thoughtful feedback helps improve the writing experience, product quality, and community health."
    >
      <p>
        If something feels off, a workflow is confusing, or you have an idea
        that would make the platform more useful for developers, we want to
        hear it.
      </p>

      <div className="not-prose mt-8 space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold text-slate-900">Support</h2>
            <p className="mt-2 text-sm text-slate-600">
              For account questions or platform issues, email{" "}
              <a
                href="mailto:support@devscribe.app"
                className="font-medium text-blue-600 hover:underline"
              >
                support@devscribe.app
              </a>
              .
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-base font-semibold text-slate-900">
              Response expectations
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              We may not offer instant live support, but every message is
              reviewed and used to guide product improvements.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Send feedback
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Share a bug, suggestion, or general note. The form still posts to
              the existing contact endpoint, so current integration stays
              intact.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Your name"
                  className={`${inputClassName} ${
                    errors.name ? "border-red-500 bg-red-50" : ""
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="you@example.com"
                  className={`${inputClassName} ${
                    errors.email ? "border-red-500 bg-red-50" : ""
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <label
                  htmlFor="type"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Feedback Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={loading}
                  className={`${inputClassName} ${
                    errors.type ? "border-red-500 bg-red-50" : ""
                  }`}
                >
                  <option value="feedback">General Feedback</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="issue">Issue Report</option>
                  <option value="bug">Bug Report</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Brief subject of your message"
                  className={`${inputClassName} ${
                    errors.subject ? "border-red-500 bg-red-50" : ""
                  }`}
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Message *{" "}
                <span className="text-xs font-normal text-slate-500">
                  (10-5000 characters)
                </span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={loading}
                placeholder="Share your feedback, describe the issue, or suggest an improvement..."
                rows="6"
                className={`${inputClassName} resize-none ${
                  errors.message ? "border-red-500 bg-red-50" : ""
                }`}
              />
              <div className="mt-2 flex items-center justify-between gap-3">
                <div>
                  {errors.message && (
                    <p className="text-sm text-red-600">{errors.message}</p>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {formData.message.length}/5000
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 ${
                  loading
                    ? "cursor-not-allowed bg-slate-300 text-slate-600"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Feedback"
                )}
              </button>
            </div>

            {submitted && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-medium text-green-800">
                  ✓ Thank you for the feedback. Your message has been received.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </StaticPage>
  );
};

export default Contact;
