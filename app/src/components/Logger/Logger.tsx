import { Button, Stack } from "@mui/material";
import { Component, ReactElement } from "react";
import Session from "../../domain/Session";
import Timer from "./Timer";
import SubjectSelector from "./SubjectSelector";

interface LoggerState {
    isLogging: boolean;
    subject: string;
}

interface LoggerProps {
    rerender: boolean;
    setRerender: (arg0: boolean) => void;
}

/** This component handles log controlling logic and acts as an interface between
 * the logger's UI and the business logic classes */
export default class Logger extends Component<LoggerProps, LoggerState> {
    session: Session | null;

    constructor(props: LoggerProps) {
        super(props);
        this.session = null;
        this.state = { isLogging: false, subject: "" };
        this.startTimer = this.startTimer.bind(this);
        this.endTimer = this.endTimer.bind(this);
    }

    startTimer() {
        if (this.state.subject != "")
            this.session = new Session(new Date(), this.state.subject);
        this.setState({ isLogging: true });
    }

    endTimer() {
        if (this.session != null) this.session.end(); // API POST request made here
        this.setState({ isLogging: false });
        this.props.setRerender(true);
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
                    <Stack spacing={1}>
                        <h1 style={{ fontFamily: "monospace" }}>00:00:00</h1>
                        <p style={{ fontFamily: "Georgia, serif" }}>
                            No better time than the present...
                        </p>
                    </Stack>
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
                    <Stack spacing={1}>
                        <h1 style={{ fontFamily: "monospace" }}>00:00:00</h1>
                        <p style={{ fontFamily: "Georgia, serif" }}>
                            No better time than the present...
                        </p>
                    </Stack>
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
