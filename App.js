import React from 'react'
import Store from './src/store/Store'
import AppContent from './AppContent'

/**
 * Wrapper for application that provides global access to the store.
 */
export default function App() {
  return (
    <Store>
      <AppContent />
    </Store>
  )
}
