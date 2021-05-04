import React, {useEffect} from "react";
import {useDispatch} from "react-redux";

import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route
} from "react-router-dom";

import {startChecking} from "../actions/auth";
import {LoginScreen} from "../components/auth/LoginScreen";
import {CalendarScreen} from "../components/calendar/CalendarScreen";

export const AppRouter = () => {
    const dispatch = useDispatch();

    //Solo tendrá como dependencia al dispatch porque el startChecking
    //no está dentro de este componente y por lo tanto no cambiará
    useEffect(() => {
        dispatch(startChecking());
    }, [dispatch]);

    return (
        <Router>
            <div>
                {/* A <Switch> looks through its children <Route>s and
         renders the first one that matches the current URL. */}
                <Switch>
                    {/* exact para que machee la ruta exacta */}
                    <Route exact path="/login" component={LoginScreen} />
                    <Route exact path="/" component={CalendarScreen} />

                    {/* Si no encuentra ningún path, lo redirige a calendar */}
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    );
};
