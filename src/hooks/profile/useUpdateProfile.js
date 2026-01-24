import { useState } from "react";
import toast from "react-hot-toast";
import { userAPI } from "../../api/axios";
import { PROFILE_ENDPOINTS } from "../../api/endpoints";

export const useUpdateProfile = () => {
  const [updating, setUpdating] = useState(false);

  const updateProfile = async (profileData) => {
    setUpdating(true);
    const toastId = toast.loading("Updating profile...");

    try {
      await userAPI.put(PROFILE_ENDPOINTS.UPDATE_MY_PROFILE, profileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully! ✨", { id: toastId });
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        id: toastId,
      });
      return { success: false, error: err };
    } finally {
      setUpdating(false);
    }
  };

  return { updateProfile, updating };
};
