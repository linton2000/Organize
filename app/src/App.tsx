import { Grid } from "@mui/material";
import { ReactElement } from "react";
import Logger from "./components/Logger";

function App() {
    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={5} />
            <Grid container item xs={2}>
                <Logger />
            </Grid>
            <Grid item xs={5} />
        </Grid>
    );

    return mainGrid;
}

export default App;
