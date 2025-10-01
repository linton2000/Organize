import axios from "axios";
import Session from "../domain/Session";
import { SESSION_URL, SUMMARY_URL } from "./constants";
import { SessionStart, GETSession, GETSummary } from "./types";

/** Creates a Session when user starts timer.  */
async function startSession(session: Session): Promise<void> {
    let postSession: SessionStart = {
        startDate: session.startTime,
        subject: session.subject,
    };

    const result = axios.post(SESSION_URL, postSession);
    console.log(result);
}

/** Makes a GET request using axios to Django API and returns an array of all stored Sessions */
async function getAllSessions(): Promise<GETSession[]> {
    let getArray: Array<GETSession> = [];

    const result = await axios
        .get(SESSION_URL)
        .then((response) => (getArray = response.data));

    console.log(result);
    return getArray;
}

async function getSummary(): Promise<GETSummary> {
	let summary: GETSummary = { lastWorked: 0};

	const result = await axios
		.get(SUMMARY_URL)	
		.then((response) => (summary = response.data));
	
	console.log(result);		
	return summary;
}
export { startSession, getAllSessions, getSummary };
