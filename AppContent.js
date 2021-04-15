import React, { useContext, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { View, StyleSheet } from 'react-native'
import LoginContainer from './src/containers/LoginContainer/LoginContainer'
import CTNavigationContainer from './src/containers/CTNavigationContainer/CTNavigationContainer'
import { Context } from './src/store/Store'

export default function AppContent() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const state = useContext(Context)[0]

  const onAuthLevelChange = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated)
  }

  const renderApplication = () => {
    if (isUserAuthenticated) return <CTNavigationContainer />

    return <LoginContainer onAuthLevelChange={onAuthLevelChange} />
  }

  const renderLoadingIndicator = () => {
    if (!state.isLoading) return null

    return (
      <View style={style.loading}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <View style={style.container}>
      {renderApplication()}
      {renderLoadingIndicator()}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
