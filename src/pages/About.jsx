import { Users, Award, Globe, Heart } from 'lucide-react';
import Card from '../components/common/Card';
import CardContent from '../components/common/CardContent';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '50K+', color: 'text-blue-600' },
    { icon: Globe, label: 'Destinations', value: '500+', color: 'text-green-600' },
    { icon: Award, label: 'Years of Experience', value: '10+', color: 'text-yellow-600' },
    { icon: Heart, label: 'Customer Satisfaction', value: '98%', color: 'text-red-600' },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/images/team/sarah.jpg',
      bio: 'Former travel journalist with 15+ years in the industry.'
    },
    {
      name: 'Mike Chen',
      role: 'Head of Operations',
      image: '/images/team/mike.jpg',
      bio: 'Expert in logistics and customer experience management.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Travel Curator',
      image: '/images/team/emma.jpg',
      bio: 'Cultural anthropologist specializing in authentic experiences.'
    },
    {
      name: 'David Kim',
      role: 'Tech Lead',
      image: '/images/team/david.jpg',
      bio: 'Full-stack developer passionate about travel technology.'
    },
  ];

  return (
    <div className="section-padding">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About WonderTrip
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about connecting travelers with extraordinary destinations and authentic experiences.
            Our mission is to make travel accessible, memorable, and sustainable for everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-display font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-display font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2014, WonderTrip began as a small travel blog sharing authentic experiences
                from around the world. What started as a passion project quickly grew into a mission
                to revolutionize how people discover and book travel experiences.
              </p>
              <p>
                Today, we're proud to have helped over 50,000 travelers create unforgettable memories
                across 500+ destinations. Our platform combines cutting-edge technology with human
                expertise to deliver personalized travel recommendations and seamless booking experiences.
              </p>
              <p>
                We believe that travel should be accessible to everyone, which is why we work tirelessly
                to provide transparent pricing, exceptional customer service, and sustainable travel options.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700 mb-6">
              To inspire and empower travelers to explore the world responsibly,
              create meaningful connections, and broaden their perspectives through authentic experiences.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To become the world's most trusted travel platform, making every journey
              extraordinary and every destination accessible.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Authenticity</h3>
                <p className="text-gray-600">
                  We believe in real experiences, genuine connections, and honest recommendations
                  that go beyond tourist traps.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  We're committed to responsible travel that respects local communities,
                  preserves natural environments, and supports sustainable practices.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  We strive for perfection in everything we do, from customer service
                  to platform reliability to the quality of our recommendations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-display font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index}>
                <CardContent className="text-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
