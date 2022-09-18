import Session from "./Session";

/** Stores a log of sessions to be displayed on the dashboard
 * @method startSession(subject: string) - Creates a new session
 * @method endSession() - Ends current session and POSTs it to the API
 */
export default class SessionLog {
    sessions: Array<Session>;

    constructor() {
        this.sessions = [];
    }

    startSession(subject: string) {
        this.sessions.push(new Session(new Date(), subject));
    }

    endSession() {
        let currentSession: Session | undefined = this.sessions.pop();
        if (currentSession != undefined) {
            currentSession.setEndTime(new Date());
            this.sessions.push(currentSession);
        }
    }
}
