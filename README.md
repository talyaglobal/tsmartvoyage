# Postman Collection for TSmart Voyage API

This Postman collection provides a comprehensive set of API requests for testing and integrating with the TSmart Voyage API.

## 📥 Import Instructions

1. **Download the collection**: Save the `tsmart-voyage-api.postman_collection.json` file
2. **Open Postman**: Launch the Postman application
3. **Import**: Click "Import" button and select the downloaded file
4. **Set Environment**: Import the environment file and configure your variables

## 🔧 Environment Setup

Create a new environment in Postman with these variables:

```json
{
  "baseUrl": "https://api.tsmartvoyage.com/api",
  "authToken": "",
  "customerId": "",
  "yachtId": "",
  "charterId": ""
}
```

### Environment Variables
- **baseUrl**: API base URL (production/staging/local)
- **authToken**: JWT token (automatically set after login)
- **customerId**: Test customer ID for bookings
- **yachtId**: Test yacht ID for operations
- **charterId**: Test charter ID for management

## 📋 Collection Structure

### 1. Authentication
- **Login** - Get JWT token
- **Register** - Create new user account
- **Refresh Token** - Refresh expired token
- **Logout** - Invalidate token

### 2. Yachts
- **List Yachts** - Get all yachts with filtering
- **Get Yacht Details** - Fetch specific yacht information
- **Create Yacht** - Add new yacht (Manager+)
- **Update Yacht** - Modify yacht details (Manager+)
- **Delete Yacht** - Remove yacht (Admin only)
- **Search Available Yachts** - Find available yachts for dates

### 3. Customers
- **List Customers** - Get customer list (Manager+)
- **Get Customer** - Fetch customer details
- **Create Customer** - Register new customer
- **Update Customer** - Modify customer information
- **Delete Customer** - Remove customer (Admin only)

### 4. Charters
- **List Charters** - Get charter bookings
- **Get Charter Details** - Fetch specific charter
- **Create Charter** - Make new booking
- **Update Charter** - Modify booking details
- **Cancel Charter** - Cancel existing booking
- **Confirm Charter** - Confirm pending booking (Manager+)
- **Complete Charter** - Mark charter as completed (Manager+)

### 5. System
- **Health Check** - API status verification
- **Get Metrics** - System performance metrics (Admin only)

## 🚀 Quick Start Guide

### Step 1: Authentication
1. Run the **Login** request with your credentials
2. The JWT token will be automatically saved to `authToken` variable
3. All subsequent requests will use this token

### Step 2: Test Basic Operations
1. **List Yachts** - Verify yacht data retrieval
2. **Get Yacht Details** - Test specific yacht lookup
3. **List Customers** - Check customer management (if Manager+)

### Step 3: Test Booking Flow
1. **Search Available Yachts** - Find available yachts for your dates
2. **Create Charter** - Make a test booking
3. **Get Charter Details** - Verify booking creation
4. **Update Charter Status** - Test status management (if Manager+)

## 📝 Pre-request Scripts

The collection includes pre-request scripts that:
- Automatically set the Authorization header
- Generate test data for requests
- Validate environment variables
- Handle token refresh if needed

## 🧪 Test Scripts

Each request includes test scripts that:
- Validate response status codes
- Check response structure
- Verify data integrity
- Set variables for subsequent requests
- Generate test reports

## 🔍 Example Requests

### Authentication
```javascript
// Login Request
POST {{baseUrl}}/auth/login
{
  "email": "test@example.com",
  "password": "securePassword123"
}

// Auto-saves token to environment
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.environment.set("authToken", response.data.token);
});
```

### Yacht Search
```javascript
// Search Available Yachts
GET {{baseUrl}}/yachts?isAvailable=true&location=Cesme&minCapacity=8

// Test response structure
pm.test("Yachts returned", function () {
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.expect(response.data).to.be.an('array');
});
```

### Charter Booking
```javascript
// Create Charter
POST {{baseUrl}}/charters
{
  "yachtId": "{{yachtId}}",
  "customerId": "{{customerId}}",
  "startDate": "2024-07-15T00:00:00Z",
  "endDate": "2024-07-22T00:00:00Z",
  "packageType": "LUXURY",
  "guestCount": 8
}

// Save charter ID for future requests
pm.test("Charter created", function () {
    const response = pm.response.json();
    pm.environment.set("charterId", response.data.id);
});
```

## 🔧 Advanced Features

### Dynamic Variables
The collection uses dynamic variables for realistic testing:
- `{{$randomEmail}}` - Generate random email addresses
- `{{$randomFirstName}}` - Random first names
- `{{$randomDateFuture}}` - Future dates for bookings
- `{{$randomInt}}` - Random numbers for guest counts

### Conditional Requests
Some requests include conditional logic:
```javascript
// Only run if user is Manager or Admin
if (pm.environment.get("userRole") === "MANAGER" || 
    pm.environment.get("userRole") === "ADMIN") {
    // Execute request
} else {
    pm.test.skip("Insufficient permissions");
}
```

### Data-Driven Testing
Use CSV files for bulk testing:
1. Create CSV with test data
2. Use Postman Runner with data file
3. Run collection with multiple data sets

## 📊 Monitoring and Reports

### Newman CLI
Run the collection via command line:
```bash
# Install Newman
npm install -g newman

# Run collection
newman run tsmart-voyage-api.postman_collection.json \
  --environment production.postman_environment.json \
  --reporters cli,html \
  --reporter-html-export report.html
```

### Continuous Integration
Integrate with CI/CD pipelines:
```yaml
# GitHub Actions example
- name: Run API Tests
  run: |
    newman run collection.json \
      --environment ${{ secrets.POSTMAN_ENV }} \
      --reporters junit \
      --reporter-junit-export results.xml
```

## 🛠️ Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Verify credentials in environment
   - Check token expiration
   - Ensure proper role permissions

2. **Rate Limiting**
   - Add delays between requests
   - Use collection runner with intervals
   - Monitor rate limit headers

3. **Data Dependencies**
   - Ensure test data exists
   - Check foreign key relationships
   - Verify data cleanup between runs

### Debug Mode
Enable debug logging:
```javascript
// Add to pre-request script
console.log("Request URL:", pm.request.url);
console.log("Auth Token:", pm.environment.get("authToken"));
```

## 📞 Support

For issues with the Postman collection:
- **Email**: api-support@tsmartvoyage.com
- **Documentation**: https://docs.tsmartvoyage.com
- **GitHub Issues**: https://github.com/tsmartvoyage/api-docs/issues

---

**Happy Testing! 🚀**

