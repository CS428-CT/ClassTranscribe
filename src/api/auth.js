import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'
import { REFERRER_URL } from '../constants'
import { ENDPOINTS } from './api-requests'

/**
 * Interceptor signs every request with the token of the user.
 * If user is not authenticated, then nothing happens
 */
axios.interceptors.request.use(
  (request) => {
    const userData = getCurrentAuthenticatedUser()
    if (userData?.authToken != null) request.headers.Authorization = `Bearer ${userData.authToken}`
    request.headers.referer = REFERRER_URL
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Object contains the following attributes:
 *     - authToken: The user's authentication token
 *     - emailId: The user's email
 *     - metaData: An object containing user preferences, such as "starredOfferings"
 *     - universityId: ID of the user's university
 *     - userId: ID of user
 */
let currentAuthenticatedUser = null

/**
 * Gets all metdata for the authenticted user and stores it locally. Metdata includes starred courses.
 */
export const getUserMetadata = async () => {
  if (!isUserAuthenticated()) return

  try {
    const resp = await axios.get(ENDPOINTS.USER_METADATA)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return
    currentAuthenticatedUser.metadata = {}
    currentAuthenticatedUser.metadata.starredOfferings = resp.data.starredOfferings
  } catch (error) {
    console.error(error)
  }
}

/**
 * Set the authorization token for the current authenticated user
 * @param authToken Pass in the auth token so user can watch CT videos
 */
export const setAuthToken = (token) => {
  if (!currentAuthenticatedUser) currentAuthenticatedUser = {}
  currentAuthenticatedUser.authToken = token
}

/**
 * Initialize user's data using the metadata that is passed in during authorization
 * @param userData Pass in userData to obtain each user's information
 */
export const setUserData = (userData) => {
  if (!currentAuthenticatedUser) currentAuthenticatedUser = {}
  currentAuthenticatedUser.userId = userData?.userId
  currentAuthenticatedUser.universityId = userData?.universityId
  currentAuthenticatedUser.emailId = userData?.emailId
}

/**
 * Returns the signed in user's data or null if no one is signed in.
 * See @currentAuthenticatedUser for the attributes returned in the object
 */
export const getCurrentAuthenticatedUser = () => {
  return currentAuthenticatedUser
}

/**
 * @returns True if the user is authenticated, false otherwise
 */
export const isUserAuthenticated = () => {
  return currentAuthenticatedUser != null
}

/**
 * Terminates the current users session
 */
export const signOutUser = async () => {
  currentAuthenticatedUser = null
}
