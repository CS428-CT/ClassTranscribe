import axios from 'axios'
import { HTTP_STATUS_CODES } from '.'
import { API_BASE_URL } from '../constants'
import { format } from '../utils/string'
import { getCurrentAuthenticatedUser, isUserAuthenticated } from './auth'

export const ENDPOINTS = {
  OFFERING: `${API_BASE_URL}Offerings/{0}`,
  OFFERINGBYSTUDENT: `${API_BASE_URL}Offerings/ByStudent`,
}

/**
 * Gets the data for an offering from the CT API
 * @param {string} offeringId
 * @returns The offering data
 */
export const getOfferingData = async (offeringId) => {
  const url = format(ENDPOINTS.OFFERING, offeringId)

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) {
      return null
    }
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

/// ////////////////       STUDENT OFFERING FUNCTIONS       ////////////////////

/**
 * Gets the data for an offering from the CT API if the student is authenticated
 * @returns The offering data
 */
export const getOfferingsByStudent = async () => {
  if (!isUserAuthenticated()) return null

  const url = ENDPOINTS.OFFERINGBYSTUDENT

  try {
    const resp = await axios.get(url)
    if (resp?.status !== HTTP_STATUS_CODES.OK) {
      return null
    }
    return resp.data
  } catch (error) {
    console.error(error)
  }

  return null
}

/**
 * Returns an array of all the offering data for the current user.
 * If no user is signed in, null is returned.
 * @returns Array of offerings data
 */
export const getOfferingsData = async () => {
  const offerings = []

  const studentOfferings = await getOfferingsByStudent()
  if (studentOfferings == null) return null

  for (const entry of studentOfferings) {
    const offeringData = await getOfferingData(entry.offering.id)
    if (offeringData != null) offerings.push(offeringData)
  }

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
