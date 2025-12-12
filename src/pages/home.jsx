import Navbar from "../components/navbar.jsx";
import Hero from "../components/hero.jsx";
import Features from "../components/features.jsx";
import CategorySection from "../components/categorysection.jsx";
import ProductGrid from "../components/productgrid.jsx";
import Footer from "../components/footer.jsx";

export default function Home({
  addToCart, addToWishlist, cartCount, wishlist, user
}) {

  return (
    <div className="min-h-screen bg-white">
      <Navbar cartCount={cartCount} user={user} />

      <Hero />
      <Features />
      <CategorySection />
      <ProductGrid 
          addToCart={addToCart} 
          addToWishlist={addToWishlist} 
          wishlist={wishlist} // 👈 Pass it down here
       />

      <Footer />
    </div>
  );
}
