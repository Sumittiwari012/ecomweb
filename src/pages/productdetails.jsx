import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/product";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function ProductDetails({
  addToCart,
  addToWishlist,   // ✅ REQUIRED
  cartCount,
  user,
  placeOrder,
}) {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === Number(id));

  if (!product) return <p className="p-10">Product not found</p>;

  const handleBuyNow = () => {
  if (!user) {
    navigate("/login");
    return;
  }

  // ✅ Store single-item checkout in localStorage
  localStorage.setItem(
    "singleCheckout",
    JSON.stringify([{ ...product, qty: 1 }])
  );

  // ✅ Go to checkout page instead of order-success
  navigate("/checkout");
};

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
    onClick={() => addToCart(product)}
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
