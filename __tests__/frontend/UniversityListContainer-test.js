import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/universities'
import { HTTP_STATUS_CODES } from '../../src/api'
import { UNIVERSITY_RESPONSE } from '../mock_responses/mock-university-response'
import UniversityListContainer from '../../src/containers/UniversityListContainer/UniversityListContainer'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'

const mock = new MockAdapter(axios)
describe('Check universities rendering', () => {
  afterEach(() => {
    mock.reset()
  })

  test('Check that all universities show up', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, UNIVERSITY_RESPONSE)
a
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

    const { queryAllByA11yRole } = render(<UniversityListContainer />)
    const universityList = await waitFor(() => queryAllByA11yRole('button'))
    expect(universityList.length).toBe(0)
  })

  test('on network error', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).networkError()

    const { queryAllByA11yRole } = render(<UniversityListContainer />)
    const universityList = await waitFor(() => queryAllByA11yRole('button'))
    expect(universityList.length).toBe(0)
  })
})

describe('Check university navigation', () => {
  const universityId = '1001' // UIUC
  const mockNaivgator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock.onGet(`${ENDPOINTS.UNIVERSITIES}`).reply(HTTP_STATUS_CODES.OK, [UNIVERSITY_RESPONSE[0]])

    const { queryAllByA11yRole } = render(
      <UniversityListContainer universityId={universityId} navigation={mockNaivgator} />
    )
    const departments = await waitFor(() => queryAllByA11yRole('button'))
    expect(departments.length).not.toBe(0)

    fireEvent.press(departments[0])
    const expectedUniversityId = UNIVERSITY_RESPONSE[0].id

    expect(mockNaivgator.push).toHaveBeenCalled()
    expect(mockNaivgator.push).toHaveBeenCalledWith(STACK_SCREENS.DEPT_LIST, {
      universityId: expectedUniversityId,
    })
  })
})
