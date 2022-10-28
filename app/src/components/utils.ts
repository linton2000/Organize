export function formatSessionDate(dateParam: Date): string {
    let date: Date = new Date(dateParam);
    return `${date.toLocaleTimeString('en-AU')}, ${date.toLocaleDateString('en-AU')}`;
}

//TODO
export function calcDuration(startDate: Date, endDate: Date): string{
    let duration: string = " ";
    return duration;
}