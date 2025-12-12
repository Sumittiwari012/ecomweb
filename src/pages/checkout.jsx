import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CheckoutPage({
  cartItems,
  cartCount,
  clearCheckedOutItems,
  placeOrder,
  user,
}) {
  const navigate = useNavigate();
  const [finalItems, setFinalItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSingleCheckout, setIsSingleCheckout] = useState(false);

  // ✅ ADD FORM DATA STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: ""
  });

  // ✅ HANDLE INPUT CHANGES
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ DETERMINE CHECKOUT TYPE
  useEffect(() => {
    const singleCheckoutData = localStorage.getItem("singleCheckout");

    if (singleCheckoutData) {
      setFinalItems(JSON.parse(singleCheckoutData));
      setIsSingleCheckout(true);
    } else {
      const formattedItems = cartItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        qty: item.quantity,
      }));
      setFinalItems(formattedItems);
      setIsSingleCheckout(false);
    }

    setIsLoading(false);
  }, [cartItems]);

  const total = finalItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (finalItems.length === 0) {
      alert("No items to checkout!");
      return;
    }

    try {
      // ✅ TRY DIFFERENT FORMATS - TEST EACH ONE
      
      // FORMAT 1: PascalCase (C# standard)
      const orderPayload1 = {
        Address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        Items: finalItems.map(item => ({
          ProductId: item.id,
          Quantity: item.qty,
          Price: item.price
        }))
      };

      // FORMAT 2: camelCase
      const orderPayload2 = {
        address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        items: finalItems.map(item => ({
          productId: item.id,
          quantity: item.qty,
          price: item.price
        }))
      };

      // FORMAT 3: OrderItems instead of Items
      const orderPayload3 = {
        Address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
        OrderItems: finalItems.map(item => ({
          ProductId: item.id,
          Quantity: item.qty,
          Price: item.price
        }))
      };

      // 🔍 START WITH FORMAT 1 (try others if it fails)
      const orderPayload = orderPayload1;
      
      console.log("📦 Sending Payload:", orderPayload);
      console.log("📦 JSON String:", JSON.stringify(orderPayload, null, 2));

      await placeOrder(orderPayload);
      await clearCheckedOutItems(finalItems);
      localStorage.removeItem("singleCheckout");

      navigate("/order-success");
    } catch (error) {
      console.error("❌ Order failed:", error);
      alert("Failed to place order. Check console for details.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} user={user} />
        <div className="text-center py-12">Loading checkout...</div>
        <Footer />
      </div>
    );
  }

  if (finalItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={cartCount} user={user} />
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No items to checkout.</p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            Go to Cart
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Checkout</h1>
          {isSingleCheckout && (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Single Item Checkout
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* ✅ SHIPPING FORM */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border p-3 rounded"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border p-3 rounded"
                />
              </div>

              <input
                required
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="border p-3 w-full rounded"
              />

              <textarea
                required
                name="address"
                placeholder="Shipping Address"
                rows="3"
                value={formData.address}
                onChange={handleInputChange}
                className="border p-3 w-full rounded"
              />

              <div className="grid md:grid-cols-3 gap-4">
                <input
                  required
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border p-3 rounded"
                />
                <input
                  required
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border p-3 rounded"
                />
                <input
                  required
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleInputChange}
                  className="border p-3 rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 font-semibold w-full md:w-auto"
              >
                Place Order - ${total.toFixed(2)}
              </button>
            </form>
          </div>

          {/* ✅ ORDER SUMMARY */}
          <div className="border rounded-lg p-6 bg-gray-50 h-fit">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              {finalItems.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-gray-600 text-sm">
                      ${item.price} × {item.qty}
                    </p>
                    <p className="text-blue-600 font-bold text-sm">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-blue-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {!isSingleCheckout && (
              <div className="mt-4 text-xs text-gray-500 bg-blue-50 p-2 rounded">
                💡 All {finalItems.length} items will be removed from your cart after checkout
              </div>
            )}

            {isSingleCheckout && (
              <div className="mt-4 text-xs text-gray-500 bg-green-50 p-2 rounded">
                💡 Only this item will be removed from your cart
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}