// src/pages/training/ProgramManagement.jsx (تم افتراض تغيير اسم الملف)

import React, { useState } from 'react';
import { Button, Typography, Paper, Box } from '@mui/material'; // ✅ إضافة Box لتنظيم العنوان والزر
import ProgramsTable from './components/ProgramsTable';        // ✅ تم تصحيح اسم المكون
import ProgramFormModal from './components/ProgramFormModal';  // ✅ تم تصحيح اسم المكون

// ✅ تحديث اسم البيانات الوهمية
const MOCK_PROGRAMS_DATA = [
    // ✅ تغيير المصطلح trainer إلى مشرف والمصطلح course إلى برنامج (في البيانات المؤقتة)
    { id: 101, name: 'برنامج الذكاء الاصطناعي الأساسي', trainer: 'أحمد علي (مشرف)', status: 'Approved', startDate: '2026-02-01' },
    { id: 102, name: 'التدريب العملي: إدارة المخاطر', trainer: 'سارة خالد (مشرف)', status: 'Pending', startDate: '2026-03-15' },
    { id: 103, name: 'مشروع تخرج: التحول الرقمي', trainer: 'فهد جاسم (مشرف)', status: 'Rejected', startDate: '2026-04-10' },
];

const ProgramManagement = () => {
    // ✅ تغيير اسم المتغير إلى programs
    const [programs, setPrograms] = useState(MOCK_PROGRAMS_DATA); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    // ✅ تغيير اسم المتغير إلى programToEdit
    const [programToEdit, setProgramToEdit] = useState(null); 

    // منطق إضافة/تعديل/حذف البرامج (مُحاكى)

    const handleCreateNew = () => {
        setProgramToEdit(null); // لا يوجد برنامج للتعديل، وضع جديد
        setIsModalOpen(true);
    };

    const handleEdit = (program) => {
        setProgramToEdit(program); // ✅ استخدام programToEdit
        setIsModalOpen(true);
    };

    const handleSave = (programData) => {
        if (programData.id) {
            // منطق التعديل: إيجاد البرنامج القديم وتحديثه
            setPrograms(prevPrograms => 
                prevPrograms.map(p => p.id === programData.id ? programData : p)
            );
        } else {
            // منطق الإضافة: إنشاء ID جديد وإضافته
            const newId = Math.max(...programs.map(p => p.id)) + 1;
            const newProgram = { id: newId, ...programData, status: 'Pending' };
            setPrograms(prevPrograms => [...prevPrograms, newProgram]);
        }
        
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذا البرنامج التدريبي؟')) {
            setPrograms(prevPrograms => prevPrograms.filter(p => p.id !== id));
        }
    };

    return (
        <Paper elevation={1} sx={{ padding: 3 }}>
            <Box 
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }} 
                className="page-header"
            >
                {/* ✅ تحديث العنوان */}
                <Typography variant="h4">إدارة البرامج التأهيلية</Typography>
                <Button variant="contained" onClick={handleCreateNew}>
                    {/* ✅ تحديث زر الإضافة */}
                    ➕ إنشاء برنامج جديد
                </Button>
            </Box>
            
            <ProgramsTable 
                // ✅ تمرير المتغير الجديد programs
                programs={programs} 
                onEdit={handleEdit} 
                onDelete={handleDelete} // ✅ إضافة دالة الحذف
            />
            
            {isModalOpen && (
                <ProgramFormModal 
                    // ✅ تمرير المتغير الجديد programToEdit
                    programData={programToEdit} 
                    onSave={handleSave} 
                    onClose={() => setIsModalOpen(false)} 
                />
            )}
        </Paper>
    );
};

export default ProgramManagement;