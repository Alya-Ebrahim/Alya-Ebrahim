import React from 'react';
import { ThemeProvider, createTheme, styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom'; //  هذا هو العنصر الوحيد اللازم للتوجيه
import CustomAppBar from './components/CustomAppBar';
import CustomSidebar from './components/CustomSidebar';


//  لا حاجة لاستيراد مكونات المسارات هنا (Addusers, Manageusers)
// لأنها ستُعرض عبر <Outlet />

// تعريف عرض الشريط الجانبي
const drawerWidth = 280; 

// هذا المكون يضمن ترك مسافة بين أعلى المحتوى والـ AppBar
const DrawerHeader = styled('div')(({ theme }) => ({
 display: 'flex',
 alignItems: 'center',
 padding: theme.spacing(0),
 ...theme.mixins.toolbar, 
 justifyContent: 'flex-start',
}));


// تعريف المكون الرئيسي (Main) - تم تعديل منطق الهوامش ليتناسب مع RTL
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
 ({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  
  transition: theme.transitions.create('margin', {
   easing: theme.transitions.easing.sharp,
   duration: theme.transitions.duration.leavingScreen,
  }),

  
  ...(open && {
   transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
   }),
   marginRight: 0,
  }),
 })
);

// --------------------------------------------------
//  Layout Component: لدمج الشريط الجانبي والـ AppBar مع Outlet
const MainLayout = () => {
 const theme = useTheme();
 const [open, setOpen] = React.useState(false); 

 const handleDrawerOpen = () => setOpen(true);
 const handleDrawerClose = () => setOpen(false);
 
 return (
  <Box sx={{ display: 'flex' }}>
   
   <CustomAppBar drawerWidth={drawerWidth} open={open} handleDrawerOpen={handleDrawerOpen} /> 

   <CustomSidebar drawerWidth={drawerWidth} open={open} handleDrawerClose={handleDrawerClose} theme={theme} />

   <Main open={open}> 
    <DrawerHeader /> 
    {/* 💡 Outlet: هنا سيتم عرض المحتوى الخاص بالمسار الحالي (Dashboard, Manageusers, etc.) */}
    <Outlet /> 
   </Main>
  </Box>
 );
}


export default function App() {
 const theme = createTheme({
  // وضع RTL
  direction: 'rtl',
  palette: { primary: { main: '#1976d2' } },
 });

 return (
  <ThemeProvider theme={theme}>
   <CssBaseline />
   {/*  بما أن App هو العنصر الرئيسي للمسار، فإنه يعرض MainLayout مباشرة */}
      <MainLayout />
  </ThemeProvider>
 );
}