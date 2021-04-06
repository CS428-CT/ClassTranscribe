import React from 'react'
import PropTypes from 'prop-types'
import WebView from 'react-native-webview'
import { getUserMetadata, isUserAuthenticated, setAuthToken } from '../../api/auth'

/**
 * Contains the log in screen. If a user is not authenticated, this screen should be shown.
 * The login screen simply renders a web version of the CT application, and then steals the authentication token
 * from the browser before returning to the application.
 * @param {Function} onAuthLevelChange Callback function for when the user's auth level is changed.
 *                                     Takes 1 boolean parameter that is true if the user is authenticated.
 */
const LoginContainer = ({ onAuthLevelChange }) => {
  /**
   * This is the javascript that we inject into the web browser in order to extract the auth token.
   * We check periodically to see if we can access a valid token. Once we can, we post a message containing
   * the token. @onBrowerMessage handles the rest.
   */
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
  `

  /**
   * Listener for the injected javascript message. When the message is received, we
   * store the auth token and notity via callback that the auth level has changed.
   * @param {Object} event The event object representing the message
   */
  const onBrowserMessage = async (event) => {
    if (!event?.nativeEvent?.data) return

    setAuthToken(event.nativeEvent.data)
    await getUserMetadata()
    onAuthLevelChange(isUserAuthenticated())
  }

  return (
    <WebView
      source={{ uri: 'https://classtranscribe.illinois.edu' }}
      injectedJavaScript={injectedJavascript}
      onMessage={onBrowserMessage}
      accessibilityRole="browser"
    />
  )
}

LoginContainer.propTypes = {
  onAuthLevelChange: PropTypes.func.isRequired,
}

export default LoginContainer
