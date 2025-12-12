import { useContext, useEffect, useState } from "react"; // ✅ Import useState
import { useNavigate } from "react-router-dom";
import { categories } from "../context/categoriescontext";
import { categoriesAPI } from "../api/categories";

// ✅ Static Images Map (Since your DB Categories table probably doesn't have images)


export default function CategorySection() {
  const { selectedCategory, setSelectedCategory } = useContext(categories);
  const navigate = useNavigate();

  // ✅ 1. Use State instead of 'var'
  // Initialize as empty array [] so .map() doesn't crash on first load
  const [categoriesList, setCategoriesList] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      setLoading(true);
      
      // ✅ 2. Call the API
      categoriesAPI()
        .then((res) => {
          console.log("✅ Fetched Categories:", res.data);
          setCategoriesList(res.data); // ✅ Update the correct state
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
          setLoading(false);
        });
    }, []); // ✅ Empty dependency array [] to run once on mount

  if (loading) return <p className="text-center py-10">Loading Categories...</p>;

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* ✅ 3. Map over the State variable */}
          {categoriesList.map((cat) => (
            <div
              key={cat.id}
              className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md"
              onClick={() => {
                setSelectedCategory(cat.id); // Or cat.name, depending on your filter logic
                navigate("/products");
              }}
            >
              <img
                // ✅ Use the image map, or fallback if API has an image
                src={cat.image || categoryImages[cat.name] || "https://placehold.co/600x400"}
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