import { useState, useEffect } from "react";
import { userAPI } from "../../api/axios";
import { USER_ENDPOINTS } from "../../api/endpoints";

export const useUserBlogs = (userId) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;
    fetchBlogs();
  }, [userId]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await userAPI.get(USER_ENDPOINTS.USER_BLOGS(userId));
      setBlogs(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  return { blogs, loading, error, refetch: fetchBlogs };
};
