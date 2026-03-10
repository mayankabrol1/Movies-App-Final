const COUNTRY_TEXT_REGEX = /^[A-Za-z][A-Za-z\s\-']{1,55}$/;
const PHONE_ALLOWED_CHARS_REGEX = /^[0-9()\-\s]+$/;

export function normalizePhoneNumber(phoneNumber) {
  return String(phoneNumber || "").trim().replace(/\s+/g, " ");
}

export function normalizeCountry(country) {
  return String(country || "").trim();
}

export function validateCountry(country, allowedCountries = null) {
  const cleanCountry = normalizeCountry(country);
  if (!cleanCountry) return "Country is required.";
  if (!COUNTRY_TEXT_REGEX.test(cleanCountry)) return "Please select a valid country.";
  if (allowedCountries && !allowedCountries.has(cleanCountry)) return "Please select a country from the list.";
  return "";
}

export function validatePhoneFields({ phoneCode, phoneNumber, allowedCodes = null }) {
  const cleanCode = String(phoneCode || "").trim();
  const cleanNumber = normalizePhoneNumber(phoneNumber);
  if (!cleanCode) return "Country code is required.";
  if (!cleanCode.startsWith("+")) return "Country code must start with +.";
  if (!/^\+\d{1,4}$/.test(cleanCode)) return "Please select a valid country code.";
  if (allowedCodes && !allowedCodes.has(cleanCode)) return "Please select a supported country code.";
  if (!cleanNumber) return "Phone number is required.";
  if (!PHONE_ALLOWED_CHARS_REGEX.test(cleanNumber)) return "Phone number can contain only digits, spaces, (), and -.";
  const digitsOnly = cleanNumber.replace(/\D/g, "");
  if (digitsOnly.length < 6 || digitsOnly.length > 15) return "Phone number must contain 6 to 15 digits.";
  return "";
}

export function validateProfilePayload({ phoneCode, phoneNumber, country, allowedCodes, allowedCountries }) {
  const phoneError = validatePhoneFields({ phoneCode, phoneNumber, allowedCodes });
  if (phoneError) return phoneError;
  const countryError = validateCountry(country, allowedCountries);
  if (countryError) return countryError;
  return "";
}

