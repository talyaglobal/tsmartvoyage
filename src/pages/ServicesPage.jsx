import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car,
  Crown,
  Utensils,
  Home,
  Star,
  Clock,
  Shield,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Calendar
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import vipTransfer from '../assets/images/vip-transfer.jpg';
import yachtInterior from '../assets/images/yacht-interior.jpg';
import cesmeMarina from '../assets/images/cesme-marina.jpg';

const ServicesPage = () => {
  const services = [
    {
      id: 'yacht-charter',
      icon: Crown,
      title: 'Luxury Yacht Charter',
      subtitle: 'Aquela 42 Catamaran',
      description: 'Experience the ultimate luxury with our premium 42-foot catamaran featuring spacious accommodations, modern amenities, and professional crew.',
      image: yachtInterior,
      price: '€1,850',
      period: 'per day',
      features: [
        'Professional captain and crew',
        'Spacious salon and deck areas',
        'Premium safety equipment',
        'Navigation and communication systems',
        'Comfortable seating for 12 guests',
        'Fresh water and bathroom facilities'
      ],
      highlights: [
        'Maritime safety certified',
        '5-star guest rating',
        'Professional crew included',
        'Full insurance coverage'
      ]
    },
    {
      id: 'vip-transfer',
      icon: Car,
      title: 'VIP Transfer Service',
      subtitle: 'Mercedes Vito Fleet',
      description: 'Premium transportation service with luxury Mercedes Vito vehicles and professional drivers for seamless transfers.',
      image: vipTransfer,
      price: '€150',
      period: 'per transfer',
      features: [
        'Luxury Mercedes Vito vehicles',
        'Professional licensed drivers',
        'Airport and hotel pickups',
        'Real-time flight tracking',
        'Complimentary refreshments',
        'Child seats available'
      ],
      highlights: [
        'Premium vehicle fleet',
        'Experienced drivers',
        'Punctual service',
        'Comfortable seating'
      ]
    },
    {
      id: 'crew-service',
      icon: Users,
      title: 'Professional Crew',
      subtitle: 'Captain & Hostess',
      description: 'Experienced maritime professionals providing exceptional service, local expertise, and ensuring your safety and comfort.',
      image: cesmeMarina,
      price: '€300',
      period: 'per day',
      features: [
        'Licensed professional captain',
        'Multilingual hostess service',
        'Local area expertise',
        'Safety briefing and guidance',
        'Photography assistance',
        'Personalized service'
      ],
      highlights: [
        'Maritime certified',
        'Local expertise',
        'Multilingual service',
        'Safety trained'
      ]
    },
    {
      id: 'accommodation',
      icon: Home,
      title: 'Luxury Accommodation',
      subtitle: 'Surga Alaçatı Boutique Hotel',
      description: 'Premium boutique hotel partnership offering luxury accommodations in the heart of Alaçatı with authentic Turkish hospitality and modern amenities.',
      image: cesmeMarina,
      price: '€350',
      period: 'per night',
      features: [
        'Sea view suites available',
        'Premium hotel amenities',
        'Spa and wellness facilities',
        'Authentic Aegean cuisine',
        'Concierge services',
        'Transfer coordination'
      ],
      highlights: [
        'Boutique luxury hotels',
        'Sea view options',
        'Spa facilities',
        'Local cuisine'
      ]
    },
    {
      id: 'dining',
      icon: Utensils,
      title: 'Gourmet Dining',
      subtitle: 'Culinary Excellence',
      description: 'Exquisite dining experiences featuring local specialties, premium beverages, and customized menus for your preferences.',
      image: yachtInterior,
      price: 'Included',
      period: 'in packages',
      features: [
        'Professional chef service',
        'Local cuisine specialties',
        'Dietary accommodations',
        'Premium beverage selection',
        'Fresh local ingredients',
        'Customized menu options'
      ],
      highlights: [
        'Professional chef',
        'Local specialties',
        'Dietary options',
        'Premium beverages'
      ]
    }
  ];

  const additionalServices = [
    {
      title: 'Photography Service',
      description: 'Professional photography to capture your luxury yacht experience',
      price: '€200 per session'
    },
    {
      title: 'Event Planning',
      description: 'Custom event coordination for special occasions and celebrations',
      price: 'Quote on request'
    },
    {
      title: 'Spa Services',
      description: 'On-board massage and wellness treatments',
      price: '€150 per treatment'
    },
    {
      title: 'Water Sports',
      description: 'Snorkeling equipment and water activity coordination',
      price: 'Included with charter'
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
            <span className="text-navy-deep font-medium">Services</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section padding="lg">
        <Container>
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-navy-deep">
              Premium Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Experience luxury at every step with our comprehensive yacht charter and VIP service offerings. 
              From premium transportation to gourmet dining, we ensure every detail exceeds your expectations.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-gold-luxury text-gold-luxury" />
                <span className="font-medium">5-Star Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-sustainable" />
                <span>Safety Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-turquoise-ocean" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Services */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 gradient-navy-gold rounded-full flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-playfair text-3xl font-bold text-navy-deep">
                        {service.title}
                      </h2>
                      <p className="text-lg text-gray-600">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {service.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-navy-deep">{service.price}</span>
                    <span className="text-gray-500">{service.period}</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-navy-deep">Included Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-sustainable flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.map((highlight, highlightIndex) => (
                      <span 
                        key={highlightIndex}
                        className="px-3 py-1 bg-gold-luxury/10 text-navy-deep text-sm rounded-full border border-gold-luxury/20"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <Link to="/booking">
                      <Button variant="gold" className="w-full sm:w-auto">
                        Book Service
                        <Calendar className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full sm:w-auto">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                    <img 
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Additional Services */}
      <Section padding="lg">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enhance your luxury yacht experience with our premium add-on services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} variant="luxury" className="text-center">
                <Card.Content className="space-y-4">
                  <h3 className="font-playfair text-lg font-semibold text-navy-deep">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                  <p className="font-semibold text-navy-deep">
                    {service.price}
                  </p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section background="navy" padding="lg">
        <Container>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                Ready to Experience Luxury?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Contact our team to customize your perfect yacht charter experience 
                with our premium services and VIP amenities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/booking">
                <Button size="lg" variant="gold">
                  Book Your Experience
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>+90 232 XXX XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>info@tsmartvoyage.com</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Cesme Marina, Turkey</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ServicesPage;

