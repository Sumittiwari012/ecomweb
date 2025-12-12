import api from "./axios";

export const registerUser = async (formData) => {
  const response = await api.post("auth/register", formData);
  return response.data;
};
export const loginUser = async (formData) => {
  const response = await api.post("auth/login", formData);

  // Save token & user from backend
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response.data;
};