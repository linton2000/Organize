import { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";

import { startSession, getActiveSession, endSession } from "scripts/api_methods";
import Timer from "./Timer";
import SubjectSelector from "./SubjectSelector";

interface LoggerProps {
    rerender: boolean;
    setRerender: (arg0: boolean) => void;
}

/** This component handles log controlling logic and acts as an interface between
 * the logger's UI and the business logic classes */
export default function Logger(props: LoggerProps) {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [subject, setSubject] = useState<string>("");

    useEffect(() => {
        async function loadActiveSession() {
            try {
                const session = await getActiveSession();
                if (session?.startDate && !session?.endDate) {
                    setStartDate(session.startDate);
                    setSubject(session.subject ?? "");
                } else {
                    setStartDate(null);
                }
            } catch (e) {
                console.error(e);
            }
        };

        loadActiveSession();
    }, []);

    // Logger configured according to 3 states - Currently Logging, Subject Selected or Nothing Selected.
    const isSubjectSelectionDisabled: boolean = startDate != null;
    const timerButtonColor = startDate ? "warning" : "success";
    const timerButtonText: string = startDate ? "End Session" : "Start Session";
    const isTimerDisabled: boolean = subject == "" ? true : false;

    async function endTimer() {
        try {
            await endSession();
        } catch (error) {
            console.error(error);
            return;
        }
        setSubject("");
        setStartDate(null);
        props.setRerender(true);
    }

    async function startTimer() {
        if (subject != "") {
            const session = await startSession(subject);    // Potential optimisation: Use a local date without waiting & reconcile later
            setStartDate(session.startDate);
        }
        else {
            console.error("startTimer() called without a subject.");
        }
    }

    return (
        <Stack spacing={3}>
            <Timer startTime={ startDate } />
            <Button
                variant="outlined"
                color={ timerButtonColor }
                onClick={ startDate ? endTimer : startTimer }
                disabled={ isTimerDisabled }
            >
                { timerButtonText }
            </Button>
            <SubjectSelector
                subject={ subject }
                isDisabled={ isSubjectSelectionDisabled }
                onSubjectChange={ setSubject }
            />
        </Stack>
    );
}
