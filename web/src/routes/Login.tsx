import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";


export default function Login() {
    return (
        <Grid
        container
        columns={12}
        spacing={0}
        sx={{ minHeight: '100vh' }}
        alignItems="center"
        justifyContent="center"
        >
            <Grid item xs={2}>
                <Stack 
                    spacing={3} 
                    sx={{
                        border: '1px solid',
                        borderColor: 'divider',   // theme-aware neutral color
                        borderRadius: 2,          // theme.spacing(2) radius
                        padding: 4,               // padding inside the outline
                        backgroundColor: 'background.paper',
                    }}>
                    <Typography variant="h5" align="center">
                        Login to your Account
                    </Typography>
                    <TextField required id="username-input" label="Username" variant="outlined"/>
                    <TextField required type="password" id="password-input" label="Password" variant="outlined"/>
                    <Button variant="contained"> Submit </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}