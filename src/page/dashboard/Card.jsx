import React from 'react';
import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';

export default function Card({ icon, title, increase, data, cardColor }) { 
    const theme = useTheme();

    // استخلاص القيمة الرئيسية (value) من الشريحة الأولى
    const mainValue = data && data.length > 0 ? data[0].value : 'N/A';
    
    // تحديد وحدة القياس للعرض
    const valueUnit = title.includes("تقييم") ? 'من 5.0' : title.includes("جهات") ? 'جهة' : 'طالب';

    return (
        <Paper sx={{ minWidth: "333px", p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center" , direction: "ltr"}}>
            
            {/* القسم الأيمن (العنوان والقيمة) */}
            <Stack gap={1}>
                <Box>
                    {icon} 
                </Box>
                <Typography variant="body2" sx={{ fontSize: "13px" }}>
                    {title}
                </Typography>
                
                {/* خطوط القيمة والوحدة */}
                <Stack direction="column" spacing={0}>
                    <Typography variant="h6" fontWeight="normal" color={theme.palette.text.primary}>
                        {mainValue}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {valueUnit} 
                    </Typography>
                </Stack>
            </Stack>

            {/* القسم الأيسر (المخطط ونسبة الزيادة في المنتصف) */}
            <Stack alignItems="center">
                
                <Box 
                    height={"100px"} 
                    width={"100px"} 
                    sx={{ 
                        position: "relative",
                        border: 'none', // إزالة أي حدود خارجية للـ Box
                        outline: 'none', // إزالة أي مخططات خارجية للـ Box
                        
                        borderRadius: '50%', // للحصول على الشكل الدائري
                    }}
                >
                    
                    {/* 1. مكون المخطط الدائري
                    <ResponsivePie
                        data={data}
                        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                        innerRadius={0.7}
                        padAngle={0}
                        cornerRadius={3}
                        enableArcLabels={false}
                        enableArcLinkLabels={false}
                        
                    
                    /> */}
                    
                    {/* 2. نسبة الزيادة (+20%) الموضوعة في منتصف المخطط */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            pointerEvents: 'none', 
                        }}
                    >
                        <Typography variant="body2" fontWeight="bold" 
                            color={cardColor} // استخدام اللون المريح الجديد
                        >
                            {increase} 
                        </Typography>
                    </Box>
                </Box>

            </Stack>
        </Paper>
    );
}