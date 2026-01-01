// src/components/CustomSidebar.jsx
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'; 
import { styled } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { 
  HomeOutlined, PersonAddAltOutlined, EngineeringOutlined, Groups2Outlined, 
  SettingsOutlined, AccountCircle,
  // ChevronLeft as ChevronLeftIcon, 
  ChevronRight 
} from '@mui/icons-material';
// import { 
   
//     DashboardOutlined,      
//     SchoolOutlined,        
//     AssignmentOutlined,    
//     Groups2Outlined,      
//     SettingsOutlined,     
//     AccountCircle,
    
//     ChevronRight          
// } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';


const drawerWidth = 280;

const DrawerHeader = styled('div')(({ theme }) => ({

alignItems: 'rtl',
padding: theme.spacing(0, 1), 
...theme.mixins.toolbar,
// محاذاة لليسار لزر الإغلاق
justifyContent: 'flex-start', 

}));

const menuItems = [
{ text: "لوحة التحكم", icon: <HomeOutlined />, path: "/" },
{ text: "إضافة مستخدم جديد", icon: <PersonAddAltOutlined />, path: "/add-users" },
{ text: "إدارة المستخدمين", icon: <EngineeringOutlined />, path: "/manage-users" },
{ text: "إدارة الطلبات", icon: <Groups2Outlined />, path: "/manage-orders" },
{ text: "الإعدادات", icon: <SettingsOutlined />, path: "/settings" },
];
// const menuItems = [
//     { text: "لوحة القيادة", icon: <DashboardOutlined />, path: "/" },
//     { text: "إدارة الدورات", icon: <SchoolOutlined />, path: "/manage-courses" },
//     { text: "تسجيل الحضور والنتائج", icon: <AssignmentOutlined />, path: "/attendance" },
//     { text: "إدارة المدربين", icon: <Groups2Outlined />, path: "/manage-trainers" }, 
//     { text: "إعدادات النظام", icon: <SettingsOutlined />, path: "/training-settings" },
// ];

export default function CustomSidebar({ open, handleDrawerClose, theme }) {
const navigate = useNavigate();
const location = useLocation();

return (
<Drawer
variant="persistent"
// 🌟 التصحيح 1: لتثبيت الشريط الجانبي على اليمين في تخطيط RTL
anchor="left" 
open={open}
sx={{
   
'& .MuiDrawer-paper': {
width: drawerWidth,
boxSizing: 'border-box',
},
}}
>
<DrawerHeader>
      {/* زر الإغلاق: يظل على اليسار */}
      <IconButton onClick={handleDrawerClose}>
        <ChevronLeftIcon /> 
      </IconButton>
   </DrawerHeader>

<Box
sx={{
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
padding: theme?.spacing(2) || 2,

}}
>
<Avatar sx={{ width: 50, height: 50, marginBottom: 1, bgcolor: theme?.palette.primary.main || '#1976d2' }}>
<AccountCircle sx={{ width: 40, height: 40 }} />
</Avatar>
<Box sx={{ textAlign: 'center',  fontWeight: 700,fontSize: 16  }}>نسيبة المقطري</Box>
<Box sx={{ textAlign: 'center', fontSize: 14, color: grey[600] }}>رئيس لجنة التدريب الميداني</Box>
</Box>

<Divider />

<List>
  {menuItems.map((item) => (
    <ListItem key={item.path} disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(item.path);
          handleDrawerClose();
        }}
        sx={{
          backgroundColor: location.pathname === item.path ? grey[200] : 'inherit',
          display: 'flex',
          flexDirection: 'row-reverse', // الأيقونة على اليمين والنص على يسارها
          alignItems: 'center',
          gap: 1, // مسافة صغيرة بين الأيقونة والنص
          px: 2, // padding أكبر قليلاً لتحسين المظهر
          py: 1, // padding عمودي
        }}
      >
        {/* الأيقونة على اليمين */}
        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
          {item.icon}
        </Box>

        {/* النص بجانب الأيقونة */}
        <Typography 
          sx={{ 
            textAlign: 'right', 
            m: 1, 
            fontSize: 16,      
            fontWeight: 700,   // 🌟 اجعل النص Bold
            color: theme?.palette.text.primary || '#000', 
          }}
        >
          {item.text}
        </Typography>
      </ListItemButton>
    </ListItem>
  ))}
</List>


</Drawer>
);
}