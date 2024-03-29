import axios from "axios";
import Session from "../domain/Session";
import { SESSION_URL, SUMMARY_URL } from "./constants";
import { POSTSession, GETSession, GETSummary } from "./types";

/** Makes a POST request using axios to the Django API to store session parameter attributes */
async function storeSession(session: Session): Promise<void> {
    let postSession: POSTSession = {
        startDate: session.startTime,
        endDate: session.endTime as Date,
        subject: session.subject,
    };

    const result = axios.post(SESSION_URL, postSession);
    //console.log(result);
}

/** Makes a GET request using axios to Django API and returns an array of all stored Sessions */
async function getAllSessions(): Promise<GETSession[]> {
    let getArray: Array<GETSession> = [];

    const result = await axios
        .get(SESSION_URL)
        .then((response) => (getArray = response.data));

    //console.log(result);
    return getArray;
}

async function getSummary(): Promise<GETSummary> {
	let summary: GETSummary = { lastWorked: 0};

	const result = await axios
		.get(SUMMARY_URL)	
		.then((response) => (summary = response.data));
	
	//console.log(result);		
	return summary;
}
export { storeSession, getAllSessions, getSummary };
