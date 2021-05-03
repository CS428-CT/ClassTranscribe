import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import Reducer from './Reducer'

const initialState = {
  isLoading: false,
  effectStatuses: {},
}

/**
 * The global store. The entire application should be wrapped in this component so that all children have access
 * to the store. The useContext hook can be used by children in order to access the state and the reducer.
 * @param {Array} children All the components children. The children will be rendered. This prop is passed in implicitley as the children prop typically is.
 * @returns Children of component
 */
const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

/**
 * The global context object for components to call useContext on
 */
export const Context = createContext(initialState)

Store.propTypes = {
  children: PropTypes.element,
}

export default Store
