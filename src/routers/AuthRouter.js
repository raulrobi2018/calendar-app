import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {LoginScreen} from "../components/auth/LoginScreen";
import {RegisterScreen} from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
    return (
        // Se utiliza doble guión bajo para indicar la carpeta donde se encuentra. Es una
        // convención de Sass
        <>
            <Switch>
                <Route exact path="/auth/login" component={LoginScreen} />
                <Route exact path="/auth/register" component={RegisterScreen} />

                {/* Si no encuentra ningún path, lo redirige al Login */}
                <Redirect to="/auth/login" />
            </Switch>
        </>
    );
};
