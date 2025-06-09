import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Star, 
  Users, 
  Shield, 
  Award, 
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Anchor,
  Car,
  Crown,
  Utensils
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';
import { LoadingSpinner } from '../components/Loading';

// Assets
// Ensure hero-yacht.jpg and cesme-marina.jpg are in public/assets/images/
const heroYacht = '/assets/images/hero-yacht.jpg';
const cesmeMarina = '/assets/images/cesme-marina.jpg';

const HomePage = () => {
  const [currentPrice, setCurrentPrice] = useState(1850);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Simulate dynamic pricing
  useEffect(() => {
    const interval = setInterval(() => {
      const basePrice = 1850;
      const variation = Math.floor(Math.random() * 200) - 100;
      setCurrentPrice(basePrice + variation);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: Anchor,
      title: "Aquela 42 Power Catamaran Charter",
      description: "Luxury power catamaran with premium amenities and professional crew",
      price: "€1,850",
      period: "per day"
    },
    {
      icon: Car,
      title: "VIP Mercedes Transfer",
      description: "Premium transportation with professional driver service",
      price: "€150",
      period: "per transfer"
    },
    {
      icon: Crown,
      title: "Professional Crew",
      description: "Experienced captain and multilingual hostess service",
      price: "€300",
      period: "per day"
    },
    {
      icon: Utensils,
      title: "Gourmet Dining",
      description: "Exquisite cuisine with local specialties and premium beverages",
      price: "Included",
      period: "in packages"
    },
    {
      icon: MapPin,
      title: "Turkish Blue Tour - Cesme",
      description: "Discover hidden bays, crystal waters, and historic Cesme coastline",
      price: "€250",
      period: "per person"
    }
  ];

  const packages = [
    {
      name: "Essential Experience",
      price: "€2,000",
      period: "per day",
      features: [
        "Mercedes Vito Transfer",
        "Catamaran Charter (Day)",
        "Professional Crew",
        "Basic Refreshments",
        "Safety Equipment"
      ],
      popular: false
    },
    {
      name: "Luxury Escape",
      price: "€2,350",
      period: "per day + accommodation",
      features: [
        "All Essential features",
        "Surge Hotel Alaçatı (1 night)",
        "Hotel Breakfast",
        "Gourmet Lunch",
        "Concierge Service"
      ],
      popular: true
    },
    {
      name: "VIP Complete",
      price: "€2,650",
      period: "per day + accommodation",
      features: [
        "All Luxury features",
        "Professional Hostess (8h)",
        "Photography Service",
        "Personal Concierge",
        "Premium Beverages"
      ],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "Absolutely incredible experience! The Aquela 42 exceeded all expectations. Professional crew, stunning views, and impeccable service.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Marco Rossi",
      location: "Milan, Italy",
      rating: 5,
      text: "Perfect for our corporate retreat. The team handled everything seamlessly. Cesme Marina is a hidden gem!",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emma Schmidt",
      location: "Berlin, Germany",
      rating: 5,
      text: "Our honeymoon was magical thanks to TSmart Voyage. Every detail was perfect, from the yacht to the accommodation.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <Section padding="none" className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroYacht})` }}
        >
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Hero Content */}
        <Container className="relative z-10 text-white">
          <div className="max-w-4xl mx-auto text-center space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Luxury Yacht Charter
                <span className="block text-gold-luxury">Experience</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Discover the ultimate luxury with our premium Aquela 42 catamaran 
                and VIP services from Cesme Marina, Turkey
              </p>
            </div>

            {/* Dynamic Pricing Preview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-white/20">
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-300">Starting from</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-3xl font-bold text-gold-luxury">€{currentPrice.toLocaleString()}</span>
                  <span className="text-sm text-gray-300">per day</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-xs text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Live pricing • Available now</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/booking">
                <Button size="xl" variant="gold" className="w-full sm:w-auto">
                  Book Your Voyage
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a
                href="https://www.youtube.com/watch?v=gHuCNvUyMw8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-white hover:text-gold-luxury transition-colors"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span className="font-medium">Watch Virtual Tour</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Safety Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-gold-luxury" />
                <span>5-Star Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </Container>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </Section>

      {/* Services Showcase */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-navy-deep">
              Premium Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience luxury at every step with our comprehensive yacht charter 
              and VIP service offerings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} variant="luxury" className="text-center group">
                <Card.Content className="space-y-4">
                  <div className="w-16 h-16 gradient-navy-gold rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-xl font-semibold text-navy-deep mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="text-center">
                      <span className="text-2xl font-bold text-navy-deep">{service.price}</span>
                      <span className="text-sm text-gray-500 ml-1">{service.period}</span>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Package Pricing */}
      <Section padding="lg">
        <Container>
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-navy-deep">
              Luxury Packages
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully curated packages designed to provide 
              the ultimate yacht charter experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                variant={pkg.popular ? "featured" : "default"}
                className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gold-luxury text-navy-deep px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <Card.Header className="text-center">
                  <h3 className="font-playfair text-2xl font-bold text-navy-deep mb-2">
                    {pkg.name}
                  </h3>
                  <div className="space-y-1">
                    <span className="text-3xl font-bold text-navy-deep">{pkg.price}</span>
                    <p className="text-sm text-gray-500">{pkg.period}</p>
                  </div>
                </Card.Header>

                <Card.Content>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>

                <Card.Footer>
                  <Link to="/booking" className="w-full">
                    <Button 
                      variant={pkg.popular ? "gold" : "primary"} 
                      className="w-full"
                    >
                      Select Package
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-playfair text-3xl md:text-5xl font-bold text-navy-deep">
              Guest Experiences
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover why our guests choose TSmart Voyage for their luxury yacht experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="luxury" className="text-center">
                <Card.Content className="space-y-6">
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-luxury text-gold-luxury" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 italic leading-relaxed">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-navy-deep">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="navy" padding="lg">
        <Container>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white">
                Ready for Your Luxury Adventure?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Book your premium yacht charter experience today and create unforgettable memories 
                in the beautiful waters of Cesme, Turkey
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/booking">
                <Button size="xl" variant="gold">
                  Book Now
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="xl" variant="secondary">
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Cesme Marina, Turkey</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Up to 12 guests</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;

