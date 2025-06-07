import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const WhatsAppFloat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const predefinedMessages = [
    "I'm interested in yacht charter pricing",
    "I'd like to book the Aquela 42",
    "Tell me about VIP services",
    "I need accommodation recommendations",
    "What's included in the packages?"
  ];

  const handleSendMessage = (text = message) => {
    const whatsappNumber = "+905321234567"; // Replace with actual number
    const encodedMessage = encodeURIComponent(text || message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* WhatsApp Float Button */}
      <div className="whatsapp-float no-print">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-full text-white hover:text-white focus:outline-none"
          aria-label="Open WhatsApp chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>

      {/* WhatsApp Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 no-print">
          {/* Header */}
          <div className="bg-[#25d366] text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">TSmart Voyage</h3>
                <p className="text-sm opacity-90">Luxury Charter Assistant</p>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
            {/* Welcome Message */}
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-700">
                👋 Welcome to TSmart Voyage! How can we help you with your luxury yacht charter experience?
              </p>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Quick Questions
              </p>
              {predefinedMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  {msg}
                </button>
              ))}
            </div>

            {/* Custom Message Input */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Custom Message
              </p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25d366] focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim()}
                  className="px-3 py-2 bg-[#25d366] text-white rounded-lg hover:bg-[#128c7e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Powered by WhatsApp</span>
              <span>Usually replies instantly</span>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden no-print"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WhatsAppFloat;

