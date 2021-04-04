import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { render, waitFor } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import {
  PLAYLISTS_BY_OFFERING_RESPONSE,
  VIDEOS_BY_PLAYLIST_RESPONSE,
} from '../mock_responses/mock-playlists-response'
import { format } from '../../src/utils/string'
import Reccomend from '../../src/components/Recommend/Recommend'

const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
const playlistId = '51519746-aa6c-485c-9894-549959c457b5'
const mock = new MockAdapter(axios)

const assertFirstNVideosNotRendered = async (numVideosToCheck) => {
  const { queryByText } = render(
    <Reccomend courseId={offeringId} mode={false} />
  )

  expect(await waitFor(() => queryByText('dddd'))).toBe(null)
  expect(await waitFor(() => queryByText('Placeholder'))).toBe(null)
  expect(await waitFor(() => queryByText('ERR: Unexpected case occur'))).toBe(null)
  expect(await waitFor(() => queryByText('Active Playlist'))).not.toBe(null)
  expect(await waitFor(() => queryByText(PLAYLISTS_BY_OFFERING_RESPONSE[0].name))).toBe(null)
  for (let i = 0; i < numVideosToCheck; i += 1) {
    expect(await waitFor(() => queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[i].name))).toBe(
      null
    )
  }
}

describe('Check videos rendering -- mode false', () => {
  afterEach(() => {
    mock.reset()
  })

  test('when given many Videos', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)

    await assertFirstNVideosNotRendered(VIDEOS_BY_PLAYLIST_RESPONSE.length - 1);
  })

  test('when given no Videos', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])

    await assertFirstNVideosNotRendered(VIDEOS_BY_PLAYLIST_RESPONSE.length - 1);
  })
})

describe('Check videos rendering -- mode true', () => {
  afterEach(() => {
    mock.reset()
    mock.onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
  })

  test('when given many Videos', async () => {
      mock.onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)

    await assertFirstNVideosNotRendered(VIDEOS_BY_PLAYLIST_RESPONSE.length - 2)
  })

  test('when given no Videos', async () => {
    mock
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])

    await assertFirstNVideosNotRendered(VIDEOS_BY_PLAYLIST_RESPONSE.length - 1)
  })
})