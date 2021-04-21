import React from "react";

//event es el evento en el calendario
export const CalendarEvent = ({event}) => {
    const {title, user} = event;

    return (
        <div>
            <strong>{title}</strong>
            <br />
            <span>{user.name}</span>
        </div>
    );
};
