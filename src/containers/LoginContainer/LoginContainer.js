import React from 'react'
import { View, Button } from 'react-native'
import PropTypes from 'prop-types'
import { authenticateUser, isUserAuthenticated } from '../../api/auth'
import styles from './LoginContainer.style'

const LoginContainer = ({ onAuthLevelChange }) => {
  const onAuthenticate = async () => {
    await authenticateUser()
    onAuthLevelChange(isUserAuthenticated())
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={onAuthenticate}
        title="Log in with CI Logon"
        accessibilityLabel="Press this button to log into the app with CI Logon"
      />
    </View>
  )
}

LoginContainer.propTypes = {
  onAuthLevelChange: PropTypes.func.isRequired,
}

export default LoginContainer
