import { Button, ButtonGroup } from "@mui/material";
import { Component, ReactElement } from "react";
import Timer from "./Timer";

type MyState = {
    timer: Timer | null;
    timerElement: ReactElement;
    isLogging: boolean;
};
export default class Logger extends Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            timer: null,
            timerElement: (
                <div>
                    <h1>00:00</h1>
                </div>
            ),
            isLogging: false,
        };
        this.startTimer = this.startTimer.bind(this);
    }

    startTimer() {
        this.setState({ timer: new Timer(this.props), isLogging: true });
        if (this.state.timer != null) {
            this.setState({ timerElement: this.state.timer.render() });
        }
    }

    render() {
        let buttons: ReactElement;
        if (this.state.isLogging) {
            buttons = (
                <ButtonGroup variant="outlined">
                    <Button color="warning">Pause</Button>
                    <Button color="warning">Reset</Button>
                </ButtonGroup>
            );
        } else {
            buttons = (
                <Button
                    variant="outlined"
                    color="success"
                    onClick={this.startTimer}
                >
                    Start
                </Button>
            );
        }

        return (
            <div>
                {this.state.timerElement} {buttons}
            </div>
        );
    }
}
