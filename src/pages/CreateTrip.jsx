import { useState } from 'react';
import { Search, MapPin, Heart, ChevronRight, Bus, Car, Star, Navigation, Zap, ChevronDown, Check } from 'lucide-react';
import Button from '../components/common/Button';

// Dummy Data
const MOCK_HOTELS = [
    {
        id: 1,
        name: 'The Ibiza Bay Resort',
        location: 'Talamanca, Ibiza - 2.5 km to center',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop',
        tags: ['BRAND EXCLUSIVES', 'Limited time offer'],
        rating: 4,
        score: '8.7',
        scoreText: 'Excellent',
        reviews: '86 reviews',
        locationScore: '9.0',
        priceLabel: 'Price has increased',
        priceLabelColor: 'text-red-500',
        oldPrice: '€350',
        price: '€245',
        badges: ['Boosted', 'WonderTrip Preferred'],
        snippet: '"Beautiful location, great views, and amazing service."'
    },
    {
        id: 2,
        name: 'Sol House Ibiza',
        location: 'San Antonio, Ibiza - 10.4 km to center',
        image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?q=80&w=800&auto=format&fit=crop',
        tags: ['BRAND EXCLUSIVES', 'Limited time offer'],
        rating: 4,
        score: '8.2',
        scoreText: 'Excellent',
        reviews: '458 reviews',
        locationScore: '8.7',
        priceLabel: '',
        oldPrice: '€250',
        price: '€180',
        badges: ['Boosted', 'WonderTrip Preferred'],
        snippet: '"Convenient Location, Well connected to major attractions"'
    },
    {
        id: 3,
        name: 'Hotel Pacha',
        location: 'Ibiza Town, Ibiza - 1.1 km to center',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        tags: ['Newly built in 2025'],
        rating: 5,
        score: '8.8',
        scoreText: 'Excellent',
        reviews: '132 reviews',
        locationScore: '9.3',
        priceLabel: 'ONLY 1 LEFT',
        priceLabelColor: 'text-white bg-red-600',
        oldPrice: '€400',
        price: '€320',
        badges: [],
        snippet: '"Amazing nightlife, the staff were wonderful and always helpful."'
    },
    {
        id: 4,
        name: 'Ushuaïa Beach Hotel',
        location: 'Playa d\'en Bossa, Ibiza - 4.5 km to center',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop',
        tags: ['Popular Choice'],
        rating: 5,
        score: '9.5',
        scoreText: 'Exceptional',
        reviews: '2,148 reviews',
        locationScore: '9.8',
        priceLabel: 'High Demand',
        priceLabelColor: 'text-orange-600',
        oldPrice: '€600',
        price: '€450',
        badges: ['Best Seller'],
        snippet: '"The ultimate party destination with luxury rooms."'
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

const FILTER_POPULAR = [
    'Internet access', 'TV', 'Ironing facilities', 'Heating', 'Bathtub', 'Guest rating: 9+ Exceptional', 'Swimming pool', 'Breakfast included'
];

const FILTER_PROPERTY = [
    { name: 'Apartment/Flat', count: 554 },
    { name: 'Serviced apartment', count: 33 },
    { name: 'Hotel', count: 1897 },
    { name: 'Resort', count: 16 },
    { name: 'Guesthouse/bed and breakfast', count: 52 },
    { name: 'Motel', count: 1 },
    { name: 'Hostel', count: 21 },
    { name: 'Homestay', count: 34 },
    { name: 'Inn', count: 13 }
];

const CreateTrip = () => {
    const [minPrice, setMinPrice] = useState('0');
    const [maxPrice, setMaxPrice] = useState('1,21,700');

    return (
        <div className="bg-[#f5f7fa] min-h-screen pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col lg:flex-row gap-6">

                {/* Left Sidebar (Filters + Itinerary) */}
                <aside className="w-full lg:w-1/4 flex-shrink-0 space-y-4">

                    {/* Search */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Text search"
                                className="w-full bg-[#f0f2f5] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                            />
                        </div>
                    </div>

                    {/* Budget Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 pt-5 pb-6 px-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Your budget (per night)</h3>

                        {/* Mock Slider */}
                        <div className="relative h-1 bg-gray-200 rounded-full mb-6 mx-2">
                            <div className="absolute top-0 left-0 h-1 bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                            <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"></div>
                            <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full cursor-pointer"></div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">MIN</label>
                                <div className="border border-gray-300 rounded px-2 py-1.5 flex items-center">
                                    <span className="text-sm text-gray-500 mr-1">€</span>
                                    <input type="text" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full text-sm outline-none bg-transparent" />
                                </div>
                            </div>
                            <div className="text-gray-400 mt-5">-</div>
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 block">MAX</label>
                                <div className="border border-gray-300 rounded px-2 py-1.5 flex items-center">
                                    <span className="text-sm text-gray-500 mr-1">€</span>
                                    <input type="text" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full text-sm text-right outline-none bg-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Popular Filters */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 pt-5 pb-4 px-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Popular filters for Ibiza</h3>
                        <div className="space-y-3">
                            {FILTER_POPULAR.map((filter, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 border border-gray-300 rounded sm bg-white flex items-center justify-center group-hover:border-purple-500 transition-colors">
                                        {/* Icon space for checkbox */}
                                    </div>
                                    <span className="text-sm text-gray-700">{filter}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Property Type */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 pt-5 pb-4 px-4">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm">Property type</h3>
                        <div className="space-y-3">
                            {FILTER_PROPERTY.map((prop, idx) => (
                                <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                                    <div className="w-5 h-5 border border-gray-300 rounded sm bg-white flex items-center justify-center group-hover:border-purple-500 transition-colors"></div>
                                    <span className="text-sm text-gray-700">{prop.name} <span className="text-gray-400 text-xs ml-1">({prop.count})</span></span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Quick Itinerary (Activities & Transit) */}
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-sm border border-purple-100 p-0 overflow-hidden">
                        <div className="bg-purple-600 px-4 py-3 text-white">
                            <h3 className="font-bold text-sm tracking-wide">Included in Trip View</h3>
                            <p className="text-[10px] text-purple-200 uppercase tracking-widest mt-0.5">Ibiza • 3 Nights</p>
                        </div>

                        <div className="p-4 space-y-5">
                            {/* Activities block */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                                    Must-Do Activities
                                    <span className="text-purple-600 font-semibold cursor-pointer hover:underline normal-case">Modify</span>
                                </h4>
                                <div className="space-y-2">
                                    {MOCK_ACTIVITIES.map((act, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
                                                {act.icon === 'water' ? <span className="font-bold">≈</span> : <span className="font-bold">🌴</span>}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-gray-900 text-sm truncate">{act.title}</div>
                                                <div className="text-xs text-gray-500">{act.duration}</div>
                                            </div>
                                            <div className="font-bold text-purple-600 text-sm">€{act.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Transit block */}
                            <div>
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex justify-between">
                                    Transit Options
                                    <span className="text-purple-600 font-semibold cursor-pointer hover:underline normal-case">Modify</span>
                                </h4>
                                <div className="space-y-2">
                                    {MOCK_TRANSIT.map((trans, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                                                {trans.type === 'car' ? <Car className="w-4 h-4" /> : <Bus className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="font-semibold text-gray-900 text-sm truncate">{trans.title}</div>
                                                <div className="text-xs text-gray-500">{trans.duration}</div>
                                            </div>
                                            <div className="font-bold text-blue-600 text-sm">€{trans.price.toFixed(trans.type === 'bus' ? 2 : 0)}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button variant="outline" className="w-full text-xs font-bold bg-white text-purple-700 border-purple-200 hover:bg-purple-50 mt-2 py-2">
                                View more options <ChevronRight className="w-3 h-3 ml-1 inline" />
                            </Button>
                        </div>
                    </div>

                </aside>

                {/* Right Main Content (Hotel Listings) */}
                <main className="w-full lg:w-3/4 flex flex-col gap-4">

                    {/* Header Info & Sort */}
                    <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-4 mb-2">
                        <h1 className="text-2xl font-bold text-gray-900">2,969 properties in Ibiza</h1>
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 text-gray-700 py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium text-sm">
                                <option>Sort by: Best match</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Top Reviewed</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    {/* Hotel List */}
                    <div className="space-y-4">
                        {MOCK_HOTELS.map((hotel) => (
                            <div key={hotel.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col sm:flex-row">

                                {/* Image Section */}
                                <div className="sm:w-80 h-56 sm:h-auto relative flex-shrink-0">
                                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />

                                    {/* Top banner / badges on image */}
                                    {hotel.tags[0] === 'BRAND EXCLUSIVES' ? (
                                        <div className="absolute top-0 left-0 right-0 bg-transparent">
                                            {/* We just rely on a tag above the image if needed, but in mockup Brand Exclusive is a bar *above* exactly like booking/agoda. We'll handle it inside the border padding below. For now, tag on image left: */}
                                            {/* Actually the mockup shows a dark purple bar top of the card if Brand Exclusive. We can add it outside the grid or as a top bar of the entire card! */}
                                        </div>
                                    ) : null}

                                    {/* Typical Image Badges */}
                                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center cursor-pointer shadow-sm hover:text-red-500 text-gray-400 transition-colors">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div className="absolute top-1/2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow-sm flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100">
                                        <ChevronRight className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded">
                                        1/10
                                    </div>

                                    {/* Blue "Newly Built" Tag on bottom left or top left (like Agoda mock) */}
                                    {hotel.tags.includes('Newly built in 2025') && (
                                        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs font-semibold px-3 py-1 pb-1">
                                            Newly built in 2025
                                        </div>
                                    )}
                                </div>

                                {/* Middle Section (Info) & Right Section (Pricing) */}
                                <div className="flex-1 flex flex-col sm:flex-row justify-between relative">

                                    {/* Top Brand Banner if any */}
                                    {hotel.tags.includes('BRAND EXCLUSIVES') && (
                                        <div className="absolute top-0 left-0 right-0 bg-[#59225c] text-white text-xs font-semibold px-4 py-1.5 flex items-center gap-2">
                                            <Zap className="w-3.5 h-3.5 fill-current" /> BRAND EXCLUSIVES
                                            <span className="font-normal opacity-80 text-[10px] ml-1">Limited time offer</span>
                                        </div>
                                    )}

                                    {/* Info Grid */}
                                    <div className={`flex-1 p-5 ${hotel.tags.includes('BRAND EXCLUSIVES') ? 'pt-10' : ''}`}>
                                        <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1 pr-4">{hotel.name}</h2>

                                        <div className="flex items-center text-orange-400 mb-2 gap-0.5">
                                            {[...Array(hotel.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                        </div>

                                        <div className="flex items-start text-sm text-blue-600 font-semibold mb-3 cursor-pointer hover:underline">
                                            <MapPin className="w-4 h-4 mt-0.5 mr-1 flex-shrink-0" />
                                            <span>
                                                {hotel.location.split('-')[0]}
                                                <span className="text-gray-500 font-normal"> - {hotel.location.split('-')[1]}</span>
                                            </span>
                                        </div>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {hotel.badges.map(b => (
                                                <span key={b} className="text-xs font-semibold px-2 py-0.5 border border-gray-300 text-gray-600 rounded">
                                                    {b === 'Boosted' && <span className="text-blue-500 font-bold mr-1">Boosted</span>}
                                                    {b === 'WonderTrip Preferred' && <span className="text-purple-600 mr-1">★ Preferred</span>}
                                                    {b !== 'Boosted' && b !== 'WonderTrip Preferred' && <span className="text-gray-600">{b}</span>}
                                                </span>
                                            ))}
                                            {hotel.badges.length === 0 && <span className="text-xs font-semibold px-2 py-0.5 bg-red-50 text-red-600 rounded">Booked 27 times today</span>}
                                        </div>

                                        <div className="flex items-start text-xs text-gray-600">
                                            <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-[10px] text-gray-500 mt-0.5">❝</span>
                                            <p className="italic text-gray-500">{hotel.snippet}</p>
                                        </div>
                                    </div>

                                    {/* Pricing & Rating Right Sidebar */}
                                    <div className={`sm:w-56 p-5 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col justify-between ${hotel.tags.includes('BRAND EXCLUSIVES') ? 'pt-10' : ''}`}>

                                        {/* Top: Score */}
                                        <div className="text-right mb-6">
                                            <div className="flex items-center justify-end gap-2 mb-0.5">
                                                <div className="text-right">
                                                    <div className="font-bold text-blue-700">{hotel.scoreText}</div>
                                                    <div className="text-xs text-gray-500">{hotel.reviews}</div>
                                                </div>
                                                <div className="w-9 h-9 bg-blue-700 text-white rounded-t-lg rounded-br-lg rounded-bl flex items-center justify-center font-bold text-lg">
                                                    {hotel.score}
                                                </div>
                                            </div>
                                            <div className="text-xs font-bold text-gray-700 bg-gray-100 inline-block px-2 py-0.5 rounded mt-1">
                                                {hotel.locationScore} Location score
                                            </div>
                                        </div>

                                        {/* Bottom: Price */}
                                        <div className="text-right mt-auto">
                                            {hotel.priceLabel && (
                                                <div className={`text-xs font-bold border inline-block px-2 py-0.5 rounded mb-2 ${hotel.priceLabelColor ? hotel.priceLabelColor + ' border-transparent' : 'text-red-500 border-red-200 bg-red-50'}`}>
                                                    {hotel.priceLabel.includes('Price') ? <ChevronRight className="w-3 h-3 inline transform -rotate-45" /> : null}
                                                    {hotel.priceLabel}
                                                </div>
                                            )}

                                            <div className="text-[10px] text-gray-500 mb-0.5">Per night before taxes and fees</div>

                                            <div className="flex items-baseline justify-end gap-2">
                                                <span className="text-red-500 text-lg font-bold line-through opacity-80">
                                                    {hotel.oldPrice}
                                                </span>
                                                <span className="text-2xl font-bold text-red-600">
                                                    {hotel.price}
                                                </span>
                                            </div>

                                            {hotel.priceLabelColor?.includes('bg-red') ? (
                                                <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide py-2.5 rounded shadow-sm text-sm">
                                                    Select Room
                                                </Button>
                                            ) : (
                                                <div className="bg-gray-100 border border-gray-200 mt-2 p-2 rounded text-xs text-gray-600 font-medium">
                                                    <span className="font-bold text-gray-900 text-sm">{hotel.price.replace('€', '€ ')}</span> When you <a href="/login" className="text-blue-600 hover:underline">sign in</a>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </main>

            </div>
        </div>
    );
};

export default CreateTrip;
