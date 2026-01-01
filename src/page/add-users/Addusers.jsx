import React, { useEffect } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Stack,
  Button,
  Paper, 
  Typography,
  useTheme
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload'; 
import { useForm } from "react-hook-form"
import { useSearchParams, useNavigate } from 'react-router-dom'; // ⬅️ إضافة useNavigate
import { useUsers } from '../UserContext'; // ⬅️ افتراض استيراد Context

// ------------------------------------------------------------------
// 📚 بيانات افتراضية للحقول الجديدة (College, Major, Supervisor)
// ------------------------------------------------------------------
const collegeOptions = [
    { value: 'الحاسبات', label: 'كلية الحاسبات' },
    { value: 'الهندسة', label: 'كلية الهندسة' },
    { value: 'الطب', label: 'كلية الطب' },
    { value: 'التجارة', label: 'كلية التجارة والاقتصاد' },
    { value: 'الآداب', label: 'كلية الآداب' },
];

const majorOptions = [
    { value: 'نظم معلومات', label: 'نظم معلومات' },
    { value: 'علوم حاسوب', label: 'علوم حاسوب' },
    { value: 'شبكات', label: 'شبكات' },
    { value: 'طب بشري', label: 'طب بشري' },
    { value: 'هندسة مدنية', label: 'هندسة مدنية' },
];

const supervisorOptions = [
    { value: 'محمد الدويل', label: 'محمد الدويل (حاسبات)' },
    { value: 'بلال الفهيدي', label: 'بلال الفهيدي (هندسة)' },
];


// تعاريف التعبيرات النمطية
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const data = [
  { value: 'طالب', label: 'طالب ' },
  { value: 'مشرف ', label: 'مشرف اكاديمي ' },
  { value: 'جهة', label: 'جهة تدريب ' },
];

// خاصية لضمان محاذاة النص لليمين داخل جميع حقول TextField
const alignInputProps = {
  inputProps: {
    style: {
      textAlign: 'right', 
    },
  },
};

export default function Addusers() {
  const theme = useTheme();
    const navigate = useNavigate(); // ⬅️ لاستخدام التوجيه بعد الإضافة
    const { addUser } = useUsers(); // ⬅️ لاستخدام دالة الإضافة من السياق

  // 🚀 تهيئة React Hook Form
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
  
  // مشاهدة قيمة حقل نوع المستخدم (لتحديد الحقول الظاهرة)
  const userType = watch("userType"); 
  
  // 🚀 قراءة نوع المستخدم من URL
  const [searchParams] = useSearchParams();
  const urlUserType = searchParams.get('type'); 

  useEffect(() => {
    if (urlUserType) {
      if (urlUserType === 'supervisor') {
        setValue("userType", 'مشرف ');
      } else if (urlUserType === 'provider') {
        setValue("userType", 'جهة');
      } else if (urlUserType === 'student') {
        setValue("userType", 'طالب');
      }
    }
  }, [urlUserType, setValue]);

  // شروط عرض الحقول بناءً على نوع المستخدم
  const isTrainingProvider = userType === 'جهة';
  const isAcademicUser = userType === 'طالب' || userType === 'مشرف ';

  // 💡 دالة لمعالجة إضافة مستخدم فردي (تم التعديل هنا)
    const onSubmit = (data) => {
        const typeKey = data.userType === 'مشرف ' ? 'supervisor' : 
                        data.userType === 'جهة' ? 'provider' : 'student';

        // 💡 إعداد البيانات بالصيغة المتوقعة في الجداول
        const payload = {
            name: data.userType === 'جهة' ? data.organizationName : data.firstName + ' ' + data.lastName,
            email: data.email,
            
            // حقول المشرف/الطالب
            college: data.college || null, 
            major: data.major || null, 
            academicID: data.academicID || null,
            
            // حقول جهة التدريب
            supervisor: data.supervisor || null, 
            supportedMajors: data.supportedMajors || null,
            contact: data.contact || null,
            
            // حقول افتراضية للجداول
            currentStudents: 0, 
            status: data.userType === 'جهة' ? 'نشط' : 'نشط',   
        };
        
        const success = addUser(payload, typeKey); 
        
        if (success) {
            alert(`تمت إضافة ${data.userType} جديد بنجاح!`);
            // ✨ التوجيه لصفحة إدارة المستخدمين لرؤية الإضافة
            navigate('/manage-users'); 
        } else {
            console.error('فشل الإضافة');
        }
    };
  
  // 💡 دالة معالجة تحميل ملف الإكسل/CSV
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log(`تم اختيار الملف: ${file.name}.`);
    // ... (منطق قراءة XLSX)
  };

  return (
  <Paper 
    elevation={3} 
    sx={{ 
      maxWidth: '800px', 
      margin: '20px auto', 
      padding: 3, 
      direction: 'ltr' 
    }}
  >
    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main, }}>
      إضافة مستخدم جديد
    </Typography>

    {/* 🚀 قسم الاستيراد من إكسل */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
      <input 
        accept=".xlsx, .xls, .csv" 
        style={{ display: 'none' }} 
        id="excel-upload-button" 
        type="file" 
        onChange={handleFileUpload}
      />
      <label htmlFor="excel-upload-button">
        <Button 
          variant="contained" 
          component="span" 
          startIcon={<FileUploadIcon />}
          sx={{ 
            backgroundColor: theme.palette.success.main, 
            '&:hover': { backgroundColor: theme.palette.success.dark },
            direction: 'rtl' 
          }}
        >
          استيراد مستخدمين من إكسل
        </Button>
      </label>
    </Box>
    
    <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary , direction: 'ltr' }}>
      أو إضافة مستخدم بشكل فردي:
    </Typography>
    
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      dir="rtl" 
      sx={{ 
        display:"flex", 
        flexDirection: "column", 
        gap: 3, 
      }}
      noValidate
      autoComplete="off"
    >
            {/* 5. حقل نوع المستخدم */}
    <TextField
      // ... تنسيقات Select
            sx={{ 
        '& .MuiSelect-select': { 
          textAlign: 'left', 
          paddingRight: '14px !important', 
          paddingLeft: '32px !important' 
        },
        '& .MuiInputBase-input': {
          textAlign: 'left',
        }
      }}
      variant="outlined"
      select
      label="نوع المستخدم"
      error={Boolean(errors.userType)}
      helperText={Boolean(errors.userType) && 'الرجاء اختيار نوع المستخدم'}
      {...register("userType", { required: true })}
      SelectProps={{
        MenuProps: { dir: "rtl" }, 
      }}
    >
      <MenuItem value="">-- اختر نوع المستخدم --</MenuItem>
      {data.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>

    {/* 1. حقلي الاسم الاول و الاخير (للمشرف والطالب) */}
    {!isTrainingProvider && (
            <Stack 
                sx={{gap: 3}} 
                direction={{ xs: 'column', sm: 'row' }} 
            > 
            
                <TextField 
                    sx={{flex: 1}} 
                    {...alignInputProps}
                    label="الاسم الاول" 
                    variant="outlined" 
                    error={Boolean(errors.firstName)} 
                    helperText={Boolean(errors.firstName) && 'الحقل مطلوب، حد أدنى 2 أحرف'}
                    {...register("firstName", { required: !isTrainingProvider, minLength: 2 })}
                />

                <TextField 
                    sx={{flex: 1}} 
                    {...alignInputProps}
                    label="الاسم الاخير" 
                    variant="outlined" 
                    error={Boolean(errors.lastName)} 
                    helperText={Boolean(errors.lastName) && 'الحقل مطلوب، حد أدنى 3 أحرف'}
                    {...register("lastName", { required: !isTrainingProvider, minLength: 3 })}
                />
            </Stack>
        )}

    {/* 2. حقل اسم الجهة (لجهة التدريب فقط) */}
    {isTrainingProvider && (
      <TextField 
        {...alignInputProps}
        label="اسم الجهة" 
        variant="outlined" 
        error={Boolean(errors.organizationName)} 
        helperText={Boolean(errors.organizationName) && 'الحقل مطلوب، حد أدنى 3 أحرف'}
        {...register("organizationName", { required: isTrainingProvider, minLength: 3 })}
      />
    )}
    
    {/* 3. حقل الرقم الاكاديمي/هوية */}
    {isAcademicUser && (
      <TextField 
        {...alignInputProps}
        label={userType === 'طالب' ? "الرقم الاكاديمي" : "رقم الهوية/الموظف"} 
        variant="outlined" 
        error={Boolean(errors.academicID)} 
        helperText={Boolean(errors.academicID) && 'الرجاء إدخال رقم صحيح لا يقل عن 12 رقم'}
        {...register("academicID", { required: isAcademicUser, minLength: 12 })}
      />
    )}

    {/* 4. حقل الايميل */}
    <TextField 
      {...alignInputProps} 
      label="الايميل" 
      variant="outlined" 
      error={Boolean(errors.email)} 
      helperText={Boolean(errors.email) && 'الرجاء ادخال الايميل بشكل صحيح'}
      {...register("email", { required: true, pattern: regEmail})}
    />
        

        
        {/* -------------------------------------------------- */}
        {/* 📚 الحقول الجديدة الخاصة ببيانات الجداول */}
        {/* -------------------------------------------------- */}

        {/* 6. حقل الكلية/القسم (للمشرف والطالب) */}
        {isAcademicUser && (
            <TextField
                sx={{ 
                    // ... تنسيقات Select
                }}
                variant="outlined"
                select
                label="الكلية/القسم التابع"
                error={Boolean(errors.college)}
                helperText={Boolean(errors.college) && 'الرجاء اختيار الكلية التابع لها المستخدم'}
                {...register("college", { required: isAcademicUser })} 
                SelectProps={{ MenuProps: { dir: "rtl" } }}
            >
                <MenuItem value="">-- اختر الكلية --</MenuItem>
                {collegeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )}

        {/* 7. حقل التخصص (للطالب والمشرف) */}
        {isAcademicUser && (
            <TextField
                sx={{ 
                    // ... تنسيقات Select
                }}
                variant="outlined"
                select
                label="التخصص الرئيسي"
                error={Boolean(errors.major)}
                helperText={Boolean(errors.major) && 'الرجاء اختيار التخصص'}
                {...register("major", { required: isAcademicUser })} 
                SelectProps={{ MenuProps: { dir: "rtl" } }}
            >
                <MenuItem value="">-- اختر التخصص --</MenuItem>
                {majorOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )}

        {/* 8. حقل المشرف الميداني (لجهة التدريب) */}
        {isTrainingProvider && (
            <TextField
                sx={{ 
                    // ... تنسيقات Select
                }}
                variant="outlined"
                select
                label="المشرف الميداني المسؤول"
                error={Boolean(errors.supervisor)}
                helperText={Boolean(errors.supervisor) && 'الرجاء اختيار المشرف الميداني'}
                {...register("supervisor", { required: isTrainingProvider })}
                SelectProps={{ MenuProps: { dir: "rtl" } }}
            >
                <MenuItem value="">-- اختر مشرفاً --</MenuItem>
                {supervisorOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        )}

        {/* 9. حقل التخصصات المدعومة ورقم التواصل (لجهة التدريب) */}
        {isTrainingProvider && (
            <Stack sx={{ gap: 3 }} direction={{ xs: 'column', sm: 'row' }}>
                <TextField 
                    sx={{ flex: 1 }}
                    {...alignInputProps}
                    label="التخصصات المدعومة (افصل بفاصلة)" 
                    variant="outlined" 
                    error={Boolean(errors.supportedMajors)} 
                    helperText={Boolean(errors.supportedMajors) && 'الرجاء تحديد التخصصات المدعومة'}
                    {...register("supportedMajors", { required: isTrainingProvider, minLength: 5 })}
                />
                <TextField 
                    sx={{ flex: 1 }} 
                    {...alignInputProps}
                    label="رقم التواصل لجهة التدريب" 
                    variant="outlined" 
                    error={Boolean(errors.contact)} 
                    helperText={Boolean(errors.contact) && 'الرجاء إدخال رقم هاتف صحيح'}
                    {...register("contact", { required: isTrainingProvider, minLength: 9 })}
                />
            </Stack>
        )}
        
        {/* 10. الأزرار: محاذاة لليمين (flex-end) */}
    <Box sx={{ width: '100%', mt: 2 }}>
      <Stack spacing={2} direction="row" justifyContent="flex-end">
        <Button variant="outlined" onClick={() => navigate('/manage-users')}>إلغاء</Button>
        <Button type="submit" variant="contained">إضافة</Button>
      </Stack>
    </Box>

    </Box>
  </Paper> 
  );
}