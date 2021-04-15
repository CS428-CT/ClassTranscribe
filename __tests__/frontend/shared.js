/**
 * Sleeps and blocks for the specified time
 * @param {Number} timeMs Time to sleep in MS
 */
export const sleepMs = (timeMs) => {
    return new Promise(resolve => setTimeout(resolve, timeMs));
}