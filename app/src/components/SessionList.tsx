import Session from "./Session";

export default class SessionList {
    sessions: Array<Session>;

    constructor() {
        this.sessions = [];
    }

    startSession() {
        this.sessions.push(new Session(new Date()));
    }

    endSession() {
        let currentSession: Session | undefined = this.sessions.pop();
        if (currentSession != undefined) {
            currentSession.setEndTime(new Date());
            this.sessions.push(currentSession);
        }
    }
}
