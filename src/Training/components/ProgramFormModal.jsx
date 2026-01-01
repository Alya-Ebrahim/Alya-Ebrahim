// src/Training/components/ProgramFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const MODAL_STYLE = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const INITIAL_FORM_STATE = { 
    name: '', 
    description: '', 
    trainer: '', // يفضل تغيير هذا إلى supervisor: '' في البيانات الخلفية مستقبلاً
    startDate: '', 
    endDate: '',
};

// ✅ تغيير اسم الـ prop من courseData إلى programData
const ProgramFormModal = ({ programData, onSave, onClose }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        // ✅ استخدام programData
        if (programData) {
            setFormData(programData);
        } else {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [programData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); 
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box component={Paper} sx={MODAL_STYLE}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {/* ✅ تغيير عنوان المودال */}
                    {programData ? 'تعديل بيانات البرنامج' : 'إنشاء برنامج تأهيلي جديد'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        // ✅ تغيير التسمية إلى "اسم البرنامج"
                        label="اسم البرنامج" 
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="الوصف والأهداف"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        margin="normal"
                        multiline
                        rows={3}
                        required
                    />
                    
                    {/* حقل اختيار المشرف */}
                    <FormControl fullWidth margin="normal">
                        {/* ✅ تغيير التسمية إلى "المشرف المسؤول" */}
                        <InputLabel>المشرف المسؤول</InputLabel>
                        <Select
                            label="المشرف المسؤول"
                            name="trainer" // يمكن الاحتفاظ باسم 'trainer' مؤقتاً إذا كان هو اسم الحقل في الـ API
                            value={formData.trainer || ''}
                            onChange={handleChange}
                            required
                        >
                            {/* ✅ تغيير الأسماء لتعكس المشرفين */}
                            <MenuItem value={"د. أحمد علي"}>د. أحمد علي (قسم الحاسوب)</MenuItem>
                            <MenuItem value={"أ. سارة خالد"}>أ. سارة خالد (التأهيل الوظيفي)</MenuItem>
                            {/* ... المزيد من المشرفين */}
                        </Select>
                    </FormControl>

                    {/* حقول التاريخ (تبقى كما هي) */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <TextField
                            type="date"
                            label="تاريخ البدء"
                            name="startDate"
                            value={formData.startDate || ''}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            sx={{ flex: 1 }}
                        />
                        <TextField
                            type="date"
                            label="تاريخ الانتهاء"
                            name="endDate"
                            value={formData.endDate || ''}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                            sx={{ flex: 1 }}
                        />
                    </Box>

                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={onClose} variant="outlined">إلغاء</Button>
                        <Button type="submit" variant="contained">حفظ</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ProgramFormModal;