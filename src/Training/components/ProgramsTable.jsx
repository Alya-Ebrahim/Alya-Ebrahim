// src/Training/components/ProgramsTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material'; // ✅ إضافة Typography
import { styled } from '@mui/material/styles';

// تنسيق بسيط لحالة البرنامج (لم يتغير)
const StatusChip = styled('span')(({ status }) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.8em',
    color: status === 'Approved' ? '#1b5e20' : status === 'Pending' ? '#ff6f00' : '#c62828',
    backgroundColor: status === 'Approved' ? '#c8e6c9' : status === 'Pending' ? '#fff3e0' : '#ffcdd2',
    display: 'inline-block',
}));

// ✅ تغيير اسم الـ prop من { courses } إلى { programs } ليكون أدق
const ProgramsTable = ({ programs, onEdit, onDelete }) => {
    
    // التأكد من أن programs هي مصفوفة (كانت courses)
    if (!programs || programs.length === 0) {
        return (
            <Paper elevation={1} sx={{ mt: 3, p: 3, textAlign: 'center' }}>
                {/* ✅ تحديث رسالة الخطأ */}
                <Typography variant="body1" color="textSecondary">
                    لا توجد برامج تأهيل مسجلة حالياً.
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table size="medium">
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        {/* ✅ تغيير "اسم الدورة" إلى "اسم البرنامج" */}
                        <TableCell sx={{ fontWeight: 'bold' }}>اسم البرنامج</TableCell> 
                        {/* ✅ تغيير "المدرب" إلى "المشرف" */}
                        <TableCell sx={{ fontWeight: 'bold' }}>المشرف</TableCell> 
                        <TableCell sx={{ fontWeight: 'bold' }}>تاريخ البدء</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* التكرار على programs بدلاً من courses */}
                    {programs.map((program) => (
                        <TableRow key={program.id}>
                            <TableCell>{program.name}</TableCell>
                            {/* نفترض أن الخاصية لا تزال تسمى trainer في البيانات المؤقتة، لكن نغير العنوان */}
                            <TableCell>{program.trainer}</TableCell> 
                            <TableCell>{program.startDate}</TableCell>
                            <TableCell align="center">
                                <StatusChip status={program.status}>
                                    {program.status === 'Approved' ? 'مُعتمد' : 
                                     program.status === 'Pending' ? 'بانتظار المراجعة' : 'مرفوض'} 
                                </StatusChip>
                            </TableCell>
                            <TableCell align="center">
                                <Button 
                                    size="small" 
                                    onClick={() => onEdit && onEdit(program)} // استخدام program
                                >
                                    تعديل
                                </Button>
                                <Button 
                                    size="small" 
                                    color="error" 
                                    sx={{ mr: 1 }}
                                    onClick={() => onDelete && onDelete(program.id)} // استخدام program.id
                                >
                                    حذف
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

// ملاحظة: يجب التأكد من أن اسم هذا الملف هو ProgramsTable.jsx
export default ProgramsTable;