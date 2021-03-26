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

const mock = new MockAdapter(axios)
describe('Check courses rendering', () => {
  const departmentId = '2001'
  const departmentAcronym = 'CS'

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

    console.log(courseList)
    for (let i = 0; i < courseList.length; i += 1) {
      const course = COURSES_RESPONSE[i]
      const courseItem = await waitFor(() => queryByText(course.courseNumber))
      expect(courseItem).not.toBe(null)
    }
  })

  test('when no courses', async () => {
    mock.onGet(`${format(ENDPOINTS.COURSES, departmentId)}`).reply(HTTP_STATUS_CODES.OK, [])

    const { queryAllByA11yRole } = render(<CourseListContainer departmentId={departmentId} acronym={departmentAcronym} />)
    const courseList = await waitFor(() => queryAllByA11yRole('button'))
    expect(courseList.length).toBe(0)
  })

  test('on network error', async () => {
    mock.onGet(`${format(ENDPOINTS.COURSES, departmentId)}`).networkError()

    const { queryAllByA11yRole } = render(<CourseListContainer departmentId={departmentId} acronym={departmentAcronym}/>)
    const courseList = await waitFor(() => queryAllByA11yRole('button'))
    expect(courseList.length).toBe(0)
  })
})

describe('Check course navigation', () => {
  const departmentId = '2001'
  const departmentAcronym = 'CS'
  const mockNavigator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock.onGet(`${format(ENDPOINTS.COURSES, departmentId)}`).reply(HTTP_STATUS_CODES.OK, [COURSES_RESPONSE[0]])

    const { queryAllByA11yRole } = render(
      <CourseListContainer departmentId={departmentId} acronym={departmentAcronym} navigation={mockNavigator} />
    )

    const courses = await waitFor(() => queryAllByA11yRole('button'))
    expect(courses.length).not.toBe(0)

    fireEvent.press(courses[0])

    expect(mockNavigator.push).toHaveBeenCalled()
    expect(mockNavigator.push).toHaveBeenCalledWith(STACK_SCREENS.HOME, {})
  })
})
