import Cookies from 'js-cookie';

// Define the type for the cookie value (could be any object)
export type CookieValue = string | number | boolean | null;

// Set a cookie with a given name, value (JSON data), and optional options
export const setCookie = (
  name: string,
  value: CookieValue,
  options: Record<string, unknown> = {}
): void => {
  Cookies.set(name, JSON.stringify(value), options);
};

// Get the value of a cookie by its name and parse it as JSON
export const getCookie = <T = CookieValue>(name: string): T | null => {
  const cookieValue = Cookies.get(name);
  return cookieValue ? (JSON.parse(cookieValue) as T) : null;
};

// Remove a cookie by its name
export const removeCookie = (
  name: string,
  options: Record<string, unknown> = {}
): void => {
  Cookies.remove(name, options);
};

// Update an existing cookie"s value by its name
export const updateCookieData = (
  name: string,
  newValue: CookieValue,
  options: Record<string, unknown> = {}
): void => {
  const existingValue = getCookie<CookieValue>(name);
  if (existingValue !== null) {
    const updatedValue = {
      ...(typeof existingValue === 'object' && existingValue !== null
        ? existingValue
        : {}),
      ...(typeof newValue === 'object' && newValue !== null ? newValue : {}),
    }; // Merge existing and new values
    setCookie(name, JSON.stringify(updatedValue), options);
  }
};
