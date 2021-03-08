import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getCurrentAuthenticatedUser, authenticateUser, ENDPOINTS, isUserAuthenticated } from "../../src/api/auth";
import { HTTP_STATUS_CODES } from "../../src/api";
import { SIGN_IN_RESPONSE } from './mock-response';

describe("Is User Authenticated", () => {
    let mock = new MockAdapter(axios);

    afterEach(() => {
        mock.reset();
    })

    test("when not signed in", () => {
        expect(isUserAuthenticated()).toBe(false);
        expect(getCurrentAuthenticatedUser()).toBe(null);
    });

    test("after successful sign in", async () => {
        mock.onGet(`${ENDPOINTS.SIGN_IN}`).reply(HTTP_STATUS_CODES.OK, SIGN_IN_RESPONSE);
        await authenticateUser();

        expect(isUserAuthenticated()).toBe(true);
        expect(getCurrentAuthenticatedUser()).toStrictEqual(SIGN_IN_RESPONSE);
    });

    test("after sign in with bad status code", async () => {
        mock.onGet(`${ENDPOINTS.SIGN_IN}`).reply(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, SIGN_IN_RESPONSE);
        await authenticateUser();

        expect(isUserAuthenticated()).toBe(false);
        expect(getCurrentAuthenticatedUser()).toBe(null);
    });
})