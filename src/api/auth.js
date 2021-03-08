import { api, HTTP_STATUS_CODES } from ".";

// TODO: Add documentation
/**
 * Object contains the following attributes:
 *     - authToken: The user's authentication token
 *     - emailId: The user's email
 *     - metaData: An object containing user preferences, such as "starredOfferings"
 *     - universityId: ID of the user's university
 *     - userId: ID of user
 */
let currentAuthenticatedUser = null;

const ENDPOINTS = {
    SIGN_IN: "Account/TestSignIn"
}

/**
 * Returns the signed in user's data or null if no one is signed in.
 * See @currentAuthenticatedUser for the attributes returned in the object
 */
export const getCurrentAuthenticatedUser = () => {
    return currentAuthenticatedUser;
}

/**
 * @returns True if the user is authenticated, false otherwise
 */
export const isUserAuthenticated = () => {
    return currentAuthenticatedUser != null;
}

export const authenticateUser = async () => {
    let resp = await api.get(ENDPOINTS.SIGN_IN);
    console.log(resp);
    if (resp?.status != HTTP_STATUS_CODES.OK)
        return;

    currentAuthenticatedUser = resp.data;
}