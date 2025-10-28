import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Avatar,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        m: 0, // removes all margin
        p: 0, // removes all padding
        width: `calc(100% - 280px)`,
      }}
    >
      <Toolbar
        disableGutters // disables default left/right padding of Toolbar
        sx={{ justifyContent: "space-between", px: 2 }}
      >
        <Box>
          <Tooltip title="Search">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Tooltip title="Contacts">
            <IconButton>
              <PeopleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          </Tooltip>
          
          {/* User Avatar */}
          <AccountMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
