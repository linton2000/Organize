import { Grid, Paper } from "@mui/material";
import { useState, useEffect, ReactElement } from "react";

import Logger from "components/logger/Logger";
import HomeCalendar from "components/HomeCalendar";
import QuickSummary from "components/summary/QuickSummary";

export default function Home() {
    const [rerender, setRerender] = useState<boolean>();

    if (rerender === undefined) {
        setRerender(false);
    }

    useEffect(() => {
        document.title = "Organize!";
    });

    let mainGrid: ReactElement = (
        <Grid container spacing={0} columns={28}>
            <Grid item xs={1} />
            <Grid item xs={16}>
                <HomeCalendar
                    rerender={rerender as boolean}
                    setRerender={setRerender}
                />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={8}>
                <Grid item maxHeight={375} xs={20}>
                    <Paper elevation={10} sx={{ padding: 5, marginTop: 5 }}>
                        <Logger
                            rerender={rerender as boolean}
                            setRerender={setRerender}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={28}>
                    <QuickSummary />
                </Grid>
            </Grid>
        </Grid>
    );

    return mainGrid;
}
