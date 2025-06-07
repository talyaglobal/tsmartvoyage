# Yacht Management Examples

## Overview
This document provides practical examples for managing yachts using the TSmart Voyage API.

## Basic Yacht Operations

### 1. Listing Yachts

```javascript
// JavaScript/Node.js Example
class YachtManager {
  constructor(apiKey, baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getAllYachts(filters = {}) {
    const params = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 10,
      sortBy: filters.sortBy || 'created_at',
      sortOrder: filters.sortOrder || 'desc',
      ...filters
    });

    const response = await fetch(`${this.baseUrl}/yachts?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch yachts: ${response.statusText}`);
    }

    return response.json();
  }

  async getAvailableYachts(location = null) {
    const filters = { isAvailable: true };
    if (location) filters.location = location;
    
    return this.getAllYachts(filters);
  }

  async searchYachts(criteria) {
    const filters = {};
    
    if (criteria.location) filters.location = criteria.location;
    if (criteria.minCapacity) filters.minCapacity = criteria.minCapacity;
    if (criteria.maxCapacity) filters.maxCapacity = criteria.maxCapacity;
    if (criteria.isAvailable !== undefined) filters.isAvailable = criteria.isAvailable;
    
    return this.getAllYachts(filters);
  }
}

// Usage Examples
const yachtManager = new YachtManager('your-jwt-token');

// Get all yachts with pagination
const allYachts = await yachtManager.getAllYachts({
  page: 1,
  limit: 20,
  sortBy: 'price_per_day',
  sortOrder: 'asc'
});

console.log(`Found ${allYachts.pagination.total} yachts`);
console.log('Yachts:', allYachts.data);

// Get available yachts in Cesme
const cesmeYachts = await yachtManager.getAvailableYachts('Cesme');
console.log('Available yachts in Cesme:', cesmeYachts.data);

// Search for yachts with specific criteria
const searchResults = await yachtManager.searchYachts({
  location: 'Cesme',
  minCapacity: 8,
  maxCapacity: 12,
  isAvailable: true
});

console.log('Search results:', searchResults.data);
```

```python
# Python Example
import requests
from typing import Dict, List, Optional

class YachtManager:
    def __init__(self, api_key: str, base_url: str = 'https://api.tsmartvoyage.com/api'):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }

    def get_all_yachts(self, filters: Dict = None) -> Dict:
        if filters is None:
            filters = {}
        
        params = {
            'page': filters.get('page', 1),
            'limit': filters.get('limit', 10),
            'sortBy': filters.get('sortBy', 'created_at'),
            'sortOrder': filters.get('sortOrder', 'desc'),
            **{k: v for k, v in filters.items() if k not in ['page', 'limit', 'sortBy', 'sortOrder']}
        }

        response = requests.get(
            f'{self.base_url}/yachts',
            headers=self.headers,
            params=params
        )

        if not response.ok:
            raise Exception(f'Failed to fetch yachts: {response.text}')

        return response.json()

    def get_available_yachts(self, location: Optional[str] = None) -> Dict:
        filters = {'isAvailable': True}
        if location:
            filters['location'] = location
        
        return self.get_all_yachts(filters)

    def search_yachts(self, criteria: Dict) -> Dict:
        filters = {}
        
        if 'location' in criteria:
            filters['location'] = criteria['location']
        if 'minCapacity' in criteria:
            filters['minCapacity'] = criteria['minCapacity']
        if 'maxCapacity' in criteria:
            filters['maxCapacity'] = criteria['maxCapacity']
        if 'isAvailable' in criteria:
            filters['isAvailable'] = criteria['isAvailable']
        
        return self.get_all_yachts(filters)

# Usage Examples
yacht_manager = YachtManager('your-jwt-token')

# Get all yachts with pagination
all_yachts = yacht_manager.get_all_yachts({
    'page': 1,
    'limit': 20,
    'sortBy': 'price_per_day',
    'sortOrder': 'asc'
})

print(f"Found {all_yachts['pagination']['total']} yachts")

# Get available yachts in Cesme
cesme_yachts = yacht_manager.get_available_yachts('Cesme')
print(f"Available yachts in Cesme: {len(cesme_yachts['data'])}")

# Search for yachts with specific criteria
search_results = yacht_manager.search_yachts({
    'location': 'Cesme',
    'minCapacity': 8,
    'maxCapacity': 12,
    'isAvailable': True
})

print(f"Search results: {len(search_results['data'])} yachts found")
```

### 2. Getting Yacht Details

```javascript
// Get detailed information about a specific yacht
async function getYachtDetails(yachtId) {
  const response = await fetch(`https://api.tsmartvoyage.com/api/yachts/${yachtId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Yacht not found');
    }
    throw new Error(`Failed to fetch yacht details: ${response.statusText}`);
  }

  return response.json();
}

// Enhanced yacht details with additional processing
async function getEnhancedYachtDetails(yachtId) {
  const yachtData = await getYachtDetails(yachtId);
  const yacht = yachtData.data;

  // Calculate additional metrics
  const enhancedYacht = {
    ...yacht,
    pricePerPerson: yacht.pricePerDay / yacht.capacity,
    ageInYears: new Date().getFullYear() - yacht.year,
    featuresCount: yacht.features ? yacht.features.length : 0,
    hasImages: yacht.images && yacht.images.length > 0,
    priceCategory: categorizePrice(yacht.pricePerDay)
  };

  return enhancedYacht;
}

function categorizePrice(pricePerDay) {
  if (pricePerDay < 1000) return 'Budget';
  if (pricePerDay < 2000) return 'Standard';
  if (pricePerDay < 3000) return 'Premium';
  return 'Luxury';
}

// Usage
try {
  const yacht = await getEnhancedYachtDetails('yacht-uuid-here');
  console.log(`${yacht.name} - ${yacht.priceCategory} category`);
  console.log(`€${yacht.pricePerDay}/day (€${yacht.pricePerPerson.toFixed(2)}/person)`);
  console.log(`Features: ${yacht.featuresCount}, Age: ${yacht.ageInYears} years`);
} catch (error) {
  console.error('Error fetching yacht details:', error.message);
}
```

### 3. Creating a New Yacht (Manager/Admin Only)

```javascript
// Create a new yacht
async function createYacht(yachtData) {
  // Validate required fields
  const requiredFields = ['name', 'type', 'capacity', 'length', 'year', 'pricePerDay', 'location'];
  const missingFields = requiredFields.filter(field => !yachtData[field]);
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  const response = await fetch('https://api.tsmartvoyage.com/api/yachts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(yachtData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create yacht');
  }

  return response.json();
}

// Example yacht data
const newYachtData = {
  name: 'Aquela 42 Premium',
  type: 'Power Catamaran',
  capacity: 12,
  length: 42.5,
  year: 2023,
  pricePerDay: 2500,
  currency: 'EUR',
  features: [
    'Air Conditioning',
    'WiFi',
    'Sound System',
    'Flybridge',
    'Outdoor Dining',
    'Water Sports Equipment',
    'Professional Crew',
    'Full Kitchen'
  ],
  images: [
    'https://example.com/yacht1.jpg',
    'https://example.com/yacht2.jpg',
    'https://example.com/yacht3.jpg'
  ],
  location: 'Cesme Marina, Turkey'
};

// Usage
try {
  const createdYacht = await createYacht(newYachtData);
  console.log('Yacht created successfully:', createdYacht.data);
} catch (error) {
  console.error('Failed to create yacht:', error.message);
}
```

### 4. Updating Yacht Information

```javascript
// Update yacht information
async function updateYacht(yachtId, updateData) {
  const response = await fetch(`https://api.tsmartvoyage.com/api/yachts/${yachtId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update yacht');
  }

  return response.json();
}

// Common update operations
async function updateYachtAvailability(yachtId, isAvailable) {
  return updateYacht(yachtId, { isAvailable });
}

async function updateYachtPricing(yachtId, pricePerDay, currency = 'EUR') {
  return updateYacht(yachtId, { pricePerDay, currency });
}

async function addYachtFeature(yachtId, newFeature) {
  // First get current yacht data
  const yachtData = await getYachtDetails(yachtId);
  const currentFeatures = yachtData.data.features || [];
  
  if (!currentFeatures.includes(newFeature)) {
    const updatedFeatures = [...currentFeatures, newFeature];
    return updateYacht(yachtId, { features: updatedFeatures });
  }
  
  return yachtData; // Feature already exists
}

async function removeYachtFeature(yachtId, featureToRemove) {
  const yachtData = await getYachtDetails(yachtId);
  const currentFeatures = yachtData.data.features || [];
  const updatedFeatures = currentFeatures.filter(feature => feature !== featureToRemove);
  
  return updateYacht(yachtId, { features: updatedFeatures });
}

// Usage examples
try {
  // Update availability
  await updateYachtAvailability('yacht-uuid', false);
  console.log('Yacht marked as unavailable');

  // Update pricing
  await updateYachtPricing('yacht-uuid', 2800, 'EUR');
  console.log('Yacht pricing updated');

  // Add a new feature
  await addYachtFeature('yacht-uuid', 'Underwater Lights');
  console.log('Feature added');

  // Remove a feature
  await removeYachtFeature('yacht-uuid', 'Old Feature');
  console.log('Feature removed');
} catch (error) {
  console.error('Update failed:', error.message);
}
```

## Advanced Yacht Management

### 1. Bulk Operations

```javascript
// Bulk yacht operations
class BulkYachtManager extends YachtManager {
  async bulkUpdateAvailability(yachtIds, isAvailable) {
    const results = [];
    const errors = [];

    for (const yachtId of yachtIds) {
      try {
        const result = await this.updateYacht(yachtId, { isAvailable });
        results.push({ yachtId, success: true, data: result });
      } catch (error) {
        errors.push({ yachtId, success: false, error: error.message });
      }
    }

    return { results, errors };
  }

  async bulkPriceUpdate(priceUpdates) {
    // priceUpdates: [{ yachtId, pricePerDay, currency? }]
    const results = [];
    const errors = [];

    for (const update of priceUpdates) {
      try {
        const { yachtId, ...updateData } = update;
        const result = await this.updateYacht(yachtId, updateData);
        results.push({ yachtId, success: true, data: result });
      } catch (error) {
        errors.push({ yachtId: update.yachtId, success: false, error: error.message });
      }
    }

    return { results, errors };
  }

  async getYachtsByLocation() {
    const allYachts = await this.getAllYachts({ limit: 1000 }); // Get all yachts
    const yachtsByLocation = {};

    allYachts.data.forEach(yacht => {
      const location = yacht.location || 'Unknown';
      if (!yachtsByLocation[location]) {
        yachtsByLocation[location] = [];
      }
      yachtsByLocation[location].push(yacht);
    });

    return yachtsByLocation;
  }

  async getFleetStatistics() {
    const allYachts = await this.getAllYachts({ limit: 1000 });
    const yachts = allYachts.data;

    const stats = {
      total: yachts.length,
      available: yachts.filter(y => y.isAvailable).length,
      unavailable: yachts.filter(y => !y.isAvailable).length,
      averagePrice: yachts.reduce((sum, y) => sum + y.pricePerDay, 0) / yachts.length,
      averageCapacity: yachts.reduce((sum, y) => sum + y.capacity, 0) / yachts.length,
      averageAge: yachts.reduce((sum, y) => sum + (new Date().getFullYear() - y.year), 0) / yachts.length,
      byType: {},
      byLocation: {},
      priceRanges: {
        budget: yachts.filter(y => y.pricePerDay < 1000).length,
        standard: yachts.filter(y => y.pricePerDay >= 1000 && y.pricePerDay < 2000).length,
        premium: yachts.filter(y => y.pricePerDay >= 2000 && y.pricePerDay < 3000).length,
        luxury: yachts.filter(y => y.pricePerDay >= 3000).length
      }
    };

    // Group by type
    yachts.forEach(yacht => {
      const type = yacht.type || 'Unknown';
      stats.byType[type] = (stats.byType[type] || 0) + 1;
    });

    // Group by location
    yachts.forEach(yacht => {
      const location = yacht.location || 'Unknown';
      stats.byLocation[location] = (stats.byLocation[location] || 0) + 1;
    });

    return stats;
  }
}

// Usage
const bulkManager = new BulkYachtManager('your-jwt-token');

// Bulk availability update
const yachtIds = ['yacht1-uuid', 'yacht2-uuid', 'yacht3-uuid'];
const bulkResult = await bulkManager.bulkUpdateAvailability(yachtIds, false);
console.log(`Updated ${bulkResult.results.length} yachts, ${bulkResult.errors.length} errors`);

// Bulk price update
const priceUpdates = [
  { yachtId: 'yacht1-uuid', pricePerDay: 2200 },
  { yachtId: 'yacht2-uuid', pricePerDay: 2800 },
  { yachtId: 'yacht3-uuid', pricePerDay: 3200, currency: 'USD' }
];
const priceResult = await bulkManager.bulkPriceUpdate(priceUpdates);

// Get fleet statistics
const stats = await bulkManager.getFleetStatistics();
console.log('Fleet Statistics:', stats);
```

### 2. Yacht Availability Calendar

```javascript
// Yacht availability calendar management
class YachtAvailabilityManager {
  constructor(apiKey, baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getYachtAvailability(yachtId, startDate, endDate) {
    // Get all charters for the yacht in the date range
    const params = new URLSearchParams({
      yachtId,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: 'CONFIRMED'
    });

    const response = await fetch(`${this.baseUrl}/charters?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch charter data');
    }

    const charterData = await response.json();
    return this.processAvailabilityData(charterData.data, startDate, endDate);
  }

  processAvailabilityData(charters, startDate, endDate) {
    const availability = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const isBooked = charters.some(charter => {
        const charterStart = new Date(charter.startDate);
        const charterEnd = new Date(charter.endDate);
        return currentDate >= charterStart && currentDate <= charterEnd;
      });

      availability.push({
        date: dateStr,
        available: !isBooked,
        charter: isBooked ? charters.find(c => {
          const start = new Date(c.startDate);
          const end = new Date(c.endDate);
          return currentDate >= start && currentDate <= end;
        }) : null
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return availability;
  }

  async getAvailableYachtsForPeriod(startDate, endDate, filters = {}) {
    // Get all yachts
    const yachtsResponse = await fetch(`${this.baseUrl}/yachts?${new URLSearchParams(filters)}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!yachtsResponse.ok) {
      throw new Error('Failed to fetch yachts');
    }

    const yachtsData = await yachtsResponse.json();
    const availableYachts = [];

    // Check availability for each yacht
    for (const yacht of yachtsData.data) {
      const availability = await this.getYachtAvailability(yacht.id, startDate, endDate);
      const isFullyAvailable = availability.every(day => day.available);

      if (isFullyAvailable) {
        availableYachts.push({
          ...yacht,
          availabilityChecked: true,
          requestedPeriod: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
          }
        });
      }
    }

    return availableYachts;
  }

  generateAvailabilityCalendar(availability) {
    const calendar = {
      totalDays: availability.length,
      availableDays: availability.filter(day => day.available).length,
      bookedDays: availability.filter(day => !day.available).length,
      availabilityPercentage: 0,
      periods: []
    };

    calendar.availabilityPercentage = (calendar.availableDays / calendar.totalDays) * 100;

    // Group consecutive periods
    let currentPeriod = null;
    
    availability.forEach(day => {
      if (!currentPeriod || currentPeriod.available !== day.available) {
        if (currentPeriod) {
          calendar.periods.push(currentPeriod);
        }
        currentPeriod = {
          available: day.available,
          startDate: day.date,
          endDate: day.date,
          days: 1
        };
      } else {
        currentPeriod.endDate = day.date;
        currentPeriod.days++;
      }
    });

    if (currentPeriod) {
      calendar.periods.push(currentPeriod);
    }

    return calendar;
  }
}

// Usage
const availabilityManager = new YachtAvailabilityManager('your-jwt-token');

// Check availability for a specific yacht
const startDate = new Date('2024-07-01');
const endDate = new Date('2024-07-31');
const availability = await availabilityManager.getYachtAvailability('yacht-uuid', startDate, endDate);

console.log('Yacht availability for July 2024:');
availability.forEach(day => {
  console.log(`${day.date}: ${day.available ? 'Available' : 'Booked'}`);
});

// Generate calendar summary
const calendar = availabilityManager.generateAvailabilityCalendar(availability);
console.log(`Availability: ${calendar.availabilityPercentage.toFixed(1)}% (${calendar.availableDays}/${calendar.totalDays} days)`);

// Find available yachts for a specific period
const availableYachts = await availabilityManager.getAvailableYachtsForPeriod(
  new Date('2024-08-15'),
  new Date('2024-08-22'),
  { location: 'Cesme', minCapacity: 8 }
);

console.log(`Found ${availableYachts.length} available yachts for the requested period`);
```

