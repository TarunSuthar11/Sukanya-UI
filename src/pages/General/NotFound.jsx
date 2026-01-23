import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full  bg-primary-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full text-center">
        <p className="text-sm font-semibold tracking-[0.3em] text-red-600 uppercase mb-3">
          404 Error
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          The page you are looking for doesn’t exist or may have been moved. Let’s get you
          back to exploring beautiful sarees.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
          <Link
            to="/shop"
            className="flex btn-primary text-sm">
            Browse Sarees
          </Link>

          <Link
            to="/"
            className="flex btn-secondary text-sm">
            Go to Homepage
          </Link>
         
        </div>

        <p className="text-xs text-gray-400">
          If you typed the URL manually, please check the spelling and try again.
        </p>
      </div>
    </div>
  );
}


