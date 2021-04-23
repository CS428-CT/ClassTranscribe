const { REDUCER_ACTIONS } = require('../constants')

const Reducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      }
    case REDUCER_ACTIONS.UPDATE_EFFECT_STAUSES:
      const updatedStatuses = {
        ...state.effectStatuses,
        ...action.updatedEffectStatuses,
      }
      const updatedState = {
        ...state,
        effectStatuses: updatedStatuses
      }
      return updatedState
    default:
      return state
  }
}

export default Reducer
