import * as React from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event, Session } from "@scripts/types";
import { getAllSessions } from "@scripts/api_methods";

interface CalendarProps {
    rerender: boolean;
    setRerender: (arg0: boolean) => void;
}

interface CalendarState {
    events: Event[];
}

export default class HomeCalendar extends React.Component<
    CalendarProps,
    CalendarState
> {
    formats: object;
    constructor(props: CalendarProps) {
        super(props);
        this.state = { events: [] };
        this.formats = {
            eventTimeRangeFormat: () => {
                ("");
            },
        };
    }

    populateEvents(getSessions: Session[]) {
        let newEvents: Event[] = [];
        for (let session of getSessions) {
            if (session.endDate)
                newEvents.push({
                    title: session.subject,
                    start: new Date(session.startDate),
                    end: new Date(session.endDate),
                });
        }
        this.setState({ events: newEvents });
    }

    componentWillMount() {
        getAllSessions().then((res) => this.populateEvents(res));
    }

    componentDidUpdate() {
        if (this.props.rerender == true) {
            getAllSessions().then((res) => this.populateEvents(res));
            this.props.setRerender(false);
        }
    }

    render() {
        let minTime = new Date(1972, 0, 1, 8);
        let maxTime = new Date(1972, 0, 1, 22);
        let views: View[] = ["week", "day"];

        return (
            <div className="myCustomHeight">
                <Calendar
                    localizer={momentLocalizer(moment)}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={views}
                    events={this.state.events}
                    formats={this.formats}
                    step={60}
                />
            </div>
        );
    }
}
