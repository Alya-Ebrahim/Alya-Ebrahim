// src/pages/training/AttendanceTracking.jsx
import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import TraineeListForAttendance from './components/TraineeListForAttendance'; 

// ❌ تم حذف useEffect واستبداله ببيانات وهمية ثابتة
const MOCK_COURSES_ACTIVE = [
    { id: 'c1', name: 'دورة الأمن السيبراني (قيد التنفيذ)' },
    { id: 'c2', name: 'إدارة المشاريع المتقدمة (لم تكتمل)' },
];

const MOCK_TRAINEES_C1 = [
    { id: 't1', name: 'يوسف محمد', attendance: 'Absent', score: null },
    { id: 't2', name: 'فاطمة خالد', attendance: 'Present', score: 85 },
];

const AttendanceTracking = () => {
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courses] = useState(MOCK_COURSES_ACTIVE);
    const [trainees, setTrainees] = useState([]); 

    // ❌ تم حذف useEffect

    const handleCourseChange = (event) => {
        const courseId = event.target.value;
        setSelectedCourseId(courseId);
        
        // محاكاة جلب المتدربين عند اختيار الدورة
        if (courseId === 'c1') {
            setTrainees(MOCK_TRAINEES_C1);
        } else {
            setTrainees([]);
        }
    };

    return (
        <Paper elevation={1} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>📝 تسجيل الحضور والنتائج</Typography>
            
            <Box sx={{ marginBottom: 3, maxWidth: 400 }}>
                <FormControl fullWidth>
                    <InputLabel id="course-select-label">اختر الدورة</InputLabel>
                    <Select
                        labelId="course-select-label"
                        value={selectedCourseId}
                        label="اختر الدورة"
                        onChange={handleCourseChange}
                    >
                        {courses.map(course => (
                            <MenuItem key={course.id} value={course.id}>{course.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {selectedCourseId && (
                <TraineeListForAttendance trainees={trainees} selectedCourseId={selectedCourseId} />
            )}
        </Paper>
    );
};

export default AttendanceTracking;