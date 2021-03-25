import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { format } from '../../src/utils/string'
import { ENDPOINTS, getPlaylistsByOffering, getVideosByPlaylist } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import {
  PLAYLISTS_BY_OFFERING_RESPONSE,
  VIDEOS_BY_PLAYLIST_RESPONSE,
} from '../mock_responses/mock-playlists-response'

const mock = new MockAdapter(axios)
describe('Get playlists by offering', () => {
  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'

  afterEach(async () => {
    mock.reset()
  })

  test('when successful', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
    const playlists = await getPlaylistsByOffering(offeringId)
    expect(playlists).toStrictEqual(PLAYLISTS_BY_OFFERING_RESPONSE)
  })

  test('when network error', async () => {
    mock.onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`).networkError()
    const playlists = await getPlaylistsByOffering(offeringId)
    expect(playlists).toBe(null)
  })

  test('when bad status code', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, PLAYLISTS_BY_OFFERING_RESPONSE)
    const playlists = await getPlaylistsByOffering(offeringId)
    expect(playlists).toBe(null)
  })
})

describe('Get videos by playlists', () => {
  const playlistId = '51519746-aa6c-485c-9894-549959c457b5'

  afterEach(async () => {
    mock.reset()
  })

  test('when successful', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)
    const videos = await getVideosByPlaylist(playlistId)
    expect(videos).toStrictEqual(VIDEOS_BY_PLAYLIST_RESPONSE)
  })

  test('when network error', async () => {
    mock.onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`).networkError()
    const videos = await getVideosByPlaylist(playlistId)
    expect(videos).toBe(null)
  })

  test('when bad status code', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, PLAYLISTS_BY_OFFERING_RESPONSE)
    const videos = await getPlaylistsByOffering(playlistId)
    expect(videos).toBe(null)
  })
})
