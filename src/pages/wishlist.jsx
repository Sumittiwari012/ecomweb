import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function WishlistPage({
  wishlist,
  removeFromWishlist,
  addToCart,
  cartCount,
  user,
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-blue-600 font-bold mb-2">
                  ₹{item.price}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Remove
                  </button>
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
