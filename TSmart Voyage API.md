# TSmart Voyage API

A comprehensive Next.js 15+ API following TSmart microservice architecture and development standards for luxury yacht charter management.

## 🏗️ Architecture Overview

This API follows TSmart's global development standards with:
- **No src folder** - Next.js 15+ App Router structure
- **Supabase preferred** - Database abstraction layer with REST API (no SDK)
- **SOLID principles** - Clean architecture with dependency injection
- **TypeScript** - Full type safety throughout the application
- **Microservice ready** - Containerized with Docker support

## 📁 Project Structure

```
tsmart-api/
├── app/api/                 # Next.js API routes (App Router)
│   ├── health/             # Health check endpoint
│   ├── auth/               # Authentication endpoints
│   │   ├── login/          # User login
│   │   └── register/       # User registration
│   ├── yachts/             # Yacht management
│   ├── customers/          # Customer management
│   ├── charters/           # Charter booking system
│   └── metrics/            # System metrics
├── lib/                    # Core services
│   ├── database.ts         # Database Abstraction Layer
│   ├── auth.ts            # JWT Authentication service
│   ├── response.ts        # Standardized API responses
│   └── logger.ts          # Structured logging
├── types/                  # TypeScript type definitions
│   └── index.ts           # Global types and interfaces
├── config/                 # Configuration management
│   └── index.ts           # Environment-based configuration
├── middleware/             # Request middleware
├── utils/                  # Utility functions
├── prisma/                 # Database schema and migrations
└── docs/                   # API documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm 8+
- Supabase account (preferred database)

### Installation

1. **Clone and install dependencies**
```bash
cd tsmart-api
npm install
```

2. **Environment setup**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Configure Supabase**
```bash
# Add to .env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_super_secret_jwt_key
```

4. **Start development server**
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `JWT_SECRET` | JWT signing secret (32+ chars in production) | Yes |
| `NODE_ENV` | Environment (development/production/test) | No |
| `API_VERSION` | API version identifier | No |
| `PORT` | Server port | No |

### Database Setup

The API uses Supabase as the preferred database with REST API integration (no SDK). Create the following tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'CUSTOMER',
  is_active BOOLEAN DEFAULT true,
  phone VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- Yachts table
CREATE TABLE yachts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  capacity INTEGER NOT NULL,
  length DECIMAL NOT NULL,
  year INTEGER NOT NULL,
  price_per_day DECIMAL NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  location VARCHAR NOT NULL,
  is_available BOOLEAN DEFAULT true,
  features TEXT[],
  images TEXT[],
  description TEXT,
  specifications JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Charters table
CREATE TABLE charters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  yacht_id UUID REFERENCES yachts(id),
  customer_id UUID REFERENCES users(id),
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  package_type VARCHAR NOT NULL,
  guest_count INTEGER NOT NULL,
  total_price DECIMAL NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR DEFAULT 'PENDING',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 📚 API Documentation

### Authentication

#### POST /api/auth/login
Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "CUSTOMER"
    },
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "expiresAt": "2024-01-01T00:00:00Z"
  }
}
```

#### POST /api/auth/register
Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

### Yachts

#### GET /api/yachts
List yachts with filtering and pagination.

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `location` - Filter by location
- `type` - Filter by yacht type
- `isAvailable` - Filter by availability
- `minCapacity` - Minimum capacity
- `maxCapacity` - Maximum capacity
- `search` - Search in name, location, description

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Aquela 42",
      "type": "POWER_CATAMARAN",
      "capacity": 12,
      "length": 42,
      "pricePerDay": 1850,
      "location": "Cesme Marina",
      "isAvailable": true
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### POST /api/yachts
Create a new yacht (Manager+ role required).

### Health Check

#### GET /api/health
System health status and service monitoring.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "v1",
    "uptime": 3600,
    "services": [
      {
        "name": "database",
        "status": "healthy",
        "responseTime": 45
      }
    ]
  }
}
```

## 🔐 Security

### Authentication
- JWT-based authentication with role-based access control
- Password hashing with bcrypt (12 salt rounds)
- Token expiration and refresh mechanism
- Secure HTTP headers (CORS, CSP, etc.)

### Authorization Roles
- **CUSTOMER** - Basic user, can view yachts and create bookings
- **MANAGER** - Can manage yachts and view all bookings
- **ADMIN** - Full system access

### Rate Limiting
- 100 requests per minute per IP (configurable)
- 10 requests per minute for auth endpoints
- Custom limits for different endpoint categories

## 🐳 Docker Support

### Development
```bash
docker build -t tsmart-voyage-api .
docker run -p 3000:3000 tsmart-voyage-api
```

### Production with Docker Compose
```bash
docker-compose up -d
```

Includes:
- API service
- Traefik reverse proxy
- Redis for caching
- Prometheus for metrics
- Grafana for monitoring

## 📊 Monitoring

### Health Checks
- Database connectivity
- Service response times
- System resource usage
- API endpoint availability

### Metrics
- Request/response metrics
- Database query performance
- Error rates and types
- System resource utilization

### Logging
- Structured JSON logging
- Request/response logging
- Error tracking with stack traces
- Performance monitoring

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment-specific Configuration
- Development: `.env.development`
- Testing: `.env.test`
- Production: `.env.production`

## 📞 Support

- **Technical Support**: api-support@tsmartvoyage.com
- **Documentation**: https://docs.tsmartvoyage.com
- **GitHub Issues**: https://github.com/tsmartvoyage/api

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with TSmart Standards** 🌟

