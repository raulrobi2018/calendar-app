import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {eventDelete} from "../../actions/events";

export const DeleteFab = () => {
    const {activeEvent} = useSelector((state) => {
        return state.calendar;
    });

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(eventDelete(activeEvent));
    };
    return (
        <button className="btn btn-danger fab btn-del" onClick={handleClick}>
            <i className="fas fa-trash"></i>
        </button>
    );
};
