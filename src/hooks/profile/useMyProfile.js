import { useState, useEffect } from "react";
import { userAPI } from "../../api/axios";
import { PROFILE_ENDPOINTS } from "../../api/endpoints";

export const useMyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await userAPI.get(PROFILE_ENDPOINTS.MY_PROFILE);
      setProfile(data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  return { profile, loading, error, refetch: fetchProfile };
};
