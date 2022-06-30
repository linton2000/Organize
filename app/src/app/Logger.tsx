import { Button, Stack } from "@mui/material";
import { Component, ReactElement } from "react";
import SessionLogs from "../model/SessionLogs";
import Timer from "./Timer";
import SubjectSelector from "./SubjectSelector";

type MyState = {
    isLogging: boolean;
};
export default class Logger extends Component<{}, MyState> {
    logs: SessionLogs;
    subjectSelector: SubjectSelector;

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.logs = new SessionLogs();
        this.subjectSelector = new SubjectSelector(props);
        this.state = { isLogging: false };
        this.startTimer = this.startTimer.bind(this);
        this.endTimer = this.endTimer.bind(this);
    }

    startTimer() {
        let subject: string | null = this.subjectSelector.getSubject();
        if (subject != null) this.logs.startSession(subject);
        this.setState({ isLogging: true });
    }

    endTimer() {
        this.logs.endSession();
        this.setState({ isLogging: false });
        localStorage.settem("timerLogs", JSON.stringify(this.logs));
    }

    render() {
        let res: ReactElement;
        if (this.state.isLogging) {
            res = (
                <Stack spacing={3}>
                    <Timer startTime={new Date()} />
                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={this.endTimer}
                    >
                        End Session
                    </Button>
                </Stack>
            );
        } else {
            res = (
                <Stack spacing={3}>
                    <h1>00:00:00</h1>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={this.startTimer}
                    >
                        Start Session
                    </Button>
                    {this.subjectSelector.render()}
                </Stack>
            );
        }
        return res;
    }
}
