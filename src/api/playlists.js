import { format } from '../utils/string'
import { apiCall, ENDPOINTS } from './api-requests'

/**
 * Fetches a list of all playlists in an offering
 * @param {String} offeringId The offering ID to get playlists for
 * @returns An array of playlists or NULL if error
 */
export const getPlaylistsByOffering = async (offeringId) => {
  const url = format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)
  return apiCall(url)
}

/**
 * Fetches a list of all videos in a playlist
 * @param {String} playlistId The playlist ID to get videos for
 * @returns An array of video data or NULL if error
 */
export const getVideosByPlaylist = async (playlistId) => {
  const url = format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)
  return apiCall(url)
}
