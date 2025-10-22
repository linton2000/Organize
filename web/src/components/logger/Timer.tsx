import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { red, orange, yellow, teal, green, purple } from "@mui/material/colors";

interface ColorCaption {
    color: string,
    caption: string
}

interface TimerProps {
    startTime: string | null;
    endTimerCallback: () => Promise<void>
}

export default function Timer(props: TimerProps) {
    // Timer styling (1 inital state style & 6 session progress styles)
    const styles: Array<ColorCaption> = [
        {color: "inherit", caption: "No better time than the present..."},
        {color: red[700], caption: "Don't change your mind now..."},
        {color: orange[900], caption: "Great start! Now keep going..."},
        {color: yellow[900], caption: "You're almost there. Just a little more..."},
        {color: teal[700], caption: "Nice! You're over the mid-way hump..."},
        {color: green[700], caption: "Good job! Another session done :)"},
        {color: purple[700], caption: "Better take a rest now haha :P"},
    ];

    const [myTime, setMyTime] = useState(() => new Date());

    useEffect(() => {
        if (!props.startTime) {
            return;
        }

        const startDate = new Date(props.startTime);
        const startMillis = startDate.getTime();
        if (Number.isNaN(startMillis)) {
            return;
        }

        // Mirror backend max-session window (3 hours) so UI never shows extra time.
        const MAX_SESSION_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours
        const maxEndMillis = startMillis + MAX_SESSION_DURATION_MS;

        let hasClamped = false;
        let timerID: ReturnType<typeof setInterval> | null = null;

        const updateTime = () => {
            const nowMillis = Date.now();
            const clampedMillis = Math.min(nowMillis, maxEndMillis);
            // Render the clamped time (prevents the clock from racing past the limit).
            setMyTime(new Date(clampedMillis));

            if (!hasClamped && nowMillis >= maxEndMillis) {
                // Ensure we only stop & request the callback once.
                hasClamped = true;
                props.endTimerCallback().catch(console.error);
            }
        };

        updateTime();
        timerID = setInterval(updateTime, 1000);

        return () => {
            if (timerID !== null) {
                clearInterval(timerID);
            }
        };
    }, [props.startTime]);

    const startTimestamp = props.startTime ? Date.parse(props.startTime) : NaN;
    const hasValidStart = Boolean(props.startTime) && !Number.isNaN(startTimestamp);
    const baseStyleIndex = props.startTime ? 1 : 0;

    const elapsedMillis = hasValidStart ? Math.max(myTime.getTime() - startTimestamp, 0) : 0;
    const totalSeconds = Math.floor(elapsedMillis / 1000);

    let style_i = baseStyleIndex;
    if (hasValidStart) {
        const elapsedMinutes = Math.floor(totalSeconds / 60);
        if (elapsedMinutes >= 3 && elapsedMinutes < 10) {
            style_i = 2;
        } else if (elapsedMinutes >= 10 && elapsedMinutes < 30) {
            style_i = 3;
        } else if (elapsedMinutes >= 30 && elapsedMinutes < 50) {
            style_i = 4;
        } else if (elapsedMinutes >= 50 && elapsedMinutes < 80) {
            style_i = 5;
        } else if (elapsedMinutes >= 80) {
            style_i = 6;
        }
    }

    const buildTimePart = (value: number) => value.toString().padStart(2, "0");
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const timeStr = `${buildTimePart(hours)}:${buildTimePart(minutes)}:${buildTimePart(seconds)}`;


    return (
        <Stack spacing={1}>
            <h1 style={{ color: styles[style_i].color, fontFamily: "monospace" }}>
                {timeStr}
            </h1>
            <p style={{ color: styles[style_i].color, fontFamily: "Georgia, serif" }}>
                {styles[style_i].caption}
            </p>
        </Stack>
    );
}
