import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Globe,
  Calendar,
  CheckCircle,
  User,
  Users,
  Building,
  Flag
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

// Assets
import contactHero from '../assets/images/contact-hero.jpg';
import officeTeam from '../assets/images/office-team.jpg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
    chartDate: '',
    guests: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email',
        chartDate: '',
        guests: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        { label: 'Captain Mr. Umit', value: '+90 507 184 13 93' },
        { label: 'Host Ms. Merve', value: '+90 555 868 16 34' }
      ],
      action: 'tel:+905071841393',
      actionText: 'Call Now'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: [
        { label: 'Instant Response', value: '24/7 Available' },
        { label: 'Quick Booking', value: 'Direct Chat' }
      ],
      action: 'https://wa.me/905071841393',
      actionText: 'Chat Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        { label: 'General Inquiries', value: 'info@tsmartvoyage.com' },
        { label: 'Bookings', value: 'booking@tsmartvoyage.com' }
      ],
      action: 'mailto:info@tsmartvoyage.com',
      actionText: 'Send Email'
    }
  ];

  const offices = [
    {
      icon: Flag,
      country: 'Turkey',
      city: 'Çeşme Marina',
      address: 'Çeşme Marina, İzmir, Turkey',
      details: [
        'Marina Operations Center',
        'Yacht Charter Services',
        'Guest Reception'
      ],
      hours: '08:00 - 20:00 (Daily)',
      coordinates: '38.3225° N, 26.3067° E'
    },
    {
      icon: Building,
      country: 'UAE',
      city: 'Dubai',
      address: 'Talya Global, Dubai Science Park Z17, Al Barsha South, Dubai UAE',
      details: [
        'Corporate Headquarters',
        'International Bookings',
        'Customer Support'
      ],
      hours: '09:00 - 18:00 (Sun-Thu)',
      coordinates: '25.1172° N, 55.1742° E'
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
            <span className="text-navy-deep font-medium">Contact</span>
          </div>
        </Container>
      </Section>

      {/* Hero Section */}
      <Section 
        padding="xl" 
        background="gradient"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 35, 126, 0.8), rgba(26, 35, 126, 0.8)), url(${contactHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Container>
          <div className="text-center text-white">
            <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
              Contact TSmart Voyage
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ready to embark on your luxury yacht charter adventure? 
              Our expert team is here to help you plan the perfect voyage.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gold-luxury" />
                <span>24/7 Support Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-turquoise-ocean" />
                <span>UAE & Turkey Offices</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5 text-green-500" />
                <span>Instant WhatsApp Response</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section padding="xl">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-navy-deep mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to contact us. We're available 24/7 to assist with your yacht charter needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center p-8 h-full">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-deep/10 rounded-full mb-6">
                  <method.icon className="w-8 h-8 text-navy-deep" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-navy-deep mb-4">
                  {method.title}
                </h3>
                <div className="space-y-2 mb-6">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="text-sm">
                      <span className="text-gray-500">{detail.label}:</span>
                      <span className="text-gray-700 font-medium ml-1">{detail.value}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Button variant="outline" size="sm" className="w-full">
                    {method.actionText}
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact Form & Team */}
      <Section padding="xl" background="gray">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-playfair text-3xl font-bold text-navy-deep mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you within 24 hours. 
                For urgent inquiries, please call or WhatsApp us directly.
              </p>

              {isSubmitted ? (
                <Card className="p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="font-playfair text-xl font-bold text-navy-deep mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting TSmart Voyage. We'll respond within 24 hours.
                  </p>
                </Card>
              ) : (
                <Card className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                          placeholder="+90 XXX XXX XX XX"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Contact Method
                        </label>
                        <select
                          name="preferredContact"
                          value={formData.preferredContact}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        >
                          <option value="email">Email</option>
                          <option value="phone">Phone</option>
                          <option value="whatsapp">WhatsApp</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Preferred Charter Date
                        </label>
                        <input
                          type="date"
                          name="chartDate"
                          value={formData.chartDate}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Guests
                        </label>
                        <select
                          name="guests"
                          value={formData.guests}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        >
                          <option value="">Select guests</option>
                          <option value="1-2">1-2 guests</option>
                          <option value="3-4">3-4 guests</option>
                          <option value="5-6">5-6 guests</option>
                          <option value="7-8">7-8 guests</option>
                          <option value="9-10">9-10 guests</option>
                          <option value="11-12">11-12 guests</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        placeholder="Charter inquiry, pricing, availability..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent resize-none"
                        placeholder="Tell us about your charter requirements, special requests, or any questions you have..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </Card>
              )}
            </div>

            {/* Team & Office Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-3xl font-bold text-navy-deep mb-6">
                  Meet Our Team
                </h2>
                <Card className="overflow-hidden">
                  <img 
                    src={officeTeam} 
                    alt="TSmart Voyage Team"
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-bold text-navy-deep mb-2">
                      Professional & Experienced
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Our international team combines Turkish maritime expertise with UAE business excellence. 
                      We're passionate about delivering exceptional yacht charter experiences and are here to 
                      assist you in multiple languages.
                    </p>
                  </div>
                </Card>
              </div>

              <div>
                <h3 className="font-playfair text-2xl font-bold text-navy-deep mb-6">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-navy-deep/10 rounded-full flex items-center justify-center">
                            <office.icon className="w-6 h-6 text-navy-deep" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-navy-deep">{office.country}</h4>
                            <span className="text-sm text-gray-500">({office.city})</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{office.address}</p>
                          <div className="space-y-1 mb-3">
                            {office.details.map((detail, idx) => (
                              <div key={idx} className="text-xs text-gray-500">• {detail}</div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{office.hours}</span>
                            <span>{office.coordinates}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Actions */}
      <Section padding="xl" background="navy">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Ready to Book Your Charter?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Don't wait - our Aquela 42 catamaran is in high demand. 
              Contact us today to secure your preferred dates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button size="lg" variant="gold">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Now
                </Button>
              </Link>
              <a href="https://wa.me/905071841393" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-deep">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </Button>
              </a>
              <a href="tel:+905071841393">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-deep">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ContactPage;

