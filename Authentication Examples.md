# Authentication Examples

## Overview
This document provides practical examples for implementing authentication with the TSmart Voyage API.

## Basic Authentication Flow

### 1. User Registration

```javascript
// JavaScript/Node.js Example
async function registerUser(userData) {
  const response = await fetch('https://api.tsmartvoyage.com/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: 'USER' // Default role
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const result = await response.json();
  
  // Store the JWT token
  localStorage.setItem('authToken', result.data.token);
  
  return result.data;
}

// Usage
try {
  const user = await registerUser({
    email: 'john@example.com',
    password: 'securePassword123',
    firstName: 'John',
    lastName: 'Doe'
  });
  console.log('User registered:', user);
} catch (error) {
  console.error('Registration failed:', error.message);
}
```

```python
# Python Example
import requests
import json

def register_user(user_data):
    url = 'https://api.tsmartvoyage.com/api/auth/register'
    headers = {'Content-Type': 'application/json'}
    
    payload = {
        'email': user_data['email'],
        'password': user_data['password'],
        'firstName': user_data['firstName'],
        'lastName': user_data['lastName'],
        'role': 'USER'
    }
    
    response = requests.post(url, headers=headers, json=payload)
    
    if response.status_code != 201:
        error_data = response.json()
        raise Exception(f"Registration failed: {error_data['message']}")
    
    result = response.json()
    
    # Store token (example using a simple variable)
    auth_token = result['data']['token']
    
    return result['data']

# Usage
try:
    user = register_user({
        'email': 'john@example.com',
        'password': 'securePassword123',
        'firstName': 'John',
        'lastName': 'Doe'
    })
    print(f"User registered: {user}")
except Exception as e:
    print(f"Registration failed: {e}")
```

### 2. User Login

```javascript
// JavaScript/Node.js Example
async function loginUser(email, password) {
  const response = await fetch('https://api.tsmartvoyage.com/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const result = await response.json();
  
  // Store the JWT token
  localStorage.setItem('authToken', result.data.token);
  localStorage.setItem('user', JSON.stringify(result.data.user));
  
  return result.data;
}

// Usage
try {
  const authData = await loginUser('john@example.com', 'securePassword123');
  console.log('Login successful:', authData.user);
} catch (error) {
  console.error('Login failed:', error.message);
}
```

```php
<?php
// PHP Example
function loginUser($email, $password) {
    $url = 'https://api.tsmartvoyage.com/api/auth/login';
    $data = [
        'email' => $email,
        'password' => $password
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    
    if ($response === FALSE) {
        throw new Exception('Login request failed');
    }
    
    $result = json_decode($response, true);
    
    if (!$result['success']) {
        throw new Exception($result['message']);
    }
    
    // Store token in session
    session_start();
    $_SESSION['auth_token'] = $result['data']['token'];
    $_SESSION['user'] = $result['data']['user'];
    
    return $result['data'];
}

// Usage
try {
    $authData = loginUser('john@example.com', 'securePassword123');
    echo "Login successful: " . $authData['user']['firstName'];
} catch (Exception $e) {
    echo "Login failed: " . $e->getMessage();
}
?>
```

## Token Management

### 1. Making Authenticated Requests

```javascript
// JavaScript utility class for API calls
class TSMartAPI {
  constructor(baseUrl = 'https://api.tsmartvoyage.com/api') {
    this.baseUrl = baseUrl;
  }

  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  async makeAuthenticatedRequest(endpoint, options = {}) {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('No authentication token found');
    }

    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...defaultOptions,
      ...options
    });

    if (response.status === 401) {
      // Token expired or invalid
      this.handleAuthenticationError();
      throw new Error('Authentication failed');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  }

  handleAuthenticationError() {
    // Clear stored auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Redirect to login page
    window.location.href = '/login';
  }

  // Example authenticated API calls
  async getMyCharters() {
    return this.makeAuthenticatedRequest('/charters');
  }

  async createCharter(charterData) {
    return this.makeAuthenticatedRequest('/charters', {
      method: 'POST',
      body: JSON.stringify(charterData)
    });
  }
}

// Usage
const api = new TSMartAPI();

try {
  const charters = await api.getMyCharters();
  console.log('My charters:', charters);
} catch (error) {
  console.error('Failed to fetch charters:', error.message);
}
```

### 2. Token Refresh Strategy

```javascript
// Advanced token management with refresh logic
class TokenManager {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.refreshPromise = null;
  }

  isTokenExpired(token) {
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  async getValidToken() {
    if (!this.token || this.isTokenExpired(this.token)) {
      // Token is expired or missing
      if (this.refreshPromise) {
        // Already refreshing, wait for it
        return this.refreshPromise;
      }

      this.refreshPromise = this.refreshToken();
      return this.refreshPromise;
    }

    return this.token;
  }

  async refreshToken() {
    try {
      // In a real implementation, you might have a refresh token
      // For now, we'll redirect to login
      this.clearAuth();
      throw new Error('Token expired, please login again');
    } catch (error) {
      this.clearAuth();
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  clearAuth() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }
}

// Usage with API class
class AuthenticatedAPI extends TSMartAPI {
  constructor() {
    super();
    this.tokenManager = new TokenManager();
  }

  async makeAuthenticatedRequest(endpoint, options = {}) {
    try {
      const token = await this.tokenManager.getValidToken();
      
      const defaultOptions = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers
        }
      };

      return super.makeRequest(endpoint, { ...defaultOptions, ...options });
    } catch (error) {
      if (error.message.includes('Token expired')) {
        // Redirect to login
        window.location.href = '/login';
      }
      throw error;
    }
  }
}
```

## Role-Based Access Control

```javascript
// User role management
class UserManager {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  getCurrentUser() {
    return this.user;
  }

  hasRole(role) {
    return this.user && this.user.role === role;
  }

  hasAnyRole(roles) {
    return this.user && roles.includes(this.user.role);
  }

  canManageYachts() {
    return this.hasAnyRole(['MANAGER', 'ADMIN']);
  }

  canDeleteYachts() {
    return this.hasRole('ADMIN');
  }

  canViewAllCharters() {
    return this.hasAnyRole(['MANAGER', 'ADMIN']);
  }
}

// Usage in UI components
const userManager = new UserManager();

// Show/hide UI elements based on permissions
if (userManager.canManageYachts()) {
  document.getElementById('yacht-management-panel').style.display = 'block';
}

if (userManager.canDeleteYachts()) {
  document.getElementById('delete-yacht-button').style.display = 'block';
}

// API calls with role checking
async function deleteYacht(yachtId) {
  if (!userManager.canDeleteYachts()) {
    throw new Error('Insufficient permissions to delete yachts');
  }

  const api = new AuthenticatedAPI();
  return api.makeAuthenticatedRequest(`/yachts/${yachtId}`, {
    method: 'DELETE'
  });
}
```

## Error Handling

```javascript
// Comprehensive error handling for authentication
class AuthErrorHandler {
  static handle(error, context = '') {
    console.error(`Authentication error in ${context}:`, error);

    switch (error.status) {
      case 401:
        this.handleUnauthorized(error);
        break;
      case 403:
        this.handleForbidden(error);
        break;
      case 429:
        this.handleRateLimit(error);
        break;
      default:
        this.handleGenericError(error);
    }
  }

  static handleUnauthorized(error) {
    // Clear auth data and redirect to login
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Show user-friendly message
    this.showMessage('Your session has expired. Please log in again.', 'warning');
    
    // Redirect after a short delay
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  }

  static handleForbidden(error) {
    this.showMessage('You do not have permission to perform this action.', 'error');
  }

  static handleRateLimit(error) {
    const resetTime = error.headers?.get('X-RateLimit-Reset');
    const resetDate = resetTime ? new Date(resetTime * 1000) : null;
    
    const message = resetDate 
      ? `Rate limit exceeded. Try again after ${resetDate.toLocaleTimeString()}.`
      : 'Rate limit exceeded. Please try again later.';
    
    this.showMessage(message, 'warning');
  }

  static handleGenericError(error) {
    const message = error.message || 'An unexpected error occurred.';
    this.showMessage(message, 'error');
  }

  static showMessage(message, type) {
    // Implementation depends on your UI framework
    console.log(`${type.toUpperCase()}: ${message}`);
    
    // Example with a simple alert (replace with your notification system)
    alert(message);
  }
}

// Usage
try {
  const result = await api.makeAuthenticatedRequest('/charters');
} catch (error) {
  AuthErrorHandler.handle(error, 'fetching charters');
}
```

## Security Best Practices

### 1. Token Storage

```javascript
// Secure token storage utility
class SecureStorage {
  static setToken(token) {
    // In production, consider using secure HTTP-only cookies
    // or encrypted localStorage
    localStorage.setItem('authToken', token);
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static clearToken() {
    localStorage.removeItem('authToken');
  }

  // For sensitive applications, implement encryption
  static setEncryptedToken(token, key) {
    const encrypted = this.encrypt(token, key);
    localStorage.setItem('authToken', encrypted);
  }

  static getDecryptedToken(key) {
    const encrypted = localStorage.getItem('authToken');
    return encrypted ? this.decrypt(encrypted, key) : null;
  }

  // Simple encryption (use a proper library in production)
  static encrypt(text, key) {
    // Implementation would use a proper encryption library
    return btoa(text); // This is NOT secure, just for example
  }

  static decrypt(encryptedText, key) {
    // Implementation would use a proper decryption library
    return atob(encryptedText); // This is NOT secure, just for example
  }
}
```

### 2. Request Validation

```javascript
// Input validation for authentication
class AuthValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static validatePassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  static validateRegistrationData(data) {
    const errors = [];

    if (!data.email || !this.validateEmail(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.password || !this.validatePassword(data.password)) {
      errors.push('Password must be at least 8 characters with uppercase, lowercase, and number');
    }

    if (!data.firstName || data.firstName.trim().length < 1) {
      errors.push('First name is required');
    }

    if (!data.lastName || data.lastName.trim().length < 1) {
      errors.push('Last name is required');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

// Usage
const registrationData = {
  email: 'user@example.com',
  password: 'SecurePass123',
  firstName: 'John',
  lastName: 'Doe'
};

const validation = AuthValidator.validateRegistrationData(registrationData);

if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
  // Show errors to user
} else {
  // Proceed with registration
  await registerUser(registrationData);
}
```

