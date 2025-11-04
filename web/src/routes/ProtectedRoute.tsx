import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";

import { useAuth } from "providers/AuthProvider";
import Layout from "routes/Layout";


export default function ProtectedRoute() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {user, refresh} = useAuth();

    useEffect(() => {
        // The active flag guards against updating state for an unmounted component.
        // e.g. when user navigates before auth.refresh() is done.
        let active = true;
        (async () => {
            await refresh();
            if (active) setIsLoading(false);
        })();
        return () => { active = false; };
    // Can't just run on mount as user could logout in another tab (so need to detect if auth changes)
    }, [refresh]);  // Need to use refresh rather than whole AuthContext as it's more stable

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!user) {
        return <Navigate to='/login' replace />;
    }

    return <Layout />;
}
