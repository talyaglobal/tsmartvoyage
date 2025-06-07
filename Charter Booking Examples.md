# Charter Booking Examples

## Overview
This document provides practical examples for managing charter bookings using the TSmart Voyage API.

## Basic Charter Operations

### 1. Creating a Charter Booking

```javascript
// JavaScript/Node.js Example
class CharterManager {
  constructor(apiKey, baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async createCharter(charterData) {
    // Validate charter data
    this.validateCharterData(charterData);

    const response = await fetch(`${this.baseUrl}/charters`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(charterData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create charter');
    }

    return response.json();
  }

  validateCharterData(data) {
    const required = ['yachtId', 'customerId', 'startDate', 'endDate', 'packageType', 'guestCount'];
    const missing = required.filter(field => !data[field]);
    
    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    
    if (startDate >= endDate) {
      throw new Error('End date must be after start date');
    }

    if (startDate < new Date()) {
      throw new Error('Start date cannot be in the past');
    }

    if (data.guestCount < 1 || data.guestCount > 50) {
      throw new Error('Guest count must be between 1 and 50');
    }

    const validPackages = ['ESSENTIAL', 'LUXURY', 'VIP'];
    if (!validPackages.includes(data.packageType)) {
      throw new Error(`Package type must be one of: ${validPackages.join(', ')}`);
    }
  }

  async calculateCharterPrice(yachtId, startDate, endDate, packageType, guestCount) {
    // Get yacht details for base pricing
    const yachtResponse = await fetch(`${this.baseUrl}/yachts/${yachtId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!yachtResponse.ok) {
      throw new Error('Yacht not found');
    }

    const yachtData = await yachtResponse.json();
    const yacht = yachtData.data;

    // Calculate number of days
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    // Base price calculation
    let basePrice = yacht.pricePerDay * days;

    // Package multipliers
    const packageMultipliers = {
      'ESSENTIAL': 1.0,
      'LUXURY': 1.3,
      'VIP': 1.6
    };

    const packageMultiplier = packageMultipliers[packageType] || 1.0;
    let totalPrice = basePrice * packageMultiplier;

    // Guest count adjustments (if over yacht capacity)
    if (guestCount > yacht.capacity) {
      throw new Error(`Guest count (${guestCount}) exceeds yacht capacity (${yacht.capacity})`);
    }

    // Additional services pricing
    const additionalServices = this.getAdditionalServicesPricing(packageType);

    return {
      basePrice,
      packageMultiplier,
      packagePrice: totalPrice,
      additionalServices,
      totalPrice: totalPrice + additionalServices.total,
      currency: yacht.currency || 'EUR',
      days,
      breakdown: {
        yachtRental: basePrice,
        packageUpgrade: totalPrice - basePrice,
        services: additionalServices.total
      }
    };
  }

  getAdditionalServicesPricing(packageType) {
    const services = {
      'ESSENTIAL': {
        crew: 300,
        cleaning: 150,
        fuel: 200,
        total: 650
      },
      'LUXURY': {
        crew: 400,
        cleaning: 200,
        fuel: 250,
        catering: 300,
        total: 1150
      },
      'VIP': {
        crew: 500,
        cleaning: 250,
        fuel: 300,
        catering: 500,
        concierge: 200,
        photography: 300,
        total: 2050
      }
    };

    return services[packageType] || services['ESSENTIAL'];
  }
}

// Usage Examples
const charterManager = new CharterManager('your-jwt-token');

// Calculate pricing first
const pricing = await charterManager.calculateCharterPrice(
  'yacht-uuid-here',
  '2024-07-15T00:00:00Z',
  '2024-07-22T00:00:00Z',
  'LUXURY',
  8
);

console.log('Charter Pricing:', pricing);
console.log(`Total: €${pricing.totalPrice} for ${pricing.days} days`);

// Create the charter booking
const charterData = {
  yachtId: 'yacht-uuid-here',
  customerId: 'customer-uuid-here',
  startDate: '2024-07-15T00:00:00Z',
  endDate: '2024-07-22T00:00:00Z',
  packageType: 'LUXURY',
  guestCount: 8,
  specialRequests: 'Birthday celebration on day 3, vegetarian meals for 2 guests'
};

try {
  const charter = await charterManager.createCharter(charterData);
  console.log('Charter created successfully:', charter.data);
} catch (error) {
  console.error('Failed to create charter:', error.message);
}
```

### 2. Listing and Filtering Charters

```javascript
// Extended CharterManager with listing capabilities
class ExtendedCharterManager extends CharterManager {
  async getCharters(filters = {}) {
    const params = new URLSearchParams({
      page: filters.page || 1,
      limit: filters.limit || 10,
      ...filters
    });

    const response = await fetch(`${this.baseUrl}/charters?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch charters');
    }

    return response.json();
  }

  async getMyCharters(customerId) {
    return this.getCharters({ customerId });
  }

  async getChartersByStatus(status) {
    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }
    
    return this.getCharters({ status });
  }

  async getChartersByDateRange(startDate, endDate) {
    return this.getCharters({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    });
  }

  async getChartersByYacht(yachtId) {
    return this.getCharters({ yachtId });
  }

  async getUpcomingCharters(days = 30) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);
    
    const charters = await this.getChartersByDateRange(startDate, endDate);
    
    // Filter to only confirmed charters
    const upcomingCharters = charters.data.filter(charter => 
      charter.status === 'CONFIRMED' && new Date(charter.startDate) > new Date()
    );

    return {
      ...charters,
      data: upcomingCharters
    };
  }

  async getCharterStatistics(filters = {}) {
    const allCharters = await this.getCharters({ ...filters, limit: 1000 });
    const charters = allCharters.data;

    const stats = {
      total: charters.length,
      byStatus: {},
      byPackageType: {},
      totalRevenue: 0,
      averageBookingValue: 0,
      averageGuestCount: 0,
      mostPopularYacht: null,
      bookingTrends: {}
    };

    // Calculate statistics
    charters.forEach(charter => {
      // Status distribution
      stats.byStatus[charter.status] = (stats.byStatus[charter.status] || 0) + 1;
      
      // Package type distribution
      stats.byPackageType[charter.packageType] = (stats.byPackageType[charter.packageType] || 0) + 1;
      
      // Revenue calculation (only for completed charters)
      if (charter.status === 'COMPLETED') {
        stats.totalRevenue += charter.totalPrice;
      }
    });

    // Calculate averages
    if (charters.length > 0) {
      stats.averageBookingValue = stats.totalRevenue / charters.filter(c => c.status === 'COMPLETED').length;
      stats.averageGuestCount = charters.reduce((sum, c) => sum + c.guestCount, 0) / charters.length;
    }

    // Find most popular yacht
    const yachtCounts = {};
    charters.forEach(charter => {
      yachtCounts[charter.yachtId] = (yachtCounts[charter.yachtId] || 0) + 1;
    });
    
    const mostPopularYachtId = Object.keys(yachtCounts).reduce((a, b) => 
      yachtCounts[a] > yachtCounts[b] ? a : b, null
    );
    
    if (mostPopularYachtId) {
      stats.mostPopularYacht = {
        yachtId: mostPopularYachtId,
        bookings: yachtCounts[mostPopularYachtId]
      };
    }

    return stats;
  }
}

// Usage Examples
const extendedManager = new ExtendedCharterManager('your-jwt-token');

// Get all charters with pagination
const allCharters = await extendedManager.getCharters({
  page: 1,
  limit: 20
});
console.log(`Found ${allCharters.pagination.total} total charters`);

// Get pending charters
const pendingCharters = await extendedManager.getChartersByStatus('PENDING');
console.log(`Pending charters: ${pendingCharters.data.length}`);

// Get upcoming charters for next 14 days
const upcomingCharters = await extendedManager.getUpcomingCharters(14);
console.log(`Upcoming charters: ${upcomingCharters.data.length}`);

// Get charter statistics
const stats = await extendedManager.getCharterStatistics();
console.log('Charter Statistics:', stats);
console.log(`Total Revenue: €${stats.totalRevenue.toFixed(2)}`);
console.log(`Average Booking: €${stats.averageBookingValue.toFixed(2)}`);
```

### 3. Charter Status Management

```javascript
// Charter status management (for managers/admins)
class CharterStatusManager extends ExtendedCharterManager {
  async updateCharterStatus(charterId, newStatus, notes = '') {
    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Get current charter to validate status transition
    const currentCharter = await this.getCharterById(charterId);
    this.validateStatusTransition(currentCharter.data.status, newStatus);

    const updateData = {
      status: newStatus,
      statusUpdatedAt: new Date().toISOString(),
      statusNotes: notes
    };

    const response = await fetch(`${this.baseUrl}/charters/${charterId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update charter status');
    }

    const updatedCharter = await response.json();
    
    // Send notification based on status change
    await this.sendStatusChangeNotification(updatedCharter.data, newStatus);
    
    return updatedCharter;
  }

  validateStatusTransition(currentStatus, newStatus) {
    const validTransitions = {
      'PENDING': ['CONFIRMED', 'CANCELLED'],
      'CONFIRMED': ['COMPLETED', 'CANCELLED'],
      'CANCELLED': [], // Cannot change from cancelled
      'COMPLETED': [] // Cannot change from completed
    };

    const allowedTransitions = validTransitions[currentStatus] || [];
    
    if (!allowedTransitions.includes(newStatus)) {
      throw new Error(`Cannot change status from ${currentStatus} to ${newStatus}`);
    }
  }

  async sendStatusChangeNotification(charter, newStatus) {
    // This would integrate with your notification system
    console.log(`Sending notification: Charter ${charter.id} status changed to ${newStatus}`);
    
    const notifications = {
      'CONFIRMED': 'Your charter booking has been confirmed!',
      'CANCELLED': 'Your charter booking has been cancelled.',
      'COMPLETED': 'Thank you for choosing TSmart Voyage! Please rate your experience.'
    };

    const message = notifications[newStatus];
    if (message) {
      // Here you would integrate with email/SMS service
      console.log(`Notification to customer ${charter.customerId}: ${message}`);
    }
  }

  async getCharterById(charterId) {
    const response = await fetch(`${this.baseUrl}/charters/${charterId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Charter not found');
      }
      throw new Error('Failed to fetch charter');
    }

    return response.json();
  }

  async confirmCharter(charterId, notes = '') {
    return this.updateCharterStatus(charterId, 'CONFIRMED', notes);
  }

  async cancelCharter(charterId, reason = '') {
    return this.updateCharterStatus(charterId, 'CANCELLED', reason);
  }

  async completeCharter(charterId, notes = '') {
    return this.updateCharterStatus(charterId, 'COMPLETED', notes);
  }

  async bulkStatusUpdate(charterIds, newStatus, notes = '') {
    const results = [];
    const errors = [];

    for (const charterId of charterIds) {
      try {
        const result = await this.updateCharterStatus(charterId, newStatus, notes);
        results.push({ charterId, success: true, data: result });
      } catch (error) {
        errors.push({ charterId, success: false, error: error.message });
      }
    }

    return { results, errors };
  }
}

// Usage Examples
const statusManager = new CharterStatusManager('your-jwt-token');

// Confirm a charter
try {
  const confirmedCharter = await statusManager.confirmCharter(
    'charter-uuid-here',
    'Payment received, yacht prepared'
  );
  console.log('Charter confirmed:', confirmedCharter.data);
} catch (error) {
  console.error('Failed to confirm charter:', error.message);
}

// Cancel a charter
try {
  const cancelledCharter = await statusManager.cancelCharter(
    'charter-uuid-here',
    'Customer requested cancellation due to weather concerns'
  );
  console.log('Charter cancelled:', cancelledCharter.data);
} catch (error) {
  console.error('Failed to cancel charter:', error.message);
}

// Bulk status update
const charterIds = ['charter1-uuid', 'charter2-uuid', 'charter3-uuid'];
const bulkResult = await statusManager.bulkStatusUpdate(charterIds, 'CONFIRMED', 'Bulk confirmation');
console.log(`Updated ${bulkResult.results.length} charters, ${bulkResult.errors.length} errors`);
```

## Advanced Charter Features

### 1. Charter Conflict Detection

```javascript
// Charter conflict detection and resolution
class CharterConflictManager extends CharterStatusManager {
  async checkForConflicts(yachtId, startDate, endDate, excludeCharterId = null) {
    const charters = await this.getChartersByYacht(yachtId);
    const activeCharters = charters.data.filter(charter => 
      charter.status === 'CONFIRMED' && 
      (excludeCharterId ? charter.id !== excludeCharterId : true)
    );

    const requestStart = new Date(startDate);
    const requestEnd = new Date(endDate);
    
    const conflicts = activeCharters.filter(charter => {
      const charterStart = new Date(charter.startDate);
      const charterEnd = new Date(charter.endDate);
      
      // Check for overlap
      return requestStart < charterEnd && requestEnd > charterStart;
    });

    return {
      hasConflicts: conflicts.length > 0,
      conflicts: conflicts,
      conflictDetails: conflicts.map(conflict => ({
        charterId: conflict.id,
        conflictStart: new Date(Math.max(requestStart, new Date(conflict.startDate))),
        conflictEnd: new Date(Math.min(requestEnd, new Date(conflict.endDate))),
        overlapDays: this.calculateOverlapDays(requestStart, requestEnd, new Date(conflict.startDate), new Date(conflict.endDate))
      }))
    };
  }

  calculateOverlapDays(start1, end1, start2, end2) {
    const overlapStart = new Date(Math.max(start1, start2));
    const overlapEnd = new Date(Math.min(end1, end2));
    
    if (overlapStart >= overlapEnd) return 0;
    
    return Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));
  }

  async findAlternativeYachts(originalYachtId, startDate, endDate, requirements = {}) {
    // Get the original yacht details for comparison
    const originalYacht = await this.getYachtById(originalYachtId);
    
    // Search for similar yachts
    const searchCriteria = {
      isAvailable: true,
      minCapacity: requirements.minCapacity || originalYacht.data.capacity,
      location: requirements.location || originalYacht.data.location,
      ...requirements
    };

    const yachtsResponse = await fetch(`${this.baseUrl}/yachts?${new URLSearchParams(searchCriteria)}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!yachtsResponse.ok) {
      throw new Error('Failed to search for alternative yachts');
    }

    const yachtsData = await yachtsResponse.json();
    const alternatives = [];

    // Check availability for each yacht
    for (const yacht of yachtsData.data) {
      if (yacht.id === originalYachtId) continue; // Skip the original yacht
      
      const conflicts = await this.checkForConflicts(yacht.id, startDate, endDate);
      
      if (!conflicts.hasConflicts) {
        alternatives.push({
          ...yacht,
          priceDifference: yacht.pricePerDay - originalYacht.data.pricePerDay,
          similarityScore: this.calculateSimilarityScore(originalYacht.data, yacht)
        });
      }
    }

    // Sort by similarity score (highest first)
    alternatives.sort((a, b) => b.similarityScore - a.similarityScore);

    return alternatives;
  }

  calculateSimilarityScore(originalYacht, alternativeYacht) {
    let score = 0;
    
    // Type similarity
    if (originalYacht.type === alternativeYacht.type) score += 30;
    
    // Capacity similarity
    const capacityDiff = Math.abs(originalYacht.capacity - alternativeYacht.capacity);
    score += Math.max(0, 20 - capacityDiff * 2);
    
    // Price similarity
    const priceDiff = Math.abs(originalYacht.pricePerDay - alternativeYacht.pricePerDay);
    const pricePercentDiff = priceDiff / originalYacht.pricePerDay;
    score += Math.max(0, 20 - pricePercentDiff * 100);
    
    // Location similarity
    if (originalYacht.location === alternativeYacht.location) score += 20;
    
    // Features similarity
    const originalFeatures = originalYacht.features || [];
    const alternativeFeatures = alternativeYacht.features || [];
    const commonFeatures = originalFeatures.filter(f => alternativeFeatures.includes(f));
    const featureSimilarity = originalFeatures.length > 0 ? 
      (commonFeatures.length / originalFeatures.length) * 10 : 0;
    score += featureSimilarity;

    return Math.round(score);
  }

  async getYachtById(yachtId) {
    const response = await fetch(`${this.baseUrl}/yachts/${yachtId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Yacht not found');
    }

    return response.json();
  }
}

// Usage Examples
const conflictManager = new CharterConflictManager('your-jwt-token');

// Check for conflicts before creating a charter
const conflicts = await conflictManager.checkForConflicts(
  'yacht-uuid-here',
  '2024-07-15T00:00:00Z',
  '2024-07-22T00:00:00Z'
);

if (conflicts.hasConflicts) {
  console.log('Conflicts detected:', conflicts.conflictDetails);
  
  // Find alternative yachts
  const alternatives = await conflictManager.findAlternativeYachts(
    'yacht-uuid-here',
    '2024-07-15T00:00:00Z',
    '2024-07-22T00:00:00Z',
    { minCapacity: 8 }
  );
  
  console.log(`Found ${alternatives.length} alternative yachts:`);
  alternatives.forEach(yacht => {
    console.log(`${yacht.name} - Similarity: ${yacht.similarityScore}%, Price diff: €${yacht.priceDifference}`);
  });
} else {
  console.log('No conflicts detected, yacht is available');
}
```

### 2. Charter Analytics and Reporting

```javascript
// Charter analytics and reporting
class CharterAnalytics extends CharterConflictManager {
  async getRevenueReport(startDate, endDate, groupBy = 'month') {
    const charters = await this.getChartersByDateRange(startDate, endDate);
    const completedCharters = charters.data.filter(c => c.status === 'COMPLETED');

    const report = {
      totalRevenue: 0,
      totalCharters: completedCharters.length,
      averageBookingValue: 0,
      revenueByPeriod: {},
      revenueByPackage: {},
      revenueByYacht: {}
    };

    completedCharters.forEach(charter => {
      report.totalRevenue += charter.totalPrice;
      
      // Group by time period
      const charterDate = new Date(charter.startDate);
      const periodKey = this.getPeriodKey(charterDate, groupBy);
      
      if (!report.revenueByPeriod[periodKey]) {
        report.revenueByPeriod[periodKey] = { revenue: 0, charters: 0 };
      }
      report.revenueByPeriod[periodKey].revenue += charter.totalPrice;
      report.revenueByPeriod[periodKey].charters += 1;
      
      // Group by package type
      if (!report.revenueByPackage[charter.packageType]) {
        report.revenueByPackage[charter.packageType] = { revenue: 0, charters: 0 };
      }
      report.revenueByPackage[charter.packageType].revenue += charter.totalPrice;
      report.revenueByPackage[charter.packageType].charters += 1;
      
      // Group by yacht
      if (!report.revenueByYacht[charter.yachtId]) {
        report.revenueByYacht[charter.yachtId] = { revenue: 0, charters: 0 };
      }
      report.revenueByYacht[charter.yachtId].revenue += charter.totalPrice;
      report.revenueByYacht[charter.yachtId].charters += 1;
    });

    report.averageBookingValue = report.totalCharters > 0 ? 
      report.totalRevenue / report.totalCharters : 0;

    return report;
  }

  getPeriodKey(date, groupBy) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    switch (groupBy) {
      case 'day':
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      case 'week':
        const weekNumber = this.getWeekNumber(date);
        return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
      case 'month':
        return `${year}-${month.toString().padStart(2, '0')}`;
      case 'year':
        return year.toString();
      default:
        return `${year}-${month.toString().padStart(2, '0')}`;
    }
  }

  getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  async getBookingTrends(months = 12) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const charters = await this.getChartersByDateRange(startDate, endDate);
    
    const trends = {
      bookingsByMonth: {},
      averageLeadTime: 0,
      seasonalTrends: {},
      packageTrends: {},
      cancellationRate: 0
    };

    let totalLeadTime = 0;
    let leadTimeCount = 0;
    let totalBookings = charters.data.length;
    let cancelledBookings = 0;

    charters.data.forEach(charter => {
      const bookingDate = new Date(charter.createdAt);
      const charterDate = new Date(charter.startDate);
      const monthKey = this.getPeriodKey(bookingDate, 'month');
      const season = this.getSeason(charterDate);

      // Bookings by month
      if (!trends.bookingsByMonth[monthKey]) {
        trends.bookingsByMonth[monthKey] = 0;
      }
      trends.bookingsByMonth[monthKey]++;

      // Lead time calculation
      const leadTime = Math.ceil((charterDate - bookingDate) / (1000 * 60 * 60 * 24));
      if (leadTime > 0) {
        totalLeadTime += leadTime;
        leadTimeCount++;
      }

      // Seasonal trends
      if (!trends.seasonalTrends[season]) {
        trends.seasonalTrends[season] = 0;
      }
      trends.seasonalTrends[season]++;

      // Package trends
      if (!trends.packageTrends[charter.packageType]) {
        trends.packageTrends[charter.packageType] = 0;
      }
      trends.packageTrends[charter.packageType]++;

      // Cancellation tracking
      if (charter.status === 'CANCELLED') {
        cancelledBookings++;
      }
    });

    trends.averageLeadTime = leadTimeCount > 0 ? totalLeadTime / leadTimeCount : 0;
    trends.cancellationRate = totalBookings > 0 ? (cancelledBookings / totalBookings) * 100 : 0;

    return trends;
  }

  getSeason(date) {
    const month = date.getMonth() + 1;
    if (month >= 3 && month <= 5) return 'Spring';
    if (month >= 6 && month <= 8) return 'Summer';
    if (month >= 9 && month <= 11) return 'Autumn';
    return 'Winter';
  }

  async generateDashboardData() {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      recentCharters,
      upcomingCharters,
      revenueReport,
      bookingTrends
    ] = await Promise.all([
      this.getChartersByDateRange(thirtyDaysAgo, now),
      this.getUpcomingCharters(30),
      this.getRevenueReport(thirtyDaysAgo, now, 'day'),
      this.getBookingTrends(6)
    ]);

    return {
      summary: {
        recentBookings: recentCharters.data.length,
        upcomingCharters: upcomingCharters.data.length,
        monthlyRevenue: revenueReport.totalRevenue,
        averageBookingValue: revenueReport.averageBookingValue,
        cancellationRate: bookingTrends.cancellationRate
      },
      charts: {
        dailyRevenue: revenueReport.revenueByPeriod,
        packageDistribution: revenueReport.revenueByPackage,
        seasonalTrends: bookingTrends.seasonalTrends,
        bookingTrends: bookingTrends.bookingsByMonth
      },
      metrics: {
        averageLeadTime: bookingTrends.averageLeadTime,
        totalCharters: recentCharters.pagination.total,
        conversionRate: this.calculateConversionRate(recentCharters.data)
      }
    };
  }

  calculateConversionRate(charters) {
    const totalInquiries = charters.length;
    const confirmedBookings = charters.filter(c => c.status === 'CONFIRMED' || c.status === 'COMPLETED').length;
    
    return totalInquiries > 0 ? (confirmedBookings / totalInquiries) * 100 : 0;
  }
}

// Usage Examples
const analytics = new CharterAnalytics('your-jwt-token');

// Generate revenue report
const revenueReport = await analytics.getRevenueReport(
  new Date('2024-01-01'),
  new Date('2024-12-31'),
  'month'
);

console.log('Revenue Report:', revenueReport);
console.log(`Total Revenue: €${revenueReport.totalRevenue.toFixed(2)}`);
console.log(`Average Booking: €${revenueReport.averageBookingValue.toFixed(2)}`);

// Get booking trends
const trends = await analytics.getBookingTrends(12);
console.log('Booking Trends:', trends);
console.log(`Average Lead Time: ${trends.averageLeadTime.toFixed(1)} days`);
console.log(`Cancellation Rate: ${trends.cancellationRate.toFixed(1)}%`);

// Generate dashboard data
const dashboardData = await analytics.generateDashboardData();
console.log('Dashboard Data:', dashboardData);
```

