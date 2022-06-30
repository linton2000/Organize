import Session from "./Session";

export default class SessionLogs {
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
