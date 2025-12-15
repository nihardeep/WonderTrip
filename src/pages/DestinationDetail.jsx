import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Clock, Users, Calendar, Heart, Share2, ArrowLeft } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestinationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { makeRequest } = useApi();
  const { setDestination, setStatus } = useBooking();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        setLoading(true);
        // Mock data for now - replace with actual API call
        const mockData = {
          id: parseInt(id),
          name: 'Bali Paradise',
          location: 'Indonesia',
          rating: 4.8,
          reviews: 1250,
          price: 1200,
          duration: '7 days',
          category: 'Beach',
          description: 'Tropical beaches, ancient temples, and vibrant culture await in this Indonesian paradise. Experience the perfect blend of relaxation and adventure with stunning sunsets, lush rice terraces, and world-class surfing spots.',
          images: [
            '/images/destinations/bali-1.jpg',
            '/images/destinations/bali-2.jpg',
            '/images/destinations/bali-3.jpg',
            '/images/destinations/bali-4.jpg'
          ],
          highlights: [
            'Stunning beaches with crystal-clear waters',
            'Ancient temples and cultural heritage sites',
            'World-class surfing and water sports',
            'Lush rice terraces and scenic landscapes',
            'Vibrant nightlife and local cuisine'
          ],
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Bali',
              description: 'Welcome to Bali! Transfer to your resort and relax by the beach.'
            },
            {
              day: 2,
              title: 'Ubud Exploration',
              description: 'Visit the Monkey Forest and explore the cultural heart of Bali.'
            },
            {
              day: 3,
              title: 'Beach Day',
              description: 'Relax on pristine beaches and enjoy water activities.'
            },
            {
              day: 4,
              title: 'Temple Tour',
              description: 'Visit ancient temples and learn about Balinese culture.'
            },
            {
              day: 5,
              title: 'Adventure Activities',
              description: 'Hiking, surfing, or ATV tours through beautiful landscapes.'
            },
            {
              day: 6,
              title: 'Free Day',
              description: 'Explore at your own pace or enjoy spa treatments.'
            },
            {
              day: 7,
              title: 'Departure',
              description: 'Transfer to airport for your journey home.'
            }
          ],
          included: [
            'Round-trip flights',
            'Luxury accommodation',
            'Daily breakfast',
            'Guided tours',
            'Airport transfers',
            '24/7 support'
          ],
          notIncluded: [
            'International flights',
            'Travel insurance',
            'Personal expenses',
            'Optional activities',
            'Visas'
          ]
        };

        // Uncomment when API is ready:
        // const data = await makeRequest(`/destinations/${id}`);
        setDestination(mockData);
      } catch (err) {
        setError('Failed to load destination details');
        console.error('Failed to fetch destination:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id, makeRequest, setDestination]);

  const handleBookNow = () => {
    if (destination) {
      setDestination(destination);
      setStatus('in_progress');
      // Navigate to booking page would happen here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The destination you\'re looking for doesn\'t exist.'}</p>
          <Link to="/destinations">
            <Button>Browse All Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Back Button */}
        <Link to="/destinations" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden mb-4">
                <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary-600" />
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 overflow-x-auto">
                {destination.images?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-500" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Info */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                    {destination.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {destination.location}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{destination.rating}</span>
                      <span className="text-gray-500 ml-1">({destination.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg border border-gray-200 hover:border-gray-300">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 hover:border-gray-300">
                    <Share2 className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {destination.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Itinerary</h3>
              <div className="space-y-4">
                {destination.itinerary?.map((day) => (
                  <Card key={day.day}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{day.title}</h4>
                          <p className="text-gray-600">{day.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {destination.included?.map((item, index) => (
                    <li key={index} className="flex items-center text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Not Included</h3>
                <ul className="space-y-2">
                  {destination.notIncluded?.map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-display font-bold text-primary-600 mb-2">
                    ${destination.price}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                {isAuthenticated ? (
                  <Button onClick={handleBookNow} className="w-full mb-4">
                    Book Now
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" className="block">
                      <Button variant="outline" className="w-full">
                        Login to Book
                      </Button>
                    </Link>
                    <Link to="/signup" className="block">
                      <Button variant="secondary" className="w-full">
                        Create Account
                      </Button>
                    </Link>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Duration</span>
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Rating</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {destination.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Reviews</span>
                    <span>{destination.reviews}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
