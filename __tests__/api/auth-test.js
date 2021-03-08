const { getCurrentAuthenticatedUser } = require("../../src/api/auth")

describe("Is User Authenticated", () => {
    test("when not signed in", () => {
        expect(getCurrentAuthenticatedUser()).toBe(null);
    })

    test("when signed in", () => {
        expect(getCurrentAuthenticatedUser()).not.toBe(null);
    })
    
})