import { Component } from "react";

type MyState = { currentTime: Date };
export default class Timer extends Component<{}, MyState> {
    startTime: Date;
    endTime: Date | null = null;
    intervalID: any;

    constructor(props: any) {
        super(props);
        this.startTime = new Date();
        this.state = { currentTime: new Date() };
    }

    componentDidMount() {
        this.intervalID = setInterval(() => this.tick(), 1000);
    }

    tick() {
        this.setState({
            currentTime: new Date(),
        });
        console.log("Logging");
    }

    end() {
        clearInterval(this.intervalID);
        this.endTime = new Date();
    }

    render() {
        let timeDiff: number =
            this.state.currentTime.getTime() - this.startTime.getTime();
        let dateDiff: Date = new Date(timeDiff);
        let timeStr: string =
            dateDiff.getMinutes().toString() +
            ": " +
            dateDiff.getSeconds().toString();
        return (
            <div>
                <h1>{timeStr}</h1>
            </div>
        );
    }
}
