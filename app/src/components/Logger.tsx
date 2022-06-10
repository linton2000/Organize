import { Button, ButtonGroup } from "@mui/material";
import { Component, ReactElement } from "react";
import Timer from "./Timer";

type MyState = {
    isLogging: boolean;
};
export default class Logger extends Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLogging: false,
        };
        this.startTimer = this.startTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
    }

    startTimer() {
        this.setState({ isLogging: true });
    }

    resetTimer() {
        this.setState({ isLogging: false });
    }

    render() {
        let res: ReactElement;
        if (this.state.isLogging) {
            res = (
                <div>
                    <Timer startTime={new Date()} />
                    <ButtonGroup variant="outlined">
                        <Button color="warning" onClick={this.resetTimer}>
                            Reset
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
                        Start
                    </Button>
                </div>
            );
        }
        return res;
    }
}
