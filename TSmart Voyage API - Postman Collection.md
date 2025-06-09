# TSmart Voyage API - Postman Collection

Complete Postman collection for testing and integrating with the TSmart Voyage API.

## 🌐 Environment URLs

- **Production**: https://api.tsmartvoyage.com/api
- **Staging**: https://staging-api.tsmartvoyage.com/api
- **Documentation**: https://docs.tsmartvoyage.com

## 📥 Import Collection

### Method 1: Direct Import
1. Open Postman
2. Click "Import" button
3. Select "Link" tab
4. Enter: `https://docs.tsmartvoyage.com/postman/collection.json`
5. Click "Continue" and "Import"

### Method 2: File Import
1. Download the collection file from this repository
2. Open Postman
3. Click "Import" button
4. Drag and drop the `collection.json` file
5. Click "Import"

## ⚙️ Environment Setup

### 1. Create Environment
1. Click the gear icon (⚙️) in the top right
2. Click "Add" to create a new environment
3. Name it "TSmart Voyage - Production" (or "Staging")

### 2. Set Environment Variables

| Variable | Production Value | Staging Value | Description |
|----------|------------------|---------------|-------------|
| `baseUrl` | `https://api.tsmartvoyage.com/api` | `https://staging-api.tsmartvoyage.com/api` | API base URL |
| `authToken` | `{{authToken}}` | `{{authToken}}` | JWT token (auto-set) |
| `refreshToken` | `{{refreshToken}}` | `{{refreshToken}}` | Refresh token (auto-set) |
| `userId` | `{{userId}}` | `{{userId}}` | Current user ID (auto-set) |
| `yachtId` | `yacht-uuid-here` | `yacht-uuid-here` | Test yacht ID |
| `charterId` | `charter-uuid-here` | `charter-uuid-here` | Test charter ID |

### 3. Authentication Setup

The collection includes automatic token management:

1. **Login Request**: Sets `authToken` and `refreshToken` automatically
2. **Auto-refresh**: Tokens are refreshed when they expire
3. **Headers**: Authorization header is set automatically for protected endpoints

## 📁 Collection Structure

### 🔐 Authentication
- **POST** Login - Authenticate user and get JWT token
- **POST** Register - Create new user account
- **POST** Refresh Token - Get new access token
- **GET** Profile - Get current user profile

### ⛵ Yacht Management
- **GET** List Yachts - Get paginated yacht list with filtering
- **GET** Yacht Details - Get detailed yacht information
- **POST** Create Yacht - Add new yacht (Manager+ role)
- **PUT** Update Yacht - Modify yacht details (Manager+ role)
- **DELETE** Delete Yacht - Remove yacht (Admin role)
- **GET** Yacht Availability - Check availability for dates

### 📅 Charter Booking
- **GET** List Charters - Get user's or all charters (role-based)
- **GET** Charter Details - Get specific charter information
- **POST** Create Charter - Book a yacht charter
- **PATCH** Update Charter Status - Change booking status (Manager+ role)
- **DELETE** Cancel Charter - Cancel a booking

### 👥 Customer Management
- **GET** List Customers - Get customer list (Manager+ role)
- **GET** Customer Details - Get customer profile and history
- **PUT** Update Customer - Modify customer information
- **GET** Customer Charters - Get customer's booking history

### 📊 Analytics & Reports
- **GET** Booking Analytics - Revenue and booking statistics
- **GET** Yacht Performance - Individual yacht metrics
- **GET** Revenue Report - Financial reporting data
- **GET** Popular Destinations - Location analytics

### 🔧 System
- **GET** Health Check - API health status
- **GET** System Metrics - Performance metrics
- **GET** API Version - Current API version info

## 🧪 Test Scripts

Each request includes comprehensive test scripts:

### Authentication Tests
```javascript
// Login request test
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    
    // Auto-set environment variables
    pm.environment.set("authToken", response.data.token);
    pm.environment.set("refreshToken", response.data.refreshToken);
    pm.environment.set("userId", response.data.user.id);
});

pm.test("Token is valid JWT", function () {
    const token = pm.environment.get("authToken");
    pm.expect(token).to.match(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
});
```

### Yacht Management Tests
```javascript
// List yachts test
pm.test("Yachts list returned", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.expect(response.data).to.be.an('array');
    
    if (response.data.length > 0) {
        pm.environment.set("yachtId", response.data[0].id);
    }
});

pm.test("Pagination info present", function () {
    const response = pm.response.json();
    pm.expect(response.pagination).to.have.property('page');
    pm.expect(response.pagination).to.have.property('total');
});
```

### Charter Booking Tests
```javascript
// Create charter test
pm.test("Charter booking created", function () {
    pm.response.to.have.status(201);
    const response = pm.response.json();
    pm.expect(response.success).to.be.true;
    pm.expect(response.data).to.have.property('id');
    
    pm.environment.set("charterId", response.data.id);
});

pm.test("Price calculation correct", function () {
    const response = pm.response.json();
    pm.expect(response.data.totalPrice).to.be.a('number');
    pm.expect(response.data.totalPrice).to.be.above(0);
});
```

## 🔄 Pre-request Scripts

### Automatic Token Refresh
```javascript
// Check if token is expired and refresh if needed
const token = pm.environment.get("authToken");
if (token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp < now + 300) { // Refresh if expires in 5 minutes
        pm.sendRequest({
            url: pm.environment.get("baseUrl") + "/auth/refresh",
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: {
                mode: 'raw',
                raw: JSON.stringify({
                    refreshToken: pm.environment.get("refreshToken")
                })
            }
        }, function (err, response) {
            if (!err && response.code === 200) {
                const data = response.json().data;
                pm.environment.set("authToken", data.token);
                pm.environment.set("refreshToken", data.refreshToken);
            }
        });
    }
}
```

### Dynamic Data Generation
```javascript
// Generate test data for requests
pm.environment.set("randomEmail", `test${Math.floor(Math.random() * 10000)}@example.com`);
pm.environment.set("randomPhone", `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`);
pm.environment.set("futureDate", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString());
```

## 🎯 Test Scenarios

### Complete Booking Flow
1. **Register/Login** - Authenticate as customer
2. **List Yachts** - Browse available yachts
3. **Get Yacht Details** - View specific yacht
4. **Check Availability** - Verify dates are free
5. **Create Charter** - Book the yacht
6. **Get Charter Details** - Confirm booking
7. **Update Status** - Manager confirms booking

### Yacht Management Flow
1. **Login as Manager** - Authenticate with manager role
2. **Create Yacht** - Add new yacht to fleet
3. **Update Yacht** - Modify yacht details
4. **List Yachts** - Verify yacht appears
5. **Get Analytics** - Check yacht performance

### Error Handling Tests
1. **Invalid Credentials** - Test authentication errors
2. **Unauthorized Access** - Test role-based restrictions
3. **Validation Errors** - Test input validation
4. **Rate Limiting** - Test request limits
5. **Not Found** - Test missing resources

## 📊 Collection Runner

### Automated Testing
1. Click "Runner" in Postman
2. Select "TSmart Voyage API" collection
3. Choose environment (Production/Staging)
4. Select test scenarios to run
5. Click "Run TSmart Voyage API"

### CI/CD Integration
```bash
# Install Newman CLI
npm install -g newman

# Run collection with environment
newman run collection.json \
  --environment production.json \
  --reporters cli,json \
  --reporter-json-export results.json

# Run specific folder
newman run collection.json \
  --folder "Authentication" \
  --environment staging.json
```

## 🔍 Monitoring & Debugging

### Response Validation
Each request validates:
- HTTP status codes
- Response structure
- Data types and formats
- Business logic rules
- Performance thresholds

### Error Logging
```javascript
// Log errors for debugging
pm.test("Request successful", function () {
    if (pm.response.code >= 400) {
        console.log("Error Response:", pm.response.json());
        console.log("Request URL:", pm.request.url);
        console.log("Request Headers:", pm.request.headers);
    }
    pm.response.to.have.status(200);
});
```

## 📞 Support

- **Technical Issues**: api-support@tsmartvoyage.com
- **Collection Updates**: Check https://docs.tsmartvoyage.com/postman
- **Feature Requests**: Submit via GitHub Issues

## 📄 Collection Changelog

### v1.2.0 (Latest)
- Added analytics endpoints
- Improved error handling tests
- Added automatic token refresh
- Enhanced test coverage

### v1.1.0
- Added customer management endpoints
- Improved pre-request scripts
- Added bulk operation tests

### v1.0.0
- Initial collection release
- Core authentication and booking flows
- Basic yacht management

---

**Happy Testing! 🧪⛵**

Download the collection and start testing the TSmart Voyage API today!

