// src/pages/training/TrainingSettings.jsx
import React, { useState } from 'react';
import { Paper, Typography, Box, Switch, FormControlLabel, Button, Divider } from '@mui/material';

// ❌ تم حذف useEffect واستبداله ببيانات وهمية ثابتة
const INITIAL_SETTINGS = {
    autoSendNotifications: true,
    certificateTemplate: 'Template A',
    dataSyncEnabled: false,
};

const TrainingSettings = () => {
    const [settings, setSettings] = useState(INITIAL_SETTINGS);

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setSettings({
            ...settings,
            [event.target.name]: value,
        });
    };

    const handleSave = () => {
        // هنا يجب أن يكون منطق إرسال الإعدادات (POST/PUT) إلى API
        console.log('Saving settings:', settings);
        alert('تم حفظ الإعدادات بنجاح!');
    };

    return (
        <Paper elevation={1} sx={{ padding: 3, maxWidth: 800 }}>
            <Typography variant="h4" gutterBottom>⚙️ إعدادات جهة التدريب</Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">إعدادات الإشعارات</Typography>
                <FormControlLabel
                    control={
                        <Switch
                            checked={settings.autoSendNotifications}
                            onChange={handleChange}
                            name="autoSendNotifications"
                        />
                    }
                    label="إرسال إشعارات تلقائية للمتدربين عند بدء الدورة"
                />
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6">إعدادات الشهادات</Typography>
                <p>قالب الشهادة الحالي: {settings.certificateTemplate}</p>
                <Button variant="outlined">تغيير قالب الشهادة</Button>
            </Box>

            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    حفظ الإعدادات
                </Button>
            </Box>
        </Paper>
    );
};

export default TrainingSettings;