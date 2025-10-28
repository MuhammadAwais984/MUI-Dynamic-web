
import { Box, Toolbar } from '@mui/material';

import { Outlet } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Navbar />
        <Toolbar /> {/* for spacing below AppBar */}
        <Outlet />
      </Box>
    </Box>
  );
}
