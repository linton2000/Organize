import { Interval } from "scripts/types";

export function formatSessionDate(dateStr: string): string {
    // Convert ISO datetime string to Unix ms timestamp and then to JS Date
    let date: Date = new Date(Date.parse(dateStr));
    return `${date.toLocaleTimeString("en-AU")}, ${date.toLocaleDateString(
        "en-AU"
    )}`;
}

export function calcDuration(startDateStr: string, endDateStr: string): string {
    let duration: string;
    let startDate: Date = new Date(Date.parse(startDateStr));
    let endDate: Date = new Date(Date.parse(endDateStr));
    let intDuration: number = (endDate.getTime() - startDate.getTime()) / 1000;
    let hours, minutes, seconds: number;

    intDuration = Math.round(intDuration);
    if (intDuration < 60) {
        duration = `${intDuration.toString()} secs`;
    } else if (intDuration > 60 && intDuration < 3600) {
        minutes = Math.round(intDuration / 60);
        seconds = Math.round(intDuration % 60);
        duration = `${minutes} mins ${seconds} secs`;
    } else if (intDuration > 3600 && intDuration < 1e6) {
        hours = Math.round(intDuration / 3600);
        minutes = Math.round((intDuration % 3600) / 60);
        seconds = Math.round(intDuration % 60);
        duration = `${hours} hrs ${minutes} mins ${seconds} secs`;
    } else {
        duration = "Error Duration!";
    }
    return duration;
}

export function calcInterval(start: Date, end: Date): Interval {
    let totalSecs: number = Math.round((end.getTime() - start.getTime()) / 1000);
	let res: Interval = {
		secs: Math.floor( totalSecs % 60 ),
		mins: Math.floor( (totalSecs % 3600) / 60 ),
		hrs: Math.floor( (totalSecs % 86400) / 3600 ),
		days: Math.floor( totalSecs / 86400 ),
	}
	return res;
}
