import {authReducer} from "../../reducers/authReducer";
import {types} from "../../types/types";

const initialState = {
    checking: true
    // uid: null,
    // name: null
};

describe("Testing authReducer", () => {
    test("should return the default state ", () => {
        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState);
    });

    test("should authenticate the user", () => {
        const action = {
            type: types.authLogin,
            payload: {
                uid: "123",
                name: "Raul"
            }
        };

        const state = authReducer(initialState, action);

        expect(state).toEqual({checking: false, uid: "123", name: "Raul"});
    });
});
