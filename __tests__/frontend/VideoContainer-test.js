import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import VideoContainer from '../../src/containers/VideoContainer/VideoContainer'
import { VIDEOS_BY_PLAYLIST_RESPONSE } from '../mock_responses/mock-playlists-response'

const sanityCheck = async (queryByText, queryAllByA11yRole, index) => {
  const expectingTitle = VIDEOS_BY_PLAYLIST_RESPONSE.medias[index].jsonMetadata.title
  const title = await waitFor(() => queryByText(expectingTitle))
  expect(title).not.toBe(null)
  const buttons = await waitFor(() => queryAllByA11yRole('button'))
  expect(buttons.length).not.toBe(0)
  expect(buttons.length).toBe(3)
}

describe('Check rendering', () => {
  test('Check minimum gaurantee', async () => {
    const { queryByText, queryAllByA11yRole } = render(
      <VideoContainer videos={VIDEOS_BY_PLAYLIST_RESPONSE.medias} index={1} />
    )
    await sanityCheck(queryByText, queryAllByA11yRole, 1)
    expect(await waitFor(() => queryByText('Next Video'))).not.toBeDisabled()
    expect(await waitFor(() => queryByText('Previous Video'))).not.toBeDisabled()
  })

  test('Test Next/Prev button status', async () => {
    const { queryByText, queryAllByA11yRole } = render(
      <VideoContainer videos={VIDEOS_BY_PLAYLIST_RESPONSE.medias.slice(0, 1)} index={0} />
    )
    await sanityCheck(queryByText, queryAllByA11yRole, 0)
    const nextButton = await waitFor(() => queryByText('Next Video'))
    const prevButton = await waitFor(() => queryByText('Previous Video'))
    expect(nextButton).toBeDisabled()
    expect(prevButton).toBeDisabled()
  })
})

describe('Moving between videos', () => {
  test('Check Moving Between Page', async () => {
    const { queryByText, queryAllByA11yRole } = render(
      <VideoContainer videos={VIDEOS_BY_PLAYLIST_RESPONSE.medias} index={2} />
    )
    await sanityCheck(queryByText, queryAllByA11yRole, 2)
    expect(await waitFor(() => queryByText('Next Video'))).not.toBeDisabled()
    expect(await waitFor(() => queryByText('Previous Video'))).not.toBeDisabled()
    const nextButton = await waitFor(() => queryByText('Next Video'))
    fireEvent.press(nextButton)
    await sanityCheck(queryByText, queryAllByA11yRole, 3)
    const prevButton = await waitFor(() => queryByText('Previous Video'))
    fireEvent.press(prevButton)
    await sanityCheck(queryByText, queryAllByA11yRole, 2)
  })

  test('Check First to Last', async () => {
    const { queryByText, queryAllByA11yRole } = render(
      <VideoContainer videos={VIDEOS_BY_PLAYLIST_RESPONSE.medias} index={0} />
    )
    await sanityCheck(queryByText, queryAllByA11yRole, 0)
    expect(await waitFor(() => queryByText('Previous Video'))).toBeDisabled()
    let step = 0
    for (step = 0; step < VIDEOS_BY_PLAYLIST_RESPONSE.medias.length - 1; step += 1) {
      const nextButton = await waitFor(() => queryByText('Next Video'))
      expect(await waitFor(() => queryByText('Next Video'))).not.toBeDisabled()
      sanityCheck(queryByText, queryAllByA11yRole, step)
      fireEvent.press(nextButton)
      expect(await waitFor(() => queryByText('Previous Video'))).not.toBeDisabled()
    }
    expect(await waitFor(() => queryByText('Next Video'))).toBeDisabled()
    await sanityCheck(
      queryByText,
      queryAllByA11yRole,
      VIDEOS_BY_PLAYLIST_RESPONSE.medias.length - 1
    )
  })
})
