// src/Training/components/QuickActions.jsx
import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { School, AssignmentTurnedInOutlined, PersonAdd } from '@mui/icons-material';

const actions = [
    { text: 'إنشاء وإدارة الدورات', icon: <School />, path: '/manage-courses' },
    { text: 'تسجيل الحضور والنتائج', icon: <AssignmentTurnedInOutlined />, path: '/attendance' },
    { text: 'إضافة مدرب جديد', icon: <PersonAdd />, path: '/manage-trainers' },
];

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <Paper elevation={3} sx={{ padding: 2, flex: 1, minWidth: 300 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                ⚡ الإجراءات السريعة
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                {actions.map((action) => (
                    <Button
                        key={action.path}
                        variant="contained"
                        startIcon={action.icon}
                        onClick={() => navigate(action.path)}
                        sx={{ 
                            justifyContent: 'flex-start', // محاذاة النص والأيقونة لليمين
                            padding: '12px 16px',
                        }}
                    >
                        {action.text}
                    </Button>
                ))}
            </Box>
        </Paper>
    );
};

export default QuickActions;