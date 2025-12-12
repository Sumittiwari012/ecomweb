import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { getProductByIdAPI } from "../api/products";

export default function ProductDetails({
  addToCart,
  addToWishlist,
  cartCount,
  user,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    getProductByIdAPI(id)
      .then((res) => {
        console.log("✅ Fetched Product:", res.data);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  // ✅ FIXED BUY NOW - Format data correctly for checkout
  const handleBuyNow = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Format the product data to match what checkout expects
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1
    };

    console.log("🛒 Buy Now (Product Details):", checkoutItem);
    
    localStorage.setItem("singleCheckout", JSON.stringify([checkoutItem]));
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} user={user} />
        <div className="p-10 text-center text-xl">Loading product details...</div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} user={user} />
        <p className="p-10 text-center text-red-500">Product not found</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-blue-600 font-bold mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">
            ⭐ {product.rating} Rating | Category: {product.category}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => addToCart(product.id)}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
            >
              Buy Now
            </button>

            <button
              onClick={() => {
                addToWishlist(product);
                alert("✅ Added to Wishlist");
              }}
              className="bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700"
            >
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}