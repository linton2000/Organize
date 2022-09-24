import axios from "axios";
import Session from "../app/Session";
import { SESSION_URL } from "./constants";
import { PostSession, GetSession } from "./api_types";

/** Makes a POST request using axios to the Django API to store session parameter attributes */
async function storeSession(session: Session): Promise<void> {
    let postSession: PostSession = {
        startDate: session.startTime,
        endDate: session.endTime as Date,
        subject: session.subject,
    };

    const result = axios.post(SESSION_URL, postSession);
    console.log(result);
}

/** Makes a GET request using axios to Django API and returns an array of all stored Sessions */
async function getAllSessions(): Promise<GetSession[]> {
    let getArray: Array<GetSession> = [];

    const result = await axios
        .get(SESSION_URL)
        .then((response) => (getArray = response.data));

    console.log(getArray);
    return getArray;
}

export { storeSession, getAllSessions };
