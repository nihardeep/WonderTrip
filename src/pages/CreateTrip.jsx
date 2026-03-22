import { useState } from 'react';
import { Sparkles, MapPin, Wifi, Coffee, Bed, Heart, ChevronRight, Bus, Car } from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Dummy Data
const MOCK_HOTELS = [
    {
        id: 1,
        name: 'The Ibiza Bay Resort',
        location: 'Talamanca, Ibiza',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
        tags: ['Luxury', 'Beachfront'],
        rating: 4.9,
        price: 245,
        amenities: ['Free Wifi', 'Breakfast', 'King Bed']
    },
    {
        id: 2,
        name: 'Sol House Ibiza',
        location: 'San Antonio, Ibiza',
        image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=800&auto=format&fit=crop',
        tags: ['Modern', 'Pool Party'],
        rating: 4.7,
        price: 180,
        amenities: ['Free Wifi', 'Breakfast', 'King Bed']
    },
    {
        id: 3,
        name: 'Hotel Pacha',
        location: 'Ibiza Town, Ibiza',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        tags: ['Design', 'Nightlife'],
        rating: 4.8,
        price: 320,
        amenities: ['Free Wifi', 'Breakfast', 'King Bed']
    },
    {
        id: 4,
        name: 'Ushuaïa Beach Hotel',
        location: 'Playa d\'en Bossa, Ibiza',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
        tags: ['Iconic', 'Clubbing'],
        rating: 5.0,
        price: 450,
        amenities: ['Free Wifi', 'Breakfast', 'King Bed']
    },
    {
        id: 5,
        name: 'Nobu Hotel Ibiza Bay',
        location: 'Ibiza, Spain',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop',
        tags: ['Premium', 'Spa'],
        rating: 4.9,
        price: 520,
        amenities: ['Free Wifi', 'Breakfast', 'King Bed']
    },
    {
        id: 6,
        name: 'Hard Rock Hotel',
        location: 'Playa d\'en Bossa, Ibiza',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c0d129df?q=80&w=800&auto=format&fit=crop',
        tags: ['Family', 'Music'],
        rating: 4.6,
        price: 380,
        amenities: ['Free Wifi', 'Breakfast', 'King Bed']
    }
];

const MOCK_ACTIVITIES = [
    { title: 'Kayak the bay', price: 25, duration: '2 hours • equipment incl.', icon: 'water' },
    { title: 'Old Town Walking Tour', price: 15, duration: '3 hours • historical', icon: 'tree' }
];

const MOCK_TRANSIT = [
    { title: 'Private Taxi', price: 30, duration: '25 min • Door-to-door', type: 'car' },
    { title: 'Local Bus L3', price: 3.50, duration: '45 min • Frequent', type: 'bus' }
];

const CreateTrip = () => {
    const [selectedHotel, setSelectedHotel] = useState(null);

    const closeModal = () => setSelectedHotel(null);

    return (
        <div className="section-padding bg-[#F9FAFB] min-h-screen pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div className="max-w-2xl">
                        <div className="flex items-center text-purple-600 font-semibold text-sm tracking-wider uppercase mb-2">
                            <Sparkles className="w-4 h-4 mr-2" /> Curated For You
                        </div>
                        <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">Choose Your Perfect Stay</h1>
                        <p className="text-gray-600">Based on your family vacation vibes, we've selected the top-rated beachfront resorts and boutique stays in Ibiza for your June getaway.</p>
                        {/* Grid decorative icon */}
                        <div className="flex gap-1 mt-4">
                            {[1, 2, 3, 4, 5, 6].map(i => (
                                <div key={i} className="w-2 h-2 rounded-full bg-gray-300"></div>
                            ))}
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-2 divide-x divide-gray-100">
                        <div className="px-6 text-center">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Adults</div>
                            <div className="font-bold text-xl text-gray-900">2</div>
                        </div>
                        <div className="px-6 text-center">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Kids</div>
                            <div className="font-bold text-xl text-gray-900">2</div>
                        </div>
                        <div className="px-6 text-center">
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nights</div>
                            <div className="font-bold text-xl text-gray-900">3</div>
                        </div>
                    </div>
                </div>

                {/* Hotels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_HOTELS.map((hotel) => (
                        <Card key={hotel.id} className="overflow-hidden bg-white rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-56 relative w-full">
                                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {hotel.tags.map(tag => (
                                        <span key={tag} className="bg-white/95 backdrop-blur-sm text-gray-800 text-xs px-3 py-1.5 rounded-full font-bold shadow-sm">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white backdrop-blur-md transition-colors">
                                    <Heart className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{hotel.name}</h3>
                                    <div className="bg-purple-50 text-purple-700 font-bold px-2.5 py-1 rounded-md text-sm flex items-center gap-1 border border-purple-100">
                                        ☆ {hotel.rating}
                                    </div>
                                </div>

                                <div className="flex items-center text-gray-500 text-sm mb-5">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {hotel.location}
                                </div>

                                {/* Amenities */}
                                <div className="flex gap-4 text-xs font-medium text-gray-500 mb-6 uppercase tracking-wide">
                                    <span className="flex items-center"><Wifi className="w-3.5 h-3.5 mr-1" /> Free Wifi</span>
                                    <span className="flex items-center"><Coffee className="w-3.5 h-3.5 mr-1" /> Breakfast</span>
                                    <span className="flex items-center"><Bed className="w-3.5 h-3.5 mr-1" /> King Bed</span>
                                </div>

                                {/* Footer & Action */}
                                <div className="flex items-end justify-between mt-auto">
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">From</div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-extrabold text-2xl text-gray-900">€{hotel.price}</span>
                                            <span className="text-gray-500 text-sm">/ night</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedHotel(hotel)}
                                            className="px-5 py-2 rounded-full border border-gray-200 text-gray-800 font-semibold text-sm hover:bg-gray-50 transition-colors"
                                        >
                                            Details
                                        </button>
                                        <button className="px-5 py-2 rounded-full bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors">
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Bottom Sheet Drawer for Activities/Transit */}
            {selectedHotel && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                        onClick={closeModal}
                    />

                    {/* Drawer Content */}
                    <div className="fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-out flex justify-center pb-0">
                        <div className="bg-[#FAF9FF] w-full max-w-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">

                            {/* Drag handle */}
                            <div className="w-full flex justify-center pt-4 pb-2 bg-white" onClick={closeModal} style={{ cursor: 'pointer' }}>
                                <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
                            </div>

                            <div className="overflow-y-auto p-6 pt-2 pb-10">
                                {/* Destination Header */}
                                <div className="bg-white rounded-2xl p-5 mb-8 flex items-center justify-between shadow-sm border border-purple-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Destination</div>
                                            <div className="text-xl font-bold text-gray-900">Ibiza, Spain • 3 Nights</div>
                                        </div>
                                    </div>
                                    <div className="bg-purple-100 text-purple-700 font-bold px-4 py-1.5 rounded-full text-xs tracking-wider">
                                        ACTIVE
                                    </div>
                                </div>

                                {/* Activities Section */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4 px-2">
                                        <h3 className="text-lg font-black tracking-wide text-gray-900 uppercase">≈ ACTIVITIES</h3>
                                        <span className="text-sm font-bold text-gray-500">2 Included</span>
                                    </div>

                                    <div className="space-y-3">
                                        {MOCK_ACTIVITIES.map((activity, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 hover:bg-purple-50/50 rounded-xl transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-purple-600">
                                                        {activity.icon === 'water' ? <span className="font-bold text-xl">≈</span> : <span className="font-bold text-xl">🌴</span>}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-lg">{activity.title}</div>
                                                        <div className="text-sm text-gray-500 font-medium">{activity.duration}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right flex flex-col items-end">
                                                    <div className="text-purple-600 font-black text-xl mb-1 flex items-baseline gap-1">
                                                        €{activity.price} <span className="text-sm font-semibold">pp</span>
                                                    </div>
                                                    <div className="text-sm font-bold text-gray-600 flex items-center hover:text-purple-600 transition-colors">
                                                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* How to Reach Section */}
                                <div>
                                    <div className="flex justify-between items-center mb-4 px-2">
                                        <h3 className="text-lg font-black tracking-wide text-gray-900 uppercase flex items-center gap-2">
                                            <Car className="w-5 h-5" /> HOW TO REACH
                                        </h3>
                                        <span className="text-sm font-bold text-gray-500 italic">Estimates shown</span>
                                    </div>

                                    <div className="space-y-3">
                                        {MOCK_TRANSIT.map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 hover:bg-purple-50/50 rounded-xl transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center text-blue-500">
                                                        {item.type === 'car' ? <Car className="w-5 h-5" /> : <Bus className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900 text-lg">{item.title}</div>
                                                        <div className="text-sm text-gray-500 font-medium">{item.duration}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right flex flex-col items-end">
                                                    <div className="text-purple-600 font-black text-xl mb-1">
                                                        €{item.price.toFixed(item.type === 'bus' ? 2 : 0)}
                                                    </div>
                                                    <div className="text-sm font-bold text-gray-600 flex items-center hover:text-purple-600 transition-colors">
                                                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};

export default CreateTrip;
