//Se inicializa en true para verificar si el usuario está

import {types} from "../types/types";

//autenticado
const initialState = {
    checking: true
    // uid: null,
    // name: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                // Retornamos el state como está y seteo el checking
                //en false porque ya se que lo autentiqué
                ...state,
                checking: false,
                ...action.payload
            };
        default:
            return state;
    }
};
