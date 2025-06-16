function isBrowser() {
  return typeof window !== "undefined" || typeof localStorage !== "undefined";
}

function safeLocalStorageSet(key, value) {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
}

function safeLocalStorageGet(key) {
  if (!isBrowser()) return null;
  return localStorage.getItem(key);
}

function safeLocalStorageRemove(key) {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
}

function getTokenExpiry(token) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(Buffer.from(base64Payload, "base64").toString());
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
}

function isExpired(token) {
  const expiry = getTokenExpiry(token);
  return expiry ? Date.now() >= expiry : true;
}

module.exports = {
  isBrowser,
  safeLocalStorageSet,
  safeLocalStorageGet,
  safeLocalStorageRemove,
  getTokenExpiry,
  isExpired,
};
