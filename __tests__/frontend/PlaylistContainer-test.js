import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { VIDEOS_BY_PLAYLIST_RESPONSE } from '../mock_responses/mock-playlists-response'
import { format } from '../../src/utils/string'
import PlaylistContainer from '../../src/containers/PlaylistContainer/PlaylistContainer'

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

   const { queryByText, queryAllByA11yRole } = render(<PlaylistContainer playlistId={playlistId} />)
   const videos = await waitFor(() => queryAllByA11yRole('button'))
   expect(videos.length).not.toBe(0);

   for(let i = 0; i < videos.length; i++){
     const video = VIDEOS_BY_PLAYLIST_RESPONSE.medias[i];
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

// describe('Check playlists navigation', () => {
//   const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
//   const mockNaivgator = {push: jest.fn((screenName, params) => {})}

//   test('when clicking on first item', async () => {
//     mock
//       .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
//       .reply(HTTP_STATUS_CODES.OK, [PLAYLISTS_BY_OFFERING_RESPONSE[0]])

//     const { queryAllByA11yRole } = render(<CoursePlaylistsContainer courseId={offeringId} navigation={mockNaivgator} />)
//     const playlists = await waitFor(() => queryAllByA11yRole('button'))
//     expect(playlists.length).not.toBe(0)

//     fireEvent.press(playlists[0])
//     const expectedVideoUrl = FILE_SERVER_BASE_URL + PLAYLISTS_BY_OFFERING_RESPONSE[0].video.video1Path;

//     expect(mockNaivgator.push).toHaveBeenCalled();
//     expect(mockNaivgator.push).toHaveBeenCalledWith(STACK_SCREENS.VIDEO, expectedVideoUrl)
//   })
// });