import { useContext, useCallback, useEffect } from 'react'
import { REDUCER_ACTIONS } from '../constants'
import { Context } from '../store/Store'

/**
 * Custom hook that allows components to set a global loading indicator.
 * @returns A function that take a boolean. When the function is called with true,
 *          the loading indicator is shown, else it is hidden.
 */
export const useLoadingIndicator = () => {
  const [state, dispatch] = useContext(Context)

  const areAllEffectsDoneLoading = () => {
    for (const i in state.effectStatuses) {
      if (state.effectStatuses[i]) return false
    }

    return true
  }

  useEffect(() => {
    const isLoading = !areAllEffectsDoneLoading()
    dispatch({
      type: REDUCER_ACTIONS.SET_LOADING,
      isLoading,
    })
  }, [state.effectStatuses])

  const setLoading = useCallback(
    (isLoading, effectId) => {
      const updatedEffectStatuses = { [effectId]: isLoading }
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_EFFECT_STAUSES,
        updatedEffectStatuses,
      })
    },
    [dispatch]
  )

  return setLoading
}
