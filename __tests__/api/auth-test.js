import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  getCurrentAuthenticatedUser,
  ENDPOINTS,
  isUserAuthenticated,
  signOutUser,
  setAuthToken,
  getUserMetadata,
} from '../../src/api/auth'
import { HTTP_STATUS_CODES } from '../../src/api'
import { METADATA_RESPONSE, SIGN_IN_RESPONSE } from '../mock_responses/mock-auth-response'

describe('Check get user metadata', () => {
  const MOCK_AUTH_TOKEN = "A";
  const mock = new MockAdapter(axios)

  afterEach(async () => {
    mock.reset()
    await signOutUser()
  })

  test('when not signed in', () => {
    expect(isUserAuthenticated()).toBe(false)
    expect(getCurrentAuthenticatedUser()).toBe(null)
  })

  test('after successful sign in', async () => {
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
    setAuthToken(MOCK_AUTH_TOKEN)
    await getUserMetadata();

    expect(isUserAuthenticated()).toBe(true)
    expect(getCurrentAuthenticatedUser().metadata).toStrictEqual(METADATA_RESPONSE)
  })

  test('with bad status code', async () => {
    mock
      .onGet(`${ENDPOINTS.USER_METADATA}`)
      .reply(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, SIGN_IN_RESPONSE)
    setAuthToken(MOCK_AUTH_TOKEN);
    await getUserMetadata();

    expect(getCurrentAuthenticatedUser().metadata).toBe(undefined)
  })

  test('after sign in with network error', async () => {
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).networkError()
    setAuthToken(MOCK_AUTH_TOKEN);
    await getUserMetadata();

    expect(getCurrentAuthenticatedUser().metadata).toBe(undefined)
  })

  test('after logging out', async () => {
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
    setAuthToken(MOCK_AUTH_TOKEN);
    await getUserMetadata();
    expect(isUserAuthenticated()).toBe(true)

    await signOutUser()
    expect(isUserAuthenticated()).toBe(false)
    expect(getCurrentAuthenticatedUser()).toBe(null)
  })
})
