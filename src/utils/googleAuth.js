import { authAPI, setUserToken } from "../api/axios";
import { AUTH_ENDPOINTS } from "../api/endpoints";

const GOOGLE_AUTH_ERROR_MESSAGE = "Google authentication failed. Please try again.";

export const handleGoogleAuth = async ({
  credentialResponse,
  navigate,
  setError,
  setLoading,
}) => {
  if (!credentialResponse?.credential) {
    setError(GOOGLE_AUTH_ERROR_MESSAGE);
    return;
  }

  try {
    setLoading(true);
    setError("");

    const { data } = await authAPI.post(AUTH_ENDPOINTS.GOOGLE, {
      token: credentialResponse.credential,
    });

    setUserToken(data.token);
    localStorage.setItem("userId", data._id);

    if (typeof data.hasPassword === "boolean") {
      localStorage.setItem("hasPassword", String(data.hasPassword));
    } else {
      localStorage.removeItem("hasPassword");
    }

    if (data.hasPassword === false) {
      navigate("/auth/set-password");
      return;
    }

    navigate("/");
  } catch (err) {
    const message =
      err.response?.data?.message || GOOGLE_AUTH_ERROR_MESSAGE;
    setError(message);
  } finally {
    setLoading(false);
  }
};

export const getGoogleAuthProps = ({
  navigate,
  setError,
  setLoading,
}) => ({
  onSuccess: (credentialResponse) =>
    handleGoogleAuth({
      credentialResponse,
      navigate,
      setError,
      setLoading,
    }),
  onError: () => {
    setLoading(false);
    setError(GOOGLE_AUTH_ERROR_MESSAGE);
  },
});
