import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";

import {startLogin, startRegister} from "../../../actions/auth";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {LoginScreen} from "../../../components/auth/LoginScreen";
import Swal from "sweetalert2";

jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

jest.mock("../../../actions/auth", () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
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
        wrapper.find('input[name="lEmail"]').simulate("change", {
            target: {
                name: "lEmail",
                value: "raul@gmail.com"
            }
        });

        wrapper.find('input[name="lPassword"]').simulate("change", {
            target: {
                name: "lPassword",
                value: "123456"
            }
        });

        wrapper.find("form").at(0).prop("onSubmit")({preventDefault() {}});

        expect(startLogin).toHaveBeenCalledWith("raul@gmail.com", "123456");
    });

    test("No register if the password are diferent", () => {
        wrapper.find('input[name="rPassword1"]').simulate("change", {
            target: {
                name: "rPassword1",
                value: "123"
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate("change", {
            target: {
                name: "rPassword2",
                value: "1234"
            }
        });

        wrapper.find("form").at(1).prop("onSubmit")({preventDefault() {}});

        expect(startRegister).toHaveBeenCalledWith("123", "1234");

        expect(startRegister).not.toHaveBeenCalled();

        expect(Swal.fire).toHaveBeenCalledWith(
            "Error",
            "Las contraseñas deben ser iguales",
            "error"
        );
    });

    test("Passwords in Register should be the same", () => {
        wrapper.find('input[name="rPassword1"]').simulate("change", {
            target: {
                name: "rPassword1",
                value: "123"
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate("change", {
            target: {
                name: "rPassword2",
                value: "123"
            }
        });

        wrapper.find("form").at(1).prop("onSubmit")({preventDefault() {}});

        expect(Swal.fire).not.toHaveBeenCalled();

        expect(startRegister).toHaveBeenCalledWith(
            "raul@gmail.com",
            "123",
            "Raul"
        );
    });
});
