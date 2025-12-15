import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { DESTINATION_CATEGORIES, PRICE_RANGES } from '../data/constants';
import DestinationCard from '../components/destinations/DestinationCard';
import FilterSidebar from '../components/destinations/FilterSidebar';

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const { makeRequest, loading, error } = useApi();

  // Initialize filters from URL params
  useEffect(() => {
    const destinationParam = searchParams.get('destination');
    const categoryParam = searchParams.get('category');
    const priceParam = searchParams.get('price');

    if (destinationParam) setSearchQuery(destinationParam);
    if (categoryParam) setSelectedCategory(categoryParam);
    if (priceParam) {
      const priceRange = PRICE_RANGES.find(range => range.label === priceParam);
      setSelectedPriceRange(priceRange);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Mock data for now - replace with API call
        const mockData = [
          {
            id: 1,
            name: 'Bali Paradise',
            location: 'Indonesia',
            rating: 4.8,
            reviews: 1250,
            price: 1200,
            duration: '7 days',
            category: 'Beach',
            description: 'Tropical beaches, ancient temples, and vibrant culture await in this Indonesian paradise.',
            image: '/images/destinations/bali.jpg'
          },
          {
            id: 2,
            name: 'Swiss Alps Adventure',
            location: 'Switzerland',
            rating: 4.9,
            reviews: 890,
            price: 1800,
            duration: '5 days',
            category: 'Mountain',
            description: 'Experience breathtaking mountain views, charming villages, and world-class skiing.',
            image: '/images/destinations/swiss-alps.jpg'
          },
          {
            id: 3,
            name: 'Tokyo Explorer',
            location: 'Japan',
            rating: 4.7,
            reviews: 2100,
            price: 1500,
            duration: '6 days',
            category: 'City',
            description: 'Dive into the bustling metropolis of Tokyo with its unique blend of tradition and modernity.',
            image: '/images/destinations/tokyo.jpg'
          },
          {
            id: 4,
            name: 'Santorini Sunset',
            location: 'Greece',
            rating: 4.9,
            reviews: 980,
            price: 1350,
            duration: '4 days',
            category: 'Beach',
            description: 'White-washed buildings, stunning sunsets, and crystal-clear waters in the Greek islands.',
            image: '/images/destinations/santorini.jpg'
          },
          {
            id: 5,
            name: 'Machu Picchu Trek',
            location: 'Peru',
            rating: 4.8,
            reviews: 750,
            price: 2200,
            duration: '8 days',
            category: 'Adventure',
            description: 'Hike the ancient Incan citadel and experience the majesty of the Andes mountains.',
            image: '/images/destinations/machu-picchu.jpg'
          },
          {
            id: 6,
            name: 'Northern Lights Tour',
            location: 'Iceland',
            rating: 4.9,
            reviews: 620,
            price: 2800,
            duration: '5 days',
            category: 'Nature',
            description: 'Chase the aurora borealis in the land of fire and ice with expert local guides.',
            image: '/images/destinations/iceland.jpg'
          }
        ];

        // Uncomment when API is ready:
        // const data = await makeRequest('/destinations');
        setDestinations(mockData);
      } catch (err) {
        console.error('Failed to fetch destinations:', err);
      }
    };

    fetchDestinations();
  }, [makeRequest]);

  // Filter and sort destinations
  useEffect(() => {
    let filtered = [...destinations];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(dest => dest.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange) {
      filtered = filtered.filter(dest =>
        dest.price >= selectedPriceRange.min && dest.price <= selectedPriceRange.max
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredDestinations(filtered);
  }, [destinations, selectedCategory, selectedPriceRange, searchQuery, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange);
    const newParams = new URLSearchParams(searchParams);
    if (priceRange) {
      newParams.set('price', priceRange.label);
    } else {
      newParams.delete('price');
    }
    setSearchParams(newParams);
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-center mb-4">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Explore the world's most beautiful places and create unforgettable memories with our curated collection of destinations.
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
            />
          </div>
          <div className="md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none bg-white"
            >
              <option value="featured">Featured</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar
            categories={DESTINATION_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            selectedPriceRange={selectedPriceRange}
            onPriceRangeChange={handlePriceRangeChange}
          />

          {/* Destinations Grid */}
          <div className="flex-1">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600">Failed to load destinations. Please try again.</p>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center min-h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <>
                <div className="mb-4 text-gray-600">
                  Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {selectedPriceRange && ` (${selectedPriceRange.label})`}
                </div>

                {filteredDestinations.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No destinations found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredDestinations.map((destination) => (
                      <DestinationCard key={destination.id} destination={destination} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
