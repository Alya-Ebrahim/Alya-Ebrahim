import React, { useState, useMemo, useCallback } from 'react'; 
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; 
import { 
  Typography, 
  Button, 
  Paper, 
  Container, 
  useTheme, 
  Stack,
  Tooltip,
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom'; 

// 💡 استيراد Hook إدارة الحالة
import { useUsers } from '../UserContext.jsx'; 

// ------------------------------------------------------------------

export default function Manageusers() {
  const theme = useTheme();
  const navigate = useNavigate(); 
    
    // 💡 استخدام Context للحصول على البيانات ودالة الحذف
  const { supervisors, trainingProviders, deleteUser, findUser } = useUsers();

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); 

  // ------------------------------------------------------------------
  // دوال الإجراءات
  
  const handleView = useCallback((item) => { 
    // يجب العثور على العنصر الكامل من الـ Context قبل عرضه في حالة لم يتم تخزين كل البيانات في row
    const type = item.major ? 'supervisor' : 'provider'; // تحديد نوع البيانات
    const fullItem = findUser(item.id, type);
    setSelectedItem(fullItem);
    setOpenDetailsDialog(true);
  }, [findUser]);

  const handleCloseDetailsDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedItem(null);
  };

  const handleEdit = useCallback((id, type) => {
    // التوجيه لصفحة تعديل (edit-users)
    navigate(`/edit-users?id=${id}&type=${type}`); 
  }, [navigate]);

  const handleDelete = useCallback((id, type) => {
    if (window.confirm(`هل أنت متأكد من حذف السجل رقم ${id} نهائياً؟`)) {
            // 💡 استخدام دالة Context للحذف
      deleteUser(id, type); 
      alert(`تم حذف السجل رقم ${id}.`);
    }
  }, [deleteUser]);
  
  const handleAddUser = (type) => {
    navigate(`/add-users?type=${type}`); 
  };
  // ------------------------------------------------------------------

    // 🚀 تعريف أعمدة المشرفين (Supervisor Columns)
    const supervisorColumns = useMemo(() => {
        const type = 'supervisor'; 
        return [
            { field: 'name', headerName: 'اسم المشرف', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { field: 'college', headerName: 'الكلية', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' }, 
            { field: 'major', headerName: 'التخصص', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { field: 'currentStudents', headerName: 'عدد الطلاب الحاليين', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { field: 'status', headerName: 'حالة التفعيل', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { 
                field: 'actions', 
                type: 'actions', 
                headerName: 'الإجراءات',
                width: 140, 
                align: 'center', 
                headerAlign: 'center',
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<Tooltip title="عرض التفاصيل"><VisibilityIcon color="primary" /></Tooltip>}
                        label="عرض التفاصيل"
                        onClick={() => handleView(params.row)} 
                    />
                    ,
                    <GridActionsCellItem
                        icon={<Tooltip title="تعديل"><EditIcon color="success" /></Tooltip>} 
                        label="تعديل"
                        onClick={() => handleEdit(params.id, type)} 
                    />
                    ,
                    <GridActionsCellItem
                        icon={<Tooltip title="حذف"><DeleteIcon color="error" /></Tooltip>}
                        label="حذف"
                        onClick={() => handleDelete(params.id, type)} 
                        color="error"
                    />
                ],
            }
        ];
    }, [handleView, handleEdit, handleDelete]);

    // 🚀 تعريف أعمدة جهات التدريب (Provider Columns)
    const providerColumns = useMemo(() => {
        const type = 'provider'; 
        return [
            { field: 'name', headerName: 'اسم الجهة', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { field: 'college', headerName: 'الكلية', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' }, 
            { field: 'supervisor', headerName: 'المشرف الميداني', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { field: 'supportedMajors', headerName: 'التخصصات المدعومة', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            { field: 'currentStudents', headerName: 'عدد الطلاب الحاليين', flex: 2, minWidth: 200, align: 'center', headerAlign: 'center' },
            {
                field: 'actions', 
                type: 'actions', 
                headerName: 'الإجراءات',
                width: 140, 
                align: 'center', 
                headerAlign: 'center',
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<Tooltip title="عرض التفاصيل"><VisibilityIcon color="primary" /></Tooltip>}
                        label="عرض التفاصيل"
                        onClick={() => handleView(params.row)} 
                    />
                    ,
                    <GridActionsCellItem
                        icon={<Tooltip title="تعديل"><EditIcon color="success" /></Tooltip>} 
                        label="تعديل"
                        onClick={() => handleEdit(params.id, type)} 
                    />
                    ,
                    <GridActionsCellItem
                        icon={<Tooltip title="حذف"><DeleteIcon color="error" /></Tooltip>}
                        label="حذف"
                        onClick={() => handleDelete(params.id, type)} 
                        color="error"
                    />
                ],
            }
        ];
    }, [handleView, handleEdit, handleDelete]);
    // ------------------------------------------------------------------

  return (
    <Container maxWidth="xl" sx={{ padding: theme.spacing(3), direction: 'ltr' }}> 
      
      {/* 🚀 الجدول الأول: قائمة المشرفين الأكاديميين */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}> 
          نظام ادارة التدريب الميداني (المشرفون)
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => handleAddUser('supervisor')}
        >
          إضافة مشرف جديد
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ height: 400, width: '100%', mb: 5, p: 1, direction: 'ltr' }}> 
        <DataGrid 
          rows={supervisors} 
          columns={supervisorColumns} 
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
            '& .MuiDataGrid-cell': { justifyContent: 'center' },
          }}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: 'صفوف في الصفحة:',
              labelDisplayedRows: ({ from, to, count }) =>
                `من ${from} إلى ${to} من ${count}`,
            },
            noRowsLabel: 'لا توجد بيانات لعرضها',
          }}
        />
      </Paper>

      {/* 🚀 الجدول الثاني: قائمة جهات التدريب */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
          قائمة جهات التدريب
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddCircleIcon />}
          onClick={() => handleAddUser('provider')} 
        >
          إضافة جهة تدريب جديدة
        </Button>
      </Stack>

      <Paper elevation={3} sx={{ height: 400, width: '100%', mb: 5, p: 1, direction: 'ltr' }}> 
        <DataGrid 
          rows={trainingProviders} 
          columns={providerColumns} 
          disableRowSelectionOnClick
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 'bold' },
            '& .MuiDataGrid-cell': { justifyContent: 'center' },
          }}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          localeText={{
            MuiTablePagination: {
              labelRowsPerPage: 'صفوف في الصفحة:',
              labelDisplayedRows: ({ from, to, count }) =>
                `من ${from} إلى ${to} من ${count}`,
            },
            noRowsLabel: 'لا توجد بيانات لعرضها',
          }}
        />
      </Paper>

      {/* 💡 نافذة عرض التفاصيل المنبثقة (Dialog) */}
      <Dialog 
        open={openDetailsDialog} 
        onClose={handleCloseDetailsDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: { direction: 'rtl' } 
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          color: theme.palette.primary.dark 
        }}>
          تفاصيل: {selectedItem?.name}
        </DialogTitle>
        <DialogContent dividers>
          {selectedItem && (
            <Stack spacing={1.5} sx={{ textAlign: 'center' }}>
                            {/* عرض جميع الخصائص الممكنة */}
              <Typography variant="body1">
                <Typography component="span" fontWeight="bold">المعرف:</Typography> {selectedItem.id}
              </Typography>
              <Typography variant="body1">
                <Typography component="span" fontWeight="bold">الاسم:</Typography> {selectedItem.name}
              </Typography>
              
              {selectedItem.college && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">الكلية/القسم التابع:</Typography> {selectedItem.college}
                </Typography>
              )}

              {selectedItem.major && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">التخصص:</Typography> {selectedItem.major}
                </Typography>
              )}
              {selectedItem.supervisor && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">المشرف الميداني:</Typography> {selectedItem.supervisor}
                </Typography>
              )}
              {selectedItem.supportedMajors && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">التخصصات المدعومة:</Typography> {selectedItem.supportedMajors}
                </Typography>
              )}
              <Typography variant="body1">
                <Typography component="span" fontWeight="bold">عدد الطلاب الحاليين:</Typography> {selectedItem.currentStudents}
              </Typography>
              {selectedItem.status && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">حالة التفعيل:</Typography> {selectedItem.status}
                </Typography>
              )}
              {selectedItem.email && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">البريد الإلكتروني:</Typography> {selectedItem.email}
                </Typography>
              )}
              {selectedItem.phone && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">الهاتف:</Typography> {selectedItem.phone}
                </Typography>
              )}
              {selectedItem.website && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">الموقع الإلكتروني:</Typography> {selectedItem.website}
                </Typography>
              )}
              {selectedItem.contact && ( 
                <Typography variant="body1">
                  <Typography component="span" fontWeight="bold">رقم التواصل:</Typography> {selectedItem.contact}
                </Typography>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-start', p: 2 }}>
          <Button onClick={handleCloseDetailsDialog} color="primary" variant="contained">
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}