import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor } from '@testing-library/react-native'
import { setUserData } from '../../src/api/auth'
import { ENDPOINTS } from '../../src/api/api-requests'
import { format } from '../../src/utils/string'
import { HTTP_STATUS_CODES } from '../../src/api'
import { UNIVERSITY_RESPONSE } from '../mock_responses/mock-university-response'
import { DEPARTMENTS_RESPONSE } from '../mock_responses/mock-department-response'
import Home from '../../src/containers/HomeContainer/Home'
import { OFFERINGS_RESPONSE_1, OFFERINGS_IN_LIST, STARRED_OFFERINGS_RESPONSE2 } from '../mock_responses/mock-offerings-response'
import { useLoadingIndicator } from '../../src/hooks/useLoadingIndicator'

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
    metadata: STARRED_OFFERINGS_RESPONSE2,
  }

  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
  const mockNavigator = { push: jest.fn() }


  beforeEach(() => {
    mock
      .onGet(`${ENDPOINTS.UNIVERSITIES}`)
      .reply(HTTP_STATUS_CODES.OK, UNIVERSITY_RESPONSE)
      .onGet(`${format(ENDPOINTS.DEPARTMENTS, USER_DATA.universityId)}`)
      .reply(HTTP_STATUS_CODES.OK, DEPARTMENTS_RESPONSE)
      .onGet(`${ENDPOINTS.OFFERINGBYSTUDENT}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_IN_LIST)
      .onGet(`${format(ENDPOINTS.OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_IN_LIST)
  })

  afterEach(() => {
    mock.reset()
  })

  test('Check that components render', async () => {
    setUserData(USER_DATA)

    const { getByTestId } = render(<Home starred={false} navigation={mockNavigator} />)

    const uniPicker = getByTestId('uniPicker')
    expect(uniPicker).not.toBe(null)

    const deptPicker = getByTestId('deptPicker')
    expect(deptPicker).not.toBe(null)

    const courseList = getByTestId('courseList')
    expect(courseList).not.toBe(null)
  })

  test('Check that loading indicator renders', async () => {
    setUserData(USER_DATA)
    render(<Home navigation={mockNavigator} />)

    await waitFor(() => expect(mockHook).toHaveBeenCalled())
  })

  test('Check (not starred) courses render', async() => {
    setUserData(USER_DATA)

    const { queryByText, queryAllByA11yRole } = render(<Home starred={false} navigation={mockNavigator} />)
    const courses = await waitFor(() => queryAllByA11yRole('button'))
    expect(courses.length).not.toBe(0)


    for (let i = 0; i < OFFERINGS_IN_LIST.length; i += 1) {
      const offering = OFFERINGS_IN_LIST[i]
      const termSection = `${offering.term.name} | ${offering.offering.sectionName}`
      const courseItem = await waitFor(() => queryByText(termSection))
      expect(courseItem).not.toBe(null)
    }

  })

  test('Check (starred) courses render', async() => {
    setUserData(USER_DATA)

    const { queryByText, queryAllByA11yRole } = render(<Home starred={true} navigation={mockNavigator} />)
    const courses = await waitFor(() => queryAllByA11yRole('button'))
    expect(courses.length).not.toBe(0)


    for (let i = 0; i < OFFERINGS_IN_LIST.length; i += 1) {
      const offering = OFFERINGS_IN_LIST[i]
      const termSection = `${offering.term.name} | ${offering.offering.sectionName}`
      const courseItem = await waitFor(() => queryByText(termSection))
      expect(courseItem).not.toBe(null)
    }

  })

})
