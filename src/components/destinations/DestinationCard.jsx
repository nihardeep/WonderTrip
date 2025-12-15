import { Link } from 'react-router-dom';
import { MapPin, Star, Clock } from 'lucide-react';
import Card from '../common/Card';
import CardContent from '../common/CardContent';
import Button from '../common/Button';

const DestinationCard = ({ destination }) => {
  return (
    <Card hover className="overflow-hidden">
      <div className="relative">
        {/* Destination Image */}
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {/* Placeholder for actual image - in production, use actual images */}
          <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
            <MapPin className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1 shadow-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-semibold">{destination.rating}</span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
          {destination.category}
        </div>
      </div>

      <CardContent>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {destination.name}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {destination.location}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {destination.duration}
          </div>
          <div className="text-sm text-gray-600">
            {destination.reviews} reviews
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">
              ${destination.price}
            </span>
            <span className="text-gray-600 text-sm"> / person</span>
          </div>
          <Link to={`/destinations/${destination.id}`}>
            <Button size="sm">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
