import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor, fireEvent } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { VIDEOS_BY_PLAYLIST_RESPONSE } from '../mock_responses/mock-playlists-response'
import { format } from '../../src/utils/string'
import PlaylistContainer from '../../src/containers/PlaylistContainer/PlaylistContainer'
import { FILE_SERVER_BASE_URL } from '../../src/constants'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'

const mock = new MockAdapter(axios)
describe('Check videos rendering', () => {
  const playlistId = '51519746-aa6c-485c-9894-549959c457b5'

  afterEach(() => {
    mock.reset()
  })

  test('when given many videos', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)

    const { queryByText, queryAllByA11yRole } = render(
      <PlaylistContainer playlistId={playlistId} />
    )
    const videos = await waitFor(() => queryAllByA11yRole('button'))
    expect(videos.length).not.toBe(0)

    for (let i = 0; i < videos.length; i += 1) {
      const video = VIDEOS_BY_PLAYLIST_RESPONSE.medias[i]
      const videoItem = await waitFor(() => queryByText(video.name))
      expect(videoItem).not.toBe(null)
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
    const firstVideo = VIDEOS_BY_PLAYLIST_RESPONSE.medias.find((v) => v.index === 0)
    const expectedVideoUrl = FILE_SERVER_BASE_URL + firstVideo.video.video1Path

    expect(mockNaivgator.push).toHaveBeenCalled()
    expect(mockNaivgator.push).toHaveBeenCalledWith(STACK_SCREENS.VIDEO, { url: expectedVideoUrl })
  })
})
