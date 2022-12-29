import { Grid, Paper } from "@mui/material";
import { useState, useEffect, ReactElement } from "react";

import Logger from "components/Logger/Logger";
import HomeCalendar from "components/HomeCalendar";
import QuickSummary from "components/QuickSummary";

export default function Home() {
    const [rerender, setRerender] = useState<boolean>();

    if (rerender === undefined) {
        setRerender(false);
    }

    useEffect(() => {
        document.title = "Organize!";
    });

    let mainGrid: ReactElement = (
        <Grid container spacing={10} columns={20}>
            <Grid item xs={1} />
            <Grid item xs={12}>
                <HomeCalendar
                    rerender={rerender as boolean}
                    setRerender={setRerender}
                />
            </Grid>
            <Grid item>
                <Grid item maxHeight={375} xs={14}>
                    <Paper elevation={10} sx={{ padding: 5, marginTop: 5 }}>
                        <Logger
                            rerender={rerender as boolean}
                            setRerender={setRerender}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6} />
                <Grid item xs={18}>
                    <QuickSummary />
                </Grid>
            </Grid>
        </Grid>
    );

    return mainGrid;
}
