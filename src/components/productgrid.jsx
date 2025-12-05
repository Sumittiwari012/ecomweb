import { ShoppingCart, Star } from "lucide-react";
import { PRODUCTS } from "../data/product";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductGrid({ addToCart, addToWishlist }) {
  const [toast, setToast] = useState("");

  // ✅ Check if product already in wishlist
  const isInWishlist = (id) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    return wishlist.some((item) => item.id === id);
  };

  const handleWishlist = (product) => {
    addToWishlist(product);
    setToast("✅ Added to Wishlist");
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="py-12 bg-white relative">
      
      {/* ✅ TOAST MESSAGE */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Trending Products
          </h2>
          <Link
            to="/products"
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative h-64 bg-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500 ml-1">
                    {product.rating}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {product.name}
                </h3>

                <p className="text-xl font-bold text-blue-600">
                  ${product.price}
                </p>

                {/* ✅ WISHLIST BUTTON */}
                <button
                  onClick={() => handleWishlist(product)}
                  className={`mt-3 text-sm font-medium transition ${
                    isInWishlist(product.id)
                      ? "text-red-600"
                      : "text-pink-600 hover:underline"
                  }`}
                >
                  ❤️ {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
