import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Menu, Search, User } from "lucide-react";

export default function Navbar({ cartCount, user }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?search=${search}`);
    setSearch("");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">

        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopVibe
        </Link>

        {/* ✅ SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-8"
        >
          <div className="relative w-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute right-3 top-2.5">
              <Search className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-6">
          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          {user ? (
            <Link to="/profile">
              <User className="h-6 w-6 text-blue-600" />
            </Link>
          ) : (
            <Link to="/login">
              <User className="h-6 w-6 text-gray-700" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
