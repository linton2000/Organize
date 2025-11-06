import { useEffect, useState } from "react";
import { Stack } from "@mui/material";

import LastWorked from "./LastWorked";
import { getSummary } from "@scripts/api_methods";
import { Summary } from "@scripts/types";

interface QuickSummaryProps {
    rerender: boolean;
    setRerender: (arg0: boolean) => void;
}

export default function QuickSummary(props: QuickSummaryProps) {
    const [lastWorkedDate, setLastWorkedDate] = useState<string | null>(null);

    useEffect(() => {
        async function loadSummary() {
            try {
                const summary: Summary = await getSummary();
                setLastWorkedDate(summary.lastWorked);
            } catch (e) {
                console.error(e);
            }
        }

        loadSummary();
    }, [props.rerender]);

    return (
        <Stack spacing={2}>
            <h1></h1>
            <LastWorked lastWorkedDate={lastWorkedDate} />
        </Stack>
    );
}
