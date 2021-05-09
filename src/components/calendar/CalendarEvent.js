import React from "react";

//event es el evento en el calendario
export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      <strong>{title}</strong>
    </div>
  );
};
