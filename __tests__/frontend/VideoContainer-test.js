import axios from 'axios'
import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { format } from '../../src/utils/string'
import { ENDPOINTS } from '../../src/api/universities'
import { HTTP_STATUS_CODES } from '../../src/api'
import { DEPARTMENTS_RESPONSE } from '../mock_responses/mock-department-response'
//import { VideoContainer } from '../../src/containers/VideoContainer/VideoContainer'
import {App} from '../../App'

describe('Check rendering', () => {
  afterEach(() => {
    mock.reset()
  })

  test('Check that all show up', async () => {
    mock
      .onGet(`${format(ENDPOINTS.DEPARTMENTS, universityId)}`)
      .reply(HTTP_STATUS_CODES.OK, DEPARTMENTS_RESPONSE)

    const { queryByText, queryAllByA11yRole } = render(
      <VideoContainer videos={VIDEOS_BY_PLAYLIST_RESPONSE.media} index={0} />
    )
  })
})
