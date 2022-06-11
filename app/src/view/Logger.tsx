import { Button, ButtonGroup } from "@mui/material";
import { Component, ReactElement } from "react";
import SessionLogs from "../model/SessionLogs";
import Timer from "../controller/Timer";

type MyState = {
    isLogging: boolean;
};
export default class Logger extends Component<{}, MyState> {
    logs: SessionLogs;

    constructor(props: any) {
        super(props);
        this.logs = new SessionLogs();
        this.state = { isLogging: false };
        this.startTimer = this.startTimer.bind(this);
        this.endTimer = this.endTimer.bind(this);
    }

    startTimer() {
        this.logs.startSession();
        this.setState({ isLogging: true });
    }

    endTimer() {
        this.logs.endSession();
        this.setState({ isLogging: false });
        localStorage.setItem("timerLogs", JSON.stringify(this.logs));
    }

    render() {
        let res: ReactElement;
        if (this.state.isLogging) {
            res = (
                <div>
                    <Timer startTime={new Date()} />
                    <ButtonGroup variant="outlined">
                        <Button color="warning" onClick={this.endTimer}>
                            End Session
                        </Button>
                    </ButtonGroup>
                </div>
            );
        } else {
            res = (
                <div>
                    <h1>00:00:00</h1>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={this.startTimer}
                    >
                        Start Session
                    </Button>
                </div>
            );
        }
        return res;
    }
}
