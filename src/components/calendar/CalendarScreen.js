import React from "react";
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
        bgcolor: "#fafafa"
    }
];

export const CalendarScreen = () => {
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
            />
        </div>
    );
};
