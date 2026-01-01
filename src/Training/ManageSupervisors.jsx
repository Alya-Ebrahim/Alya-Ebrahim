// src/pages/training/ManageSupervisors.jsx (تم افتراض تغيير اسم الملف)

import React, { useState } from 'react';
import { Button, Typography, Paper, Box } from '@mui/material'; // ✅ إضافة Box
import SupervisorsTable from './components/SupervisorsTable'; 
import SupervisorFormModal from './components/SupervisorFormModal'; 

// ✅ تحديث اسم البيانات الوهمية
const MOCK_SUPERVISORS = [
    // ✅ تغيير المصطلح trainer/coursesCount إلى supervisor/programsCount
    { id: 1, name: 'خالد ناصر', specialty: 'تطوير الأعمال', programsCount: 5 },
    { id: 2, name: 'ندى فهد', specialty: 'التدريب القيادي', programsCount: 3 },
];

const ManageSupervisors = () => {
    // ✅ تحديث أسماء المتغيرات إلى supervisors
    const [supervisors, setSupervisors] = useState(MOCK_SUPERVISORS); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [supervisorToEdit, setSupervisorToEdit] = useState(null);

    const handleCreateNew = () => {
        setSupervisorToEdit(null); // لا يوجد مشرف للتعديل، وضع جديد
        setIsModalOpen(true);
    };

    // 1. دالة التعديل (Edit)
    const handleEditSupervisor = (supervisor) => {
        setSupervisorToEdit(supervisor);
        setIsModalOpen(true);
    };

    // 2. دالة الحفظ (Save)
    const handleSave = (newSupervisorData) => {
        if (newSupervisorData.id) {
            // منطق التعديل
            setSupervisors(prevSupervisors =>
                prevSupervisors.map(s => s.id === newSupervisorData.id ? newSupervisorData : s)
            );
        } else {
            // منطق الإضافة
            const newId = Math.max(...supervisors.map(s => s.id)) + 1;
            // ✅ تغيير المصطلح trainer إلى supervisor
            const newSupervisor = { id: newId, ...newSupervisorData, programsCount: 0 }; 
            setSupervisors(prevSupervisors => [...prevSupervisors, newSupervisor]); 
        }
        
        setIsModalOpen(false);
    };
    
    // 3. دالة الحذف (Delete)
    const handleDeleteSupervisor = (id) => {
        // يمكن إضافة تأكيد هنا (مثل استخدام AlertDialog)
        if (window.confirm('هل أنت متأكد من حذف هذا المشرف؟')) {
            setSupervisors(prevSupervisors => prevSupervisors.filter(s => s.id !== id));
        }
    };


    return (
        <Paper elevation={1} sx={{ padding: 3 }}>
            {/* ✅ تحديث العنوان */}
            <Box 
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} 
                className="page-header"
            >
                <Typography variant="h4">🧑‍🏫 إدارة المشرفين والمرشدين</Typography>
                <Button variant="contained" onClick={handleCreateNew}>
                    {/* ✅ تحديث زر الإضافة */}
                    ➕ إضافة مشرف جديد
                </Button>
            </Box>
            
            <SupervisorsTable 
                // ✅ تمرير المتغير الجديد supervisors
                supervisors={supervisors} 
                onEdit={handleEditSupervisor} // تم إضافة دالة التعديل
                onDelete={handleDeleteSupervisor} // تم إضافة دالة الحذف
            />
            
            {isModalOpen && (
                <SupervisorFormModal 
                    // ✅ تمرير المتغير الجديد supervisorToEdit
                    supervisorData={supervisorToEdit} 
                    onSave={handleSave} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </Paper>
    );
};

export default ManageSupervisors;