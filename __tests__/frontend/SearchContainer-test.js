import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor } from '@testing-library/react-native'
import { setUserData } from '../../src/api/auth'
import { ENDPOINTS } from '../../src/api/api-requests'
import { format } from '../../src/utils/string'
import { HTTP_STATUS_CODES } from '../../src/api'
import { UNIVERSITY_RESPONSE } from '../mock_responses/mock-university-response'
import Home from '../../src/containers/HomeContainer/Home'
import { OFFERINGS_RESPONSE_1, OFFERINGS_RESPONSE_2, USER_OFFERINGS_RESPONSE } from '../mock_responses/mock-offerings-response'
import { useLoadingIndicator } from '../../src/hooks/useLoadingIndicator'
import SearchContainer from '../../src/containers/SearchContainer/SearchContainer'

jest.mock('../../src/hooks/useLoadingIndicator')
const mock = new MockAdapter(axios)
const mockHook = jest.fn()
useLoadingIndicator.mockReturnValue(mockHook)

describe('Check universities rendering', () => {
  const USER_DATA = {
    authToken: 'A',
    universityId: '1001',
    userId: 'test user',
    emaildId: 'testuser@email.com',
  }

  const offeringId1 = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
  const offeringId2 = '2c7a83cc-e2f3-493a-ae65-33f9c998e8ed'
  const mockNavigator = { push: jest.fn() }

  beforeEach(() => {
    mock
      .onGet(`${ENDPOINTS.UNIVERSITIES}`)
      .reply(HTTP_STATUS_CODES.OK, UNIVERSITY_RESPONSE)
      .onGet(`${ENDPOINTS.OFFERINGBYSTUDENT}`)
      .reply(HTTP_STATUS_CODES.OK, USER_OFFERINGS_RESPONSE)
      .onGet(`${format(ENDPOINTS.OFFERING, offeringId1)}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)
      .onGet(`${format(ENDPOINTS.OFFERING, offeringId2)}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_2)
  })

  afterEach(() => {
    mock.reset()
  })

  test('Check that components render', async () => {
    setUserData(USER_DATA)

    const { getByTestId } = render(<SearchContainer />)

    const picker = getByTestId('searchBar')
    expect(picker).not.toBe(null)

    const courseList = getByTestId('courseList')
    expect(courseList).not.toBe(null)
  })

  test('Check that loading indicator renders', async () => {
    setUserData(USER_DATA)
    render(<Home navigation={mockNavigator} />)

    await waitFor(() => expect(mockHook).toHaveBeenCalled())
  })
})
