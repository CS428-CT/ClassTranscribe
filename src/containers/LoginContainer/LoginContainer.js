import React from 'react'
import { View, Button } from 'react-native'
import PropTypes from 'prop-types'
import { authenticateUser, isUserAuthenticated } from '../../api/auth'
import styles from './LoginContainer.style'

/**
 * Contains the log in screen. If a user is not authenticated, this screen should be shown. 
 * @param {Function} onAuthLevelChange Callback function for when the user's auth level is changed. 
 *                                     Takes 1 boolean parameter that is true if the user is authenticated. 
 */
const LoginContainer = ({ onAuthLevelChange }) => {

  /**
   * Called when the user clicks the "Log in" button. Initiates the 
   * authentication flow and calls onAuthLevelChange upon completion.
   */
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
