import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  getCurrentAuthenticatedUser,
  authenticateUser,
  ENDPOINTS,
  isUserAuthenticated,
  signOutUser,
} from '../../src/api/auth'
import { HTTP_STATUS_CODES } from '../../src/api'
import { SIGN_IN_RESPONSE } from '../mock_responses/mock-auth-response'

describe('Check authentication', () => {
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
    mock.onGet(`${ENDPOINTS.SIGN_IN}`).reply(HTTP_STATUS_CODES.OK, SIGN_IN_RESPONSE)
    await authenticateUser()

    expect(isUserAuthenticated()).toBe(true)
    expect(getCurrentAuthenticatedUser()).toStrictEqual(SIGN_IN_RESPONSE)
  })

  test('after sign in with bad status code', async () => {
    mock
      .onGet(`${ENDPOINTS.SIGN_IN}`)
      .reply(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, SIGN_IN_RESPONSE)
    await authenticateUser()

    expect(isUserAuthenticated()).toBe(false)
    expect(getCurrentAuthenticatedUser()).toBe(null)
  })

  test('after sign in with network error', async () => {
    mock.onGet(`${ENDPOINTS.SIGN_IN}`).networkError()
    await authenticateUser()

    expect(isUserAuthenticated()).toBe(false)
    expect(getCurrentAuthenticatedUser()).toBe(null)
  })

  test('after logging out', async () => {
    mock.onGet(`${ENDPOINTS.SIGN_IN}`).reply(HTTP_STATUS_CODES.OK, SIGN_IN_RESPONSE)
    await authenticateUser()
    expect(isUserAuthenticated()).toBe(true)

    await signOutUser()
    expect(isUserAuthenticated()).toBe(false)
    expect(getCurrentAuthenticatedUser()).toBe(null)
  })
})
