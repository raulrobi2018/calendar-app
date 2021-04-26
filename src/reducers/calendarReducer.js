import moment from "moment";
import {types} from "../types/types";

const initialState = {
    events: [],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
        case types.eventAddNew:
            return {
                ...state,
                //Expando los eventos y le agrego el nuevo
                events: [...state.events, action.payload]
            };
        case types.eventClearActive:
            return {
                ...state,
                activeEvent: null
            };
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map((e) =>
                    e.id === action.payload.id ? action.payload : e
                )
            };
        case types.eventDelete:
            return {
                ...state,
                // También puedo tomar el id directamente del "activeEvent" y no
                //pasar el payload
                events: state.events.filter((e) => e.id !== action.payload.id),
                activeEvent: null
            };
        default:
            return state;
    }
};
