import { useEffect, useState } from "react";

export default function Timer(props: { startTime: Date }) {
    const [myTime, setMyTime] = useState(new Date());

    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);

        return () => clearInterval(timerID);
    });

    function tick() {
        setMyTime(new Date());
    }

    let timeDiff: number = myTime.getTime() - props.startTime.getTime();
    let timeStr = new Date(timeDiff).toISOString().substring(11, 19);
    return (
        <div>
            <h1>{timeStr}</h1>
        </div>
    );
}
