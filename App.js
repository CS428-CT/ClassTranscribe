import React, { useState } from 'react'
// import { StyleSheet } from 'react-native'
import LoginContainer from './src/containers/LoginContainer/LoginContainer'
import CTNavigationContainer from './src/containers/CTNavigationContainer/CTNavigationContainer'

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     textAlign: 'center',
//     marginTop: '30%',
//   },
// })

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  const onAuthLevelChange = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated)
  }

  const renderApplication = () => {
    if (isUserAuthenticated) return <CTNavigationContainer />

    return <LoginContainer onAuthLevelChange={onAuthLevelChange} />
  }
  return renderApplication()
}
