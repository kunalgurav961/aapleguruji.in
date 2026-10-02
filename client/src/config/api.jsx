import axios from "axios";

let accessToken = null;

const axiosInstance = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

export const setAccessToken = (token) => {
  accessToken = token || null;
};

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

let refreshRequest = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const isAuthRequest = request?.url?.startsWith("auth/");

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retried ||
      isAuthRequest
    ) {
      return Promise.reject(error);
    }

    request._retried = true;
    try {
      refreshRequest ||= axiosInstance
        .post("auth/refresh")
        .then((response) => {
          const token = response.data?.data?.accessToken;
          if (!token) {
            throw new Error("Session refresh did not return an access token.");
          }
          setAccessToken(token);
          return token;
        })
        .finally(() => {
          refreshRequest = null;
        });

      const token = await refreshRequest;
      request.headers.Authorization = `Bearer ${token}`;
      return axiosInstance(request);
    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  },
);

export default axiosInstance;
