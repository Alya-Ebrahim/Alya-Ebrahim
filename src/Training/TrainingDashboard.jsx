import React from 'react';
import { 
    Box, Typography, Grid, Paper, Button, 
    Stack, LinearProgress, Chip, Avatar, AvatarGroup, Divider
} from '@mui/material'; 
import { 
    AddRounded, DescriptionOutlined, PeopleAltOutlined, 
    AccountBalanceOutlined, AssignmentTurnedInOutlined,
    WorkOutlineOutlined, AccessTimeOutlined,
    NotificationsNoneOutlined
} from '@mui/icons-material';

const TrainingDashboard = () => {
    return (
        <Box dir="rtl" sx={{ flexGrow: 1, p: { xs: 2, md: 5 }, backgroundColor: '#F8F9FE', minHeight: '100vh' }}>
            
            {/* 1. العنوان والزر الرئيسي */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#2B3674', mb: 1 }}>لوحة التحكم</Typography>
                    <Typography variant="body1" sx={{ color: '#707EAE' }}>أهلاً بك! إليك نظرة شاملة على نشاطك التدريبي اليوم.</Typography>
                </Box>
                <Button 
                    variant="contained" 
                    startIcon={<AddRounded sx={{ ml: 1 }} />} 
                    sx={{ borderRadius: '12px', px: 4, py: 1.5, backgroundColor: '#4318FF', fontWeight: 'bold' }}
                >
                    برنامج جديد
                </Button>
            </Stack>

            {/* 2. بطاقات الإحصائيات - تم تعديل الأوزان والحواف هنا */}
            <Grid container spacing={2.5} sx={{ mb: 6 }}>
                {[
                    { label: 'إجمالي المتدربين', value: '124', icon: <PeopleAltOutlined />, bg: '#E1E9FF', color: '#4318FF' },
                    { label: 'الطلبات المعلقة', value: '45', icon: <DescriptionOutlined />, bg: '#FFE9E9', color: '#FF5B5B' },
                    { label: 'الجامعات المتعاقدة', value: '8', icon: <AccountBalanceOutlined />, bg: '#E2FBE7', color: '#05CD99' },
                    { label: 'تقييمات مكتملة', value: '89%', icon: <AssignmentTurnedInOutlined />, bg: '#F4F7FE', color: '#2B3674' },
                    { label: 'فرص تدريبية', value: '12', icon: <WorkOutlineOutlined />, bg: '#FFF4E5', color: '#FF9800' },
                    { label: 'ساعات التدريب', value: '1.2k', icon: <AccessTimeOutlined />, bg: '#F3E5F5', color: '#9C27B0' },
                ].map((stat, idx) => (
                    <Grid item xs={12} sm={6} md={4} lg={2} key={idx}>
                        <Paper elevation={0} sx={{ 
                            p: 3, // حجم البطاقة الكلي
                            borderRadius: '20px', 
                            border: '1px solid #E9EDF7', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 1.5 
                        }}>
                            {/* التحكم في حجم خلفية الأيقونة بشكل منفصل */}
                            <Box sx={{ 
                                width: 42,      // عرض الخلفية
                                height: 42,     // ارتفاع الخلفية
                                borderRadius: '12px', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                backgroundColor: stat.bg, 
                                color: stat.color,
                                flexShrink: 0 
                            }}>
                                {/* التحكم في حجم الأيقونة نفسها بشكل منفصل */}
                                {React.cloneElement(stat.icon, { sx: { fontSize: 22 } })} 
                            </Box>
                            
                            <Box>
                                <Typography variant="caption" sx={{ color: '#A3AED0', fontWeight: 'bold', fontSize: '0.75rem', display: 'block' }}>
                                    {stat.label}
                                </Typography>
                                <Typography variant="h6" sx={{ fontWeight: 800, color: '#2B3674', fontSize: '1.05rem', lineHeight: 1.2 }}>
                                    {stat.value}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* 3. منطقة المحتوى الرئيسية */}
            <Grid container spacing={4}>
                
                {/* اليمين: البرامج التدريبية */}
                <Grid item xs={12} lg={7.5}>
                    <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid #E9EDF7', height: '100%' }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#2B3674', mb: 4 }}>البرامج التدريبية النشطة</Typography>
                        <Stack spacing={2.5}>
                            {[
                                { title: 'تطوير React المتقدم', students: '12 طالب', progress: 85, color: '#4318FF' },
                                { title: 'الأمن السيبراني والشبكات', students: '8 طلاب', progress: 45, color: '#05CD99' },
                                { title: 'إدارة المشاريع التقنية', students: '15 طالب', progress: 20, color: '#FFB800' }
                            ].map((program, i) => (
                                <Box key={i} sx={{ p: 3, borderRadius: '20px', bgcolor: '#F4F7FE' }}>
                                    <Grid container alignItems="center" spacing={2}>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{program.title}</Typography>
                                            <Typography variant="body2" color="textSecondary">{program.students}</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <LinearProgress variant="determinate" value={program.progress} sx={{ height: 8, borderRadius: 5, bgcolor: '#E9EDF7', '& .MuiLinearProgress-bar': { bgcolor: program.color } }} />
                                        </Grid>
                                        <Grid item xs={12} md={3} align="left">
                                            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                                <Avatar src="" /><Avatar src="" /><Avatar src="" />
                                            </AvatarGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}
                        </Stack>
                    </Paper>
                </Grid>

                {/* اليسار: المشرفين والنشاطات (لملء الفراغ الجانبي) */}
                <Grid item xs={12} lg={4.5}>
                    <Stack spacing={3}>
                        <Paper elevation={0} sx={{ p: 3.5, borderRadius: '24px', border: '1px solid #E9EDF7' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#2B3674', mb: 3 }}>طاقم الإشراف</Typography>
                            <Stack spacing={3}>
                                {[{ n: 'أحمد علي', d: 'قسم البرمجيات' }, { n: 'سارة خالد', d: 'الموارد البشرية' }].map((m, i) => (
                                    <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ width: 42, height: 42, bgcolor: '#4318FF' }}>{m.n[0]}</Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{m.n}</Typography>
                                                <Typography variant="caption" color="textSecondary">{m.d}</Typography>
                                            </Box>
                                        </Stack>
                                        <Chip label="4 طلاب" sx={{ fontWeight: 'bold', bgcolor: '#F4F7FE', color: '#4318FF' }} />
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>

                        <Paper elevation={0} sx={{ p: 3.5, borderRadius: '24px', border: '1px solid #E9EDF7' }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
                                <NotificationsNoneOutlined sx={{ color: '#4318FF' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800 }}>آخر التحديثات</Typography>
                            </Stack>
                            <Stack spacing={2.5}>
                                {[
                                    { t: 'تحديث تقييم المتدرب فهد', s: 'منذ 10 دقائق' },
                                    { t: 'رفع تقرير جامعة الملك سعود', s: 'منذ ساعة' }
                                ].map((act, i) => (
                                    <Box key={i}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#2B3674' }}>{act.t}</Typography>
                                        <Typography variant="caption" color="textSecondary">{act.s}</Typography>
                                        {i === 0 && <Divider sx={{ mt: 2 }} />}
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TrainingDashboard;