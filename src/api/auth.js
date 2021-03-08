// TODO: Add documentation
let currentAuthenticatedUser = null;

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