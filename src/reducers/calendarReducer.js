import moment from "moment";
import { types } from "../types/types";

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
      break;
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
    default:
      return state;
      break;
  }
};
