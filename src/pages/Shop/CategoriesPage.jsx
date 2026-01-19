
import CategoryCard from "../../components/Home/CategoryCard";
import { fetchCategory } from "../../service/CategoryService";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";




export default function CategoriesPage() {
  // const [categoryData, setCategoryData] = useState([]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
    cacheTime: 5 * 60 * 1000, // 5 minutes
    staleTime: 2 * 60 * 1000, // 2 minutes
  });





  if (isLoading || isFetching) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-medium text-gray-700">Loading categories...</p>
    </div>;
  }




  return (
    <div className="min-h-screen w-full bg-linear-to-b from-amber-50 via-white to-orange-50">
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
          {data?.data?.categories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
        </div>
      </div>
    </div>
  );
}


