export default class Session{
    startTime: Date;
    subject: string;
    endTime: Date | undefined;

    constructor(startTime: Date, subject: string){
        this.startTime = startTime;
        this.subject = subject;
    }

    setEndTime(endTime: Date) {
        this.endTime = endTime;
    }
}