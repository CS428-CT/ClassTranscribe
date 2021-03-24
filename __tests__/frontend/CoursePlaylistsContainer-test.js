import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { PLAYLISTS_BY_OFFERING_RESPONSE } from '../mock_responses/mock-playlists-response'
import { format } from '../../src/utils/string'
import CoursePlaylistsContainer from '../../src/containers/CoursePlaylistsContainer/CoursePlaylistsContainer'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'

/* 
Specifically for Comptuer Science department (department id: 2001)
*/

const mock = new MockAdapter(axios)
describe('Check playlists rendering', () => {
  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'

  afterEach(() => {
    mock.reset()
  })

  test('when given many playlists', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)

    const { queryByText, queryAllByA11yRole } = render(
      <CoursePlaylistsContainer courseId={offeringId} />
    )
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).not.toBe(0)

    for (let i = 0; i < playlists.length; i += 1) {
      const playlist = PLAYLISTS_BY_OFFERING_RESPONSE[i]
      const playlistItem = await waitFor(() => queryByText(playlist.name))
      expect(playlistItem).not.toBe(null)
    }
  })

  test('when given no playlists', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])

    const { queryAllByA11yRole } = render(<CoursePlaylistsContainer courseId={offeringId} />)
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).toBe(0)
  })

  test('on network error', async () => {
    mock.onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`).networkError()

    const { queryAllByA11yRole } = render(<CoursePlaylistsContainer courseId={offeringId} />)
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).toBe(0)
  })
})

describe('Check playlists navigation', () => {
  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
  const mockNaivgator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, [PLAYLISTS_BY_OFFERING_RESPONSE[0]])

    const { queryAllByA11yRole } = render(
      <CoursePlaylistsContainer courseId={offeringId} navigation={mockNaivgator} />
    )
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).not.toBe(0)

    fireEvent.press(playlists[0])
    const expectedPlaylistId = PLAYLISTS_BY_OFFERING_RESPONSE[0].id

    expect(mockNaivgator.push).toHaveBeenCalled()
    expect(mockNaivgator.push).toHaveBeenCalledWith(STACK_SCREENS.PLAYLIST, {
      playlistId: expectedPlaylistId,
    })
  })
})
