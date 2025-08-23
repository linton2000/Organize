import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { red, orange, yellow, teal, green, purple } from "@mui/material/colors";

interface ColorCaption {
    color: string,
    caption: string
}

export default function Timer(props: { startTime: Date }) {
    // Ticking
    const [myTime, setMyTime] = useState(new Date());
    useEffect(() => {
        var timerID = setInterval(() => setMyTime(new Date()), 1000);
        return () => clearInterval(timerID);
    });

    // Time content
    let timeDiff: number = myTime.getTime() - props.startTime.getTime();
    let timeStr: string = new Date(timeDiff).toISOString().substring(11, 19);
    let mins: number = timeDiff / (1000 * 60);

    // Time styling (6 different styles)
    let styles: Array<ColorCaption> = [
        {color: red[700], caption: "Don't change your mind now..."},
        {color: orange[900], caption: "Great start! Now keep going..."},
        {color: yellow[900], caption: "You're almost there. Just a little more..."},
        {color: teal[700], caption: "Nice! You're over the mid-way hump..."},
        {color: green[700], caption: "Good job! Another session done :)"},
        {color: purple[700], caption: "Better take a rest now haha :P"},
    ];
    let i: number = 0;

    // Style logic for each session stage
    if(mins >= 3 && mins < 10){
        i = 1;
    } else if(mins >= 10 && mins < 30){
        i = 2;
    } else if(mins >= 30 && mins < 50){
        i = 3
    } else if(mins >= 50 && mins < 80){
        i = 4
    } else if(mins >= 80){
        i = 5
    }

    return (
        <Stack spacing={1}>
            <h1 style={{ color: styles[i].color, fontFamily: "monospace" }}>
                {timeStr}
            </h1>
            <p style={{ color: styles[i].color, fontFamily: "Georgia, serif" }}>
                {styles[i].caption}
            </p>
        </Stack>
    );
}
