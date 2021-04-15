import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { format } from '../../src/utils/string'
import { ENDPOINTS } from '../../src/api/universities'
import { HTTP_STATUS_CODES } from '../../src/api'
import { COURSES_RESPONSE } from '../mock_responses/mock-course-response'
import CourseListContainer from '../../src/containers/CourseListContainer/CourseListContainer'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'
import { useLoadingIndicator } from '../../src/hooks/useLoadingIndicator'

const departmentId = '2001'
const departmentAcronym = 'CS'
const mock = new MockAdapter(axios)

jest.mock('../../src/hooks/useLoadingIndicator')
const mockHook = jest.fn()
useLoadingIndicator.mockReturnValue(mockHook)

const assertNoButtonsRendered = async () => {
  const { queryAllByA11yRole } = render(
    <CourseListContainer departmentId={departmentId} acronym={departmentAcronym} />
  )
  const courseList = await waitFor(() => queryAllByA11yRole('button'))
  expect(courseList.length).toBe(0)
}

describe('Check courses rendering', () => {
  afterEach(() => {
    mock.reset()
  })

  test('Check that all courses show up', async () => {
    mock
      .onGet(`${format(ENDPOINTS.COURSES, departmentId)}`)
      .reply(HTTP_STATUS_CODES.OK, COURSES_RESPONSE)

    const { queryByText, queryAllByA11yRole } = render(
      <CourseListContainer departmentId={departmentId} acronym={departmentAcronym} />
    )

    const courseList = await waitFor(() => queryAllByA11yRole('button'))
    expect(courseList.length).not.toBe(0)

    for (let i = 0; i < courseList.length; i += 1) {
      const course = COURSES_RESPONSE[i]
      const courseItem = await waitFor(() => queryByText(course.courseNumber))
      expect(courseItem).not.toBe(null)
    }
  })

  test('when no courses', async () => {
    mock.onGet(`${format(ENDPOINTS.COURSES, departmentId)}`).reply(HTTP_STATUS_CODES.OK, [])
    await assertNoButtonsRendered()
  })

  test('on network error', async () => {
    mock.onGet(`${format(ENDPOINTS.COURSES, departmentId)}`).networkError()
    await assertNoButtonsRendered()
  })
})

describe('Check course navigation', () => {
  const mockNavigator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock
      .onGet(`${format(ENDPOINTS.COURSES, departmentId)}`)
      .reply(HTTP_STATUS_CODES.OK, [COURSES_RESPONSE[0]])

    const { queryAllByA11yRole } = render(
        <CourseListContainer
          departmentId={departmentId}
          acronym={departmentAcronym}
          navigation={mockNavigator}
        />
    )

    const courses = await waitFor(() => queryAllByA11yRole('button'))
    expect(courses.length).not.toBe(0)

    fireEvent.press(courses[0])

    expect(mockNavigator.push).toHaveBeenCalled()
    expect(mockNavigator.push).toHaveBeenCalledWith(STACK_SCREENS.HOME, {})
  })
})

describe('Check loading indicator', async () => {
  test('loading indicator called', async () => {
    mock
      .onGet(`${format(ENDPOINTS.COURSES, departmentId)}`)
      .reply(HTTP_STATUS_CODES.OK, [COURSES_RESPONSE[0]])

    render(
        <CourseListContainer
          departmentId={departmentId}
          acronym={departmentAcronym}
        />
    )

    await waitFor( () => expect(mockHook).toHaveBeenCalled() );
  })
})
