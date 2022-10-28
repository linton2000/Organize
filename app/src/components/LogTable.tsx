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

export default class LogTable extends React.Component<
    LogTableProps,
    LogTableState
> {
    constructor(props: LogTableProps) {
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

    componentDidUpdate() {
        if (this.props.rerender == true) {
            getAllSessions().then((res) => this.populateSessionRows(res));
            this.props.setRerender(false);
        }
    }

    render() {
        return <LogTableUI rows={this.state.rows} />;
    }
}
