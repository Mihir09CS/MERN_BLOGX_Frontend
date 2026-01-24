// src/utils/toast.js
import toast from "react-hot-toast";

export const showToast = {
  success: (message, options = {}) => {
    toast.success(message, {
      duration: 3000,
      ...options,
    });
  },

  error: (message, options = {}) => {
    toast.error(message, {
      duration: 4000,
      ...options,
    });
  },

  loading: (message) => {
    return toast.loading(message);
  },

  promise: (promise, messages) => {
    return toast.promise(promise, {
      loading: messages.loading || "Loading...",
      success: messages.success || "Success!",
      error: messages.error || "Something went wrong",
    });
  },

  custom: (message, options = {}) => {
    toast(message, options);
  },
};

// Usage example:
// showToast.success("Blog liked!");
// showToast.error("Failed to load blog");
// const id = showToast.loading("Saving...");
// showToast.success("Saved!", { id });
