import React, { useEffect } from 'react'
import { View, Button } from 'react-native'
import PropTypes from 'prop-types'
import WebView from 'react-native-webview'
import { authenticateUser, getUserMetadata, isUserAuthenticated, setAuthToken } from '../../api/auth'
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
    onAuthLevelChange(isUserAuthenticated())
  }

  const injectedJavascript = `
    const getToken = () => {
      const userInfoString = localStorage["userInfo"];
      if (!userInfoString) {
        return setTimeout(getToken, 500);
      }

      const userInfo = JSON.parse(userInfoString);
      if (!userInfo?.exp) {
        return setTimeout(getToken, 500);
      }

      const tokenExpirationDate = Date.parse(userInfo.exp);
      if (tokenExpirationDate < Date.now()) {
        return setTimeout(getToken, 500);
      }

      window.ReactNativeWebView.postMessage(localStorage["authToken"])
    }

    getToken();
  `;

  const onBrowserMessage = async (event) => {
    if (!event?.nativeEvent?.data)
      return;

    setAuthToken(event.nativeEvent.data) 
    await getUserMetadata();
    onAuthLevelChange(await isUserAuthenticated());
  }

  return (
    <View style={styles.container}>
      <WebView style={{height: 300, width: 300}} source={{ uri: "https://classtranscribe.illinois.edu"}} injectedJavaScript={injectedJavascript} onMessage={onBrowserMessage}/>
    </View>
  )
}

LoginContainer.propTypes = {
  onAuthLevelChange: PropTypes.func.isRequired,
}

export default LoginContainer
