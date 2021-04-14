import { API_BASE_URL } from '../constants'
import { format } from '../utils/string'
import { apiCall } from './api-requests'

export const ENDPOINTS = {
  PLAYLISTS_BY_OFFERING: `${API_BASE_URL}Playlists/ByOffering/{0}`,
  VIDEOS_BY_PLAYLIST: `${API_BASE_URL}Playlists/{0}`,
}

export const getPlaylistsByOffering = async (offeringId) => {
  const url = format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)
  return apiCall(url)
}

export const getVideosByPlaylist = async (playlistId) => {
  const url = format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)
  return apiCall(url)
}
