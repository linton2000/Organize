export interface GETSession {
    sessionId: number,
    startDate: Date,
    endDate: Date,
    subject: string
}

export interface POSTSession {
    startDate: Date;
    endDate: Date;
    subject: string;
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