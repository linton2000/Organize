import { Grid, Skeleton } from "@mui/material";
import { useState, useEffect, ReactElement } from "react";
import Logger from "app/Logger";

export default function Home(){
    const [rerender, setRerender] = useState<boolean>();

    if (rerender === undefined) {
        setRerender(false);
    }

    useEffect(() => {
        document.title = "Organize!";
    });

    let mainGrid: ReactElement = (
        <Grid container spacing={20}>
            <Grid item xs={12} />
            <Grid item xs={1} />
            <Grid item xs={6}>
                <Skeleton animation={false} variant={"rounded"} height={400}/>
            </Grid>
            <Grid container item xs={3}>
                <Logger
                    rerender={rerender as boolean}
                    setRerender={setRerender}
                />
            </Grid>
        </Grid>
    );

    return mainGrid;
}