import { Grid } from "@mui/material";
import { ReactElement } from "react";
import LogTable from "components/logtable/LogTable";

export default function Analytics() {
    let mainGrid: ReactElement = (
        <Grid container spacing={10} sx={{marginTop: 0.5}}>
            <Grid item xs={1} />
            <Grid item xs={10}>
                <LogTable />
            </Grid>
        </Grid>
    );

    return mainGrid;
}
