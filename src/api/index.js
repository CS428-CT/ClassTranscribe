import axios from "axios"
import { getCurrentAuthenticatedUser, isUserAuthenticated } from "./auth";

export const BASE_URL = 'https://classtranscribe-dev.ncsa.illinois.edu/api/'

/**
 * Interceptor signs every request with the token of the user.
 * If user is not authenticated, then nothing happens
 */
axios.interceptors.request.use((request) => {
  const userData = getCurrentAuthenticatedUser();
  if (userData?.authToken != null)
    request.headers.Authorization = `Bearer ${userData.authToken}`;
  return request
}, (error) => {
  return Promise.reject(error);
});

export const HTTP_STATUS_CODES = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
}
