import { useState, useMemo, useContext, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import { PRODUCTS } from "../data/product";
import { ShoppingCart } from "lucide-react";
import { categories } from "../context/categoriescontext";

export default function ProductsPage({
  addToCart,
  addToWishlist,
  cartCount,
  user,
}) {
  const [searchParams] = useSearchParams();
  const navbarSearch = searchParams.get("search") || "";

  const [query, setQuery] = useState(navbarSearch);
  const [sortBy, setSortBy] = useState("none");

  const context = useContext(categories);
  if (!context) {
    throw new Error("ProductsPage must be used inside CategoriesContextProvider");
  }

  const { selectedCategory, setSelectedCategory } = context;

  // ✅ Correct place to log UPDATED value
  useEffect(() => {
    console.log("✅ ProductsPage category updated:", selectedCategory);
  }, [selectedCategory]);

  const categoriesList = [
    "All",
    "Electronics",
    "Fashion",
    "Home & Living",
    "Accessories",
  ];

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [query, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ✅ FILTER BAR */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">All Products</h1>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border px-3 py-2 rounded-full text-sm w-52"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border px-3 py-2 rounded-full text-sm"
            >
              {categoriesList.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border px-3 py-2 rounded-full text-sm"
            >
              <option value="none">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="rating-desc">Rating: High → Low</option>
            </select>
          </div>
        </div>

        {/* ✅ PRODUCT GRID */}
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-cover"
                  />
                </Link>

                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-1">
                    {product.name}
                  </h2>

                  <p className="text-blue-600 font-bold mb-1">
                    ${product.price}
                  </p>

                  <p className="text-sm text-gray-500 mb-2">
                    {product.category} • ⭐ {product.rating}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-blue-600 text-white py-2 rounded-full text-sm flex items-center justify-center hover:bg-blue-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => {
                      addToWishlist(product);
                      alert("✅ Added to Wishlist");
                    }}
                    className="mt-2 text-sm font-medium text-pink-600 hover:underline"
                  >
                    ❤️ Add to Wishlist
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
