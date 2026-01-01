import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
    Container, 
    Typography, 
    Box, 
    TextField, 
    Button, 
    Paper, 
    Grid, 
    useTheme,
    Snackbar,
    Alert
} from '@mui/material';

// 💡 تم تعديل مسار الاستيراد ليصبح بدون اللاحقة (.jsx) لحل خطأ Resolve
import { useUsers } from '../UserContext'; 

export default function Editusers() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    // استخراج id ونوع المستخدم من مسار الـ URL
    const userId = searchParams.get('id');
    const userType = searchParams.get('type'); // 'supervisor' or 'provider'

    const { findUser, updateUser } = useUsers();
    
    // حالة لتخزين بيانات المستخدم الأصلي (للتعديل)
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // --------------------------------------------------
    // 1. تحميل بيانات المستخدم عند تحميل المكون
    // --------------------------------------------------
    useEffect(() => {
        if (userId && userType) {
            const user = findUser(userId, userType);
            if (user) {
                // استخدام نسخة من بيانات المستخدم الأصلية في حالة التعديل
                setFormData({ ...user }); 
            } else {
                setSnackbar({ open: true, message: 'لم يتم العثور على بيانات المستخدم/الجهة المطلوبة.', severity: 'error' });
                // توجيه المستخدم لصفحة إدارة المستخدمين إذا لم يتم العثور على البيانات
                setTimeout(() => navigate('/manage-users'), 3000);
            }
        } else {
            setSnackbar({ open: true, message: 'معرف المستخدم أو نوعه غير محدد.', severity: 'error' });
            setTimeout(() => navigate('/manage-users'), 3000);
        }
        setLoading(false);
    }, [userId, userType, findUser, navigate]);
    
    // --------------------------------------------------
    // 2. معالجة التغييرات في الحقول
    // --------------------------------------------------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // --------------------------------------------------
    // 3. معالجة الإرسال (حفظ التعديلات)
    // --------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // التحقق من أن البيانات الأساسية موجودة قبل الإرسال
        if (!formData.name || (userType === 'supervisor' && !formData.major) || (userType === 'provider' && !formData.supervisor)) {
            setSnackbar({ open: true, message: 'يرجى ملء جميع الحقول المطلوبة.', severity: 'warning' });
            return;
        }

        // استدعاء دالة التحديث من Context
        updateUser(formData, userType);
        
        setSnackbar({ open: true, message: 'تم تحديث البيانات بنجاح!', severity: 'success' });
        
        // التوجيه إلى صفحة إدارة المستخدمين بعد فترة قصيرة
        setTimeout(() => navigate('/manage-users'), 1500); 
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    // --------------------------------------------------

    if (loading || !formData) {
        return (
            <Container maxWidth="md" sx={{ mt: 5, textAlign: 'center' }}>
                <Typography variant="h6">جاري تحميل بيانات المستخدم...</Typography>
            </Container>
        );
    }
    
    // تحديد العنوان حسب نوع المستخدم
    const title = userType === 'supervisor' ? 'تعديل بيانات المشرف الأكاديمي' : 'تعديل بيانات جهة التدريب';
    
    // --------------------------------------------------
    // 4. عرض النموذج (Rendering the Form)
    // --------------------------------------------------

    return (
        <Container maxWidth="lg" sx={{ padding: theme.spacing(3), direction: 'ltr' }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
                <Typography 
                    variant="h4" 
                    component="h1" 
                    gutterBottom 
                    align="center"
                    sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
                >
                    {title} (ID: {formData.id})
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        
                        {/* ----------------- حقول المشرفين وجهات التدريب (مشتركة) ----------------- */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="الاسم الكامل / اسم الجهة"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="الكلية / القسم التابع"
                                name="college"
                                value={formData.college || ''}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        {/* ----------------- حقول المشرفين ----------------- */}
                        {userType === 'supervisor' && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="التخصص الدقيق"
                                        name="major"
                                        value={formData.major || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="حالة التفعيل (مثال: مفعل / غير مفعل)"
                                        name="status"
                                        value={formData.status || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="البريد الإلكتروني"
                                        name="email"
                                        type="email"
                                        value={formData.email || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="رقم الهاتف"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="عدد الطلاب الحاليين"
                                        name="currentStudents"
                                        type="number"
                                        value={formData.currentStudents || 0}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </>
                        )}
                        
                        {/* ----------------- حقول جهات التدريب ----------------- */}
                        {userType === 'provider' && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="اسم المشرف الميداني"
                                        name="supervisor"
                                        value={formData.supervisor || ''}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="التخصصات المدعومة (بالفواصل)"
                                        name="supportedMajors"
                                        value={formData.supportedMajors || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="رقم التواصل"
                                        name="contact"
                                        type="tel"
                                        value={formData.contact || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="الموقع الإلكتروني"
                                        name="website"
                                        value={formData.website || ''}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="عدد الطلاب الحاليين"
                                        name="currentStudents"
                                        type="number"
                                        value={formData.currentStudents || 0}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </>
                        )}

                        {/* ----------------- أزرار الإرسال والإلغاء ----------------- */}
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="success" 
                                    sx={{ minWidth: 150, py: 1.5 }}
                                >
                                    حفظ التعديلات
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    onClick={() => navigate('/manage-users')}
                                    sx={{ minWidth: 150, py: 1.5 }}
                                >
                                    إلغاء والعودة
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            {/* نافذة الإشعارات (Snackbar) */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </Container>
    );}