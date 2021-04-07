import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'
import { format } from '../utils/string'

export const ENDPOINTS = {
  TRANSCRIPT: `${BASE_URL}Captions/ByTranscription/{0}`,
  MEDIA: `${BASE_URL}Media/{0}`
}

// export const get = async (transcriptionId) => {
//     const url = format(ENDPOINTS.TRANSCRIPT, transcriptionId)
  
//     try {
//       const resp = await axios.get(url)
//       if (resp?.status !== HTTP_STATUS_CODES.OK) return null
//       return resp.data
//     } catch (error) {
//       console.error(error)
//     }
  
//     return null
// }

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
    console.log("URL")
    console.log(mediaId)
    console.log(url)
    

    try {
      const resp = await axios.get(url)
      if (resp?.status !== HTTP_STATUS_CODES.OK) return null
      return resp.data
    } catch (error) {
      console.error(error)
    }
  
    return null
}