import React, { useEffect } from 'react'
//import  { AUTH0_DOMAIN, AUTH0_CLIENT_ID, CALLBACK_URL} from "@env"
import { View, Button, Linking } from 'react-native'
import PropTypes from 'prop-types'
import { authenticateUser, isUserAuthenticated } from '../../api/auth'
import styles from './LoginContainer.style'
import * as AuthSession from 'expo-auth-session'
import jwtDecode from 'jwt-decode';

// TODO: STORE IN .ENV
const auth0Domain = AUTH0_DOMAIN
const auth0ClientId = AUTH0_CLIENT_ID
const callbackURL = CALLBACK_URL

const authorizationEndpoint = `${auth0Domain}/authorize`;

//const useProxy = Platform.select({ web: false, default: true });
//const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const redirectUri = callbackURL
console.log(redirectUri)

/**
 * Contains the log in screen. If a user is not authenticated, this screen should be shown.
 * @param {Function} onAuthLevelChange Callback function for when the user's auth level is changed.
 *                                     Takes 1 boolean parameter that is true if the user is authenticated.
 */
const LoginContainer = ({ onAuthLevelChange }) => {

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile', 'email', 'org.cilogon.userinfo'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  useEffect(() => {
    if (result) {
      if (result.error) {
        console.log(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        console.log(jwtToken)
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
      }
    }
  }, [result]);

  /**
   * Called when the user clicks the "Log in" button. Initiates the
   * authentication flow and calls onAuthLevelChange upon completion.
   */
  const onAuthenticate = async () => {
    const supported = await Linking.canOpenURL(CALLBACK_URL);
    console.log("IS SUPPORTED: " + supported)
    promptAsync()
    //await authenticateUser()
    //onAuthLevelChange(isUserAuthenticated())
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
