import React from 'react'
import PropTypes from 'prop-types'
import WebView from 'react-native-webview'
import { getUserMetadata, isUserAuthenticated, setAuthToken, setUserData } from '../../api/auth'
import { FILE_SERVER_BASE_URL } from '../../constants'

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
    function getToken() {
      const userInfoString = localStorage["userInfo"];
      if (!userInfoString) {
        return setTimeout(getToken, 500);
      }

      const userInfo = JSON.parse(userInfoString);
      if (!userInfo || !userInfo.exp) {
        return setTimeout(getToken, 500);
      }

      const tokenExpirationDate = Date.parse(userInfo.exp);
      if (tokenExpirationDate < Date.now()) {
        return setTimeout(getToken, 500);
      }

      window.ReactNativeWebView.postMessage(localStorage["authToken"])
      window.ReactNativeWebView.postMessage(userInfoString)
    }

    getToken();
  `
  //  const injectedJavascript = `window.ReactNativeWebView.postMessage("TEST")`

  /**
   * Listener for the injected javascript message. When the message is received, we
   * store the auth token and notity via callback that the auth level has changed.
   * @param {Object} event The event object representing the message
   */
  const onBrowserMessage = async (event) => {
    if (!event?.nativeEvent?.data) return

    const data = event.nativeEvent.data

    try {
      const userData = JSON.parse(data)
      setUserData(userData)
    } catch (e) {
      setAuthToken(data)
      await getUserMetadata()
      onAuthLevelChange(isUserAuthenticated())
    }
  }

  return (
    <WebView
      source={{ uri: FILE_SERVER_BASE_URL }}
      injectedJavaScript={injectedJavascript}
      onMessage={onBrowserMessage}
    />
  )
}

LoginContainer.propTypes = {
  onAuthLevelChange: PropTypes.func.isRequired,
}

export default LoginContainer
