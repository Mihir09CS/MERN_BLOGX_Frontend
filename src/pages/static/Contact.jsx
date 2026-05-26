import React, { useState } from "react";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { CONTACT_ENDPOINTS } from "../../api/endpoints";

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

  // Client-side validation
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
            Contact
          </p>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Reach out with feedback, bugs, or ideas
          </h1>
          <p className="text-lg text-slate-600">
            DevScribe is evolving, and your input helps shape the experience.
            Share suggestions, report issues, or tell us what you think.
          </p>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Support</h3>
              <p className="text-slate-600 text-sm">
                For account questions, platform issues, or general support,
                contact{" "}
                <a
                  href="mailto:support@devscribe.app"
                  className="text-blue-600 hover:underline"
                >
                  support@devscribe.app
                </a>
                .
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">
                Response Expectations
              </h3>
              <p className="text-slate-600 text-sm">
                While we may not provide immediate live support, all messages
                are reviewed to help improve product quality, stability, and
                community health.
              </p>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Send us your feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.name
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50"
                } disabled:opacity-50`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
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
                placeholder="your@email.com"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50"
                } disabled:opacity-50`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Feedback Type */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Feedback Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.type
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50"
                } disabled:opacity-50`}
              >
                <option value="feedback">General Feedback</option>
                <option value="suggestion">Suggestion</option>
                <option value="issue">Issue Report</option>
                <option value="bug">Bug Report</option>
              </select>
              {errors.type && (
                <p className="text-red-600 text-sm mt-1">{errors.type}</p>
              )}
            </div>

            {/* Subject Field */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-slate-700 mb-2"
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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.subject
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50"
                } disabled:opacity-50`}
              />
              {errors.subject && (
                <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Message *{" "}
                <span className="text-slate-500 text-xs">
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
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                  errors.message
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50"
                } disabled:opacity-50`}
              />
              <div className="flex justify-between items-center mt-2">
                <div>
                  {errors.message && (
                    <p className="text-red-600 text-sm">{errors.message}</p>
                  )}
                </div>
                <p className="text-slate-500 text-xs">
                  {formData.message.length}/5000
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-slate-300 text-slate-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Feedback"
                )}
              </button>
            </div>

            {/* Success Message */}
            {submitted && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium">
                  ✓ Thank you for your feedback! We've received your message.
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-slate-600 text-sm">
          <p>
            We review all submissions and use your feedback to improve
            DevScribe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
