import axios from 'axios'
import React from 'react';
import MockAdapter from 'axios-mock-adapter'
import { ENDPOINTS } from '../../src/api/playlists'
import { HTTP_STATUS_CODES } from '../../src/api'
import { PLAYLISTS_BY_OFFERING_RESPONSE } from '../mock_responses/mock-playlists-response'
import { render, waitFor } from '@testing-library/react-native'
import { format } from '../../src/utils/string'
import CoursePlaylistsContainer from '../../src/containers/CoursePlaylistsContainer/CoursePlaylistsContainer'

const mock = new MockAdapter(axios)
describe('Check playlists rendering', () => {
    const offeringId = 'ac5b1727-629c-443b-8c1a-cc1bd541af6a'

    afterEach(() => {
        mock.reset();
    })

    test('when given many playlists', async () => {
        mock
        .onGet(`${format(ENDPOINTS.PLAYLISTS_BY_OFFERING, offeringId)}`)
        .reply(HTTP_STATUS_CODES.OK, PLAYLISTS_BY_OFFERING_RESPONSE)

        const { queryByText } = render(<CoursePlaylistsContainer courseId={offeringId} />)

        PLAYLISTS_BY_OFFERING_RESPONSE.forEach(async (playlist) => {
            const playlistItem = await waitFor(() => queryByText(playlist.name));
            expect(playlistItem).not.toBe(null);
        });

    })
})