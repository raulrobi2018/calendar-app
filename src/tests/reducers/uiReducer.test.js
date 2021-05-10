import {uiReducer} from "../../reducers/uiReducer";
import {uiCloseModal, uiOpenModal} from "../../actions/ui";

const initialState = {
    modalOpen: false
};

describe("Testing uiReducer", () => {
    test("should return the default state", () => {
        const state = uiReducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test("should open and close the modal", () => {
        const modalOpen = uiOpenModal();
        const state = uiReducer(initialState, modalOpen);
        expect(state).toEqual({modalOpen: true});

        const modalClose = uiCloseModal();
        const stateClose = uiReducer(state, modalClose);
        expect(stateClose).toEqual({modalOpen: false});
    });
});
