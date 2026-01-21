import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [rooms, setRooms] = useState(1);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        // Send search intent to n8n
        await fetch('https://wondertrip.app.n8n.cloud/webhook/ac5d8037-976d-4384-8622-a08566629e3e', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            intent: 'Search',
            query: searchQuery,
            startDate,
            endDate,
            adults: parseInt(adults),
            rooms: parseInt(rooms),
            email: user?.email || ''
          }),
        });

        // For UI feedback, we could redirect to the feed with the search query, 
        // effectively mirroring the previous behavior but with the n8n side effect.
        // Redirect to Discover page with search query
        navigate(`/discover?search=${encodeURIComponent(searchQuery)}`);
      } catch (error) {
        console.error('Error sending search:', error);
        // Navigate anyway on error
        // Navigate anyway on error
        navigate(`/discover?search=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Tropical Coastline */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-gray-900">
            Where will WonderTrip
            <span className="block">take you?</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-3xl mx-auto leading-relaxed font-normal">
            Discover breathtaking destinations curated by top creators, and let us craft your perfect trip.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto mb-6">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Destination Input */}
              <div className="flex-[2] relative border-b md:border-b-0 md:border-r border-gray-200">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to?"
                  className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
                />
              </div>

              {/* Check-in Date */}
              <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200 min-w-[140px]">
                <div className="absolute left-3 top-2 text-xs text-gray-500 font-medium">Check-in</div>
                <input
                  type="date"
                  className="w-full pl-4 pt-5 pb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              {/* Check-out Date */}
              <div className="flex-1 relative border-b md:border-b-0 md:border-r border-gray-200 min-w-[140px]">
                <div className="absolute left-3 top-2 text-xs text-gray-500 font-medium">Check-out</div>
                <input
                  type="date"
                  className="w-full pl-4 pt-5 pb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              {/* Adults Input */}
              <div className="w-full md:w-24 relative border-b md:border-b-0 md:border-r border-gray-200">
                <div className="absolute left-3 top-2 text-xs text-gray-500 font-medium">Adults</div>
                <input
                  type="number"
                  min="1"
                  className="w-full pl-4 pt-5 pb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                />
              </div>

              {/* Rooms Input */}
              <div className="w-full md:w-24 relative">
                <div className="absolute left-3 top-2 text-xs text-gray-500 font-medium">Rooms</div>
                <input
                  type="number"
                  min="1"
                  className="w-full pl-4 pt-5 pb-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 text-base"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 transition-colors duration-200 flex items-center justify-center whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </form>

          {/* Call-to-Action Button */}
          <Link to="/discover">
            <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg text-lg">
              Discover Destinations
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
