import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import {CalendarScreen} from "../../../components/calendar/CalendarScreen";

jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

// jest.mock("../../../actions/auth", () => ({
//     startLogin: jest.fn(),
//     startRegister: jest.fn()
// }));

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    calendar: {events: []},
    auth: {
        uid: "123",
        name: "Raul"
    },
    ui: {
        openModal: false
    }
};
const store = mockStore(initState);

//Reemplaza la funcionalidad del dispatch del store por una función jest
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

describe("Testing CalendarScreen component", () => {
    test("should display correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("tenting interactions calendar ", () => {});
});
