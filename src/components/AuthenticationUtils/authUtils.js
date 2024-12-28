import {jwtDecode} from 'jwt-decode';

/**
 * Validates a JWT token.
 * @param {string} token - The JWT token to validate.
 * @returns {boolean} - Returns true if the token is valid, otherwise false.
 */
export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);

    // Check if the token has expired
    if (decoded.exp * 1000 < Date.now()) {
      return false; // Token is expired
    }

    return true; // Token is valid
  } catch (error) {
    console.error('Invalid token:', error);
    return false; // Token is invalid
  }
};
