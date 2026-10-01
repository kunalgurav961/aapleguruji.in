import axiosInstance from "../../../config/api";

export const getRegistrationOptions = async () => {
  const response = await axiosInstance.get("auth/register/options");
  return response.data.data;
};

export const registerAccount = async (credentials) => {
  const response = await axiosInstance.post("auth/register", credentials);
  return response.data;
};

export const loginAccount = async (credentials) => {
  const response = await axiosInstance.post("auth/login", credentials);
  return response.data;
};

export const refreshSession = async () => {
  const response = await axiosInstance.post("auth/refresh");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axiosInstance.get("auth/me");
  return response.data;
};

export const logoutAccount = async () => {
  const response = await axiosInstance.post("auth/logout");
  return response.data;
};
