import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function OrdersPage({ orders, cartCount, user }) {
  // ✅ DEBUG: Log the orders data
  console.log("📦 Orders received:", orders);
  console.log("📦 Orders count:", orders?.length);
  
  if (orders && orders.length > 0) {
    console.log("📦 First order structure:", orders[0]);
  }

  // Calculate total for an order
  const calculateOrderTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {!orders || orders.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg mb-4">No orders placed yet.</p>
            <button
              onClick={() => window.location.href = '/products'}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-xl shadow-md">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b">
                  <div>
                    <h2 className="font-bold text-lg">Order #{order.id}</h2>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.orderDate)}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      📍 {order.address}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                {/* Order Items */}
                <div className="space-y-3 mb-4">
                  {order.items && order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-3 border-b last:border-b-0"
                    >
                      {/* Product Image */}
                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}

                      {/* Product Info */}
                      <div className="flex-1">
                        <p className="font-semibold">
                          {item.product?.name || item.productName || 'Product'}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">
                          ${item.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-semibold text-gray-700">Order Total</span>
                  <span className="font-bold text-xl text-blue-600">
                    ${calculateOrderTotal(order.items).toFixed(2)}
                  </span>
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