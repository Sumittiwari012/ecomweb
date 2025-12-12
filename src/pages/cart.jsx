import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate ,Link} from "react-router-dom";

export default function CartPage({
  cartItems,
  updateQty,
  removeFromCart,
  cartCount,
  user,
}) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ✅ SINGLE ITEM CHECKOUT
  const handleSingleCheckout = (item) => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Store single item for checkout with proper format
    const singleItem = {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.image,
      qty: item.quantity,
    };

    console.log("🛒 Single checkout item:", singleItem);
    
    localStorage.setItem("singleCheckout", JSON.stringify([singleItem]));
    navigate("/checkout");
  };

  // ✅ COLLECTIVE CHECKOUT
  const handleCollectiveCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Clear single checkout flag to indicate collective checkout
    localStorage.removeItem("singleCheckout");
    
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border rounded-lg p-4 mb-4 shadow-sm"
              >
                {/* ✅ PRODUCT INFO */}
                <div className="flex items-center gap-4">
                  <Link to={`/product/${item.id}`}>
                  <img
                    src={item.product?.image}
                    alt={item.product?.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </Link>
                  

                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.product?.name}
                    </h2>
                    <p className="text-blue-600 font-bold">
                      ${item.product?.price}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Subtotal: ${(item.product?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* ✅ QUANTITY CONTROLS */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.product.id, item.quantity - 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span className="font-semibold w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQty(item.product.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                {/* ✅ ACTION BUTTONS */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleSingleCheckout(item)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm whitespace-nowrap"
                  >
                    Buy This Item
                  </button>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ TOTAL & CHECKOUT */}
            <div className="border-t pt-4 mt-6">
              <div className="text-right mb-4">
                <p className="text-gray-600">
                  Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  Total: ${total.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleCollectiveCheckout}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 font-semibold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}