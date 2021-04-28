import { format } from '../utils/string'
import { apiCall, ENDPOINTS } from './api-requests'

/**
 * Fetches data about a media from its ID
 * @param {String} mediaId 
 * @returns The media data from the backend
 */
export const getMedia = async (mediaId) => {
  const url = format(ENDPOINTS.MEDIA, mediaId.mediaId)
  return apiCall(url)
}