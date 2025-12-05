import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();   // ✅ REQUIRED

  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-24 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Summer Collection 2025
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
          Discover the latest trends in fashion and technology.
        </p>

        {/* ✅ WORKING SHOP NOW BUTTON */}
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg flex items-center gap-2"
        >
          Shop Now <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
