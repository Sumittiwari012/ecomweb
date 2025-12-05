import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function orders({ orders, cartCount, user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Order #{order.id}</span>
                  <span className="text-sm text-gray-500">
                    {order.date}
                  </span>
                </div>

                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between border-b last:border-b-0 py-2 text-sm"
                  >
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}

                <p className="mt-3 text-sm font-semibold text-green-600">
                  Status: {order.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
