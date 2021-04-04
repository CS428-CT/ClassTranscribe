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

const mock = new MockAdapter(axios)
const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
const assertNoButtonsRendered = async () => {
    const { queryAllByA11yRole } = render(<CoursePlaylistsContainer courseId={offeringId} />)
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).toBe(0)
}

describe('Check playlists rendering', () => {
  const displayedKeys = ['name']
  const undisplayedKeys = [
    'id',
    'createdAt',
    'sourceType',
    'offeringId',
    'index',
    'playlistIdentifier',
  ]

  afterEach(() => {
    mock.reset()
  })

  test('when given many playlists', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)

    const { queryAllByText, queryAllByA11yRole } = render(
      <CoursePlaylistsContainer courseId={offeringId} />
    )
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).not.toBe(0)

    for (let i = 0; i < playlists.length; i += 1) {
      const playlist = PLAYLISTS_BY_OFFERING_RESPONSE[i]

      // Ensure items that should be rendered are rendered once
      for (const key of displayedKeys) {
        const playlistItems = await waitFor(() => queryAllByText(String(playlist[key])))
        expect(playlistItems.length).toBe(1)
      }

      // Ensure items that shouldn't be rendered aren't rendered
      for (const key of undisplayedKeys) {
        const playlistItems = await waitFor(() => queryAllByText(String(playlist[key])))
        expect(playlistItems.length).toBe(0)
      }
    }
  })

  test('when given no playlists', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])
    await assertNoButtonsRendered();
  })

  test('on network error', async () => {
    mock.onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`).networkError()
    await assertNoButtonsRendered();
  })
})

describe('Check playlists navigation', () => {
  const mockNavigator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, [PLAYLISTS_BY_OFFERING_RESPONSE[0]])

    const { queryAllByA11yRole } = render(
      <CoursePlaylistsContainer courseId={offeringId} navigation={mockNavigator} />
    )
    const playlists = await waitFor(() => queryAllByA11yRole('button'))
    expect(playlists.length).not.toBe(0)

    fireEvent.press(playlists[0])
    const expectedPlaylistId = PLAYLISTS_BY_OFFERING_RESPONSE[0].id

    expect(mockNavigator.push).toHaveBeenCalled()
    expect(mockNavigator.push).toHaveBeenCalledWith(STACK_SCREENS.PLAYLIST, {
      playlistId: expectedPlaylistId,
    })
  })
})
