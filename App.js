import React, { useState } from 'react'
import { View } from 'react-native'
import LoginContainer from './src/containers/LoginContainer/LoginContainer'
import VideoContainer from './src/containers/VideoContainer/VideoContainer'
import VideoStyle from './src/containers/VideoContainer/VideoContainer.style'

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  const onAuthLevelChange = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated)
  }

  const renderApplication = () => {
    if (isUserAuthenticated) {
      return <VideoContainer />
    }

    return <LoginContainer onAuthLevelChange={onAuthLevelChange} />
  }

  return <View style={VideoStyle.container}>{renderApplication()}</View>
}
