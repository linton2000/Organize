import { FormEvent, useState } from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useAuth } from "@providers/AuthProvider";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // To prevent resubmits while waiting
    const auth = useAuth();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Stops built-in browser form submission behaviour
        if (isSubmitting || !username.trim() || !password.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await auth.login(username, password);
        } catch (e) {
        } finally {
            setIsSubmitting(false);
        }
    };

    const isDisabled = isSubmitting || !username.trim() || !password.trim();

    return (
        <Grid
            container
            columns={12}
            spacing={0}
            sx={{ minHeight: "100vh" }}
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={4}>
                <Stack
                    component="form"
                    onSubmit={handleLogin}
                    spacing={3}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider", // theme-aware neutral color
                        borderRadius: 2, // theme.spacing(2) radius
                        padding: 4, // padding inside the outline
                        backgroundColor: "background.paper",
                    }}
                >
                    <Typography variant="h5" align="center">
                        Login to your Account
                    </Typography>
                    <TextField
                        required
                        id="username-input"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <TextField
                        required
                        type="password"
                        id="password-input"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isDisabled}
                    >
                        Submit
                    </Button>
                </Stack>
            </Grid>
        </Grid>
    );
}
