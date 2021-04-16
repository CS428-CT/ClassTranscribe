import { useLoadingIndicator } from "./useLoadingIndicator"
import { useCallback } from 'react'

/**
 * Custom hook for displaying a loading indicator while a function executes.
 * The hook returns a function that takes another function as a parameter.
 * The hooks returned function also returns a cleanup function for useEffect
 */
export const useLoadingWrap = () => {
  const setLoading = useLoadingIndicator();
  const loadingWrap = useCallback(
      (func) => {
        (async (func) => {
            setLoading(true);
            try {
                await func();
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })(func)

        return () => setLoading(false);
      }
  )

  return loadingWrap;
}