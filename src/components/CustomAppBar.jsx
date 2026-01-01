// src/components/CustomAppBar.jsx
import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const drawerWidth = 280;

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth, // Drawer على اليمين
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

export default function CustomAppBar({ open, handleDrawerOpen }) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse', // 🌟 زر القائمة على أقصى اليمين
          alignItems: 'center',
          justifyContent: 'flex-start', // باقي المحتوى بعد الزر
          px: 2,
        }}
      >
        {/* زر فتح Drawer على أقصى اليمين */}
        <IconButton
          onClick={handleDrawerOpen}
          edge="start"
          color="inherit"
          sx={{
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* العنوان بعد الزر مباشرة */}
        <Typography variant="h6" noWrap sx={{ textAlign: 'right', ml: 2 }}>
          نظام إدارة التدريب الميداني
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
