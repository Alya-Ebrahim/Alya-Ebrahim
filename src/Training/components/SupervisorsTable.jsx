// src/Training/components/SupervisorsTable.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from '@mui/material';

// ✅ إضافة Typography للاستخدام في رسالة عدم وجود بيانات
// تم حذف رسالة الخطأ لتجنب تكرار الكود
const SupervisorsTable = ({ supervisors, onEdit, onDelete }) => {
    
    // ✅ التأكد من وجود البيانات وتغيير trainers إلى supervisors
    if (!supervisors || supervisors.length === 0) {
        return (
            <Paper elevation={1} sx={{ mt: 3, p: 3, textAlign: 'center' }}>
                <Typography variant="body1" color="textSecondary">
                    لا يوجد مشرفون مسجلون حالياً.
                </Typography>
            </Paper>
        );
    }
    
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table size="medium">
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.light' }}>
                        {/* ✅ تغيير "اسم المدرب" إلى "اسم المشرف" */}
                        <TableCell sx={{ fontWeight: 'bold' }}>اسم المشرف</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>التخصص</TableCell>
                        {/* ✅ تغيير "الدورات المسندة" إلى "البرامج المشرف عليها" */}
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>البرامج المشرف عليها</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>الإجراءات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* ✅ التكرار على supervisors بدلاً من trainers */}
                    {supervisors.map((supervisor) => (
                        <TableRow 
                            key={supervisor.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{supervisor.name}</TableCell>
                            <TableCell>{supervisor.specialty}</TableCell>
                            {/* نفترض أن الخاصية لا تزال trainer.coursesCount في البيانات المؤقتة */}
                            <TableCell align="center">{supervisor.coursesCount}</TableCell> 
                            <TableCell align="center">
                                <Button 
                                    size="small" 
                                    // تمرير بيانات المشرف
                                    onClick={() => onEdit && onEdit(supervisor)} 
                                >
                                    تعديل
                                </Button>
                                <Button 
                                    size="small" 
                                    color="error" 
                                    sx={{ mr: 1 }}
                                    // تمرير ID المشرف
                                    onClick={() => onDelete && onDelete(supervisor.id)}
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

export default SupervisorsTable;