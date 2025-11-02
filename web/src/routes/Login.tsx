import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Login() {
    return (
        <Grid container spacing={0} columns={12}>
            <Grid item xs={4}/>
            <Grid item xs={4}>                    
                <Typography>
                    Login to your Account
                </Typography>
            </Grid>
            <Grid item xs={4}/>
        </Grid>
    );
}