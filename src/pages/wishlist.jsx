import { useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate,Link } from "react-router-dom";

export default function WishlistPage({
  wishlist,
  removeFromWishlist,
  addToCart,
  cartCount,
  user,
}) {
  const navigate = useNavigate();

  // ✅ DEBUG: Log wishlist data
  useEffect(() => {
    console.log("❤️ Wishlist Page Loaded");
    console.log("❤️ Wishlist prop:", wishlist);
    console.log("❤️ Wishlist length:", wishlist?.length);
  }, [wishlist]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">
          My Wishlist ({wishlist?.length || 0})
        </h1>

        {!wishlist || wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No items in wishlist.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <Link to={`/product/${item.id}`}>
                  <img
                  src={item.product?.image || item.image}
                  alt={item.product?.name || item.name}
                  className="h-48 w-full object-cover rounded"
                  
                />
                </Link>
                

                <h2 className="font-semibold mt-2">
                  {item.product?.name || item.name}
                </h2>
                <p className="text-blue-600 font-bold">
                  ${item.product?.price || item.price}
                </p>

                <div className="mt-3 flex gap-2">
                  

                  <button
                    onClick={() => {
                      console.log("🗑️ Removing from wishlist, full item:", item);
                      // Use productId for removal (the ID in the WishlistItem table)
                      const removeId = item.productId || item.product?.id || item.id;
                      console.log("🗑️ Product ID to remove:", removeId);
                      removeFromWishlist(removeId);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}