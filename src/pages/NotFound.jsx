import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full bg-gradient-to-b from-amber-50 via-white to-orange-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full text-center">
        <p className="text-xs font-semibold tracking-[0.3em] text-amber-600 uppercase mb-3">
          404 Error
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          The page you are looking for doesn’t exist or may have been moved. Let’s get you
          back to exploring beautiful sarees.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-500 text-white text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition"
          >
            Go to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-amber-200 bg-white text-amber-800 text-sm md:text-base font-semibold hover:bg-amber-50 transition"
          >
            Browse Sarees
          </Link>
        </div>

        <p className="text-xs text-gray-400">
          If you typed the URL manually, please check the spelling and try again.
        </p>
      </div>
    </div>
  );
}


