import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Anchor, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Twitter,
  Shield,
  Award,
  Clock
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto mobile-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 gradient-ocean rounded-full flex items-center justify-center">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold">TSmart Voyage</h3>
                <p className="text-gray-300 text-sm">Luxury Charter Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Experience the ultimate luxury yacht charter with our premium Aquela 42 
              catamaran and VIP services from Cesme Marina, Turkey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-luxury hover:text-navy-deep transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-luxury hover:text-navy-deep transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-luxury hover:text-navy-deep transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-playfair text-lg font-semibold">Quick Links</h4>
            <nav className="space-y-3">
              <Link to="/yacht" className="block text-gray-300 hover:text-gold-luxury transition-colors">
                Aquela 42 Yacht
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-gold-luxury transition-colors">
                VIP Services
              </Link>
              <Link to="/booking" className="block text-gray-300 hover:text-gold-luxury transition-colors">
                Book Charter
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-gold-luxury transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-gold-luxury transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-playfair text-lg font-semibold">Our Services</h4>
            <div className="space-y-3">
              <div className="text-gray-300">
                <p className="font-medium">Luxury Yacht Charter</p>
                <p className="text-sm">Aquela 42 Catamaran</p>
              </div>
              <div className="text-gray-300">
                <p className="font-medium">VIP Transfer</p>
                <p className="text-sm">Mercedes Vito Fleet</p>
              </div>
              <div className="text-gray-300">
                <p className="font-medium">Professional Crew</p>
                <p className="text-sm">Captain & Hostess</p>
              </div>
              <div className="text-gray-300">
                <p className="font-medium">Luxury Accommodation</p>
                <p className="text-sm">Surge Hotel Alaçatı</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-playfair text-lg font-semibold">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-luxury mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">Cesme Marina</p>
                  <p className="text-sm">Izmir, Turkey</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-luxury mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">Talya Global</p>
                  <p className="text-sm">Dubai Science Park Z17</p>
                  <p className="text-sm">Al Barsha South, Dubai UAE</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-luxury flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">Captain Mr. Umit</p>
                  <p>+90 507 184 13 93</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-luxury flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium">Host Ms. Merve</p>
                  <p>+90 555 868 16 34</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-luxury flex-shrink-0" />
                <div className="text-gray-300">
                  <p>info@tsmartvoyage.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gold-luxury flex-shrink-0" />
                <div className="text-gray-300">
                  <p>24/7 Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Trust Indicators */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Shield className="w-6 h-6 text-green-sustainable" />
              <div className="text-left">
                <p className="font-medium">Safety Certified</p>
                <p className="text-sm text-gray-300">Maritime Safety Standards</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Award className="w-6 h-6 text-gold-luxury" />
              <div className="text-left">
                <p className="font-medium">Premium Service</p>
                <p className="text-sm text-gray-300">5-Star Luxury Experience</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Clock className="w-6 h-6 text-turquoise-ocean" />
              <div className="text-left">
                <p className="font-medium">24/7 Support</p>
                <p className="text-sm text-gray-300">Always Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto mobile-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} TSmart Voyage. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-gold-luxury transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-gold-luxury transition-colors">
                Terms of Service
              </Link>
              <Link to="/safety" className="text-gray-300 hover:text-gold-luxury transition-colors">
                Safety Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

