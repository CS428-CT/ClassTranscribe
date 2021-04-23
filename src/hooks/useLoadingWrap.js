import { useCallback } from 'react'
import { useLoadingIndicator } from './useLoadingIndicator'

/**
 * Custom hook for displaying a loading indicator while a function executes.
 * The hook returns a function that takes another function as a parameter.
 * The hooks returned function also returns a cleanup function for useEffect
 */
export const useLoadingWrap = () => {
  const setLoading = useLoadingIndicator()
  const loadingWrap = useCallback((func, effectId) => {
    ;(async (f, id) => {
      setLoading(true, id)
      try {
        await f()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false, id)
      }
    })(func, effectId)

    return () => setLoading(false, effectId)
  })

  return loadingWrap
}
