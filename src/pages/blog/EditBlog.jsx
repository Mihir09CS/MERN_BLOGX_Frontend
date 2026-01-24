// src/pages/blog/EditBlog.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { BLOG_ENDPOINTS } from "../../api/endpoints";


export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    coverImage: null,
  });
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Technology",
    "Lifestyle",
    "Health",
    "Travel",
    "Food",
    "Business",
    "Education",
    "Entertainment",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data } = await userAPI.get(BLOG_ENDPOINTS.GET_BY_ID(id));
      const blog = data.data;

      // Check if current user is the author
      const currentUserId = localStorage.getItem("userId");
      if (blog.author?._id !== currentUserId) {
        toast.error("You don't have permission to edit this article");
        navigate(`/blog/${id}`);
        return;
      }

      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt || "",
        category: blog.category || "",
        tags: blog.tags?.join(", ") || "",
        coverImage: null,
      });

      if (blog.coverImage?.url) {
        setExistingImage(blog.coverImage.url);
        setImagePreview(blog.coverImage.url);
      }
    } catch (err) {
      toast.error("Failed to load article");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setFormData({ ...formData, coverImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!formData.coverImage) return null;

    const uploadFormData = new FormData();
    uploadFormData.append("file", formData.coverImage);

    try {
      const { data } = await userAPI.post("/upload", uploadFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (err) {
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Content is required");
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Updating your article...");

    try {
      let coverImageUrl = existingImage;
      let coverImageFileId = null;

      // Upload new image if changed
      if (formData.coverImage) {
        setUploading(true);
        const uploadData = await uploadImage();
        coverImageUrl = uploadData.url;
        coverImageFileId = uploadData.fileId;
        setUploading(false);
      }

      const blogData = {
        title: formData.title.trim(),
        content: formData.content,
        excerpt: formData.excerpt.trim() || undefined,
        category: formData.category || undefined,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        coverImageUrl,
        coverImageFileId,
      };

      await userAPI.put(BLOG_ENDPOINTS.UPDATE(id), blogData);

      toast.success("Article updated successfully! ✅", { id: toastId });
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data?.message || "Failed to update article", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(`/blog/${id}`)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 mb-4 transition"
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
            <span>Back to Article</span>
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Edit Article
          </h1>
          <p className="text-lg text-slate-600">Update your story</p>
        </div>

        {/* Form - Same as CreateBlog */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image Upload */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <label className="block text-sm font-bold text-slate-900 mb-4">
              Cover Image
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, coverImage: null });
                    setImagePreview(existingImage);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-12 h-12 text-slate-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-slate-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Title */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <label className="block text-sm font-bold text-slate-900 mb-4">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter an engaging title..."
              className="w-full px-4 py-4 text-2xl font-bold border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
              required
            />
          </div>

          {/* Excerpt */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <label className="block text-sm font-bold text-slate-900 mb-4">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              placeholder="A brief summary of your article (optional)..."
              rows="3"
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 resize-none transition-all outline-none"
            />
          </div>

          {/* Content Editor */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
            <label className="block text-sm font-bold text-slate-900 mb-4">
              Content <span className="text-red-500">*</span>
            </label>

            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              placeholder="Write your blog content here..."
              rows={16}
              className="w-full p-4 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
            />
          </div>

          {/* Category & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
              <label className="block text-sm font-bold text-slate-900 mb-4">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none cursor-pointer"
              >
                <option value="">Select category (optional)</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-8">
              <label className="block text-sm font-bold text-slate-900 mb-4">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                placeholder="react, nodejs, tutorial (comma separated)"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all outline-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="flex-1 px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-2xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Updating..."
                : uploading
                ? "Uploading image..."
                : "Update Article ✅"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
