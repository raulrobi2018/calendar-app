import React from "react";
import {useDispatch} from "react-redux";
import {eventStartDelete} from "../../actions/events";

export const DeleteFab = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(eventStartDelete());
    };
    return (
        <button className="btn btn-danger fab btn-del" onClick={handleClick}>
            <i className="fas fa-trash"></i>
        </button>
    );
};
