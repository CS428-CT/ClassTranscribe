import { format } from '../utils/string'
import { apiCall, ENDPOINTS } from './api-requests'

export const getPlaylistsByOffering = async (offeringId) => {
  const url = format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)
  return apiCall(url)
}

export const getVideosByPlaylist = async (playlistId) => {
  const url = format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)
  return apiCall(url)
}
