import { Grid } from "@mui/material";
import { ReactElement } from "react";
import Logger from "./view/Logger";
import LogTable from "./view/LogTable";

function App() {
    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={12} />
            <Grid item xs={2} />
            <Grid container item xs={2}>
                <Logger />
            </Grid>
            <Grid container item xs={7}>
                <LogTable />
            </Grid>
        </Grid>
    );

    return mainGrid;
}

export default App;
