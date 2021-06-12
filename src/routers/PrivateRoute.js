import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({
    // Renombra component a Component porque los componentes se escriben con la primer letra en mayúsculas
    // El parámetro ...rest es para almacenar el resto de los atributos, como el exact, el path, etc
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    //El props en este caso recibiría el history, el location, etc
    return (
        <Route
            {...rest}
            component={(props) =>
                // Si está autenticado, retorna el componente al cual el usuario quiere entrar y le adiciona
                //las props, o sea, todo lo que tiene el componente. De lo contrario lo redirige al login
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/auth/login" />
                )
            }
        />
    );
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};
