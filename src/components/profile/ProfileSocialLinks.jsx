
import React from "react";
import SocialLinkButton from "./SocialLinkButton";

export default function ProfileSocialLinks({ socialLinks }) {
  console.log("🎨 ProfileSocialLinks received:", socialLinks); // DEBUG

  if (!socialLinks) {
    console.log("❌ No socialLinks object");
    return null;
  }

  const links = {
    instagram: socialLinks.instagram || socialLinks.Instagram || "",
    facebook: socialLinks.facebook || socialLinks.Facebook || "",
    twitter: socialLinks.twitter || socialLinks.Twitter || "",
    github: socialLinks.github || socialLinks.Github || "",
    linkedin: socialLinks.linkedin || socialLinks.LinkedIn || "",
    website: socialLinks.website || socialLinks.Website || "",
  };

  console.log("🎨 Normalized links:", links); // DEBUG

  const hasAnyLinks = Object.values(links).some(
    (link) => link && link.trim() !== ""
  );

  if (!hasAnyLinks) {
    console.log("❌ No valid links found");
    return null;
  }

  return (
    <div className="px-4 sm:px-6 pb-6 mb-2">
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <SocialLinkButton platform="instagram" url={links.instagram} />
        <SocialLinkButton platform="facebook" url={links.facebook} />
        <SocialLinkButton platform="twitter" url={links.twitter} />
        <SocialLinkButton platform="github" url={links.github} />
        <SocialLinkButton platform="linkedin" url={links.linkedin} />
        <SocialLinkButton platform="website" url={links.website} />
      </div>
    </div>
  );
}

