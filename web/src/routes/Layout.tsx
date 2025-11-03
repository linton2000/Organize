import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import DefaultDrawer from "components/DefaultDrawer";
import ProfileMenu from "components/ProfileMenu";

export default function Layout() {
    let navItemsList: Array<Array<string>> = [
        ["Home", "/home"],
        ["Schedule", "/schedule"],
        ["Subject Management", "/subject-management"],
        ["Analytics", "/analytics"]
    ];

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Typography variant="h4" noWrap component="div" sx={{ flexGrow: 1 }}>
                        TimeBoxer
                    </Typography>
                    <Box sx={{ mr: 8 }}>
                        <ProfileMenu />
                    </Box>
                </Toolbar>
            </AppBar>
            <DefaultDrawer navItems={navItemsList} />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar> </Toolbar>
                <Outlet />
            </Box>
        </Box>
    );
}
