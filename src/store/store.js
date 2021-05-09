import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "../reducers/rootReducer";

// Este parámetro es para la configuración del Redux DevTools en las tools del navegador pero par uso con Redux
const composeEnhancers =
    (typeof window !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

// Se crea el store donde Redux guardará toda la información
export const store = createStore(
    rootReducer,
    // Este parámetro es para la configuración del Redux DevTools en las tools del navegador
    composeEnhancers(applyMiddleware(thunk))
);
