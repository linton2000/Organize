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

	// Color logic for last worked time (pleasant colours for more recent work)
	let colours: Array<string> = [purple[700], green[700], yellow[900], orange[900], red[700]];
	let i: number = 0;
    if(mins >= 5 && mins < 15){
        i = 1;
    } else if(mins >= 15 && mins < 30){
        i = 2;
    } else if(mins >= 30 && mins < 60){
        i = 3
    } else if(mins >= 60){
        i = 4
    }

    return (
		<p style={{fontFamily: "Georgia, serif" }}>
			Last Worked: <span style={{ color: colours[i]}}>{lastWorkedStr}</span>
		</p>
    );
}
