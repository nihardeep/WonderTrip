import { useState } from 'react';
import { User, Settings as SettingsIcon, CreditCard, Heart, MapPin, Calendar, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';

const Settings = () => {
  const { user, logout, activeSessionId } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    country: '',
    bio: user?.bio || '', // Added bio
    avatar: null, // Added avatar file
    avatarPreview: user?.avatar || null // Preview for avatar
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file)
      }));
    }
  };



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);

    // Create FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`.trim());
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('action', 'update_profile');
    formDataToSend.append('sessionId', activeSessionId);

    if (formData.avatar) {
      formDataToSend.append('avatar', formData.avatar);
    }
    // Note: We don't send avatarPreview/Base64 anymore, only new files if selected

    try {
      console.log('Sending profile update via FormData');

      const response = await fetch('https://nds123.app.n8n.cloud/webhook/933ce8d9-e632-45dc-9144-87188d27666a', {
        method: 'POST',
        // Content-Type header must be unset for FormData
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.status === 'success') {
        alert('Profile updated successfully!'); // Simple feedback for now
        setIsEditing(false);
        // In a real app, we'd trigger a user refresh here to get the new avatar URL from backend
      } else {
        alert('Failed to update profile: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error connecting to server.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Profile Overview</h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? 'secondary' : 'primary'}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div>
                  <div className="w-full">
                    {isEditing ? (
                      <div className="space-y-4">
                        {/* Avatar Upload */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden relative">
                            {formData.avatarPreview ? (
                              <img src={formData.avatarPreview} alt="Profile Preview" className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-10 h-10 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="First Name"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                          <Input
                            label="Last Name"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                          />
                        </div>

                        {/* Bio Field */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
                          <textarea
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            rows="4"
                            placeholder="Tell us about yourself..."
                            value={formData.bio}
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                          />
                          <Input
                            label="Phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                          <Input
                            label="Address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                          />
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <Button onClick={handleSaveProfile} isLoading={isSaving}>Save Changes</Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          {/* View Mode Avatar */}
                          {user?.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                          ) : (
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xl">
                              {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : <User />}
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-semibold">{user?.name}</h3>
                            <p className="text-gray-600">{user?.email}</p>
                          </div>
                        </div>

                        {/* View Mode Bio */}
                        {user?.bio && (
                          <div className="mb-6">
                            <h4 className="font-medium mb-2">About Me</h4>
                            <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Personal Information</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-600">Phone:</span> {user?.phone || 'Not provided'}</p>
                              <p><span className="text-gray-600">Member since:</span> January 2024</p>
                              <p><span className="text-gray-600">Total bookings:</span> 3</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Travel Preferences</h4>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-gray-600">Favorite destinations:</span> Beach, Mountain</p>
                              <p><span className="text-gray-600">Travel style:</span> Adventure, Luxury</p>
                              <p><span className="text-gray-600">Group size:</span> 2-4 people</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">My Bookings</h2>

            <div className="space-y-4">
              {mockBookings.map((booking) => (
                <Card key={booking.id} hover>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-4 mb-4 md:mb-0">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{booking.destination}</h3>
                          <p className="text-gray-600">{booking.location}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="w-4 h-4 mr-1" />
                            {booking.checkIn} - {booking.checkOut}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-semibold">${booking.totalPrice}</div>
                          <div className={`text-sm px-2 py-1 rounded-full ${booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                            }`}>
                            {booking.status}
                          </div>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Favorite Destinations</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockFavorites.map((destination) => (
                <Card key={destination.id} hover>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{destination.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{destination.location}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{destination.rating}</span>
                          </div>
                          <span className="font-semibold text-primary-600">${destination.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Account Settings</h2>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2">Email notifications for bookings</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" defaultChecked />
                    <span className="ml-2">Promotional offers and deals</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-primary-600" />
                    <span className="ml-2">Travel tips and destination guides</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-red-600">Danger Zone</h3>
                <p className="text-gray-600 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="danger">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="section-padding">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="border-t border-gray-200 mt-6 pt-6">
                  <Button variant="outline" onClick={logout} className="w-full">
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
