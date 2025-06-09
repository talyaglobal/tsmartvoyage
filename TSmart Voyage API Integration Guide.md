# TSmart Voyage API Integration Guide

## Overview

The TSmart Voyage API provides a comprehensive solution for integrating yacht charter functionality into your applications. This guide covers authentication, common integration patterns, and best practices.

## Quick Start

### 1. Authentication

All API requests (except public endpoints) require authentication using JWT tokens.

#### Step 1: Register or Login
```bash
# Register a new user
curl -X POST https://api.tsmartvoyage.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "securepassword123",
    "firstName": "John",
    "lastName": "Developer",
    "role": "USER"
  }'

# Login to get JWT token
curl -X POST https://api.tsmartvoyage.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "developer@example.com",
    "password": "securepassword123"
  }'
```

#### Step 2: Use the Token
Include the JWT token in the Authorization header for authenticated requests:
```bash
curl -X GET https://api.tsmartvoyage.com/api/charters \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 2. Basic Yacht Listing

```bash
# Get available yachts
curl -X GET "https://api.tsmartvoyage.com/api/yachts?isAvailable=true&page=1&limit=10"
```

### 3. Create a Charter Booking

```bash
curl -X POST https://api.tsmartvoyage.com/api/charters \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "yachtId": "yacht-uuid-here",
    "customerId": "customer-uuid-here",
    "startDate": "2024-07-01T00:00:00Z",
    "endDate": "2024-07-07T00:00:00Z",
    "packageType": "LUXURY",
    "guestCount": 8,
    "specialRequests": "Birthday celebration"
  }'
```

## Integration Patterns

### 1. Yacht Search and Booking Widget

Perfect for travel websites and booking platforms:

```javascript
class YachtBookingWidget {
  constructor(apiKey, baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async searchYachts(filters = {}) {
    const params = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 10,
      isAvailable: true,
      ...filters
    });

    const response = await fetch(`${this.baseUrl}/yachts?${params}`);
    return response.json();
  }

  async getYachtDetails(yachtId) {
    const response = await fetch(`${this.baseUrl}/yachts/${yachtId}`);
    return response.json();
  }

  async createBooking(bookingData) {
    const response = await fetch(`${this.baseUrl}/charters`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  }
}

// Usage
const widget = new YachtBookingWidget('your-jwt-token');
const yachts = await widget.searchYachts({ 
  location: 'Cesme', 
  minCapacity: 6 
});
```

### 2. Availability Calendar Integration

For real-time availability checking:

```javascript
class AvailabilityChecker {
  constructor(apiKey, baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async checkAvailability(yachtId, startDate, endDate) {
    // Get existing charters for the yacht
    const params = new URLSearchParams({
      yachtId,
      status: 'CONFIRMED',
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });

    const response = await fetch(`${this.baseUrl}/charters?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    const result = await response.json();
    
    // Check for conflicts
    const conflicts = result.data.filter(charter => {
      const charterStart = new Date(charter.startDate);
      const charterEnd = new Date(charter.endDate);
      return (startDate < charterEnd && endDate > charterStart);
    });

    return {
      available: conflicts.length === 0,
      conflicts: conflicts
    };
  }

  async getAvailableYachts(startDate, endDate, filters = {}) {
    const yachts = await this.searchYachts(filters);
    const availableYachts = [];

    for (const yacht of yachts.data) {
      const availability = await this.checkAvailability(
        yacht.id, 
        startDate, 
        endDate
      );
      
      if (availability.available) {
        availableYachts.push(yacht);
      }
    }

    return availableYachts;
  }
}
```

### 3. Fleet Management Dashboard

For yacht operators and managers:

```javascript
class FleetManager {
  constructor(apiKey, baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getFleetStatus() {
    const [yachts, charters] = await Promise.all([
      this.getAllYachts(),
      this.getActiveCharters()
    ]);

    return {
      totalYachts: yachts.pagination.total,
      availableYachts: yachts.data.filter(y => y.isAvailable).length,
      activeCharters: charters.data.filter(c => c.status === 'CONFIRMED').length,
      revenue: this.calculateRevenue(charters.data)
    };
  }

  async updateYachtAvailability(yachtId, isAvailable) {
    const response = await fetch(`${this.baseUrl}/yachts/${yachtId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ isAvailable })
    });
    return response.json();
  }

  calculateRevenue(charters) {
    return charters
      .filter(c => c.status === 'COMPLETED')
      .reduce((total, charter) => total + charter.totalPrice, 0);
  }
}
```

## Error Handling

The API uses standard HTTP status codes and provides detailed error information:

```javascript
async function handleApiCall(apiCall) {
  try {
    const response = await apiCall();
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.error} - ${errorData.message}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    
    // Handle specific error types
    if (error.status === 401) {
      // Redirect to login or refresh token
      handleAuthenticationError();
    } else if (error.status === 429) {
      // Rate limit exceeded - implement retry logic
      await delay(1000);
      return handleApiCall(apiCall);
    }
    
    throw error;
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

## Rate Limiting

The API implements rate limiting to ensure fair usage:

- **Authentication endpoints**: 10 requests per 15 minutes
- **General endpoints**: 100 requests per 15 minutes

Rate limit information is included in response headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in current window
- `X-RateLimit-Reset`: Unix timestamp when the rate limit resets

```javascript
function checkRateLimit(response) {
  const limit = response.headers.get('X-RateLimit-Limit');
  const remaining = response.headers.get('X-RateLimit-Remaining');
  const reset = response.headers.get('X-RateLimit-Reset');
  
  console.log(`Rate limit: ${remaining}/${limit}, resets at ${new Date(reset * 1000)}`);
  
  if (remaining < 10) {
    console.warn('Approaching rate limit!');
  }
}
```

## Webhooks (Coming Soon)

TSmart Voyage API will support webhooks for real-time notifications:

- Charter status changes
- Payment confirmations
- Yacht availability updates
- System maintenance notifications

## SDK Libraries

Official SDK libraries are available for popular programming languages:

### JavaScript/Node.js
```bash
npm install @tsmart/voyage-api
```

### Python
```bash
pip install tsmart-voyage-api
```

### PHP
```bash
composer require tsmart/voyage-api
```

## Testing

Use our sandbox environment for testing:
- **Base URL**: `https://staging-api.tsmartvoyage.com/api`
- **Test credentials**: Available in developer dashboard
- **Test data**: Pre-populated yachts and customers

## Support

- **Documentation**: https://docs.tsmartvoyage.com
- **API Support**: api-support@tsmartvoyage.com
- **Developer Forum**: https://community.tsmartvoyage.com
- **Status Page**: https://status.tsmartvoyage.com

## Changelog

### v1.0.0 (Current)
- Initial API release
- Authentication system
- Yacht management
- Charter booking
- Basic filtering and pagination

### Upcoming Features
- Advanced search with geolocation
- Real-time availability updates
- Webhook notifications
- Mobile SDK
- GraphQL endpoint

