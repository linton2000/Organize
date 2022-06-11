export default class Session{
    startTime: Date;
    endTime: Date | undefined;

    constructor(startTime: Date){
        this.startTime = startTime;
    }

    setEndTime(endTime: Date) {
        this.endTime = endTime;
    }
}