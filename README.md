````markdown
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

### Generate and Save Token

```js
import { generateToken, saveToken } from 'jwt-user-helper';

const token = generateToken({ user: { id: 1, name: "Tariq" } }, "your-secret-key");
saveToken(token);
```

### Get Current User

```js
import { getCurrentUser } from 'jwt-user-helper';

const user = getCurrentUser("your-secret-key");
console.log(user); // { id: 1, name: "Tariq" }
```

### Check Authentication

```js
import { isAuthenticated } from 'jwt-user-helper';

const loggedIn = isAuthenticated("your-secret-key");
```

### Logout / Remove Token

```js
import { removeToken } from 'jwt-user-helper';

removeToken();
```

### Check if Token is Expired

```js
import { isTokenExpired } from 'jwt-user-helper';

if (isTokenExpired()) {
  // Do something, like auto-logout
}
```

---

## API Reference

------------------------------------------------------------------------------------
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
------------------------------------------------------------------------------------
---

## Browser Compatibility

* Works in all modern browsers.
* Does not work in Node.js (uses `localStorage`).

---

## License

MIT © [Tariq Mehmood](https://github.com/TariqMehmood1004)

```
