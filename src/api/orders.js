import api from "./axios";

export const placeOrderAPI = (items) =>
  api.post("/Orders/PlaceOrder", items);

export const getMyOrdersAPI = () =>
  api.get("/Orders/GetMyOrders");
