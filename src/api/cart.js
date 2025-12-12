import api from "./axios";

// Add to cart
export const addToCartAPI = (productId, qty = 1) =>
  api.post(`/Cart/Add`, null, {
    params: { productId, qty }
  });

// Get cart (fix route name)
export const getCartAPI = () => api.get("/Cart/MyCart");

// Remove from cart
export const removeFromCartAPI = (productId) =>
  api.delete(`/Cart/Remove`, { params: { productId } });
