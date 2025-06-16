export const isBrowser = () => typeof window !== "undefined";

export const safeLocalStorageSet = (key, value) => {
  if (!isBrowser()) return;
  localStorage.setItem(key, value);
};

export const safeLocalStorageGet = (key) => {
  if (!isBrowser()) return null;
  return localStorage.getItem(key);
};

export const safeLocalStorageRemove = (key) => {
  if (!isBrowser()) return;
  localStorage.removeItem(key);
};

export const getTokenExpiry = (token) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload.exp ? payload.exp * 1000 : null;
  } catch {
    return null;
  }
};

export const isExpired = (token) => {
  const expiry = getTokenExpiry(token);
  return expiry ? Date.now() >= expiry : true;
};
