import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Search className="w-16 h-16 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">?</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved,
          deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center justify-center">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Destinations
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/destinations?category=Beach"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Beach Destinations
            </Link>
            <Link
              to="/destinations?category=Mountain"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Mountain Trips
            </Link>
            <Link
              to="/destinations?category=City"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              City Exploration
            </Link>
            <Link
              to="/destinations?category=Adventure"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Adventure Tours
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
