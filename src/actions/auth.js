import { fetchWithOutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";
import { clearEventsOnLogout } from "./events";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const resp = await fetchWithOutToken("auth", { email, password }, "POST");
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
      { name, email, password },
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

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("auth/renew");

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
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
  return (dispatch) => {
    //
    localStorage.clear();
    dispatch(logout());
    dispatch(clearEventsOnLogout());
  };
};

const logout = () => ({ type: types.authLogout });
