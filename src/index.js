import jwt from "jsonwebtoken";
import {
  safeLocalStorageSet,
  safeLocalStorageGet,
  safeLocalStorageRemove,
  isExpired,
} from "./utils.js";

const JWT_KEY = "__auth_token__";

export const generateToken = (payload, secret, expiresIn = "1h") => {
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
};

export const saveToken = (token) => safeLocalStorageSet(JWT_KEY, token);

export const getToken = () => safeLocalStorageGet(JWT_KEY);

export const removeToken = () => safeLocalStorageRemove(JWT_KEY);

export const getCurrentUser = (secret) => {
  const token = getToken();
  if (!token) return null;
  const decoded = verifyToken(token, secret);
  return decoded?.user || null;
};

export const isAuthenticated = (secret) => {
  const token = getToken();
  return !!verifyToken(token, secret);
};

export const isTokenExpired = () => {
  const token = getToken();
  return isExpired(token);
};
export const refreshToken = (secret) => {
  const token = getToken();
  if (!token || isExpired(token)) return null;
  
  const decoded = verifyToken(token, secret);
  if (!decoded) return null;

  const newToken = generateToken({ user: decoded.user }, secret, "1h");
  saveToken(newToken);
  return newToken;
};