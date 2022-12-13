import { Grid } from "@mui/material";
import { ReactElement } from "react";
import LogTable from "components/LogTable";

export default function Analytics() {
    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={12} />
            <Grid item xs={1} />
            <Grid item xs={10}>
                <LogTable />
            </Grid>
        </Grid>
    );

    return mainGrid;
}
