import React from 'react';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';

// استيراد المكونات
import SanaaBarChart from './SanaaBarChart';
import CompanySatisfactionByCollege from './CompanySatisfactionByCollege';

export default function Row3() {
    const theme = useTheme();

    return (
        <Stack
            direction={"row"}
            flexWrap={"wrap"}
            gap={2}
            mt={3}
            justifyContent="space-between"
        >

            {/* 1. مخطط توزيع جهات التدريب */}
            <Paper
                elevation={3} // ✨ إضافة ظل خفيف
                sx={{
                    flex: '1 1 48%',
                    minWidth: '350px',
                    height: "75vh",
                    border: `1px solid ${theme.palette.divider}`,
                    p: 1.5,
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    color={theme.palette.secondary.main}
                    fontWeight={"bold"}
                    variant='h6'
                    mb={1.5}
                    sx={{ textAlign: 'center', flexShrink: 0 }}
                >
                    توزيع جهات التدريب حسب مديريات صنعاء
                </Typography>

                <Box sx={{ flexGrow: 1, minHeight: 0 }}>
                    <SanaaBarChart />
                </Box>
            </Paper>

            {/* 2. مخطط تقييم جهات التدريب */}
            <Paper
                elevation={3} // ✨ إضافة ظل خفيف
                sx={{
                    flex: '1 1 48%',
                    minWidth: '350px',
                    height: "75vh",
                    border: `1px solid ${theme.palette.divider}`,
                    p: 1.5,
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Typography
                    color={theme.palette.secondary.main}
                    fontWeight={"bold"}
                    variant='h6'
                    mb={1.5}
                    sx={{ textAlign: 'center', flexShrink: 0 }}
                >
                    متوسط تقييم جهات التدريب حسب الكلية
                </Typography>

                <Box sx={{ flexGrow: 1, height: "100%" }}>
                    <CompanySatisfactionByCollege />
                </Box>
            </Paper>

        </Stack>
    );
}