import {fetchWithOutToken} from "../helpers/fetch";
import {types} from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (email, password) => {
    return async (dispatch) => {
        const resp = await fetchWithOutToken("auth", {email, password}, "POST");
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            //Se configuró en 2 horas
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                login({
                    uid: body.uid,
                    name: body.name
                })
            );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const resp = await fetchWithOutToken(
            "auth/new",
            {name, email, password},
            "POST"
        );

        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem("token", body.token);
            //Se configuró en 2 horas
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(
                login({
                    uid: body.uid,
                    name: body.name
                })
            );
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};
