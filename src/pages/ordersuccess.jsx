import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { Link } from "react-router-dom";

export default function ordersuccess({ cartCount ,user}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Order Placed Successfully 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for shopping with us. This is a demo frontend, so no real
          payment was processed.
        </p>

        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>

      <Footer />
    </div>
  );
}
