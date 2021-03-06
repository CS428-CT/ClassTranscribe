import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { getUserMetadata, setAuthToken, signOutUser } from '../../src/api/auth'
import { format } from '../../src/utils/string'
import {
  addStarredOferring,
  getOfferingData,
  getStarredOfferings,
  getStarredOfferingsData,
  removeStarredOffering,
  sortOfferingsByDepartment,
} from '../../src/api/offerings'
import { HTTP_STATUS_CODES } from '../../src/api'
import {
  OFFERINGS_RESPONSE_1,
  OFFERINGS_RESPONSE_2,
  STARRED_OFFERINGS_RESPONSE,
} from '../mock_responses/mock-offerings-response'

import { ENDPOINTS } from '../../src/api/api-requests'
import { METADATA_RESPONSE } from '../mock_responses/mock-auth-response'

const MOCK_AUTH_TOKEN = 'a'
const mock = new MockAdapter(axios)
describe('Get starred offerings', () => {
  beforeEach(() => {
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
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
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
  })

  afterEach(async () => {
    await signOutUser()
    mock.reset()
  })

  test('when authenticated', async () => {
    const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
    mock
      .onGet(`${format(ENDPOINTS.OFFERING, offeringId)}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)
    setAuthToken(MOCK_AUTH_TOKEN)

    const offeringData = await getOfferingData(offeringId)
    expect(offeringData).toStrictEqual(OFFERINGS_RESPONSE_1)
  })

  test('with network error', async () => {
    const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'
    mock.onGet(`${format(ENDPOINTS.OFFERING, offeringId)}`).networkError()
    mock.onGet(`${ENDPOINTS.OFFERING}`).networkError()

    const offeringData = await getOfferingData(offeringId)
    expect(offeringData).toBe(null)
  })
})

describe('Get starred offerings data', () => {
  beforeEach(() => {
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
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
      .onGet(`${format(ENDPOINTS.OFFERING, offerings[0])}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_1)
    mock
      .onGet(`${format(ENDPOINTS.OFFERING, offerings[1])}`)
      .reply(HTTP_STATUS_CODES.OK, OFFERINGS_RESPONSE_2)
    setAuthToken(MOCK_AUTH_TOKEN)
    await getUserMetadata()

    const starredOfferings = await getStarredOfferingsData()
    expect(starredOfferings).toStrictEqual([OFFERINGS_RESPONSE_1, OFFERINGS_RESPONSE_2])
  })

  test('with network error', async () => {
    mock.onGet(`${ENDPOINTS.OFFERING}`).networkError()
    const offerings = [
      'ac5b1727-629c-443b-8c1a-cc1bd541af6a',
      '2c7a83cc-e2f3-493a-ae65-33f9c998e8ed',
    ]
    mock.onGet(`${format(ENDPOINTS.OFFERING, offerings[0])}`).networkError()
    mock.onGet(`${format(ENDPOINTS.OFFERING, offerings[1])}`).networkError()
    setAuthToken(MOCK_AUTH_TOKEN)
    await getUserMetadata()

    const starredOfferings = await getStarredOfferingsData()
    expect(starredOfferings).toStrictEqual([])
  })
})

describe('Modify starred offerings', () => {
  beforeEach(() => {
    mock.onGet(`${ENDPOINTS.USER_METADATA}`).reply(HTTP_STATUS_CODES.OK, METADATA_RESPONSE)
    mock.onPost(`${ENDPOINTS.POST_USER_METADATA}`).reply(HTTP_STATUS_CODES.OK)
    setAuthToken(MOCK_AUTH_TOKEN)
  })

  afterEach(async () => {
    mock.reset()
  })

  test('Add offering', async () => {
    const offeringToAdd = 'testOfferingId'

    await getUserMetadata()
    const originalStarredOfferings = await getStarredOfferings()
    await addStarredOferring(offeringToAdd)
    const updatedStarredOfferings = await getStarredOfferings()

    const expected = { [offeringToAdd]: 'starred', ...originalStarredOfferings }
    expect(updatedStarredOfferings).toStrictEqual(expected)
  })

  test('Remove offering', async () => {
    await getUserMetadata()
    const originalStarredOfferings = await getStarredOfferings()

    const toRemove = Object.keys(originalStarredOfferings)[0]

    await removeStarredOffering(toRemove)
    const updatedStarredOfferings = await getStarredOfferings()

    const expected = originalStarredOfferings
    delete expected[toRemove]

    expect(updatedStarredOfferings).toStrictEqual(expected)
  })
})

describe('Sort starred offergins', () => {
  test('When empty', () => {
    const unsorted = []
    const expected = []

    expect(sortOfferingsByDepartment(unsorted)).toStrictEqual(expected)
  })

  test('With single course', () => {
    const unsorted = [{ courses: [{ departmentAcronym: 'CS' }] }]

    const expected = unsorted

    expect(sortOfferingsByDepartment(unsorted)).toStrictEqual(expected)
  })

  test('With many courses', () => {
    const unsorted = [
      { courses: [{ departmentAcronym: 'FSHN' }] },
      { courses: [{ departmentAcronym: 'CS' }] },
      { courses: [{ departmentAcronym: 'ECE' }] },
      { courses: [{ departmentAcronym: 'CS' }] },
      { courses: [{ departmentAcronym: 'AAA' }] },
      { courses: [{ departmentAcronym: 'EE' }] },
    ]

    const expected = [
      { courses: [{ departmentAcronym: 'AAA' }] },
      { courses: [{ departmentAcronym: 'CS' }] },
      { courses: [{ departmentAcronym: 'CS' }] },
      { courses: [{ departmentAcronym: 'ECE' }] },
      { courses: [{ departmentAcronym: 'EE' }] },
      { courses: [{ departmentAcronym: 'FSHN' }] },
    ]

    expect(sortOfferingsByDepartment(unsorted)).toStrictEqual(expected)
  })
})
