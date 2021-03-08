import React from 'react'
import { View, Button } from 'react-native'
import { authenticateUser, isUserAuthenticated } from '../../api/auth'
import styles from './LoginContainer.style'



const LoginContainer = ({onAuthLevelChange}) => {
  const onAuthenticate = () => {
    authenticateUser();
    onAuthLevelChange(isUserAuthenticated());
  }

  return (
    <View style={styles.container}>
      <Button 
        onPress={onAuthenticate}
        title="Log in with CI Logon"
        accessibilityLabel="Press this button to log into the app with CI Logon"/>
    </View>
  )
}

export default LoginContainer;