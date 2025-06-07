import React from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  Award,
  Shield,
  Anchor,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Users,
  Languages,
  Compass,
  LifeBuoy
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import captainMehmet from '../assets/images/captain-mehmet.jpg';
import hostessAyse from '../assets/images/hostess-ayse.jpg';
import cesmeMarina from '../assets/images/cesme-marina.jpg';

const CaptainsPage = () => {
  const crew = [
    {
      id: 'captain-mehmet',
      name: 'Captain Mehmet Özkan',
      title: 'Master Mariner',
      experience: '20+ Years',
      image: captainMehmet,
      specialties: ['Power Catamaran Operations', 'Turkish Coastline Expert', 'Safety Management', 'Guest Relations'],
      certifications: [
        'Turkish Maritime Authority License',
        'International Certificate of Competency',
        'STCW Basic Safety Training',
        'Medical First Aid Certificate'
      ],
      languages: ['Turkish', 'English', 'German'],
      description: 'Captain Mehmet brings over two decades of maritime experience to TSmart Voyage. A native of Çeşme, he has intimate knowledge of the Turkish Aegean coastline and its hidden gems. His expertise in power catamaran operations and commitment to safety ensures every voyage is both exciting and secure.',
      achievements: [
        'Zero safety incidents in 20 years',
        'Over 5,000 successful charters',
        'Certified in advanced maritime rescue',
        'Local maritime authority recognition'
      ]
    },
    {
      id: 'hostess-ayse',
      name: 'Ayşe Demir',
      title: 'Chief Hostess',
      experience: '8+ Years',
      image: hostessAyse,
      specialties: ['Guest Services', 'Culinary Coordination', 'Cultural Tours', 'Event Management'],
      certifications: [
        'Yacht Crew Certification',
        'Food Safety & Hygiene',
        'First Aid & CPR',
        'Tourism Guidance License'
      ],
      languages: ['Turkish', 'English', 'French', 'Italian'],
      description: 'Ayşe is the heart of our hospitality service, ensuring every guest feels welcomed and cared for. With her background in luxury hospitality and deep knowledge of Turkish culture, she creates unforgettable experiences while managing all onboard services with precision and warmth.',
      achievements: [
        '98% guest satisfaction rating',
        'Specialized in dietary accommodations',
        'Expert in Turkish cultural experiences',
        'Multilingual communication specialist'
      ]
    }
  ];

  const teamStats = [
    {
      icon: Calendar,
      number: '28+',
      label: 'Combined Years Experience'
    },
    {
      icon: Users,
      number: '5,000+',
      label: 'Happy Guests Served'
    },
    {
      icon: Shield,
      number: '100%',
      label: 'Safety Record'
    },
    {
      icon: Star,
      number: '4.9/5',
      label: 'Average Rating'
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
            <span className="text-navy-deep font-medium">Meet Our Captains</span>
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
              Meet Our Professional Crew
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Experience the difference that professional, certified, and passionate crew members make on your luxury yacht charter
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-sustainable" />
                <span>Fully Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-turquoise-ocean" />
                <span>Multilingual</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-gold-luxury" />
                <span>Award Winning</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Team Stats */}
      <Section padding="lg">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-deep/10 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-navy-deep" />
                </div>
                <div className="font-playfair text-3xl font-bold text-navy-deep mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Crew Profiles */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Your Professional Crew
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who will ensure your yacht charter experience exceeds all expectations
            </p>
          </div>

          <div className="space-y-16">
            {crew.map((member, index) => (
              <div key={member.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <Card className="overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-96 object-cover"
                    />
                  </Card>
                </div>
                
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div>
                    <h3 className="font-playfair text-2xl md:text-3xl font-bold text-navy-deep mb-2">
                      {member.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-lg mb-4">
                      <span className="text-gold-luxury font-semibold">{member.title}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-turquoise-ocean">{member.experience}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-navy-deep mb-3 flex items-center">
                        <Compass className="w-5 h-5 mr-2" />
                        Specialties
                      </h4>
                      <ul className="space-y-2">
                        {member.specialties.map((specialty, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-center">
                            <div className="w-2 h-2 bg-turquoise-ocean rounded-full mr-3"></div>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-navy-deep mb-3 flex items-center">
                        <Languages className="w-5 h-5 mr-2" />
                        Languages
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map((language, idx) => (
                          <span key={idx} className="px-3 py-1 bg-navy-deep/10 text-navy-deep text-sm rounded-full">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-navy-deep mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {member.achievements.map((achievement, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center">
                          <Star className="w-4 h-4 text-gold-luxury mr-3" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-navy-deep mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Certifications
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {member.certifications.map((cert, idx) => (
                        <div key={idx} className="text-sm text-gray-600 flex items-center">
                          <LifeBuoy className="w-4 h-4 text-green-sustainable mr-2" />
                          {cert}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why Choose Our Crew */}
      <Section padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Why Choose Our Professional Crew?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our crew members are not just skilled professionals—they're passionate about creating unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-deep/10 rounded-full mb-6">
                <Shield className="w-8 h-8 text-navy-deep" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                Safety First
              </h3>
              <p className="text-gray-600">
                All crew members are fully certified with current safety training, first aid certification, and extensive maritime experience.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-turquoise-ocean/10 rounded-full mb-6">
                <MapPin className="w-8 h-8 text-turquoise-ocean" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                Local Expertise
              </h3>
              <p className="text-gray-600">
                Born and raised in the region, our crew knows every hidden bay, local restaurant, and cultural treasure along the Turkish coast.
              </p>
            </Card>

            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-luxury/10 rounded-full mb-6">
                <Star className="w-8 h-8 text-gold-luxury" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                Exceptional Service
              </h3>
              <p className="text-gray-600">
                Our crew is dedicated to providing personalized, attentive service that anticipates your needs and exceeds expectations.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section padding="lg" background="navy">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Ready to Meet Our Crew?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Book your luxury yacht charter today and experience the difference our professional crew makes
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/booking">
                <Button size="lg" variant="gold" className="w-full sm:w-auto">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Charter
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-navy-deep">
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

export default CaptainsPage;

