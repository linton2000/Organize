import { Button, Stack } from "@mui/material";
import { Component, ReactElement } from "react";
import SessionLog from "./SessionLog";
import Timer from "./Timer";
import SubjectSelector from "../components/SubjectSelector";

type LoggerState = {
    isLogging: boolean;
    subject: string;
};
export default class Logger extends Component<{}, LoggerState> {
    logs: SessionLog;

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.logs = new SessionLog();
        this.state = { isLogging: false, subject: "" };
        this.startTimer = this.startTimer.bind(this);
        this.endTimer = this.endTimer.bind(this);
    }

    startTimer() {
        if (this.state.subject != "")
            this.logs.startSession(this.state.subject);
        this.setState({ isLogging: true });
    }

    endTimer() {
        this.logs.endSession();
        this.setState({ isLogging: false });
        localStorage.settem("timerLogs", JSON.stringify(this.logs));
    }

    render() {
        let res: ReactElement;
        // User has started the timer
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
                    <SubjectSelector
                        subject={this.state.subject}
                        isDisabled={true}
                        onSubjectChange={(value) =>
                            this.setState({ subject: value })
                        }
                    />
                </Stack>
            );
            // User has selected a subject
        } else if (this.state.subject) {
            res = (
                <Stack spacing={3}>
                    <h1>00:00:00</h1>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={this.startTimer}
                        disabled={false}
                    >
                        Start Session
                    </Button>
                    <SubjectSelector
                        subject={this.state.subject}
                        isDisabled={false}
                        onSubjectChange={(value) =>
                            this.setState({ subject: value })
                        }
                    />
                </Stack>
            );
            // User hasn't selected a subject
        } else {
            res = (
                <Stack spacing={3}>
                    <h1>00:00:00</h1>
                    <Button
                        variant="outlined"
                        color="success"
                        onClick={this.startTimer}
                        disabled={true}
                    >
                        Start Session
                    </Button>
                    <SubjectSelector
                        subject={this.state.subject}
                        isDisabled={false}
                        onSubjectChange={(value) =>
                            this.setState({ subject: value })
                        }
                    />
                </Stack>
            );
        }
        return res;
    }
}
