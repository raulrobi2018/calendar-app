import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {BrowserRouter as Router, Redirect, Switch} from "react-router-dom";

import {startChecking} from "../actions/auth";
import {LoginScreen} from "../components/auth/LoginScreen";
import {CalendarScreen} from "../components/calendar/CalendarScreen";
import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";

export const AppRouter = () => {
    const dispatch = useDispatch();

    const {checking, uid} = useSelector((state) => state.auth);

    //Solo tendrá como dependencia al dispatch porque el startChecking
    //no está dentro de este componente y por lo tanto no cambiará
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    //No quiero mostrar nada hasta que el checking sea false
    if (checking) {
        return <h1>Cargando</h1>;
    }

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
         renders the first one that matches the current URL. */}
                <Switch>
                    {/* exact para que machee la ruta exacta */}
                    {/* con el uid se utiliza doble negación. Si utilizara !uid y uid no es null, 
                    retornaría false que quiere decir que el string no es vacío. Al ponerle otra negación
                    retorna true */}
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthenticated={!!uid}
                    />
                    <PrivateRoute
                        exact
                        path="/"
                        component={CalendarScreen}
                        isAuthenticated={!!uid}
                    />

                    {/* Si no encuentra ningún path, lo redirige a calendar */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};
