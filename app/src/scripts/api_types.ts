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