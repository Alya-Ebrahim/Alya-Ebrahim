// src/Training/components/UpcomingCoursesList.jsx
import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import { DateRangeOutlined } from '@mui/icons-material';

const UpcomingCoursesList = ({ courses }) => {
    return (
        <Paper elevation={3} sx={{ padding: 2, flex: 1, minWidth: 300 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                📅 الدورات المجدولة قريباً
            </Typography>
            <Divider sx={{ mb: 1 }} />
            
            <List dense>
                {courses && courses.length > 0 ? (
                    courses.slice(0, 4).map((course) => ( // عرض 4 دورات كحد أقصى
                        <React.Fragment key={course.id}>
                            <ListItem disablePadding sx={{ py: 0.5 }}>
                                <DateRangeOutlined sx={{ fontSize: 18, ml: 1, color: 'primary.main' }} />
                                <ListItemText
                                    primary={course.name}
                                    secondary={`تبدأ: ${course.startDate} | المتدربون: ${course.trainees}`}
                                    sx={{ textAlign: 'right' }}
                                    primaryTypographyProps={{ fontWeight: 'medium' }}
                                />
                            </ListItem>
                            <Divider component="li" />
                        </React.Fragment>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary" sx={{ p: 2, textAlign: 'center' }}>
                        لا توجد دورات مجدولة حالياً.
                    </Typography>
                )}
            </List>
            
            <Button 
                fullWidth 
                variant="text" 
                sx={{ mt: 1 }} 
                onClick={() => console.log("Navigate to /manage-courses")}
            >
                عرض كل الدورات →
            </Button>
        </Paper>
    );
};

export default UpcomingCoursesList;