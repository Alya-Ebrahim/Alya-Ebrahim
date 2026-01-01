import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import '/index.css'

import Dashboard from './page/dashboard/Dashboard.jsx';
import Addusers from './page/add-users/Addusers.jsx';
import Manageusers from './page/manage-users/Manageusers.jsx';
import Manageorders from './page/manage-orders/Manageorders.jsx';
import Settings from './page/settings/Settings.jsx';

// 💡 استيراد مكون التعديل (Editusers)
import Editusers from './page/edit-users/Editusers.jsx'; 
// // // 💡 استيراد مزود السياق (UserProvider) لتمكين مشاركة البيانات
  import { UserProvider } from './page/UserContext.jsx'; 

// ✅ استدعاء صفحات جهة التدريب الجديدة
// import TrainingDashboard from './Training/TrainingDashboard.jsx';
// import CourseManagement from './Training/ProgramManagement.jsx';
// import AttendanceTracking from './Training/AttendanceTracking.jsx'; 
// import TrainingSettings from './Training/TrainingSettings.jsx'; 
// // افتراض أنك تحتاج واجهة لإدارة المدربين
// import ManageTrainers from './Training/ManageSupervisors.jsx';

// دعم RTL (MUI)
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

// إنشاء cache RTL
const cacheRtl = createCache({
key: 'mui-rtl',
stylisPlugins: [prefixer, rtlPlugin],
});

// إنشاء الرواتر
const router = createBrowserRouter(
createRoutesFromElements(
 <Route path="/" element={<App />}>
 <Route index element={<Dashboard />} />
 <Route path="add-users" element={<Addusers />} />
 
 {/* مسار إدارة المستخدمين */}
 <Route path="manage-users" element={<Manageusers />} />
 
 {/* 🚀 المسار الجديد للتعديل: يستخدم Query Parameters لاستقبال id و type */}
 <Route path="edit-users" element={<Editusers />} /> 
   
 <Route path="manage-orders" element={<Manageorders />} />
 <Route path="settings" element={<Settings />} />
 </Route>

//  <Route path="/" element={<App />}>


//   <Route index element={<TrainingDashboard />} />


//   <Route path="manage-courses" element={<CourseManagement />} />

//   <Route path="attendance" element={<AttendanceTracking />} />

//   <Route path="manage-trainers" element={<ManageTrainers />} />


//   <Route path="training-settings" element={<TrainingSettings />} />
// </Route> 
)
);


const container = document.getElementById('root');
if (!container) throw new Error('Failed to find root element');

createRoot(container).render(
<StrictMode>
 <CacheProvider value={cacheRtl}>
    {/* 💡 تغليف RouterProvider بالمزود (UserProvider) لتمكين Context API في كامل التطبيق */}
    <UserProvider> 
     <RouterProvider router={router} />
    </UserProvider>
 </CacheProvider>
</StrictMode>
);