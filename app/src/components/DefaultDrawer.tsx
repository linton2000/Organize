import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";

interface drawerProps{
    navItems: Array<Array<string>>
}

const drawerWidth = 240;

export default function DefaultDrawer(props: drawerProps) {
  const navigate = useNavigate();

  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {props.navItems.map((tuple) => (
              <ListItem key={tuple[0]} disablePadding>
                <ListItemButton onClick={() => navigate(tuple[1])}>
                  <ListItemText primary={tuple[0]}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
  );
}