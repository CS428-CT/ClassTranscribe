import React, { useState } from 'react'
import LoginContainer from './src/containers/LoginContainer/LoginContainer'
import CTNavigationContainer from './src/containers/CTNavigationContainer/CTNavigationContainer'

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  const onAuthLevelChange = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated)
  }

  const renderApplication = () => {
    if (isUserAuthenticated)
      return (
        <CTNavigationContainer/>
      )

    return <LoginContainer onAuthLevelChange={onAuthLevelChange} />
  }
  return renderApplication()
}
