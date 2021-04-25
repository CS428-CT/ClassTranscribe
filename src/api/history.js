import { apiCall, ENDPOINTS } from './api-requests'

export const getUserHistory = async () => {
  const url = ENDPOINTS.USER_WATCH_HISTORY
  return apiCall(url)
}
