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
import {
    eventClearActive,
    eventsLoad,
    eventStartAddNew,
    eventStartUpdate
} from "../../../actions/events";
import {CalendarModal} from "../../../components/calendar/CalendarModal";
import Swal from "sweetalert2";

jest.mock("../../../actions/events", () => ({
    eventStartUpdate: jest.fn(),
    eventsLoad: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

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
    beforeEach(() => {
        jest.clearAllMocks();
    });

    //Para probar este test debe estar abierto el Modal en la app
    test("should display the Modal", () => {
        //No se puede realizar el snapshot porque siempre fallaría ya que
        //el Modal tiene fechas que se generan dinamicamente
        expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
    });

    test("should call the update and close modal actions", () => {
        wrapper.find("form").simulate("submit", {
            preventDefault() {}
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(
            initState.calendar.activeEvent
        );
        expect(eventClearActive).toHaveBeenCalled();
    });

    test("should display an error when the title is empty", () => {
        wrapper.find("form").simulate("submit", {
            preventDefault() {}
        });

        expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
            true
        );
    });

    test("should create a new event", () => {
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
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

        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Hola testing"
            }
        });

        wrapper.find("form").simulate("submit", {
            preventDefault() {}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: "Hola testing",
            notes: ""
        });

        expect(eventClearActive).toHaveBeenCalled();
    });

    test("should validate the dates", () => {
        wrapper.find('input[name="title"]').simulate("change", {
            target: {
                name: "title",
                value: "Hola testing"
            }
        });

        const hoy = new Date();

        act(() => {
            wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
        });

        wrapper.find("form").simulate("submit", {
            preventDefault() {}
        });

        expect(Swal.fire).toHaveBeenCalledWith(
            "Error",
            "La fecha de fin debe ser mayor a la de inicio"
        );
    });
});
