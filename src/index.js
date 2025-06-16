const jwt = require("jsonwebtoken");
const {
  safeLocalStorageSet,
  safeLocalStorageGet,
  safeLocalStorageRemove,
  isExpired
} = require("./utils");

const JWT_KEY = "__auth_token__";

const generateToken = (payload, secret, expiresIn = "1h") =>
  jwt.sign(payload, secret, { expiresIn });

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

const saveToken = (token) => safeLocalStorageSet(JWT_KEY, token);
const getToken = () => safeLocalStorageGet(JWT_KEY);
const removeToken = () => safeLocalStorageRemove(JWT_KEY);

const getCurrentUser = (secret) => {
  const token = getToken();
  if (!token) return null;
  const decoded = verifyToken(token, secret);
  return decoded?.user || null;
};

const isAuthenticated = (secret) => {
  const token = getToken();
  return !!verifyToken(token, secret);
};

const isTokenExpired = () => {
  const token = getToken();
  return isExpired(token);
};

module.exports = {
  generateToken,
  verifyToken,
  saveToken,
  getToken,
  removeToken,
  getCurrentUser,
  isAuthenticated,
  isTokenExpired
};
