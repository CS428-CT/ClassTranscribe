import { apiCall, ENDPOINTS } from './api-requests'

/**
 * Retrives the complete watch history of the current authenticated user
 * @returns Users watch history or NULL if error
 */
export const getUserHistory = async () => {
  const url = ENDPOINTS.USER_WATCH_HISTORY
  return apiCall(url)
}
