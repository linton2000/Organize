import { useState } from "react";
import {
    Button,
    Divider,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "providers/AuthProvider";

export default function ProfileMenu() {
    // anchorEL is the element that MUI uses to decide menu placement
    // Here it's placed below the profile button. When null, the menu just closes.
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const auth = useAuth();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
                color="secondary"
            >
                My Profile
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem disabled disableRipple>
                    <Typography>
                        {auth.user?.first_name} {auth.user?.last_name}
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => auth.logout()}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText> Logout </ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}
