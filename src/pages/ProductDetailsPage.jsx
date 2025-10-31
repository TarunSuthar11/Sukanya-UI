import { useParams } from "react-router-dom";
import products from "../data/products";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) return <p className="text-center mt-20">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-2 gap-10">
      <img src={product.image} alt={product.name} className="rounded-2xl w-full object-cover" />
      <div>
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-maroon-700 font-bold text-xl mb-3">₹{product.price}</p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <button className="bg-maroon-700 text-white px-6 py-3 rounded-full hover:bg-maroon-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
}