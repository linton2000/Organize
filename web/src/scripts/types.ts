export interface Session {
    sessionId: number,
    startDate: string,
    endDate: string,
    subject: string
}

export interface Subject {
    name: string,
    isActive: boolean
}

export interface Summary {
	lastWorked: string;
}

export interface Row {
    name: string;
    startTime: string;
    duration: string;
    endTime: string;
}

export interface Event {
    title: string,
    start: Date,
    end: Date,
    allDay?: boolean,
    resource?: any,
}

export interface Interval {
	days: number;
	hrs: number;
	mins: number;
	secs: number;
    totalMins: number;
}

export interface User {
    username: string,
    first_name: string,
    last_name: string,
    email: string
}
