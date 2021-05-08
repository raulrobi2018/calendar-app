import Swal from "sweetalert2";
import {fetchWithToken} from "../helpers/fetch";
import {formatEvents} from "../helpers/formatEvents";
import {types} from "../types/types";

export const eventStartAddNew = (event) => {
    // obtengo el state usando el getState
    return async (dispatch, getState) => {
        try {
            const {uid, name} = getState().auth;
            const resp = await fetchWithToken("events", event, "POST");
            const body = await resp.json();

            if (body.ok) {
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                };

                console.log(event);
                dispatch(eventAddNew(event));
            }
        } catch (error) {
            Swal.fire("", "Ha ocurrido un error", "error");
        }
    };
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive
});

export const eventStartUpdate = (event) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(
                `events/${event.id}`,
                event,
                "PUT"
            );

            const body = await resp.json();

            if (body.ok) {
                dispatch(eventUpdate(event));
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventUpdate = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const eventStartDelete = (event) => {
    return async (dispatch, getState) => {
        const {activeEvent} = getState().calendar;

        try {
            const resp = await fetchWithToken(
                `events/${activeEvent.id}`,
                {},
                "DELETE"
            );

            const body = await resp.json();

            if (body.ok) {
                dispatch(eventDelete());
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

const eventDelete = () => ({
    type: types.eventDelete
});

export const eventsLoad = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken("events");
            const body = await resp.json();

            //Se transforman las fechas a un formato de Date porque mongo
            //devuelve un string y el Calendar falla si las quiere mostrar
            const events = formatEvents(body.events);

            if (body.ok) {
                dispatch(eventLoaded(events));
            }
        } catch (error) {
            Swal.fire("", "Ha ocurrido un error", "error");
        }
    };
};

const eventLoaded = (events) => ({
    type: types.eventsLoaded,
    payload: events
});

export const clearEventsOnLogout = () => ({
    type: types.clearEventsOnLogout
});
