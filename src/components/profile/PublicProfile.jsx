import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useUserProfile } from "../../hooks/profile/useUserProfile";
import { useUserBlogs } from "../../hooks/profile/useUserBlogs";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileBio from "../../components/profile/ProfileBio";
import ProfileSocialLinks from "../../components/profile/ProfileSocialLinks";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfilePostsGrid from "../../components/profile/ProfilePostsGrid";
import LoadingSpinner from "../../components/profile/LoadingSpinner";

export default function PublicProfile() {
  const { userId } = useParams();
  const { profile, loading: profileLoading, error } = useUserProfile(userId);
  const { blogs, loading: blogsLoading } = useUserBlogs(userId);

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12">
        <LoadingSpinner size="lg" message="Loading profile..." />
      </div>
    );
  }

  if (error) {
    toast.error(error);
    return null;
  }

  const stats = {
    blogs: blogs.length,
    followers: profile?.followers?.length || 0,
    following: profile?.following?.length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
          <ProfileHeader profile={profile} isOwnProfile={false} />
          <div className="relative z-10 -mt-8">
            <div className="max-w-2xl mx-auto">
              <ProfileBio bio={profile?.bio} />
              <ProfileSocialLinks socialLinks={profile?.socialLinks} />
              <ProfileStats
                userId={profile?.user?._id}
                stats={stats}
                isOwnProfile={false}
              />
            </div>
          </div>
        </div>
        <ProfilePostsGrid
          blogs={blogs}
          userId={userId}
          loading={blogsLoading}
        />
      </div>
    </div>
  );
}
