import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMyProfile } from "../../hooks/profile/useMyProfile";
import { useUpdateProfile } from "../../hooks/profile/useUpdateProfile";
import LoadingSpinner from "../../components/profile/LoadingSpinner";

export default function EditProfile() {
  const navigate = useNavigate();
  const { profile, loading, refetch } = useMyProfile();
  const { updateProfile, updating } = useUpdateProfile();

  const [formData, setFormData] = useState({
    bio: "",
    socialLinks: {
      instagram: "",
      facebook: "",
      twitter: "",
      github: "",
      linkedin: "",
      website: "",
    },
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || "",
        socialLinks: profile.socialLinks || {},
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("bio", formData.bio);
    Object.entries(formData.socialLinks).forEach(([key, value]) => {
      if (value) formDataToSend.append(`socialLinks[${key}]`, value);
    });

    if (avatarFile) formDataToSend.append("avatar", avatarFile);
    if (coverFile) formDataToSend.append("coverImage", coverFile);

    const result = await updateProfile(formDataToSend);
    if (result.success) {
      await refetch();
      navigate("/me/profile");
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 space-y-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Edit Profile
            </h1>
            <p className="text-slate-600">Update your personal information</p>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="hidden"
              id="avatar"
            />
            <label htmlFor="avatar" className="cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl border-4 border-white hover:scale-105 transition-transform">
                {profile?.avatar?.url
                  ? "📷"
                  : profile?.user?.name?.charAt(0) || "U"}
              </div>
            </label>
            <p className="mt-2 text-sm text-slate-500">
              Click to change avatar
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell the world about yourself..."
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-lg font-semibold text-slate-900 mb-6">
              Social Links
            </label>
            {[
              {
                key: "instagram",
                placeholder: "https://instagram.com/username",
                icon: "📸",
              },
              {
                key: "facebook",
                placeholder: "https://facebook.com/username",
                icon: "📘",
              },
              {
                key: "twitter",
                placeholder: "https://twitter.com/username",
                icon: "🐦",
              },
              {
                key: "github",
                placeholder: "https://github.com/username",
                icon: "👨‍💻",
              },
              {
                key: "linkedin",
                placeholder: "https://linkedin.com/in/username",
                icon: "💼",
              },
              {
                key: "website",
                placeholder: "https://yourwebsite.com",
                icon: "🌐",
              },
            ].map(({ key, placeholder, icon }) => {
              const urlValue = formData.socialLinks[key];
              const isValidUrl = urlValue && /^https?:\/\/.+/.test(urlValue);

              return (
                <div key={key} className="mb-4">
                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-xl">{icon}</span>
                    </div>
                    <input
                      type="url"
                      value={urlValue || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            [key]: e.target.value,
                          },
                        })
                      }
                      placeholder={placeholder}
                      className={`flex-1 px-4 py-3 border-0 bg-transparent focus:ring-2 focus:ring-blue-500 rounded-lg transition-all duration-200 ${
                        isValidUrl
                          ? "text-green-900 placeholder-green-400"
                          : "text-slate-900 placeholder-slate-400"
                      }`}
                    />
                    {urlValue && (
                      <div
                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                          isValidUrl
                            ? "bg-green-500 shadow-green-200"
                            : "bg-red-400 shadow-red-200"
                        }`}
                        title={isValidUrl ? "Valid URL" : "Invalid URL"}
                      />
                    )}
                  </div>
                  {urlValue && !isValidUrl && (
                    <p className="mt-1 ml-15 text-xs text-red-500">
                      Please enter a valid URL starting with http:// or https://
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cover Image */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              className="hidden"
              id="cover"
            />
            <label
              htmlFor="cover"
              className="block w-full h-40 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200 transition-colors"
            >
              {coverFile ? "✅ Cover selected" : "Click to upload cover image"}
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={updating}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transition-all text-lg"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/me/profile")}
              className="px-8 py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
