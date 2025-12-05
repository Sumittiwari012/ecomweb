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

export default function App() {
  // ✅ CART
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ USER
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ✅ ORDERS
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ WISHLIST
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  // ✅ CART FUNCTIONS
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) =>
            item.id === id ? { ...item, qty } : item
          )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // ✅ ORDER
  const placeOrder = (items) => {
    const newOrder = {
      id: Date.now(),
      items,
      date: new Date().toLocaleString(),
      status: "Placed",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  // ✅ WISHLIST
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
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
            updateQty={updateQty}
            removeFromCart={removeFromCart}
            cartCount={cartCount}
            user={user}
            placeOrder={placeOrder}
          />
        }
      />

      <Route
        path="/checkout"
        element={
          <CheckoutPage
            cartItems={cartItems}
            cartCount={cartCount}
            clearCart={clearCart}
            setCartItems={setCartItems}
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
        element={<RegisterPage cartCount={cartCount} login={login} user={user} />}
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
        element={<OrdersPage orders={orders} cartCount={cartCount} user={user} />}
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
