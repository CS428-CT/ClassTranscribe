import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'
import { API_BASE_URL } from '../constants'
import { format } from '../utils/string'
import { apiCall } from './api-requests'

export const ENDPOINTS = {
  TRANSCRIPT: `${API_BASE_URL}Captions/ByTranscription/{0}`,
  MEDIA: `${API_BASE_URL}Media/{0}`,
}

export const getVideoTranscription = async (transcriptionId) => {
  const url = format(ENDPOINTS.TRANSCRIPT, transcriptionId)
  return apiCall(url)
}

export const getMedia = async (mediaId) => {
  const url = format(ENDPOINTS.MEDIA, mediaId.mediaId)
  return apiCall(url)
}
