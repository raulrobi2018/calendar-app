import React from "react";
import {Redirect, Route} from "react-router-dom";
import PropTypes from "prop-types";

export const PublicRoute = ({
    // Renombra component a Component porque los componentes se escriben con la primer letra en mayúsculas
    // El parámetro ...rest es para almacenar el resto de los atributos, como el exact, el path, etc
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    console.log(rest);
    //El props en este caso recibiría el history, el location, etc
    return (
        <Route
            {...rest}
            component={(props) =>
                // Si NO está autenticado, retorna el componente al cual el usuario quiere entrar y le adiciona
                //las props, o sea, todo lo que tiene el componente. De lo contrario lo redirige al login
                isAuthenticated ? <Redirect to="/" /> : <Component {...props} />
            }
        />
    );
};

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
};
