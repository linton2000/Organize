import { Grid, Paper } from "@mui/material";
import { useState, useEffect, ReactElement } from "react";

import Logger from "components/logger/Logger";
import HomeCalendar from "components/HomeCalendar";
import QuickSummary from "components/summary/QuickSummary";

export default function Home() {
    const [rerender, setRerender] = useState<boolean>(false);

    return (
        <Grid container spacing={0} columns={28}>
            <Grid size={1} />
            <Grid size={16}>
                <HomeCalendar rerender={rerender} setRerender={setRerender} />
            </Grid>
            <Grid size={2} />
            <Grid size={8}>
                <Grid maxHeight={375} size={20}>
                    <Paper elevation={10} sx={{ padding: 5, marginTop: 5 }}>
                        <Logger rerender={rerender} setRerender={setRerender} />
                    </Paper>
                </Grid>
                <Grid size={28}>
                    <QuickSummary
                        rerender={rerender}
                        setRerender={setRerender}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}
