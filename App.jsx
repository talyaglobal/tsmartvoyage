import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';

// Pages
import HomePage from './pages/HomePage';
import YachtPage from './pages/YachtPage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CaptainsPage from './pages/CaptainsPage';
import CesmeMarinaPage from './pages/CesmeMarinaPage';
import AlacatiPage from './pages/AlacatiPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-background font-inter">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/yacht" element={<YachtPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/captains" element={<CaptainsPage />} />
            <Route path="/cesme-marina" element={<CesmeMarinaPage />} />
            <Route path="/alacati" element={<AlacatiPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;

