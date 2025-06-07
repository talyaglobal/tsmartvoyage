import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  Users,
  Ruler,
  Anchor,
  Wifi,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  MapPin,
  Calendar,
  Clock,
  Zap,
  Wind,
  Droplets,
  Navigation
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import heroYacht from '../assets/images/hero-yacht.jpg';
import yachtInterior from '../assets/images/yacht-interior.jpg';
import yachtDeck from '../assets/images/yacht-deck.jpg';
import cesmeMarina from '../assets/images/cesme-marina.jpg';

const YachtPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const yachtImages = [
    { src: heroYacht, title: "Aquela 42 Exterior", description: "Stunning catamaran design" },
    { src: yachtInterior, title: "Luxury Interior", description: "Spacious salon and dining area" },
    { src: yachtDeck, title: "Premium Deck", description: "Outdoor relaxation space" },
    { src: cesmeMarina, title: "Cesme Marina", description: "Home port location" }
  ];

  const specifications = [
    { icon: Ruler, label: "Length", value: "42 feet" },
    { icon: Users, label: "Capacity", value: "12 guests" },
    { icon: Anchor, label: "Type", value: "Catamaran" },
    { icon: Wind, label: "Beam", value: "22 feet" },
    { icon: Droplets, label: "Draft", value: "3.5 feet" },
    { icon: Zap, label: "Engine", value: "Twin 40HP" }
  ];

  const features = [
    {
      category: "Comfort & Luxury",
      items: [
        "Spacious salon with panoramic windows",
        "Premium leather seating throughout",
        "Air conditioning and heating",
        "High-end sound system",
        "Luxury bedding and linens",
        "Private bathroom facilities"
      ]
    },
    {
      category: "Navigation & Safety",
      items: [
        "GPS navigation system",
        "VHF radio communication",
        "Safety equipment certified",
        "Life jackets for all guests",
        "Emergency flares and signals",
        "First aid kit and safety briefing"
      ]
    },
    {
      category: "Entertainment & Amenities",
      items: [
        "Outdoor dining area",
        "Sun loungers and cushions",
        "Snorkeling equipment",
        "Bluetooth audio system",
        "Refrigeration and ice maker",
        "Fresh water shower"
      ]
    }
  ];

  const safetyFeatures = [
    "Maritime safety certified",
    "Regular maintenance schedule",
    "Professional crew training",
    "Emergency communication equipment",
    "Weather monitoring system",
    "Insurance coverage included"
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % yachtImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + yachtImages.length) % yachtImages.length);
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <Section padding="sm" background="gray">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-navy-deep transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy-deep font-medium">Aquela 42 Power Catamaran</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section padding="lg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-navy-deep">
                  Aquela 42 Power Catamaran
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Experience luxury cruising with our premium 42-foot power catamaran, 
                  featuring spacious accommodations, modern amenities, twin engines, and 
                  professional crew service in the beautiful waters of Cesme.
                </p>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 fill-gold-luxury text-gold-luxury" />
                  <span className="font-medium">5.0 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-turquoise-ocean" />
                  <span>Cesme Marina</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-sustainable" />
                  <span>Safety Certified</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/booking">
                  <Button size="lg" variant="gold" className="w-full sm:w-auto">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Charter
                  </Button>
                </Link>
                <a 
                  href="https://www.youtube.com/watch?v=gHuCNvUyMw8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    <Play className="w-5 h-5 mr-2" />
                    Virtual Tour
                  </Button>
                </a>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src={yachtImages[currentImageIndex].src}
                  alt={yachtImages[currentImageIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-navy-deep" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-navy-deep" />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold">{yachtImages[currentImageIndex].title}</h3>
                  <p className="text-sm opacity-90">{yachtImages[currentImageIndex].description}</p>
                </div>

                {/* Image Indicators */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {yachtImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {yachtImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-gold-luxury' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Specifications */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep">
              Yacht Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technical details and specifications of our premium Aquela 42 catamaran
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specifications.map((spec, index) => (
              <Card key={index} variant="luxury" className="text-center">
                <Card.Content className="space-y-4">
                  <div className="w-12 h-12 gradient-navy-gold rounded-full flex items-center justify-center mx-auto">
                    <spec.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{spec.label}</p>
                    <p className="font-semibold text-navy-deep">{spec.value}</p>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Features & Amenities */}
      <Section padding="lg">
        <Container>
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep">
              Features & Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the luxury features and premium amenities that make your charter experience exceptional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((category, index) => (
              <Card key={index} variant="luxury">
                <Card.Header>
                  <h3 className="font-playfair text-xl font-semibold text-navy-deep">
                    {category.category}
                  </h3>
                </Card.Header>
                <Card.Content>
                  <ul className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-5 h-5 bg-green-sustainable rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card.Content>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Safety & Certification */}
      <Section background="navy" padding="lg">
        <Container>
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">
                Safety & Certification
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Your safety is our top priority. Our yacht meets all maritime safety standards 
                and is regularly inspected and maintained.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {safetyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-white">
                  <Shield className="w-5 h-5 text-green-sustainable flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/booking">
                <Button size="lg" variant="gold">
                  Book Your Charter
                  <Calendar className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  Ask Questions
                  <Navigation className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default YachtPage;

