// src/pages/profile/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { PROFILE_ENDPOINTS } from "../../api/endpoints";

export default function EditProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    instagram: "",
    facebook: "",
    twitter: "",
    github: "",
    linkedin: "",
    website: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await userAPI.get(PROFILE_ENDPOINTS.MY_PROFILE);
      const profile = data.data;

      setFormData({
        bio: profile.bio || "",
        instagram: profile.socialLinks?.instagram || "",
        facebook: profile.socialLinks?.facebook || "",
        twitter: profile.socialLinks?.twitter || "",
        github: profile.socialLinks?.github || "",
        linkedin: profile.socialLinks?.linkedin || "",
        website: profile.socialLinks?.website || "",
      });

      if (profile.avatar?.url) {
        setAvatarPreview(profile.avatar.url);
      }
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image must be less than 5MB");
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const toastId = toast.loading("Updating profile...");

    try {
      let avatarData = {};

      // Upload avatar if changed
      if (avatarFile) {
        setUploading(true);
        const formDataUpload = new FormData();
        formDataUpload.append("file", avatarFile);

        const uploadRes = await userAPI.post("/upload", formDataUpload, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        avatarData = {
          avatarUrl: uploadRes.data.url,
          avatarFileId: uploadRes.data.fileId,
        };
        setUploading(false);
      }

      // Update profile
      const updateData = {
        bio: formData.bio.trim(),
        socialLinks: {
          instagram: formData.instagram.trim(),
          facebook: formData.facebook.trim(),
          twitter: formData.twitter.trim(),
          github: formData.github.trim(),
          linkedin: formData.linkedin.trim(),
          website: formData.website.trim(),
        },
        ...avatarData,
      };

      await userAPI.put(PROFILE_ENDPOINTS.UPDATE_MY_PROFILE, updateData);
      toast.success("Profile updated successfully! ✨", { id: toastId });
      navigate("/me/profile");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto">
            <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/me/profile"
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
            <span className="font-medium">Back to Profile</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Edit Profile
          </h1>
          <p className="text-slate-600">
            Personalize your profile and social links
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-4">
                Profile Picture
              </label>
              <div className="flex items-center space-x-6">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    ?
                  </div>
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold cursor-pointer transition"
                  >
                    Change Photo
                  </label>
                  <p className="mt-2 text-xs text-slate-500">
                    JPG, PNG or GIF. Max size 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell people about yourself..."
                rows="4"
                maxLength="500"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all outline-none"
              />
              <p className="mt-2 text-xs text-slate-500">
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Social Links
              </h3>

              <div className="space-y-4">
                {/* Instagram */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <span>Instagram</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <span>Facebook</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/username"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Twitter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-sky-500 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </div>
                      <span>Twitter</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="https://twitter.com/username"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-slate-800 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <span>GitHub</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-blue-700 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <span>LinkedIn</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>

                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-green-600 rounded-md flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                      </div>
                      <span>Website</span>
                    </div>
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={submitting || uploading}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading
                  ? "Uploading..."
                  : submitting
                  ? "Saving..."
                  : "Save Changes"}
              </button>
              <Link
                to="/me/profile"
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all duration-200 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { userAPI } from "../../api/axios";
// import { PROFILE_ENDPOINTS } from "../../api/endpoints";

// // Reusable Avatar Preview Component
// const AvatarPreview = ({ avatarFile, profile }) => {
//   const getPreviewUrl = () => {
//     if (avatarFile) return URL.createObjectURL(avatarFile);
//     return profile?.avatar?.url || null;
//   };

//   const previewUrl = getPreviewUrl();

//   return (
//     <div className="flex flex-col items-center mb-6 sm:mb-8">
//       <div className="relative group">
//         {previewUrl ? (
//           <img
//             src={previewUrl}
//             alt="Avatar Preview"
//             className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-cover shadow-2xl border-4 border-white ring-4 ring-slate-100"
//           />
//         ) : (
//           <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold shadow-2xl border-4 border-white ring-4 ring-slate-100">
//             {profile?.user?.name?.charAt(0).toUpperCase() || "U"}
//           </div>
//         )}

//         {/* Upload overlay */}
//         <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-300 flex items-center justify-center">
//           <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border cursor-pointer hover:bg-white hover:shadow-xl transition-all duration-200">
//             <svg
//               className="w-5 h-5 text-slate-700 mx-auto"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//           </div>
//         </div>
//       </div>
//       <input
//         type="file"
//         id="avatar-upload"
//         accept="image/*"
//         className="hidden"
//         onChange={(e) => {
//           const file = e.target.files[0];
//           if (file && file.size > 5 * 1024 * 1024) {
//             toast.error("Image size must be less than 5MB");
//             return;
//           }
//           // This will be handled by parent onChange
//         }}
//       />
//       <label
//         htmlFor="avatar-upload"
//         className="mt-3 text-xs sm:text-sm text-slate-500 hover:text-slate-700 cursor-pointer font-medium transition-colors"
//       >
//         Click to change avatar
//       </label>
//     </div>
//   );
// };

// // Reusable Cover Preview Component
// const CoverPreview = ({ coverFile, profile }) => {
//   const getPreviewUrl = () => {
//     if (coverFile) return URL.createObjectURL(coverFile);
//     return profile?.coverImage?.url || null;
//   };

//   const previewUrl = getPreviewUrl();

//   return (
//     <div className="mb-6 sm:mb-8">
//       <label className="block text-sm font-medium text-slate-700 mb-2">
//         Cover Image
//       </label>
//       <div className="relative group">
//         {previewUrl ? (
//           <img
//             src={previewUrl}
//             alt="Cover Preview"
//             className="w-full h-32 md:h-40 rounded-2xl object-cover shadow-lg"
//           />
//         ) : (
//           <div className="w-full h-32 md:h-40 bg-gradient-to-r from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center shadow-lg">
//             <svg
//               className="w-12 h-12 text-slate-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//           </div>
//         )}
//         <input
//           type="file"
//           id="cover-upload"
//           accept="image/*"
//           className="hidden"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file && file.size > 5 * 1024 * 1024) {
//               toast.error("Image size must be less than 5MB");
//               return;
//             }
//           }}
//         />
//         <label
//           htmlFor="cover-upload"
//           className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg text-xs font-medium text-slate-700 hover:bg-white hover:shadow-xl cursor-pointer transition-all duration-200 opacity-0 group-hover:opacity-100"
//         >
//           Change Cover
//         </label>
//       </div>
//     </div>
//   );
// };

// export default function EditProfile() {
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState(null);
//   const [formData, setFormData] = useState({
//     bio: "",
//     socialLinks: {
//       instagram: "",
//       facebook: "",
//       twitter: "",
//       github: "",
//       linkedin: "",
//       website: "",
//     },
//   });
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [coverFile, setCoverFile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [updating, setUpdating] = useState(false);

//   // Fetch current profile data
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       const { data } = await userAPI.get(PROFILE_ENDPOINTS.MY_PROFILE);
//       setProfile(data.data);

//       // Populate form with existing data
//       setFormData({
//         bio: data.data.bio || "",
//         socialLinks: data.data.socialLinks || {
//           instagram: "",
//           facebook: "",
//           twitter: "",
//           github: "",
//           linkedin: "",
//           website: "",
//         },
//       });
//     } catch (err) {
//       toast.error("Failed to load profile data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name.startsWith("socialLinks.")) {
//       const platform = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         socialLinks: {
//           ...prev.socialLinks,
//           [platform]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     if (file && file.size > 5 * 1024 * 1024) {
//       toast.error("Image size must be less than 5MB");
//       return;
//     }

//     if (type === "avatar") {
//       setAvatarFile(file);
//     } else {
//       setCoverFile(file);
//     }
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setUpdating(true);
//   //   const toastId = toast.loading("Updating profile...");

//   //   try {
//   //     // Create FormData for file uploads
//   //     const submitData = new FormData();

//   //     // Append text fields
//   //     submitData.append("bio", formData.bio);
//   //     Object.entries(formData.socialLinks).forEach(([key, value]) => {
//   //       if (value) submitData.append(`socialLinks[${key}]`, value);
//   //     });

//   //     // Append files if they exist
//   //     if (avatarFile) submitData.append("avatar", avatarFile);
//   //     if (coverFile) submitData.append("coverImage", coverFile);

//   //     // API call: PUT /api/profile/me
//   //     await userAPI.put(PROFILE_ENDPOINTS.UPDATE_MY_PROFILE, submitData, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });

//   //     toast.success("Profile updated successfully! ✨", { id: toastId });

//   //     // Refetch profile to show updated data
//   //     await fetchProfile();

//   //     // Navigate back to profile
//   //     setTimeout(() => navigate("/me/profile"), 1500);
//   //   } catch (err) {
//   //     toast.error(err.response?.data?.message || "Failed to update profile", {
//   //       id: toastId,
//   //     });
//   //   } finally {
//   //     setUpdating(false);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setUpdating(true);
//     const toastId = toast.loading("Updating profile...");

//     try {
//       // Create FormData for file uploads
//       const submitData = new FormData();

//       // Append text fields
//       submitData.append("bio", formData.bio);
//       Object.entries(formData.socialLinks).forEach(([key, value]) => {
//         // ONLY CHANGE THIS LINE - Add trim() check
//         if (value && value.trim() !== "")
//           submitData.append(`socialLinks[${key}]`, value);
//       });

//       // Append files if they exist
//       if (avatarFile) submitData.append("avatar", avatarFile);
//       if (coverFile) submitData.append("coverImage", coverFile);

//       // API call: PUT /api/profile/me
//       await userAPI.put(PROFILE_ENDPOINTS.UPDATE_MY_PROFILE, submitData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       toast.success("Profile updated successfully! ✨", { id: toastId });

//       // Refetch profile to show updated data
//       await fetchProfile();

//       // Navigate back to profile
//       setTimeout(() => navigate("/me/profile"), 1500);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update profile", {
//         id: toastId,
//       });
//     } finally {
//       setUpdating(false);
//     }
//   };


//   const handleCancel = () => {
//     navigate("/me/profile");
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative w-16 h-16 mx-auto">
//             <div className="w-16 h-16 border-4 border-slate-200 rounded-full"></div>
//             <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
//           </div>
//           <p className="mt-4 text-slate-600 font-medium">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
//             Edit Profile
//           </h1>
//           <p className="text-slate-600 max-w-md mx-auto">
//             Update your profile information and images
//           </p>
//         </div>

//         <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
//           <form onSubmit={handleSubmit} className="p-6 sm:p-8">
//             {/* Cover Image */}
//             <CoverPreview coverFile={coverFile} profile={profile} />

//             {/* Avatar */}
//             <AvatarPreview avatarFile={avatarFile} profile={profile} />

//             {/* Bio */}
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Bio
//               </label>
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleInputChange}
//                 rows={4}
//                 placeholder="Tell us about yourself..."
//                 className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-all duration-200 placeholder-slate-400 text-sm sm:text-base"
//               />
//               <p className="mt-1 text-xs text-slate-500">
//                 Keep it short and sweet (max 500 characters)
//               </p>
//             </div>

//             {/* Social Links */}
//             <div className="mb-8">
//               <label className="block text-lg font-semibold text-slate-900 mb-6">
//                 Social Links
//               </label>

//               <div className="space-y-4">
//                 {[
//                   {
//                     key: "instagram",
//                     placeholder: "https://instagram.com/username",
//                   },
//                   {
//                     key: "facebook",
//                     placeholder: "https://facebook.com/username",
//                   },
//                   {
//                     key: "twitter",
//                     placeholder: "https://twitter.com/username",
//                   },
//                   { key: "github", placeholder: "https://github.com/username" },
//                   {
//                     key: "linkedin",
//                     placeholder: "https://linkedin.com/in/username",
//                   },
//                   { key: "website", placeholder: "https://yourwebsite.com" },
//                 ].map(({ key, placeholder }) => (
//                   <div key={key} className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
//                       <svg
//                         className="w-5 h-5 text-slate-600"
//                         fill="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
//                       </svg>
//                     </div>
//                     <input
//                       type="url"
//                       name={`socialLinks.${key}`}
//                       value={formData.socialLinks[key]}
//                       onChange={handleInputChange}
//                       placeholder={placeholder}
//                       className="flex-1 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-slate-400"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={updating}
//                 className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base shadow-lg hover:shadow-xl disabled:shadow-none disabled:cursor-not-allowed"
//               >
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 {updating ? "Saving..." : "Save Changes"}
//               </button>
//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 className="flex-1 sm:flex-none bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 text-sm sm:text-base shadow-lg hover:shadow-xl"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
