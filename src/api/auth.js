import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'

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

export const authenticateUser = async () => {
  try {
    const resp = await axios.get(ENDPOINTS.SIGN_IN)
    if (resp?.status !== HTTP_STATUS_CODES.OK) return
    currentAuthenticatedUser = resp.data
  } catch (error) {
    console.log(error)
  }
}

export const signOutUser = async () => {
  currentAuthenticatedUser = null
}
