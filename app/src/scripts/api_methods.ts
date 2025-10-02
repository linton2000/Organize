import axios from "axios";
import { SESSION_URL, SUMMARY_URL } from "./constants";
import { Session, Summary } from "./types";

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

/** Posts a partial Session when user starts timer.  */
async function startSession(subject: string): Promise<Session> {
	return apiRequest<Session, { subject: string }>({
		url: SESSION_URL,
		method: "post",
		payload: { subject },
	});
}

/** Retrieves all session data. Used in LogTable (Analytics page). */
async function getAllSessions(): Promise<Session[]> {
	return apiRequest<Session[]>({ url: SESSION_URL });
}

/** Retrieves basic stats for the home page (e.g. last worked time) */
async function getSummary(): Promise<Summary> {
	return apiRequest<Summary>({ url: SUMMARY_URL });
}
export { startSession, getAllSessions, getSummary };
