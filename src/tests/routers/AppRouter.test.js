import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";

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
        // Inicializamos el state y el store dentro del test block
        //Porque el store va a estar cambiando en cada test
        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find("h1").exists()).toBe(true);
    });

    test("should display the public route", () => {
        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find(".login-container").exists()).toBe(true);
    });

    test("should display the private route", () => {
        const initState = {
            calendar: {
                events: []
            },
            auth: {
                checking: false,
                uid: "123",
                name: "Raul"
            },
            ui: {
                modalOpen: false
            }
        };
        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );
        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find(".calendar-screen").exists()).toBe(true);
    });
});
