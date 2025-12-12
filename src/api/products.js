import api from "./axios";

// ✅ Get All Products
export const getProductsAPI = () => api.get("/Products/AllProduct");

// ✅ Get Product By ID
export const getProductByIdAPI = (id) =>
  api.get(`/Products/ByPdtId`,{ params: { id: id } });

// ✅ Get Products By Category ID
export const getProductsByCategoryAPI = (id) =>
  api.get(`/Products/ByPdtCatId`,{ params: { id: id } });
