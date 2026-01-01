import React, { useState } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Button,
    Grid,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    Tooltip,
    Alert,
    Checkbox,
    FormControlLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
} from '@mui/material';

// استيراد أيقونات MUI
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GavelIcon from '@mui/icons-material/Gavel';

// -------------------------------------------------------------------
// 1. مكون فرعي: إدارة نماذج التقييم (EvaluationFormsManagement)
// -------------------------------------------------------------------
const EvaluationFormsManagement = () => {
    // 🌟 بيانات النماذج الرئيسية
    const [forms, setForms] = useState([
        { id: 1, name: 'نموذج تقييم الطالب النهائي', criteriaCount: 15, isActive: true, target: 'الطلاب' },
        { id: 2, name: 'تقييم المشرف الأكاديمي', criteriaCount: 8, isActive: false, target: 'الجهات' },
        { id: 3, name: 'تقييم الجهة التدريبية', criteriaCount: 12, isActive: true, target: 'الطلاب' },
    ]);
    const [message, setMessage] = useState(null); 

    // حالات النوافذ المنبثقة والبيانات
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); 
    const [formToDelete, setFormToDelete] = useState(null); 
    const [openFormModal, setOpenFormModal] = useState(false); // لإضافة/تعديل
    const [currentForm, setCurrentForm] = useState(null); // النموذج الحالي للتعديل/المشاهدة
    const [openViewDialog, setOpenViewDialog] = useState(false); // للعرض/تعديل المعايير

    // حالة مؤقتة لربط حقول الإدخال للنموذج
    const [formInput, setFormInput] = useState({ name: '', criteriaCount: 0, target: 'الطلاب' });

    // حالة لإدارة القائمة المنسدلة (Menu)
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    // 🌟🌟 حالات إدارة المعايير 🌟🌟
    const [criteriaList, setCriteriaList] = useState([]); // قائمة المعايير التي يتم عرضها في النافذة المنبثقة
    const [newCriterionText, setNewCriterionText] = useState(''); // نص المعيار الجديد
    // مخزن مؤقت (محاكاة قاعدة بيانات) لجميع المعايير لكل النماذج
    const [allCriteria, setAllCriteria] = useState({
        1: ['جودة الأداء في المهام الموكلة.', 'الالتزام بالمواعيد والدوام.', 'التفاعل والعمل الجماعي.'],
        2: ['تقييم الأداء المكتبي', 'تقييم الحضور والانصراف'],
        3: ['تقييم مستوى التعلم', 'تقييم الابتكار والإبداع', 'تقييم القدرة على حل المشكلات'],
    });
    
    // دالة تبديل الحالة
    const handleToggleActive = (id) => {
        setForms(forms.map(form => 
            form.id === id ? { ...form, isActive: !form.isActive } : form
        ));
        setMessage({ severity: 'success', text: `تم تحديث حالة النموذج بنجاح.` });
    };

    // 🌟🌟 دوال فتح النوافذ المنبثقة 🌟🌟

    // فتح قائمة الإجراءات
    const handleOpenMenu = (event, form) => {
        setAnchorEl(event.currentTarget);
        setCurrentForm(form);
    };

    // إغلاق قائمة الإجراءات
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // فتح نافذة الإضافة
    const handleAdd = () => {
        setCurrentForm(null); 
        setFormInput({ name: '', criteriaCount: 0, target: 'الطلاب' });
        setOpenFormModal(true);
        handleCloseMenu();
    };

    // فتح نافذة التعديل
    const handleEdit = (form) => {
        const formToEdit = form || currentForm;
        if (!formToEdit) return;
        setCurrentForm(formToEdit); 
        setFormInput({ 
            name: formToEdit.name, 
            criteriaCount: formToEdit.criteriaCount, 
            target: formToEdit.target 
        });
        setOpenFormModal(true);
        handleCloseMenu();
    };

    // فتح نافذة العرض وتعديل المعايير
    const handleView = (form) => {
        const formToView = form || currentForm;
        if (!formToView) return;
        setCurrentForm(formToView); 
        // تحميل المعايير من المخزن المؤقت بناءً على Form ID
        setCriteriaList(allCriteria[formToView.id] || []);
        setOpenViewDialog(true);
        handleCloseMenu();
    };

    // فتح نافذة تأكيد الحذف
    const confirmDelete = (form) => {
        const formToDeleteNow = form || currentForm;
        if (!formToDeleteNow) return;
        setFormToDelete(formToDeleteNow);
        setOpenDeleteDialog(true);
        handleCloseMenu();
    };

    // دالة الحذف الفعلية
    const handleDelete = () => {
        if (formToDelete) {
            setForms(forms.filter(form => form.id !== formToDelete.id));
            setMessage({ severity: 'error', text: `تم حذف النموذج: ${formToDelete.name} بشكل دائم.` });
            
            // إزالة المعايير من المخزن المؤقت أيضاً
            const newAllCriteria = { ...allCriteria };
            delete newAllCriteria[formToDelete.id];
            setAllCriteria(newAllCriteria);
        }
        setOpenDeleteDialog(false);
        setFormToDelete(null);
    };
    
    // دالة محاكاة الحفظ (للتعديل والإضافة)
    const handleSaveForm = () => {
        if (!formInput.name.trim()) {
            setMessage({ severity: 'error', text: 'الرجاء إدخال اسم النموذج.' });
            return;
        }

        if (currentForm) {
            // وضع التعديل: تحديث النموذج الحالي
            setForms(forms.map(form => 
                form.id === currentForm.id ? { ...form, ...formInput } : form
            ));
            setMessage({ severity: 'success', text: `تم حفظ تعديلات النموذج: ${formInput.name} بنجاح.` });
        } else {
            // وضع الإضافة: إضافة نموذج جديد
            const newId = (Math.max(...forms.map(f => f.id)) || 0) + 1;
            const newForm = {
                id: newId,
                name: formInput.name.trim(),
                criteriaCount: parseInt(formInput.criteriaCount) || 0,
                isActive: true,
                target: formInput.target,
            };

            setForms([...forms, newForm]);
            
            // تهيئة المعايير الجديدة في المخزن المؤقت
            setAllCriteria(prev => ({
                ...prev,
                [newId]: []
            }));

            setMessage({ severity: 'success', text: `تمت إضافة نموذج جديد: ${newForm.name} بنجاح.` });
        }
        
        setOpenFormModal(false);
        setCurrentForm(null);
    };

    // 🌟🌟 دالة إضافة معيار جديد (مُصححة) 🌟🌟
    const handleAddCriterion = () => {
        if (!currentForm) return;

        if (newCriterionText.trim() === '') {
            setMessage({ severity: 'warning', text: 'الرجاء إدخال نص المعيار الجديد.' });
            return;
        }
        const newCriteria = [...criteriaList, newCriterionText.trim()];
        
        // 1. تحديث قائمة العرض الفورية
        setCriteriaList(newCriteria);
        setNewCriterionText('');
        
        // 2. تحديث المخزن المؤقت للبيانات (قاعدة البيانات المحاكية)
        const updatedAllCriteria = {
            ...allCriteria,
            [currentForm.id]: newCriteria
        };
        setAllCriteria(updatedAllCriteria);

        // 3. تحديث عدد المعايير في الجدول الرئيسي (Update forms state)
        setForms(forms.map(form => 
            form.id === currentForm.id ? { ...form, criteriaCount: newCriteria.length } : form
        ));
        
        setMessage({ severity: 'success', text: 'تمت إضافة المعيار بنجاح وتم تحديث العدد في الجدول.' });
    };

    // 🌟🌟 دالة حذف معيار (مُصححة) 🌟🌟
    const handleDeleteCriterion = (indexToDelete) => {
        if (!currentForm) return;
        
        const updatedList = criteriaList.filter((_, i) => i !== indexToDelete);
        
        // 1. تحديث قائمة العرض الفورية
        setCriteriaList(updatedList);

        // 2. تحديث المخزن المؤقت للبيانات (قاعدة البيانات المحاكية)
        const updatedAllCriteria = {
            ...allCriteria,
            [currentForm.id]: updatedList
        };
        setAllCriteria(updatedAllCriteria);

        // 3. تحديث عدد المعايير في الجدول الرئيسي (Update forms state)
        setForms(forms.map(form => 
            form.id === currentForm.id ? { ...form, criteriaCount: updatedList.length } : form
        ));

        setMessage({ severity: 'error', text: 'تم حذف المعيار بنجاح وتم تحديث العدد في الجدول.' });
    };

    return (
        <Box sx={{ p: 3, pt: 1, direction: 'center' }}>
            {/* رسالة التفاعل */}
            {message && (
                <Alert 
                    severity={message.severity} 
                    onClose={() => setMessage(null)} 
                    sx={{ mb: 3, textAlign: 'right' }}
                >
                    {message.text}
                </Alert>
            )}

            {/* العنوان وزر الإضافة */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} pb={2} borderBottom="1px solid #eee" >
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main',  direction: "ltr" }}>
                    إدارة نماذج التقييم الحالية
                    
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />} 
                    size="large"
                    sx={{ borderRadius: '24px', fontWeight: 'bold', minWidth: '150px' , direction: "ltr" }}
                    onClick={handleAdd}
                >
                    إضافة نموذج جديد
                </Button>
            </Box>

            {/* جدول النماذج */}
            <TableContainer component={Paper} elevation={6} sx={{ borderRadius: '12px', direction: 'ltr' }}>
                <Table sx={{ minWidth: 650 }} aria-label="Evaluation Forms">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">اسم النموذج</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', display: { xs: 'none', md: 'table-cell' } }}>عدد المعايير</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الحالة</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>الإجراءات</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {forms.map((form) => (
                            <TableRow key={form.id} hover>
                                <TableCell component="th" scope="row" align="right">{form.name}</TableCell>
                                <TableCell align="center" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{form.criteriaCount}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title={form.isActive ? "النموذج مفعل" : "النموذج غير مفعل"}>
                                        <Switch
                                            checked={form.isActive}
                                            onChange={() => handleToggleActive(form.id)}
                                            color={form.isActive ? "success" : "error"}
                                            inputProps={{ 'aria-label': 'toggle active status' }}
                                        />
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="center">
                                    {/* 🌟 زر فتح القائمة المنسدلة 🌟 */}
                                    <Tooltip title="الإجراءات">
                                        <IconButton
                                            aria-label="more"
                                            aria-controls={`actions-menu-${form.id}`}
                                            aria-haspopup="true"
                                            onClick={(event) => handleOpenMenu(event, form)}
                                            size="small"
                                            color="primary"
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* 🌟 قائمة الإجراءات المنسدلة (Menu) 🌟 */}
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
                MenuListProps={{ 'aria-labelledby': 'actions-button' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem onClick={() => handleEdit()} sx={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', minWidth: 150 }}>
                    تعديل النموذج 
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                </MenuItem>
                <MenuItem onClick={() => handleView()} sx={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
                    تعديل المعايير
                    <GavelIcon fontSize="small" sx={{ mr: 1 }} />
                </MenuItem>
                <MenuItem onClick={() => confirmDelete()} sx={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', color: 'error.main' }}>
                    حذف النموذج
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                </MenuItem>
            </Menu>


            {/* 🌟 نافذة تأكيد الحذف */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                dir="ltr" 
            >
                <DialogTitle sx={{ color: 'error.main', fontWeight: 'bold', textAlign: 'center' }}>
                    {"تأكيد الحذف"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ textAlign: 'center' }}>
                        هل أنت متأكد من رغبتك في حذف النموذج بشكل دائم: 
                        <Typography component="span" fontWeight="bold" color="text.primary" sx={{ mx: 0.5 }}>
                            {formToDelete?.name}
                        </Typography>
                       هذا الإجراء لا يمكن التراجع عنه؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ direction: 'ltr' }}>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary" variant="outlined">
                        إلغاء
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained" startIcon={<DeleteIcon />} autoFocus>
                        حذف نهائي
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 🌟 نافذة الإضافة/التعديل */}
            <Dialog
                open={openFormModal}
                onClose={() => setOpenFormModal(false)}
                maxWidth="sm"
                fullWidth
                dir="rtl"
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    {currentForm ? `تعديل النموذج: ${currentForm?.name}` : "إضافة نموذج تقييم جديد"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                        <Grid item xs={12}>
                             <TextField
                                label="اسم النموذج"
                                value={formInput.name}
                                onChange={(e) => setFormInput({...formInput, name: e.target.value})}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="عدد المعايير (مبدئيًا)"
                                value={formInput.criteriaCount}
                                onChange={(e) => setFormInput({...formInput, criteriaCount: e.target.value})}
                                fullWidth
                                margin="normal"
                                type="number"
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="target-label">الجمهور المستهدف</InputLabel>
                                <Select
                                    labelId="target-label"
                                    label="الجمهور المستهدف"
                                    value={formInput.target}
                                    onChange={(e) => setFormInput({...formInput, target: e.target.value})}
                                    variant="outlined"
                                >
                                    <MenuItem value="الطلاب">الطلاب</MenuItem>
                                    <MenuItem value="الجهات">الجهات التدريبية</MenuItem>
                                    <MenuItem value="المشرفون">المشرفون</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ direction: 'ltr' }}>
                    <Button onClick={() => setOpenFormModal(false)} variant="outlined">إلغاء</Button>
                    <Button onClick={handleSaveForm} variant="contained" color="success" startIcon={<SaveIcon />}>
                        {currentForm ? "حفظ التعديلات" : "إضافة النموذج"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* 🌟 نافذة العرض وتعديل المعايير (View/Edit Criteria Dialog) 🌟 */}
            <Dialog
                open={openViewDialog}
                onClose={() => setOpenViewDialog(false)}
                maxWidth="md"
                fullWidth
                dir="rtl"
            >
                <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    عرض وتعديل معايير النموذج: {currentForm?.name}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}>
                        **الجمهور المستهدف:** {currentForm?.target || 'غير محدد'}
                    </Typography>
                    
                    {/* 🚨 قسم إضافة معيار جديد */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 3, p: 2, border: '1px solid #eee', borderRadius: '8px', direction: "ltr" }}>
                       
                        <TextField
                            label="نص المعيار الجديد"
                            fullWidth
                            size="small"
                            value={newCriterionText}
                            onChange={(e) => setNewCriterionText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAddCriterion();
                                }
                            }}
                            variant="outlined"
                        />
                         <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleAddCriterion} 
                            startIcon={<AddIcon />}
                            sx={{ minWidth: '150px' }}
                        >
                            إضافة معيار
                        </Button>
                    </Box>

                    {/* جدول المعايير */}
                    <TableContainer component={Paper} elevation={1}  >
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold', width: '50px' }} align="center">#</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }} align="center">وصف المعيار</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', width: '100px' }} align="center">حذف</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {criteriaList.length > 0 ? criteriaList.map((criterion, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{criterion}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="حذف المعيار">
                                                <DeleteIcon 
                                                    color="error" 
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={() => handleDeleteCriterion(index)}
                                                />
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">لا توجد معايير لهذا النموذج حالياً.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Alert severity="warning" sx={{ mt: 2, textAlign: 'right' }}>
                        ملاحظة: عند الإغلاق، يتم حفظ التغييرات على المعايير في الذاكرة المؤقتة. **تم تحديث عدد المعايير في الجدول الرئيسي بشكل فوري.**
                    </Alert>
                </DialogContent>
                <DialogActions sx={{ direction: 'ltr' }}>
                    <Button onClick={() => setOpenViewDialog(false)} variant="contained" color="primary">
                        إغلاق
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

// -------------------------------------------------------------------
// 2. مكون فرعي: إدارة الأدوار والصلاحيات (RolesAndPermissions)
// -------------------------------------------------------------------
const RolesAndPermissions = () => {
    return (
        <Box sx={{ p: 3, pt: 1, direction: 'ltr' }}>
             <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main', pb: 2, mb: 2, borderBottom: '1px solid #eee' }}>
                 إدارة الأدوار والصلاحيات
                
            </Typography>

             <Alert severity="info" sx={{ mb: 4, bgcolor: '#e3f2fd', color: '#1565c0', textAlign: 'right' }}>
                 حدد الصلاحيات المطلوبة لكل دور في النظام. تتحكم الصلاحيات في واجهة المستخدم والوصول إلى البيانات.
             </Alert>

             <Grid container spacing={3}>
                 {/* الصلاحية 1 */}
                 <Grid item xs={12} md={6}>
                     <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'left' }}>
                         <Typography variant="h6" fontWeight="bold" color="text.primary" mb={1} borderBottom="1px solid #eee">
                             إدارة المستخدمين
                         </Typography>
                         <Typography variant="body2" color="text.secondary" mb={2}>
                             يشمل إضافة وتعديل وحذف حسابات المشرفين والجهات.
                         </Typography>
                         
                         <Grid container spacing={2} justifyContent="flex-end">
                             <Grid item>
                                 <FormControlLabel
                                     control={<Checkbox defaultChecked color="primary" />}
                                     label="المسؤول (Admin)"
                                     labelPlacement="end" 
                                 />
                             </Grid>
                             <Grid item>
                                 <FormControlLabel
                                     control={<Checkbox color="primary" />}
                                     label="المشرفون"
                                     labelPlacement="end"
                                 />
                             </Grid>
                             <Grid item>
                                 <FormControlLabel
                                     control={<Checkbox disabled />}
                                     label="الطلاب (قراءة فقط)"
                                     labelPlacement="end"
                                 />
                             </Grid>
                         </Grid>
                     </Paper>
                 </Grid>

                 {/* الصلاحية 2 */}
                 <Grid item xs={12} md={6}>
                     <Paper elevation={3} sx={{ p: 3, borderRadius: '12px', textAlign: 'left' }}>
                         <Typography variant="h6" fontWeight="bold" color="text.primary" mb={1} borderBottom="1px solid #eee">
                             تحديث الإعدادات العامة
                         </Typography>
                         <Typography variant="body2" color="text.secondary" mb={2}>
                             تعديل اسم النظام والحد الأقصى لعدد المهام الموكلة.
                         </Typography>
                         
                         <Grid container spacing={2} justifyContent="flex-end">
                             <Grid item>
                                 <FormControlLabel
                                     control={<Checkbox defaultChecked color="primary" />}
                                     label="المسؤول (Admin)"
                                     labelPlacement="end"
                                 />
                             </Grid>
                             <Grid item>
                                 <FormControlLabel
                                     control={<Checkbox disabled />}
                                     label="المشرفون"
                                     labelPlacement="end"
                                 />
                             </Grid>
                         </Grid>
                     </Paper>
                 </Grid>
             </Grid>

             <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                 <Button
                     variant="contained"
                     color="success"
                     startIcon={<SaveIcon />}
                     size="large"
                     sx={{ mt: 4, borderRadius: '24px', fontWeight: 'bold', minWidth: '200px' }}
                 >
                     حفظ الصلاحيات
                 </Button>
             </Box>
        </Box>
    );
};

// -------------------------------------------------------------------
// 3. مكون فرعي: الإعدادات العامة (GeneralSettings)
// -------------------------------------------------------------------
const GeneralSettings = () => {
    return (
        <Box sx={{ p: 3, pt: 1, direction: 'ltr' }}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', color: 'primary.main', pb: 2, mb: 4, borderBottom: '1px solid #eee' }}>
                إعدادات النظام الأساسية
                
            </Typography>

            <Paper elevation={3} sx={{ p: 4, borderRadius: '12px', maxWidth: 600, textAlign: 'left' }}>
                <Grid container spacing={3} direction="column">
                    {/* اسم النظام */}
                    <Grid item>
                        <TextField
                            fullWidth
                            label="الاسم الرئيسي للنظام"
                            defaultValue="نظام متابعة التدريب التعاوني"
                            variant="outlined"
                            size="medium"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* الحد الأقصى للطلاب */}
                    <Grid item>
                        <TextField
                            fullWidth
                            label="الحد الأقصى للطلاب لكل مشرف"
                            defaultValue={20}
                            type="number"
                            variant="outlined"
                            size="medium"
                            InputProps={{ inputProps: { min: 1 } }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* لغة الواجهة */}
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="language-label">لغة الواجهة الافتراضية</InputLabel>
                            <Select
                                labelId="language-label"
                                defaultValue="ar" 
                                label="لغة الواجهة الافتراضية"
                                variant="outlined"
                                size="medium"
                            >
                                <MenuItem value="ar">العربية (Arabic)</MenuItem>
                                <MenuItem value="en">الإنجليزية (English)</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<SaveIcon />}
                        size="large"
                        sx={{ mt: 4, borderRadius: '24px', fontWeight: 'bold', minWidth: '200px' }}
                    >
                        حفظ الإعدادات العامة
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

// -------------------------------------------------------------------
// 4. المكون الرئيسي: Settings (جامع التبويبات)
// -------------------------------------------------------------------
function Settings() {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabsData = [
        { label: 'نماذج ومعايير التقييم', icon: <ListAltIcon />, component: <EvaluationFormsManagement /> },
        { label: 'الأدوار والصلاحيات', icon: <PeopleIcon />, component: <RolesAndPermissions /> },
        { label: 'الإعدادات العامة', icon: <SettingsIcon />, component: <GeneralSettings /> },
        { label: 'إعدادات الإشعارات', icon: <NotificationsIcon />, component: 
            <Box sx={{ p: 3, pt: 1, direction: 'ltr', textAlign: 'center' }}>
                <Typography variant="h5" sx={{mb: 3}}>محتوى إعدادات الإشعارات...</Typography>
                <Alert severity="success" >
                    هذا التبويب جاهز للتطبيق!
                </Alert>
            </Box> 
        },
    ];

    return (
        <Paper elevation={4} sx={{ maxWidth: 1200, margin: '24px auto', borderRadius: '16px', overflow: 'hidden', direction: 'ltr' }}>
            {/* العنوان الرئيسي */}
            <Box sx={{ p: 4, bgcolor: 'primary.dark', color: 'white', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', textAlign: 'center' }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold',  textAlign: 'right', display: 'flex', lexDirection: 'row-reverse'}}>
                    الإعدادات الإدارية للنظام
                    
                </Typography>
            </Box>

            {/* شريط التبويبات (Tabs) */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#f5f5f5' }}>
                <Tabs 
                    value={activeTab} 
                    onChange={handleChange} 
                    indicatorColor="primary" 
                    textColor="primary" 
                    variant="scrollable" 
                    aria-label="Settings Tabs"
                    TabIndicatorProps={{ sx: { left: 0, right: 'auto' } }} 
                >
                    {tabsData.map((tab, index) => (
                        <Tab 
                            key={index} 
                            label={tab.label} 
                            icon={tab.icon} 
                            iconPosition="start" 
                            sx={{ fontWeight: 'bold', fontSize: '1rem', minWidth: 'auto', px: 3 }}
                        />
                    ))}
                </Tabs>
            </Box>

            {/* محتوى التبويب المختار */}
            <Box sx={{ p: 2 }}>
                {tabsData[activeTab] && (
                    <Box role="tabpanel">
                        {tabsData[activeTab].component}
                    </Box>
                )}
            </Box>
        </Paper>
    );
}

// تصدير المكون الرئيسي
export default Settings;