import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';
// import ChatBot from '../components/common/ChatBot';

const TripDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingText, setLoadingText] = useState('Connecting to global travel database...');

    useEffect(() => {
        let textInterval;
        if (loading) {
            const texts = [
                'Connecting to global travel database...',
                'Asking locals for hidden gems...',
                'Checking flight patterns...',
                'Analyzing weather forecasts...',
                'Curating the perfect vibe for you...'
            ];
            let i = 0;
            textInterval = setInterval(() => {
                i = (i + 1) % texts.length;
                setLoadingText(texts[i]);
            }, 2000);
        }
        return () => clearInterval(textInterval);
    }, [loading]);

    const fetchTripDetails = async () => {
        console.log(`Starting fetch for trip ID: ${id}`);
        setLoading(true);
        setError(null);

        try {
            // PROMISE RACE FOR TIMEOUT
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error('TIMEOUT'));
                }, 10000);
            });

            // The actual fetch request
            const fetchPromise = fetch('https://wondertrip.app.n8n.cloud/webhook/ac5d8037-976d-4384-8622-a08566629e3e', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    intent: 'fetch_trip',
                    trip_id: id
                }),
            });

            // Race them!
            const response = await Promise.race([fetchPromise, timeoutPromise]);
            console.log(`Response status: ${response.status}`);

            let data;
            try {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    data = await response.json();
                } else {
                    const text = await response.text();
                    console.log(`Received non-JSON response: ${text.substring(0, 50)}...`);
                    data = {};
                }
            } catch (parseError) {
                console.error(`Error parsing response: ${parseError.message}`);
                data = {};
            }

            // DATA MAPPING
            let tripDataRaw = {};
            if (Array.isArray(data) && data.length > 0) {
                // Try to find the specific trip that matches our ID
                const foundTrip = data.find(item => {
                    const itemData = item.json || item;
                    // Check both top-level and json-level structure
                    return (itemData.itinerary_id === id) || (item.itinerary_id === id);
                });

                if (foundTrip) {
                    tripDataRaw = foundTrip.json || foundTrip;
                } else {
                    console.log('Exact ID match not found, using first item as fallback');
                    tripDataRaw = data[0].json || data[0];
                }
            } else {
                tripDataRaw = data.json || data || {};
            }

            // CRITICAL VALIDATION: If we don't have basic data, treat as error
            // We check for headline/title OR destination OR itinerary
            const isValidTrip = tripDataRaw.headline || tripDataRaw.title || tripDataRaw.destination_city || (tripDataRaw.itinerary_outline && tripDataRaw.itinerary_outline.length > 0);

            if (!isValidTrip) {
                console.warn('Received data but it lacks essential trip fields. Showing error.');
                throw new Error('TRIP_NOT_FOUND');
            }

            // Construct mapped trip with SAFE fallbacks
            const mappedTrip = {
                id: tripDataRaw.itinerary_id || id,
                location: tripDataRaw.destination_city ? `${tripDataRaw.destination_city}, ${tripDataRaw.destination_country || ''}` : 'Location Loading...',
                title: tripDataRaw.headline || tripDataRaw.title || `Trip #${id}`,
                description: tripDataRaw.description || 'Loading description...',
                image: determineImage(tripDataRaw.destination_city || ''),
                creator: {
                    name: tripDataRaw.user_id || 'AI Traveler',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
                    subscribed: false
                },
                keyLocations: Array.isArray(tripDataRaw.key_locations) ? tripDataRaw.key_locations : [],
                itinerary: Array.isArray(tripDataRaw.itinerary_outline) ? tripDataRaw.itinerary_outline.map(item => ({
                    day: item.day || 1,
                    title: item.title || 'Day Title',
                    description: item.description || '',
                    activities: item.activities || null,
                    meals: item.meals || null,
                    how_to_reach: item.how_to_reach || null
                })) : [],
                vibes: Array.isArray(tripDataRaw.vibes) ? tripDataRaw.vibes : [],
                stops: tripDataRaw.duration_days || 1
            };

            setTrip(mappedTrip);

        } catch (err) {
            console.error(`CRITICAL ERROR: ${err.message}`);
            if (err.message === 'TIMEOUT') {
                setError('TIMEOUT');
            } else if (err.message === 'TRIP_NOT_FOUND') {
                setError('TRIP_NOT_FOUND');
            } else {
                setError(err.message || 'Failed to load trip');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(`TripDetail mounted with ID: ${id}`);
        if (id) {
            fetchTripDetails();
        } else {
            console.warn('WARN: No ID provided');
            setLoading(false);
            setError('No Trip ID provided');
        }
    }, [id]);

    const determineImage = (destination) => {
        if (!destination) return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80';
        const d = destination.toLowerCase();
        if (d.includes('tokyo')) return 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80';
        if (d.includes('bali')) return 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80';
        if (d.includes('maldives')) return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80';
        if (d.includes('paris')) return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80';
        return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 p-4">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
                </div>
                <div className="text-center max-w-md w-full">
                    <p className="text-lg font-medium text-purple-900 animate-pulse">{loadingText}</p>
                    <p className="text-sm text-gray-500 mt-2">Putting together your dream itinerary...</p>
                </div>
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full">
                    <div className="mb-6 flex justify-center">
                        <span className="text-6xl filter drop-shadow-md">😴</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Oops! Our AI is taking a power nap.
                    </h2>
                    <p className="text-gray-600 mb-4 text-lg">
                        {(typeof error === 'string' && error === 'TIMEOUT') ? 'The request timed out.' :
                            (typeof error === 'string' && error === 'TRIP_NOT_FOUND') ? 'We could not find the trip details. Please try again.' :
                                'Unable to load trip details.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            onClick={fetchTripDetails}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                        >
                            Wake up AI! ⏰
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate('/discover')}
                        >
                            Back to Discover
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-gray-900">WonderTrip</span>
                        </Link>
                        <button
                            onClick={() => navigate('/discover')}
                            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Discover</span>
                        </button>
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                            alt="User profile"
                            className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-purple-500 transition-all"
                        />
                    </div>
                </div>
            </header>

            <div className="container-custom py-8">
                <div className="max-w-3xl mx-auto">
                    {/* Hero Image */}
                    <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
                        <img
                            src={trip.image}
                            alt={trip.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        {trip.title}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {trip.description}
                    </p>

                    {/* Creator Info */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <img
                                src={trip.creator.avatar}
                                alt={trip.creator.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="font-semibold text-gray-900">{trip.creator.name}</span>
                        </div>
                        <Button size="sm" variant="outline">
                            Subscribe
                        </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white">
                            Create Trip From This Post
                        </Button>
                        <Button variant="outline" size="lg">
                            <Heart className="w-5 h-5 mr-2" />
                            Save
                        </Button>
                        <Button variant="outline" size="lg">
                            <Share2 className="w-5 h-5 mr-2" />
                            Share
                        </Button>
                    </div>

                    {/* AI Travel Summary */}
                    <Card className="mb-6">
                        <CardContent className="p-6">
                            <button
                                onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <h2 className="text-2xl font-bold text-gray-900">AI Travel Summary</h2>
                                {isSummaryExpanded ? (
                                    <ChevronUp className="w-6 h-6 text-gray-400" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-400" />
                                )}
                            </button>

                            {isSummaryExpanded && (
                                <div className="mt-6 space-y-6">
                                    {/* Key Locations */}
                                    {trip.keyLocations && trip.keyLocations.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Locations</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {trip.keyLocations.map((location, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                                    >
                                                        {location}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Itinerary Outline */}
                                    {trip.itinerary && trip.itinerary.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Itinerary Outline</h3>
                                            <div className="space-y-4">
                                                {trip.itinerary.map((day, index) => (
                                                    <div key={index} className="flex space-x-4">
                                                        <div className="flex-shrink-0">
                                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                                <Calendar className="w-5 h-5 text-purple-600" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-gray-900 mb-1">
                                                                Day {day.day}: {day.title}
                                                            </h4>
                                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                                                {day.description}
                                                            </p>

                                                            {/* Activities */}
                                                            {day.activities && (
                                                                <div className="mb-4 bg-purple-50 p-4 rounded-xl border border-purple-100">
                                                                    <h5 className="text-sm font-semibold text-purple-900 mb-2 flex items-center">
                                                                        <span>🏃‍♂️ Activities</span>
                                                                    </h5>
                                                                    <p className="text-gray-700 text-sm leading-relaxed">{day.activities}</p>
                                                                </div>
                                                            )}

                                                            {/* Meals Grid */}
                                                            {day.meals && (
                                                                <div className="mb-4">
                                                                    <h5 className="text-sm font-semibold text-gray-900 mb-3">🍽️ Meals</h5>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                                                        {day.meals.breakfast && (
                                                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                                                                                <span className="font-semibold text-orange-600 block mb-1 text-xs uppercase tracking-wider">Breakfast</span>
                                                                                <p className="text-gray-700 line-clamp-3">{day.meals.breakfast.suggestion || day.meals.breakfast}</p>
                                                                            </div>
                                                                        )}
                                                                        {day.meals.lunch && (
                                                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                                                                                <span className="font-semibold text-green-600 block mb-1 text-xs uppercase tracking-wider">Lunch</span>
                                                                                <p className="text-gray-700 line-clamp-3">{day.meals.lunch.suggestion || day.meals.lunch}</p>
                                                                            </div>
                                                                        )}
                                                                        {day.meals.dinner && (
                                                                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-sm">
                                                                                <span className="font-semibold text-indigo-600 block mb-1 text-xs uppercase tracking-wider">Dinner</span>
                                                                                <p className="text-gray-700 line-clamp-3">{day.meals.dinner.suggestion || day.meals.dinner}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* How to Reach */}
                                                            {day.how_to_reach && (
                                                                <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-100 flex items-start gap-3">
                                                                    <span className="text-xl">🗺️</span>
                                                                    <div>
                                                                        <span className="font-semibold text-blue-900 block mb-1">How to reach</span>
                                                                        <p className="text-blue-800 leading-relaxed">{day.how_to_reach}</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Vibes */}
                                    {trip.vibes && trip.vibes.length > 0 && (
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Vibes</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {trip.vibes.map((vibe, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium border border-pink-200"
                                                    >
                                                        {vibe}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* <ChatBot /> */}
        </div>
    );
};

export default TripDetail;
