const { REDUCER_ACTIONS } = require('../constants');

const Reducer = (state, action) => {
    switch (action.type) {
        case REDUCER_ACTIONS.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};

export default Reducer;
