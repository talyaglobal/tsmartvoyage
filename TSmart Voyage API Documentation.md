# TSmart Voyage API Documentation

Welcome to the comprehensive API documentation for TSmart Voyage - the premier yacht charter management system.

## 📚 Documentation Structure

### Core Documentation
- **[Integration Guide](integration/integration-guide.md)** - Complete guide to integrating with TSmart Voyage API
- **[OpenAPI Specification](api/openapi.yaml)** - Machine-readable API specification

### Code Examples
- **[Authentication Examples](examples/authentication.md)** - JWT authentication, user management, and security
- **[Yacht Management Examples](examples/yacht-management.md)** - Fleet management, availability, and operations
- **[Charter Booking Examples](examples/charter-booking.md)** - Booking system, payments, and analytics

## 🚀 Quick Start

### 1. Authentication
```javascript
// Get your API token
const response = await fetch('https://api.tsmartvoyage.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'your-email@example.com',
    password: 'your-password'
  })
});

const { token } = await response.json();
```

### 2. List Available Yachts
```javascript
const yachts = await fetch('https://api.tsmartvoyage.com/api/yachts?isAvailable=true', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const yachtData = await yachts.json();
console.log('Available yachts:', yachtData.data);
```

### 3. Create a Charter Booking
```javascript
const charter = await fetch('https://api.tsmartvoyage.com/api/charters', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    yachtId: 'yacht-uuid',
    customerId: 'customer-uuid',
    startDate: '2024-07-15T00:00:00Z',
    endDate: '2024-07-22T00:00:00Z',
    packageType: 'LUXURY',
    guestCount: 8
  })
});

const charterData = await charter.json();
console.log('Charter created:', charterData.data);
```

## 🔗 API Endpoints Overview

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Yachts
- `GET /api/yachts` - List yachts with filtering
- `GET /api/yachts/{id}` - Get yacht details
- `POST /api/yachts` - Create new yacht (Manager+)
- `PUT /api/yachts/{id}` - Update yacht (Manager+)
- `DELETE /api/yachts/{id}` - Delete yacht (Admin only)

### Customers
- `GET /api/customers` - List customers (Manager+)
- `GET /api/customers/{id}` - Get customer details
- `POST /api/customers` - Create customer
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer (Admin only)

### Charters
- `GET /api/charters` - List charters
- `GET /api/charters/{id}` - Get charter details
- `POST /api/charters` - Create charter booking
- `PUT /api/charters/{id}` - Update charter
- `DELETE /api/charters/{id}` - Cancel charter

### System
- `GET /api/health` - Health check
- `GET /api/metrics` - System metrics (Admin only)

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **Customer**: Can view yachts, create bookings, manage own profile
- **Manager**: Can manage yachts, view all bookings, manage customers
- **Admin**: Full system access, user management, system configuration

## 📊 Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "1.0.0"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "field": "email",
      "issue": "Invalid email format"
    }
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

## 🔄 Rate Limiting

The API implements rate limiting to ensure fair usage:

- **General endpoints**: 100 requests per minute
- **Authentication endpoints**: 10 requests per minute
- **Search endpoints**: 50 requests per minute

Rate limit headers are included in responses:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248600
```

## 🌐 Environment URLs

### Production
- **Base URL**: `https://api.tsmartvoyage.com/api`
- **Documentation**: `https://docs.tsmartvoyage.com`
- **Status Page**: `https://status.tsmartvoyage.com`

### Staging
- **Base URL**: `https://staging-api.tsmartvoyage.com/api`
- **Documentation**: `https://staging-docs.tsmartvoyage.com`

### Development
- **Base URL**: `http://localhost:3000/api`
- **Documentation**: `http://localhost:3000/docs`

## 📞 Support

### Technical Support
- **Email**: api-support@tsmartvoyage.com
- **Documentation**: [Integration Guide](integration/integration-guide.md)
- **Status Updates**: https://status.tsmartvoyage.com

### Business Inquiries
- **Email**: business@tsmartvoyage.com
- **Phone**: +90 507 184 13 93 (Captain Mr. Umit)
- **WhatsApp**: +90 555 868 16 34 (Host Ms. Merve)

### Office Locations
- **Turkey Operations**: Çeşme Marina, İzmir, Turkey
- **UAE Headquarters**: Talya Global, Dubai Science Park Z17, Al Barsha South, Dubai, UAE

## 🔧 SDKs and Libraries

### Official SDKs
- **JavaScript/Node.js**: `npm install @tsmartvoyage/api-client`
- **Python**: `pip install tsmartvoyage-api`
- **PHP**: `composer require tsmartvoyage/api-client`

### Community Libraries
- **React Hooks**: `npm install @tsmartvoyage/react-hooks`
- **Vue.js Plugin**: `npm install @tsmartvoyage/vue-plugin`

## 📈 Monitoring and Analytics

### Health Monitoring
- **Health Check**: `GET /api/health`
- **Metrics**: `GET /api/metrics` (Admin only)
- **Status Dashboard**: https://status.tsmartvoyage.com

### Analytics Integration
- **Google Analytics**: Supported via webhook events
- **Custom Analytics**: Real-time event streaming available
- **Business Intelligence**: Data export APIs for reporting tools

## 🔒 Security

### Security Features
- **JWT Authentication** with configurable expiration
- **Rate Limiting** to prevent abuse
- **Input Validation** using Zod schemas
- **CORS Protection** with configurable origins
- **Request Logging** for audit trails

### Security Best Practices
- Always use HTTPS in production
- Store JWT tokens securely (httpOnly cookies recommended)
- Implement proper error handling
- Validate all user inputs
- Use environment variables for sensitive configuration

## 📋 Changelog

### Version 1.0.0 (Current)
- Initial API release
- Complete yacht management system
- Charter booking functionality
- User authentication and authorization
- Real-time availability checking
- Comprehensive analytics and reporting

### Upcoming Features
- **v1.1.0**: Real-time notifications via WebSocket
- **v1.2.0**: Advanced payment processing integration
- **v1.3.0**: Multi-language support
- **v2.0.0**: Mobile app SDK and enhanced analytics

---

## 🎯 Getting Started Checklist

- [ ] Read the [Integration Guide](integration/integration-guide.md)
- [ ] Set up authentication and get your API token
- [ ] Test basic endpoints using the provided examples
- [ ] Implement error handling and rate limiting
- [ ] Set up monitoring and logging
- [ ] Review security best practices
- [ ] Join our developer community for support

**Ready to start building with TSmart Voyage API? Begin with our [Integration Guide](integration/integration-guide.md)!**

