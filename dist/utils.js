"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeLocalStorageSet = exports.safeLocalStorageRemove = exports.safeLocalStorageGet = exports.isExpired = exports.isBrowser = exports.getTokenExpiry = void 0;
var isBrowser = exports.isBrowser = function isBrowser() {
  return typeof window !== "undefined";
};
var safeLocalStorageSet = exports.safeLocalStorageSet = function safeLocalStorageSet(key, value) {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
};
var safeLocalStorageGet = exports.safeLocalStorageGet = function safeLocalStorageGet(key) {
  if (!isBrowser()) return null;
  return localStorage.getItem(key);
};
var safeLocalStorageRemove = exports.safeLocalStorageRemove = function safeLocalStorageRemove(key) {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
};
var getTokenExpiry = exports.getTokenExpiry = function getTokenExpiry(token) {
  try {
    var base64Payload = token.split(".")[1];
    var payload = JSON.parse(atob(base64Payload));
    return payload.exp ? payload.exp * 1000 : null;
  } catch (_unused) {
    return null;
  }
};
var isExpired = exports.isExpired = function isExpired(token) {
  var expiry = getTokenExpiry(token);
  return expiry ? Date.now() >= expiry : true;
};