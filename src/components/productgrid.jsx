import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductsAPI } from "../api/products"; 

// 1️⃣ ACCEPT 'wishlist' PROP
export default function ProductGrid({ addToCart, addToWishlist, wishlist }) {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  useEffect(() => {
    getProductsAPI()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load products:", err);
        setLoading(false);
      });
  }, []);

  // 2️⃣ FIX: USE REAL WISHLIST DATA (Not LocalStorage)
  const isInWishlist = (productId) => {
    // Check if any item in the wishlist array matches this product ID
    // Note: Adjust 'item.productId' or 'item.product.id' based on your exact API response structure
    return wishlist.some((item) => item.productId === productId || item.product?.id === productId);
  };

  const handleWishlist = (productId) => {
    addToWishlist(productId); 
    setToast("✅ Added to Wishlist");
    setTimeout(() => setToast(""), 2000);
  };

  if (loading) return <div className="text-center py-12">Loading trending items...</div>;

  return (
    <div className="py-12 bg-white relative">
      {toast && (
        <div className="fixed bottom-5 right-5 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Header... */}
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-3xl font-bold text-gray-900">Trending Products</h2>
           <Link to="/products" className="text-blue-600 font-semibold">View All</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <Link to={`/product/${product.id}`}>
                <div className="relative h-64 bg-gray-200">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500 ml-1">{product.rating || "New"}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
                <p className="text-xl font-bold text-blue-600">${product.price}</p>

                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}