# TSmart Voyage - Luxury Yacht Charter

A premium Progressive Web App for luxury yacht charter services featuring the Aquela 42 catamaran and VIP services from Cesme Marina, Turkey.

## 🚢 Features

- **Luxury Yacht Charter**: Premium Aquela 42 catamaran with professional crew
- **VIP Services**: Mercedes Vito transfers, luxury accommodation, gourmet dining
- **Progressive Web App**: Offline functionality, app-like experience
- **Mobile-First Design**: Optimized for all devices and screen sizes
- **Booking System**: Multi-step booking process with package selection
- **Real-time Pricing**: Dynamic pricing with add-on services
- **WhatsApp Integration**: Direct communication with quick response options

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS
- **UI Components**: Radix UI, Lucide Icons
- **Routing**: React Router DOM
- **Forms**: React Hook Form, Zod validation
- **Date Handling**: React DatePicker, date-fns
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/tsmart/tsmartvoyage.git
cd tsmartvoyage
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start development server:
```bash
pnpm dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📱 PWA Features

- **Offline Support**: Cached resources for offline browsing
- **App Installation**: Install as native app on mobile/desktop
- **Push Notifications**: Booking confirmations and updates
- **Background Sync**: Offline form submissions
- **App Shortcuts**: Quick access to key features

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.jsx      # Button variants
│   ├── Card.jsx        # Card layouts
│   ├── Container.jsx   # Layout container
│   ├── Footer.jsx      # Site footer
│   ├── Header.jsx      # Navigation header
│   ├── Loading.jsx     # Loading states
│   ├── Section.jsx     # Page sections
│   └── WhatsAppFloat.jsx # WhatsApp widget
├── pages/              # Page components
│   ├── AboutPage.jsx   # About page
│   ├── BookingPage.jsx # Booking system
│   ├── ContactPage.jsx # Contact page
│   ├── HomePage.jsx    # Landing page
│   ├── ServicesPage.jsx # Services overview
│   └── YachtPage.jsx   # Yacht details
├── assets/             # Static assets
│   ├── images/         # Image files
│   └── videos/         # Video files
├── utils/              # Utility functions
│   └── pwa.js         # PWA utilities
├── App.jsx            # Main app component
├── App.css            # Global styles
└── main.jsx           # App entry point
```

## 🎨 Design System

### Colors
- **Navy Deep**: #1a237e (Primary)
- **Gold Luxury**: #ffd700 (Accent)
- **Turquoise Ocean**: #20b2aa (Secondary)
- **Green Sustainable**: #4caf50 (Success)

### Typography
- **Headings**: Playfair Display (Serif)
- **Body**: Inter (Sans-serif)

### Components
- **Responsive Design**: Mobile-first approach
- **Touch-Friendly**: 44px minimum touch targets
- **Accessibility**: WCAG 2.1 compliant
- **Performance**: Optimized loading and animations

## 📦 Build & Deployment

### Development
```bash
pnpm dev          # Start dev server
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript checking
```

### Production
```bash
pnpm build                # Production build
pnpm build:production     # Production build with env
pnpm preview             # Preview production build
```

### Deployment to Vercel

1. **Automatic Deployment** (Recommended):
   - Connect your GitHub repository to Vercel
   - Vercel will automatically deploy on every push to main branch

2. **Manual Deployment**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

3. **Environment Variables**:
   Set these in Vercel dashboard or via CLI:
   - `VITE_APP_NAME`
   - `VITE_CONTACT_PHONE`
   - `VITE_CONTACT_EMAIL`
   - `VITE_WHATSAPP_NUMBER`

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```env
VITE_APP_NAME=TSmart Voyage
VITE_CONTACT_PHONE=+90 232 XXX XXXX
VITE_CONTACT_EMAIL=info@tsmartvoyage.com
VITE_WHATSAPP_NUMBER=+905XXXXXXXXX
```

### Vercel Configuration

The `vercel.json` file includes:
- Static build configuration
- SPA routing setup
- Security headers
- PWA asset caching
- Service worker configuration

## 🌟 Key Features

### Booking System
- **4-Step Process**: Package → Dates → Guest Info → Payment
- **Package Tiers**: Essential (€2,000), Luxury (€2,350), VIP (€2,650)
- **Add-on Services**: Photography, transfers, dining, accommodation
- **Date Selection**: Interactive calendar with availability
- **Guest Management**: Up to 12 guests per charter

### Yacht Showcase
- **Interactive Gallery**: Multiple yacht images with navigation
- **Specifications**: Technical details and capacity
- **Features**: Comfort, safety, and entertainment amenities
- **Safety Certification**: Maritime safety standards

### Services Portfolio
- **Yacht Charter**: Aquela 42 catamaran with crew
- **VIP Transfer**: Mercedes Vito fleet
- **Professional Crew**: Captain and hostess service
- **Luxury Accommodation**: Partner hotel integration
- **Gourmet Dining**: Chef service and premium menus

## 📞 Contact & Support

- **Website**: [tsmartvoyage.vercel.app](https://tsmartvoyage.vercel.app)
- **Email**: info@tsmartvoyage.com
- **Phone**: +90 232 XXX XXXX
- **Location**: Cesme Marina, Izmir, Turkey

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Design Inspiration**: Luxury yacht charter industry standards
- **Icons**: Lucide React icon library
- **UI Components**: Radix UI primitives
- **Styling**: TailwindCSS utility framework
- **Deployment**: Vercel platform

---

**TSmart Voyage** - Experience the ultimate luxury yacht charter in Turkey 🇹🇷

