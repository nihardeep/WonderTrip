import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Users, MapPin, Download, Mail } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';

const BookingConfirmation = () => {
  const { bookingData, resetBooking } = useBooking();

  useEffect(() => {
    // Reset booking data after showing confirmation
    const timer = setTimeout(() => {
      resetBooking();
    }, 5000);

    return () => clearTimeout(timer);
  }, [resetBooking]);

  if (!bookingData.destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Booking Found</h2>
          <p className="text-gray-600 mb-6">It seems you haven't made a booking yet.</p>
          <Link to="/destinations">
            <Button>Browse Destinations</Button>
          </Link>
        </div>
      </div>
    );
  }

  const bookingNumber = `WT-${Date.now().toString().slice(-8)}`;

  return (
    <div className="section-padding">
      <div className="container-custom max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your adventure awaits. We've sent a confirmation email with all the details.
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {bookingData.destination.name}
                  </h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    {bookingData.destination.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Booking #</div>
                  <div className="font-mono font-semibold">{bookingNumber}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Check-in</div>
                  <div className="font-medium">{bookingData.dates.checkIn}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Check-out</div>
                  <div className="font-medium">{bookingData.dates.checkOut}</div>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Guests</div>
                  <div className="font-medium">{bookingData.guests} Guest{bookingData.guests !== 1 ? 's' : ''}</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Paid</span>
                <span className="text-2xl font-bold text-primary-600">
                  ${bookingData.totalPrice}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <Mail className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium">Confirmation Email</h4>
                  <p className="text-gray-600 text-sm">
                    Check your email for a detailed itinerary and important travel information.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <Calendar className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium">Travel Documents</h4>
                  <p className="text-gray-600 text-sm">
                    We'll send you all necessary documents 7 days before your departure.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-4 mt-0.5">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium">24/7 Support</h4>
                  <p className="text-gray-600 text-sm">
                    Our travel experts are available anytime for questions or assistance.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/profile">
            <Button variant="outline">
              View My Bookings
            </Button>
          </Link>

          <Button onClick={() => window.print()}>
            <Download className="w-4 h-4 mr-2" />
            Download Confirmation
          </Button>

          <Link to="/destinations">
            <Button>
              Book Another Trip
            </Button>
          </Link>
        </div>

        {/* Contact Information */}
        <div className="text-center mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Need Help?</h4>
          <p className="text-gray-600 mb-4">
            Our team is here to help with any questions about your booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <span className="flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2 text-primary-600" />
              support@wondertrip.com
            </span>
            <span className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2 text-primary-600" />
              1-800-WONDER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
