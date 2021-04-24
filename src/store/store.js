import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/rootReducer";

// Este parámetro es para la configuración del Redux DevTools en las tools del navegador pero par uso con Redux
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

//El combineReducers se utiliza para crear un reducer que contenga todos los reducers que voy a tener,
// porque el createStore() recibe solo un reducer de parámetro.
// De esta manera cuando tengamos que crear una nueva funcionalidad, simplemente tenemos que añadirlo a
//reducers
const reducers = combineReducers({rootReducer});

// Se crea el store donde Redux guardará toda la información
export const store = createStore(
    reducers,
    // Este parámetro es para la configuración del Redux DevTools en las tools del navegador
    composeEnhancers(applyMiddleware(thunk))
);
