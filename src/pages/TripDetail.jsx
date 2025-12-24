import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ChevronDown, ChevronUp, MapPin, Calendar } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';
import ChatBot from '../components/common/ChatBot';

const TripDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);

    // Mock trip data - in production, this would be fetched based on ID
    const tripData = {
        id: 1,
        location: "Bali, Indonesia",
        title: "Discovering Bali's Hidden Jungle Retreats",
        description: "Escape to the tranquil heart of Bali, where lush rice paddies meet serene jungle canopies. Our latest journey took us to a hidden gem, offering unparalleled peace, rejuvenating experiences, and breathtaking views. From morning yoga amidst the mist to sustainable living workshops, this retreat is a sanctuary for the soul. Join us as we explore the magic of Bali's natural beauty and uncover the secrets to a truly restorative getaway.",
        image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200&q=80',
        creator: {
            name: 'Serene Wanderer',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
            subscribed: false
        },
        keyLocations: ['Ubud, Bali', 'Tegallalang Rice Terraces', 'Campuhan Ridge Walk'],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Tranquil Immersion',
                description: 'Settle into your jungle villa, enjoy a traditional Balinese welcome massage, and a serene sunset yoga session overlooking the valley.'
            },
            {
                day: 2,
                title: 'Cultural Exploration & Rice Paddies',
                description: 'Visit the iconic Tegallalang Rice Terraces, explore local artisan markets in Ubud, and participate in a Balinese cooking class.'
            },
            {
                day: 3,
                title: 'Wellness & Nature Trails',
                description: 'Morning meditation, a guided walk along the Campuhan Ridge Walk, followed by a refreshing dip in the natural spring pools.'
            },
            {
                day: 4,
                title: 'Departure & Lasting Memories',
                description: 'Enjoy a final gourmet breakfast, reflective journaling, and prepare for departure, carrying the peace of Bali with you.'
            }
        ],
        vibes: ['Peaceful', 'Green Escape', 'Wellness', 'Cultural Immersion', 'Serene'],
        stops: 5
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="container-custom">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back</span>
                        </button>
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-gray-900">WonderTrip</span>
                        </Link>
                        <div className="w-20"></div> {/* Spacer for centering */}
                    </div>
                </div>
            </header>

            <div className="container-custom py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Image */}
                    <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-6 shadow-lg">
                        <img
                            src={tripData.image}
                            alt={tripData.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                        {tripData.title}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {tripData.description}
                    </p>

                    {/* Creator Info */}
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                            <img
                                src={tripData.creator.avatar}
                                alt={tripData.creator.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <span className="font-semibold text-gray-900">{tripData.creator.name}</span>
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
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Locations</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {tripData.keyLocations.map((location, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                                >
                                                    {location}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Itinerary Outline */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Itinerary Outline</h3>
                                        <div className="space-y-4">
                                            {tripData.itinerary.map((day, index) => (
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
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            {day.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vibes */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Vibes</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {tripData.vibes.map((vibe, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-pink-50 text-pink-600 rounded-full text-sm font-medium border border-pink-200"
                                                >
                                                    {vibe}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ChatBot />
        </div>
    );
};

export default TripDetail;
