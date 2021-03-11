import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LoginContainer from './src/containers/LoginContainer/LoginContainer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: '30%',
  },
})

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

  // TODO: Remove this
  useEffect(() => {
    const getOfferings = async () => {
      console.log(await getOfferings("ac5b1727-629c-443b-8c1a-cc1bd541af6a"))
    }

    getOfferings()
  }, isUserAuthenticated)

  const onAuthLevelChange = (isAuthenticated) => {
    setIsUserAuthenticated(isAuthenticated)
  }

  const renderApplication = () => {
    if (isUserAuthenticated)
      return (
        <View style={styles.container}>
          <Text style={styles.title}>PUT REST OF APPLICATION HERE!!!</Text>
        </View>
      )

    return <LoginContainer onAuthLevelChange={onAuthLevelChange} />
  }
  return <SafeAreaView>{renderApplication()}</SafeAreaView>
}
