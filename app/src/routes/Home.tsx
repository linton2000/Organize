import { Grid, Paper } from "@mui/material";
import { useState, useEffect, ReactElement } from "react";

import Logger from "components/Logger/Logger";
import HomeCalendar from "components/HomeCalendar";

export default function Home() {
    const [rerender, setRerender] = useState<boolean>();

    if (rerender === undefined) {
        setRerender(false);
    }

    useEffect(() => {
        document.title = "Organize!";
    });

    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={1} />
            <Grid item xs={6}>
                <HomeCalendar />
            </Grid>
            <Grid container item xs={3} maxHeight={200}>
                <Paper elevation={10} sx={{ padding: 5, marginTop: 5 }}>
                    <Logger
                        rerender={rerender as boolean}
                        setRerender={setRerender}
                    />
                </Paper>
            </Grid>
        </Grid>
    );

    return mainGrid;
}
