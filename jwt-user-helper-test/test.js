// STEP 1: Mock localStorage
// Mock localStorage BEFORE using the library
global.localStorage = {
  _data: {},
  setItem(key, value) {
    this._data[key] = value;
  },
  getItem(key) {
    return this._data[key];
  },
  removeItem(key) {
    delete this._data[key];
  },
};

// Import after mocking
const {
  generateToken,
  saveToken,
  getCurrentUser,
  isAuthenticated,
  isTokenExpired,
  removeToken,
} = require("jwt-user-helper");

// STEP 2:
// Use a long-lasting and consistent secret
const secret = "my_super_secure_secret_123";

// STEP 3: Generate token valid for 1 hour
const token = generateToken({ user: { id: 123, name: "Tariq" } }, secret, "1h");
console.log("Generated Token:", token);

// STEP 4: Save token
saveToken(token);

// STEP 5: Get user from token
console.log("User:", getCurrentUser(secret)); // should NOT be null

// STEP 6: Check auth state
console.log("Is Authenticated?", isAuthenticated(secret)); // should be true

// STEP 7: Check token expiry
console.log("Is Token Expired?", isTokenExpired()); // should be false

// STEP 8: Logout
removeToken();
console.log("Token Removed:", getCurrentUser(secret)); // should be null
