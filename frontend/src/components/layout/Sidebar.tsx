import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  Divider,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { NavLink } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCicleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close"; 

const drawerWidth = 280;

export default function Sidebar() {
  const menuItems = [
    {
      text: "Overview",
      icon: <DashboardIcon />,
      path: "/dashboard",
    },
    {
      text: "Customers",
      icon: <GroupIcon />,
      path: "/customers",
    },
    {
      text: "Integrations",
      icon: <AutoAwesomeIcon />,
      path: "/integrations",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />, // import from @mui/icons-material
      path: "/settings",
    },
    {
      text: "Account",
      icon: <AccountCicleIcon />, // import from @mui/icons-material
      path: "/account",
    },
    {
      text: "Error",
      icon:  <CloseIcon />, // Using SettingsIcon for Error page as placeholder
      path: "*"
    }
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#121621",
          color: "white",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", p: 0 }}>
        <List>
          <Divider sx={{ borderColor: "#555", my: 1 }} />
          {menuItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.text}
              style={({ isActive }) => ({
                textDecoration: "none",
              })}
            >
              {({ isActive }) => (
                <ListItem
                  button
                  sx={{
                    backgroundColor: isActive ? "#635bff" : "transparent",
                    color: "white",
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "#4b42cc",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "rgba(255, 255, 255, 0.3)",
                      minWidth: "30px",
                      mr: 1,
                      paddingLeft: 2,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
        <Divider sx={{ borderColor: "#555", my: 1 }} />
        <Box sx={{ p: 2 }}>
          <Typography>Need more Features?</Typography>
          <Typography
            variant="body2"
            color="rgba(255, 255, 255, 0.7)"
            sx={{ mt: 0, fontSize: 13 }}
          >
            Check out our Pro solution template.
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
}
