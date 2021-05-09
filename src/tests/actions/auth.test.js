import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
//Para que me muestre la ayuda
import "@testing-library/jest-dom";
import Swal from "sweetalert2";
import {startLogin, startRegister} from "../../actions/auth";
import {types} from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

//Creo mock para SweetAlert
jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

describe("Testing auth.js", () => {
    //Siempre limpio los actions que tenga el store
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test("The startLogin function should run correctly", async () => {
        await store.dispatch(startLogin("test@gmail.com", "test123"));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token",
            expect.any(String)
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token-init-date",
            expect.any(Number)
        );

        //Si quiero extraer los argumentos con los que fue llamada una función de jest
        // console.log(localStorage.setItem.mock.calls);
        // const token = localStorage.setItem.mock.calls[0][1];
    });

    test("Testing startLogin when is incorrect", async () => {
        //Password incorrect
        await store.dispatch(startLogin("test@gmail.com", "test123456"));

        const actions = store.getActions();

        expect(actions).toEqual([]);

        expect(Swal.fire).toHaveBeenCalledWith(
            "Error",
            "User or password incorrect",
            "error"
        );
    });

    test("startRegister correct", async () => {
        fetchModule.fetchWithOutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: "Carlos",
                    token: "ABC1321321asdfasdf"
                };
            }
        }));

        await store.dispatch(
            startRegister("test1@gmail.com", "123456", "Test 1")
        );
        const actions = store.getActions();

        console.log(actions);
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: "123",
                name: "Carlos"
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token",
            "ABC1321321asdfasdf"
        );
        expect(localStorage.setItem).toHaveBeenCalledWith(
            "token-init-date",
            expect.any(Number)
        );
    });
});
