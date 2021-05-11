import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";

import {startLogin} from "../../../actions/auth";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {LoginScreen} from "../../../components/auth/LoginScreen";

jest.mock("../../../actions/auth", () => ({
    startLogin: jest.fn()
}));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);

//Reemplaza la funcionalidad del dispatch del store por una función jest
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
);

describe("Testing LoginScreen component", () => {
    test("should display correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should run the dispatch login", () => {
        wrapper.find('input[name="lEmail"]').simulate("change"),
            {
                target: {
                    name: "lEmail",
                    value: "raul@gmail.com"
                }
            };

        wrapper.find('input[name="lPassword"]').simulate("change"),
            {
                target: {
                    name: "lPassword",
                    value: "123456"
                }
            };

        wrapper.find("form").at(0).prop("onSubmit")({preventDefault() {}});

        expect(startLogin).toHaveBeenCalledWith("raul@gmail.com", "123456");
    });
});
