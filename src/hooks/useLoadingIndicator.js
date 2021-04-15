import { useContext } from "react"
import { REDUCER_ACTIONS } from "../constants";
import { Context } from "../store/Store"

/**
 * Custom hook that allows components to set a global loading indicator.
 * @returns A function that take a boolean. When the function is called with true, 
 *          the loading indicator is shown, else it is hidden.
 */
export const useLoadingIndicator = () => {
    const dispatch = useContext(Context)[1];
    const setLoading = useCallback(
        (isLoading) => {
            dispatch({
                type: REDUCER_ACTIONS.SET_LOADING,
                isLoading,
            })
        },
        [dispatch]
    )

    return setLoading;
}