import { useEffect, useState } from "react";
import { red, orange, yellow, green, purple } from "@mui/material/colors";
import { calcInterval } from "scripts/utils";
import { Interval } from "scripts/types";

export default function LastWorked(props: { lastWorkedDate: string | null}){
	// Update elapsed time in summary every minute
	const [now, setNow] = useState(() => Date.now());
	useEffect(() => {
		if (!props.lastWorkedDate)
			return;

		const intervalId = window.setInterval(() => setNow(Date.now()), 60_000);
		return () => window.clearInterval(intervalId);
	}, [props.lastWorkedDate]);

	let lastWorkedStr: string = '-';
	let colour_i: number = props.lastWorkedDate ? 1 : 0;

	// Color logic for last worked time (pleasant colours for more recent work)
	const colours: Array<string> = ["inherit", purple[700], green[700], yellow[900], orange[900], red[700]];


	if (props.lastWorkedDate) {
		const interval: Interval = calcInterval(new Date(props.lastWorkedDate), new Date(now));

		let dayStr: string = String(interval.days) + (interval.days > 1 ? ' days' : ' day');
		let hrStr: string = String(interval.hrs) + (interval.hrs > 1 ? ' hrs' : ' hr');
		let minStr: string = String(interval.mins) + (interval.mins > 1 ? ' mins' : ' min');

		if (interval.days > 0) {
			lastWorkedStr = `${dayStr}, ${hrStr} & ${minStr} ago`;
		} else if (interval.hrs > 0) {
			lastWorkedStr = `${hrStr} & ${minStr} ago`;
		} else {
			lastWorkedStr = `${minStr} ago`;
		}

		if(interval.totalMins >= 5 && interval.totalMins < 15){
			colour_i = 2;
		} else if(interval.totalMins >= 15 && interval.totalMins < 30){
			colour_i = 3;
		} else if(interval.totalMins >= 30 && interval.totalMins < 60){
			colour_i = 4
		} else if(interval.totalMins >= 60){
			colour_i = 5
		}
	}

    return (
		<p style={{fontFamily: "Georgia, serif" }}>
			Last Worked: <span style={{ color: colours[colour_i]}}>{lastWorkedStr}</span>
		</p>
    );
}
