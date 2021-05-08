import moment from "moment";

export const formatEvents = (events = []) => {
    return events.map((e) => ({
        ...e,
        end: moment(e.end).toDate(),
        start: moment(e.start).toDate()
    }));
};
