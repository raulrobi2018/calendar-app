import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {startLogout} from "../../actions/auth";

export const Navbar = () => {
    const dispatch = useDispatch();
    const {name} = useSelector((state) => state.auth);

    const handleLogout = () => {
        //Al ejecutar el startLogout me saca porque cambia el uid y como
        //el AppRouter está pendiente de los cambios del uid, entonces se vuelve a
        //redibujar las rutas entonces el uid es null y lo saca al login
        dispatch(startLogout());
    };

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">{name}</span>

            <button className="btn btn-outline-danger" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    );
};
