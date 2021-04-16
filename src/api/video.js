import { format } from '../utils/string'
import { apiCall, ENDPOINTS } from './api-requests'

export const getVideoTranscription = async (transcriptionId) => {
  const url = format(ENDPOINTS.TRANSCRIPT, transcriptionId)
  return apiCall(url)
}

export const getMedia = async (mediaId) => {
  const url = format(ENDPOINTS.MEDIA, mediaId.mediaId)
  return apiCall(url)
}
