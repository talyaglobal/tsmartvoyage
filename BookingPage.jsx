import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { 
  Calendar,
  Users,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Star,
  Crown,
  Car,
  Home,
  Utensils,
  Camera,
  Waves
} from 'lucide-react';

// Components
import Container from '../components/Container';
import Section from '../components/Section';
import Card from '../components/Card';
import Button from '../components/Button';

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('luxury-escape');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
  const [guests, setGuests] = useState(4);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    accommodation: false,
    transfer: false,
    photography: false,
    dining: 'standard'
  });

  const packages = [
    {
      id: 'essential',
      name: 'Essential Experience',
      price: 2000,
      duration: '1 day',
      popular: false,
      features: [
        'Mercedes Vito Transfer',
        'Catamaran Charter (Day)',
        'Professional Crew',
        'Basic Refreshments',
        'Safety Equipment'
      ],
      description: 'Perfect introduction to luxury yacht charter'
    },
    {
      id: 'luxury-escape',
      name: 'Luxury Escape',
      price: 2350,
      duration: '1 day + accommodation',
      popular: true,
      features: [
        'All Essential features',
        'Surge Hotel Alaçatı (1 night)',
        'Hotel Breakfast',
        'Gourmet Lunch',
        'Concierge Service'
      ],
      description: 'Complete luxury experience with accommodation'
    },
    {
      id: 'vip-complete',
      name: 'VIP Complete',
      price: 2650,
      duration: '1 day + accommodation',
      popular: false,
      features: [
        'All Luxury features',
        'Professional Hostess (8h)',
        'Photography Service',
        'Personal Concierge',
        'Premium Beverages'
      ],
      description: 'Ultimate VIP experience with premium services'
    }
  ];

  const addOns = [
    {
      id: 'extra-night',
      name: 'Extra Night Accommodation',
      price: 350,
      icon: Home,
      description: 'Additional night at Surge Hotel Alaçatı'
    },
    {
      id: 'airport-transfer',
      name: 'Airport Transfer',
      price: 150,
      icon: Car,
      description: 'Round-trip airport transportation'
    },
    {
      id: 'photography',
      name: 'Professional Photography',
      price: 200,
      icon: Camera,
      description: 'Professional photographer for 2 hours'
    },
    {
      id: 'premium-dining',
      name: 'Premium Dining Experience',
      price: 100,
      icon: Utensils,
      description: 'Upgraded gourmet menu with wine pairing'
    },
    {
      id: 'water-sports',
      name: 'Water Sports Package',
      price: 150,
      icon: Waves,
      description: 'Snorkeling gear and water activities'
    }
  ];

  const steps = [
    { id: 1, title: 'Package Selection', icon: Crown },
    { id: 2, title: 'Date & Details', icon: Calendar },
    { id: 3, title: 'Guest Information', icon: User },
    { id: 4, title: 'Payment', icon: CreditCard }
  ];

  const selectedPackageData = packages.find(pkg => pkg.id === selectedPackage);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) || 1;
  const basePrice = selectedPackageData?.price * totalDays || 0;
  const addOnPrice = 0; // Calculate based on selected add-ons
  const totalPrice = basePrice + addOnPrice;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-playfair text-3xl font-bold text-navy-deep">
                Choose Your Package
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select the perfect luxury yacht charter package for your experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card 
                  key={pkg.id}
                  variant="luxury"
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPackage === pkg.id 
                      ? 'ring-2 ring-gold-luxury border-gold-luxury' 
                      : 'hover:border-gold-luxury/50'
                  } ${pkg.popular ? 'package-card featured' : 'package-card'}`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gold-luxury text-navy-deep px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <Card.Header className="text-center">
                    <h3 className="font-playfair text-xl font-bold text-navy-deep">
                      {pkg.name}
                    </h3>
                    <p className="text-gray-600">{pkg.duration}</p>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-navy-deep">€{pkg.price}</span>
                      <span className="text-gray-500 ml-1">per day</span>
                    </div>
                  </Card.Header>

                  <Card.Content className="space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                      {pkg.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-sustainable flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card.Content>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-playfair text-3xl font-bold text-navy-deep">
                Select Dates & Details
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose your preferred dates and customize your experience
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Date Selection */}
              <Card variant="luxury">
                <Card.Header>
                  <h3 className="font-playfair text-xl font-semibold text-navy-deep flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Charter Dates
                  </h3>
                </Card.Header>
                <Card.Content className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        minDate={new Date()}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        minDate={startDate}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        dateFormat="MMMM d, yyyy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests (Max 12)
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold w-12 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(12, guests + 1))}
                        className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Add-ons */}
              <Card variant="luxury">
                <Card.Header>
                  <h3 className="font-playfair text-xl font-semibold text-navy-deep">
                    Optional Add-ons
                  </h3>
                </Card.Header>
                <Card.Content className="space-y-4">
                  {addOns.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gold-luxury/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <addon.icon className="w-5 h-5 text-navy-deep" />
                        <div>
                          <p className="font-medium text-navy-deep">{addon.name}</p>
                          <p className="text-sm text-gray-600">{addon.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-semibold text-navy-deep">€{addon.price}</span>
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-gold-luxury border-gray-300 rounded focus:ring-gold-luxury"
                        />
                      </div>
                    </div>
                  ))}
                </Card.Content>
              </Card>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-playfair text-3xl font-bold text-navy-deep">
                Guest Information
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Please provide your contact details for the booking
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <Card variant="luxury">
                <Card.Content className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                      placeholder="Any special requests or dietary requirements..."
                    />
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="font-playfair text-3xl font-bold text-navy-deep">
                Payment & Confirmation
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Review your booking details and complete your reservation
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <Card variant="luxury">
                <Card.Header>
                  <h3 className="font-playfair text-xl font-semibold text-navy-deep">
                    Booking Summary
                  </h3>
                </Card.Header>
                <Card.Content className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Package:</span>
                      <span className="font-medium">{selectedPackageData?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{totalDays} day{totalDays > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Guests:</span>
                      <span className="font-medium">{guests} guest{guests > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dates:</span>
                      <span className="font-medium">
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-navy-deep">€{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Payment Form */}
              <Card variant="luxury">
                <Card.Header>
                  <h3 className="font-playfair text-xl font-semibold text-navy-deep flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Secure Payment
                  </h3>
                </Card.Header>
                <Card.Content className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Your payment information is secured with 256-bit SSL encryption
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-deep focus:border-transparent"
                        placeholder="Name on card"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>I agree to the Terms of Service and Privacy Policy</span>
                    </label>
                    <label className="flex items-start space-x-2">
                      <input type="checkbox" className="mt-1" />
                      <span>I understand the cancellation policy</span>
                    </label>
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <Section padding="sm" background="gray">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-navy-deep transition-colors">Home</Link>
            <span>/</span>
            <span className="text-navy-deep font-medium">Booking</span>
          </div>
        </Container>
      </Section>

      {/* Progress Steps */}
      <Section padding="md" background="white">
        <Container>
          <div className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center space-x-2 ${
                  currentStep >= step.id ? 'text-navy-deep' : 'text-gray-400'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.id 
                      ? 'bg-navy-deep text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="hidden md:block font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 ${
                    currentStep > step.id ? 'bg-navy-deep' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Step Content */}
      <Section padding="lg">
        <Container>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                variant="gold"
                onClick={nextStep}
                className="flex items-center"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="gold"
                className="flex items-center"
                onClick={() => alert('Booking submitted! (Demo)')}
              >
                Complete Booking
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Container>
      </Section>

      {/* Contact Support */}
      <Section background="navy" padding="md">
        <Container>
          <div className="text-center text-white space-y-4">
            <h3 className="font-playfair text-xl font-semibold">
              Need Help with Your Booking?
            </h3>
            <p className="text-gray-300">
              Our team is available 24/7 to assist you with your luxury yacht charter reservation
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+90 232 XXX XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>booking@tsmartvoyage.com</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default BookingPage;

