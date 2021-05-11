import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

import {AppRouter} from "../../routers/AppRouter";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//Reemplaza la funcionalidad del dispatch del store por una función jest
// store.dispatch = jest.fn();

describe("Testing AppRouter component", () => {
    test("should display the Cargando...", () => {
        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find("h5").exists()).toBe(true);
    });
});
