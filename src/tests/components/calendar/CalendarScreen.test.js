import React from "react";
import {mount, configure} from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {Provider} from "react-redux";
import {act} from "@testing-library/react";

//Configuración necesaria para que funcione mount con React 17
configure({adapter: new Adapter()});
import configureStore from "redux-mock-store"; //ES6 modules
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import {CalendarScreen} from "../../../components/calendar/CalendarScreen";
import {messages} from "../../../helpers/calendarMessagesEsp";
import {types} from "../../../types/types";
import {eventSetActive, eventsLoad} from "../../../actions/events";

jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

jest.mock("../../../actions/events", () => ({
    eventSetActive: jest.fn(),
    eventsLoad: jest.fn()
}));

Storage.prototype.setItem = jest.fn();

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

    test("testing interactions calendar ", () => {
        const calendar = wrapper.find("Calendar");

        const calendarMessages = calendar.prop("messages");
        //Testea los mensajes
        expect(calendarMessages).toEqual(messages);
        //Testea el evento onDoubleClickEvent
        calendar.prop("onDoubleClickEvent")();
        expect(store.dispatch).toHaveBeenCalledWith({type: types.uiOpenModal});
        //Testea el evento onSelectEvetn
        calendar.prop("onSelectEvent")({value: "hola"});
        //Esta es otra manera de testear lo mismo que con el onDoubleClick pero creando el mock
        expect(eventSetActive).toHaveBeenCalledWith({value: "hola"});
        //Testea el evento onView
        act(() => {
            calendar.prop("onView")("week");
            expect(localStorage.setItem).toHaveBeenCalledWith(
                "lastView",
                "week"
            );
        });
    });
});
