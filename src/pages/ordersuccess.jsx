import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { Link } from "react-router-dom";

export default function OrderSuccessPage({ cartCount, user }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          ✅ Order Placed Successfully!
        </h1>

        <p className="mb-8">
          Thank you for your purchase. Your order is being processed.
        </p>

        <Link
          to="/orders"
          className="bg-blue-600 text-white px-6 py-3 rounded-full"
        >
          View My Orders
        </Link>
      </div>

      <Footer />
    </div>
  );
}
