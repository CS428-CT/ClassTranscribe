import { format } from '../utils/string'
import { getCurrentAuthenticatedUser, isUserAuthenticated } from './auth'
import { apiCall, ENDPOINTS } from './api-requests'

/**
 * Gets the data for an offering from the CT API
 * @param {string} offeringId
 * @returns The offering data
 */
export const getOfferingData = async (offeringId) => {
  const url = format(ENDPOINTS.OFFERING, offeringId)
  return apiCall(url)
}

/// ////////////////       STUDENT OFFERING FUNCTIONS       ////////////////////

/**
 * Gets the data for an offering from the CT API if the student is authenticated
 * @returns The offering data
 */
export const getOfferingsByStudent = async () => {
  if (!isUserAuthenticated()) return null

  const url = ENDPOINTS.OFFERINGBYSTUDENT
  return apiCall(url)
}

/**
 * Returns an array of all the offering data for the current user.
 * If no user is signed in, null is returned.
 * @returns Array of offerings data
 */
export const getOfferingsData = async () => {
  const offerings = []
  const requests = []

  const studentOfferings = await getOfferingsByStudent()
  if (studentOfferings == null) return null

  for (const entry of studentOfferings) {
    requests.push(
      new Promise((resolve) => {
        getOfferingData(entry.offering.id).then((offeringData) => {
          if (offeringData != null) offerings.push(offeringData)
          resolve()
        })
      })
    )
  }

  await Promise.all(requests).catch((e) => console.error(e))

  return offerings
}

/// ////////////////       STARRED OFFERING CALLS       //////////////////////

/**
 * Returns an array of all the starred offering data for the current user.
 * If no user is signed in, null is returned.
 * @returns Array of offerings data
 */
export const getStarredOfferingsData = async () => {
  const offerings = []

  const starredOfferings = getStarredOfferings()
  if (starredOfferings == null) return null

  for (const offeringId of Object.keys(starredOfferings)) {
    const offeringData = await getOfferingData(offeringId)
    if (offeringData != null) offerings.push(offeringData)
  }

  return offerings
}

/**
 * Gets the starred offering course IDs for the current user.
 * If no user is signed in, null is returned
 * @returns An object, where each key is the starred course ID and each value is 'starred'.
 */
export const getStarredOfferings = () => {
  if (!isUserAuthenticated()) return null

  const user = getCurrentAuthenticatedUser()
  if (user?.metadata?.starredOfferings == null) return null

  return JSON.parse(user.metadata.starredOfferings)
}

/**
 * Adds the given starred offering to the users list of starred offerings
 * @param {String} offeringID The offering ID to add
 * @returns true if the post was successful
 */
export const addStarredOferring = async (offeringID) => {
  if (!isUserAuthenticated()) return false

  const offerings = getStarredOfferings()
  offerings[offeringID] = 'starred'

  const user = getCurrentAuthenticatedUser()
  user.metadata.starredOfferings = JSON.stringify(offerings)

  const request = { starredOfferings: user.metadata.starredOfferings }
  const resp = await axios.post(ENDPOINTS.POST_USER_METADATA, request)
  if (resp?.status !== HTTP_STATUS_CODES.OK) return false
  return true
}

/**
 * Removes the given starred offering from the users list of starred offerings
 * @param {String} offeringID The offering ID to remove
 */
export const removeStarredOffering = async (offeringID) => {
  if (!isUserAuthenticated()) return false

  const offerings = getStarredOfferings()
  delete offerings[offeringID]

  const user = getCurrentAuthenticatedUser()
  user.metadata.starredOfferings = JSON.stringify(offerings)

  const request = { starredOfferings: user.metadata.starredOfferings }
  const resp = await axios.post(ENDPOINTS.POST_USER_METADATA, request)
  if (resp?.status !== HTTP_STATUS_CODES.OK) return false
  return true
}
