import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {act} from "@testing-library/react";
import moment from "moment";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import {types} from "../../../types/types";
import {eventSetActive, eventsLoad} from "../../../actions/events";
import {CalendarModal} from "../../../components/calendar/CalendarModal";

// jest.mock("../../../actions/events", () => ({
//     eventSetActive: jest.fn(),
//     eventsLoad: jest.fn()
// }));

Storage.prototype.setItem = jest.fn();

// Configuracion necesaria para probar dispatch
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//Lo inicializa en la hora actual más 1 hora
const dateNow = moment().minutes(0).seconds(0).add(1, "hours");
const dateFuture = dateNow.clone().add(1, "hours");

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: "Testing",
            notes: "Testing the component",
            start: dateNow.toDate(),
            end: dateFuture.toDate()
        }
    },
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
        <CalendarModal />
    </Provider>
);

describe("Testing CalendarModal component", () => {
    //Para probar este test debe estar abierto el Modal en la app
    test("should display the Modal", () => {
        //No se puede realizar el snapshot porque siempre fallaría ya que
        //el Modal tiene fechas que se generan dinamicamente
        expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
    });
});
