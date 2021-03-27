import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { PLAYLISTS_BY_OFFERING_RESPONSE, VIDEOS_BY_PLAYLIST_RESPONSE } from '../mock_responses/mock-playlists-response'
import { format } from '../../src/utils/string'
import Reccomend from '../../src/components/Recommend/Recommend'
import { STACK_SCREENS } from '../../src/containers/CTNavigationContainer'

const mock = new MockAdapter(axios)
describe('Check videos rendering -- mode false', () => {
  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
  const playlistId = '51519746-aa6c-485c-9894-549959c457b5'

  afterEach(() => {
    mock.reset()
  })
  
  test('when given many Videos', async () => {
    const mockNaivgator = { push: jest.fn() }
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)
    
    const { queryByText, queryAllByA11yRole } = render(
      <Reccomend courseId={offeringId} navigation={mockNaivgator} mode={false}/>
    )
    expect(queryByText('Placeholder')).toBe(null);
    expect(queryByText('ERR: Unexpected case occur')).toBe(null);
    expect(queryByText('Active Playlist')).not.toBe(null);
    expect(queryByText(PLAYLISTS_BY_OFFERING_RESPONSE[0].name)).toBe(null);
    for(var i =0; i<3; i++)
      expect(queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[i].name)).toBe(null);
  })

  test('when given no Videos', async () => {
    const mockNaivgator = { push: jest.fn() }
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])
    
    const { queryByText, queryAllByA11yRole } = render(
      <Reccomend courseId={offeringId} navigation={mockNaivgator} mode={false}/>
    )

    expect(queryByText('dddd')).toBe(null);
    expect(queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[0].name)).toBe(null);
    expect(queryByText('ERR: Unexpected case occur')).toBe(null);
    expect(queryByText('Active Playlist')).not.toBe(null);
    for(var i =0; i<VIDEOS_BY_PLAYLIST_RESPONSE.length - 1; i++)
      expect(queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[i].name)).toBe(null);
  })
})

describe('Check videos rendering -- mode true', () => {
  const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
  const playlistId = '51519746-aa6c-485c-9894-549959c457b5'

  afterEach(() => {
    mock.reset()
  })
  
  test('when given many Videos', async () => {
    const mockNaivgator = { push: jest.fn() }
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, VIDEOS_BY_PLAYLIST_RESPONSE)
    
    const { queryByText, queryAllByA11yRole } = render(
      <Reccomend courseId={offeringId} navigation={mockNaivgator} mode={true}/>
    )
    expect(queryByText('Placeholder')).toBe(null);
    expect(queryByText('ERR: Unexpected case occur')).toBe(null);
    expect(queryByText('Active Playlist')).not.toBe(null);
    expect(queryByText(PLAYLISTS_BY_OFFERING_RESPONSE[0].name)).toBe(null);
    for(var i =0; i<VIDEOS_BY_PLAYLIST_RESPONSE.length - 2; i++)
      expect(queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[i].name)).toBe(null);
  })

  test('when given no Videos', async () => {
    const mockNaivgator = { push: jest.fn() }
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
      .onGet(`${format(ENDPOINTS.VIDEOS_BY_PLAYLIST, playlistId)}`)
      .reply(HTTP_STATUS_CODES.OK, [])
    
    const { queryByText, queryAllByA11yRole } = render(
      <Reccomend courseId={offeringId} navigation={mockNaivgator} mode={true}/>
    )

    expect(queryByText('dddd')).toBe(null);
    expect(queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[0].name)).toBe(null);
    expect(queryByText('ERR: Unexpected case occur')).toBe(null);
    expect(queryByText('Active Playlist')).not.toBe(null);
    for(var i =0; i<VIDEOS_BY_PLAYLIST_RESPONSE.length - 1; i++)
      expect(queryByText(VIDEOS_BY_PLAYLIST_RESPONSE.medias[i].name)).toBe(null);
  })
})
