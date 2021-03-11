import axios from 'axios'
import { HTTP_STATUS_CODES, BASE_URL } from '.'
import { format } from '../utils/string'
import { getCurrentAuthenticatedUser, isUserAuthenticated } from './auth'

export const ENDPOINTS = {
    OFFERING: "/api/Offerings/{0}"
}

export const getOfferingData = async (offeringId) => {
    const url = format(ENDPOINTS.OFFERING, offeringId);

    try {
        const resp = await axios.get(url);
        if (resp?.status !== HTTP_STATUS_CODES.OK) return null
        return resp
    } catch (error) {
        console.log(error)
    }
}

export const getStarredOfferingsData = async () => {
    let offerings = [];

    const starredOfferings = getStarredOfferings()
    for (const offeringId in Object.keys(starredOfferings)) {
        const offeringData = await getOfferingData(offeringId) 
        if (offeringData != null)
            offerings.push(offeringData) 
    }

    return offerings;
}

const getStarredOfferings = () => {
    if (!isUserAuthenticated())
        return null;

    const user = getCurrentAuthenticatedUser();
    if (user?.metadata?.starredOfferings == null)
        return null;
    
    return JSON.parse(user.metadata.starredOfferings);
}