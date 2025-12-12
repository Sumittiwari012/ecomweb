import { useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate } from "react-router-dom";

export default function Profile({
  user,
  logout,
  cartCount,
  orders,
  wishlist,
}) {
  const navigate = useNavigate();

  // ✅ DEBUG: Log orders when component loads
  useEffect(() => {
    console.log("👤 Profile Page Loaded");
    console.log("📦 Orders prop:", orders);
    console.log("📦 Orders length:", orders?.length);
    console.log("❤️ Wishlist prop:", wishlist);
    console.log("🛒 Cart count:", cartCount);
  }, [orders, wishlist, cartCount]);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✅ DEBUG: Log when "My Orders" button is clicked
  const handleMyOrdersClick = () => {
    console.log("🔍 'My Orders' button clicked");
    console.log("📦 Current orders state:", orders);
    console.log("📦 Orders count:", orders?.length);
    
    if (orders && orders.length > 0) {
      console.log("📦 First order:", orders[0]);
      console.log("📦 First order items:", orders[0]?.items);
    } else {
      console.log("⚠️ No orders found!");
    }
    
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT USER CARD */}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white 
                          flex items-center justify-center text-3xl mx-auto mb-4">
            {user.name.charAt(0)}
          </div>

          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* RIGHT DASHBOARD */}
        <div className="md:col-span-2 space-y-6">
          
          <h1 className="text-3xl font-bold">My Account</h1>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500 text-sm">Orders</p>
              <p className="text-2xl font-bold mt-1">{orders?.length || 0}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500 text-sm">Wishlist</p>
              <p className="text-2xl font-bold mt-1">{wishlist?.length || 0}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-gray-500 text-sm">Cart Items</p>
              <p className="text-2xl font-bold mt-1">{cartCount || 0}</p>
            </div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="bg-white p-6 rounded-xl shadow flex flex-wrap gap-4">
            <button
              onClick={handleMyOrdersClick}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              My Orders ({orders?.length || 0})
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-black"
            >
              Wishlist ({wishlist?.length || 0})
            </button>

            <button
              onClick={() => navigate("/products")}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
            >
              Continue Shopping
            </button>
          </div>

          

        </div>
      </div>

      <Footer />
    </div>
  );
}