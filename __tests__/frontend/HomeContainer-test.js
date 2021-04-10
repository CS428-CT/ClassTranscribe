import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render } from '@testing-library/react-native'
import { setUserData } from '../../src/api/auth'
import { ENDPOINTS as UNI_ENDPOINTS } from '../../src/api/universities'
import { ENDPOINTS as OFFER_ENDPOINTS } from '../../src/api/offerings'
import { format } from '../../src/utils/string'

import { HTTP_STATUS_CODES } from '../../src/api'
import { UNIVERSITY_RESPONSE } from '../mock_responses/mock-university-response'
import Home from '../../src/containers/HomeContainer/Home'
import { OFFERINGS_RESPONSE_1 } from '../mock_responses/mock-offerings-response'

// const assertNoButtonsRendered = async () => {
//   const { queryAllByA11yRole } = render(<UniversityListContainer />)
//   const universityList = await waitFor(() => queryAllByA11yRole('button'))
//   expect(universityList.length).toBe(0)
// }

const mock = new MockAdapter(axios)
describe('Check universities rendering', () => {
  const USER_DATA = {
    authToken: 'A',
    universityId: '1001',
    userId: 'test user',
    emaildId: 'testuser@email.com',
  }

  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'

  afterEach(() => {
    mock.reset()
  })

  test('Check that components render', async () => {
    const mockNavigator = { push: jest.fn() }

    mock.onGet(`${UNI_ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, UNIVERSITY_RESPONSE)
    mock
      .onGet(`${OFFER_ENDPOINTS.OFFERINGBYSTUDENT}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)
    mock
      .onGet(`${format(OFFER_ENDPOINTS.OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)

    setUserData(USER_DATA)

    const { getByTestId } = render(<Home navigation={mockNavigator} />)

    const picker = await getByTestId('picker')
    expect(picker).not.toBe(null)

    const courseList = await getByTestId('courseList')
    expect(courseList).not.toBe(null)
  })
})