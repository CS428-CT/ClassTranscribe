import React, { useEffect } from 'react'
//import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '@env'
import { View, Button } from 'react-native'
import PropTypes from 'prop-types'
import * as AuthSession from 'expo-auth-session'
import jwtDecode from 'jwt-decode'
import { authenticateUser, getUserMetadata, isUserAuthenticated, setAuthToken } from '../../api/auth'
import styles from './LoginContainer.style'
import { WebView } from "react-native-webview";


const authorizationEndpoint = `${AUTH0_DOMAIN}/authorize`
const useProxy = Platform.select({ web: false, default: true })
const redirectUri = AuthSession.makeRedirectUri({ useProxy })

// TODO: Change expo credentials then get Angrave to add the callback url

/**
 * Contains the log in screen. If a user is not authenticated, this screen should be shown.
 * @param {Function} onAuthLevelChange Callback function for when the user's auth level is changed.
 *                                     Takes 1 boolean parameter that is true if the user is authenticated.
 */
const LoginContainer = ({ onAuthLevelChange }) => {
  const [_, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: AUTH0_CLIENT_ID,
      responseType: 'id_token',
      scopes: ['openid', 'profile', 'email'],
      extraParams: {
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  )

  useEffect(() => {
    if (result) {
      if (result.error) {
        console.log(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        )
        return
      }
      if (result.type === 'success') {
        const jwtToken = result.params.id_token
        console.log(jwtToken)
        const decoded = jwtDecode(jwtToken)
        const { name } = decoded
      }
    }
  }, [result])

  /**
   * Called when the user clicks the "Log in" button. Initiates the
   * authentication flow and calls onAuthLevelChange upon completion.
   */
  const onAuthenticate = async () => {
    promptAsync({ useProxy })
    // await authenticateUser()
    // onAuthLevelChange(isUserAuthenticated())
  }

  const injectedJavascript = `
    const getToken = () => {
      window.ReactNativeWebView.postMessage(localStorage["authToken"])
    }

    setTimeout(getToken, 10000);
  `;

  const onBrowserMessage = async (event) => {
    console.log(event);
    setAuthToken(event.nativeEvent.data) 
    const data = await getUserMetadata();
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <WebView style={{height: 300, width: 300}} source={{ uri: "https://classtranscribe.illinois.edu"}} injectedJavaScript={injectedJavascript} onMessage={onBrowserMessage}/>
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
