import React from 'react';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import Pie from './PieChart';
import Line from './Line';

export default function Row2() {
    const theme = useTheme();
    
    return (
        <Stack 
            direction={"row"} 
            flexWrap={"wrap"} 
            gap={2} 
            mt={3}
            justifyContent="space-between" 
        >
            
            {/* 1. المخطط الخطي (Line Chart) */}
            <Paper 
                elevation={3} // ✨ إضافة ظل خفيف للبروز
                sx={{
                    flex: '1 1 48%', 
                    minWidth: '350px', // تصغير الـ minWidth قليلاً لتحسين التجاوبية على الأجهزة الأصغر
                    height: "75vh", 
                    border: `1px solid ${theme.palette.divider}`, 
                    p: 1.5, 
                }}
            >
                <Typography 
                    color={theme.palette.secondary.main}
                    fontWeight={"bold"}
                    variant='h6'
                    mb={1.5} 
                    sx={{ textAlign: 'center' }}
                >
                    عدد الطلاب المنجزين للتدريب سنويًا
                </Typography>
                
                <Box height="calc(100% - 40px)"> 
                    <Line/> 
                </Box>
            </Paper>

            {/* 2. المخطط الدائري (Pie Chart) */}
            <Paper 
                elevation={3} // ✨ إضافة ظل خفيف للبروز
                sx={{
                    flex: '1 1 48%', 
                    minWidth: '350px',
                    height: "75vh", 
                    border: `1px solid ${theme.palette.divider}`, 
                    p: 1.5,
                }}
            >
                <Typography 
                    color={theme.palette.secondary.main}
                    fontWeight={"bold"}
                    variant='h6'
                    mb={1.5}
                    sx={{ textAlign: 'center' }}
                >
                    نسب الطلاب حسب حالة التدريب
                </Typography>
                
                <Box height="calc(100% - 40px)">
                    <Pie/>
                </Box>
            </Paper>
            
        </Stack>
    );
}