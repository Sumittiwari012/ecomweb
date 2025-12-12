import api from "./axios";

// ✅ Match the backend route names
export const addToWishlistAPI = (productId) =>
  api.post("/Wishlist/AddToWishlist", null, { 
    params: { productId } 
  });

export const getWishlistAPI = () => api.get("/Wishlist/GetWishlist");

export const removeFromWishlistAPI = (productId) =>
  api.delete("/Wishlist/RemoveFromWishlist", { 
    params: { productId } 
  });