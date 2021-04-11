import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'

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
