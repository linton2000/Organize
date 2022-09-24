export interface GetSession {
    sessionId: number,
    startDate: Date,
    endDate: Date,
    subject: string
}

export interface PostSession {
    startDate: Date;
    endDate: Date;
    subject: string;
}