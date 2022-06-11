import { Grid } from "@mui/material";
import { ReactElement } from "react";
import Logger from "./components/Logger";
import LogTable from "./components/LogTable";

function App() {
    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={12} />
            <Grid item xs={2} />
            <Grid container item xs={3}>
                <Logger />
            </Grid>
            <Grid container item xs={6}>
                <LogTable />
            </Grid>
        </Grid>
    );

    return mainGrid;
}

export default App;
