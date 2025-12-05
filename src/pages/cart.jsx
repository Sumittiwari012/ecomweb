import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Cart({
  cartItems,
  updateQty,
  removeFromCart,
  cartCount,
  user,
  placeOrder,
}) {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // ✅ SINGLE ITEM CHECKOUT (FIXED)
  const handleSingleCheckout = (item) => {
  if (!user) {
    navigate("/login");
    return;
  }

  // ✅ Store only this item for checkout
  localStorage.setItem(
    "singleCheckout",
    JSON.stringify([{ ...item }])
  );

  navigate("/checkout");   // ✅ ONLY go to checkout
};


  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded-lg p-4 mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-blue-600 font-bold">
                      ${item.price} × {item.qty}
                    </p>
                    <p className="text-sm text-gray-600">
                      Subtotal: ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-1"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border-l border-r">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1"
                    >
                      +
                    </button>
                  </div>

                  {/* ✅ WORKING Individual Checkout */}
                  <button
                    onClick={() => handleSingleCheckout(item)}
                    className="text-sm bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Checkout This Item
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* ✅ COLLECTIVE CHECKOUT */}
            <div className="text-right mt-6">
              <p className="text-xl font-semibold mb-4">
                Total: ${total.toFixed(2)}
              </p>

              <Link
                to="/checkout"
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
              >
                Proceed to Collective Checkout
              </Link>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
