import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage({
  cartItems,
  cartCount,
  clearCart,
  setCartItems,     // ✅ ADD THIS
  placeOrder,
  user,
})
{
  const navigate = useNavigate();

  // ✅ Read Buy Now temporary checkout
  const singleCheckout = JSON.parse(
  localStorage.getItem("singleCheckout")
);


  // ✅ Decide which items are being checked out
  const finalItems =
    singleCheckout && singleCheckout.length > 0
      ? singleCheckout
      : cartItems;

  // ✅ Correct total (qty included)
  const total = finalItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!user) {
    navigate("/login");
    return;
  }

  placeOrder(finalItems);

  if (singleCheckout && singleCheckout.length > 0) {
    const orderedIds = singleCheckout.map((item) => item.id);

    // ✅ THIS updates React state (UI will update correctly)
    setCartItems((prev) =>
      prev.filter((item) => !orderedIds.includes(item.id))
    );
  } else {
    clearCart();  // ✅ For collective checkout
  }

  localStorage.removeItem("singleCheckout");
  navigate("/order-success");
};


  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">

        {/* ✅ SHIPPING FORM */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded px-3 py-2 w-full"
              required
            />

            <input
              type="text"
              placeholder="Address Line 1"
              className="border rounded px-3 py-2 w-full"
              required
            />

            <input
              type="text"
              placeholder="Address Line 2 (optional)"
              className="border rounded px-3 py-2 w-full"
            />

            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="City"
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="State"
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* ✅ ORDER SUMMARY */}
        <div className="border rounded-lg p-4 h-fit bg-gray-50">
          <h2 className="font-semibold mb-3">Order Summary</h2>

          <ul className="space-y-2 mb-4 max-h-64 overflow-y-auto text-sm">
            {finalItems.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
