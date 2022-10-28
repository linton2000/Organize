import * as React from "react";
import LogTableUI from "./LogTableUI";
import { getAllSessions } from "../scripts/api_utils";
import { GETSession } from "../scripts/api_types";
import { Row } from "./component_types";
import { formatSessionDate, calcDuration } from "./utils";

interface LogTableState {
    rows: Row[];
}

interface LogTableProps {
    rerender: boolean;
    setRerender: (arg0: boolean) => void;
}

function populateSessionRows(getSessions: GETSession[]): Row[] {
    let rows: Row[] = [];
    for (let session of getSessions.reverse()) {
        rows.push({
            name: session.subject,
            startTime: formatSessionDate(session.startDate),
            duration: calcDuration(session.startDate, session.endDate),
            endTime: formatSessionDate(session.endDate),
        });
    }
    return rows;
}

export default class LogTable extends React.Component<LogTableProps, LogTableState> {
    constructor(props: LogTableProps) {
        super(props);
        this.state = { rows: [] };
    }

    componentDidMount() {
        getAllSessions()
            .then((result) => populateSessionRows(result))
            .then((res) => this.setState({ rows: res }));
    }

    render() {
        return <LogTableUI rows={this.state.rows} />;
    }
}
