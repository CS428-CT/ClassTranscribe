import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor, fireEvent } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { VIDEOS_BY_PLAYLIST_RESPONSE } from '../mock_responses/mock-playlists-response'
import { format } from '../../src/utils/string'
import PlaylistContainer from '../../src/containers/PlaylistContainer/PlaylistContainer'
// import { FILE_SERVER_BASE_URL } from '../../src/constants'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'

const mock = new MockAdapter(axios)
describe('Check videos rendering', () => {
  const playlistId = '51519746-aa6c-485c-9894-549959c457b5'
  const displayedKeys = ['name']
  const undisplayedKeys = [
    'index',
    'duration',
    'ready',
    'sourceType',
    'createdAt',
    'playlistId',
    'id',
  ]

  afterEach(() => {
    mock.reset()
  })

  test('when given many videos', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)

    const { queryAllByText, queryAllByA11yRole } = render(
      <PlaylistContainer playlistId={playlistId} />
    )

    const videos = await waitFor(() => queryAllByA11yRole('button'))
    expect(videos.length).not.toBe(0)

    for (let i = 0; i < videos.length; i += 1) {
      const video = VIDEOS_BY_PLAYLIST_RESPONSE.medias[i]
      // Ensure items that should be rendered are rendered once
      for (const key of displayedKeys) {
        const videoItems = await waitFor(() => queryAllByText(String(video[key])))
        expect(videoItems.length).toBe(1)
      }

      // Ensure items that shouldn't be rendered aren't rendered
      for (const key of undisplayedKeys) {
        const videoItems = await waitFor(() => queryAllByText(String(video[key])))
        expect(videoItems.length).toBe(0)
      }
    }
  })

  test('when given no videos', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])

    const { queryAllByA11yRole } = render(<PlaylistContainer playlistId={playlistId} />)
    const videos = await waitFor(() => queryAllByA11yRole('button'))
    expect(videos.length).toBe(0)
  })

  test('on network error', async () => {
    mock.onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, playlistId)}`).networkError()

    const { queryAllByA11yRole } = render(<PlaylistContainer playlistId={playlistId} />)
    const videos = await waitFor(() => queryAllByA11yRole('button'))
    expect(videos.length).toBe(0)
  })
})

describe('Check video navigation', () => {
  const playlistId = '51519746-aa6c-485c-9894-549959c457b5'
  const mockNaivgator = { push: jest.fn() }

  test('when clicking on first item', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)

    const { queryAllByA11yRole } = render(
      <PlaylistContainer playlistId={playlistId} navigation={mockNaivgator} />
    )
    const videos = await waitFor(() => queryAllByA11yRole('button'))
    expect(videos.length).not.toBe(0)

    fireEvent.press(videos[0])

    expect(mockNaivgator.push).toHaveBeenCalled()
    expect(mockNaivgator.push).toHaveBeenCalledWith(STACK_SCREENS.VIDEO, {
      videos: VIDEOS_BY_PLAYLIST_RESPONSE.medias,
      index: 0,
    })
  })
})
