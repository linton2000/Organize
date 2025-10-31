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

type RequestMethod = "get" | "post";
interface RequestConfig<Payload> {
	url: string;
	method?: RequestMethod;
	payload?: Payload;
}

async function apiRequest<Response, Payload = unknown>({
	url,
	method = "get",
	payload,
}: RequestConfig<Payload>): Promise<Response> {
	try {
		const response =
			method === "get"
				? await axios.get<Response>(url)
				: await axios.post<Response>(url, payload);
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const status = error.response?.status;
			const message = error.response?.data ?? error.message;
			console.error(`API request failed${status ? ` (${status})` : ""}: ${message}`);
		} else {
			console.error("API request failed", error);
		}
		throw error;
	}
}

/** Retrieves all session data. Used in LogTable (Analytics page). */
async function getAllSessions(): Promise<Session[]> {
	return apiRequest<Session[]>({ url: SESSION_URL });
}

/** Retrieves all subjects. Needed in subject selector & subject management page */
async function getAllSubjects(): Promise<Subject[]> {
	return apiRequest<Subject[]>({ url: SUBJECT_URL })
}

/** Retrieves basic stats for the home page (e.g. last worked time) */
async function getSummary(): Promise<Summary> {
	return apiRequest<Summary>({ url: SUMMARY_URL });
}

/** Posts a partial Session when user starts timer.  */
async function startSession(subject: string): Promise<Session> {
	return apiRequest<Session, { subject: string }>({
		url: START_SESSION_URL,
		method: "post",
		payload: { subject },
	});
}

/** Retrieves the active (most recent with null endDate) Session. 
 * Used to persist Timer across browser refreshes. */
async function getActiveSession(): Promise<Session> {
    return apiRequest<Session>({ url: ACTIVE_SESSION_URL});
}

/** Ends the currently active Session. */
async function endSession(): Promise<Session> {
    return apiRequest<Session>({ 
		url: END_SESSION_URL, 
		method: "post"
	});
}

/** Logs in using username & password in JSON payload */
async function login(username: string, password: string): Promise<User> {
	return apiRequest<User>({
		url: LOGIN_URL,
		method: "post",
		payload: { username, password }
	})
}

/** Retrieves details of the currently logged in user */
async function me(): Promise<User | null> {
	return apiRequest<User | null>({
		url: ME_URL,
		method: "get"
	})
}

/** Simple log out method */
async function logout(): Promise<void> {
	return apiRequest<void>({
		url: LOGOUT_URL,
		method: "post"
	})
}

export { 
	getAllSubjects, 
	getAllSessions, 
	getSummary, 
	startSession, 
	getActiveSession, 
	endSession 
};
