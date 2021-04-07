import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'
import { API_BASE_URL } from '../constants'
import { format } from '../utils/string'

export const ENDPOINTS = {
  PLAYLISTS_BY_OFFERING: `${API_BASE_URL}Playlists/ByOffering/{0}`,
  VIDEOS_BY_PLAYLIST: `${API_BASE_URL}Playlists/{0}`,
}

export const getPlaylistsByOffering = async (offeringId) => {
  const url = format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return null
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getVideosByPlaylist = async (playlistId) => {
  const url = format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return null
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}
