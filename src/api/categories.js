import api from "./axios";

export const categoriesAPI = () => api.get("/Categories/getCategories");