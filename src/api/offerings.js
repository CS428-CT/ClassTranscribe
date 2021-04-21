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

  const sortedOfferings = offerings.sort((a, b) => {
    const courseA = a.courses[0].departmentAcronym
    const courseB = b.courses[0].departmentAcronym

    const lessThan = courseA < courseB ? -1 : 0
    return courseA > courseB ? 1 : lessThan
  })

  return sortedOfferings
}

/// ////////////////       STARRED OFFERING CALLS       //////////////////////

/**
 * Returns an array of all the starred offering data for the current user.
 * If no user is signed in, null is returned.
 * @returns Array of offerings data
 */
export const getStarredOfferingsData = async () => {
  let offerings = []

  const starredOfferings = getStarredOfferings()
  if (starredOfferings == null) return null

  for (const offeringId of Object.keys(starredOfferings)) {
    const offeringData = await getOfferingData(offeringId)
    if (offeringData != null) offerings.push(offeringData)
  }

  offerings = offerings.sort((a, b) => {
    const courseA = a.courses[0].departmentAcronym
    const courseB = b.courses[0].departmentAcronym

    const lessThan = courseA < courseB ? -1 : 0
    return courseA > courseB ? 1 : lessThan
  })

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
