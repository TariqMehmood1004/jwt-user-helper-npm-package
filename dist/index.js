"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.saveToken = exports.removeToken = exports.refreshToken = exports.isTokenExpired = exports.isAuthenticated = exports.getToken = exports.getCurrentUser = exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _utils = require("./utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var JWT_KEY = "__auth_token__";
var generateToken = exports.generateToken = function generateToken(payload, secret) {
  var expiresIn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "1h";
  return _jsonwebtoken["default"].sign(payload, secret, {
    expiresIn: expiresIn
  });
};
var verifyToken = exports.verifyToken = function verifyToken(token, secret) {
  try {
    return _jsonwebtoken["default"].verify(token, secret);
  } catch (_unused) {
    return null;
  }
};
var saveToken = exports.saveToken = function saveToken(token) {
  return (0, _utils.safeLocalStorageSet)(JWT_KEY, token);
};
var getToken = exports.getToken = function getToken() {
  return (0, _utils.safeLocalStorageGet)(JWT_KEY);
};
var removeToken = exports.removeToken = function removeToken() {
  return (0, _utils.safeLocalStorageRemove)(JWT_KEY);
};
var getCurrentUser = exports.getCurrentUser = function getCurrentUser(secret) {
  var token = getToken();
  if (!token) return null;
  var decoded = verifyToken(token, secret);
  return (decoded === null || decoded === void 0 ? void 0 : decoded.user) || null;
};
var isAuthenticated = exports.isAuthenticated = function isAuthenticated(secret) {
  var token = getToken();
  return !!verifyToken(token, secret);
};
var isTokenExpired = exports.isTokenExpired = function isTokenExpired() {
  var token = getToken();
  return (0, _utils.isExpired)(token);
};
var refreshToken = exports.refreshToken = function refreshToken(secret) {
  var token = getToken();
  if (!token || (0, _utils.isExpired)(token)) return null;
  var decoded = verifyToken(token, secret);
  if (!decoded) return null;
  var newToken = generateToken({
    user: decoded.user
  }, secret, "1h");
  saveToken(newToken);
  return newToken;
};