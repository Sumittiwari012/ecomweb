import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home.jsx";
import ProductsPage from "./pages/product.jsx";
import ProductDetails from "./pages/productdetails.jsx";
import CartPage from "./pages/cart.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import OrderSuccessPage from "./pages/ordersuccess.jsx";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import ProfilePage from "./pages/profile.jsx";
import OrdersPage from "./pages/orders.jsx";
import WishlistPage from "./pages/wishlist.jsx";

// ✅ BACKEND APIs
import {
  getCartAPI,
  addToCartAPI,
  removeFromCartAPI,
} from "./api/cart";
import {
  getWishlistAPI,
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "./api/wishlist";
import { getMyOrdersAPI, placeOrderAPI } from "./api/orders";

export default function App() {
  // ✅ USER STATE
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ BACKEND STATE
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ PERSIST USER
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // ✅ LOAD DATA AFTER LOGIN
useEffect(() => {
  // 1. Debug: Check if the user exists
  console.log("👤 Current User State:", user); 

  if (!user) {
    console.log("❌ User is NOT logged in. Stopping data fetch.");
    return;
  }

  console.log("✅ User exists. Fetching data...");

  getCartAPI().then((res) => setCartItems(res.data));
  getWishlistAPI().then((res) => setWishlist(res.data));

  // 👇 DEBUG LOGS FOR ORDERS
  getMyOrdersAPI()
    .then((res) => {
      console.log("🚀 FULL API RESPONSE:", res);
      console.log("📦 RAW ORDERS DATA:", res.data); 
      setOrders(res.data);
    })
    .catch((err) => console.error("❌ Failed to fetch orders:", err));
}, [user]);

  // ✅ AUTH
  const login = (userData) => setUser(userData);

  const logout = () => {
    setUser(null);
    setCartItems([]);
    setWishlist([]);
    setOrders([]);
    localStorage.removeItem("token");
  };

  // ✅ CART
  const addToCart = async (productId) => {
    await addToCartAPI(productId, 1);
    const res = await getCartAPI();
    setCartItems(res.data);
  };

  // ✅ UPDATE QUANTITY
  const updateQty = async (productId, newQty) => {
    if (newQty <= 0) {
      await removeFromCart(productId);
      return;
    }

    const item = cartItems.find(i => i.product.id === productId);
    if (!item) return;

    const currentQty = item.quantity;

    if (newQty > currentQty) {
      const diff = newQty - currentQty;
      await addToCartAPI(productId, diff);
    }

    if (newQty < currentQty) {
      await removeFromCartAPI(productId);
      await addToCartAPI(productId, newQty);
    }

    const res = await getCartAPI();
    setCartItems(res.data);
  };

  const removeFromCart = async (productId) => {
    await removeFromCartAPI(productId);
    const res = await getCartAPI();
    setCartItems(res.data);
  };

  // ✅ CLEAR SPECIFIC ITEMS FROM CART (after checkout)
  const clearCheckedOutItems = async (checkedOutItems) => {
    try {
      console.log("🗑️ Clearing items:", checkedOutItems);
      
      for (const item of checkedOutItems) {
        // Handle both 'id' and 'ProductId' properties
        const productId = item.id || item.ProductId;
        
        if (!productId) {
          console.warn("Item has no id:", item);
          continue;
        }
        
        try {
          console.log(`Removing product ${productId} from cart`);
          await removeFromCartAPI(productId);
        } catch (error) {
          console.log(`Could not remove item ${productId}:`, error.message);
        }
      }
      
      // Refresh cart
      const res = await getCartAPI();
      setCartItems(res.data);
      console.log("✅ Cart cleared successfully");
    } catch (error) {
      console.error("❌ Error clearing cart:", error);
    }
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // ✅ WISHLIST
  const addToWishlist = async (product) => {
    await addToWishlistAPI(product.id);
    const res = await getWishlistAPI();
    setWishlist(res.data);
  };

  const removeFromWishlist = async (id) => {
    await removeFromWishlistAPI(id);
    const res = await getWishlistAPI();
    setWishlist(res.data);
  };

  // ✅ ORDERS
  const placeOrder = async (items) => {
    await placeOrderAPI(items);
    const res = await getMyOrdersAPI();
    setOrders(res.data);
  };

  return (
    <Routes>
      <Route
  path="/"
  element={
    <Home
      addToCart={addToCart}
      addToWishlist={addToWishlist}
      cartCount={cartCount}
      
      wishlist={wishlist} // 👈 ADD THIS PROP
      
      user={user}
    />
  }
/>

      <Route
        path="/products"
        element={
          <ProductsPage
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cartCount={cartCount}
            user={user}
          />
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProductDetails
            addToCart={addToCart}
            addToWishlist={addToWishlist}
            cartCount={cartCount}
            user={user}
            placeOrder={placeOrder}
          />
        }
      />

      <Route
        path="/cart"
        element={
          <CartPage
            cartItems={cartItems}
            updateQuantity={updateQty} // ✅ FIXED: Passed as 'updateQuantity'
            removeFromCart={removeFromCart}
            cartCount={cartCount}
            user={user}
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <CheckoutPage
            cartItems={cartItems}
            cartCount={cartCount}
            clearCheckedOutItems={clearCheckedOutItems}
            placeOrder={placeOrder}
            user={user}
          />
        }
      />

      <Route
        path="/order-success"
        element={<OrderSuccessPage cartCount={cartCount} user={user} />}
      />

      <Route
        path="/login"
        element={<LoginPage cartCount={cartCount} login={login} user={user} />}
      />

      <Route
        path="/register"
        element={
          <RegisterPage cartCount={cartCount} login={login} user={user} />
        }
      />

      <Route
        path="/profile"
        element={
          <ProfilePage
            user={user}
            logout={logout}
            cartCount={cartCount}
            orders={orders}
            wishlist={wishlist}
          />
        }
      />

      <Route
        path="/orders"
        element={
          <OrdersPage orders={orders} cartCount={cartCount} user={user} />
        }
      />

      <Route
        path="/wishlist"
        element={
          <WishlistPage
            wishlist={wishlist}
            removeFromWishlist={removeFromWishlist}
            addToCart={addToCart}
            cartCount={cartCount}
            user={user}
          />
        }
      />
    </Routes>
  );
}