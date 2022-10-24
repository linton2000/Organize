import * as React from "react";
import LogTableUI from "./LogTableUI";
import { getAllSessions } from "../scripts/api_utils";
import { GETSession } from "../scripts/api_types";
import { Row } from "./component_types";
import { formatSessionDate } from "./utils";

interface LogTableState {
    rows: Row[];
}

function populateSessionRows(getSessions: GETSession[]): Row[] {
    let rows: Row[] = [];
    for (let session of getSessions) {
        rows.push({
            name: session.subject,
            startTime: formatSessionDate(session.startDate),
            duration: "100",
            endTime: formatSessionDate(session.endDate),
        });
    }
    return rows;
}

export default class LogTable extends React.Component<{}, LogTableState> {
    constructor(props: {}) {
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
