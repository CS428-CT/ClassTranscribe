import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { format } from '../../src/utils/string'
import { ENDPOINTS } from '../../src/api/universities'
import { HTTP_STATUS_CODES } from '../../src/api'
import { DEPARTMENTS_RESPONSE } from '../mock_responses/mock-department-response'
import DepartmentListContainer from '../../src/containers/DepartmentListContainer/DepartmentListContainer'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'

const mock = new MockAdapter(axios)
describe('Check departments rendering', () => {
  const universityId = '1001'

  afterEach(() => {
    mock.reset()
  })

  test('Check that all departments show up', async () => {
    mock
      .onGet(`${format(ENDPOINTS.DEPARTMENTS, universityId)}`)
      .reply(HTTP_STATUS_CODES.OK, DEPARTMENTS_RESPONSE)

    const { queryByText, queryAllByA11yRole } = render(
      <DepartmentListContainer universityId={universityId} />
    )

    const departmentList = await waitFor(() => queryAllByA11yRole('button'))
    expect(departmentList.length).not.toBe(0)

    for (let i = 0; i < departmentList.length; i += 1) {
      const department = DEPARTMENTS_RESPONSE[i]
      const departmentItem = await waitFor(() => queryByText(department.name))
      expect(departmentItem).not.toBe(null)
    }
  })

  test('when no departments', async () => {
    mock.onGet(`${format(ENDPOINTS.DEPARTMENTS, universityId)}`).reply(HTTP_STATUS_CODES.OK, [])

    const { queryAllByA11yRole } = render(<DepartmentListContainer universityId={universityId} />)
    const departmentList = await waitFor(() => queryAllByA11yRole('button'))
    expect(departmentList.length).toBe(0)
  })

  test('on network error', async () => {
    mock.onGet(`${format(ENDPOINTS.DEPARTMENTS, universityId)}`).networkError()

    const { queryAllByA11yRole } = render(<DepartmentListContainer universityId={universityId} />)
    const departmentList = await waitFor(() => queryAllByA11yRole('button'))
    expect(departmentList.length).toBe(0)
  })
})

describe('Check department navigation', () => {
  const universityId = '1001'
  const mockNavigator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock
      .onGet(`${format(ENDPOINTS.DEPARTMENTS, universityId)}`)
      .reply(HTTP_STATUS_CODES.OK, [DEPARTMENTS_RESPONSE[0]])

    const { queryAllByA11yRole } = render(
      <DepartmentListContainer universityId={universityId} navigation={mockNavigator} />
    )

    const departments = await waitFor(() => queryAllByA11yRole('button'))
    expect(departments.length).not.toBe(0)

    fireEvent.press(departments[0])
    const expectedDepartmentId = DEPARTMENTS_RESPONSE[0].id
    const expectedDepartmentAcronym = DEPARTMENTS_RESPONSE[0].acronym

    expect(mockNavigator.push).toHaveBeenCalled()
    expect(mockNavigator.push).toHaveBeenCalledWith(STACK_SCREENS.COURSE_LIST, {
      departmentId: expectedDepartmentId,
      acronym: expectedDepartmentAcronym,
    })
  })
})
