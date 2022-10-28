import { Grid } from "@mui/material";
import { useState, useEffect, ReactElement } from "react";
import Logger from "./app/Logger";
import LogTable from "./components/LogTable";

function App() {
    const [rerender, setRerender] = useState<boolean>();

    if (rerender == undefined) {
        setRerender(false);
    }

    useEffect(() => {
        document.title = "Organize!";
    });

    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={12} />
            <Grid item xs={1} />
            <Grid container item xs={3}>
                <Logger
                    rerender={rerender as boolean}
                    setRerender={setRerender}
                />
            </Grid>
            <Grid container item xs={7}>
                <LogTable
                    rerender={rerender as boolean}
                    setRerender={setRerender}
                />
            </Grid>
        </Grid>
    );

    return mainGrid;
}

export default App;
