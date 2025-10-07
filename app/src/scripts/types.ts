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
	lastWorked: number;
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
}
