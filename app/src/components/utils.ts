
export function formatSessionDate(dateParam: Date): string {
    let date: Date = new Date(dateParam);
    return `${date.toLocaleTimeString('en-AU')}, ${date.toLocaleDateString('en-AU')}`;
}