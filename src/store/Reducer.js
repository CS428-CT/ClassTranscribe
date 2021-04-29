const { REDUCER_ACTIONS } = require('../constants')

/**
 * Reducer for the global store. Called automatically by React framework
 * @param {Object} state The current state of the global store
 * @param {Object} action The action being performed
 * @returns The updated state
 */
const Reducer = (state, action) => {
  const handleSetLoading = () => {
    return {
      ...state,
      isLoading: action.isLoading,
    }
  }

  const handleStatusUpdate = () => {
    const updatedStatuses = {
      ...state.effectStatuses,
      ...action.updatedEffectStatuses,
    }

    const updatedState = {
      ...state,
      effectStatuses: updatedStatuses,
    }

    return updatedState
  }

  switch (action.type) {
    case REDUCER_ACTIONS.SET_LOADING:
      return handleSetLoading()
    case REDUCER_ACTIONS.UPDATE_EFFECT_STAUSES:
      return handleStatusUpdate()
    default:
      return state
  }
}

export default Reducer
