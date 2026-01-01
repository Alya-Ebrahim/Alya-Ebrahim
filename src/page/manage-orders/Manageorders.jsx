import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Menu,
  MenuItem,
  Stack,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
  School as SchoolIcon,
  Handshake as HandshakeIcon,
  MoreVert as MoreVertIcon,
  CheckCircleOutline as CheckCircleOutlineIcon, 
  CancelOutlined as CancelOutlinedIcon,
  Close as CloseIcon, 
} from '@mui/icons-material';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';

// --- البيانات التجريبية ---
const initialOrders = [
  { id: 'TR-2025-001', type: 'طلب تدريب', applicant: 'أحمد علي', date: '2025/11/14', status: 'غير مصنف', details: 'طلب لتنفيذ برنامج تدريبي لمدة ثلاثة أسابيع يهدف إلى تطوير مهارات الإدارة الوسطى.' }, 
  { id: 'MN-2025-002', type: 'طلب مناقشة', applicant: 'فاطمة الزهراء', date: '2025/11/12', status: 'غير مصنف', details: 'طلب لتنظيم جلسة حوارية حول مستقبل التقنيات المالية (FinTech) في المنطقة.' },
  { id: 'SH-2025-003', type: 'طلب شراكة', applicant: 'مؤسسة الابتكار الرقمي', date: '2025/11/10', status: 'غير مصنف', details: 'عرض شراكة استراتيجية لتطوير منصة إلكترونية لتبادل الخبرات، ولكن الميزانية المطلوبة تفوق المتاح حالياً.' },
  { id: 'TR-2025-004', type: 'طلب تدريب', applicant: 'محمد إبراهيم', date: '2025/11/08', status: 'غير مصنف', details: 'طلب تدريب على أساسيات البرمجة بلغة بايثون. ينتظر مراجعة المنهج والموافقة عليه.' },
  { id: 'TR-2025-005', type: 'طلب تدريب', applicant: 'سارة خالد', date: '2025/11/07', status: 'غير مصنف', details: 'طلب لتوفير تدريب على أدوات التحليل الإحصائي المتقدم.' },
  { id: 'TR-2025-006', type: 'طلب مناقشة', applicant: 'محمد احمد', date: '2025/11/14', status: 'غير مصنف', details: 'اقتراح لعقد ورشة عمل حول تحديات الأمن السيبراني في المؤسسات الصغيرة والمتوسطة.' }, 
  { id: 'MN-2025-007', type: 'طلب شراكة', applicant: 'سبأفون', date: '2025/11/12', status: 'غير مصنف', details: 'مقترح تعاون تجاري لتوفير خدمة الرسائل النصية القصيرة لعملائنا.' },
  { id: 'SH-2025-008', type: 'طلب مناقشة', applicant: 'علي محمد', date: '2025/11/10', status: 'غير مصنف', details: 'طلب لمناقشة التخطيط الاستراتيجي للربع الأول من العام القادم.' },
  { id: 'TR-2025-009', type: 'طلب تدريب', applicant: 'يوسف فرج', date: '2025/11/08', status: 'غير مصنف', details: 'طلب للحصول على شهادة في إدارة المشاريع الاحترافية (PMP).' },
  { id: 'TR-2025-0010', type: 'طلب تدريب', applicant: 'عليه ابراهيم', date: '2025/11/07', status: 'غير مصنف', details: 'طلب تدريب لتطوير مهارات العرض والإلقاء الفعال.' },
];

// دالة مساعدة لتحديد لون شريحة الحالة
const getStatusColor = (status) => {
  switch (status) {
    case 'معلق':
      return 'warning';
    case 'موافق عليه':
      return 'success';
    case 'مرفوض':
      return 'error';
    case 'غير مصنف':
      return 'info';
    default:
      return 'default';
  }
};

// دالة مساعدة لتحديد اسم الحالة المعروض للمستخدم
const getStatusLabel = (status) => {
  return status === 'غير مصنف' ? 'تحت الإجراء الأولي' : status;
}

// ===================================================
// مكون عرض التفاصيل المنبثقة
// ===================================================
const OrderDetailsModal = ({ open, orderDetails, onClose, getStatusLabel, getStatusColor }) => {
    if (!orderDetails) return null; 

    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            fullWidth 
            maxWidth="sm" 
            sx={{ '& .MuiDialog-paper': { direction: 'rtl', textAlign: 'right' } }}
        >
            <DialogTitle>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">تفاصيل الطلب: {orderDetails.id}</Typography>
                    <IconButton onClick={onClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Stack>
            </DialogTitle>
            
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee' }}>
                            <Typography variant="subtitle1" gutterBottom>
                                الحالة الحالية: <Chip
                                    label={getStatusLabel(orderDetails.status)}
                                    color={getStatusColor(orderDetails.status)}
                                    size="small"
                                    sx={{ mr: 1, ml: 1 }}
                                />
                            </Typography>
                            <Typography><strong>النوع:</strong> {orderDetails.type}</Typography>
                            <Typography><strong>المقدم:</strong> {orderDetails.applicant}</Typography>
                            <Typography><strong>تاريخ التقديم:</strong> {orderDetails.date}</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>وصف وتفاصيل الطلب</Typography>
                        <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                            <Typography variant="body1">
                                {orderDetails.details || 'لا يوجد وصف مفصل لهذا الطلب.'}
                            </Typography>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>الإجراءات المتخذة</Typography>
                        <Box sx={{ p: 2, border: '1px dashed #ccc', minHeight: 80 }}>
                            <Typography variant="body2" color="text.secondary">
                                (هذا المكان مخصص لعرض سجل الإجراءات والملاحظات الإضافية).
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose} color="primary" variant="contained">
                    إغلاق
                </Button>
            </DialogActions>
        </Dialog>
    );
};
// ===================================================

function Manageorders() {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('الكل');
  const [filterStatus, setFilterStatus] = useState('الكل'); 
  const [orders, setOrders] = useState(initialOrders); 
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false); 

  const isPresident = true; 

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleSearchChange = (event) => setSearchText(event.target.value);
  const handleFilterTypeChange = (type) => setFilterType(type);
  const handleFilterStatusChange = (status) => setFilterStatus(status);
  
  const getSelectedOrderDetails = () => orders.find(order => order.id === selectedOrderId);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.applicant.toLowerCase().includes(searchText.toLowerCase()) ||
      order.type.toLowerCase().includes(searchText.toLowerCase());

    const matchesType = filterType === 'الكل' || order.type === filterType;
    
    let matchesStatus = true; 
    if (filterStatus === 'الكل') {
        matchesStatus = order.status === 'غير مصنف' || order.status === 'معلق';
    } else if (filterStatus === 'غير مصنف') {
        matchesStatus = order.status === 'غير مصنف';
    } else if (filterStatus === 'موافق عليه') {
        matchesStatus = order.status === 'موافق عليه';
    } else if (filterStatus === 'مرفوض') {
        matchesStatus = order.status === 'مرفوض';
    } else if (filterStatus === 'معلق') {
        matchesStatus = order.status === 'معلق';
    }

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleMenuClick = (event, orderId) => { setAnchorEl(event.currentTarget); setSelectedOrderId(orderId); };
  const handleMenuClose = () => setAnchorEl(null);
  const handleViewDetails = () => { setOpenDetailsDialog(true); handleMenuClose(); };
  const handleCloseDetailsDialog = () => { setOpenDetailsDialog(false); setSelectedOrderId(null); };
  
  const handleChangeStatus = (newStatus) => {
    if (!isPresident) return; 
    setOrders((prevOrders) => prevOrders.map((order) => order.id === selectedOrderId ? { ...order, status: newStatus } : order));
    handleMenuClose();
  };

  const handleAddComment = (orderId) => {
    if (!isPresident) return; 
    setOrders(prevOrders => prevOrders.map(order => order.id === orderId ? { ...order, status: 'معلق' } : order));
    handleMenuClose();
  };

  // --- العدادات حسب الحالة "غير مصنف" ---
  const countUnclassified = (type) => orders.filter(o => o.type === type && o.status === 'غير مصنف').length;
  const countAllUnclassified = orders.filter(o => o.status === 'غير مصنف').length;

  return (
    <Box sx={{ flexGrow: 1, p: 3, direction: 'ltr' }}> 

      <Typography variant="h4" gutterBottom>إدارة الطلبات</Typography>

      {/* لوحة البحث والتصفية */}
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="بحث بالرقم أو المقدم أو النوع"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            {/* تصفية حسب النوع + عدادات */}
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="body1" sx={{ minWidth: 'auto' }}>تصفية حسب النوع:</Typography>
              <Chip
                label={`الكل (${countAllUnclassified})`}
                onClick={() => handleFilterTypeChange('الكل')}
                color={filterType === 'الكل' ? 'primary' : 'default'}
                variant={filterType === 'الكل' ? 'filled' : 'outlined'}
                icon={<FilterListIcon />}
              />
              <Chip
                label={`طلب تدريب (${countUnclassified('طلب تدريب')})`}
                onClick={() => handleFilterTypeChange('طلب تدريب')}
                color={filterType === 'طلب تدريب' ? 'primary' : 'default'}
                variant={filterType === 'طلب تدريب' ? 'filled' : 'outlined'}
                icon={<SchoolIcon />}
              />
              <Chip
                label={`طلب مناقشة (${countUnclassified('طلب مناقشة')})`}
                onClick={() => handleFilterTypeChange('طلب مناقشة')}
                color={filterType === 'طلب مناقشة' ? 'primary' : 'default'}
                variant={filterType === 'طلب مناقشة' ? 'filled' : 'outlined'}
                icon={<AssignmentIcon />}
              />
              <Chip
                label={`طلب شراكة (${countUnclassified('طلب شراكة')})`}
                onClick={() => handleFilterTypeChange('طلب شراكة')}
                color={filterType === 'طلب شراكة' ? 'primary' : 'default'}
                variant={filterType === 'طلب شراكة' ? 'filled' : 'outlined'}
                icon={<HandshakeIcon />}
              />
            </Stack>
          </Grid>

          {/* تصفية حسب الحالة */}
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="body1" sx={{ minWidth: 'auto' }}>تصفية حسب الحالة:</Typography>
              <Chip
                label="الكل (تحت الإجراء)"
                onClick={() => handleFilterStatusChange('الكل')}
                color={filterStatus === 'الكل' ? 'primary' : 'default'}
                variant={filterStatus === 'الكل' ? 'filled' : 'outlined'}
              />
              <Chip
                label="موافق عليه"
                onClick={() => handleFilterStatusChange('موافق عليه')}
                color={filterStatus === 'موافق عليه' ? 'success' : 'default'}
                variant={filterStatus === 'موافق عليه' ? 'filled' : 'outlined'}
              />
              <Chip
                label="مرفوض"
                onClick={() => handleFilterStatusChange('مرفوض')}
                color={filterStatus === 'مرفوض' ? 'error' : 'default'}
                variant={filterStatus === 'مرفوض' ? 'filled' : 'outlined'}
              />
              <Chip
                label="معلق"
                onClick={() => handleFilterStatusChange('معلق')}
                color={filterStatus === 'معلق' ? 'warning' : 'default'}
                variant={filterStatus === 'معلق' ? 'filled' : 'outlined'}
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* جدول عرض الطلبات */}
      <Paper elevation={3} sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>رقم الطلب</TableCell>
                <TableCell>نوع الطلب</TableCell>
                <TableCell>المقدم</TableCell>
                <TableCell>التاريخ</TableCell>
                <TableCell align="center">الإجراءات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    لا توجد طلبات مطابقة.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {order.id}
                      <Chip
                        label={getStatusLabel(order.status)}
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ mr: 1, ml: 1, direction: 'rtl' }}
                      />
                    </TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell>{order.applicant}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="more"
                        id={`menu-${order.id}`}
                        aria-controls={openMenu ? `long-menu-${order.id}` : undefined}
                        aria-expanded={openMenu ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={(event) => handleMenuClick(event, order.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id={`long-menu-${order.id}`}
                        MenuListProps={{ 'aria-labelledby': `menu-${order.id}` }}
                        anchorEl={anchorEl}
                        open={openMenu && selectedOrderId === order.id}
                        onClose={handleMenuClose}
                        PaperProps={{ style: { maxHeight: 48 * 4.5, width: '25ch', direction: 'rtl' } }}
                      >
                        <MenuItem onClick={handleViewDetails}>
                          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
                          <ListItemText>عرض التفاصيل</ListItemText>
                        </MenuItem>
                        {order.status !== 'معلق' && (
                          <MenuItem onClick={() => handleAddComment(order.id)} disabled={!isPresident}>
                            <ListItemIcon><PauseCircleOutlineIcon fontSize="small" color={isPresident ? 'primary' : 'disabled'} /></ListItemIcon>
                            <ListItemText>تعليق</ListItemText>
                          </MenuItem>
                        )}
                        {order.status !== 'موافق عليه' && (
                          <MenuItem onClick={() => handleChangeStatus('موافق عليه')} disabled={!isPresident}>
                            <ListItemIcon><CheckCircleOutlineIcon fontSize="small" color={isPresident ? 'success' : 'disabled'} /></ListItemIcon>
                            <ListItemText>موافقة</ListItemText>
                          </MenuItem>
                        )}
                        {order.status !== 'مرفوض' && (
                          <MenuItem onClick={() => handleChangeStatus('مرفوض')} disabled={!isPresident}>
                            <ListItemIcon><CancelOutlinedIcon fontSize="small" color={isPresident ? 'error' : 'disabled'} /></ListItemIcon>
                            <ListItemText>رفض</ListItemText>
                          </MenuItem>
                        )}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <OrderDetailsModal 
          open={openDetailsDialog}
          orderDetails={getSelectedOrderDetails()}
          onClose={handleCloseDetailsDialog}
          getStatusLabel={getStatusLabel}
          getStatusColor={getStatusColor}
      />
    </Box>
  );
}

export default Manageorders;
