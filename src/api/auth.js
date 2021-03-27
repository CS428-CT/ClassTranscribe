import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'

/**
 * Interceptor signs every request with the token of the user.
 * If user is not authenticated, then nothing happens
 */
axios.interceptors.request.use(
  (request) => {
    const userData = getCurrentAuthenticatedUser()
    if (userData?.authToken != null) request.headers.Authorization = `Bearer ${userData.authToken}`
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

export const ENDPOINTS = {
  SIGN_IN: `${BASE_URL}Account/TestSignIn`,
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
  return currentAuthenticatedUser !== null
}

/**
 * Authenticates the user. The result is stored in currentAuthenticatedUser
 */
export const authenticateUser = async () => {
  try {
    const resp = await axios.get(ENDPOINTS.SIGN_IN)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return
    currentAuthenticatedUser = resp.data
  } catch (error) {
    console.error(error)
  }
}

/**
 * Terminates the current users session
 */
export const signOutUser = async () => {
  currentAuthenticatedUser = null
}
