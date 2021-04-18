import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/api-requests'
import { HTTP_STATUS_CODES } from '../../src/api'
import { UNIVERSITY_RESPONSE } from '../mock_responses/mock-university-response'
import UniversityListContainer from '../../src/containers/UniversityListContainer/UniversityListContainer'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'
import { useLoadingIndicator } from '../../src/hooks/useLoadingIndicator'

const mock = new MockAdapter(axios)

jest.mock('../../src/hooks/useLoadingIndicator')
const mockHook = jest.fn()
useLoadingIndicator.mockReturnValue(mockHook)

const assertNoButtonsRendered = async () => {
  const { queryAllByA11yRole } = render(<UniversityListContainer />)
  const universityList = await waitFor(() => queryAllByA11yRole('button'))
  expect(universityList.length).toBe(0)
}

describe('Check universities rendering', () => {
  afterEach(() => {
    mock.reset()
  })

  test('Check that all universities show up', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, UNIVERSITY_RESPONSE)

    const { queryByText, queryAllByA11yRole } = render(<UniversityListContainer />)
    const universityList = await waitFor(() => queryAllByA11yRole('button'))
    expect(universityList.length).not.toBe(0)

    for (let i = 0; i < universityList.length; i += 1) {
      const university = UNIVERSITY_RESPONSE[i]
      const universityItem = await waitFor(() => queryByText(university.name))
      expect(universityItem).not.toBe(null)
    }
  })

  test('when no universities', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, [])
    await assertNoButtonsRendered()
  })

  test('on network error', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).networkError()
    await assertNoButtonsRendered()
  })
})

describe('Check university navigation', () => {
  const mockNavigator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, [UNIVERSITY_RESPONSE[0]])

    const { queryAllByA11yRole } = render(<UniversityListContainer navigation={mockNavigator} />)
    const universities = await waitFor(() => queryAllByA11yRole('button'))
    expect(universities.length).not.toBe(0)

    fireEvent.press(universities[0])
    const expectedUniversityId = UNIVERSITY_RESPONSE[0].id

    expect(mockNavigator.push).toHaveBeenCalled()
    expect(mockNavigator.push).toHaveBeenCalledWith(STACK_SCREENS.DEPT_LIST, {
      universityId: expectedUniversityId,
    })
  })

  test('Check that loading indicator renders', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, [UNIVERSITY_RESPONSE[0]])

    render(<UniversityListContainer navigation={mockNavigator} />)

    await waitFor(() => expect(mockHook).toHaveBeenCalled())
  })
})
