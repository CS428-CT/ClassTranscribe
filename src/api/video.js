import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'
import { API_BASE_URL } from '../constants'
import { format } from '../utils/string'

export const ENDPOINTS = {
  TRANSCRIPT: `${API_BASE_URL}Captions/ByTranscription/{0}`,
  MEDIA: `${API_BASE_URL}Media/{0}`,
}

export const getVideoTranscription = async (transcriptionId) => {
  const url = format(ENDPOINTS.TRANSCRIPT, transcriptionId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return null
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getMedia = async (mediaId) => {
  const url = format(ENDPOINTS.MEDIA, mediaId.mediaId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return null
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}
