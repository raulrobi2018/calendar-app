import React, { useState } from "react";
import { Navbar } from "../ui/Navbar";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { messages } from "../../helpers/calendarMessagesEsp";

//React big calendar styles
import "react-big-calendar/lib/css/react-big-calendar.css";
//Moment locale Spanish configuration
import "moment/locale/es";
import {
  months,
  monthsShort,
  monthsShortDot,
  weekdays,
  weekdaysShort
} from "./configurations";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { eventSetActive } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";

import "../ui/fab.css";

moment.locale("es");

//Modifica los nombres de meses y días poniendole la primer letra en mayúsculas
moment.updateLocale("es", {
  months: months,
  weekdays: weekdays,
  monthsShort: monthsShort,
  monthsShortDot: monthsShortDot,
  weekdaysShort: weekdaysShort
});

const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Entrevista de trabajo",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
    bgcolor: "#fafafa",
    notes: "Practicar preguntas clave",
    user: {
      _id: 123,
      name: "Raul Rodriguez"
    }
  }
];

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  //Hook de Redux que retorna el state actual
  //En este caso tomo el atributo ui del state y luego desestructuro el modalOpen
  const { modalOpen } = useSelector((state) => {
    return state.ui;
  });

  //Mantenemos el estado de la última vista utilizando useState
  //Si la variable no existe en el localStorage, setea por defecto en month
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const onDoubleClick = (event) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (event) => {
    dispatch(eventSetActive(event));
    dispatch(uiOpenModal());
  };

  const onViewChange = (event) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  //Crea un estilo para aplicar
  const eventStyleGetter = (event, start, end, isSelected) => {
    //console.log(event, start, end, isSelected);
    const style = {
      backgroundColor: "#367cf7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white"
    };

    return { style };
  };

  return (
    <div className="calendar-screen">
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
      />

      <AddNewFab />

      <CalendarModal />
    </div>
  );
};
