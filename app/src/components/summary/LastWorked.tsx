import { red, orange, yellow, teal, green, purple } from "@mui/material/colors";
import { calcInterval } from "scripts/utils";
import { Interval } from "scripts/types";

export default function LastWorked(props: { lwDate: Date }){
	let interval: Interval = calcInterval(props.lwDate, new Date());
	let days: number = interval.days;
	let hrs: number = interval.hrs;
	let mins: number = interval.mins;

	let dayStr: string = String(days) + (days > 1 ? ' days' : ' day');
	let hrStr: string = String(hrs) + (hrs > 1 ? ' hrs' : ' hr');
	let minStr: string = String(mins) + (mins > 1 ? ' mins' : ' min');

	let lastWorkedStr: string = 'Error';
	if(hrs <= 0) 
		lastWorkedStr = `${minStr} ago`;
	else if(days <= 0) {
		lastWorkedStr = `${hrStr} & ${minStr} ago`;
	} else {
		lastWorkedStr = `${dayStr}, ${hrStr} & ${minStr} ago`;
	}

    return (
		<p style={{fontFamily: "Georgia, serif" }}>
			Last Worked: <span style={{ color: red[700]}}>{lastWorkedStr}</span>
		</p>
    );
}
