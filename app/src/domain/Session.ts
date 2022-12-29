import { storeSession } from "../scripts/api_methods";

/** Each productivity session is stored as an instance of this class. This class also calls
 * an API post request function at end of session.
 * @method setEndTime(e: Date) - Sets the end time attribute & makes POST request to store
 * session details in the backend
 */
export default class Session {
    startTime: Date;
    endTime: Date | undefined;
    subject: string;

    constructor(startTime: Date, subject: string) {
        this.startTime = startTime;
        this.subject = subject;
    }

    end() {
        this.endTime = new Date();
        // Only store session if elapsed time > 3 mins
        if(this.endTime.getTime() - this.startTime.getTime() > (1000*60*3)) 
            storeSession(this);
    }
}
