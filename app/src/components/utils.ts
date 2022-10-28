export function formatSessionDate(dateParam: Date): string {
    let date: Date = new Date(dateParam);
    return `${date.toLocaleTimeString("en-AU")}, ${date.toLocaleDateString(
        "en-AU"
    )}`;
}

//TODO
export function calcDuration(startDateParam: Date, endDateParam: Date): string {
    let duration: string;
    let startDate: Date = new Date(startDateParam);
    let endDate: Date = new Date(endDateParam);
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
