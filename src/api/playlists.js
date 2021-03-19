import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'
import { format } from '../utils/string'

export const ENDPOINTS = {
  PLAYLISTS_BY_OFFERING: `${BASE_URL}Playlists/ByOffering/{0}`,
}

export const getPlaylistsByOffering = async (offeringId) => {
  const url = format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return null
    return resp.data
  } catch (error) {
    console.log(error)
  }

  return null
}
