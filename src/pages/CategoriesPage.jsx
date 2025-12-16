import categories from "../data/categories";
import CategoryCard from "../components/CategoryCard";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 xl:px-16 py-8 md:py-12">
        <div className="text-center mb-8 md:mb-10">
          <p className="text-xs font-semibold tracking-[0.3em] text-amber-600 uppercase mb-2">
            Shop by Category
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Explore Our Saree Collections
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Discover sarees across silk, cotton, chiffon and more. Choose a category to see
            curated styles tailored to your occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}


