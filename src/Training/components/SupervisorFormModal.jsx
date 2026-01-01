// src/Training/components/SupervisorFormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, TextField, Button, Paper } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const INITIAL_FORM_STATE = { name: '', specialty: '', phone: '' };

// ✅ تغيير اسم الـ prop من trainerData إلى supervisorData
const SupervisorFormModal = ({ supervisorData, onSave, onClose }) => {
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        // ✅ استخدام supervisorData
        if (supervisorData) {
            setFormData(supervisorData);
        } else {
            setFormData(INITIAL_FORM_STATE);
        }
    }, [supervisorData]);

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
            <Box component={Paper} sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    {/* ✅ تغيير عنوان المودال */}
                    {supervisorData ? 'تعديل بيانات المشرف' : 'إضافة مشرف جديد'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        // ✅ تغيير التسمية إلى "اسم المشرف"
                        label="اسم المشرف كاملاً"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="التخصص الرئيسي"
                        name="specialty"
                        value={formData.specialty}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="رقم الهاتف"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Button onClick={onClose} variant="outlined">إلغاء</Button>
                        <Button type="submit" variant="contained">حفظ</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default SupervisorFormModal;