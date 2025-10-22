const API_BASE_URL = process.env.REACT_APP_API_URL ?? "";
export const API_ROOT_URL: string = `${API_BASE_URL.replace(/\/+$/, "")}/api/`;
export const SESSION_URL: string = API_ROOT_URL + "session/";
export const SUBJECT_URL: string = API_ROOT_URL + "subject/";
export const SUMMARY_URL: string = API_ROOT_URL + "summary/";
export const START_SESSION_URL: string = API_ROOT_URL + "start-session/";
export const ACTIVE_SESSION_URL: string = API_ROOT_URL + "active-session/";
export const END_SESSION_URL: string = API_ROOT_URL + "end-session/";
