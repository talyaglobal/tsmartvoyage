import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Anchor,
  Star,
  Clock,
  Wifi,
  Car,
  Coffee,
  Shield,
  Play,
  Calendar,
  Phone,
  Mail,
  Navigation,
  Waves,
  Sun,
  Camera
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import cesmeMarina from '../assets/images/cesme-marina.jpg';
// Note: Video will be hosted externally due to size constraints
const cesmeVideoUrl = 'https://example.com/cesme-marina-4k.mp4'; // Placeholder for external hosting

const CesmeMarinaPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const facilities = [
    {
      icon: Anchor,
      title: 'Premium Berths',
      description: 'Modern floating docks with water and electricity connections'
    },
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Professional security team and CCTV surveillance system'
    },
    {
      icon: Wifi,
      title: 'Free WiFi',
      description: 'High-speed internet access throughout the marina'
    },
    {
      icon: Car,
      title: 'Parking',
      description: 'Secure parking facilities for guests and yacht owners'
    },
    {
      icon: Coffee,
      title: 'Restaurants & Cafes',
      description: 'Waterfront dining with Turkish and international cuisine'
    },
    {
      icon: Navigation,
      title: 'Fuel Station',
      description: 'Marine fuel and provisions available on-site'
    }
  ];

  const highlights = [
    {
      icon: Waves,
      title: 'Crystal Clear Waters',
      description: 'Pristine Aegean Sea with excellent water quality and visibility'
    },
    {
      icon: Sun,
      title: 'Perfect Climate',
      description: '300+ sunny days per year with ideal sailing conditions'
    },
    {
      icon: Camera,
      title: 'Scenic Beauty',
      description: 'Stunning coastal views and picturesque Turkish architecture'
    },
    {
      icon: Star,
      title: 'Award Winning',
      description: 'Recognized as one of Turkey\'s premier marina destinations'
    }
  ];

  const nearbyAttractions = [
    {
      name: 'Alaçatı Old Town',
      distance: '8 km',
      description: 'Historic stone houses, boutique shops, and traditional restaurants'
    },
    {
      name: 'Ilıca Beach',
      distance: '5 km',
      description: 'Famous thermal springs and pristine sandy beaches'
    },
    {
      name: 'Çeşme Castle',
      distance: '2 km',
      description: '16th-century Ottoman fortress with panoramic views'
    },
    {
      name: 'Windmills of Alaçatı',
      distance: '10 km',
      description: 'Iconic stone windmills and Instagram-worthy landscapes'
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <Section padding="sm" background="gray">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-navy-deep transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy-deep font-medium">Çeşme Marina</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section 
        padding="xl" 
        background="gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url(${cesmeMarina})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Çeşme Marina
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Turkey's premier marina destination on the stunning Aegean coast, home to TSmart Voyage luxury yacht charters
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-gold-luxury" />
                <span>5-Star Marina</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-sustainable" />
                <span>Blue Flag Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Anchor className="w-5 h-5 text-turquoise-ocean" />
                <span>400+ Berths</span>
              </div>
            </div>
            
            {/* Video CTA */}
            <a
              href="https://www.youtube.com/watch?v=example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-8 py-4 rounded-full transition-colors"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-medium text-lg">Watch Marina Tour (4K)</span>
            </a>
          </div>
        </Container>
      </Section>

      {/* Marina Overview */}
      <Section padding="xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep">
                Turkey's Gateway to the Aegean
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Çeşme Marina stands as one of Turkey's most prestigious marina destinations, 
                  perfectly positioned on the Aegean coast just 85 kilometers from İzmir. 
                  This world-class facility serves as the home base for TSmart Voyage's luxury yacht charter operations.
                </p>
                <p>
                  With its modern infrastructure, comprehensive services, and stunning natural setting, 
                  Çeşme Marina offers the perfect starting point for your luxury yacht adventure. 
                  The marina combines Turkish hospitality with international standards, creating an exceptional experience for discerning travelers.
                </p>
                <p>
                  From here, explore the pristine waters of the Aegean Sea, discover hidden coves, 
                  visit charming Greek islands, and experience the rich cultural heritage of the Turkish coast.
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-navy-deep">400+</div>
                  <div className="text-sm text-gray-600">Berths</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-navy-deep">85km</div>
                  <div className="text-sm text-gray-600">from İzmir</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-navy-deep">24/7</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <img 
                  src={cesmeMarina} 
                  alt="Çeşme Marina"
                  className="w-full h-96 object-cover"
                />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Marina Facilities */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              World-Class Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a comfortable and luxurious marina experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <Card key={index} className="text-center p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-deep/10 rounded-full mb-6">
                  <facility.icon className="w-8 h-8 text-navy-deep" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                  {facility.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {facility.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Çeşme */}
      <Section padding="xl">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Why Choose Çeşme Marina?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes this destination special for luxury yacht charters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-turquoise-ocean/10 rounded-full mb-6">
                  <highlight.icon className="w-8 h-8 text-turquoise-ocean" />
                </div>
                <h3 className="font-playfair text-lg font-bold text-navy-deep mb-3">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Nearby Attractions */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Nearby Attractions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore the cultural and natural treasures around Çeşme Marina
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nearbyAttractions.map((attraction, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gold-luxury/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gold-luxury" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-navy-deep">{attraction.name}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {attraction.distance}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{attraction.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact & Location */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="text-center text-white mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Visit Çeşme Marina
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Plan your luxury yacht charter adventure from Turkey's premier marina destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <MapPin className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Location</h3>
              <p className="text-white/80">
                Çeşme Marina<br />
                İzmir, Turkey<br />
                85km from İzmir Airport
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Clock className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Operating Hours</h3>
              <p className="text-white/80">
                Marina Services: 24/7<br />
                Office Hours: 08:00 - 20:00<br />
                Summer Season: Extended Hours
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Phone className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Contact TSmart Voyage</h3>
              <p className="text-white/80">
                Captain Mr. Umit<br />
                +90 507 184 13 93<br />
                Host Ms. Merve<br />
                +90 555 868 16 34
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/booking">
              <Button size="lg" variant="gold" className="mr-4">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Charter
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-deep">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default CesmeMarinaPage;

