export interface GETSession {
    sessionId: number,
    startDate: Date,
    endDate: Date,
    subject: string
}

export interface SessionStart {
    startDate: Date;
    subject: string;
}

export interface GETSummary {
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
