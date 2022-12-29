import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default function HomeCalendar() {

    let minTime = new Date(1972, 0, 1, 8)
    let maxTime = new Date(1972, 0, 1, 22)
    let views: View[] = ['week', 'day']

    return (
        <div className="myCustomHeight">
            <Calendar
                localizer={localizer}
                startAccessor="start"
                endAccessor="end"
                defaultView="week"
                min={minTime}
                max={maxTime}
                views={views}
            />
        </div>
    );
}
