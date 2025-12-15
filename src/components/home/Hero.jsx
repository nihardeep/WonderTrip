import { Link } from 'react-router-dom';
import Button from '../common/Button';
import SearchForm from '../common/SearchForm';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-500 to-accent-400 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      <div className="relative container-custom py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-accent-200">
              Next Adventure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore breathtaking destinations, create unforgettable memories, and embark on journeys that will change your perspective forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/destinations">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8">
                Start Exploring
              </Button>
            </Link>
            <Link to="#featured">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8">
                View Featured
              </Button>
            </Link>
          </div>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
