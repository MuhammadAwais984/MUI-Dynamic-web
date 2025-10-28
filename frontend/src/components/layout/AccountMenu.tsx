import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Box,
  ListItemIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../api/auth"; // 🔧 Import logout function
export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const fullName = user ? `${user.first_name} ${user.last_name}` : "User";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  const handleLogout = async () => {
    try {
      await logout(); // 🔐 API call to backend logout
      localStorage.removeItem("user"); // 🔐 Clear user info
      navigate("/login"); // 🔄 Redirect to login page
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <Avatar
            src="https://i.pravatar.cc/300"
            alt="User"
            sx={{ width: 38, height: 38 }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 4,
          sx: {
            mt: 0,
            minWidth: 250,
            borderRadius: 3,
          },
        }}
      >
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="left"
          sx={{ padding: 2, borderBottom: "1px solid #e0e0e0" }}
        >
          <Typography>{fullName}</Typography>

          <Typography variant="body2" color="text.secondary">
            {JSON.parse(localStorage.getItem("user"))?.email || ""}
          </Typography>
        </Box>
        <Box sx={{ padding: 1 }}>
          <MenuItem onClick={() => handleNavigate("/settings")}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => handleNavigate("/account")}>
            <ListItemIcon>
              <AccountCircleIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
}
