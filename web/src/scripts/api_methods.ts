import axios from "axios";
import { 
	SESSION_URL, 
	SUBJECT_URL, 
	SUMMARY_URL, 
	START_SESSION_URL, 
	ACTIVE_SESSION_URL, 
	END_SESSION_URL, 
	LOGIN_URL,
	ME_URL,
	LOGOUT_URL 
} from "./constants";
import { Session, Subject, Summary, User } from "./types";


axios.defaults.withCredentials = true;

/** Retrieves all session data. Used in LogTable (Analytics page). */
async function getAllSessions(): Promise<Session[]> {
	const response = await axios.get<Session[]>(SESSION_URL);
	return response.data;
}

/** Retrieves all subjects. Needed in subject selector & subject management page */
async function getAllSubjects(): Promise<Subject[]> {
	const response = await axios.get<Subject[]>(SUBJECT_URL);
	return response.data;
}

/** Retrieves basic stats for the home page (e.g. last worked time) */
async function getSummary(): Promise<Summary> {
	const response = await axios.get<Summary>(SUMMARY_URL);
	return response.data;
}

/** Posts a partial Session when user starts timer.  */
async function startSession(subject: string): Promise<Session> {
	const response = await axios.post<Session>(START_SESSION_URL, { subject });
	return response.data;
}

/** Retrieves the active (most recent with null endDate) Session. 
 * Used to persist Timer across browser refreshes. */
async function getActiveSession(): Promise<Session> {
	const response = await axios.get<Session>(ACTIVE_SESSION_URL);
	return response.data;
}

/** Ends the currently active Session. */
async function endSession(): Promise<Session> {
	const response = await axios.post<Session>(END_SESSION_URL);
	return response.data;
}

/** Logs in using username & password in JSON payload */
async function login(username: string, password: string): Promise<User> {
	const response = await axios.post<User>(LOGIN_URL, { username, password });
	return response.data;
}

/** Retrieves details of the currently logged in user */
async function me(): Promise<User> {
	const response = await axios.get<User>(ME_URL);
	return response.data;
}

/** Simple log out method */
async function logout(): Promise<void> {
	await axios.post(LOGOUT_URL);
}

export { 
	getAllSubjects, 
	getAllSessions, 
	getSummary, 
	startSession, 
	getActiveSession, 
	endSession,
	login,
	me,
	logout
};
