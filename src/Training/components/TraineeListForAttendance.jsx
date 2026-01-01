// src/Training/components/TraineeListForAttendance.jsx
import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Button } from '@mui/material';

const TraineeListForAttendance = ({ trainees, selectedCourseId }) => {
    
    // محاكاة لحالة البيانات القابلة للتعديل
    const [traineeData, setTraineeData] = React.useState(trainees);

    const handleAttendanceChange = (traineeId, isPresent) => {
        setTraineeData(prevData =>
            prevData.map(t => 
                t.id === traineeId ? { ...t, attendance: isPresent ? 'Present' : 'Absent' } : t
            )
        );
    };

    const handleScoreChange = (traineeId, newScore) => {
        setTraineeData(prevData =>
            prevData.map(t => 
                t.id === traineeId ? { ...t, score: newScore } : t
            )
        );
    };

    const handleSubmit = () => {
        // منطق إرسال بيانات الحضور والنتائج إلى API
        console.log(`Submitting attendance and scores for course ${selectedCourseId}:`, traineeData);
        alert('تم حفظ الحضور والنتائج مؤقتاً.');
    };

    return (
        <Paper elevation={2} sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>قائمة المتدربين وتسجيل النتائج</Typography>
            
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>اسم المتدرب</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>حضور</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الدرجة النهائية</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>ملاحظات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {traineeData.map((trainee) => (
                            <TableRow key={trainee.id}>
                                <TableCell>{trainee.name}</TableCell>
                                <TableCell align="center">
                                    <Checkbox
                                        checked={trainee.attendance === 'Present'}
                                        onChange={(e) => handleAttendanceChange(trainee.id, e.target.checked)}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        size="small"
                                        type="number"
                                        value={trainee.score || ''}
                                        onChange={(e) => handleScoreChange(trainee.id, e.target.value)}
                                        sx={{ width: 80 }}
                                        inputProps={{ min: 0, max: 100 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField size="small" placeholder="ملاحظات..." />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button 
                variant="contained" 
                sx={{ mt: 3 }} 
                onClick={handleSubmit}
            >
                حفظ الحضور والنتائج
            </Button>
        </Paper>
    );
};

export default TraineeListForAttendance;