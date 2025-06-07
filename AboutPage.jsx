import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Award,
  Shield,
  Anchor,
  MapPin,
  Calendar,
  Users,
  Heart,
  Compass,
  Globe,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import companyStory from '../assets/images/company-story.jpg';
import heroYacht from '../assets/images/hero-yacht.jpg';
import cesmeMarina from '../assets/images/cesme-marina.jpg';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Your safety is our top priority. We maintain the highest safety standards with certified crew, regular maintenance, and comprehensive insurance coverage.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from our pristine yacht to our professional crew and personalized guest experiences.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for the sea and Turkish coastline drives us to share these incredible experiences with guests from around the world.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to protecting the beautiful waters we sail, implementing eco-friendly practices and supporting local communities.'
    }
  ];

  const achievements = [
    {
      number: '2018',
      label: 'Founded',
      description: 'TSmart Voyage established in Çeşme'
    },
    {
      number: '500+',
      label: 'Happy Guests',
      description: 'Satisfied customers from 25+ countries'
    },
    {
      number: '4.9/5',
      label: 'Rating',
      description: 'Average customer satisfaction score'
    },
    {
      number: '100%',
      label: 'Safety Record',
      description: 'Zero incidents in our operational history'
    }
  ];

  const certifications = [
    'Turkish Maritime Authority Licensed',
    'International Safety Management Certified',
    'Tourism Ministry Approved',
    'Marine Insurance Comprehensive Coverage',
    'STCW Certified Crew',
    'Environmental Compliance Certified'
  ];

  const timeline = [
    {
      year: '2018',
      title: 'Company Founded in UAE',
      description: 'TSmart Voyage was established in Dubai, UAE with a vision to provide luxury yacht charter experiences in the Turkish Aegean.'
    },
    {
      year: '2019',
      title: 'Aquela 42 Acquired',
      description: 'We acquired our flagship Aquela 42 power catamaran and began operations from Çeşme Marina, Turkey.'
    },
    {
      year: '2020',
      title: 'Service Expansion',
      description: 'Expanded services to include VIP transfers, luxury accommodation partnerships, and cultural tours. Introduced USD and AED payment options.'
    },
    {
      year: '2021',
      title: 'International Recognition',
      description: 'Received tourism excellence awards and expanded our international guest base from UAE and GCC countries.'
    },
    {
      year: '2022',
      title: 'Digital Innovation',
      description: 'Launched online booking platform and virtual tour experiences for enhanced customer service across UAE and international markets.'
    },
    {
      year: '2024',
      title: 'Continued Growth',
      description: 'Celebrating 6 years of excellence as a UAE company with plans for fleet expansion and new destinations in the region.'
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
            <span className="text-navy-deep font-medium">About Us</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section 
        padding="xl" 
        background="gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url(${heroYacht})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              About TSmart Voyage
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Crafting unforgettable luxury yacht experiences in the pristine waters of the Turkish Aegean since 2018
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-gold-luxury" />
                <span>Award Winning Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-sustainable" />
                <span>100% Safety Record</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-gold-luxury" />
                <span>4.9/5 Guest Rating</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Company Story */}
      <Section padding="xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  TSmart Voyage is a UAE-based luxury yacht charter company that was born from a passion for the sea and a deep love for the stunning Turkish coastline. 
                  Founded in 2018 and headquartered in Dubai, UAE, our maritime enthusiasts recognized the untapped potential of luxury yacht charters 
                  in the Aegean region and set out to create something truly special.
                </p>
                <p>
                  Operating from the charming coastal town of Çeşme, Turkey, we have intimate knowledge of the hidden gems, 
                  secluded bays, and cultural treasures that make this region so extraordinary. As a UAE company, we bring international 
                  standards of service and professionalism to the Turkish yacht charter industry, serving discerning travelers who appreciate luxury, authenticity, and adventure.
                </p>
                <p>
                  What started as a dream has grown into a respected name in luxury yacht charters, 
                  serving guests from around the world while maintaining our commitment to personalized service, 
                  safety excellence, and environmental responsibility. We accept payments in both USD and AED currencies for the convenience of our international clientele.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-turquoise-ocean" />
                  <span className="text-sm font-medium">Dubai, UAE</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-turquoise-ocean" />
                  <span className="text-sm font-medium">Operations: Çeşme, Turkey</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-navy-deep" />
                  <span className="text-sm font-medium">Since 2018</span>
                </div>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <img 
                  src={companyStory} 
                  alt="TSmart Voyage Founders"
                  className="w-full h-96 object-cover"
                />
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Achievements */}
      <Section padding="lg" background="gray">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Six years of excellence in luxury yacht charter services
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="font-playfair text-4xl md:text-5xl font-bold text-navy-deep mb-2">
                  {achievement.number}
                </div>
                <div className="font-semibold text-gold-luxury mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-gray-600">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our Values */}
      <Section padding="xl">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at TSmart Voyage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-deep/10 rounded-full mb-6">
                  <value.icon className="w-8 h-8 text-navy-deep" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones in our commitment to luxury yacht charter excellence
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-navy-deep/20 hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <Card className="p-6">
                      <div className="font-playfair text-2xl font-bold text-gold-luxury mb-2">
                        {item.year}
                      </div>
                      <h3 className="font-semibold text-navy-deep mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="hidden md:flex items-center justify-center w-4 h-4 bg-navy-deep rounded-full border-4 border-white shadow-lg z-10">
                  </div>
                  
                  <div className="w-full md:w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Certifications */}
      <Section padding="lg">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fully licensed and certified for your peace of mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-sustainable flex-shrink-0" />
                <span className="text-gray-700 font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="text-center text-white mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Why Choose TSmart Voyage?
            </h2>
            <p className="text-xl max-w-2xl mx-auto">
              Experience the difference that passion, expertise, and attention to detail make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Compass className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Local Expertise</h3>
              <p className="text-white/80">
                Born and raised in Çeşme, we know every hidden bay, local restaurant, and cultural treasure along the coast.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Users className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Personalized Service</h3>
              <p className="text-white/80">
                Every charter is tailored to your preferences, ensuring a unique and unforgettable experience.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Shield className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Safety Excellence</h3>
              <p className="text-white/80">
                Our perfect safety record and certified crew ensure your peace of mind throughout your voyage.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section padding="lg">
        <Container>
          <div className="text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Ready to Experience TSmart Voyage?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied guests who have discovered the magic of the Turkish Aegean with us
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/booking">
                <Button size="lg" variant="gold" className="w-full sm:w-auto">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Charter
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AboutPage;

