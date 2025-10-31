import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.id}`} className="block rounded-2xl overflow-hidden shadow-md hover:scale-105 transition">
      <img src={category.image} alt={category.name} className="w-full h-60 object-cover" />
      <div className="p-3 bg-white text-center font-semibold">{category.name}</div>
    </Link>
  );
}