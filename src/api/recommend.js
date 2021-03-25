import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'
import { format } from '../utils/string'
import { getVideosByPlaylist } from './playlists'

export const ENDPOINTS = {
  PLAYLISTS_BY_OFFERING: `${BASE_URL}Playlists/ByOffering/{0}`,
  VIDEOS_BY_PLAYLIST: `${BASE_URL}Playlists/{0}`,
}