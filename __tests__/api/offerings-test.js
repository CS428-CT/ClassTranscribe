import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  ENDPOINTS as AUTH_ENDPOINTS,
  getUserMetadata,
  setAuthToken,
  signOutUser,
} from '../../src/api/auth'
import { format } from '../../src/utils/string'
import {
  ENDPOINTS as OFFERING_ENDPOINTS,
  getOfferingData,
  getStarredOfferings,
  getStarredOfferingsData,
} from '../../src/api/offerings'
import { HTTP_STATUS_CODES } from '../../src/api'
import {
  OFFERINGS_RESPONSE_1,
  OFFERINGS_RESPONSE_2,
  STARRED_OFFERINGS_RESPONSE,
} from '../mock_responses/mock-offerings-response'
import { METADATA_RESPONSE } from '../mock_responses/mock-auth-response'

const MOCK_AUTH_TOKEN = 'a'
const mock = new MockAdapter(axios)
describe('Get starred offerings', () => {
  beforeEach(() => {
    mock.onGet(`${AUTH_ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
  })

  afterEach(async () => {
    await signOutUser()
    mock.reset()
  })

  test('when authenticated', async () => {
    setAuthToken(MOCK_AUTH_TOKEN)
    await getUserMetadata()
    const starredOfferings = await getStarredOfferings()
    expect(starredOfferings).toStrictEqual(STARRED_OFFERINGS_RESPONSE)
  })

  test('when not authenticated', async () => {
    const starredOfferings = await getStarredOfferings()
    expect(starredOfferings).toBe(null)
  })
})

describe('Get offerings data', () => {
  beforeEach(() => {
    mock.onGet(`${AUTH_ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
  })

  afterEach(async () => {
    await signOutUser()
    mock.reset()
  })

  test('when authenticated', async () => {
    const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
    mock
      .onGet(`${format(OFFERING_ENDPOINTS.OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)
    setAuthToken(MOCK_AUTH_TOKEN)

    const offeringData = await getOfferingData(offeringId)
    expect(offeringData).toStrictEqual(OFFERINGS_RESPONSE_1)
  })

  test('with network error', async () => {
    const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
    mock.onGet(`${format(OFFERING_ENDPOINTS.OFFERING, offeringId)}`).networkError()
    mock.onGet(`${OFFERING_ENDPOINTS.OFFERING}`).networkError()

    const offeringData = await getOfferingData(offeringId)
    expect(offeringData).toBe(null)
  })
})

describe('Get starred offerings data', () => {
  beforeEach(() => {
    mock.onGet(`${AUTH_ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
  })

  afterEach(async () => {
    await signOutUser()
    mock.reset()
  })

  test('when authenticated', async () => {
    const offerings = [
      'ac5b1727-629c-443b-8c1a-cc1bd541af6a',
      '2c7a83cc-e2f3-493a-ae65-33f9c998e8ed',
    ]
    mock
      .onGet(`${format(OFFERING_ENDPOINTS.OFFERING, offerings[0])}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)
    mock
      .onGet(`${format(OFFERING_ENDPOINTS.OFFERING, offerings[1])}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_2)
    setAuthToken(MOCK_AUTH_TOKEN)
    await getUserMetadata()

    const starredOfferings = await getStarredOfferingsData()
    expect(starredOfferings).toStrictEqual([OFFERINGS_RESPONSE_1, OFFERINGS_RESPONSE_2])
  })

  test('with network error', async () => {
    mock.onGet(`${OFFERING_ENDPOINTS.OFFERING}`).networkError()
    const offerings = [
      'ac5b1727-629c-443b-8c1a-cc1bd541af6a',
      '2c7a83cc-e2f3-493a-ae65-33f9c998e8ed',
    ]
    mock.onGet(`${format(OFFERING_ENDPOINTS.OFFERING, offerings[0])}`).networkError()
    mock.onGet(`${format(OFFERING_ENDPOINTS.OFFERING, offerings[1])}`).networkError()
    setAuthToken(MOCK_AUTH_TOKEN)
    await getUserMetadata()

    const starredOfferings = await getStarredOfferingsData()
    expect(starredOfferings).toStrictEqual([])
  })
})
