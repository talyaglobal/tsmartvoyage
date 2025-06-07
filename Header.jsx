import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Anchor, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Yacht', href: '/yacht' },
    { name: 'Services', href: '/services' },
    { name: 'Çeşme Marina', href: '/cesme-marina' },
    { name: 'Alaçatı', href: '/alacati' },
    { name: 'Meet Captains', href: '/captains' },
    { name: 'Booking', href: '/booking' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto mobile-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 gradient-navy-gold rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <Anchor className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-playfair text-xl lg:text-2xl font-bold text-navy-deep">
                TSmart Voyage
              </h1>
              <p className="text-xs text-gray-600 -mt-1">Luxury Charter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-navy-deep ${
                  isActive(item.href)
                    ? 'text-navy-deep border-b-2 border-gold-luxury pb-1'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+90 232 XXX XXXX</span>
            </div>
            <Link
              to="/booking"
              className="bg-navy-deep text-white px-6 py-2 rounded-full font-medium hover:bg-navy-deep/90 transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-navy-deep hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mobile-menu">
          <div className="mobile-menu-content">
            <div className="text-center mb-8">
              <div className="w-16 h-16 gradient-navy-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Anchor className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-playfair text-2xl font-bold text-white">TSmart Voyage</h2>
              <p className="text-gray-300">Luxury Charter Experience</p>
            </div>

            <nav className="space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-xl font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-gold-luxury'
                      : 'text-white hover:text-gold-luxury'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+90 232 XXX XXXX</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-gray-300">
                <Mail className="w-5 h-5" />
                <span>info@tsmartvoyage.com</span>
              </div>
              <Link
                to="/booking"
                onClick={() => setIsMenuOpen(false)}
                className="block w-48 mx-auto bg-gold-luxury text-navy-deep px-8 py-3 rounded-full font-medium text-center hover:bg-gold-luxury/90 transition-colors"
              >
                Book Your Voyage
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

