import React from 'react'
import { render, waitFor } from '@testing-library/react-native'
import VideoContainer from '../../src/containers/VideoContainer/VideoContainer'
import { VIDEOS_BY_PLAYLIST_RESPONSE } from '../mock_responses/mock-playlists-response'

const sanityCheck = async (queryByText, queryAllByA11yRole, index) => {
  const expectingTitle = VIDEOS_BY_PLAYLIST_RESPONSE.medias[index].jsonMetadata.title
  const title = await waitFor(() => queryByText(expectingTitle))
  expect(title).not.toBe(null)
  const buttons = await waitFor(() => queryAllByA11yRole('button'))
  expect(buttons.length).not.toBe(0)
  expect(buttons.length).toBe(1)
}

describe('Check rendering', () => {
  test('Check minimum gaurantee', async () => {
    const { queryByText, queryAllByA11yRole } = render(
      <VideoContainer videos={VIDEOS_BY_PLAYLIST_RESPONSE.medias} index={1} />
    )
    await sanityCheck(queryByText, queryAllByA11yRole, 1)
    const video = await waitFor(() => queryAllByA11yRole('adjustable'))
    expect(video).not.toBe(null)
  })
})
