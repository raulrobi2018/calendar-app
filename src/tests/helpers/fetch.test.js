import {fetchWithOutToken, fetchWithToken} from "../../helpers/fetch";

describe("Testing fetch.js", () => {
    let token = "";

    test("fetchWithoutToken should run correctly", async () => {
        const resp = await fetchWithOutToken(
            "auth",
            {
                email: "test@gmail.com",
                password: "test123"
            },
            "POST"
        );

        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);

        token = body.token;
    });

    test("fetchWithToken should run correctly", async () => {
        localStorage.setItem("token", token);

        //Puego probar con cualquier endpoint
        const resp = await fetchWithToken(
            "events/60986c3550e0cf4ec8a8672a",
            {},
            "DELETE"
        );

        const body = await resp.json();
        expect(body.msg).toBe("The event doesn't exist");
    });
});
