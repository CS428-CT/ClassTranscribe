import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'
import { API_BASE_URL } from '../constants'

export const ENDPOINTS = {
  OFFERING: `${API_BASE_URL}Offerings/{0}`,
  OFFERINGBYSTUDENT: `${API_BASE_URL}Offerings/ByStudent`,
  PLAYLISTS_BY_OFFERING: `${API_BASE_URL}Playlists/ByOffering/{0}`,
  VIDEOS_BY_PLAYLIST: `${API_BASE_URL}Playlists/{0}`,
  UNIVERSITIES: `${API_BASE_URL}Universities/`,
  DEPARTMENTS: `${API_BASE_URL}Departments/ByUniversity/{0}`,
  COURSES: `${API_BASE_URL}Courses/ByDepartment/{0}`,
  TRANSCRIPT: `${API_BASE_URL}Captions/ByTranscription/{0}`,
  MEDIA: `${API_BASE_URL}Media/{0}`,
  USER_METADATA: `${API_BASE_URL}Account/GetUserMetadata/GetUserMetadata`,
  POST_USER_METADATA: `${API_BASE_URL}Account/PostUserMetadata/PostUserMetadata`,
  USER_WATCH_HISTORY: `${API_BASE_URL}WatchHistories/GetAllWatchedMediaForUser`
}

/**
 * Helper function to issue API calls to Class Transcribe back end
 *
 * @param url Pass in url of the API call that you'd like to issue
 * @returns Response data of API call
 */
export const apiCall = async (url) => {
  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return null
    return resp.data
  } catch (error) {
    console.error(error)
    return null
  }
}
