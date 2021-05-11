import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";

import {DeleteFab} from "../../../components/ui/DeleteFab";
import {eventStartDelete} from "../../../actions/events";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";

jest.mock("../../../actions/events", () => ({
    eventStartDelete: jest.fn()
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
        <DeleteFab />
    </Provider>
);

describe("Testing DeleteFab component", () => {
    test("should display correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    test("should run the eventStartDelete", () => {
        const a = wrapper.find(".btn-del").simulate("click", {});
        //Evalúa que se haya llamdo
        expect(eventStartDelete).toHaveBeenCalled();
    });
});
