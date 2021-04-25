import moment from "moment";
import {types} from "../types/types";

const initialState = {
    events: [
        {
            title: "Entrevista de trabajo",
            start: moment().toDate(),
            end: moment().add(2, "hours").toDate(),
            bgcolor: "#fafafa",
            notes: "Practicar preguntas clave",
            user: {
                _id: 123,
                name: "Raul Rodriguez"
            }
        }
    ],
    activeEvent: null
};

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            };
            break;
        case types.eventAddNew:
            return {
                ...state,
                //Expando los eventos y le agrego el nuevo
                events: [...state.events, action.payload]
            };
        default:
            return state;
            break;
    }
};
