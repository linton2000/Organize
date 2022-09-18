import Session from "../app/Session";

/** Makes a POST request to the Django API to store session parameter attributes */
function storeSession(session: Session): void {
    console.log(
        `Stored session with attributes:
        \nStart time = ${session.startTime} 
        \nEnd time = ${session.endTime} 
        \nSubject = ${session.subject}`
    );
}

export { storeSession };
