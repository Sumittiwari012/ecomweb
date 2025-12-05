import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { categories } from "../context/categoriescontext";

export default function CategorySection() {
  const { selectedCategory, setSelectedCategory } = useContext(categories);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("✅ Updated category:", selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md"
              onClick={() => {
                setSelectedCategory(cat.name);  // ✅ set category
                navigate("/products");           // ✅ redirect
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition"
              />

              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40">
                <h3 className="text-white text-xl font-bold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
