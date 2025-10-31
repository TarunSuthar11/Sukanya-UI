import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import categories from "../data/categories";

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <section className=" py-10 px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Explore Our Saree Collections</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}