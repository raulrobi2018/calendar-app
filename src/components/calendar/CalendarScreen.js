import React, {useEffect, useState} from "react";
import {Navbar} from "../ui/Navbar";

import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";

import {messages} from "../../helpers/calendarMessagesEsp";

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
import {CalendarEvent} from "./CalendarEvent";
import {CalendarModal} from "./CalendarModal";
import {useDispatch, useSelector} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {
    eventClearActive,
    eventsLoad,
    eventSetActive
} from "../../actions/events";
import {AddNewFab} from "../ui/AddNewFab";

import "../ui/fab.css";
import {DeleteFab} from "../ui/DeleteFab";

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

export const CalendarScreen = () => {
    const dispatch = useDispatch();

    //Hook de Redux que retorna el state actual
    //Tomo los eventos actuales en el state y se reflejan automaticamente en el calendar
    //ya que el atributo "events" toma esta colección
    const {events} = useSelector((state) => {
        return state.calendar;
    });

    const {activeEvent} = useSelector((state) => {
        return state.calendar;
    });

    //Mantenemos el estado de la última vista utilizando useState
    //Si la variable no existe en el localStorage, setea por defecto en month
    const [lastView, setLastView] = useState(
        localStorage.getItem("lastView") || "month"
    );

    useEffect(() => {
        dispatch(eventsLoad());
    }, [dispatch]);

    const onDoubleClick = (event) => {
        dispatch(uiOpenModal());
    };

    const onSelectEvent = (event) => {
        dispatch(eventSetActive(event));
    };

    const onViewChange = (event) => {
        setLastView(event);
        localStorage.setItem("lastView", event);
    };

    const onSelectSlot = (event) => {
        dispatch(eventClearActive());
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

        return {style};
    };

    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{height: 500}}
                messages={messages}
                eventPropGetter={eventStyleGetter}
                components={{event: CalendarEvent}}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable={true}
                onView={onViewChange}
                view={lastView}
            />
            {activeEvent && <DeleteFab />}
            <AddNewFab />
            <CalendarModal />
        </div>
    );
};
