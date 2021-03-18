import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { format } from '../../src/utils/string'
import { ENDPOINTS, getPlaylistsByOffering } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { PLAYLISTS_BY_OFFERING_RESPONSE } from '../mock_responses/mock-playlists-response'

const mock = new MockAdapter(axios)
describe('Get playlists by offering', () => {
  const offeringId = "ac5b1727-629c-443b-8c1a-cc1bd541af6a";

  afterEach(async () => {
    mock.reset()
  })

  test('when successful', async () => {
    mock
      .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)
    const playlists = await getPlaylistsByOffering(offeringId);
    expect(playlists).toStrictEqual(PLAYLISTS_BY_OFFERING_RESPONSE)
  })
})