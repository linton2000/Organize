import * as React from "react";
import LogTableUI from "./LogTableUI";
import { getAllSessions } from "scripts/api_utils";
import { GETSession } from "scripts/api_types";
import { Row } from "scripts/constants";
import { formatSessionDate, calcDuration } from "scripts/utils";

interface LogTableState {
    rows: Row[];
}

export default class LogTable extends React.Component<
    any,
    LogTableState
> {
    constructor(props: any) {
        super(props);
        this.state = { rows: [] };
    }

    populateSessionRows(getSessions: GETSession[]) {
        let newRows: Row[] = [];
        for (let session of getSessions.reverse()) {
            newRows.push({
                name: session.subject,
                startTime: formatSessionDate(session.startDate),
                duration: calcDuration(session.startDate, session.endDate),
                endTime: formatSessionDate(session.endDate),
            });
        }
        this.setState({ rows: newRows });
    }

    componentDidMount() {
        getAllSessions().then((res) => this.populateSessionRows(res));
    }

    render() {
        return <LogTableUI rows={this.state.rows} />;
    }
}
