/** Each productivity session is stored as an instance of this class. 
 * @method setEndTime(e: Date) - Sets the end time attribute
*/
export default class Session{
    startTime: Date;
    endTime: Date | undefined;
    subject: string;

    constructor(startTime: Date, subject: string){
        this.startTime = startTime;
        this.subject = subject;
    }

    setEndTime(endTime: Date) {
        this.endTime = endTime;
    }
}