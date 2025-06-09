import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Clock,
  Camera,
  Coffee,
  ShoppingBag,
  Utensils,
  Play,
  Calendar,
  Phone,
  Mail,
  Wind,
  Home,
  Palette,
  Heart
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import alacatiWindmills from '../assets/images/alacati-windmills.jpg';
// Note: Video will be hosted externally due to size constraints
const alacatiVideoUrl = 'https://www.youtube.com/watch?v=example'; // Placeholder for external hosting

const AlacatiPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const highlights = [
    {
      icon: Home,
      title: 'Historic Stone Houses',
      description: 'Beautifully preserved 19th-century Greek architecture with colorful shutters and flower-filled courtyards'
    },
    {
      icon: Wind,
      title: 'Iconic Windmills',
      description: 'Seven historic stone windmills offering panoramic views of the Aegean Sea and surrounding countryside'
    },
    {
      icon: ShoppingBag,
      title: 'Boutique Shopping',
      description: 'Unique local crafts, handmade jewelry, vintage finds, and designer boutiques in charming stone buildings'
    },
    {
      icon: Utensils,
      title: 'Culinary Excellence',
      description: 'Award-winning restaurants serving modern Turkish cuisine, fresh seafood, and international flavors'
    },
    {
      icon: Palette,
      title: 'Art & Culture',
      description: 'Vibrant art galleries, cultural events, and traditional crafts workshops throughout the historic center'
    },
    {
      icon: Camera,
      title: 'Instagram Paradise',
      description: 'Picture-perfect streets, colorful doors, bougainvillea-covered walls, and stunning sunset viewpoints'
    }
  ];

  const experiences = [
    {
      title: 'Historic Walking Tour',
      duration: '2-3 hours',
      description: 'Explore cobblestone streets, visit traditional houses, and learn about Greek and Turkish heritage'
    },
    {
      title: 'Windmill Sunset',
      duration: '1 hour',
      description: 'Watch the spectacular sunset from the historic windmills with panoramic Aegean Sea views'
    },
    {
      title: 'Culinary Journey',
      duration: '3-4 hours',
      description: 'Food tour featuring local specialties, wine tasting, and visits to traditional markets'
    },
    {
      title: 'Art Gallery Hopping',
      duration: '2 hours',
      description: 'Discover local artists, contemporary galleries, and traditional craft workshops'
    },
    {
      title: 'Shopping Experience',
      duration: '2-3 hours',
      description: 'Browse unique boutiques, antique shops, and local artisan stores for one-of-a-kind finds'
    },
    {
      title: 'Photography Tour',
      duration: '3 hours',
      description: 'Capture the most photogenic spots with a local photographer guide'
    }
  ];

  const restaurants = [
    {
      name: 'Asma Yaprağı',
      cuisine: 'Modern Turkish',
      specialty: 'Innovative Aegean cuisine with local ingredients'
    },
    {
      name: 'Roka',
      cuisine: 'Mediterranean',
      specialty: 'Fresh seafood and traditional mezes'
    },
    {
      name: 'Fava',
      cuisine: 'Contemporary',
      specialty: 'Creative dishes with stunning windmill views'
    },
    {
      name: 'Köşe Kahve',
      cuisine: 'Cafe & Breakfast',
      specialty: 'Traditional Turkish breakfast and specialty coffee'
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
            <Link to="/cesme-marina" className="hover:text-navy-deep transition-colors">Çeşme Marina</Link>
            <span>/</span>
            <span className="text-navy-deep font-medium">Alaçatı</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section 
        padding="xl" 
        background="gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url(${alacatiWindmills})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Discover Alaçatı
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              A charming historic town just 8km from Çeşme Marina, famous for its stone windmills, 
              boutique hotels, and vibrant cultural scene
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-gold-luxury" />
                <span>UNESCO Heritage Candidate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Most Romantic Town</span>
              </div>
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-turquoise-ocean" />
                <span>Instagram Paradise</span>
              </div>
            </div>
            
            {/* Video CTA */}
            <a
              href={alacatiVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-white/20 hover:bg-white/30 px-8 py-4 rounded-full transition-colors"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-medium text-lg">Watch Alaçatı Tour</span>
            </a>
          </div>
        </Container>
      </Section>

      {/* About Alaçatı */}
      <Section padding="xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep">
                The Jewel of the Aegean Coast
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Alaçatı is a picturesque town that perfectly captures the essence of Aegean charm. 
                  Once a quiet Greek fishing village, it has transformed into one of Turkey's most 
                  beloved destinations while preserving its authentic character and architectural heritage.
                </p>
                <p>
                  The town is famous for its well-preserved stone houses with colorful shutters, 
                  narrow cobblestone streets lined with bougainvillea, and the iconic windmills 
                  that have become symbols of the region. Every corner offers a perfect photo opportunity.
                </p>
                <p>
                  Today, Alaçatı is renowned for its sophisticated dining scene, boutique shopping, 
                  art galleries, and vibrant nightlife, making it the perfect complement to your 
                  luxury yacht charter experience from nearby Çeşme Marina.
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-navy-deep">8km</div>
                  <div className="text-sm text-gray-600">from Marina</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-navy-deep">19th</div>
                  <div className="text-sm text-gray-600">Century</div>
                </div>
                <div className="text-center">
                  <div className="font-playfair text-2xl font-bold text-navy-deep">7</div>
                  <div className="text-sm text-gray-600">Windmills</div>
                </div>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <img 
                  src={alacatiWindmills} 
                  alt="Alaçatı Windmills"
                  className="w-full h-96 object-cover"
                />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* What Makes Alaçatı Special */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              What Makes Alaçatı Special
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the unique charm and attractions that make this historic town unforgettable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-deep/10 rounded-full mb-6">
                  <highlight.icon className="w-8 h-8 text-navy-deep" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {highlight.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Experiences */}
      <Section padding="xl">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Alaçatı Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated activities and tours to help you discover the best of this charming town
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-navy-deep">{experience.title}</h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {experience.duration}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{experience.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Dining */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Culinary Delights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alaçatı's renowned restaurants offer exceptional dining experiences in historic settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {restaurants.map((restaurant, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gold-luxury/10 rounded-full flex items-center justify-center">
                      <Utensils className="w-6 h-6 text-gold-luxury" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-navy-deep">{restaurant.name}</h3>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {restaurant.cuisine}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{restaurant.specialty}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Include Alaçatı in Your Charter
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Let TSmart Voyage arrange your visit to this enchanting town as part of your luxury yacht charter experience
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" variant="gold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Charter
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-deep">
                  <Phone className="w-5 h-5 mr-2" />
                  Plan Your Visit
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AlacatiPage;

