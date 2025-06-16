# jwt-user-helper

A lightweight, browser-friendly utility for handling JWT token generation, verification, storage in `localStorage`, and current user extraction. Designed for React, Next.js, or any frontend JavaScript project.

---

## Features

- Generate JWT tokens
- Verify and decode tokens
- Save and retrieve tokens from `localStorage`
- Get current user info from JWT payload
- Logout / remove token
- Token expiry checker
- Works only in the browser (safe for SSR)

---

## Installation

```npm install jwt-user-helper```

or

```yarn add jwt-user-helper```

---

## Usage

### Usage in Node.js | Server-side | React | Next.js

### STEP 1: Mock localStorage BEFORE using the library
```js
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
```
---

### STEP 2: Import the library
```js
const {
  generateToken,
  saveToken,
  getCurrentUser,
  isAuthenticated,
  isTokenExpired,
  removeToken,
} = require("jwt-user-helper");
```
---

### STEP 3: Define a secure secret key
```js
const secret = "my_super_secure_secret_123";
```
---

### STEP 4: Generate token with user payload and 1 hour expiration
```js
const token = generateToken({ user: { id: 123, name: "Tariq" } }, secret, "1h");
console.log("Generated Token:", token);
```
---

### STEP 5: Save token to localStorage
```saveToken(token);```
---

### STEP 6: Get user from stored token
```console.log("User:", getCurrentUser(secret)); // => { id: 123, name: "Tariq" }```
---

### STEP 7: Check authentication status
```console.log("Is Authenticated?", isAuthenticated(secret)); // => true```
---

### STEP 8: Check if token is expired
```console.log("Is Token Expired?", isTokenExpired()); // => false```
---

### STEP 9: Logout (removes token)
```js
removeToken();
console.log("Token Removed:", getCurrentUser(secret)); // => null
```
---

### Usage in Browser
```js
import {
  generateToken,
  saveToken,
  getCurrentUser,
  isAuthenticated,
  isTokenExpired,
  removeToken,
} from "jwt-user-helper";

const secret = "your_secure_key";
const token = generateToken({ user: { id: 1, name: "Alice" } }, secret, "1h");

saveToken(token);
console.log(getCurrentUser(secret)); // { id: 1, name: "Alice" }
```

---

## API Reference

| Function                                    | Description                        |
| ------------------------------------------- | ---------------------------------- |
| `generateToken(payload, secret, expiresIn)` | Generate a JWT token               |
| `verifyToken(token, secret)`                | Verify and decode JWT              |
| `saveToken(token)`                          | Save to localStorage               |
| `getToken()`                                | Get token from storage             |
| `removeToken()`                             | Delete token                       |
| `getCurrentUser(secret)`                    | Extract user from token            |
| `isAuthenticated(secret)`                   | Check if valid token exists        |
| `isTokenExpired()`                          | Returns `true` if token is expired |
---

## Browser Compatibility

* Works in all modern browsers.
* Does not work in Node.js (uses `localStorage`).

---

## Security
```node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"```

## License

MIT © [Tariq Mehmood](https://github.com/TariqMehmood1004)
