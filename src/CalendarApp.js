import React from "react";
import {AppRouter} from "./routers/AppRouter";
import {Provider} from "react-redux";
import {store} from "./store/store";

export const CalendarApp = () => {
    return (
        // La aplicación del provider que proveerá el store a nuestra aplicación
        //se debe colocar en el componente más alto que tengamos
        <Provider store={store}>
            <AppRouter />
        </Provider>
    );
};
